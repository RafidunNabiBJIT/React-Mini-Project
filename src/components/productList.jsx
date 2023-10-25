import ProductCard from "../components/productCard";
function ProductList({ addToCart, addToFavorites }) {
  const products = [
    {
      id: 1,
      name: "Fire Hydrant",
      price: 140,
      image: "https://m.media-amazon.com/images/I/71ZMu13smGL._SL1500_.jpg",
    },
    {
      id: 3,
      name: "Bag",
      price: 20,
      image: "https://m.media-amazon.com/images/I/81BCL8PSkOL._SL1500_.jpg",
    },
    {
      id: 2,
      name: "Guitar",
      price: 200,
      image: "https://m.media-amazon.com/images/I/61MjPg8vxeL._SL1500_.jpg",
    },
    {
      id: 4,
      name: "Scooter",
      price: 300,
      image: "https://m.media-amazon.com/images/I/71psgHw2R4L._SL1500_.jpg",
    },
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
