import _, { get } from 'lodash'
import CovidDataMediaGroup from './service/covid-data-mediagroup'
import TableHandler from './ui/table_handler';
import Processor from './service/data-processor';
import NavigatorButtons from './ui/navigators-buttons';
import Spinner from './ui/spinner';
import FormHandler from './ui/form_handler';
import Alert from './ui/alert';

const dataProvider = new CovidDataMediaGroup();
const dataProcessor = new Processor(dataProvider);
const navButtons = new NavigatorButtons();
const spinner = new Spinner("spinner");
const formHandler = new FormHandler("interval-form");
const alertMessage = new Alert("alert");
const tableHandler = new TableHandler([
    {key : 'continent', displayName : 'Continent Name'},
    {key : 'confirmed', displayName : 'Percent of the confirmed cases from the population'},
    {key : 'deaths', displayName : 'Percent of the death cases from the population'},
    {key : 'updated', displayName : 'Date and Time of the update'}
], "table", "Continents Data");
formHandler.fillOptions("country-options", dataProcessor.getCountrysList());
// formHandler.fillOptions("interval-options", dataProcessor.getCountrysList());
async function handlerWithSpinner(promise) {
    let res;
    spinner.start();
    try {
        res = await promise;
    } catch (err) {
        alertMessage.showAlert(`${URL}`, 'server');
    }  
    spinner.stop();   
    return res;  
}
window.hide = () => {
    formHandler.hide();
    tableHandler.hideTable();
}
window.showContinents = async () => {
    navButtons.setActive(0);
    tableHandler.showTable(await handlerWithSpinner(dataProcessor.getAllContinents()));
}
// window.showInterval = async () => {
//     navButtons.setActive(1);
//     hide();
//     formHandler.show(await handlerWithSpinner(dataProcessor.getCountryByInterval()));
// }
