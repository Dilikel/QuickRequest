<script setup>
import Header from "@/components/Header/Header.vue";
import HeaderMobileMenu from "@/components/Header/HeaderMobileMenu.vue";
import HeaderAuth from "@/components/HeaderAuth/HeaderAuth.vue";
import HeaderMobileMenuAuth from "@/components/HeaderAuth/HeaderMobileMenuAuth.vue";
import Footer from "@/components/Footer.vue";
import Loader from "@/components/Loader.vue";
import { ref, onMounted} from 'vue';
import axios from 'axios';
import Cookies from 'js-cookie';
import router from '@/router';

const isAuthenticated = ref(false);
const userName = ref('');
const token = Cookies.get('token');
const auth_url = `${import.meta.env.VITE_API_URL}/me`;
const isLoaderVisible = ref(true);


const authenticateUser = async () => {
  if (!token) return;

  try {
    const { data } = await axios.get(auth_url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    isAuthenticated.value = true;
    userName.value = data.name;

    if (data.token) {
      Cookies.set('token', data.token, { expires: 31 });
      router.push('/projects');
    }
  } catch (error) {
    console.error('Ошибка авторизации:', error);
    Cookies.remove('token');
    Cookies.remove("loginSuccess");
    isAuthenticated.value = false;
  }
};

const isMenuOpen = ref(false);
const closeMenu = () => {
  isMenuOpen.value = false;
};
const openMenu = () => {
  isMenuOpen.value = true;
};

onMounted(async () => {
  const loadStart = Date.now();
  await authenticateUser();
  const loadDuration = Date.now() - loadStart;
  const minLoadTime = 0;
  const remainingTime = minLoadTime - loadDuration;
  setTimeout(() => {
    isLoaderVisible.value = false;
  }, remainingTime > 0 ? remainingTime : 0);
});
</script>

<template>
  <Loader v-if="isLoaderVisible" />
  <div v-else>
    <Header v-if="!isAuthenticated" @openMenu="openMenu"/>
    <HeaderMobileMenu v-if="!isAuthenticated" :isOpen="isMenuOpen" @closeMenu="closeMenu"/>
    <HeaderAuth v-if="isAuthenticated" @openMenu="openMenu" :name="userName"/>
    <HeaderMobileMenuAuth v-if="isAuthenticated" :isOpen="isMenuOpen" @closeMenu="closeMenu"/>
    <router-view/>
    <Footer/>
  </div>
</template>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
</style>
