import React, { useState } from 'react';
import './ProductCard.css';
import cart from '../../assets/cart.svg';
interface ProductCardProps {
  product: {
    id: string;
    name: string;
    imageUrl: string;
    description: string;
    price: number;
    salePrice?: number;
    isOnSale: boolean;
    isInStock: boolean;
    gameType: 'RS3' | 'OSRS' | 'WOW';
  };
  onAddToCart: (id: string, quantity: number) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="product-card">
      <div className="card-badges">
        {product.isOnSale && <span className="badge sale">ON SALE</span>}
        {product.isInStock && <span className="badge stock">IN STOCK</span>}
        <span className={`game-type ${product.gameType.toLowerCase()}`}>
          {product.gameType}
        </span>
      </div>

      <div className="product-image">
        <img src={product.imageUrl} alt={product.name} />
      </div>

      <h3 className="product-name">{product.name}</h3>

      <div className="product-price">
        {product.isOnSale ? (
          <>
            <span className="original-price">${product.price}</span>
            <span className="sale-price">${product.salePrice}</span>
          </>
        ) : (
          <span className="price">${product.price}</span>
        )}
      </div>

      <p className="product-description">{product.description}</p>

      <div className="quantity-selector">
        <button 
          onClick={() => setQuantity(q => Math.max(1, q - 1))}
          className="quantity-btn"
        >
          -
        </button>
        <input 
          type="number" 
          value={quantity} 
          onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
          min="1"
        />
        <button 
          onClick={() => setQuantity(q => q + 1)}
          className="quantity-btn"
        >
          +
        </button>
      </div>

      <div className="card-actions">
        <button className="details-btn" disabled>DETAILS</button>
        <button 
          className="add-cart-btn"
          onClick={() => onAddToCart(product.id, quantity)}
        >
          ADD
          <img className='cart-icon' src={cart} alt="Cart" />
        </button>
      </div>
    </div>
  );
};

export default ProductCard; 