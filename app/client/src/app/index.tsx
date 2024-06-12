import { RouterProvider } from 'atomic-router-react'

import { Pages } from 'pages'

import { router } from 'shared/routing'
import { appStarted } from 'shared/config'

import './styles/index.css'

export const App = () => {
    return (
        <RouterProvider router={router}>
            <Pages />
        </RouterProvider>
    )
}

appStarted()