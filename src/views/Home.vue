<template>
  <div>
    <h1 class="page-title">Product Catalog</h1>

    <input v-model="searchTerm" placeholder="Search by name" />
    <button @click="searchProducts">Search</button>

    <label>
      Sort by:
      <select v-model="sortOrder" @change="sortProducts">
        <option value="title">Title</option>
        <option value="rating">Rating</option>
      </select>
    </label>

    <div v-if="loading">Loading...</div>
    <div v-else class="product-grid">
      <div v-for="product in products" :key="product.id" @click="goToProductDetails(product.id)">
        <div class="product-card">
          <h3>{{ product.title }}</h3>
          <p>{{ product.description }}</p>
          <p class="rating">Rating: {{ product.rating }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Home',
  data() {
    return {
      searchTerm: '',
      sortOrder: 'title',
      baseProducts: [],
      products: [],
      loading: true,
    };
  },
  mounted() {
    axios.get('https://dummyjson.com/products')
      .then(response => {
        this.baseProducts = response.data.products;
        this.products = this.baseProducts;
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      })
      .finally(() => {
        this.loading = false;
      });
  },
  computed: {
    filteredProducts() {
      return this.products.filter(product => product.title.toLowerCase().includes(this.searchTerm.toLowerCase()));
    },
    sortedProducts() {
      const sorted = [...this.filteredProducts];
      if (this.sortOrder === 'title') {
        sorted.sort((a, b) => a.title.localeCompare(b.title));
      } else if (this.sortOrder === 'rating') {
        sorted.sort((a, b) => b.rating - a.rating);
      }
      return sorted;
    },
  },
  methods: {
    goToProductDetails(productId) {
      this.$router.push(`/product/${productId}`);
    },
    async searchProducts() {
    try {
      this.loading = true;
      this.products = this.baseProducts.filter(product => product.title.toLowerCase().includes(this.searchTerm.toLowerCase()));
    } catch (error) {
      console.error('Error searching products:', error);
    } finally {
      this.loading = false;
    }
    },
    sortProducts() {
    if (this.sortOrder === 'title') {
      this.products.sort((a, b) => a.title.localeCompare(b.title));
    } else if (this.sortOrder === 'rating') {
      this.products.sort((a, b) => b.rating - a.rating);
    }
  },
  },
};
</script>

<style scoped>
.product-grid {
  display: grid;
  gap: 20px;
}

@media (min-width: 1200px) {
  .product-grid {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
}

@media (min-width: 768px) and (max-width: 1199px) {
  .product-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

@media (max-width: 767px) {
  .product-grid {
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }
}

.page-title {
  font-size: 24px;
  margin-bottom: 20px;
}

.create-btn {
  background-color: #4caf50;
  color: #fff;
  padding: 10px 20px;
  text-decoration: none;
  font-size: 16px;
  border-radius: 4px;
}

.product-card {
  border: 1px solid #ccc;
  padding: 15px;
  margin: 15px;
  cursor: pointer;
  transition: transform 0.3s ease-in-out;
}

.product-card:hover {
  transform: scale(1.05);
}

.rating {
  color: #f39c12;
  font-weight: bold;
}
</style>
