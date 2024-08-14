import { createBrowserRouter, Navigate } from 'react-router-dom'
import Main from '../pages/main'
import Home from '../pages/home'
import Info from '../pages/info'
import Login from '../pages/login'
import Me from '../pages/me'
import Circle from '../pages/circle'
import Create from '../pages/create'
import Edit from '../pages/edit'
import Comment from '../pages/comment'

const routes = [
    {
        path: '/',
        Component: Main,
        children: [
            {
                path: 'login',
                Component: Login
            },
            {
                path: 'home',
                Component: Home
            },
            {
                path: 'info',
                Component: Info
            },
            {
                path: 'me',
                Component: Me
            },
            {
                path: 'circle/:circle_id',
                Component: Circle
            },
            {
                path: 'create',
                Component: Create
            },
            {
                path: 'edit',
                Component: Edit
            },
            {
                path: 'circle/:circle_id/:post_id',
                Component: Comment
            }
        ]
    }
]

export default createBrowserRouter(routes)