<script setup>
import { defineEmits } from 'vue';

const emits = defineEmits(['openMenu']);
</script>
<template>
	<header class="header">
		<div class="container">
      <router-link to="/" class="logo">
        QuickRequest
      </router-link>
      <div class="menu">
        <ul class="menu-list">
          <router-link to="/" class="menu-item">
            <a>Главная</a>
          </router-link>
          <li class="menu-item">
            <a>Документация</a>
          </li>
        </ul>
      </div>
      <div class="header-action">
        <router-link to="/login" class="start_btn">Начать сейчас</router-link>
      </div>
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
  border-bottom: 2px solid rgba(255, 255, 255, 0.1);
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

.start_btn {
  background: linear-gradient(90deg, #ff8a00, #ff6b6b);
  color: white;
  padding: 12px 30px;
  border: none;
  border-radius: 25px;
  font-size: 16px;
  cursor: pointer;
  user-select: none;
  text-decoration: none;
  transition: background 0.4s ease, transform 0.3s ease, box-shadow 0.3s ease;
  box-shadow: 0 8px 20px rgba(255, 107, 107, 0.5);
}

.start_btn:hover {
  background: linear-gradient(90deg, #ff7a00, #ff5656);
  transform: translateY(-4px);
  box-shadow: 0 10px 25px rgba(255, 107, 107, 0.7);
}


.mobile-menu-btn img{
  width: 35px;
  height: 35px;
}

.mobile-menu-btn {
  display: none;
}


@media (max-width: 1024px) {
  .header {
    padding-left: 10px;
    padding-right: 10px;
  }
}

@media (max-width: 768px) {
  .start_btn {
    display: none;
  }
  .mobile-menu-btn {
    display: block;
  }
}

@media (max-width: 560px) {
  .start_btn {
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
