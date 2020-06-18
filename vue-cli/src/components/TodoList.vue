<template>
  <div>
    <input
      class="todo-input"
      type="text"
      placeholder="what need to be done"
      v-model="newTodo"
      @keyup.enter="addTodo"
    />
    <transition-group
      name="fade"
      enter-active-class="animated fadeInUp"
      leave-active-class="animated fadeOutDown"
    >
      <todo-item
        v-for="(todo, index) in todosFiltered"
        :key="todo.id"
        :todo="todo"
        :index="index"
        :checkAll="!anyRemaining"
      ></todo-item>
    </transition-group>
    <div class="extra-container">
      <check-all :anyRemaining="anyRemaining"></check-all>
      <items-remaining :remaining="remaining"></items-remaining>
    </div>
    <div class="extra-container">
      <todo-filtered></todo-filtered>
      <div>
        <transition name="fade">
          <clear-completed :showCompleted="ShowClearCompletedButton"></clear-completed>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import TodoItem from "./TodoItem";
import ItemsRemaining from "./ItemsRemaining";
import CheckAll from "../components/CheckAll";
import TodoFiltered from "../components/TodoFiltered";
import ClearCompleted from "../components/ClearCompleted";

export default {
  name: "todo-list",
  components: {
    TodoItem,
    ItemsRemaining,
    CheckAll,
    TodoFiltered,
    ClearCompleted
  },
  data() {
    return {
      newTodo: "",
      beforeEditCache: "",
      id: 3,
      filter: "all",
      todos: [
        {
          id: 1,
          title: "test",
          complete: false,
          editing: false
        },
        {
          id: 2,
          title: "test 1",
          complete: false,
          editing: false
        }
      ]
    };
  },
  // lifecycle yang pertama kali dijalankan pada component, memungkinkan kita untuk menjalankan kode sesaat  sesudah component mengupdate DOM / data dan event (event computed dan watch) telah selesai di-render, tetapi template belum di-render oleh vue.
  created() {
    eventBus.$on("removeTodo", index => this.removeTodo(index));
    eventBus.$on("finishEdit", data => this.finishEdit(data));
    eventBus.$on("allCheckTodos", checked => this.checkAllTodos(checked));
    eventBus.$on("changeFilter", filter => (this.filter = filter));
    eventBus.$on("clearCompleted", () => this.clearCompleted());
  },
  // sebelum berakhir menghancurkan handler yang sebelumnya di buat
  beforeDestroy() {
    eventBus.$on("removeTodo", index => this.removeTodo(index));
    eventBus.$on("finishEdit", data => this.finishEdit(data));
    eventBus.$on("allCheckTodos", checked => this.checkAllTodos(checked));
    eventBus.$on("changeFilter", filter => (this.filter = filter));
    eventBus.$on("clearCompleted", () => this.clearCompleted());
  },
  methods: {
    // bagian methods dari events child
    removeTodo(index) {
      this.todos.splice(index, 1);
    },
    finishEdit(data) {
      this.todos.splice(data.index, 1, data.todo);
    },
    // akhir method bagian events

    addTodo() {
      if (this.newTodo.trim().length == 0) {
        return;
      }
      this.todos.push({
        id: this.id,
        title: this.newTodo,
        complete: false,
        editing: false
      });

      (this.newTodo = ""), this.id++;
    },

    checkAllTodos() {
      this.todos.forEach(todo => (todo.complete = event.target.checked));
    },

    clearCompleted() {
      this.todos = this.todos.filter(todo => !todo.complete);
    }
  },
  computed: {
    remaining() {
      return this.todos.filter(todo => !todo.complete).length;
    },
    anyRemaining() {
      return this.remaining != 0;
    },
    todosFiltered() {
      if (this.filter == "all") {
        return this.todos;
      } else if (this.filter == "active") {
        return this.todos.filter(todo => !todo.complete);
      } else if (this.filter == "completed") {
        return this.todos.filter(todo => todo.complete);
      }

      return this.todos;
    },
    ShowClearCompletedButton() {
      return this.todos.filter(todo => todo.complete > 0).length;
    }
  }
};
</script>
<style>
@import url("https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.min.css");

.todo-input {
  width: 100%;
  padding: 10px 18px;
  font-size: 18px;
  margin-bottom: 16px;
  /* 
  &:focus {
    outline: 0;
  } */
}

.todo-item {
  margin-bottom: 12px;
  /* margin-left: 10px; */
  display: flex;
  align-items: center;
  justify-content: space-between;
  animation-duration: 0.3s;
}

.remove-item {
  cursor: pointer;
  margin-left: 14px;
}

.todo-item-left {
  display: flex;
  align-items: center;
}
.todo-item-label {
  padding: 10px;
  border: 1px solid white;
  margin-left: 12px;
}
.todo-item-edit {
  font-size: 24px;
  color: #2c3e50;
  margin-left: 12px;
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc; /* override defaults */
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  /* &:focus {
      outline: none;
    } */
}
.completed {
  text-decoration: line-through;
  color: grey;
}
.extra-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 16px;
  border-top: 1px solid lightgrey;
  padding-top: 14px;
  margin-bottom: 14px;
}
button {
  font-size: 14px;
  background-color: white;
  appearance: none;
  /* &:hover {
    background: lightgreen;
  }
  &:focus {
    outline: none;
  } */
}
.active {
  background: lightgreen;
}
/* CSS Transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>