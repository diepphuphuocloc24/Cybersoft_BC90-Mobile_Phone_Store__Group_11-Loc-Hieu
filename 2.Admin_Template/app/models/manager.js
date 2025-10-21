class Manager {
  constructor() {
    this.array_Cart = [];
  }

<<<<<<< HEAD
  btn_Add_Cart(id) {
    this.array_Cart.push(id);
  }
=======
  btn_Add_Cart(product) {
    this.array_Cart.push(product);
    return this.array_Cart;
  }

>>>>>>> Loc
  btn_minus() {}
  btn_delete() {}
}
export default Manager;
