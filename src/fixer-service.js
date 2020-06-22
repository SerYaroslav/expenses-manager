export default class FixerService {

  _apiUrl = "http://data.fixer.io/api/latest?access_key=ebcfb092d311044b6a5e85e1980abdab"

  getResource = async (url) => {
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(`Could not fetch ${url} +
        , received ${res.status}`);
    }

    return await res.json();
  }

  getRates = async (url = this._apiUrl) => {
    const data = await this.getResource(url);
    const res = this._transformRate(data);
    return res
  }

  _transformRate = (fetchedObj) => {
    return {
      rates: fetchedObj.rates,
    };
  }

}
