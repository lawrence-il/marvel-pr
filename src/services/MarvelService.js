import useHttp from '../components/hooks/http.hook.js'


const  useMarvelService = () => {

    const {loading, request, error, clearError} = useHttp();

    const _apiBaseChar = 'https://gateway.marvel.com:443/v1/public/';
    const _apiBaseComics = 'https://gateway.marvel.com:443/v1/public/';
    const _apiKey = 'apikey=e913ae028659ec126c204a2ab5b09eea';
    const _notFoundUrl = 'https://www.marvel.com/universe/404';
    const _baseOffset = 21;
    const _limit = 9;
    const imgNotFound  = 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg';


    
    const getAllCharacters = async (offset = _baseOffset, limit = _limit) => {
        const res = await request(`${_apiBaseChar}characters?limit=${limit}&offset=${offset}}&${_apiKey}`);
        return res.data.results.map(_transformCharacter);
    }
    const getCharacter = async (id) => {
        const res = await request(`${_apiBaseChar}characters/${id}?${_apiKey}`);
        return _transformCharacter(res.data.results[0])
    }

    const _transformCharacter = (char) => { // берутся необходимые данные 
        
        if(char.description.length >= 170) {
            char.description = `${char.description.slice(0, 170)}...`
        } else if (!char.description) {
            char.description = 'Description not found with this character';
        }
    
        return ({
                id: char.id,
                name: char.name,
                description: char.description,
                thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
                homepage: char.urls.filter(item => item.type === 'detail')[0] ? char.urls.filter(item => item.type === 'detail')[0].url : _notFoundUrl,
                wiki: char.urls.filter(item => item.type === 'wiki')[0] ? char.urls.filter(item => item.type === 'wiki')[0].url : _notFoundUrl,
                comics: char.comics.items
            })
        }

    const getComics = async (offset = _baseOffset, limit = _limit) => {
        const res = await request(`${_apiBaseComics}comics?issueNumber=1&limit=${limit}&offset=${offset}&${_apiKey}`);
        const comics = res.data.results.map(item => {
            return ({
                id: item.id,
                title: item.title,
                thumbnail: item.thumbnail.path + '.' + item.thumbnail.extension,
                comicsUrl: item.urls.filter(item => item.type === 'detail')[0].url,
                price: item.prices.filter(item => item.type === "printPrice")[0].price,
            })
        });

        return comics 
    }

        return {loading, error, getAllCharacters, getCharacter, imgNotFound, clearError, getComics}
}

    
export default useMarvelService;