import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Switch} from "react-router-dom";
import {SinglePage} from '../pages';
import AppHeader from "../appHeader/AppHeader";
import Spinner from "../spinner/Spinner";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";

const Page404 = lazy(() => import('../pages/404'));
const MainPage = lazy(() => import('../pages/MainPage'));
const ComicsPage = lazy(() => import('../pages/ComicsPage'));



const App = () => {
    
    return (
        <BrowserRouter>
            <div className="app">
            <AppHeader/>
                <main>
                    <Suspense fallback={<Spinner/>}>
                        <Switch>
                            <Route exact path="/">
                                <MainPage/>
                            </Route>
                            <Route exact path="/comics">
                                <ErrorBoundary><ComicsPage/></ErrorBoundary>
                            </Route>
                            <Route exact path="/comics/:comicId">
                                <ErrorBoundary><SinglePage/></ErrorBoundary>
                            </Route>
                            <Route exact path="/character/:name">
                                <SinglePage/>
                            </Route>
                            <Route path='*'>
                                <Page404/>
                            </Route>
                        </Switch>
                    </Suspense>
                </main>
            </div>  
        </BrowserRouter>
    )
    
}

export default App;