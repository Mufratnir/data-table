const closeButton = document.querySelector(".close-button");
const userButton = document.querySelector(".user-button");
const sectionUserAdd = document.querySelector(".section-user-add");
const form = document.querySelector("#user-form");
const nameInput = document.querySelector("#name-input");
const emailInput = document.querySelector("#email-input");
const salaryInput = document.querySelector("#salary-input");
const dob = document.querySelector("#dob-input");
const userTable = document.querySelector("#user-table");
const deleteButton = document.querySelector("#delete-button");
const submitButton = form.querySelector(".submit-btn");
const searchInput = document.querySelector("#search");
const tableRow = document.querySelector(".table-row");

// form open and close
userButton.addEventListener("click", () => {
  sectionUserAdd.style.display = "flex";
});

closeButton.addEventListener("click", () => {
  sectionUserAdd.style.display = "none";
});

let isEdit = false;
// let editRow = null;
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const namevalue = nameInput.value;
  const emailValue = emailInput.value;
  const salaryValue = salaryInput.value;
  const dobvalue = dob.value;
  const idvalue = new Date().getTime().toString();
  
  if (isEdit == false) {
    // form submit and add data to table
    const newRow = document.createElement("tr");
    newRow.classList.add("table-row");
    newRow.innerHTML = `<td id="id">${idvalue}</td>
        <th id= "name">${namevalue}</th>
        <th id= "email">${emailValue}</th>
        <th id= "salary">${salaryValue}</th>
        <th id= "dob">${dobvalue}</th>
        <td class="is-right">
            <button class="btn edit">
              <span class="material-symbols-outlined"> edit </span>
            </button>
            <button class="btn delete">
              <span class="material-symbols-outlined"> delete </span>
            </button>
          </td> `;

    userTable.appendChild(newRow);

    form.reset();

    sectionUserAdd.style.display = "none";
  } else {
    editRow.children[1].textContent = nameInput.value;
    editRow.children[2].textContent = emailInput.value;
    editRow.children[3].textContent = salaryInput.value;
    editRow.children[4].textContent = dob.value;

    form.reset();
    sectionUserAdd.style.display = "none";
  }
});

userTable.addEventListener("click", (e) => {
  if (
    e.target.classList.contains("delete") ||
    e.target.parentElement.classList.contains("delete")
  ) {
    e.target.closest("tr").remove();
  }

  if (
    e.target.classList.contains("edit") ||
    e.target.parentElement.classList.contains("edit")
  ) {
    isEdit = true;
    sectionUserAdd.style.display = "flex";
    const selectRow = e.target.closest("tr");
    editRow = selectRow;
    nameInput.value = selectRow.children[1].textContent;
    emailInput.value = selectRow.children[2].textContent;
    salaryInput.value = selectRow.children[3].textContent;
    dob.value = selectRow.children[4].textContent;


    submitButton.value = "Save Changes";
  }
});

searchInput.addEventListener("input", (e) => {
  const value = e.target.value.toLowerCase();
  console.log(value);
  const tr = userTable.getElementsByTagName("tr");
  for (let i = 0; i < tr.length; i++) {
    const name = tr[i].getElementsByTagName("td")[1];
    const email = tr[i].getElementsByTagName("td")[2];
    if (name || email) {
      const nameValue = name.textContent || name.innerText;
      const emailValue = email.textContent || email.innerText;
      if (nameValue.toLowerCase().indexOf(value) > -1 || emailValue.toLowerCase().indexOf(value) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
});