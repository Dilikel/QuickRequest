<script setup>
import { ref } from 'vue';
import Header from "@/components/Header.vue";
import HeaderMobileMenu from "@/components/HeaderMobileMenu.vue";
import Footer from "@/components/Footer.vue";


const isMenuOpen = ref(false);


const closeMenu = () => {
  isMenuOpen.value = false;
};


const openMenu = () => {
  isMenuOpen.value = true;
};
</script>

<template>
  <Header @openMenu="openMenu"/>
  <HeaderMobileMenu :isOpen="isMenuOpen" @closeMenu="closeMenu"/>
  <router-view/>
  <Footer/>
</template>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
</style>
