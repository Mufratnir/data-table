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
const pagination = document.querySelector(".pagination");
const prevButton = document.querySelector("#prev");
const nextButton = document.querySelector("#next");
const pageLinks = document.querySelector(".page-link");
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

    isEdit = false;
    submitButton.value = "Add User";
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

// searchInput.addEventListener("input", (e) => {
//   const value = e.target.value.toLowerCase();
//   console.log(value);
//   const tr = userTable.getElementsByTagName("tr");
//   for (let i = 0; i < tr.length; i++) {
//     const name = tr[i].getElementsByTagName("td")[1];
//     const email = tr[i].getElementsByTagName("td")[2];
//     if (name || email) {
//       const nameValue = name.textContent || name.innerText;
//       const emailValue = email.textContent || email.innerText;
//       if (
//         nameValue.toLowerCase().indexOf(value) > -1 ||
//         emailValue.toLowerCase().indexOf(value) > -1
//       ) {
//         tr[i].style.display = "";
//       } else {
//         tr[i].style.display = "none";
//       }
//     }
//   }
// });

// Pagination

const rowsPerPage = 5;
let currentPage = 1;

function displayTableRows() {
  const rows = userTable.querySelectorAll(".table-row");
  const totalRows = rows.length;
  const totalPages = Math.ceil(totalRows / rowsPerPage);


  rows.forEach((row, index) => {
    row.style.display =
      index >= (currentPage - 1) * rowsPerPage &&
      index < currentPage * rowsPerPage
        ? "grid"
        : "none";
  });


  updatePagination(totalPages);
}

function updatePagination(totalPages) {
  const paginationContainer = document.getElementById("pagination");
  paginationContainer.innerHTML = "";


  const prev = document.createElement("a");
  prev.href = "#";
  prev.textContent = "Prev";
  prev.addEventListener("click", (e) => {
    e.preventDefault();
    if (currentPage > 1) {
      currentPage--;
      displayTableRows();
    }
  });
  paginationContainer.appendChild(prev);


  for (let i = 1; i <= totalPages; i++) {
    const pageLink = document.createElement("a");
    pageLink.href = "#";
    pageLink.textContent = i;
    pageLink.classList.add("page-link");
    if (i === currentPage) {
      pageLink.classList.add("active");
    }
    pageLink.addEventListener("click", (e) => {
      e.preventDefault();
      currentPage = i;
      displayTableRows();
    });
    paginationContainer.appendChild(pageLink);
  }


  const next = document.createElement("a");
  next.href = "#";
  next.textContent = "Next";
  next.addEventListener("click", (e) => {
    e.preventDefault();
    if (currentPage < totalPages) {
      currentPage++;
      displayTableRows();
    }
  });
  paginationContainer.appendChild(next);
}

const observer = new MutationObserver(() => {
  displayTableRows();
});
observer.observe(userTable, { childList: true });


window.addEventListener("DOMContentLoaded", displayTableRows);