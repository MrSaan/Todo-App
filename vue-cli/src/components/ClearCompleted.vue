<template>
  <button v-if="showCompleted" @click="clearCompleted">Clear Completed</button>
</template>
<script>
export default {
  name: "clear-completed",
  props: {
    showCompleted: {
      type: Number,
      required: true
    }
  },
  methods: {
    clearCompleted() {
      eventBus.$emit("clearCompleted");
    }
  }
};
</script>