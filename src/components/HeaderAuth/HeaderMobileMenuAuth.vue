<script setup>
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true,
  },
})

const emits = defineEmits(['closeMenu'])

const closeMenu = () => {
  emits('closeMenu')
}
</script>

<template>
  <div class="overlay" v-if="isOpen" @click="closeMenu"></div>
  <div class="mobile-menu" :class="{ open: isOpen }">
    <div class="menu-header">
      <button class="close-btn" @click="closeMenu">×</button>
    </div>
    <ul class="menu-list">
      <li class="menu-item">
        <router-link to="/" @click="closeMenu">Главная</router-link>
      </li>
      <li class="menu-item">
        <router-link to="/">Документация</router-link>
      </li>
      <li class="menu-item">
        <router-link to="/profile" @click="closeMenu">Профиль</router-link>
      </li
      >
    </ul>
  </div>
</template>

<style scoped>
.overlay {
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 998;
}

.mobile-menu {
  position: fixed;
  top: 0;
  left: 0;
  width: 70%;
  height: 100%;
  background-color: #1a1a1a;
  padding: 20px;
  transform: translateX(-100%);
  transition: transform 0.4s ease;
  z-index: 999;
}

.mobile-menu.open {
  transform: translateX(0);
}

.menu-header {
  display: flex;
  justify-content: flex-end;
}

.close-btn {
  font-size: 30px;
  color: white;
  background: none;
  border: none;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.menu-list {
  list-style: none;
  margin-top: 50px;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 25px;
}

.menu-item {
  display: flex;
  align-items: center;
  gap: 10px;
  transition: background-color 0.3s ease, transform 0.3s ease;
}

.menu-item a {
  color: white;
  font-size: 20px;
  font-weight: 600;
  text-decoration: none;
  transition: color 0.3s ease;
  margin-left: 10px;
}

</style>
