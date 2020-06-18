<template>
  <div class="todo-item">
    <div class="todo-item-left">
      <input type="checkbox" v-model="complete" @change="doneEdit" />
      <div
        class="todo-item-label"
        v-if="!editing"
        @dblclick="editTodo"
        :class="{ completed : complete }"
      >{{ title}}</div>
      <input
        class="todo-item-edit"
        type="text"
        v-else
        v-model="title"
        v-focus
        @blur="doneEdit"
        @keyup.enter="doneEdit"
        @keyup.esc="cancelEdit"
      />
    </div>
    <div class="remove-item" @click="removeTodo(todo.id)">&times;</div>
  </div>
</template>

<script>
export default {
  name: "todo-item",
  props: {
    todo: {
      type: Object,
      required: true
    },
    checkAll: {
      type: Boolean,
      required: true
    }
  },
  // melihat perubahan yang terjadi ketika suatu aksi dilakukan.
  watch: {
    checkAll() {
      // if (this.checkAll) {
      //   this.complete = true;
      // } else {
      //   this.complete = this.todo.complete;
      // }
      this.complete = this.checkAll ? true : this.todo.complete;
    }
  },
  data() {
    return {
      id: this.todo.id,
      title: this.todo.title,
      complete: this.todo.complete,
      editing: this.todo.editing,
      beforeEditCache: ""
    };
  },
  methods: {
    removeTodo(id) {
      // eventBus.$emit("removeTodo", id);
      this.$store.dispatch("removeTodo", id);
    },
    editTodo() {
      this.beforeEditCache = this.title;
      this.editing = true;
    },
    doneEdit() {
      if (this.title.trim() == "") {
        this.title = this.beforeEditCache;
      }
      this.editing = false;
      // eventBus.$emit("finishEdit", {
      //   id: this.id,
      //   title: this.title,
      //   complete: this.complete,
      //   editing: this.editing
      // });
      this.$store.dispatch("finishEdit", {
        id: this.id,
        title: this.title,
        complete: this.complete,
        editing: this.editing
      });
    },

    cancelEdit() {
      this.title = this.beforeEditCache;
      this.editing = false;
    }
  },
  directives: {
    focus: {
      // directive definition
      inserted: function(el) {
        el.focus();
      }
    }
  }
};
</script>