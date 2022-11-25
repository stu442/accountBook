import { loadData } from './database.js'


const form = document.querySelector("#form_nav_box");

const inputContents = document.querySelector("#input_contents");
const inputPrice = document.querySelector("#input_price");
const inputDate = document.querySelector("#input_date");

const incomeCheckBox = document.querySelector("#income");
const expenseCheckBox = document.querySelector("#expense");
const mainContainer = document.querySelector("#main_container");

let count = 0

// 체크박스 둘 중 하나만 선택하는 함수
function clickCheckIncome() {
    if(expenseCheckBox.checked){
        incomeCheckBox.checked = true;
        expenseCheckBox.checked = false;

    }
}

function clickCheckExpense() {
    if(incomeCheckBox.checked){
        incomeCheckBox.checked = false;
        expenseCheckBox.checked = true;
    }
}

function submit(e){
    e.preventDefault()
    if(!incomeCheckBox.checked && !expenseCheckBox.checked){
        return
    }
    createDiv();
    createDivContents();
    paintSum()
    count++;
}

function checkPrice(){
    if(incomeCheckBox.checked === true){
        document.querySelector(`#price${count}`).style.color = "#845EC2";
        income += Number(inputPrice.value);

        
    } else if (expenseCheckBox.checked === true){
        document.querySelector(`#price${count}`).style.color = "#FF1D00";
        expense += Number(inputPrice.value);
    }
}

function createDiv(){
    let newDiv = document.createElement('div');
    mainContainer.appendChild(newDiv);
    newDiv.className = "main_div";
    newDiv.id = `div${count}`;
}

function createDivContents(){
    let dateDiv = document.createElement('div');
    let nameDiv = document.createElement('div');
    let priceDiv = document.createElement('div');
    let trashDiv = document.createElement('div');

    document.querySelector(`#div${count}`).appendChild(dateDiv);
    dateDiv.className = "main_date";
    dateDiv.innerText = inputDate.value;

    document.querySelector(`#div${count} > .main_date`).appendChild(trashDiv);
    trashDiv.id = `trash_btn${count}`
    trashDiv.className = "trash_btn"
    trashDiv.innerText = "🗑";

    document.querySelector(`#div${count}`).appendChild(nameDiv);
    nameDiv.className = "main_name";
    nameDiv.innerText = inputContents.value;

    document.querySelector(`#div${count}`).appendChild(priceDiv);
    priceDiv.className = "main_price";
    priceDiv.id = `price${count}`
    checkPrice()
    incomeCheckBox.checked ? priceDiv.innerText = `+${Number(inputPrice.value).toLocaleString('ko-KR')}` : priceDiv.innerText = `-${Number(inputPrice.value).toLocaleString('ko-KR')}`
}

async function loadCount(){
    count = await loadData();
    if (count === 0) {
        return
    } else {
        count++
    }
}

form.addEventListener('submit', submit);
incomeCheckBox.addEventListener('click', clickCheckIncome);
expenseCheckBox.addEventListener('click', clickCheckExpense);
window.addEventListener('load', loadCount);

export { count, inputDate, inputPrice, inputContents, incomeCheckBox, expenseCheckBox, mainContainer }