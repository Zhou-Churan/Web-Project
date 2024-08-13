import React from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import SideBar from '../SideBar'
import cookie from 'react-cookies'

const Main = () => {

    const location = useLocation()
    const showSideBar = location.pathname !== '/login'
    const navigate = useNavigate();
    if (!cookie.load('username')) navigate('/login')
    return (
        <div className="bg-white flex h-screen">

            {showSideBar && <SideBar/>}

            <div className="flex-1 p-4">
                <Outlet />
            </div>
        </div>
    )
}

export default Main