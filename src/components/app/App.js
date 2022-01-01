import { BrowserRouter, Route, Switch} from "react-router-dom";
import {MainPage, ComicsPage, Page404} from '../pages';
import AppHeader from "../appHeader/AppHeader";
import { SingleComicPage } from "../pages";

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
                        <Route exact path="/comics/:comicId">
                            <SingleComicPage/>
                        </Route>
                        <Route path='*'>
                            <Page404/>
                        </Route>
                    </Switch>
                </main>
            </div>  
        </BrowserRouter>
    )
    
}

export default App;