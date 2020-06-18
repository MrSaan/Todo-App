import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    filter: "all",
    todos: [{
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
  },
  getters: {
    filter(state) {
      return state.filter
    },
    remaining(state) {
      return state.todos.filter(todo => !todo.complete).length;
    },
    anyRemaining(state, getters) {
      return getters.remaining != 0;
    },
    todosFiltered(state) {
      if (state.filter == "all") {
        return state.todos;
      } else if (state.filter == "active") {
        return state.todos.filter(todo => !todo.complete);
      } else if (state.filter == "completed") {
        return state.todos.filter(todo => todo.complete);
      }

      return state.todos;
    },
    ShowClearCompletedButton(state) {
      return state.todos.filter(todo => todo.complete > 0).length;
    }
  },
  mutations: {
    addTodo(state, todo) {
      state.todos.push({
        id: todo.id,
        title: todo.title,
        complete: false,
        editing: false
      })
    },
    removeTodo(state, id) {
      const index = state.todos.findIndex(item => item.id == id);
      state.todos.splice(index, 1);
    },
    finishEdit(state, todo) {
      const index = state.todos.findIndex(
        item => item.id == todo.id
      );
      state.todos.splice(index, 1, {
        id: todo.id,
        title: todo.title,
        complete: todo.complete,
        editing: todo.editing
      });
    },
    allCheckTodos(state, checked) {
      state.todos.forEach(
        todo => (todo.complete = checked)
      );
    },
    updateFilter(state, filter) {
      state.filter = filter
    },
    clearCompleted(state) {
      state.todos = state.todos.filter(
        todo => !todo.complete
      );
    }
  },
  actions: {
    addTodo(context, todo) {
      context.commit('addTodo', todo)
    },
    removeTodo(context, id) {
      context.commit('removeTodo', id)
    },
    finishEdit(context, todo) {
      context.commit('finishEdit', todo)
    },
    allCheckTodos(context, checked) {
      context.commit('allCheckTodos', checked)
    },
    updateFilter(context, filter) {
      context.commit('updateFilter', filter)
    },
    clearCompleted(context) {
      context.commit('clearCompleted')
    }
  }
})
