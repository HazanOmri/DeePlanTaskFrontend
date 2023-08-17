import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Edit } from '../cmps/edit'
import { ItemList } from '../cmps/item-list'
import { itemService } from '../services/item.service'
import { setItems } from '../store/item.action'

export function Home() {
    const items = useSelector(storeState => storeState.itemModule.items)
    const [filter, setFilter] = useState({ name: '' })
    const [isAdd, setIsAdd] = useState(false)

    useEffect(() => {
        loadItems()
    }, [filter])

    async function loadItems() {
        const serviceItems = await itemService.query(filter)
        setItems(serviceItems)
    }

    function handleChange({ target }) {
        setFilter({ name: target.value })
    }

    return <section className="home">
        <div className="actions">
            <input
                type="text"
                placeholder="Search by name"
                className="serach"
                value={filter.name}
                onChange={handleChange}
            />
            <div className="add" onClick={() => setIsAdd(true)}>
                <svg height="16" width="16" aria-hidden="true" viewBox="0 0 16 16"><path d="M15.25 8a.75.75 0 0 1-.75.75H8.75v5.75a.75.75 0 0 1-1.5 0V8.75H1.5a.75.75 0 0 1 0-1.5h5.75V1.5a.75.75 0 0 1 1.5 0v5.75h5.75a.75.75 0 0 1 .75.75z"></path></svg>
            </div>
        </div>
        <ItemList/>
        {isAdd && <Edit closeModal={setIsAdd} />}
    </section>


}