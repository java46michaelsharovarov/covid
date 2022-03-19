import _ from "lodash";

export default class CovidDataMediaGroup {
    #baseUrl
    constructor() {
        this.#baseUrl = 'https://covid-api.mmediagroup.fr/v1/'
    }
    async getContinentCases() {
        const dataResponse = await fetch(this.#baseUrl + 'cases');
        const data = await dataResponse.json();
        const continentData = Object.values(data).map(o => o.All).filter(c => !!c.continent);
        return _.groupBy(continentData, 'continent');
    }
}