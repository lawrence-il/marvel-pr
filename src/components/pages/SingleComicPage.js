import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import useMarvelService from '../../services/MarvelService';
import './singleComicPage.scss';

const SingleComicPage = () => {

    const [comic, setComic] = useState(null);
    const [char, setChar] = useState(null);
    const {comicId, name} = useParams();
    const {loading, error, getComic, getCharByName, clearError} = useMarvelService();

    useEffect(() => {
        if(comicId) viewComic();
        if(name) viewChar();
    }, [])

    const onComicLoaded = comic => {
        setComic(comic);

    }

    const onCharLoaded = char => {
        setChar(char)
    }

    const viewChar = () => {
        if (error) clearError();
        getCharByName(name)
                .then(onCharLoaded)
                .catch(() => setChar(null))
    }

    const viewComic = () => {
        if (error) clearError();
        getComic(comicId)
                .then(onComicLoaded);

    }

    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Spinner/> : null;
    const contentComic = !(loading || error || !comic) ? <ViewComic comic={comic}/> : null;
    const contentChar = !(loading || error || !char) ? <ViewChar char={char}/> : null;

    return (
        <>
            {errorMessage}
            {spinner}
            {contentComic}
            {contentChar}
        </>
    )
}


const ViewChar = ({char}) => {

    const {name, description, thumbnail} = char;

    return (
        <div className="single-comic">
            <img src={thumbnail} alt={name} className="single-comic__img"/>
            <div className="single-comic__info">
                <h2 className="single-comic__name">{name}</h2>
                <p className="single-comic__descr">{description}</p>
            </div>
            <Link to="/comics" className="single-comic__back">Back to all</Link>
        </div>
    )
}


const ViewComic = ({comic}) => {

    const {title, description, pageCount,thumbnail, language, price} = comic;

    return (
        <div className="single-comic">
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
    )
}

export default SingleComicPage;