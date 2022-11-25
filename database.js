import { collection, getDocs, setDoc, doc, deleteDoc } from 'https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js';
import { db } from './firebase.js'
import { count, inputDate, inputPrice, inputContents, incomeCheckBox, expenseCheckBox, mainContainer } from './mainbox.js'

const form = document.querySelector("#form_nav_box");

let dataCount = 0;
let lastDataCount = 0;

async function saveData() {
  try {
    const mainData = await setDoc(doc(db, "main", `div${dataCount}`), {
      contents: inputContents.value,
      date: inputDate.value,
      incomePrice: incomeCheckBox.checked ? inputPrice.value : null,
      expensePrice: expenseCheckBox.checked ? inputPrice.value : null,
      divName: `div${dataCount}`,
      dataCount: dataCount,
    });
    console.log("success!");
    cleanInput();
  } catch (e) {
    console.error("Error adding document: ", e);
    alert("Error!!")
  }
  dataCount++
}

function cleanInput(){
  inputContents.value = "";
  inputPrice.value = "";
  incomeCheckBox.checked = false;
  expenseCheckBox.checked = false;
}


async function loadData(){
  const querySnapshot = await getDocs(collection(db, "main"));
  querySnapshot.forEach((doc) => {
    
    function checkPrice(){
      if(doc.data().expensePrice === null){
          document.querySelector(`#price${doc.data().dataCount}`).style.color = "#845EC2";
          income += Number(doc.data().incomePrice);
    
          
      } else {
          document.querySelector(`#price${doc.data().dataCount}`).style.color = "#FF1D00";
          expense += Number(doc.data().expensePrice);
      }
    }
    
    let newDiv = document.createElement('div');
    let dateDiv = document.createElement('div');
    let nameDiv = document.createElement('div');
    let priceDiv = document.createElement('div');
    let trashDiv = document.createElement('div');

    mainContainer.appendChild(newDiv);
    newDiv.className = "main_div";
    newDiv.id = `div${doc.data().dataCount}`;

    document.querySelector(`#div${doc.data().dataCount}`).appendChild(dateDiv);
    dateDiv.className = "main_date";
    dateDiv.innerText = doc.data().date;

    document.querySelector(`#div${doc.data().dataCount} > .main_date`).appendChild(trashDiv);
    trashDiv.id = `trash_btn${doc.data().dataCount}`
    trashDiv.className = "trash_btn"
    trashDiv.innerText = "🗑";

    document.querySelector(`#div${doc.data().dataCount}`).appendChild(nameDiv);
    nameDiv.className = "main_name";
    nameDiv.innerText = doc.data().contents;

    document.querySelector(`#div${doc.data().dataCount}`).appendChild(priceDiv);
    priceDiv.className = "main_price";
    priceDiv.id = `price${doc.data().dataCount}`;
    checkPrice();
    doc.data().expensePrice === null ? priceDiv.innerText = `+${Number(doc.data().incomePrice).toLocaleString('ko-KR')}` : priceDiv.innerText = `-${Number(doc.data().expensePrice).toLocaleString('ko-KR')}`;

    inputDate.value = doc.data().date;
    paintSum()
    lastDataCount = doc.data().dataCount;
  })
  
    if (dataCount == 0 && lastDataCount != 0){
    dataCount = lastDataCount + 1
  }
  
  return lastDataCount
}

async function deleteDiv(e){
  if(e.target.className == "trash_btn"){
      e.target.parentNode.parentNode.remove();
    await deleteDoc(doc(db, "main", e.target.parentNode.parentNode.id));
  }
}

form.addEventListener('submit', saveData);
mainContainer.addEventListener('click', deleteDiv);

export { loadData }