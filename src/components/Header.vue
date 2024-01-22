<!-- src/components/Header.vue -->
<template>
  <header class="site-header">
    <router-link to="/" class="logo-link">
      <img src="https://img.freepik.com/free-vector/bird-colorful-logo-gradient-vector_343694-1365.jpg?size=338&ext=jpg&ga=GA1.1.632798143.1705795200&semt=ais" alt="Logo" class="logo">
    </router-link>
    <router-link to="/create-product" class="create-btn">Create</router-link>
  </header>
</template>

<script>
export default {
  name: 'Header',
};
</script>

<style scoped>
.site-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #ddd;
}

.logo-link {
  text-decoration: none;
}

.logo {
  height: 40px;
}

.create-btn {
  background-color: #4caf50;
  color: #fff;
  padding: 10px 20px;
  text-decoration: none;
  font-size: 16px;
  border-radius: 4px;
  transition: background-color 0.3s ease-in-out;
}

.create-btn:hover {
  background-color: #3c8b3e;
}
</style>
