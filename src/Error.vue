<template>
	<div class="not-found">
		<div class="not-found-container">
			<h1>404</h1>
			<div class="not-found-text">
				<p>Извините, ваш url не корректен.</p>
				<p>Пожалуйста проверьте правильность ссылки.</p>
			</div>
		</div>
	</div>
</template>

<style scoped>
.not-found-container {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	min-height: 65vh;
}

.not-found-text {
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	color: #e0e0e0;
	font-size: 18px;
	font-weight: 500;
	gap: 3px;
}

.not-found-container h1 {
	color: white;
	font-weight: 600;
	font-size: 74px;
}
</style>