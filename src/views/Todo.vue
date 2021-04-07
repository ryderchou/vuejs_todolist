<template>
  <div class="todo">
    <h1>this is todo page</h1>
    <router-link to="/todo" replace>ALL</router-link>|
    <router-link to="/todo?filter=active" replace>ACTIVE</router-link>|
    <router-link :to="{ name: 'Todo', query: { filter: 'done' }}" replace>DONE</router-link>

    <p>show: {{filter}}</p>
    <div>{{list}}</div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      filter: 'all' // all,active,done
    }
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
        // check query
        this.filter = route.query.filter || 'all'
      }
    }
  }
}
</script>

<style scoped>
.todo a {
  color: black;
  text-decoration: none;
}
.todo .router-link-exact-active{
  color: green;
  font-weight: bold;
}
</style>
