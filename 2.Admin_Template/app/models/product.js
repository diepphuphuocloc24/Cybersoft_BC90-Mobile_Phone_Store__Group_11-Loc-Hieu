class Product {
  constructor(
    id,
    productID,
    name,
    price,
    screen,
    backCamera,
    frontCamera,
    img,
    desc,
    type,
    stock
  ) {
    this.id = id;
    this.productID = productID;
    this.name = name;
    this.price = price;
    this.screen = screen;
    this.backCamera = backCamera;
    this.frontCamera = frontCamera;
    this.img = img;
    this.desc = desc;
    this.type = type;
    this.stock = stock;
  }
}
export default Product;
