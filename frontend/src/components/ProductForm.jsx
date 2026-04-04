import React, { useState, useEffect } from 'react';

const ProductForm = ({ currentProduct, onSave, onCancelEdit }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: ''
  });

  useEffect(() => {
    if (currentProduct) {
      setFormData({
        name: currentProduct.name,
        description: currentProduct.description,
        price: currentProduct.price
      });
    } else {
      setFormData({ name: '', description: '', price: '' });
    }
  }, [currentProduct]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ ...formData, price: Number(formData.price) });
    if (!currentProduct) {
      setFormData({ name: '', description: '', price: '' });
    }
  };

  return (
    <div className="card" style={{ marginBottom: '2rem' }}>
      <h2 style={{ marginBottom: '1.5rem' }}>
        {currentProduct ? 'Edit Product' : 'Add New Product'}
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Product Name</label>
          <input
            type="text"
            id="name"
            name="name"
            className="form-control"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="e.g. Mechanical Keyboard"
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            className="form-control"
            value={formData.description}
            onChange={handleChange}
            rows="3"
            placeholder="A short description of the product"
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="price">Price ($)</label>
          <input
            type="number"
            id="price"
            name="price"
            className="form-control"
            value={formData.price}
            onChange={handleChange}
            required
            min="0"
            step="0.01"
            placeholder="0.00"
          />
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>
            {currentProduct ? 'Update Product' : 'Add Product'}
          </button>
          {currentProduct && (
            <button type="button" onClick={onCancelEdit} className="btn" style={{ flex: 1, backgroundColor: 'var(--border-color)', color: 'white' }}>
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
