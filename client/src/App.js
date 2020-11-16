import React from 'react'
import {useSelector} from 'react-redux'

import './App.scss'

import {Layout} from './hoc/Layout/Layout'

function App() {
    const {darkmode} = useSelector(({themes}) => themes)

    return (
        <div className={darkmode ? 'app-container dark' : 'app-container'}>
            <Layout />
        </div>
    )
}

export default App
