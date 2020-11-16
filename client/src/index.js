import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'

import store from './redux/store'

import './index.scss'

import App from './App'
import * as serviceWorker from './serviceWorker'

const app = (
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>
)

ReactDOM.render (app, document.getElementById('root'))
serviceWorker.unregister()
