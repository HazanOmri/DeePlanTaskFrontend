import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import { Provider } from 'react-redux'

import { Home } from './pages/home.jsx'
import { About } from './pages/about.jsx'
import { AppHeader } from './cmps/app-header.jsx'
import { AppFooter } from './cmps/app-footer.jsx'

import { store } from './store/store'
import { UserMsg } from './cmps/user-msg.jsx'

export function App() {
  return (
    <Provider store={store}>
      <Router>
        <AppHeader />
        <main className="main-app">
          <Routes>
            <Route element={<Home />} path='/' />
            <Route element={<About />} path='/about' />
          </Routes>
          <UserMsg />
        </main>
        <AppFooter />
      </Router>
    </Provider>
  )
}
