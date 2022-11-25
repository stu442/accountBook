const incomeIndex = document.querySelector("#income_index");
const expenseIndex = document.querySelector("#expense_index");
const totalIndex = document.querySelector("#top_box_number");

let income = 0;
let expense = 0;



function paintSum(){
incomeIndex.innerHTML = income.toLocaleString('ko-KR');
expenseIndex.innerHTML = expense.toLocaleString('ko-KR');
totalIndex.innerHTML = `${(income-expense).toLocaleString('ko-KR')} 원`;
}
