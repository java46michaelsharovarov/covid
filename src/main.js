import _, { get } from 'lodash'
import CovidDataMediaGroup from './service/covid-data-mediagroup'
import TableHandler from './ui/table_handler';
import Processor from './service/data-processor';
import NavigatorButtons from './ui/navigators-buttons';
import Spinner from './ui/spinner';

const dataProvider = new CovidDataMediaGroup();
const dataProcessor = new Processor(dataProvider);
const navButtons = new NavigatorButtons();
const spinner = new Spinner("spinner");
const tableHandler = new TableHandler([
    {key : 'continent', displayName : 'Continent Name'},
    {key : 'confirmed', displayName : 'Percent of the confirmed cases from the population'},
    {key : 'deaths', displayName : 'Percent of the death cases from the population'},
    {key : 'updated', displayName : 'Date and Time of the update'}
], "table", "Continents Data");
async function handlerWithSpinner(promise) {
    let res;
    spinner.start();
    try {
        res = await promise;
    } catch (err) {
    }  
    spinner.stop();   
    return res;  
}
window.showContinents = async () => {
    navButtons.setActive(0);
    tableHandler.showTable(await handlerWithSpinner(dataProcessor.getAllContinents()));
}
