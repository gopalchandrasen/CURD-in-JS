import React from 'react';

const ProductList = ({ products, onEdit, onDelete }) => {
  return (
    <div className="products-grid">
      {products.length === 0 ? (
        <p style={{ gridColumn: '1 / -1', textAlign: 'center', color: 'var(--text-secondary)' }}>
          No products found. Add some!
        </p>
      ) : (
        products.map(product => (
          <div key={product._id} className="card">
            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>{product.name}</h3>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '0.5rem', minHeight: '3rem' }}>
              {product.description}
            </p>
            <div className="price-tag">${product.price.toFixed(2)}</div>
            <div className="product-actions">
              <button onClick={() => onEdit(product)} className="btn btn-primary btn-small" style={{ flex: 1 }}>
                Edit
              </button>
              <button onClick={() => onDelete(product._id)} className="btn btn-danger btn-small" style={{ flex: 1 }}>
                Delete
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default ProductList;
