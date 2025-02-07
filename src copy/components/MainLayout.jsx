import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from "./Header"
import FooterArea from './FooterArea'

function MainLayout() {
    return (
        <div>
            <nav>
                <Header />
            </nav>
            <main>
                <Outlet />
            </main>
            <footer>
                <FooterArea />
            </footer>
        </div>
    )
}

export default MainLayout