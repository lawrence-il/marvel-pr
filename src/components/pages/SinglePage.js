import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import AppBanner from '../appBanner/AppBanner';
import setContent from '../../utils/setContent';
import useMarvelService from '../../services/MarvelService';
import './singlePage.scss';

const SingleComicPage = () => {

    const [comic, setComic] = useState(null);
    const [char, setChar] = useState(null);
    const {comicId, name} = useParams();
    const {getComic, getCharByName, clearError, process, setProcess} = useMarvelService();

    useEffect(() => {
        if(comicId) viewComic();
        if(name) viewChar();
    }, []);

    const onComicLoaded = comic => {
        setComic(comic);

    };

    const onCharLoaded = char => {
        setChar(char);
    };

    const viewChar = () => {
        clearError();
        getCharByName(name)
                .then(onCharLoaded)
                .then(() => setProcess('confirmed'))
                .catch(() => setChar(null))
    };

    const viewComic = () => {
        clearError();
        getComic(comicId)
                .then(onComicLoaded)
                .then(() => setProcess('confirmed'));

    };


    return (
        <>
            <AppBanner/>
            {setContent(process, comicId ? ViewComic : ViewChar, comicId ? comic : char)}
        </>
    )
}


const ViewChar = ({data}) => {

    const {name, description, thumbnail} = data;

    return (
        <HelmetProvider>
            <div className="single-comic">
                <Helmet>
                    <meta
                        name="description"
                        content={`${name} character`}
                        />
                    <title>{name}</title>
                </Helmet>
                <img src={thumbnail} alt={name} className="single-char__img"/>
                <div className="single-comic__info">
                    <h2 className="single-comic__name">{name}</h2>
                    <p className="single-comic__descr">{description}</p>
                </div>
                <Link to="/" className="single-comic__back">Back to all</Link>
            </div>
        </HelmetProvider>
    )
}


const ViewComic = ({data}) => {

    const {title, description, pageCount,thumbnail, language, price} = data;

    return (
        <HelmetProvider>
            <div className="single-comic">
                <Helmet>
                    <meta
                        name="description"
                        content={`${title} comics book`}
                        />
                    <title>{title}</title>
                </Helmet>
                <img src={thumbnail} alt={title} className="single-comic__img"/>
                <div className="single-comic__info">
                    <h2 className="single-comic__name">{title}</h2>
                    <p className="single-comic__descr">{description}</p>
                    <p className="single-comic__descr">{pageCount}</p>
                    <p className="single-comic__descr">Language: {language}</p>
                    <div className="single-comic__price">{price}$</div>
                </div>
                <Link to="/comics" className="single-comic__back">Back to all</Link>
            </div>
        </HelmetProvider>
    )
}

export default SingleComicPage;