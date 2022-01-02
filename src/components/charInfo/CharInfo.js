import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Skeleton from '../skeleton/Skeleton';
import useMarvelService from '../../services/MarvelService';
import './charInfo.scss';

const CharInfo = (props) => {
    
    const [char, setChar] = useState('');

    const {loading, error, imgNotFound, getCharacter, clearError} = useMarvelService();

    useEffect(() => {
        updateChar();
    }, []) 

    const onCharLoaded = (char) => {
        setChar(char);

    }

    const updateChar = () => {
        const {charId} = props;
        if (!charId) return;

        if (error) clearError();
        getCharacter(charId)
            .then(onCharLoaded)
 
    }

    useEffect(() => {
        updateChar();
    }, [props.charId])


    const skeleton = char || loading || error ? false : <Skeleton/>;
    const errorMessage = error ? <ErrorMessage/> : false;
    const spinner = loading ? <Spinner/> : false
    const content = !(loading || error || !char) ? <View char={char} imgNotFound={imgNotFound}/> : false

    return (
    <div className="char__info">
        {skeleton}
        {errorMessage}
        {spinner}
        {content}
    </div>
    )

}

const View = ({char, imgNotFound}) => {
    const {name, description, thumbnail, homepage, wiki, comics} = char
    
    return (
        <>
            <div className="char__basics">
                <img src={thumbnail} alt={name} style={thumbnail === imgNotFound ? {objectFit: 'fill'} : {objectFit: 'cover'}}/>
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">
                {description}
            </div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
                {comics.length === 0 ?  
                    <li key={0} className="char__comics-item">
                        <a href=' '>Comics not found with this character</a>
                    </li>
                        :
                    comics.map((item, i) => { 
                        if (i >= 10) return;    // если много объектов лучше использовать обычный цикл с break
                        return (<li key={i} className="char__comics-item">
                                    <a href={`https://www.marvel.com/comics/issue/${+item?.resourceURI.match(/\d\d+/)}/${item.name.match(/\w+/)}`}
                                        >{item.name}
                                    </a>
                                </li>)
                    })
                }
            </ul>
        </>
    )
}

CharInfo.propTypes = {
    charId: PropTypes.number
}

CharInfo.defaultProps = {
    charId: 1009227
}

export default CharInfo;