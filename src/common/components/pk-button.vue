<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    variant?: string
  }>(),
  {
    variant: 'grey'
  }
)

const emit = defineEmits<{
  (event: 'click'): void
}>()
</script>

<template>
  <button @click="emit('click')" :variant="props.variant"><slot></slot></button>
</template>

<style scoped>
button {
  color: white;
  font-weight: 600;
  padding: 0.5rem;
  border: 0px solid transparent;
  border-radius: 0.2rem;
  cursor: pointer;
}

button[variant='green'] {
  background-color: var(--green);
}
button[variant='light-green'] {
  background-color: var(--light-green);
}
button[variant='dark-green'] {
  background-color: var(--dark-green);
}
button[variant='purple'] {
  background-color: var(--purple);
}
button[variant='light-purple'] {
  background-color: var(--light-purple);
}
button[variant='blue'] {
  background-color: var(--blue);
}
button[variant='orange'] {
  background-color: var(--orange);
}
button[variant='grey'] {
  background-color: var(--grey);
}
button[variant='light-grey'] {
  background-color: var(--light-grey);
}
button[variant='red'] {
  background-color: var(--red);
}
button[variant='extra-light-blue'] {
  background-color: var(--extra-light-blue);
}
button[variant='pink'] {
  background-color: var(--pink);
}
button[variant='light-pink'] {
  background-color: var(--light-pink);
}
button[variant='yellow'] {
  background-color: var(--yellow);
}
button[variant='light-orange'] {
  background-color: var(--light-orange);
}
button[variant='light-yellow'] {
  background-color: var(--light-yellow);
}
button[variant='light-black'] {
  background-color: var(--light-black);
}
button[variant='dark-blue'] {
  background-color: var(--dark-blue);
}
</style>
