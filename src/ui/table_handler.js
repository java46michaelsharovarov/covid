export default class TableHandler {
    #tableName
    #tableElem
    #columnsDefinition
    #sortFnName
    constructor(columnsDefinition, tableId, tableName, sortFnName) {
        this.#tableName = tableName ?? '';
        this.#columnsDefinition = columnsDefinition;
        this.#tableElem = document.getElementById(tableId);
        this.#sortFnName = sortFnName ?? '';
        if (!this.#tableElem) {
            throw "Table element is not defined";
        }
    }
    showTable(objects, tableNameData) {
        this.#tableElem.innerHTML = `${this.#getHeader()}${this.#getBody(objects)}${this.#getTableName(tableNameData)}`;
    }
    hideTable() {
        this.#tableElem.innerHTML = '';
    }
    #getTableName(tableNameData) {
        let tableName = `<caption class="h3 text-dark caption-top border-0 text-center mt-3">${this.#tableName}</caption>`;
        if(tableNameData) {
            tableName = `<caption class="h3 text-dark caption-top border-0 text-center mt-3">
            ${tableNameData.status} ${this.#tableName} ${tableNameData.country} in interval ${tableNameData.interval} days</caption>`
        }
        return tableName;
    }
    #getHeader() {
        return `<thead><tr>${this.#getColumns()}</tr></thead>`;
    }
    #getColumns() {
        let res = this.#columnsDefinition.map(c => `<th onclick="${this.#getSortFn(c)}" style="cursor: pointer; vertical-align: middle;">${c.displayName}</th>`).join(''); 
        if (!this.#sortFnName) {
            res = res.replaceAll('cursor: pointer;', '');
        }
        return res;
    }   
    #getSortFn(columnsDefinition) {
        return this.#sortFnName ? `${(this.#sortFnName)}('${columnsDefinition.key}');`: '';
    }
    #getBody(objects) {
        return objects.map(o => `<tr>${this.#getRecord(o)}</tr>`).join('');
    }
    #getRecord(object) {
        return this.#columnsDefinition.map(c => `<td>${object[c.key]}</td>`).join('');
    }
}