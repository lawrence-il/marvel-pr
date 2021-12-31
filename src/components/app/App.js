import { BrowserRouter, Route, Switch} from "react-router-dom";
import {MainPage, ComicsPage} from '../pages';
import AppHeader from "../appHeader/AppHeader";

const App = () => {

    
    return (
        <BrowserRouter>
            <div className="app">
            <AppHeader/>
                <main>
                    <Switch>
                        <Route exact path="/">
                            <MainPage/>
                        </Route>
                        <Route exact path="/comics">
                            <ComicsPage/>
                        </Route>
                    </Switch>
                </main>
            </div>  
        </BrowserRouter>
    )
    
}

export default App;