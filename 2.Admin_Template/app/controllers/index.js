import Api_Service from "./../services/apiService.js";
import Product from "./../models/product.js";
import Manager from "./../models/manager.js";
import Validation from "./../models/validation.js";

const api = new Api_Service();

const manager = new Manager();

const validation = new Validation();

// Dom tới Element ID
export const dom_Element_ID = (id) => document.getElementById(id);

// Lấy thông tin Promise
const get_Array_Product = () => {
  const get_Promise = api.get_Api_Promise();

  get_Promise
    .then((result) => {
      manager.array_Cart = result.data;
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
          <td class="price">${Number(object_Product.price).toLocaleString(
            "vi-VN"
          )} ₫</td>
          <td style="vertical-align: middle;">
            <span class="stock ${
              object_Product.stock === "stock" ? "inventory" : ""
            }">
              ${object_Product.stock === "new" ? "Hàng mới về" : "Hàng tồn kho"}
            </span>
          </td>
        <td>
          <button class="btn edit"
            onclick="btn_Edit('${object_Product.id}')"
            data-toggle="modal" data-target="#cart-modal">
            Sửa
          </button>

          <button class="btn delete"
            onclick="btn_Delete('${object_Product.id}')">
            Xóa
          </button>
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

      alert(
        `Sản phẩm ID là ${object_Product.id} - ${object_Product.name} đã được xóa thành công`
      );
    })
    .catch((error) => {
      console.log(error.data);
    });
};
window.btn_Delete = btn_Delete;

