<script setup>
const props = defineProps({
  message: {
    type: String,
    required: true
  }
});
</script>

<template>
  <div class="error-message">
    <p>{{ message }}</p>
  </div>
</template>

<style scoped>
.error-message {
  color: #ff4f4f;
  background-color: rgba(255, 0, 0, 0.1);
  padding: 10px;
  border-radius: 10px;
  margin-top: 10px;
  text-align: center;
}
</style>