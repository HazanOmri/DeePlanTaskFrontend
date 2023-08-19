import { httpService } from './http.service.js'

const ITEM_URL = 'item/'

export const itemService = {
    query,
    get,
    remove,
    save,
    getEmptyItem,
    getKey,
    getLinesValues
}

async function query(filterBy = getEmptyFilter()) {
    try {
        let items = await httpService.get(ITEM_URL)
        if (filterBy.name) {
            const regex = new RegExp(filterBy.name, 'i')
            items = items.filter(item => regex.test(item.name))
        }
        return items
    } catch (err) {
        throw err
    }
}

function getEmptyFilter() {
    return { name: '' }
}

async function get(itemId) {
    return httpService.get(ITEM_URL + itemId)
}

function remove(itemId) {
    return httpService.delete(ITEM_URL + itemId)
}

function save(item) {
    if (item._id) {
        return httpService.put(ITEM_URL + item._id, item)
    } else {
        return httpService.post(ITEM_URL, item)
    }
}

function getEmptyItem() {
    return {
        name: '',
        desc: '',
        kind: '0',
        date: '',
        num: 100
    }
}

function getKey(str) {
    switch (str) {
        case '_id':
            return 'Catalog Number'
        case 'num':
            return 'Number'
        case 'name':
            return 'Name'
        case 'desc':
            return 'Description'
        case 'kind':
            return 'Kind'
        case 'date':
            return 'Date'
        default:
            return str
    }
}

function getLinesValues(item) {
    const linesValues = { ...item }
    delete linesValues._id
    delete linesValues.num
    delete linesValues.name
    delete linesValues.desc
    delete linesValues.kind
    delete linesValues.date
    const lines = []
    if (Object.keys(linesValues).length > 0) {
        for (const key in linesValues) {
            lines.push({ key: key, value: linesValues[key] })
        }
    }
    return lines
}