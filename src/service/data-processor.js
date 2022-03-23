export default class Processor {
    #dataProvider
    constructor(dataProvider) {
        this.#dataProvider = dataProvider;
    }    
    async getCountrysList() {
        const countryList = await this.#dataProvider.getContinentCases();
        const res = Object.keys(countryList);
        return res;
     }
    async getAllContinents() {
        const continentCases = await this.#dataProvider.getContinentCases();
        const res = Object.values(continentCases).map(e => {
            return {
                continent: e[0].continent,
                confirmed: this.#getPercentCasesByKey(e, "confirmed"),
                deaths: this.#getPercentCasesByKey(e, "deaths"),
                updated: this.#getDateUpdate(e)
            }
        })
        return res;        
    }
    #getPercentCasesByKey(continent, key) {
        return _.round(this.#getContinentCasesByKey(continent, key) / this.#getContinentPopulation(continent) * 100, 2);
    }
    #getContinentPopulation(continent) {
        return _.sumBy(continent, 'population');
    }
    #getContinentCasesByKey(continent, key) {
        return _.sumBy(continent, key)
    }
    #getDateUpdate(continent) {
        let date = 'no date';
        for(let country of continent) {
            if(country.updated) {
                date = country.updated
            }
        }
        return date;
    }
}