import Manager from "./manager.js";

const manager = new Manager();

// Dom tới Element ID
const dom_Element_ID = (id) => {
  return document.getElementById(id);
};

// Lấy thông tin sản phẩm
const get_Array_Product = () => {
  const get_Promise = axios({
    url: "https://68e90f09f2707e6128cd5c12.mockapi.io/api/Products",
    method: "GET",
  });

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
            <img src="${object_Product.img}" alt="${object_Product.type}">
            <h3>${object_Product.name}</h3>
            <p class="stock">Hàng mới về</p>
            <p class="price">${object_Product.price} nghìn ₫</p>
            <p class="description">Với màn hình ${object_Product.screen}.<br>Cụm camera sau ${object_Product.backCamera} và camera trước ${object_Product.frontCamera}</p>
            <p class="description2">${object_Product.desc}</p>
            <button class="btn-add" onclick="btn_Add_Cart('${object_Product}')">Thêm vào giỏ</button>
        </div>
    `;
  }
  dom_Element_ID("product-list").innerHTML = contentHTML;
};

// Khi bấm vào nút thêm vào giỏ hàng
function btn_Add_Cart(object_Product) {
  console.log(object_Product);
}

window.btn_Add_Cart = btn_Add_Cart;

// Render Cart List
