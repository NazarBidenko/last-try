<!-- src/views/CreateProduct.vue -->
<template>
  <div>
    <h1 class="page-title">Create New Product</h1>
    <form @submit.prevent="createProduct" class="product-form">
      <div class="product-input">
        <label for="title">Title:</label>
        <input type="text" id="title" v-model="newProduct.title" required>
      </div>

      <div class="product-input">
        <label for="description">Description:</label>
        <textarea id="description" v-model="newProduct.description"></textarea>
      </div>

      <div class="product-input">
        <label for="price">Price:</label>
        <input type="number" id="price" v-model="newProduct.price" min="0" required>
      </div>

      <div class="product-input">
        <label for="discountPercentage">Discount Percentage:</label>
        <input type="number" id="discountPercentage" v-model="newProduct.discountPercentage" min="0" max="100">
      </div>

      <div class="product-input">
        <label for="rating">Rating:</label>
        <input type="number" id="rating" v-model="newProduct.rating" min="1" max="5">
      </div>

      <div class="product-input">
        <label for="stock">Stock:</label>
        <input type="number" id="stock" v-model="newProduct.stock" min="0">
      </div>

      <div class="product-input">
        <label for="brand">Brand:</label>
        <input type="text" id="brand" v-model="newProduct.brand" required>
      </div>

      <div class="product-input">
        <label for="category">Category:</label>
        <input type="text" id="category" v-model="newProduct.category" required>
      </div>

      <div class="product-input">
        <label for="thumbnail">Thumbnail URL:</label>
        <input type="url" id="thumbnail" v-model="newProduct.thumbnail">
      </div>

      <div class="product-input">
        <label for="images">Images URLs (comma-separated):</label>
        <input type="text" id="images" v-model="imageURLs">
      </div>

      <button type="submit" class="action-btn">Create</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'CreateProduct',
  data() {
    return {
      newProduct: {
        title: '',
        description: '',
        price: 0,
        discountPercentage: 0,
        rating: 1,
        stock: 0,
        brand: '',
        category: '',
        thumbnail: '',
        images: [],
      },
      imageURLs: '', // Для тимчасового зберігання URL зображень
    };
  },
  methods: {
    createProduct() {
      // Розділити кома-розділені URL зображень у масив
      const imageUrlsArray = this.imageURLs.split(',').map(url => url.trim());
      this.newProduct.images = imageUrlsArray;

      axios.post('https://dummyjson.com/products', this.newProduct)
        .then(response => {
          console.log('Product created successfully:', response.data);
          this.$router.push('/');
        })
        .catch(error => {
          console.error('Error creating product:', error);
        });
    },
  },
};
</script>

<style scoped>
.page-title {
  font-size: 24px;
  margin-bottom: 20px;
}

.product-form {
  max-width: 90vw;
  margin: 0 auto;
}

.product-input {
  display: block;
  margin: 10px
}

.action-btn {
  background-color: #2ecc71;
  color: #fff;
  padding: 10px 20px;
  text-decoration: none;
  font-size: 16px;
  border-radius: 4px;
  margin-top: 10px;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;
}

.action-btn:hover {
  background-color: #27ae60;
}
</style>
