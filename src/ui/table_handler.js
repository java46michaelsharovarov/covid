export default class TableHandler {
    #tableName
    #tableElem
    #columnsDefinition
    constructor(columnsDefinition, tableId, tableName) {
        this.#tableName = tableName ?? '';
        this.#columnsDefinition = columnsDefinition;
        this.#tableElem = document.getElementById(tableId);
        if (!this.#tableElem) {
            throw "Table element is not defined";
        }
    }
    showTable(objects) {
        this.#tableElem.innerHTML = `${this.#getHeader()}${this.#getBody(objects)}${this.#getTableName()}`;
    }
    hideTable() {
        this.#tableElem.innerHTML = '';
    }
    #getTableName() {
        return `<caption class="h3 text-dark caption-top border-0 text-center mt-3">${this.#tableName}</caption>`
    }
    #getHeader() {
        return `<thead><tr>${this.#getColumns()}</tr></thead>`;
    }
    #getColumns() {
        const columns = this.#columnsDefinition.map(c => `<th style="cursor: pointer; vertical-align: middle;">${c.displayName}</th>`);
        let res = columns.join(''); 
        return res;
    }   
    #getBody(objects) {
        return objects.map(o => `<tr>${this.#getRecord(o)}</tr>`).join('');
    }
    #getRecord(object) {
        const record = this.#columnsDefinition.map(c => `<td>${object[c.key]}</td>`);        
        return record.join('');
    }
}