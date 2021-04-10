import { createStore } from 'vuex'
import LocalStorage from '../modules/localStorage'

const STORE = new LocalStorage('todo-vue')
export default createStore({
  state: {
    // todos: [{ content: '123123', done: false }, { content: '456456', done: true }, { content: '789789', done: false }]
    todos: []
  },
  getters: {
    list (state) {
      return state.todos.map((todo, tid) => {
        return {
          tid,
          todo
        }
      })
    },
    filterList (state, getters) {
      return function (filter) {
        switch (filter) {
          case 'all':
            return getters.list
          case 'active':
            return getters.list.filter((todo) => !todo.todo.done)
          case 'done':
            return getters.list.filter((todo) => todo.todo.done)
          default:
            return []
        }
      }
    }
    // filterList:(state)=>(filter)=>{}   寫法相同
  },
  mutations: {
    SET_TODOS (state, todos) {
      state.todos = todos
    }
  },
  actions: {
    CREATE_TODO ({ commit }, { todo }) {
      // 1.POST  // axios.post()
      const todos = STORE.load()
      todos.push(todo)
      STORE.save(todos)
      // 2.寫入state commit mutation
      commit('SET_TODOS', todos)
      // 3.return
      return {
        tid: todos.length - 1,
        todo
      }
    },
    READ_TODOS ({ commit }) {
      // 1.讀取 or GET
      const todos = STORE.load()
      // 2.寫入state commit mutation
      commit('SET_TODOS', todos)
      // 3.return
      return { todos }
    },
    UPDATE_TODO ({ commit, state }, { tid, content }) {
      // UPDATE_TODO ({ commit }, { tid, content }) {
      // 1.PATCH   // axios.patch()
      if (state.todos[tid].content === content) { return }
      const todos = STORE.load()
      // todos.splice(tid, 1, todo)
      todos[tid].content = content
      STORE.save(todos)

      // 2.寫入state commit mutation
      commit('SET_TODOS', todos)
      // 3.return
      return {
        tid,
        todo: todos[tid]
        // todo:todos[tid]
      }
    },
    CHECK_TODO ({ commit }, { tid, done }) {
      // UPDATE_TODO ({ commit }, { tid, content }) {
      // 1.PATCH   // axios.patch()
      const todos = STORE.load()
      todos[tid].done = done
      // todos[tid].content=content
      STORE.save(todos)

      // 2.寫入state commit mutation
      commit('SET_TODOS', todos)
      // 3.return
      return {
        tid,
        todo: todos[tid]
      }
    },

    DELETE_TODO ({ commit }, { tid }) {
      // 1.DELETE   // axios.delete()
      const todos = STORE.load()
      const todo = todos.splice(tid, 1)[0]
      STORE.save(todos)

      // 2.寫入state commit mutation
      commit('SET_TODOS', todos)
      // 3.return
      return { tid: null, todo }
    },
    // 全部刪除
    CLEAR_TODOS ({ commit }) {
      const todos = []
      STORE.save(todos)
      // 2.寫入state commit mutation
      commit('SET_TODOS', todos)
      // 3.return
      return { todos }
    }
  }
  // modules: {
  // }
})
