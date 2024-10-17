<script setup>
import { defineEmits } from 'vue';
import { inject } from 'vue';
const onChangeInput = inject('onChangeInput');

const props = defineProps({
  name: String,
})
const emits = defineEmits(['openMenu']);
</script>
<template>
  <header class="header">
    <div class="container">
      <router-link to="/projects" class="logo">
        QuickRequest
      </router-link>
      <div class="menu">
        <ul class="menu-list">
          <router-link to="/projects" class="menu-item">
            <a>Главная</a>
          </router-link>
          <li class="menu-item">
            <a>Документация</a>
          </li>
        </ul>
      </div>
      <router-link to="/profile" class="user">
        <img src="/icons/user-icon.svg" alt="user-icon">
        <p>{{ name }}</p>
      </router-link>
      <div class="mobile-menu-btn" @click="emits('openMenu')">
        <img src="/icons/menu-icon.svg" alt="menu-icon">
      </div>
    </div>
  </header>
</template>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Montserrat', sans-serif;
}

.header {
  background: #121212;
  padding-top: 20px;
  padding-bottom: 20px;
}

.container {
  display: flex;
  max-width: 1240px;
  justify-content: space-between;
  margin: 0 auto;
  align-items: center;
}

.logo {
  font-weight: bold;
  color: #fff;
  cursor: pointer;
  font-size: 28px;
  text-decoration: none;
  transition: color 0.3s ease;
}
.logo:hover {
  color: #ff8a00;
}

.menu-list {
  list-style: none;
  display: flex;
  gap: 20px;
}


.menu-item {
  display: flex;
  gap: 10px;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #f0f0f0;
  font-size: 16px;
  transition: color 0.3s ease;
  text-decoration: none;
}

.menu-item:hover {
  color: #ff8a00;
}

.mobile-menu-btn img{
  width: 35px;
  height: 35px;
}

.mobile-menu-btn {
  display: none;
}

.user img {
  width: 40px;
  height: 40px;
  cursor: pointer;
  transition: background 0.3s ease, transform 0.3s ease;
}


.user {
  display: flex;
  gap: 5px;
  align-items: center;
  user-select: none;
  transition: background 0.3s ease, transform 0.3s ease;
  border-radius: 10px;
  text-decoration: none;
}
.user p{
  color: white;
  font-size: 18px;
  cursor: pointer;
  padding: 5px 10px;
  border-radius: 10px;
  transition: color 0.3s ease;
}

.user p:hover {
  color: #ff8a00;
}

@media (max-width: 1024px) {
  .header {
    padding-left: 10px;
    padding-right: 10px;
  }
}

@media (max-width: 768px) {
  .user {
    display: none;
  }
  .mobile-menu-btn {
    display: block;
  }
}

@media (max-width: 560px) {
  .user {
    display: none;
  }
  .menu-list {
    display: none;
  }
  .mobile-menu-btn {
    display: block;
  }
}

</style>
