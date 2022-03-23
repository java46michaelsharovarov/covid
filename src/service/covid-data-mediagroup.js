import _ from "lodash";

export default class CovidDataMediaGroup {
    #baseUrl
    #continentCasesData
    #updateTime
    constructor() {
        this.#baseUrl = 'https://covid-api.mmediagroup.fr/v1/'
    }
    async getContinentCases() {
        if(!this.#continentCasesData || (Date.now() > this.#updateTime + 5000)) {
            const dataResponse = await fetch(this.#baseUrl + 'cases');
            const data = await dataResponse.json();
            const continentData = Object.values(data).map(o => o.All).filter(c => !!c.continent && !!c.population); 
            this.#continentCasesData = _.groupBy(continentData, 'continent');
            this.#updateTime = Date.now();
        }
        return this.#continentCasesData; 
    }
    // async getHistory() {
    //         const dataResponse = await fetch(this.#baseUrl + 'history?status=deaths');
    //         const data  = await dataResponse.json();
    //         return data
    // }
}