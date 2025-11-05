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

      render_Best_Seller(result.data);
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
            <p class="price"><span class="text-black font-light text-sm">Giá chỉ từ:</span> 
            ${Number(object_Product.price).toLocaleString("vi-VN")}đ</p>
            <p class="description">Với màn hình ${
              object_Product.screen
            }.<br>Cụm camera sau ${object_Product.backCamera} và camera trước ${
      object_Product.frontCamera
    }</p>
            <p class="description2">${object_Product.desc}</p>

          <div class="flex flex-col gap-2 w-full">
            <button 
              class="!bg-red-500 !text-white !font-bold !py-2.5 !shadow-md hover:!bg-red-600 !transition-all !duration-300">
              MUA NGAY
            </button>

            <div class="flex w-full gap-2">
              <button 
                class="flex-4 !border !border-blue-500 !text-blue-600 !bg-white !font-semibold !py-2.5 !shadow-sm hover:!bg-cyan-200 !transition-all !duration-300">
                Trả góp 0%
              </button>

              <button 
                class="flex-1 !border !border-red-500 !text-red-500 !bg-white !font-semibold !py-2.5 !shadow-sm hover:!bg-red-200 !transition-all !duration-300"
                onclick="btn_Add_Cart('${object_Product.id}')">
                <i class="fa-solid fa-cart-plus text-base"></i>
              </button>
            </div>
          </div>
        </div>
      `;
  }
  dom_Element_ID("product-list").innerHTML = contentHTML;
};

// Khi render phần Best Seller
function initBestSellerCarousel() {
  const $carousel = $(".best-seller");

  // Nếu đã khởi tạo rồi, hủy trước khi khởi tạo lại
  if ($carousel.hasClass("owl-loaded")) {
    $carousel.trigger("destroy.owl.carousel");
    $carousel
      .html($carousel.find(".owl-stage-outer").html())
      .removeClass("owl-loaded");
  }

  // Khởi tạo lại carousel
  $carousel.owlCarousel({
    loop: true,
    margin: 10,
    nav: true,
    dots: true,
    responsive: {
      0: { items: 1 },
      576: { items: 2 },
      768: { items: 3 },
      1024: { items: 4 },
    },
  });
}

// Phần Best Seller
const render_Best_Seller = (array_Product) => {
  const newProducts = array_Product.filter((item) => item.stock === "new");

  let contentHTML = "";
  for (let i = 0; i < newProducts.length; i++) {
    const object_Product = newProducts[i];
    contentHTML += `
      <div class="item">
        <div class="card">
          <img src="${object_Product.img}" alt="${object_Product.name}">
          <h5>${object_Product.name}</h5>
          <p><span>Giá chỉ từ:</span> <span class="price-red">${Number(
            object_Product.price
          ).toLocaleString("vi-VN")}đ</span></p>
          <p><span>Bù chỉ từ:</span> <span class="price-blue">${(
            Number(object_Product.price) - 5000000
          ).toLocaleString("vi-VN")}đ</span></p>
          <button>Xem chi tiết</button>
        </div>
      </div>
    `;
  }

  dom_Element_ID("best-seller").innerHTML = contentHTML;

  // Re-init carousel
  setTimeout(() => initBestSellerCarousel(), 0);
};

// Hiệu ứng thêm vào giỏ hàng
const show_Cart_Popup = () => {
  const popup = document.getElementById("cart-popup");
  if (popup._hideTimeout) {
    clearTimeout(popup._hideTimeout);
    popup._hideTimeout = null;
  }

  const prevTransition = popup.style.transition;
  popup.style.transition = "none";

  popup.classList.remove("opacity-0", "pointer-events-none", "scale-0");
  popup.classList.add("opacity-100", "scale-100");

  void popup.offsetWidth;

  popup.style.transition = prevTransition || "";

  popup._hideTimeout = setTimeout(() => {
    popup.classList.remove("scale-100", "opacity-100");
    popup.classList.add("scale-0", "opacity-0", "pointer-events-none");
    popup._hideTimeout = null;
  }, 150);
};

// Khi bấm Thêm vào giỏ
function btn_Add_Cart(id) {
  const get_Product_Promise = api.get_Product_By_ID(id);
  get_Product_Promise
    .then((result) => {
      const object_Product = result.data;

      manager.btn_Add_Cart(object_Product);
      render_Cart(object_Product);
      set_Local_Storage();

      show_Cart_Popup();
    })
    .catch((error) => {
      console.log(error.data);
    });
}
window.btn_Add_Cart = btn_Add_Cart;

// Tính tổng tiền
const calculate_Total = (array_Cart) => {
  if (array_Cart.length === 0) {
    return 0;
  } else {
    const subtotal = array_Cart.reduce((total, product) => {
      return total + product.price * product.quantity;
    }, 0);

    return subtotal + 30000; // phí ship
  }
};

// Render Cart
const render_Cart = () => {
  const array_Cart = manager.array_Cart;

  let content_Cart = "";

  if (array_Cart.length === 0) {
    content_Cart = `<p class="empty-cart">Chưa có sản phẩm nào</p>`;
  } else {
    for (let i = 0; i < array_Cart.length; i += 1) {
      const product = array_Cart[i];
      content_Cart += `
        <div class="cart-item">
          <h3>${i + 1}</h3>
          <img src="${product.img}" alt="product">
          <div class="cart-item-main">
              <div class="cart-item-content">
                  <div class="cart-item-info">
                      <h3 class="item-name">${product.name}</h3>

                      <div class="item-right">
                          <h4 class="item-price">${product.price.toLocaleString(
                            "vi-VN"
                          )} ₫</h4>
                        <div class="quantity-control">
                          <button class="qty-btn minus" onclick="handle_Change_Quantity('${
                            product.id
                          }', false)">−</button>
                          <span class="qty-number">${product.quantity}</span>
                          <button class="qty-btn plus" onclick="handle_Change_Quantity('${
                            product.id
                          }', true)">+</button>
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
  }

  dom_Element_ID("cart-list").innerHTML = content_Cart;

  dom_Element_ID("total-price").innerHTML =
    calculate_Total(array_Cart).toLocaleString("vi-VN") + " ₫";

  const totalCartQuantity = () => {
    return array_Cart.reduce((totalQuantity, phone) => {
      return totalQuantity + phone.quantity;
    }, 0);
  };

  dom_Element_ID("cart-count").innerHTML = dom_Element_ID(
    "cart-count"
  ).innerText = totalCartQuantity();
  if (array_Cart.length > 0) {
    dom_Element_ID("cart-count").style.display = "block";
  } else {
    dom_Element_ID("cart-count").style.display = "none";
  }
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

// Khi bấm nút thay đổi số lượng sản phẩm
const handle_Change_Quantity = (id, status) => {
  const index = manager.Find_Index(id);

  if (index !== -1) {
    const object_Product = manager.array_Cart[index];

    if (status) {
      object_Product.quantity += 1;
    } else {
      object_Product.quantity -= 1;

      if (object_Product.quantity <= 0) {
        manager.array_Cart = manager.array_Cart.filter(
          (object_Product) => object_Product.id !== id
        );
      }
    }

    render_Cart();

    set_Local_Storage();
  }
};

window.handle_Change_Quantity = handle_Change_Quantity;

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

  document.querySelector(".discount-group input").value = "";

  document.getElementById("agree-terms").checked = false;
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
