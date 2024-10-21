<script setup>
import {ref} from "vue";

const list = true
</script>

<template>
<div class="projects">
  <div class="container" v-if="list">
    <div class="title">
      <h1>Ваши проекты</h1>
      <div class="action">
        <button class="create-btn">
          <img src="/icons/package_plus.svg" alt="package">
          Создать проект
        </button>
      </div>
    </div>
  </div>
  <div class="NoneList" v-else="list">
    <div class="NoneListInfo">
      <img src="/public/icons/package-icon.svg" alt="package">
      <h1>Список проектов пока пуст</h1>
      <p>У вас пока нет проектов. Создайте новый проект</p>
    </div>
  </div>
</div>
</template>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Montserrat', sans-serif;
}

.projects {
  margin-top: 20px;
}


.container {
  max-width: 1240px;
  margin: 0 auto;
  min-height: 70vh;
}

.title {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.create-btn {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  background: linear-gradient(90deg, #ff8a00, #ff6b6b);
  color: white;
  padding: 12px 30px;
  border: none;
  border-radius: 15px;
  font-size: 16px;
  cursor: pointer;
  user-select: none;
  text-decoration: none;
  transition: background 0.4s ease, transform 0.3s ease, box-shadow 0.3s ease;
  box-shadow: 0 8px 20px rgba(255, 107, 107, 0.5);
}

.create-btn:hover {
  background: linear-gradient(90deg, #ff7a00, #ff5656);
  transform: translateY(-4px);
  box-shadow: 0 10px 25px rgba(255, 107, 107, 0.7);
}

.title h1 {
  font-weight: bold;
  color: #fff;
  font-size: 22px;
}

.NoneList {
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 1240px;
  margin: 0 auto;
  min-height: 50vh;
}

.NoneListInfo {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 20px;
  color: white;
}

@media (max-width: 1024px) {
  .projects {
    padding-left: 10px;
    padding-right: 10px;
  }
}
</style>