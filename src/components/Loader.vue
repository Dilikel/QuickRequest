<script setup>
import {ref} from "vue";

const isHidden = ref(false);
</script>

<template>
  <div class="loader" :class="{ hidden: isHidden }">
    <div class="spinner"></div>
  </div>
</template>

<style scoped>
.loader {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #121212;
  z-index: 1000;
  opacity: 1;
  transition: opacity 0.5s ease-in-out, visibility 0s linear 0.5s;
}

.loader.hidden {
  opacity: 0;
  visibility: hidden;
}

.spinner {
  border: 8px solid #f3f3f3;
  border-top: 8px solid #ff8a00;
  border-radius: 50%;
  width: 80px;
  height: 80px;
  animation: spin 1.5s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>