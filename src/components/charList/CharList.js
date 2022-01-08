import { useState, useEffect, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import PropTypes from 'prop-types';
import Spinner from '../spinner/Spinner';
import useMarvelService from '../../services/MarvelService';
import ErrorMessage from '../errorMessage/ErrorMessage';
import './charList.scss';



const CharList = (props) => {

    const [list, setList] = useState([]);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [offset, setOffset] = useState(210);
    const [charEnded, setCharEnded] = useState(false);
    const [showChar, setShowChar] = useState(false);

    const {loading, error, imgNotFound, getAllCharacters, clearError} = useMarvelService();
    
    const refs = useRef([]);

    useEffect(() => {
        onRequest(offset,  true);
    }, [])

    const onRequest = (offset, initial) => {
        initial ? setNewItemLoading(false) : setNewItemLoading(true);
        if (error) clearError();
        getAllCharacters(offset)
            .then(createElements)    
    }

    const createElements = (data) => {
        let ended = false;

        if (data.length < 9) {
            ended = true;

        }

        const newListChar = data.map(({id, thumbnail, name}, index) => (
            <li key={id}
                className="char__item"
                tabIndex={list.length + 1 + index}
                ref={item => refs.current[list.length + index] = item}
                onClick={(e) => props.onCharSelected(e, id, refs)}>
                    <img src={thumbnail} alt={name} style={thumbnail === imgNotFound ? {objectFit: 'fill'} : {objectFit: 'cover'}}/>
                    <div className="char__name">{name}</div>
            </li>   
        ))
        
        setList(list => [...list, ...newListChar]); // list пред состояние newListChar
        setNewItemLoading(false);
        setOffset(offset => offset + 9);
        setCharEnded(ended);
        setShowChar(true);
    }


    const errorMessage = error ? <ErrorMessage/> : false;
    const spinner = loading && !newItemLoading ? <Spinner/> : false;

    return (
        <CSSTransition
            in={showChar}
            timeout={400}
            classNames='char__list'>
            <div className="char__list">
                {errorMessage}
                {spinner}
                <ul className="char__grid">
                    {error ? null : list}
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
        </CSSTransition>
    )
    
}

CharList.propTypes = {
    onCharSelected: PropTypes.func.isRequired
}

export default CharList;