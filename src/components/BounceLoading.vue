<template>
  <div class="loading-bounce">
    <div></div>
    <div></div>
    <div></div>
  </div>
</template>

<script>
export default {
  name: 'bounceLoading'
}
</script>

<style lang="scss">
.loading-bounce {
  display: flex;
  justify-content: center;
  align-items: flex-end;
  height: 50px;
}

.loading-bounce div {
  width: 6px;
  height: 6px;
  margin: 0 5px;
  border-radius: 50%;
  background-color: var(--header-menu-background);
  animation: bounce 0.5s ease-in-out infinite alternate;
}

.loading-bounce div:nth-child(1) {
  animation-delay: 0.1s;
}

.loading-bounce div:nth-child(2) {
  animation-delay: 0.2s;
}

.loading-bounce div:nth-child(3) {
  animation-delay: 0.3s;
}

@keyframes bounce {
  to { transform: translateY(-20px); }
}
</style>