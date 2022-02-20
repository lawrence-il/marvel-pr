import { useState } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import CharSearchForm from "../charSearchForm/CharSearchForm";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";

import decoration from '../../resources/img/vision.png';

const MainPage = () => {

    const [selectedChar, setChar] = useState(null);

    const onCharSelected = (e, id, refs) => {
        for (let item of refs.current) { 
            if (item.classList.contains('char__item_selected')) {
                item.classList.remove('char__item_selected');
                break;
            }
        }
        refs.current[e.currentTarget.tabIndex - 1].classList.add('char__item_selected');
        setChar(id);
    }


    return (
        <HelmetProvider>
            <Helmet>
                <meta
                    name="description"
                    content="Marvel information portal"
                    />
                <title>Marvel information portal</title>
            </Helmet>
            <ErrorBoundary>
                <RandomChar/>
            </ErrorBoundary>
            <div className="char__content">
                <ErrorBoundary>
                    <CharList onCharSelected={onCharSelected}/>
                </ErrorBoundary>

                <div className="">
                    <ErrorBoundary>
                        <CharInfo charId={selectedChar}/>
                    </ErrorBoundary>
                    <ErrorBoundary>
                        <CharSearchForm/>
                    </ErrorBoundary>
                </div>
            </div>
            <img className="bg-decoration" src={decoration} alt="vision"/>
        </HelmetProvider>
    )
}

export default MainPage;