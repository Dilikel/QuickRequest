<script setup>
import {ref, watch, defineEmits, onMounted} from 'vue';
import axios from 'axios';
import ErrorDisplay from "@/components/Register/ErrorDisplay.vue";
import RegistrationSuccess from '@/components/Register/RegistrationSuccess.vue';
import Cookies from 'js-cookie';


const register_url = `${import.meta.env.VITE_API_URL}/register`;
const emit = defineEmits();

const name = ref('');
const age = ref('');
const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const errorMessage = ref('');
const passwordHint = ref('');
const confirmPasswordHint = ref('');
const registrationSuccess = ref(false);

onMounted(() => {
  const loginSuccess = Cookies.get("loginSuccess");
  if (loginSuccess === "true") {
    registrationSuccess.value = true;
  }
});



const registerUser = async () => {
  errorMessage.value = '';
  if (password.value !== confirmPassword.value) {
    errorMessage.value = 'Пароли не совпадают';
    return;
  }

  try {
    const response = await axios.post(register_url, {
      name: name.value,
      age: age.value,
      email: email.value,
      password: password.value,
    });
    const token = response.data.access_token;
    Cookies.set('token', token, { expires: 7 });
    registrationSuccess.value = true;
    Cookies.set("loginSuccess", "true", { expires: 7 });
    emit("userAuthenticated");
    window.location.reload();
  } catch (error) {
    if (error.response && error.response.data) {
      errorMessage.value = error.response.data.detail || 'Ошибка при регистрации';
    } else {
      errorMessage.value = 'Произошла ошибка. Попробуйте позже.';
    }
  }
};

watch(password, (newPassword) => {
  const hasUppercase = /[A-Z]/.test(newPassword);
  const hasLowercase = /[a-z]/.test(newPassword);
  const hasValidLength = newPassword.length >= 6;

  if (!hasValidLength) {
    passwordHint.value = 'Пароль должен содержать не менее 6 символов';
  } else if (!hasUppercase || !hasLowercase) {
    passwordHint.value = 'Пароль должен содержать строчные и заглавные латинские буквы';
  } else {
    passwordHint.value = '';
  }
});


watch(confirmPassword, (newConfirmPassword) => {
  if (newConfirmPassword !== password.value) {
    confirmPasswordHint.value = 'Пароли должны совпадать';
  } else {
    confirmPasswordHint.value = '';
  }
});
</script>

<template>
  <div class="register-wrapper">
    <div class="register-container" v-if="!registrationSuccess">
      <h2 class="register-title">Регистрация</h2>
      <form class="register-form" @submit.prevent="registerUser">
        <div class="inputs">
          <input v-model="name" type="text" placeholder="Введите ваше имя:" class="input-field" required />
          <input v-model="age" type="number" placeholder="Введите ваш возраст:" class="input-field" required />
          <input v-model="email" type="email" placeholder="Email:" class="input-field" required />
          <input v-model="password" type="password" placeholder="Пароль:" class="input-field" required />
          <p v-if="passwordHint" class="hint">{{ passwordHint }}</p>
          <input v-model="confirmPassword" type="password" placeholder="Повторите пароль:" class="input-field" required />
          <p v-if="confirmPasswordHint" class="hint">{{ confirmPasswordHint }}</p>
        </div>
        <ErrorDisplay v-if="errorMessage" :message="errorMessage" />
        <button type="submit" class="submit-button">Продолжить</button>
      </form>
    </div>
    <RegistrationSuccess v-else />
  </div>
</template>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Montserrat', sans-serif;
}
.hint {
  font-size: 14px;
  color: white;
  margin-top: -10px;
  margin-left: 15px;
}
.register-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  background: linear-gradient(135deg, #ff8a00, #ff6b6b);
  min-height: 75vh;
}

.register-container {
  background-color: #121212;
  backdrop-filter: blur(20px);
  border-radius: 30px;
  padding: 50px;
  box-shadow: 0 15px 35px rgba(25, 25, 25, 0.6);
  max-width: 450px;
  width: 100%;
  transition: transform 0.3s ease;
  color: #ffffff;
}


.register-form {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 25px;
}
.inputs {
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
}
.register-title {
  font-size: 36px;
  font-weight: bold;
  color: white;
  text-align: center;
  text-shadow: 0 4px 6px rgba(0, 0, 0, 0.4);
  margin-bottom: 25px;
}
.input-field {
  width: 100%;
  padding: 15px;
  border: none;
  border-radius: 30px;
  background-color: #2c2c2c;
  box-shadow: inset 0 4px 6px rgba(0, 0, 0, 0.4);
  font-size: 16px;
  color: #fff;
  transition: background-color 0.3s ease;
}

.input-field::placeholder {
  color: #b8b8b8;
}

.input-field:focus {
  background-color: #4a4a4a;
  outline: none;
}

.submit-button {
  width: 100%;
  padding: 15px;
  background: linear-gradient(90deg, #ff8a00, #ff6b6b);
  border: none;
  border-radius: 30px;
  color: white;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.4s ease;
  box-shadow: 0 8px 20px rgba(255, 107, 107, 0.5);
}

.submit-button:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 24px rgba(255, 107, 107, 0.8);
}


@media (max-width: 768px) {
  .register-container {
    padding: 30px;
  }

  .register-title {
    font-size: 28px;
  }

  .input-field {
    padding: 12px;
    font-size: 14px;
  }

  .submit-button {
    padding: 12px;
    font-size: 16px;
  }
}

@media (max-width: 480px) {
  .register-wrapper {
    padding: 30px;
  }
  .register-container {
    padding: 20px;
  }

  .register-title {
    font-size: 24px;
  }

  .input-field {
    width: 100%;
    padding: 10px;
  }

  .submit-button{
    padding: 10px;
    font-size: 14px;
  }
}
</style>