 <template>
  <li>
    <template v-if="!edit">
      <div>
        <input type="checkbox" v-model="done" >{{content}}
      </div>
    </template>
    <template v-else>
      <div>
        <input type="text" v-model="content"  >
      </div>
    </template>
  </li>
</template>

<script>
export default {
  props: {
    todo: {
      type: Object,
      required: true
    },
    edit: {
      type: Boolean,
      default: false
    }
  },
  setup () {
    return {
      editingTodo: {
        content: '',
        done: false
      }
    }
  },
  computed: {
    content: {
      get () {
        return this.todo.content
      },
      set (value) {
      }

    },
    done: {
      get () {
        return this.todo.done
      },
      set (value) {
        this.$emit('check', value)
      }
    }

  },

  mounted () {
    this.editingTodo.content = this.todo.content
    this.editingTodo.done = this.todo.done
  }
}
</script>
