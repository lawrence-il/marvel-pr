import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Skeleton from '../skeleton/Skeleton';
import MarvelService from '../../services/MarvelService';
import './charInfo.scss';

const CharInfo = (props) => {
    
    const [char, setChar] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [imgNotFound, setImgNotFound] = useState('http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg');

    const marvelService = new MarvelService();

    useEffect(() => {
        updateChar();
    }, []) 


    const onError = () => {
        setLoading(false);
        setError(false);

    }

    const onCharLoaded = (char) => {
        setChar(char);
        setLoading(false);

    }

    const onCharLoading = () => {
        setLoading(true);
    }

    const updateChar = () => {
        const {charId} = props;

        if (!charId) {
            return;
        }

        onCharLoading();

        marvelService
            .getCharacter(charId)
            .then(onCharLoaded)
            .catch(onError);    
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
                                <a href=' '>{item.name}</a>
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