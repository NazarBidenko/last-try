<template>
  <div>
    <h1 class="page-title">Product Details</h1>
    <div v-if="loading">Loading...</div>
    <div v-else class="product-details">
      <div class="product-info">
        <div class="product-image-container">
          <img v-if="product.images && product.images.length > 0" :src="product.images[0]" alt="Product Image" class="product-image">
        </div>
        <div class="product-description">
          <h2>{{ product.title }}</h2>
          <p><strong>Price:</strong> ${{ product.price }} | <strong>Discount:</strong> {{ product.discountPercentage }}%</p>
          <p><strong>Description:</strong> {{ product.description }}</p>
          <p><strong>Brand:</strong> {{ product.brand }}</p>
          <p><strong>Category:</strong> {{ product.category }}</p>
          <p class="rating"><strong>Rating:</strong> {{ product.rating }}</p>
        </div>
      </div>
      <div class="product-actions">
        <button @click="openUpdateModal" class="action-btn">Update Product</button>
        <button @click="deleteProduct" class="action-btn delete-btn">Delete Product</button>
      </div>
    </div>

    <div v-if="isUpdateModalOpen" class="modal">
      <div class="modal-content">
        <label for="updateTitle">Title:</label>
        <input type="text" id="updateTitle" v-model="updatedProduct.title" required>

        <label for="updatePrice">Price:</label>
        <input type="number" id="updatePrice" v-model="updatedProduct.price" required>

        <label for="updateDiscount">Discount (%):</label>
        <input type="number" id="updateDiscount" v-model="updatedProduct.discountPercentage" min="0" max="100" required>

        <label for="updateDescription">Description:</label>
        <textarea id="updateDescription" v-model="updatedProduct.description" required></textarea>

        <label for="updateBrand">Brand:</label>
        <textarea id="updateBrand" v-model="updatedProduct.brand" required></textarea>

        <label for="updateCategory">Category:</label>
        <textarea id="updateCategory" v-model="updatedProduct.category" required></textarea>

        <label for="updateRating">Rating:</label>
        <input type="number" id="updateRating" v-model="updatedProduct.rating" min="1" max="5" required>

        <button @click="updateProductData" class="action-btn">Update</button>
        <button @click="closeUpdateModal" class="action-btn cancel-btn">Cancel</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'ProductDetails',
  data() {
    return {
      product: null,
      loading: true,
      isUpdateModalOpen: false,
      updatedProduct: {
        title: '',
        description: '',
        rating: 1,
        price: 0,
        discountPercentage: 0,
        stock: 0,
        brand: '',
        category: '',
        images: [],
      },
    };
  },
  mounted() {
    const productId = this.$route.params.id;
    axios.get(`https://dummyjson.com/products/${productId}`)
      .then(response => {
        this.product = response.data;
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      })
      .finally(() => {
        this.loading = false;
      });
  },
  methods: {
    openUpdateModal() {
      this.isUpdateModalOpen = true;
      this.updatedProduct = { ...this.product };
    },
    closeUpdateModal() {
      this.isUpdateModalOpen = false;
    },
    updateProductData() {
      this.product = { ...this.updatedProduct };
      this.isUpdateModalOpen = false;

      const productId = this.product.id;
      axios.put(`https://dummyjson.com/products/${productId}`, {
        title: this.updatedProduct.title,
        price: this.updatedProduct.price,
        description: this.updatedProduct.description,
        discount: this.updatedProduct.discount,
        brand: this.updatedProduct.brand,
        category: this.updatedProduct.category,
        rating: this.updatedProduct.rating,
        images: this.updatedProduct.images,
      })
        .then(response => {
          console.log('Updated product data:', response.data);
        })
        .catch(error => {
          console.error('Error updating product:', error);
        });
    },
    deleteProduct() {
      const productId = this.product.id;
      axios.delete(`https://dummyjson.com/products/${productId}`)
        .then(response => {
          console.log('Deleted product data:', response.data);
        })
        .catch(error => {
          console.error('Error deleting product:', error);
        })
        .finally(() => {
          this.$router.push('/');
        });
    },
  },
};
</script>

<style scoped>
.product-details {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.product-info {
  display: flex;
  align-items: flex-start;
}

.product-image-container {
  margin-right: 20px;
}

.product-description {
  flex-grow: 1;
}

.page-title {
  font-size: 24px;
  margin-bottom: 20px;
}

.product-details {
  border: 1px solid #ccc;
  padding: 20px;
  margin: 20px;
}

.action-btn {
  background-color: #3498db;
  color: #fff;
  padding: 10px 20px;
  text-decoration: none;
  font-size: 16px;
  border-radius: 4px;
  margin-right: 10px;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;
}

.action-btn:hover {
  background-color: #2980b9;
}

.delete-btn {
  background-color: #e74c3c;
}

.delete-btn:hover {
  background-color: #c44132;
}

.cancel-btn {
  background-color: #95a5a6;
}

.cancel-btn:hover {
  background-color: #767d7e;
}

.product-image {
  max-width: 100%;
  padding: 10px;
}
</style>
