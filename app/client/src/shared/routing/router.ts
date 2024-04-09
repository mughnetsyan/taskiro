import { sample } from 'effector'
import { createHistoryRouter, createRouterControls } from 'atomic-router'
import { createBrowserHistory } from 'history'

import { appStarted } from 'shared/config'

import { routesMap } from "./routes"


export const history = createBrowserHistory()
export const controls = createRouterControls()

export const router = createHistoryRouter(({ routes: routesMap, controls: controls }))


sample({
    clock: appStarted,
    fn: () => history,
    target: router.setHistory
})