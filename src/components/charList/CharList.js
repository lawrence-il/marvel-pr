import { useState, useEffect, useRef, useMemo } from 'react';
import { CSSTransition } from 'react-transition-group';
import PropTypes from 'prop-types';
import Spinner from '../spinner/Spinner';
import useMarvelService from '../../services/MarvelService';
import ErrorMessage from '../errorMessage/ErrorMessage';
import './charList.scss';



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


const CharList = (props) => {

    const [list, setList] = useState([]);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [offset, setOffset] = useState(210);
    const [charEnded, setCharEnded] = useState(false);
    const [showChar, setShowChar] = useState(false);

    const {imgNotFound, getAllCharacters, clearError, process, setProcess} = useMarvelService();
    
    const nodeRef = useRef(null)
    const refs = useRef([]);

    useEffect(() => {
        onRequest(offset);
    }, []);

    const onRequest = (offset, initial = false) => {
        initial ? setNewItemLoading(true) : setNewItemLoading(false);
        clearError();
        getAllCharacters(offset)
            .then(createElements)
            .then(() => setProcess('confirmed'));  
    };

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
        
        setList(list => [...list, ...newListChar]); // list пред состояние
        setNewItemLoading(false);
        setOffset(offset => offset + 9);
        setCharEnded(ended);
        setShowChar(true);
    };

    const content = useMemo(() => {
        console.log(process);
        return setContent(process, () => <ul className="char__grid">{list}</ul>, newItemLoading);
    }, [process]);

    return (
        <CSSTransition
            in={showChar}
            timeout={400}
            classNames='char__list'
            nodeRef={nodeRef}>
            <div className="char__list" ref={nodeRef}>
                {content}
                <button 
                    className="button button__main button__long"
                    disabled={newItemLoading}
                    style={{'display': charEnded ? 'none' : 'block'}}
                    onClick={() => onRequest(offset, true)}
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