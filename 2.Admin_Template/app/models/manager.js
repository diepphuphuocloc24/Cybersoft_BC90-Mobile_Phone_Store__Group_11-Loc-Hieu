class Manager {
  constructor() {
    this.array_Cart = [];
  }

  btn_Add_Cart(product) {
    this.array_Cart.push(product);
    return this.array_Cart;
  }

  btn_minus() {}
  btn_delete() {}

  filterProduct(type) {
    let productFilter = [];

    if (type === "all") {
      return this.array_Cart;
    }

    for (let i = 0; i < this.array_Cart.length; i++) {
      const product = this.array_Cart[i];
      if (product.type.toLowerCase() === type.toLowerCase()) {
        productFilter.push(product);
      }
    }
    return productFilter;
  }

  searchName(keyword) {
    const result = [];

    for (let i = 0; i < this.array_Cart.length; i++) {
      const product = this.array_Cart[i];

      // Chuyển về viết thường
      const nameLowerCase = product.name
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");

      // Chuyển keyword về viết thường
      const keywordLowerCase = keyword
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");

      if (nameLowerCase.indexOf(keywordLowerCase) !== -1) {
        result.push(product);
      }
    }

    return result;
  }

  sortProduct(order) {
    // Sao chép mảng tránh ảnh hưởng mảng gốc
    const sortArray = [...this.array_Cart];

    // Sắp xếp tăng dần hoặc giảm dần
    if (order === "asc") {
      sortArray.sort((a, b) => Number(a.price) - Number(b.price));
    } else if (order === "desc") {
      sortArray.sort((a, b) => Number(b.price) - Number(a.price));
    }
    return sortArray;
  }
}
export default Manager;
