
class MarvelService {
    _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    _apiKey = 'apikey=e913ae028659ec126c204a2ab5b09eea';
    _notFoundUrl = 'https://www.marvel.com/universe/404';
    _baseOffset = 210;
    _limit = 9;

    getResource = async (url) => {
        let res = await fetch(url);

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }
        return await res.json();
    }
    getAllCharacters = async (offset = this._baseOffset, limit = this._limit) => {
        const res = await this.getResource(`${this._apiBase}characters?limit=${limit}&offset=${offset}}&${this._apiKey}`);
        return res.data.results.map(this._transformCharacter);
    }
    getCharacter = async (id) => {
        const res = await this.getResource(`${this._apiBase}characters/${id}?${this._apiKey}`);
        return this._transformCharacter(res.data.results[0]) //
    }

    _transformCharacter = (char) => { // берутся необходимые данные 
        
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
                homepage: char.urls.filter(item => item.type === 'detail')[0] ? char.urls.filter(item => item.type === 'detail')[0].url : this._notFoundUrl,
                wiki: char.urls.filter(item => item.type === 'wiki')[0] ? char.urls.filter(item => item.type === 'wiki')[0].url : this._notFoundUrl,
                comics: char.comics.items
            })
        }
    }

    
export default MarvelService;