<template>
  <div>{{ remaining }} item left</div>
</template>

<script>
export default {
  name: "items-remaining",
  computed: {
    remaining() {
      return this.$store.getters.remaining;
    }
  }
};
</script>