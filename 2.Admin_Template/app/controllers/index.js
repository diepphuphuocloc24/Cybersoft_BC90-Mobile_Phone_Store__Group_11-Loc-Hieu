import Api_Service from "./../services/apiService.js";
import Product from "./../models/product.js";

const api = new Api_Service();

// Dom tới Element ID
const dom_Element_ID = (id) => {
  return document.getElementById(id);
};

// Lấy thông tin Promise
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
  let contentTable = "";
  for (let i = 0; i < array_Product.length; i += 1) {
    const object_Product = array_Product[i];
    contentTable += `
      <tr>
        <td>${object_Product.id}</td>
        <td>${object_Product.name}</td>
        <td><img src="${object_Product.img}" alt="${object_Product.name}"/>
        </td>
        <td class="price">${object_Product.price} ₫</td>
          <td style="vertical-align: middle;">
            <span class="stock ${
              object_Product.stock === "stock" ? "inventory" : ""
            }">
              ${object_Product.stock === "new" ? "Hàng mới về" : "Hàng tồn kho"}
            </span>
          </td>
        <td>
        <button class="btn edit" onclick="btn_Edit('${
          object_Product.id
        }')" data-toggle="modal" data-target="#cart-modal">Sửa</button>
        <button class="btn delete" onclick="btn_Delete('${
          object_Product.id
        }')">Xóa</button>
        </td>
      </tr>
    `;
  }
  dom_Element_ID("productTableBody").innerHTML = contentTable;
};

// Khi bấm vào nút xóa sản phẩm
const btn_Delete = (id) => {
  const delete_Api_Product = api.delete_Api_Product(id);

  delete_Api_Product
    .then((result) => {
      const object_Product = result.data;
      console.log(object_Product);

      get_Array_Product();

      // window.dom_Element_ID("productTableBody").reload();
    })
    .catch((error) => {
      console.log(error.data);
    });
};
window.btn_Delete = btn_Delete;

// Khi bấm vào nút sửa sản phẩm
const btn_Edit = (id) => {
  dom_Element_ID("modal-title").innerHTML = "Sửa sản phẩm";

  document.getElementsByClassName("btn-submit")[0].style.display = "none";

  document.getElementsByClassName("btn-update")[0].style.display = "block";

  const edit_Api_Product = api.edit_Api_Product(id);

  edit_Api_Product
    .then((result) => {
      const object_Product = result.data;
      console.log(object_Product);
      dom_Element_ID("productId").value = object_Product.id;
      dom_Element_ID("productId").disabled = "true";
      dom_Element_ID("productName").value = object_Product.name;
      dom_Element_ID("productPrice").value = object_Product.price;
      dom_Element_ID("productType").value = object_Product.type.toLowerCase();
      dom_Element_ID("productScreen").value = object_Product.screen;
      dom_Element_ID("productBackCamera").value = object_Product.backCamera;
      dom_Element_ID("productFrontCamera").value = object_Product.frontCamera;
      dom_Element_ID("productImg").value = object_Product.img;
      dom_Element_ID("productStock").value = object_Product.stock.toLowerCase();
      dom_Element_ID("productDesc").value = object_Product.desc;
    })
    .catch((error) => {
      console.log(error.data);
    });
};
window.btn_Edit = btn_Edit;

// Dom tới nút thêm sản phẩm mới
dom_Element_ID("btnAddProduct").onclick = function () {
  dom_Element_ID("modal-title").innerHTML = "Thêm sản phẩm mới";
  dom_Element_ID("addProductForm").reset();

  document.getElementsByClassName("btn-submit")[0].style.display = "block";

  document.getElementsByClassName("btn-update")[0].style.display = "none";
};
