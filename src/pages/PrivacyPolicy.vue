<template>
	<div class="privacy-policy">
		<header class="header">
			<h1>Политика конфиденциальности</h1>
			<p>Последнее обновление: 16.12.2024</p>
		</header>

		<main class="content">
			<section>
				<h2>Сбор информации</h2>
				<p>
					Мы собираем информацию о вас, когда вы используете наш сервис. Это
					может включать личные данные, такие как ваше имя, адрес электронной
					почты и другую информацию, необходимую для предоставления услуг.
				</p>
			</section>

			<section>
				<h2>Использование информации</h2>
				<p>
					Собранная информация используется для улучшения нашего сервиса,
					предоставления поддержки пользователям и отправки уведомлений о новых
					функциях и обновлениях.
				</p>
			</section>

			<section>
				<h2>Безопасность данных</h2>
				<p>
					Мы принимаем все необходимые меры для защиты ваших данных от
					несанкционированного доступа, утраты или разрушения. Однако ни один
					метод передачи по интернету или метод электронного хранения не
					является на 100% безопасным.
				</p>
			</section>

			<section>
				<h2>Ваши права</h2>
				<p>
					У вас есть право запрашивать доступ к вашим данным, исправлять их или
					удалять. Если вы хотите воспользоваться этими правами, пожалуйста,
					свяжитесь с нами.
				</p>
			</section>

			<section>
				<h2>Контактная информация</h2>
				<p>
					Если у вас есть вопросы или комментарии по поводу нашей политики
					конфиденциальности, пожалуйста, свяжитесь с нами по электронной почте:
					<a href="quick-request-official@yandex.ru"
						>quick-request-official@yandex.ru</a
					>.
				</p>
			</section>
		</main>

		<footer class="footer">
			<router-link to="/" class="primary-button"
				>Вернуться на главную</router-link
			>
		</footer>
	</div>
</template>

<style scoped>
.privacy-policy {
	max-width: 800px;
	margin: 0 auto;
	padding: 20px;
	font-family: Arial, sans-serif;
	color: white;
}

.header {
	text-align: center;
	margin-bottom: 40px;
}

.content {
	margin-bottom: 40px;
}

h1 {
	font-size: 2.5rem;
}

h2 {
	font-size: 1.75rem;
	margin-top: 20px;
}

p {
	font-size: 1rem;
	line-height: 1.5;
	margin: 10px 0;
}

a {
	color: #ff8a00;
}

.footer {
	text-align: center;
}

.primary-button {
	background: linear-gradient(90deg, #ff8a00, #ff6b6b);
	color: white;
	padding: 12px 30px;
	border: none;
	border-radius: 10px;
	font-size: 16px;
	cursor: pointer;
	user-select: none;
	text-decoration: none;
	transition: background 0.4s ease, transform 0.3s ease, box-shadow 0.3s ease;
	box-shadow: 0 8px 20px rgba(255, 107, 107, 0.5);
}

.primary-button:hover {
	background: linear-gradient(90deg, #ff7a00, #ff5656);
	transform: translateY(-4px);
	box-shadow: 0 10px 25px rgba(255, 107, 107, 0.7);
}
</style>
