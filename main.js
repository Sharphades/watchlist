const mainTable = document.querySelector('.table-body');
const addButton = document.querySelector('#add-button');
const formButton = document.querySelector('#form-button');
const saveForm = document.querySelector('#save-button');
const cancelForm = document.querySelector('#cancel-button');

const editButton = document.getElementById('edit-button');
const deleteButton = document.getElementById('delete-button');
let tableRow = null;
let numbers = 0;

document.addEventListener('DOMContentLoaded', function() {
    loadTable();
});

function loadTable() {
    const rows = getLocalStoredRows();
    rows.forEach(makeRow);
}

//mag add ug anime sa list or table
function addRow() {
    const title = document.getElementById('anime-title').value;
    const season = document.getElementById('anime-season').value;
    const episode =  document.getElementById('anime-episode').value;
    const date = document.getElementById('anime-date').value;

    if (title && episode && season && date) {
        const rowData = { title, season,episode, date };
        const rows = getLocalStoredRows();
        rows.push(rowData);

        localStorage.setItem('tableRows', JSON.stringify(rows));
        makeRow(rowData); // {{kini nga line kay makayabag 1day sad naghunahuna ug unsaon pag fix}}
        clearInputs();
    } else {
        alert('Fill upi na aysig tinapolan!');
    }
    clearInputs();
}


function deleteRow(element) {
    const row = element.parentElement.parentElement;
    row.classList.add('slide-out');
    
    setTimeout(() => {
        const rows = getLocalStoredRows();
        rows.splice(row.rowIndex - 1, 1);
        
        saveRows(rows);
        mainTable.deleteRow(row.rowIndex - 1);
    }, 500);
    
}

function makeRow(item) {
    const createdRow = mainTable.insertRow();

    createdRow.insertCell(0).innerText = item.title;
    createdRow.insertCell(1).innerText = item.season;
    createdRow.insertCell(2).innerText = item.episode;
    createdRow.insertCell(3).innerText = item.date;
    
    const actionsCell = createdRow.insertCell(4);
    actionsCell.innerHTML = `<button id="delete-button" onclick="deleteRow(this)"><i class="fa-duotone fa-solid fa-trash"></i></button>
                             <button id="edit-button" onclick="editRow(this)"><i class="fa-duotone fa-solid fa-pen-to-square"></i></button>`;
}

function saveRows(item) {
    localStorage.setItem('tableRows', JSON.stringify(item));
}

function getLocalStoredRows() {
    return JSON.parse(localStorage.getItem('tableRows')) || [];
}

function editRow(view) {
    tableRow = view.parentElement.parentElement
    document.getElementById('anime-title').value = tableRow.cells[0].innerText;
    document.getElementById('anime-season').value = tableRow.cells[1].innerText;
    document.getElementById('anime-episode').value = tableRow.cells[2].innerText;
    document.getElementById('anime-date').value = tableRow.cells[3].innerText;

    document.querySelector('.form-bg').style.display = 'inline-block';
    document.querySelector('.form').style.display = 'inline-block';
    formButton.style.display = 'none';
    saveForm.style.display = 'inline-block';
    
}

function saveRow() {
    tableRow.cells[0].innerText = document.getElementById('anime-title').value;
    tableRow.cells[1].innerText = document.getElementById('anime-season').value;
    tableRow.cells[2].innerText = document.getElementById('anime-episode').value;
    tableRow.cells[3].innerText = document.getElementById('anime-date').value;

    document.querySelector('#save-button').style.display = 'none';
    document.querySelector('#form-button').style.display = 'inline-block';

    const rows = getLocalStoredRows();
    rows[tableRow.rowIndex-1].title = document.getElementById('anime-title').value;
    rows[tableRow.rowIndex-1].season = document.getElementById('anime-season').value;
    rows[tableRow.rowIndex-1].episode = document.getElementById('anime-episode').value
    rows[tableRow.rowIndex-1].date = document.getElementById('anime-date').value
    saveRows(rows);

    clearInputs();
}

function clearInputs() {
    document.getElementById('anime-title').value = '';
    document.getElementById('anime-episode').value = '';
    document.getElementById('anime-date').value = '';
    document.getElementById('anime-season').value = '';
}

function hideDialog() {
    const formBackground = document.querySelector('.form-bg');
    const form = document.querySelector('.form');

    formBackground.style.display = 'none';
    form.style.display = 'none';
}

saveForm.addEventListener('click', function(){
    hideDialog();
    saveRow();
});

formButton.addEventListener('click', function() {
    hideDialog();
    addRow();
});

addButton.addEventListener('click', function() {
    const formBackground = document.querySelector('.form-bg');
    const form = document.querySelector('.form');

    formBackground.style.display = 'inline-block';
    form.style.display = 'inline-block';
    form.style.animation = 'toDown 0.5s ease-out';

});

cancelForm.addEventListener('click', function(){
    hideDialog();
});