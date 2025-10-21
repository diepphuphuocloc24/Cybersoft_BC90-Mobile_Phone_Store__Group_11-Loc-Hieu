class Api_Service {
  get_Api_Promise() {
    const get_Api_Promise = axios({
      url: "https://68e90f09f2707e6128cd5c12.mockapi.io/api/Products",
      method: "GET",
    });

    return get_Api_Promise;
  }

  get_Product_By_ID(id) {
    const get_Product_Request = axios({
      url: `https://68e90f09f2707e6128cd5c12.mockapi.io/api/Products/${id}`,
      method: "GET",
    });
    return get_Product_Request;
  }
}
export default Api_Service;
