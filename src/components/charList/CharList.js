import { Component } from 'react/cjs/react.production.min';
import Spinner from '../spinner/Spinner';
import MarvelService from '../../services/MarvelService';
import './charList.scss';
import { Fragment } from 'react';
import ErrorMessage from '../errorMessage/ErrorMessage';


class CharList extends Component {

    state = {
        list: '',
        loading: true,
        error: false,
        imgNotFound: 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'
    }

    marvelService = new MarvelService();
    
    updateList = () => {
        this.marvelService
            .getAllCharacters()
            .then(this.onElements);
    }

    componentDidMount = () => {
        this.updateList()
    }

    onElements = (data) => {
        const listChar = data.map(({id, thumbnail, name}) => (
            <Fragment key={id}>
                    <li className="char__item">
                        <img src={thumbnail} alt={name} style={thumbnail === this.state.imgNotFound ? {objectFit: 'fill'} : {}}/>
                        <div className="char__name">{name}</div>
                    </li>   
            </Fragment>
        ))
        this.setState(() => ({
            list: listChar,
            loading: false,
        }))
    }

    render () {

        const {list, error, loading} = this.state;
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
                <button className="button button__main button__long">
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
    
}

export default CharList;