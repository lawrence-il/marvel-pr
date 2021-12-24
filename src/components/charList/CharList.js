import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import Spinner from '../spinner/Spinner';
import MarvelService from '../../services/MarvelService';
import './charList.scss';
import ErrorMessage from '../errorMessage/ErrorMessage';


const CharList = (props) => {

    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [imgNotFound, setImgNotFound] = useState('http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg');
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [offset, setOffset] = useState(210);
    const [charEnded, setCharEnded] = useState(false);

    const marvelService = new MarvelService();
    
    const refs = useRef([]);

    const onError = () => {
        setError(true);
        setLoading(false);

    }

    useEffect(() => {
        onRequest();
    }, [])

    const onRequest = (offset, limit) => {
        onCharListLoading();
        marvelService.getAllCharacters(offset, limit)
            .then(createElements)
            .catch(onError);    
    }

    const onCharListLoading = () => {
        setNewItemLoading(true);
    }

    const createElements = (data) => {
        let ended = false;
        let newListChar = [];

        if (data.length < 9) {
            ended = true;

        } else {
            newListChar = data.map(({id, thumbnail, name}, index) => (
                <li key={id}
                    className="char__item"
                    tabIndex={list.length + 1 + index}
                    ref={item => refs.current[list.length + index] = item}
                    onClick={(e) => props.onCharSelected(e, id, refs)}>
                        <img src={thumbnail} alt={name} style={thumbnail === imgNotFound ? {objectFit: 'fill'} : {objectFit: 'cover'}}/>
                        <div className="char__name">{name}</div>
                </li>   
            ))
        }
        
        setList(list => [...list, ...newListChar]);
        setLoading(false);
        setNewItemLoading(false);
        setOffset(offset => offset + 9);
        setCharEnded(ended);
    }


    const errorMessage = error ? <ErrorMessage/> : false;
    const spinner = loading ? <Spinner/> : false;
    const showList = !(loading || error) ? list : false;

    return (
        <div className="char__list">
            {errorMessage}
            {spinner}
            <ul className="char__grid">
                {showList}
            </ul>
            <button 
                className="button button__main button__long"
                disabled={newItemLoading}
                style={{'display': charEnded ? 'none' : 'block'}}
                onClick={() => onRequest(offset)}
                >
                <div className="inner">load more</div>
            </button>
        </div>
    )
    
}

CharList.propTypes = {
    onCharSelected: PropTypes.func.isRequired
}

export default CharList;