<script setup>
import { computed } from 'vue';

const props = defineProps({
  projectName: {
    type: String,
    required: true
  },
  projectId: {
    type: String,
    required: true
  }
});

const iconColor = computed(() => {
  const firstLetter = props.projectName.charAt(0).toUpperCase();
  if ('ABC'.includes(firstLetter)) return '#ff8a00';
  if ('DEF'.includes(firstLetter)) return '#ff6b6b';
  if ('GHI'.includes(firstLetter)) return '#4CAF50';
  if ('JKL'.includes(firstLetter)) return '#2196F3';
  if ('MNO'.includes(firstLetter)) return '#9C27B0';
  if ('PQR'.includes(firstLetter)) return '#FF5722';
  if ('STU'.includes(firstLetter)) return '#795548';
  return '#607D8B';
});

const firstLetter = computed(() => props.projectName.charAt(0).toUpperCase());
</script>

<template>
  <div class="project-card">
    <div class="icon" :style="{ backgroundColor: iconColor }">
      <span>{{ firstLetter }}</span>
    </div>
    <div class="details">
      <h2>{{ projectName }}</h2>
      <p>ID: {{ projectId }}</p>
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


.project-card {
  display: flex;
  align-items: center;
  padding: 20px;
  background-color: #2c2c2c;
  border-radius: 15px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
}

.project-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5);
}

.icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  font-size: 24px;
  font-weight: bold;
  color: white;
  margin-right: 20px;
}

.details {
  color: #fff;
}

.details h2 {
  font-size: 20px;
  margin-bottom: 5px;
}

.details p {
  font-size: 14px;
  color: #b3b3b3;
}

@media (max-width: 768px) {
  .project-card {
    padding: 15px;
  }

  .icon {
    width: 50px;
    height: 50px;
    font-size: 20px;
  }

  .details h2 {
    font-size: 18px;
  }

  .details p {
    font-size: 12px;
  }
}
</style>
