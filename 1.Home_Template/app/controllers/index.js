import Manager from "./../models/manager.js";
import Api_Service from "./../services/apiService.js";
import Validation from "./../models/validation.js";

const manager = new Manager();
const api = new Api_Service();
const validation = new Validation();

const dom_Element_ID = (id) => document.getElementById(id);

// Lấy danh sách sản phẩm
const get_Array_Product = () => {
  const get_Promise = api.get_Api_Promise();
  get_Promise
    .then((result) => render_UI(result.data))
    .catch((error) => console.log(error.data));
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
          <p class="price">${Number(object_Product.price).toLocaleString(
            "vi-VN"
          )} ₫</p>
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

// Khi bấm Thêm vào giỏ
function btn_Add_Cart(id) {
  const get_Product_Promise = api.get_Product_By_ID(id);
  get_Product_Promise
    .then((result) => {
      const object_Product = result.data;
      render_Cart(object_Product);
      set_Local_Storage();
    })
    .catch((error) => console.log(error.data));
}
window.btn_Add_Cart = btn_Add_Cart;

// Render Cart
const render_Cart = (object_Product) => {
  if (object_Product) {
    const found = manager.array_Cart.find((p) => p.id === object_Product.id);
    if (found) {
      found.quantity += 1;
    } else {
      object_Product.quantity = 1;
      manager.btn_Add_Cart(object_Product);
    }
  }

  const array_Cart = manager.array_Cart;
  let content_Cart = "";
  let total = 0;

  for (let i = 0; i < array_Cart.length; i++) {
    const product = array_Cart[i];
    total += Number(product.price) * product.quantity;

    content_Cart += `
    <div class="cart-item">
      <p class="item-name">${product.name}</p>
      <img src="${product.img}" width="40px" alt="">
      <p class="item-price">${Number(product.price).toLocaleString(
        "vi-VN"
      )} ₫</p>
      <div class="quantity-control">
          <button class="qty-btn minus">−</button>
          <span class="qty-number">${product.quantity}</span>
          <button class="qty-btn plus">+</button>
      </div>
      <button class="remove-btn">Xóa</button>
    </div>`;
  }

  dom_Element_ID("cart-list").innerHTML = content_Cart;
  dom_Element_ID("total-price").innerHTML =
    total.toLocaleString("vi-VN") + " ₫";
};

// Lưu local
const set_Local_Storage = () => {
  const string_Cart = JSON.stringify(manager.array_Cart);
  localStorage.setItem("CART-LIST", string_Cart);
};

// Lấy local
const get_Local_Storage = () => {
  const string_Cart = localStorage.getItem("CART-LIST");
  if (string_Cart) {
    manager.array_Cart = JSON.parse(string_Cart);
    render_Cart();
  }
};
get_Local_Storage();
