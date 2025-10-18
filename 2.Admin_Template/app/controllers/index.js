import Api_Service from "./../services/apiService.js";

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
        <td>
        <button class="btn edit" onclick="btn_Edit('${object_Product.id}')">Sửa</button>
        <button class="btn delete" onclick="btn_Delete('${object_Product.id}')">Xóa</button>
        </td>
      </tr>
    `;
  }
  dom_Element_ID("productTableBody").innerHTML = contentTable;
};

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

const btn_Edit = (id) => {
  console.log(id);
};
window.btn_Edit = btn_Edit;
