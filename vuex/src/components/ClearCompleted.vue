<template>
  <button v-if="showCompleted" @click="clearCompleted">Clear Completed</button>
</template>
<script>
export default {
  name: "clear-completed",
  computed: {
    showCompleted() {
      return this.$store.getters.ShowClearCompletedButton;
    }
  },
  methods: {
    clearCompleted() {
      // eventBus.$emit("clearCompleted");
      this.$store.dispatch("clearCompleted");
    }
  }
};
</script>