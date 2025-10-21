class Api_Service {
  get_Api_Promise() {
    const get_Api_Promise = axios({
      url: "https://68e90f09f2707e6128cd5c12.mockapi.io/api/Products",
      method: "GET",
    });

    return get_Api_Promise;
  }

  delete_Api_Product(id) {
    const promise_Delete_Product = axios({
      url: `https://68e90f09f2707e6128cd5c12.mockapi.io/api/Products/${id}`,
      method: "DELETE",
    });

    return promise_Delete_Product;
  }

  edit_Api_Product(id) {
    const promise_Edit_Product = axios({
      url: `https://68e90f09f2707e6128cd5c12.mockapi.io/api/Products/${id}`,
      method: "GET",
    });
    return promise_Edit_Product;
  }

  add_Api_Product(product) {
    const promise_Add_Product = axios({
      url: "https://68e90f09f2707e6128cd5c12.mockapi.io/api/Products",
      method: "POST",
      data: product,
    });
    return promise_Add_Product;
  }

  update_Api_Product(product) {
    const promise_Update_Product = axios({
      url: `https://68e90f09f2707e6128cd5c12.mockapi.io/api/Products/${product.id}`,
      method: "PUT",
      data: product,
    });
    return promise_Update_Product;
  }
}
export default Api_Service;
