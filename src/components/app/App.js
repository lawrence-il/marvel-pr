import { Component } from "react/cjs/react.production.min";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";
import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";

import decoration from '../../resources/img/vision.png';

class App extends Component {

    state = {
        selectedChar: null
    }


    onCharSelected = (e, id, refs) => {
        for (let item of refs) {
            if (item.classList.contains('char__item_selected')) {
                item.classList.remove('char__item_selected');
                break;
            }
        }
        refs[e.currentTarget.tabIndex - 1].classList.add('char__item_selected');
        this.setState({
            selectedChar: id
        })
    }

    render () {

        return (
            <div className="app">
                <AppHeader/>
                <main>
                    <ErrorBoundary>
                        <RandomChar/>
                    </ErrorBoundary>
                    <div className="char__content">
                        <ErrorBoundary>
                            <CharList onCharSelected={this.onCharSelected}/>
                        </ErrorBoundary>

                        <ErrorBoundary>
                            <CharInfo charId={this.state.selectedChar}/>
                        </ErrorBoundary>

                    </div>
                    <img className="bg-decoration" src={decoration} alt="vision"/>
                </main>
            </div>
        )
    }
    
}

export default App;