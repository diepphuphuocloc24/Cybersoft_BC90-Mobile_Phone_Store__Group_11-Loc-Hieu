import Api_Service from "./../services/apiService.js";
import Product from "./../models/product.js";
import Validation from "./../models/validation.js";

const api = new Api_Service();

const validation = new Validation();

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
        <button class="btn edit" onclick="btn_Edit(${
          object_Product.id
        })" data-toggle="modal" data-target="#cart-modal">Sửa</button>
        <button class="btn delete" onclick="btn_Delete(${
          object_Product.id
        })">Xóa</button>
        </td>
      </tr>
    `;
  }
  dom_Element_ID("productTableBody").innerHTML = contentTable;
};

// Khi bấm vào nút xóa sản phẩm
const btn_Delete = (id) => {
  const promise_Delete_Product = api.delete_Api_Product(id);

  promise_Delete_Product
    .then((result) => {
      const object_Product = result.data;
      console.log(object_Product);

      get_Array_Product();

      alert(`Sản phẩm ${object_Product.name} đã được xóa thành công`);
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

  const promise_Edit_Product = api.edit_Api_Product(id);

  promise_Edit_Product
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

  const input_Id = dom_Element_ID("productId").value;
  const input_Name = dom_Element_ID("productName").value;
  const input_Price = dom_Element_ID("productPrice").value;
  const input_Type = dom_Element_ID("productType").value;
  const input_Screen = dom_Element_ID("productScreen").value;
  const input_Back_Camera = dom_Element_ID("productBackCamera").value;
  const input_Front_Camera = dom_Element_ID("productFrontCamera").value;
  const input_Img = dom_Element_ID("productImg").value;
  const input_Stock = dom_Element_ID("productStock").value;
  const input_Desc = dom_Element_ID("productDesc").value;

  const object_Product = new Product(
    input_Id,
    input_Name,
    input_Price,
    input_Type,
    input_Screen,
    input_Back_Camera,
    input_Front_Camera,
    input_Img,
    input_Stock,
    input_Desc
  );
};
