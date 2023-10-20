import '../css/card.css';
function FavoriteProducts({ favoriteProducts, products }) {
  return (
    <div className='card-cart'>
        <h2 style={{ position: 'sticky', top: 0, background: 'white'}}>Favorite Products</h2>
        <div className='container ' style={{ overflow: 'auto', margin: '20px', padding: '20px', height: '250px', width: '300px'}}>

        <ul className="list-group">
          {favoriteProducts.map((productId) => {
            const product = products.find((p) => p.id === productId);
            return (
              <li className="list-group-item" key={product.id}>
                {product.name} - ${product.price}
              </li>
            );
          })}
        </ul>
        </div>
    </div>
  );
}

export default FavoriteProducts;

