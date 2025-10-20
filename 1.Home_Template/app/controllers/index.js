import Manager from "./../models/manager.js";
import Api_Service from "./../services/apiService.js";
import Validation from "./../models/validation.js";

const manager = new Manager();

const api = new Api_Service();

const validation = new Validation();

// Dom tới Element ID
const dom_Element_ID = (id) => {
  return document.getElementById(id);
};

// Lấy thông tin sản phẩm
const get_Array_Product = () => {
  const get_Promise = api.get_Api_Promise();

  get_Promise
    .then((result) => {
      render_UI(result.data);
    })
    .catch((error) => {
      console.log(error.data);
    });
};

get_Array_Product();

// Render ra UI
const render_UI = (array_Product) => {
  let contentHTML = "";
  for (let i = 0; i < array_Product.length; i += 1) {
    const object_Product = array_Product[i];
    contentHTML += `
      <div class="product">
          <span class="badge-left">Giảm sốc</span>
          <span class="badge-right">Trả góp 0%</span>
          <img src="${object_Product.img}" alt="${object_Product.type}">
          <h3>${object_Product.name}</h3>
          <p class="stock ${
            object_Product.stock === "stock" ? "inventory" : ""
          }">
          ${object_Product.stock === "new" ? "Hàng mới về" : "Hàng tồn kho"}
          </p>
          <p class="price">${object_Product.price} ₫</p>
          <p class="description">Với màn hình ${
            object_Product.screen
          }.<br>Cụm camera sau ${object_Product.backCamera} và camera trước ${
      object_Product.frontCamera
    }</p>
          <p class="description2">${object_Product.desc}</p>
          <button class="btn-add" onclick="btn_Add_Cart(${
            object_Product.id
          })">Thêm vào giỏ</button>
      </div>
    `;
  }
  dom_Element_ID("product-list").innerHTML = contentHTML;
};

// Khi bấm vào nút thêm vào giỏ hàng
function btn_Add_Cart(id) {
  const get_Product_Promise = api.get_Product_By_ID(id);

  get_Product_Promise
    .then((result) => {
      const object_Product = result.data;
      console.log(object_Product);

      render_Cart(object_Product);
    })
    .catch((error) => {
      console.log(error.data);
    });
}

window.btn_Add_Cart = btn_Add_Cart;

array_Cart = [];

// Render Cart List
const render_Cart = (object_Product) => {
  // const contentCart = "";
  array_Cart.push(object_Product);
  console.log(array_Cart);
};
