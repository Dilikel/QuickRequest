<script setup>

</script>

<template>
  <footer class="footer">
    <div class="footer-content">
      <div class="logo-footer">Quick<span>Request</span></div>
      <p>© 2024 Quick Request. Все права защищены.</p>
      <ul class="footer-links">
        <li><a href="#">Политика конфиденциальности</a></li>
        <li><a href="#">Контакты</a></li>
      </ul>
    </div>
  </footer>
</template>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Montserrat', sans-serif;
}
.footer {
  padding: 40px;
  background-color: #121212;
  text-align: center;
  color: #f0f0f0;
}

.footer-content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.footer-links {
  list-style: none;
  display: flex;
  gap: 20px;
  margin-top: 20px;
}

.footer-links a {
  color: #ff8a00;
  text-decoration: none;
}

.footer-links a:hover {
  text-decoration: underline;
}

@media screen and (max-width: 768px) {
  .footer {
    padding: 20px;
  }

  .footer-content {
    text-align: center;
  }

  .footer-links {
    flex-direction: column;
    gap: 10px;
  }
}
</style>