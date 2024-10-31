<script setup>
import axios from "axios";
import Cookies from 'js-cookie';
import { onMounted, ref } from "vue";

const items_url = `${import.meta.env.VITE_API_URL}/projects/`;
const token = Cookies.get('token');

const props = defineProps({
  id: {
    type: Number,
    required: true,
  },
});

const project = ref({
  name: "",
  projectId: "",
  description: "",
  created_at: "",
  updated_at: ""
});

const fetchProject = async () => {
  try {
    const response = await axios.get(`${items_url}${props.id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    project.value = response.data;
  } catch (err) {
    console.log(err);
  }
};

onMounted(() => {
  fetchProject();
});
</script>

<template>
  <div class="project">
    <div class="container">
      <div class="menu">
        <router-link to="/projects" class="back-btn">
          <img src="/icons/arrow-icon.svg" alt="arrow" />
          Назад
        </router-link>
        <div class="panel">
          <button class="create-resource-btn">
            <img src="/icons/plus-icon.svg" alt="plus" />
            Создать ресурс
          </button>
          <button class="settings-btn">
            <img src="/icons/settings-icon.svg" alt="settings" />
          </button>
          <button class="delete-btn">
            <img src="/icons/delete-icon.svg" alt="delete" />
          </button>
        </div>
      </div>

      <div class="project-card">
        <h1>{{ project.name }}</h1>
        <p class="project-id">ID проекта: {{ project.projectId }}</p>
        <p class="description">{{ project.description }}</p>
        <div class="project-meta">
          <span>Создан: {{ new Date(project.created_at).toLocaleDateString() }}</span>
          <span>Обновлен: {{ new Date(project.updated_at).toLocaleDateString() }}</span>
        </div>
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
.container {
  max-width: 1240px;
  margin: 0 auto;
  padding: 20px;
  min-height: 80vh;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.menu {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 30px;
}

.back-btn {
  display: flex;
  align-items: center;
  gap: 10px;
  color: #ffffff;
  font-size: 18px;
  cursor: pointer;
  transition: color 0.3s ease;
  text-decoration: none;
}

.back-btn:hover {
  color: #ff8a00;
  filter: brightness(0) saturate(100%) invert(64%) sepia(50%) saturate(2161%) hue-rotate(343deg) brightness(97%) contrast(97%);
}


.panel {
  display: flex;
  align-items: center;
  gap: 20px;
}

.panel button {
  display: flex;
  align-items: center;
  gap: 10px;
  background-color: transparent;
  border: none;
  cursor: pointer;
  transition: transform 0.3s ease;
}
.panel img {
  width: 30px;
  height: 30px;
}

.panel button:hover {
  transform: translateY(-3px);
}

.settings-btn {
  border: 1px solid white !important;
  border-radius: 15px !important;
  padding: 10px 15px !important;
  box-shadow: 0 4px 20px white;
}

.delete-btn {
  border: 1px solid red !important;
  border-radius: 15px !important;
  padding: 10px 15px !important;
  box-shadow: 0 4px 20px red;
}


.create-resource-btn {
  background: linear-gradient(90deg, #ff8a00, #ff6b6b);
  color: white;
  padding: 12px 20px;
  border-radius: 15px;
  font-size: 16px;
  transition: background 0.4s ease, transform 0.3s ease, box-shadow 0.3s ease;
  box-shadow: 0 8px 20px rgba(255, 107, 107, 0.5);
}
.create-resource-btn:hover {
  background: linear-gradient(90deg, #ff7a00, #ff5656);
  transform: translateY(-4px);
  box-shadow: 0 10px 25px rgba(255, 107, 107, 0.7);
}

.project-card {
  background: linear-gradient(135deg, #f0f4f8, #e0e7ed);
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  padding: 40px 30px;
  width: 100%;
  max-width: 600px;
  text-align: center;
  transition: box-shadow 0.3s ease;
}
.project-card:hover {
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.15);
}

.project-card h1 {
  font-size: 32px;
  color: #333;
  margin-bottom: 15px;
}
.project-id {
  color: #555;
  font-size: 18px;
  font-weight: 500;
  margin-bottom: 10px;
}
.description {
  color: #666;
  font-size: 16px;
  line-height: 1.6;
  margin-bottom: 20px;
}

.project-meta {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  color: #888;
  font-size: 14px;
}

@media (max-width: 768px) {
  .menu {
    flex-direction: column;
    gap: 10px;
  }
  .project-card {
    padding: 30px;
  }
  .project-card h1 {
    font-size: 26px;
  }
  .project-id, .description {
    font-size: 15px;
  }
  .project-meta {
    flex-direction: column;
    align-items: center;
    gap: 5px;
  }
}
</style>
