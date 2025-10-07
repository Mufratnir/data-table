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
// form open and close
userButton.addEventListener("click", () => {
  sectionUserAdd.style.display = "flex";
});

closeButton.addEventListener("click", () => {
  sectionUserAdd.style.display = "none";
});

// form submit and add data to table
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const namevalue = nameInput.value;
  const emailValue = emailInput.value;
  const salaryValue = salaryInput.value;
  const dobvalue = dob.value;
  const idvalue= new Date().getTime().toString();

  const newRow = document.createElement("tr");
  newRow.classList.add("table-row");
  newRow.innerHTML = `<td id="id">${idvalue}</td>
        <th id= "name">${namevalue}</th>
        <th id= "email">${emailValue}</th>
        <th id= "salary">${salaryValue}</th>
        <th id= "dob">${dobvalue}</th>
        <td class="is-right">
            <button class="btn">
              <span class="material-symbols-outlined"> edit </span>
            </button>
            <button class="btn">
              <span class="material-symbols-outlined"> delete </span>
            </button>
          </td> `;
        
        userTable.appendChild(newRow);

        form.reset();

        sectionUserAdd.style.display = "none";
});

userTable.addEventListener("click", (e) => {
        
})