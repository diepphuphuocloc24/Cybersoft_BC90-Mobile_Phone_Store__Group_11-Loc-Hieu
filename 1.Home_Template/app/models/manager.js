class Manager {
  constructor() {
    this.array_Cart = [];
    this.arrary_UI = [];
  }

  btn_Add_Cart(object_Product) {
    this.array_Cart.push(object_Product);
  }

  Find_Index(id) {
    let index = -1;
    for (let i = 0; i < this.array_Cart.length; i++) {
      if (this.array_Cart[i].id === id) {
        index = i;
        break;
      }
    }
    return index;
  }

  btn_delete(id) {
    const index = this.Find_Index(id);
    if (index !== -1) {
      this.array_Cart.splice(index, 1);
    }
    return this.array_Cart;
  }

  btn_Plus(id) {
    const index = this.Find_Index(id);
    if (index !== -1) {
      this.array_Cart[index].quantity += 1;
    }
    return this.array_Cart;
  }

  btn_Minus(id) {
    const index = this.Find_Index(id);
    if (index !== -1) {
      this.array_Cart[index].quantity -= 1;
    }
    return this.array_Cart;
  }

  filter(type) {
    const filter_Cart = [];
    if (type === "all") {
      return this.arrary_UI;
    }

    for (let i = 0; i < this.arrary_UI.length; i++) {
      const product = this.arrary_UI[i];
      if (product.type.toLowerCase() === type.toLowerCase()) {
        filter_Cart.push(product);
      }
    }
    return filter_Cart;
  }
}
export default Manager;
