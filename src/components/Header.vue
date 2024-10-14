<script setup></script>

<template>
	<header class="header">
		<div class="container">
			<div class="logo">Quick Request</div>
			<div class="right-panel">
				<nav class="menu">
					<ul class="menu-list">
						<li class="menu-item">
							<img src="/icons/home_icon.svg" alt="home icon" />
							<p>Главная</p>
						</li>
						<li class="menu-item">
							<img
								src="/icons/documentation_icon.svg"
								alt="documentation icon"
							/>
							<p>Документация</p>
						</li>
					</ul>
				</nav>
				<div class="header-action">
					<button class="login-button">Войти</button>
				</div>
				<div class="menu-icon">
					<img src="/icons/menu-icon.svg" alt="menu icon" />
				</div>
			</div>
		</div>
	</header>
</template>

<style scoped>
* {
	margin: 0;
	padding: 0;
	box-sizing: border-box;
}

body {
	font-family: 'Inter', sans-serif;
}

.header {
	padding: 20px 0;
	border-bottom: 2px solid rgba(255, 255, 255, 0.1);
}

.container {
	max-width: 1200px;
	margin: 0 auto;
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 0 20px;
}

.logo {
	font-size: 1.7rem;
	font-weight: bold;
	color: #fff;
	transition: color 0.3s ease;
}

.logo:hover {
	color: limegreen;
	cursor: pointer;
}
.right-panel {
	display: flex;
	gap: 40px;
}

.menu-list {
	display: flex;
	gap: 40px;
	align-items: center;
	list-style: none;
}

.menu-item {
	display: flex;
	align-items: center;
	gap: 10px;
	cursor: pointer;
	transition: transform 0.3s ease, color 0.3s ease;
}

.menu-item img {
	width: 32px;
	height: 32px;
	user-select: none;
}

.menu-item p {
	color: #fff;
	font-size: 1.1rem;
	font-weight: 500;
	transition: color 0.3s ease;
}

.menu-item:hover p {
	color: limegreen;
}

.menu-item:hover {
	transform: translateY(-3px);
}

.header-action {
	display: flex;
	align-items: center;
}

.login-button {
	background-color: limegreen;
	color: white;
	border: none;
	padding: 10px 20px;
	border-radius: 25px;
	font-size: 1rem;
	font-weight: 600;
	cursor: pointer;
	transition: background-color 0.3s ease, box-shadow 0.3s ease,
		transform 0.3s ease;
	box-shadow: 0 6px 16px rgba(50, 205, 50, 0.6);
	user-select: none;
}

.login-button:hover {
	background-color: darkgreen;
	box-shadow: 0 6px 16px rgba(0, 100, 0, 0.8);
	transform: translateY(-2px);
}

.menu-icon {
	display: none;
	cursor: pointer;
	width: 30px;
	height: 30px;
	transition: transform 0.3s ease;
}

.menu-icon img {
	width: 100%;
	height: 100%;
}

.menu-icon:hover {
	transform: rotate(90deg);
}

@media (max-width: 768px) {
	.container {
		align-items: center;
		max-width: 100%;
		padding: 0 15px;
	}

	.menu-list {
		display: none;
	}

	.login-button {
		display: none;
	}

	.menu-icon {
		display: block;
		margin-top: 10px;
	}
}

@media (max-width: 480px) {
	.logo {
		font-size: 1.4rem;
	}

	.menu-item p {
		font-size: 1rem;
	}
}
</style>
