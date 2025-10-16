// Dom tới Element ID
const dom_Element_ID = (id) => {
  return document.getElementById(id);
};

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
  let contentTable = "";
  for (let i = 0; i < array_Product.length; i += 1) {
    const object_Product = array_Product[i];
    contentTable += `
      <tr>
        <td>${object_Product.id}</td>
        <td>${object_Product.name}</td>
        <td><img src="${object_Product.img}" alt="${object_Product.name}"/>
        </td>
        <td class="price">${object_Product.price} nghìn ₫</td>
        <td>
        <button class="btn edit" onclick="btn_Edit()">Sửa</button>
        <button class="btn delete" onclick="btn_Delete()">Xóa</button>
        </td>
      </tr>
    `;
  }
  dom_Element_ID("productTableBody").innerHTML = contentTable;
};
