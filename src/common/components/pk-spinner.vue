<template>
  <div class="spinner-container">
    <div class="spinner"></div>
  </div>
</template>

<style scoped>
.spinner-container {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}
.spinner {
  border: 3px solid var(--grey);
  border-right-color: transparent;
  border-radius: 50%;
  width: 2rem;
  height: 2rem;
  animation: spinner-rotate 0.8s linear infinite;
}
@keyframes spinner-rotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
