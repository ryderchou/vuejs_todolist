<template>
  <div class="todo">
    <h1>this is todo page</h1>
    <router-link to="/todo" replace>ALL</router-link>|
    <router-link to="/todo?filter=active" replace>ACTIVE</router-link>|
    <router-link :to="{ name: 'Todo', query: { filter: 'done' }}" replace>DONE</router-link>
    <!-- <p>show: {{filter}}</p>
    <div>{{list}}</div>-->
    <ul>
      <!-- <li v-for="item of list" :key='item.tid' >
        <template v-if="edit!==item.tid">
          <div>
            <input type="checkbox" v-model="item.todo.done">{{item.todo.content}}
          </div>
        </template>
         <template v-else>
          <div>
            <input type="text" v-model="item.todo.content">
          </div>
        </template>
      </li>-->
      <TodoItem
        v-for="item of list"
        :key="item.tid"
        :todo="item.todo"
        :edit="item.tid===edit"
        @check="value=>checkHandler(item.tid,value)"
        @editThis="edit=item.tid"
        @editComplete="value=>editCompleteHandler(item.tid,value)"
         @editCancel="edit=null "
      />
    </ul>
  </div>
</template>
<script>
import TodoItem from '../components/TodoItem'
export default {
  data () {
    return {
      filter: 'all', // all,active,done
      edit: null
    }
  },
  mounted () {
    this.$store.dispatch('READ_TODOS')
  },
  computed: {
    list () {
      return this.$store.getters.filterList(this.filter)
    }
  },
  watch: {
    // $route: function (route) {
    //  //check query
    //   this.filter = route.query.filter || 'all'
    // }
    $route: {
      immediate: true,
      handler: function (route) {
        this.edit = null
        // check query
        this.filter = route.query.filter || 'all'
      }
    }
  },
  methods: {
    checkHandler (tid, done) {
      console.log(tid, done)
      this.$store.dispatch('CHECK_TODO', { tid, done })
    },
    editCompleteHandler (tid, content) {
      this.edit = null
      console.log(tid, content)
      this.$store.dispatch('UPDATE_TODO', { tid, content })
    }
  },
  components: {
    TodoItem
  }
}
</script>

<style scoped>
.todo a {
  color: black;
  text-decoration: none;
}
.todo .router-link-exact-active {
  color: green;
  font-weight: bold;
}
</style>
