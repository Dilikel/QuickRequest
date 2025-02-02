<template>
	<div class="container">
		<div class="title">
			<h1>Добро пожаловать в документацию!</h1>
			<p class="intro-text">
				Чтобы начать работу в нашем сервисе, вам необходимо
				<router-link to="/signup" class="btn-link"
					>зарегистрироваться.</router-link
				>
			</p>
			<p>
				<br />
				Наш сервис предоставляет возможность создания REST API. <br />После
				регистрации вы можете создать проект на
			</p>
			<router-link to="/projects" class="btn-link"
				>главной странице
			</router-link>
			<p>, но доступ к нему имеют только зарегистрированные пользователи.</p>
		</div>

		<main class="main">
			<div class="steps">
				<h1>Как создать API</h1>
				<p>Для создания API вам необходимо:</p>

				<div class="step">
					<h2>1. Создание проекта</h2>
					<p>
						Для создания проекта на главной странице нажмите кнопку
						<router-link to="/projects" class="btn-link"
							>Создать проект</router-link
						>
					</p>
				</div>

				<div class="step">
					<h2>2. Создание ресурса</h2>
					<p>
						Для создания ресурса нажмите кнопку
						<strong>Создать ресурс</strong> внутри вашего проекта.
					</p>
					<p>
						Во время создания вы можете сгенерировать JSON файл вашего ресурса
						или создать его вручную, либо оставить пустой массив "[]" и
						добавлять данные позже при помощи POST запросов.
					</p>
				</div>

				<div class="step">
					<h2>3. Использование API</h2>
					<p>
						Вы можете взаимодействовать с вашим ресурсом с помощью всех HTTP
						методов.
					</p>
				</div>
			</div>

			<div class="features">
				<h1>Особенности и примеры</h1>

				<div class="feature">
					<h2>1. Параметры запроса</h2>
					<p>
						Вы можете передавать параметры запроса с помощью GET-запросов, а
						также обращаться к объектам по их id. Пример:
					</p>
					<p class="link">
						<a
							href="https://quickrequestapi.onrender.com/projects/6792162019b325256a15badb/items/1"
							target="_blank"
						>
							https://quickrequestapi.onrender.com/projects/6792162019b325256a15badb/items/1
						</a>
					</p>
					<p class="link">
						<a
							href="https://quickrequestapi.onrender.com/projects/6792162019b325256a15badb/items?name=1%2B1"
							target="_blank"
						>
							https://quickrequestapi.onrender.com/projects/6792162019b325256a15badb/items?name=1%2B1
						</a>
					</p>
					<p>
						В этих примерах я использую параметры запроса для обращения по ID и
						имени.
					</p>
				</div>

				<div class="feature">
					<h2>2. Примеры запросов</h2>
					<pre class="code-block">
            <h2>1) Пример кода на JavaScript. С помощью него вы можете получить данные из вашего ресурса.</h2>
            <code>
import axios from 'axios';

let items = [];

async function fetchItems() {
  await axios.get('https://quickrequestapi.onrender.com/projects/6792162019b325256a15badb/items')
    .then(response => {
      items = response.data;
    })
    .catch(error => {
      console.error('Error fetching projects:', error);
    });
}
            </code>
          </pre>
					<h2>2) Пример кода с параметрами на JavaScript</h2>
					<code>
						import axios from 'axios'; let items = []; let params = { name:
						'1+1' }; async function fetchItems() { await
						axios.get('https://quickrequestapi.onrender.com/projects/6792162019b325256a15badb/items',
						{ params }) .then(response => { items = response.data; })
						.catch(error => { console.error('Error fetching projects:', error);
						}) }
					</code>
				</div>
			</div>
		</main>
	</div>
</template>

<style scoped>
/* Основной контейнер */
.container {
	min-height: 100vh;
	background-color: #121212;
	color: #fff;
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 40px 20px;
	font-family: 'Arial', sans-serif;
}

/* Заголовок */
.title {
	text-align: center;
	max-width: 900px;
}

.title h1 {
	font-size: 36px;
	margin-bottom: 15px;
	color: #ff8a00;
}

.title p {
	font-size: 18px;
	line-height: 1.6;
	margin-bottom: 10px;
	display: inline;
}

/* Элемент для текста и кнопки в одной строке */
.intro-text {
	display: inline;
}

/* Кнопка-ссылка */
.btn-link {
	color: #ff8a00;
	text-decoration: none;
	font-weight: bold;
	display: inline;
	margin-left: 5px;
}

.btn-link:hover {
	text-decoration: underline;
}

/* Основная секция */
.main {
	max-width: 1200px;
	width: 100%;
	margin-top: 50px;
}

.steps,
.features {
	margin-top: 40px;
}

.steps .step,
.features .feature {
	margin-bottom: 30px;
}

h1,
h2 {
	font-size: 24px;
	margin-bottom: 15px;
}

.step p,
.feature p {
	font-size: 16px;
	margin-bottom: 15px;
}

h2 {
	color: #ff8a00;
	font-weight: 600;
}

code {
	background-color: #2d2d2d;
	padding: 15px;
	border-radius: 8px;
	color: #f8f8f8;
	display: block;
	font-size: 14px;
	overflow-x: auto;
}

.code-block {
	background-color: #1a1a1a;
	padding: 20px;
	border-radius: 8px;
	margin-top: 15px;
}

.link a {
	color: #ff8a00;
	text-decoration: none;
}

.link a:hover {
	text-decoration: underline;
}

/* Адаптивность */
@media (max-width: 768px) {
	.container {
		padding: 30px 10px;
	}

	h1,
	h2 {
		font-size: 20px;
	}

	.steps,
	.features {
		margin-top: 30px;
	}

	.steps .step,
	.features .feature {
		margin-bottom: 20px;
	}

	code {
		font-size: 12px;
	}

	.btn-link {
		font-size: 14px;
	}
}
</style>
