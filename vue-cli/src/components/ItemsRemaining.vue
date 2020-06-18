<template>
  <div>{{ remaining }} item left</div>
</template>

<script>
export default {
  name: "items-remaining",
  props: {
    remaining: {
      type: Number,
      required: true
    }
  }
};
</script>