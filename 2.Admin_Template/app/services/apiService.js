class Api_Service {
  get_Api_Promise() {
    const get_Api_Promise = axios({
      url: "https://68e90f09f2707e6128cd5c12.mockapi.io/api/Products",
      method: "GET",
    });

    return get_Api_Promise;
  }

  delete_Api_Product(id) {
    const delete_Api_Product = axios({
      url: `https://68e90f09f2707e6128cd5c12.mockapi.io/api/Products/${id}`,
      method: "DELETE",
    });

    return delete_Api_Product;
  }
}
export default Api_Service;
