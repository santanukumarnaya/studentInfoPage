// Sample data list
var studentList = [];

var seq_num = 1 ;

function resetTable() {
  const table = document.getElementById("detail-table-id");
  const tbody = table.getElementsByTagName("tbody")[0];
  tbody.innerHTML = ""; 
  
  // If you want to keep the header row (assuming it's the first row)
  // for (let i = table.rows.length - 1; i > 0; i--) {
  //   table.deleteRow(i);
  // }
}

// Function to render table
function renderTable() {
  console.log("Student list: ", studentList);
  resetTable();
  const table = document.getElementById("detail-table-id");
  const tbody = table.getElementsByTagName("tbody")[0];
  
  studentList.forEach(studentRow => {
    const newRow = tbody.insertRow();
    studentRow.forEach(data=> {
      const newCell = newRow.insertCell();
      newCell.textContent = data;
    })

    const actionCell = newRow.insertCell();
    actionCell.innerHTML = `
      <button class="edit" onclick="editStudentRow(this)"></button>
      <button class="delete" onclick="deleteStudentRow(this)"></button>
    `;

  
  });
}
let editingRow = null;
// I am declaring it golablly and the value is null cause no row is not being edited at the time 
// when the edit button is clicked it's fethes the index or seq_num of the row. 

function editStudentRow(button) {
  const row = button.closest("tr");
  const cells = row.getElementsByTagName("td");
  const rowId = parseInt(cells[0].innerText); 
  editingRow = rowId;
  console.log("Editing Row Id: " , rowId);
  document.getElementById("full-name-id").value = cells[1].innerText;
  document.getElementById("college-name-id").value = cells[2].innerText;
  document.getElementById("qualification-id").value = cells[3].innerText;
  document.getElementById("percentage-id").value = cells[4].innerText;
          //Cannot reverse-calculate DOB from age

  const ageString = cells[5].innerText; // Assuming Age is in the 5th column
  const estimatedDOB = reverseCalculateDOB(ageString);
  document.getElementById("dob-id").value = estimatedDOB; // Fill DOB fiel

}

function deleteStudentRow(button) {
  const row = button.closest("tr");
  const cells = row.getElementsByTagName("td");
  const rowId = parseInt(cells[0].innerText); 
  console.log("Deleting Row Id: " , rowId);
  for(let i=0; i<studentList.length; i++) {
    const studentRow = studentList[i];
    console.log("student row: ", studentRow[0]);
    if(studentRow[0] == rowId) {
      console.log("Matched....");
      studentList.splice(i, 1);
      break;
    }
  }
  renderTable();
}

function addNewRow(event) {
  // event.preventDefault();

  console.log("Current Seq no", seq_num);
  
  const fullName=document.getElementById("full-name-id").value;
  const collegeName= document.getElementById("college-name-id").value;
  const getQualification= document.getElementById("qualification-id").value;
  const getPercentage= document.getElementById("percentage-id").value;
  const getDob= document.getElementById("dob-id").value;
  const getage= calculateAge(getDob);
  
  if(editingRow == null) {
    const row = [seq_num, fullName, collegeName, getQualification, getPercentage, getage];
    seq_num ++;
    studentList.push(row);
  } else {
    const row = [editingRow, fullName, collegeName, getQualification, getPercentage, getage];
    for(let i=0; i<studentList.length; i++) {
      if(studentList[i][0] == editingRow) {
        studentList[i] = row;
        break;
      }
    }
  }
  console.log("student list: ", studentList);
  renderTable();
}

function resetFormInput() {
  editingRow = null;
  document.getElementById("full-name-id").value = "";
  document.getElementById("college-name-id").value = "";
  document.getElementById("qualification-id").value = "";
  document.getElementById("percentage-id").value = "";
  document.getElementById("dob-id").value = "";
  // const collegeName= document.getElementById("college-name-id").value;
  // const getQualification= document.getElementById("qualification-id").value;
  // const getPercentage= document.getElementById("percentage-id").value;
  // const getDob= document.getElementById("dob-id").value;
}



function submitButtonActive(){
  // return getDetailsForm();
  if (getDetailsForm()){
    addNewRow();
    resetFormInput();
  }
}

