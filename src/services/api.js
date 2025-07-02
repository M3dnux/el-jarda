const API_BASE_URL = 'http://localhost:3001/api';

// Helper function to handle fetch with retry logic
async function fetchWithRetry(url, options, retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(url, options);
      return response;
    } catch (error) {
      console.log(`Fetch attempt ${i + 1} failed:`, error.message);
      if (i === retries - 1) throw error;
      // Wait before retrying (exponential backoff)
      await new Promise(resolve => setTimeout(resolve, Math.pow(2, i) * 1000));
    }
  }
}

class ApiService {
  constructor() {
    this.token = localStorage.getItem('jardin_token');
  }

  setToken(token) {
    this.token = token;
    if (token) {
      localStorage.setItem('jardin_token', token);
    } else {
      localStorage.removeItem('jardin_token');
    }
  }

  getAuthHeaders() {
    return {
      'Authorization': this.token ? `Bearer ${this.token}` : '',
    };
  }

  async login(username, password) {
    try {
      const response = await fetchWithRetry(`${API_BASE_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Login failed');
      }

      this.setToken(data.token);
      return data;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }

  async changePassword(currentPassword, newPassword) {
    try {
      const response = await fetch(`${API_BASE_URL}/change-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...this.getAuthHeaders(),
        },
        body: JSON.stringify({ currentPassword, newPassword }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Password change failed');
      }

      return data;
    } catch (error) {
      console.error('Change password error:', error);
      throw error;
    }
  }

  async forgotPassword(username) {
    try {
      const response = await fetchWithRetry(`${API_BASE_URL}/forgot-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Forgot password request failed');
      }

      return data;
    } catch (error) {
      console.error('Forgot password error:', error);
      throw error;
    }
  }

  async verifyToken() {
    try {
      const response = await fetchWithRetry(`${API_BASE_URL}/verify-token`, {
        headers: this.getAuthHeaders(),
      });

      if (!response.ok) {
        this.setToken(null);
        return false;
      }

      return true;
    } catch (error) {
      this.setToken(null);
      return false;
    }
  }

  async getProducts() {
    try {
      const response = await fetchWithRetry(`${API_BASE_URL}/products`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }

      return await response.json();
    } catch (error) {
      console.error('Get products error:', error);
      throw error;
    }
  }

  async addProduct(productData, imageFile) {
    try {
      const formData = new FormData();
      formData.append('nameAr', productData.nameAr);
      formData.append('nameFr', productData.nameFr);
      formData.append('price', productData.price);
      formData.append('category', productData.category);
      formData.append('descriptionAr', productData.descriptionAr);
      formData.append('descriptionFr', productData.descriptionFr);
      
      if (imageFile) {
        formData.append('image', imageFile);
      }

      const response = await fetch(`${API_BASE_URL}/products`, {
        method: 'POST',
        headers: this.getAuthHeaders(),
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to add product');
      }

      return data;
    } catch (error) {
      console.error('Add product error:', error);
      throw error;
    }
  }

  async updateProduct(productId, productData, imageFile) {
    try {
      const formData = new FormData();
      formData.append('nameAr', productData.nameAr);
      formData.append('nameFr', productData.nameFr);
      formData.append('price', productData.price);
      formData.append('category', productData.category);
      formData.append('descriptionAr', productData.descriptionAr);
      formData.append('descriptionFr', productData.descriptionFr);
      
      if (imageFile) {
        formData.append('image', imageFile);
      }

      const response = await fetch(`${API_BASE_URL}/products/${productId}`, {
        method: 'PUT',
        headers: this.getAuthHeaders(),
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to update product');
      }

      return data;
    } catch (error) {
      console.error('Update product error:', error);
      throw error;
    }
  }

  async deleteProduct(productId) {
    try {
      const response = await fetch(`${API_BASE_URL}/products/${productId}`, {
        method: 'DELETE',
        headers: this.getAuthHeaders(),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to delete product');
      }

      return data;
    } catch (error) {
      console.error('Delete product error:', error);
      throw error;
    }
  }

  logout() {
    this.setToken(null);
  }
}

export default new ApiService();
