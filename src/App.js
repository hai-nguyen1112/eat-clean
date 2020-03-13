import React from 'react'
import './App.css'
import {Switch, Route, Redirect} from 'react-router-dom'
import Recipes from "./containers/Recipes"

function App() {
    return (
        <div className="App">
            <Switch>
                <Route path="/recipes" component={Recipes} />
                <Route path="/" render={() => <Redirect to="/recipes"/>} />
                <Redirect from="*" to="/" />
            </Switch>
        </div>
    )
}

export default App