function getDetailsForm(){
  var isvalid= true;
  if(!isValidFullName()){
    isvalid = false;
  }

  if(!isValidCollege()){
    isvalid = false;
  }

  if(!isValidQualification()){
    isvalid = false;
  }
  if(!isValidPercentage()){
    isvalid = false;
  }
  if(!isvalidDob()){
    isvalid = false;
  }
  return isvalid;
}

function isValidFullName(){
  const fullName=document.getElementById("full-name-id").value;

  if(!fullName) {
    document.getElementById("fullNameError").classList.remove("hide-error-message");
    document.getElementById("fullNameError").classList.add("show-error-messge");
    return false;
  } else {
    document.getElementById("fullNameError").classList.remove("show-error-messge");
    document.getElementById("fullNameError").classList.add("hide-error-message");
    return true;
  }
}

function isValidCollege(){
  const collegeName= document.getElementById("college-name-id").value;

  if(!collegeName) {
    document.getElementById("collegeNameError").classList.remove("hide-error-message");
    document.getElementById("collegeNameError").classList.add("show-error-messge");
    return false;
  } else {
    document.getElementById("collegeNameError").classList.remove("show-error-messge");
    document.getElementById("collegeNameError").classList.add("hide-error-message");
    return true;
  }
}
function isValidQualification(){
  const getQualification= document.getElementById("qualification-id").value;
  if(!getQualification) {
    document.getElementById("QualificationError").classList.remove("hide-error-message");
    document.getElementById("QualificationError").classList.add("show-error-messge");
    return false;
  } else {
    document.getElementById("QualificationError").classList.remove("show-error-messge");
    document.getElementById("QualificationError").classList.add("hide-error-message");
    return true;
  }
}
function isValidPercentage(){
  const value = Number(document.getElementById("percentage-id").value);
  
  if(!value|| isNaN(value) || value < 1 || value > 100) {
    document.getElementById("PercentageError").classList.remove("hide-error-message");
    document.getElementById("PercentageError").classList.add("show-error-messge");
    return false;
  } else {
    document.getElementById("PercentageError").classList.remove("show-error-messge");
    document.getElementById("PercentageError").classList.add("hide-error-message");
    return true;
  }
}
function isvalidDob(){
  const getDob= document.getElementById("dob-id").value;
  if(!getDob) {
    document.getElementById("DobError").classList.remove("hide-error-message");
    document.getElementById("DobError").classList.add("show-error-messge");
    return false;
  } else {
    document.getElementById("DobError").classList.remove("show-error-messge");
    document.getElementById("DobError").classList.add("hide-error-message");
    return true;
  }
}

// Age Calculation


function calculateAge(dobString) {
  const birthDate = new Date(dobString);
  const todayDate = new Date();

  let totalyears = todayDate.getFullYear() - birthDate.getFullYear();
  let totalmonths = todayDate.getMonth() - birthDate.getMonth();
  let totaldays = todayDate.getDate() - birthDate.getDate();

  if (totaldays < 0) {
    // Get days in the previous month
    const previousMonth = new Date(todayDate.getFullYear(), todayDate.getMonth(), 0);
    totaldays += previousMonth.getDate();
    totalmonths--;
  }
  if (totalmonths < 0) {
    totalyears--;
    totalmonths += 12;
  }

  return `${totalyears}y ${totalmonths}m ${totaldays}d`;
}

// Age to DOB reversal

function reverseCalculateDOB(ageString) {
  const [yearsPart, monthsPart, daysPart] = ageString.split(' ');

  // Extract the numeric values from "24y" and "3m"
  const years = parseInt(yearsPart.replace('y', ''), 10);
  const months = parseInt(monthsPart.replace('m', ''), 10);
  const days = parseInt(daysPart.replace('d',''), 10);

  const today = new Date();
  const estimatedDOB = new Date();

  // Subtract years and months from today's date
  estimatedDOB.setFullYear(today.getFullYear() - years);
  estimatedDOB.setMonth(today.getMonth() - months);
  estimatedDOB.setDate(today.getDate()- days);

  return estimatedDOB.toISOString().split('T')[0]; // Returns "YYYY-MM-DD"
}


renderTable();