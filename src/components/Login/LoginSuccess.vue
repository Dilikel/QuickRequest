<script setup>
</script>


<template>
  <div class="success-message">
    <div class="icon-wrapper">
      <img src="/icons/success-icon.svg" alt="success-icon" class="success-icon" />
    </div>
    <h2>Вы успешно вошли в аккаунт!</h2>
    <p>Добро пожаловать в <span class="brand-name">QuickRequest!</span></p>
    <router-link to="/" class="cta-button">Перейти на главную</router-link>
  </div>
</template>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Montserrat', sans-serif;
}


.success-message {
  background-color: #121212;
  backdrop-filter: blur(20px);
  box-shadow: 0 15px 35px rgba(25, 25, 25, 0.5);
  padding: 30px;
  text-align: center;
  border-radius: 20px;
  max-width: 400px;
  margin: auto;
  color: white;
  animation: slide-in 0.5s ease-out;
}

.icon-wrapper {
  margin-bottom: 20px;
}

.success-icon {
  width: 80px;
  height: 80px;
  animation: pop-in 0.4s ease-out;
}

h2 {
  font-size: 26px;
  font-weight: 700;
  margin-bottom: 10px;
}

p {
  font-size: 18px;
  margin-bottom: 20px;
  font-weight: 400;
}

.brand-name {
  font-weight: 700;
  color:  #ff8a00;
  text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.2);
}

.cta-button {
  padding: 12px 24px;
  background: linear-gradient(90deg, #ff8a00, #ff6b6b);
  border: none;
  border-radius: 30px;
  color: white;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 8px 20px rgba(255, 107, 107, 0.5);
  text-decoration: none;
  transition: transform 0.3s ease, box-shadow 0.4s ease;
}

.cta-button:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 24px rgba(255, 107, 107, 0.8);
}

@keyframes slide-in {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes pop-in {
  from {
    opacity: 0;
    transform: scale(0.5);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
</style>