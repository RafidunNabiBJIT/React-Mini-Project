function Product({ product, addToCart }) {
  return (
    <div>
      <h3>{product.name}</h3>
      <p>Price: ${product.price}</p>
      <button className="orange-button" onClick={() => addToCart(product)}>
        Add to Cart
      </button>
    </div>
  );
}

export default Product;
