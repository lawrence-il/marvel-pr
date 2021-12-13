

class MarvelService {
    getResource = async (url) => {
        let res = await fetch(url);

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }
        return await res.json();
    }
    getAllCharacters = () => {
        return this.getResource(`https://gateway.marvel.com:443/v1/public/characters?
        orderBy=name&apikey=e913ae028659ec126c204a2ab5b09eea`);
    }

}

export default MarvelService;