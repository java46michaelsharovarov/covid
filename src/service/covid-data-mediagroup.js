import _ from "lodash";

export default class CovidDataMediaGroup {
    baseUrl
    #casesData
    #updateTime
    constructor() {
        this.baseUrl = 'https://covid-api.mmediagroup.fr/v1/'
    }
    async getCases() {
        if(!this.#casesData || (Date.now() > this.#updateTime + 36000000)) {
            const dataResponse = await fetch(this.baseUrl + 'cases');
            this.#casesData = await dataResponse.json(); 
            this.#updateTime = Date.now();
        }
        return this.#casesData; 
    }
    async getHistory(country, status) {
            const dataResponse = await fetch(this.baseUrl + `history?country=${country}&status=${status}`);
            const historyData  = await dataResponse.json();
            return historyData;
    }
    async getVaccin() {
            const dataResponse = await fetch(this.baseUrl + 'vaccines');
            const vaccinData = await dataResponse.json(); 
        return vaccinData; 
    }
}