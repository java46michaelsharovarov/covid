import _, { get } from 'lodash'
import CovidDataMediaGroup from './service/covid-data-mediagroup';
import covidConfig from './config/covid-config.json'
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
], "table", "Continents Data", "sortContinents");
const tableHandlerIntervals = new TableHandler([
    {key : 'dateFrom', displayName : 'From'},
    {key : 'dateTo', displayName : 'To'},
    {key : 'cases', displayName : 'Confirmed cases'}
], "table", "cases in");
const tableHandlerVaccine = new TableHandler([
    {key : 'country', displayName : 'Country name'},
    {key : 'percent', displayName : 'Percent of the vaccinated population'},
    {key : 'date', displayName : 'Date of the update'}
], "table", "Vaccine Data", "sorVaccinated");
formHandler.fillOptions("interval-options", covidConfig.intervals);
dataProcessor.getCountriesList().then(r => formHandler.fillOptions("country-options", r));

// async function formHandlerByStatus(status) {
//     formHandler.addHandler(async obj => tableHandlerIntervals.showTable(
//         await handlerWithSpinner(dataProcessor.getCasesByInterval(status, obj)), obj));
// } 
// async function removeFormHandlerByStatus(status) {
//     formHandler.removeHandler(async obj => tableHandlerIntervals.showTable(
//         await handlerWithSpinner(dataProcessor.getCasesByInterval(status, obj)), obj));
// }
async function handlerWithSpinner(promise) {
    let res;
    spinner.start();
    try {
        res = await promise;
    } catch (err) {
        alertMessage.showAlert(`${dataProvider.baseUrl}`, 'server');
    }  
    spinner.stop();   
    return res;  
}
window.sortContinents = async (key) => {
    tableHandler.showTable(await handlerWithSpinner(dataProcessor.sortData(dataProcessor.getAllContinents(), key)));
}
window.sorVaccinated = async (key) => {
    tableHandlerVaccine.showTable(await handlerWithSpinner(dataProcessor.sortData(dataProcessor.getPercentVaccinated(covidConfig.countries), key)));
}
window.hide = () => {
    alertMessage.hideAlert();
    formHandler.hide();
    tableHandler.hideTable();
}
window.showContinents = async () => {
    hide();
    navButtons.setActive(0);
    tableHandler.showTable(await handlerWithSpinner(dataProcessor.getAllContinents()));
}
window.showCasesConfirmed = async () => {
    hide();
    navButtons.setActive(1);
    // removeFormHandlerByStatus('deaths');
    // formHandlerByStatus('confirmed');
    formHandler.removeHandler(async obj => tableHandlerIntervals.showTable(
        await handlerWithSpinner(dataProcessor.getCasesByInterval('deaths', obj)), obj));
    formHandler.addHandler(async obj => tableHandlerIntervals.showTable(
        await handlerWithSpinner(dataProcessor.getCasesByInterval('confirmed', obj)), obj));
    formHandler.show();
}
window.showCasesDeaths = async () => {
    hide();
    navButtons.setActive(2);
    // removeFormHandlerByStatus('confirmed');
    // formHandlerByStatus('deaths');
    formHandler.removeHandler(async obj => tableHandlerIntervals.showTable(
        await handlerWithSpinner(dataProcessor.getCasesByInterval('confirmed', obj)), obj));
    formHandler.addHandler(async obj => tableHandlerIntervals.showTable(
        await handlerWithSpinner(dataProcessor.getCasesByInterval('deaths', obj)), obj));
    formHandler.show();
}
window.showVaccinated = async () => {
    hide();
    navButtons.setActive(3);
    tableHandlerVaccine.showTable(await handlerWithSpinner(dataProcessor.getPercentVaccinated(covidConfig.countries)));
}