// Khi bấm vào nút sửa sản phẩm
const btn_Edit = (id) => {
  dom_Element_ID("modal-title").innerHTML = "Sửa sản phẩm";

  //Xóa các thông báo lỗi cũ (nếu có)
  const invalids = document.querySelectorAll("[id^='invalid-']");
  invalids.forEach((el) => (el.innerHTML = ""));

  document.getElementsByClassName("btn-submit")[0].style.display = "none";

  document.getElementsByClassName("btn-update")[0].style.display = "block";

  const promise_Edit_Product = api.edit_Api_Product(id);

  promise_Edit_Product
    .then((result) => {
      const object_Product = result.data;
      console.log(object_Product);
      dom_Element_ID("productId").value = object_Product.id;
      dom_Element_ID("productId").disabled = true;
      dom_Element_ID("productName").value = object_Product.name;
      dom_Element_ID("productPrice").value = object_Product.price;
      dom_Element_ID("productType").value = object_Product.type.toLowerCase();
      dom_Element_ID("productScreen").value = object_Product.screen;
      dom_Element_ID("productBackCamera").value = object_Product.backCamera;
      dom_Element_ID("productFrontCamera").value = object_Product.frontCamera;
      dom_Element_ID("productImg").value = object_Product.img;
      dom_Element_ID("productStock").value = object_Product.stock.toLowerCase();
      dom_Element_ID("productDesc").value = object_Product.desc;

      // Khóa ID khi sửa
      dom_Element_ID("productId").disabled = true;
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

  dom_Element_ID("productId").disabled = false;
};

// Dom tới nút submit trong modal thêm sản phẩm
dom_Element_ID("btnSubmit").onclick = function (e) {
  e.preventDefault();

  // Dom tới người dùng nhập
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

  // Boolean
  let isValid = true;

  // Kiểm tra validation
  isValid &= validation.checkEmpty(
    input_Id,
    "invalid-ID",
    "(*) Vui lòng nhập ID"
  );

  isValid =
    isValid &&
    validation.checkDuplicateID(
      input_Id,
      manager.array_Cart,
      "invalid-ID",
      "(*) ID này đã tồn tại, vui lòng nhập ID khác!"
    );
  isValid &= validation.checkEmpty(
    input_Name,
    "invalid-name",
    "(*) Vui lòng nhập tên sản phẩm"
  );
  isValid &= validation.checkEmpty(
    input_Price,
    "invalid-price",
    "(*) Vui lòng nhập giá sản phẩm"
  );
  isValid &= validation.checkOption(
    "productType",
    "invalid-type",
    "(*) Vui lòng chọn loại sản phẩm"
  );
  isValid &= validation.checkEmpty(
    input_Screen,
    "invalid-screen",
    "(*) Vui lòng nhập thông số màn hình"
  );
  isValid &= validation.checkEmpty(
    input_Back_Camera,
    "invalid-back_Camera",
    "(*) Vui lòng nhập thông số camera sau"
  );
  isValid &= validation.checkEmpty(
    input_Front_Camera,
    "invalid-front_Camera",
    "(*) Vui lòng nhập thông số camera trước"
  );
  isValid &=
    validation.checkEmpty(
      input_Img,
      "invalid-img",
      "(*) Vui lòng nhập URl sản phẩm"
    ) &&
    validation.checkURL(
      input_Img,
      "invalid-img",
      "(*) Vui lòng nhập đúng cú pháp"
    );
  isValid &= validation.checkOption(
    "productStock",
    "invalid-stock",
    "(*) Vui lòng cập nhật tình trạng sản phẩm"
  );
  isValid &= validation.checkEmpty(
    input_Desc,
    "invalid-desc",
    "(*) Vui lòng mô tả sản phẩm"
  );

  if (!isValid) return false;

  const product = new Product(
    input_Id,
    input_Name,
    input_Price,
    input_Screen,
    input_Back_Camera,
    input_Front_Camera,
    input_Img,
    input_Desc,
    input_Type,
    input_Stock
  );

  const array_Cart = manager.btn_Add_Cart(product);
  console.log(array_Cart);

  const add_Product = api.add_Api_Product(product);

  add_Product
    .then((result) => {
      const object_Product = result.data;
      get_Array_Product();

      // Dom tới nút đóng để close sau khi thêm
      document.getElementsByClassName("close-btn")[0].click();

      // Báo lại cho người dùng là thêm
      alert(
        `Sản phẩm ID là ${object_Product.id} - ${object_Product.name} đã được thêm thành công`
      );
    })
    .catch((error) => {
      console.log(error);
    });
};

// Dom tới nút update trong modal sửa sản phẩm
dom_Element_ID("btnUpdate").onclick = function (e) {
  e.preventDefault();
  // Dom tới người dùng nhập
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

  // Boolean
  let isValid = true;

  // Kiểm tra validation
  isValid &= validation.checkEmpty(
    input_Id,
    "invalid-ID",
    "(*) Vui lòng nhập ID"
  );

  isValid =
    isValid &&
    validation.checkDuplicateID(
      input_Id,
      manager.array_Cart,
      "invalid-ID",
      "(*) ID này đã tồn tại, vui lòng nhập ID khác!"
    );

  isValid &= validation.checkEmpty(
    input_Name,
    "invalid-name",
    "(*) Vui lòng nhập tên sản phẩm"
  );
  isValid &= validation.checkEmpty(
    input_Price,
    "invalid-price",
    "(*) Vui lòng nhập giá sản phẩm"
  );
  isValid &= validation.checkOption(
    "productType",
    "invalid-type",
    "(*) Vui lòng chọn loại sản phẩm"
  );
  isValid &= validation.checkEmpty(
    input_Screen,
    "invalid-screen",
    "(*) Vui lòng nhập thông số màn hình"
  );
  isValid &= validation.checkEmpty(
    input_Back_Camera,
    "invalid-back_Camera",
    "(*) Vui lòng nhập thông số camera sau"
  );
  isValid &= validation.checkEmpty(
    input_Front_Camera,
    "invalid-front_Camera",
    "(*) Vui lòng nhập thông số camera trước"
  );
  isValid &=
    validation.checkEmpty(
      input_Img,
      "invalid-img",
      "(*) Vui lòng nhập URl sản phẩm"
    ) &&
    validation.checkURL(
      input_Img,
      "invalid-img",
      "(*) Vui lòng nhập đúng cú pháp"
    );
  isValid &= validation.checkOption(
    "productStock",
    "invalid-stock",
    "(*) Vui lòng cập nhật tình trạng sản phẩm"
  );
  isValid &= validation.checkEmpty(
    input_Desc,
    "invalid-desc",
    "(*) Vui lòng mô tả sản phẩm"
  );

  if (!isValid) return false;

  const product = new Product(
    input_Id,
    input_Name,
    input_Price,
    input_Screen,
    input_Back_Camera,
    input_Front_Camera,
    input_Img,
    input_Desc,
    input_Type,
    input_Stock
  );

  const array_Cart = manager.btn_Add_Cart(product);
  console.log(array_Cart);

  const update_Product = api.update_Api_Product(product);
  update_Product
    .then((result) => {
      const object_Product = result.data;
      get_Array_Product();
      // Dom tới nút đóng để close sau khi thêm
      document.getElementsByClassName("close-btn")[0].click();
      // Báo lại cho người dùng là thêm
      alert(
        `Sản phẩm ID là ${object_Product.id} - ${object_Product.name} đã được cập nhật thành công`
      );
    })
    .catch((error) => {
      console.log(error);
    });
};

/**
 * Filter Type
 */
dom_Element_ID("filter").addEventListener("change", () => {
  const type = dom_Element_ID("filter").value;

  const productFilter = manager.filterProduct(type);

  render_UI(productFilter);
});

/**
 * Search Product
 */
dom_Element_ID("searchInput").addEventListener("keyup", () => {
  const keyword = dom_Element_ID("searchInput").value;

  const searchName = manager.searchName(keyword);

  render_UI(searchName);
});

/**
 * Filter Price
 */
dom_Element_ID("sortPrice").addEventListener("change", () => {
  const order = dom_Element_ID("sortPrice").value;

  if (order === "default") {
    render_UI(manager.array_Cart);
  } else {
    const sortedProducts = manager.sortProduct(order);
    render_UI(sortedProducts);
  }
});

/**
 *  Filter + Sort
 */

function handleFilterAndSort() {
  const selectedType = dom_Element_ID("filter").value;
  const selectedOrder = dom_Element_ID("sortPrice").value;

  let filteredProducts = manager.filterProduct(selectedType);

  if (selectedOrder === "asc" || selectedOrder === "desc") {
    // Sao chép mảng để không ảnh hưởng mảng gốc
    filteredProducts = [...filteredProducts].sort((a, b) => {
      if (selectedOrder === "asc") {
        return Number(a.price) - Number(b.price);
      } else {
        return Number(b.price) - Number(a.price);
      }
    });
  }
  render_UI(filteredProducts);
}
/**
 * Gán sự kiện cho cả 2: Khi người dùng thay đổi loại sản phẩm hoặc sắp xếp giá
 */
dom_Element_ID("filter").addEventListener("change", handleFilterAndSort);
dom_Element_ID("sortPrice").addEventListener("change", handleFilterAndSort);
