import { useState, useEffect} from 'react';
import { Link } from 'react-router-dom';

import Spinner from '../spinner/Spinner';
import useMarvelService from '../../services/MarvelService';
import ErrorMessage from '../errorMessage/ErrorMessage';
import './comicsList.scss';


const ComicsList = () => {

    const [comicsList, setComicsList] = useState([]);
    const [newItemLoading, setNewItemLoading] = useState(false); // чтобы убрать проблемы со спинером
    const [offset, setOffset] = useState(230);
    const {loading, error, getComics} = useMarvelService();
    const [charEnded, setCharEnded] = useState(false);
    
    useEffect(() => onRequest(offset, 8, true), []);



    const onRequest = (offset, limit, initial) => {
        initial ? setNewItemLoading(false) : setNewItemLoading(true)
        getComics(offset, limit) // promise
            .then(data => createComicsList(data));
    }

    const createComicsList = (data) => {
        let ended = false;
        
        if (data.length < 8) {
            ended = true;

        }
        const newComicsList = data.map(({id, title, thumbnail, price}, index) => ( // id иногда приходят одинаковые
            <li 
                key={comicsList.length + index}
                className="comics__item">
                    <Link to={`/comics/${id}`}>
                        <img src={thumbnail} alt={title} className="comics__item-img"/>
                        <div className="comics__item-name">{title}</div>
                        <div className="comics__item-price">{price}$</div>
                    </Link>
            </li>
        ))
        setComicsList(comicsList => [...comicsList, ...newComicsList]);
        setOffset(offset => offset + 8);
        setCharEnded(ended);
        
    }

    
    return (
        <div className="comics__list">
            {error ? <ErrorMessage/> : false}
            {!error && loading && !newItemLoading ? <Spinner/> : null}
            <ul className="comics__grid">
                {comicsList}
            </ul>
            <button className="button button__main button__long" 
                disabled={loading}
                style={{'display': charEnded ? 'none' : 'block'}}
                onClick={() => onRequest(offset, 8, false)}>
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default ComicsList;