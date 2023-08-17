import { Link } from "react-router-dom"

export function AppHeader() {
    return <section className="app-header-container full main-app">
        <div className="app-header">
            <h1>MyMarket</h1>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/about">About</Link>
                </li>
            </ul>
        </div>
    </section>
}