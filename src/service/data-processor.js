export default class Processor {
    #dataProvider
    constructor(dataProvider) {
        this.#dataProvider = dataProvider;
    }
    async getAllContinents() {
        const continentCases = await this.#dataProvider.getContinentCases();
        const res = Object.values(continentCases).map(e => {
            return {
                continent: e[0].continent,
                confirmed: _.round(_.sumBy(e, 'confirmed') / _.sumBy(e, 'population') * 100, 2),
                deaths: _.round(_.sumBy(e, 'deaths') / _.sumBy(e, 'population') * 100, 2),
                updated:e[0].updated
            }
        })
        return res;        
    }
}