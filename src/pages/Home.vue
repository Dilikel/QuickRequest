<script setup>
</script>

<template>
  <div class="home">
    <div class="container">
      <section class="hero">
        <div class="hero-content">
          <h1>Идеальный сервис для создания REST API</h1>
          <p>Создавайте, управляйте и масштабируйте свои API с Quick Request. Простота и мощь — в одном месте.</p>
          <div class="action-buttons">
            <button class="primary-button">Начать бесплатно</button>
            <button class="secondary-button">Узнать больше</button>
          </div>
        </div>
      </section>
      <section class="features">
        <div class="features-content">
          <h2>Основные преимущества</h2>
          <div class="features-grid">
            <div class="feature-card">
              <div class="feature-icon">🔑</div>
              <h3>Авторизация</h3>
              <p>Легкая настройка авторизации для вашего API.</p>
            </div>
            <div class="feature-card">
              <div class="feature-icon">🗂️</div>
              <h3>Фильтрация данных</h3>
              <p>Гибкие фильтры для работы с запросами.</p>
            </div>
            <div class="feature-card">
              <div class="feature-icon">📦</div>
              <h3>Загрузка файлов</h3>
              <p>Удобная загрузка и хранение файлов.</p>
            </div>
            <div class="feature-card">
              <div class="feature-icon">📜</div>
              <h3>JSON-хранилище</h3>
              <p>Эффективное хранение данных в формате JSON.</p>
            </div>
        </div>
        </div>
      </section>
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

.hero {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 100px 0;
  color: white;
  background: linear-gradient(135deg, #ff8a00, #ff6b6b);
}

.hero-content {
  max-width: 1240px;
  margin: 0 auto;
}

.hero h1 {
  font-size: 48px;
  line-height: 1.2;
  margin-bottom: 20px;
}

.hero p {
  font-size: 20px;
  margin-bottom: 40px;
}

.action-buttons {
  display: flex;
  gap: 20px;
}

.primary-button,
.secondary-button {
  padding: 15px 35px;
  border-radius: 30px;
  font-size: 18px;
  border: none;
  cursor: pointer;
  transition: transform 0.3s ease;
  user-select: none;
}

.primary-button {
  background-color: #121212;
  color: #fff;
}

.secondary-button {
  background-color: transparent;
  border: 2px solid #fff;
  color: #fff;
}

.primary-button:hover,
.secondary-button:hover {
  transform: scale(1.05);
}

.features-content {
  max-width: 1240px;
  margin: 0 auto;
}

.features {
  padding: 80px 0;
  background-color: #202020;
  text-align: center;
}

.features-content h2 {
  font-size: 36px;
  margin-bottom: 40px;
  color: #f0f0f0;
}

.features-grid {
  display: flex;
  justify-content: space-around;
  gap: 30px;
  flex-wrap: wrap;
}

.feature-card {
  background: #333;
  padding: 40px;
  border-radius: 20px;
  max-width: 250px;
  transition: transform 0.3s ease;
  color: #f0f0f0;
  user-select: none;
}

.feature-card:hover {
  transform: translateY(-10px);
}

.feature-icon {
  font-size: 36px;
  margin-bottom: 20px;
  color: #ff8a00;
}

@media screen and (max-width: 768px) {
  .hero {
    padding: 60px 20px;
    flex-direction: column;
    text-align: center;
  }

  .hero h1 {
    font-size: 32px;
  }

  .hero p {
    font-size: 18px;
  }

  .action-buttons {
    flex-direction: column;
    gap: 15px;
  }

  .primary-button,
  .secondary-button {
    width: 100%;
  }

  .features-grid {
    flex-direction: column;
    align-items: center;
  }
}

@media screen and (max-width: 480px) {
  .hero h1 {
    font-size: 28px;
  }

  .hero p {
    font-size: 16px;
  }

  .primary-button,
  .secondary-button {
    font-size: 16px;
    padding: 12px 30px;
  }

  .feature-card {
    padding: 30px;
  }

  .features-content h2 {
    font-size: 28px;
  }
}


</style>
