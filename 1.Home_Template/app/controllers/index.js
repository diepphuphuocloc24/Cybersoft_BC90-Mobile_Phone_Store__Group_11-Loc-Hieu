import Manager from "./../models/manager.js";
import Api_Service from "./../services/apiService.js";

const manager = new Manager();

const api = new Api_Service();

const dom_Element_ID = (id) => document.getElementById(id);

// Lấy danh sách sản phẩm
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
          <p class="price">${Number(object_Product.price).toLocaleString(
            "vi-VN"
          )} ₫</p>
          <p class="description">Với màn hình ${
            object_Product.screen
          }.<br>Cụm camera sau ${object_Product.backCamera} và camera trước ${
      object_Product.frontCamera
    }</p>
          <p class="description2">${object_Product.desc}</p>
<button class="btn-add" onclick="btn_Add_Cart('${
      object_Product.id
    }')">Thêm vào giỏ</button>
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
    .catch((error) => {
      console.log(error.data);
    });
}
window.btn_Add_Cart = btn_Add_Cart;

// Render Cart
const render_Cart = (object_Product) => {
  if (object_Product) {
    let found = false;

    for (let i = 0; i < manager.array_Cart.length; i += 1) {
      const product = manager.array_Cart[i];
      if (product.id === object_Product.id) {
        product.quantity += 1;
        found = true;
        break;
      }
    }

    if (!found) {
      object_Product.quantity = 1;
      manager.btn_Add_Cart(object_Product);
    }
  }

  const array_Cart = manager.array_Cart;
  let content_Cart = "";
  let total = 0;

  if (array_Cart.length === 0) {
    content_Cart = `<p class="empty-cart">Chưa có sản phẩm nào</p>`;
  } else {
    for (let i = 0; i < array_Cart.length; i += 1) {
      const product = array_Cart[i];
      total += Number(product.price) * product.quantity;

      content_Cart += `
      <div class="cart-item">
        <h3>${i + 1}</h3>
        <img src="${product.img}" alt="product">
        <div class="cart-item-main">
            <div class="cart-item-content">
                <div class="cart-item-info">
                    <h3 class="item-name">${product.name}</h3>

                    <div class="item-right">
                        <h4 class="item-price">${Number(
                          product.price
                        ).toLocaleString("vi-VN")} ₫</h4>
                        <div class="quantity-control">
                          <button class="qty-btn minus" onclick="handle_Minus('${
                            product.id
                          }')">−</button>
                            <span class="qty-number">${product.quantity}</span>
                          <button class="qty-btn plus" onclick="handle_Add('${
                            product.id
                          }')">+</button>
                        </div>
                    </div>
                </div>
              <button class="remove-btn" onclick="handle_Delete('${
                product.id
              }')">Xóa</button>
            </div>
        </div>
    </div>
      `;
    }

    total += 30000; // Phí vận chuyển
  }

  dom_Element_ID("cart-list").innerHTML = content_Cart;
  dom_Element_ID("total-price").innerHTML =
    total.toLocaleString("vi-VN") + " ₫";
};

// Lưu localStorage
const set_Local_Storage = () => {
  const string_Cart = JSON.stringify(manager.array_Cart);
  localStorage.setItem("CART-LIST", string_Cart);
};

// Lấy từ localStorage
const get_Local_Storage = () => {
  const string_Cart = localStorage.getItem("CART-LIST");
  if (string_Cart) {
    manager.array_Cart = JSON.parse(string_Cart);
    render_Cart();
  }
};
get_Local_Storage();

// Xóa sản phẩm trong giỏ hàng
const handle_Delete = (id) => {
  manager.btn_delete(id);

  render_Cart();

  set_Local_Storage();
};
window.handle_Delete = handle_Delete;

// Tăng số lượng sản phẩm
const handle_Add = (id) => {
  manager.btn_Plus(id);

  render_Cart();

  set_Local_Storage();
};
window.handle_Add = handle_Add;

// Giảm số lượng sản phẩm
const handle_Minus = (id) => {
  manager.btn_Minus(id);

  render_Cart();

  set_Local_Storage();
};
window.handle_Minus = handle_Minus;

// Bấm vào nút Xóa tất cả
document.getElementsByClassName("btn-clear")[0].onclick = () => {
  manager.array_Cart = [];

  render_Cart();

  set_Local_Storage();
};

// Bấm vào nút Thanh toán
document.getElementsByClassName("btn-checkout")[0].onclick = () => {
  if (manager.array_Cart.length === 0) return;

  manager.array_Cart = [];

  alert("Thanh toán thành công! Cảm ơn quý khách đã mua hàng!");

  document.getElementsByClassName("close-btn")[0].click();

  render_Cart();

  set_Local_Storage();
};

// Filter sản phẩm
dom_Element_ID("filter").addEventListener("change", function () {
  const get_Promise = api.get_Api_Promise();
  get_Promise
    .then((result) => {
      const array_Product = result.data;
      // Gán về cái array_Cart của manager để có sản phẩm mà lọc
      manager.arrary_UI = array_Product;

      const selectedType = dom_Element_ID("filter").value;
      const filterResult = manager.filter(selectedType);

      render_UI(filterResult);
    })
    .catch((error) => {
      console.log(error.data);
    });
});
