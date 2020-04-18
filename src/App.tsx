import React from 'react';
import './App.scss';
import Home from "./components/pages/Home";
import Settings from "./components/pages/Settings";
import SettingsProvider from "./contexts/SettingsProvider";
import Nav from "./components/Nax";
import List from "./components/pages/List";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

function App() {

  return (
    <SettingsProvider>
        <Router>
            <div className="App">
                <header className="App-header">
                <h1>Memorizer</h1>
                </header>
                <div id="nav">
                    <Nav/>
                </div>
                <div id="page">
                    <Switch>
                        <Route path="/list">
                            <List />
                        </Route>
                        <Route path="/settings">
                            <Settings />
                        </Route>
                        <Route path="/">
                            <Home />
                        </Route>
                    </Switch>
                </div>
                <footer>
                    <a href="./time.pdf">Time mémo</a>
                </footer>
            </div>
        </Router>
    </SettingsProvider>
  );

}

export default App;
