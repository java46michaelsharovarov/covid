import _ from "lodash";

export default class Processor {
    #dataProvider
    constructor(dataProvider) {
        this.#dataProvider = dataProvider;
    } 
    async getCountriesList() {
        const data = await await this.#dataProvider.getCases();
        const countryList = Object.keys(data);
        return countryList;
    }
    async getAllContinents() {
        const cases = await this.#dataProvider.getCases();
        const continentData = Object.values(cases).map(o => o.All).filter(c => !!c.continent && !!c.population); 
        const continentCases = _.groupBy(continentData, 'continent');
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
    #getPercentCasesByKey(data, key) {
        return _.round(this.#getContinentCasesByKey(data, key) / this.#getContinentPopulation(data) * 100, 2);
    }
    #getContinentPopulation(data) {
        return _.sumBy(data, 'population');
    }
    #getContinentCasesByKey(data, key) {
        return _.sumBy(data, key)
    }
    #getDateUpdate(data) {
        let date = 'no date';
        for(let obj of data) {
            if(obj.updated) {
                date = obj.updated
            }
        }
        return date;
    }
    async getCasesByInterval(status, countryAndInterval) {
        const data = await this.#dataProvider.getHistory(countryAndInterval.country, status);
        const datesData = Object.entries(data.All.dates);
        const interval = +countryAndInterval.interval;
        countryAndInterval.status = _.capitalize(status);
        const res = [];
        for(let i = 0; i < datesData.length; i += interval) {
            let j = i+interval;
            if(j > datesData.length){
                j = datesData.length - 1;
            }
            const obj = {
                dateFrom: datesData[j][0],
                dateTo: datesData[i][0],
                cases: datesData[i][1] - datesData[j][1]
            }
            res.push(obj);
        }
        return res;
    }
    async getPercentVaccinated(countries) {
        const vaccin = await this.#dataProvider.getVaccin();
        const vaccinData = Object.values(vaccin).map(o => o.All);
        const selectedCountries = vaccinData.filter(e => {
            let res = false;
            countries.forEach(element => res = element === e.country && !!e.population || res);
            return res;
        }); 
        const res = selectedCountries.map(e => {
            return {
                country: e.country,
                percent: _.round(e.people_vaccinated / e.population * 100, 2),
                date: e.updated.substring(0, 10) || 'no date'
            }
        })
        return res;
    }
    async sortData(data, key) {
        return _.sortBy(await data, key);
    }
}