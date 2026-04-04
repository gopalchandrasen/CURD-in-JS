import React, { useState, useEffect, useContext } from 'react';
import ProductList from '../components/ProductList';
import ProductForm from '../components/ProductForm';
import { AuthContext } from '../context/AuthContext';
import '../index.css';

const API_URL = 'http://localhost:5000/api/products';

function Dashboard() {
  const [products, setProducts] = useState([]);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user, logout } = useContext(AuthContext);

  const getAuthHeaders = () => ({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${user.token}`
  });

  // Fetch all products
  const fetchProducts = async () => {
    try {
      const response = await fetch(API_URL, {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      if (!response.ok) throw new Error('Failed to fetch');
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error loading products:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Create or Update
  const handleSaveProduct = async (productData) => {
    try {
      if (currentProduct) {
        const response = await fetch(`${API_URL}/${currentProduct._id}`, {
          method: 'PUT',
          headers: getAuthHeaders(),
          body: JSON.stringify(productData)
        });
        if (response.ok) {
          const updated = await response.json();
          setProducts(products.map(p => (p._id === updated._id ? updated : p)));
          setCurrentProduct(null);
        }
      } else {
        const response = await fetch(API_URL, {
          method: 'POST',
          headers: getAuthHeaders(),
          body: JSON.stringify(productData)
        });
        if (response.ok) {
          const created = await response.json();
          setProducts([created, ...products]);
        }
      }
    } catch (error) {
      console.error('Error saving product:', error);
    }
  };

  // Delete
  const handleDeleteProduct = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${user.token}` }
      });
      if (response.ok) {
        setProducts(products.filter(p => p._id !== id));
      }
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  return (
    <div className="container">
      <header className="header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1>Product Manager</h1>
          <p style={{ color: 'var(--text-secondary)' }}>Welcome, {user.name}!</p>
        </div>
        <button 
          onClick={logout} 
          style={{
            background: '#ef4444', 
            color: 'white', 
            border: 'none', 
            padding: '8px 16px', 
            borderRadius: '6px',
            cursor: 'pointer',
            fontWeight: '600'
          }}>
          Logout
        </button>
      </header>

      <main>
        <ProductForm 
          currentProduct={currentProduct} 
          onSave={handleSaveProduct} 
          onCancelEdit={() => setCurrentProduct(null)} 
        />
        
        {loading ? (
          <div style={{ textAlign: 'center', margin: '3rem 0', color: 'var(--text-secondary)' }}>
            Loading products...
          </div>
        ) : (
          <ProductList 
            products={products} 
            onEdit={setCurrentProduct} 
            onDelete={handleDeleteProduct} 
          />
        )}
      </main>
    </div>
  );
}

export default Dashboard;
