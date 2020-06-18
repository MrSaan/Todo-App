<template>
  <div>
    <label>
      <input type="checkbox" :checked="!anyRemaining" @change="allCheck" /> Check All
    </label>
  </div>
</template>

<script>
export default {
  name: "check-all",
  computed: {
    anyRemaining() {
      return this.$store.getters.anyRemaining;
    }
  },
  methods: {
    allCheck() {
      // eventBus.$emit("allCheckTodos", this.anyRemaining);
      this.$store.dispatch("allCheckTodos", event.target.checked);
    }
  }
};
</script>