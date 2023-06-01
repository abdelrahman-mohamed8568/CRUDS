const title = document.getElementById("title");
const price = document.getElementById("price");
const taxes = document.getElementById("taxes");
const discount = document.getElementById("discount");
const total = document.getElementById("total");
const count = document.getElementById("count");
const category = document.getElementById("category");
const create = document.getElementById("create");
const span = document.getElementById("up");
const upload = "create";
let x;
function getTotal() {
  if (price.value != "") {
    let result = +price.value + +taxes.value - +discount.value;
    total.innerHTML = result;
    total.style.backgroundColor = "rgb(70, 131, 73)";
  } else {
    total.innerHTML = "";
    total.style.backgroundColor = "darkslateblue";
  }
}

let proData;
if (localStorage.project != null) {
  proData = JSON.parse(localStorage.project);
} else {
  proData = [];
}
function createNewData() {
  if (title.value && category.value && price.value != "") {
    let newPro = {
      title: title.value,
      price: price.value,
      taxes: taxes.value,
      discount: discount.value,
      category: category.value,
      count: count.value,
      total: total.innerHTML,
    };
    if (upload === "create") {
      if (newPro.count > 1) {
        for (let i = 0; i < newPro.count; i++) {
          proData.push(newPro);
        }
      } else {
        proData.push(newPro);
      }
    } else {
      proData[x] = newPro;
      upload = "create";
      create.innerHTML = "Create";
      count.style.display = "block";
    }
    localStorage.setItem("project", JSON.stringify(proData));
    console.log(newPro);
    clearData();
    showData();
  }
}

function clearData() {
  title.value = "";
  price.value = "";
  taxes.value = "";
  discount.value = "";
  category.value = "";
  count.value = "";
  total.innerHTML = "";
  total.style.backgroundColor = "darkslateblue";
}
function showData() {
  let table = " ";
  for (let i = 0; i < proData.length; i++) {
    table += `
    <tr>
    <td>${i + 1}</td>
    <td>${proData[i].title}</td>
    <td>${proData[i].price}</td>
    <td>${proData[i].taxes}</td>
    <td>${proData[i].discount}</td>
    <td>${proData[i].total}</td>
    <td>${proData[i].category}</td>
    <td>
    <button onclick = 'updateData(${i})' id="update">Update</button>
    </td>
    <td>
    <button onclick = 'deleteData(${i})' id='delete'>Delete</button> 
    </td>
  </tr>
  `;
  }
  document.getElementById("tbody").innerHTML = table;
  let deleteAll = document.getElementById("deleteAll");
  if (proData.length > 0) {
    deleteAll.innerHTML = `
    <button onclick = 'deleteAll()' id="deleteBtn">Delete All (${proData.length})</button>
    `;
  } else {
    deleteAll.innerHTML = "";
  }
}
showData();
let deleteIndex;
function deleteAll() {
  document.getElementById("deleteBtn").addEventListener("click", function () {
    document.getElementById("blur").classList.add("blur");
    document.getElementById("popup").classList.add("open-popup");
    document.getElementById("popupH2").innerHTML = `
    Do You Want To Delete All Products?`;
  });
  document.querySelector(".btnDelete").addEventListener("click", function () {
    proData = [];
    localStorage.project = JSON.stringify(proData);
    document.getElementById("blur").classList.remove("blur");
    popup.classList.remove("open-popup");
    document.getElementById("blur").classList.remove("blur");
    showData();
  });
  document.querySelector(".btnCancel").addEventListener("click", function () {
    popup.classList.remove("open-popup");
    document.getElementById("blur").classList.remove("blur");
  });
}
function deleteData(i) {
  document.getElementById("popup").classList.add("open-popup");
  document.getElementById("popupH2").innerHTML = `
  Do You Want To Delete This Product?`;
  document.getElementById("blur").classList.add("blur");
  deleteIndex = i;
}
document.querySelector(".btnDelete").addEventListener("click", function () {
  proData.splice(deleteIndex, 1);
  localStorage.project = JSON.stringify(proData);
  popup.classList.remove("open-popup");
  document.getElementById("blur").classList.remove("blur");
  showData();
});

document.querySelector(".btnCancel").addEventListener("click", function () {
  popup.classList.remove("open-popup");
  document.getElementById("blur").classList.remove("blur");
});

function updateData(i) {
  title.value = proData[i].title;
  price.value = proData[i].price;
  taxes.value = proData[i].taxes;
  discount.value = proData[i].discount;
  category.value = proData[i].category;
  getTotal();
  count.style.display = "none";
  create.innerHTML = "Update";
  upload = "update";
  x = i;
  scroll({
    top: 0,
    behavior: "smooth",
  });
}
onscroll = function () {
  if (this.scrollY >= 400) {
    span.style.visibility = "visible";
  } else {
    span.style.visibility = "hidden";
  }
};
span.onclick = function () {
  scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

document.querySelector("#category").addEventListener("keyup", (e) => {
  if (e.keyCode === 13) {
    createNewData();
    category.blur();
  }
});

function srearchAll(value) {
  let table = " ";
  value = value.toLowerCase();

  for (let i = 0; i < proData.length; i++) {
    if (
      proData[i].title.includes(value) ||
      proData[i].category.includes(value) ||
      proData[i].total.includes(value)
    ) {
      table += `
      <tr>
      <td>${i + 1}</td>
      <td>${proData[i].title}</td>
      <td>${proData[i].price}</td>
      <td>${proData[i].taxes}</td>
      <td>${proData[i].discount}</td>
      <td>${proData[i].total}</td>
      <td>${proData[i].category}</td>
      <td>
      <button onclick = 'updateData(${i})' id="update">Update</button>
      </td>
      <td>
      <button onclick = 'deleteData(${i})' id='delete'>Delete</button> 
      </td>
    </tr>
    `;
    }
  }
  document.getElementById("tbody").innerHTML = table;
}
