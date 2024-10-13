<script setup>
import { defineEmits } from 'vue';

const emits = defineEmits(['openMenu']);
</script>
<template>
	<header class="header">
		<div class="container">
      <div class="logo">
        QuickRequest
      </div>
      <div class="menu">
        <ul class="menu-list">
          <li class="menu-item">
            <img src="/icons/home_icon.svg" alt="home">
            <a>Главная</a>
          </li>
          <li class="menu-item">
            <img src="/icons/documentation_icon.svg" alt="documentation_icon">
            <a>Документация</a>
          </li>
        </ul>
      </div>
      <div class="header-action">
        <button class="start_btn">Начать сейчас</button>
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
}

.menu-list {
  list-style: none;
  display: flex;
  gap: 20px;
}

.menu-item img {
  width: 35px;
  height: 35px;
  user-select: none;
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
}

.menu-item:hover {
  color: #ff8a00;
}

.start_btn {
  background: #ef8916;
  color: white;
  padding: 10px 25px;
  border: none;
  border-radius: 25px;
  font-size: 16px;
  cursor: pointer;
  transition: background 0.3s ease;
  user-select: none;
}

.start_btn:hover {
  background: #e67600;
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
