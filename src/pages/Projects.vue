<script setup>
import ProjectCardList from "@/components/Projects/ProjectCardList.vue";
import CreateProject from "@/components/Projects/CreateProject.vue";
import axios from "axios";
import { ref, onMounted } from "vue";
import Cookies from 'js-cookie';

const items = ref([]);
const list = ref(true);
const showCreateProjectModal = ref(false);
const items_url = `${import.meta.env.VITE_API_URL}/projects/`;
const token = Cookies.get('token');

const fetchItems = async () => {
  try {
    const response = await axios.get(items_url, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    items.value = response.data;
    list.value = items.value.length > 0;
  } catch (error) {
    console.error("Error fetching projects:", error);
  }
};

const toggleCreateProjectModal = () => {
  showCreateProjectModal.value = !showCreateProjectModal.value;
};

onMounted(() => {
  fetchItems();
});
</script>

<template>
  <div class="projects">
    <div class="container">
      <div class="title">
        <h1>Ваши проекты</h1>
        <div class="action">
          <button class="create-btn" @click="toggleCreateProjectModal">
            <img src="/icons/package_plus.svg" alt="package">
            Создать проект
          </button>
        </div>
      </div>
      <div class="project-list" v-if="list">
        <ProjectCardList :items="items" />
      </div>
      <div class="NoneList" v-else>
        <div class="NoneListInfo">
          <img src="/public/icons/package-icon.svg" alt="package">
          <h1>Список проектов пока пуст</h1>
          <p>У вас пока нет проектов. Создайте новый проект</p>
        </div>
      </div>
    </div>
    <CreateProject v-if="showCreateProjectModal" @close="toggleCreateProjectModal" />
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
    padding: 0 15px;
  }

  .create-btn {
    padding: 10px 20px;
    font-size: 14px;
  }

  .title h1 {
    font-size: 20px;
  }
}

@media (max-width: 768px) {
  .title {
    text-align: center;
  }

  .create-btn {
    width: 100%;
    padding: 10px;
    font-size: 14px;
  }

  .project-list {
    flex-direction: column;
    align-items: center;
  }
}

@media (max-width: 480px) {
  .title h1 {
    font-size: 18px;
  }

  .create-btn {
    font-size: 13px;
  }

  .NoneListInfo h1 {
    font-size: 18px;
  }

  .NoneListInfo p {
    font-size: 14px;
  }
}
</style>
