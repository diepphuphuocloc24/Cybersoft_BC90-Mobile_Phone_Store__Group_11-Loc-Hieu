class Manager {
  constructor() {
    this.array_Cart = [];
    this.arrary_UI = [];
  }

  btn_Add_Cart(object_Product) {
    let found = false;

    for (let i = 0; i < this.array_Cart.length; i += 1) {
      const product = this.array_Cart[i];
      if (product.id === object_Product.id) {
        product.quantity += 1;
        found = true;
        break;
      }
    }

    if (!found) {
      object_Product.quantity = 1;
      this.array_Cart.push(object_Product);
    }
  }

  Find_Index(id) {
    return this.array_Cart.findIndex((product) => {
      return product.id === id;
    });
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
