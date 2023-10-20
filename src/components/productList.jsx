import ProductCard from "../components/productCard";
function ProductList({ addToCart, addToFavorites }) {
  const products = [
    { id: 1, name: "Fire Hydrant", price: 140, image: "images/guiter1.jpg" },
    { id: 3, name: "Bag", price: 20, image: "images/bags.jpg" },
    { id: 2, name: "Guitar", price: 200, image: "images/guiter2.jpg" },
    { id: 4, name: "Scooter", price: 300, image: "images/scooter.jpg" },
  ];
  return (
    <div>
      <h1 style={{ marginTop: "30px" }}>
        Looking for your <span style={{ color: "#FF6347" }}>favorite</span>{" "}
        items?
      </h1>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            addToCart={addToCart}
            addToFavorites={addToFavorites}
          />
        ))}
      </div>
    </div>
  );
}

export default ProductList;
