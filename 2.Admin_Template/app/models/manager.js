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
}
export default Manager;
