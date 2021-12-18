import { Component } from 'react/cjs/react.production.min';
import PropTypes from 'prop-types';
import Spinner from '../spinner/Spinner';
import MarvelService from '../../services/MarvelService';
import './charList.scss';
import ErrorMessage from '../errorMessage/ErrorMessage';


class CharList extends Component {

    state = {
        list: [],
        loading: true,
        error: false,
        imgNotFound: 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg',
        newItemLoading: false,
        offset: 210,
        charEnded: false
    }

    marvelService = new MarvelService();
    
    onError = () => {
        this.setState({
            loading: false,
            error: true,
        });

    }


    componentDidMount = () => {
        this.onRequest();
    }

    onRequest = (offset, limit) => {
        this.onCharListLoading();
        this.marvelService
            .getAllCharacters(offset, limit)
            .then(this.createElements)
            .catch(this.onError);    
    }

    onCharListLoading = () => {
        this.setState({
            newItemLoading: true
        })
    }

    createElements = (data) => {
        let ended = false;
        let newListChar = [];

        if (data.length < 9) {
            ended = true;

        } else {
            newListChar = data.map(({id, thumbnail, name}) => (
                <li key={id}
                    className="char__item"
                    onClick={() => this.props.onCharSelected(id)}>
                        <img src={thumbnail} alt={name} style={thumbnail === this.state.imgNotFound ? {objectFit: 'fill'} : {objectFit: 'cover'}}/>
                        <div className="char__name">{name}</div>
                </li>   
            ))
        }
        
        this.setState(({list, offset}) => ({
            list: [...list, ...newListChar],
            loading: false,
            newItemLoading: false,
            offset: offset + 9,
            charEnded: ended,
        }))
    }

    render () {

        const {list, error, loading, newItemLoading, offset, charEnded} = this.state;
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
                    onClick={() => this.onRequest(offset)}
                    >
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
    
}

CharList.propTypes = {
    onCharSelected: PropTypes.func.isRequired
}

export default CharList;