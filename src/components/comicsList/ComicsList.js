import { useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import Spinner from '../spinner/Spinner';
import useMarvelService from '../../services/MarvelService';
import ErrorMessage from '../errorMessage/ErrorMessage';
import './comicsList.scss';


const setContent = (process, Component, newItemLoading, ) => {
    switch (process) {
        case 'waiting':
            return <Spinner/>;
        case 'loading':
            return newItemLoading ? <Component/> : <Spinner/>;
        case 'confirmed':
            return <Component/>;
        case 'error':
            return <ErrorMessage/>;
        default:
            throw new Error('Unexpected process state');
    }
};

const ComicsList = () => {

    const [comicsList, setComicsList] = useState([]);
    const [newItemLoading, setNewItemLoading] = useState(false); // чтобы убрать проблемы со спинером
    const [offset, setOffset] = useState(230);
    const {getComics, process, setProcess} = useMarvelService();
    const [charEnded, setCharEnded] = useState(false);
    
    useEffect(() => onRequest(offset, 8), []);



    const onRequest = (offset, limit, initial) => {
        initial ? setNewItemLoading(true) : setNewItemLoading(false);
        getComics(offset, limit) // promise
            .then(data => createComicsList(data))
            .then(() => setProcess('confirmed'));
    };

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
        
    };

    return (
        <div className="comics__list">
            {setContent(process, () => <ul className="comics__grid">{comicsList}</ul>, newItemLoading)}
            <button className="button button__main button__long" 
                disabled={newItemLoading}
                style={{'display': charEnded ? 'none' : 'block'}}
                onClick={() => onRequest(offset, 8, true)}>
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default ComicsList;