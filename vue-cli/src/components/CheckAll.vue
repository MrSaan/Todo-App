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
  props: {
    anyRemaining: {
      type: Boolean,
      required: true
    }
  },
  methods: {
    allCheck() {
      eventBus.$emit("allCheckTodos", this.anyRemaining);
    }
  }
};
</script>