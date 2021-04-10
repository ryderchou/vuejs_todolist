 <template>
  <li>
    <template v-if="!edit">
      <div>
        <input type="checkbox" v-model="done" >{{todo.content}}
        <button @click="$emit('editThis')">編輯</button>
      </div>
    </template>
    <template v-else>
      <div>
        <input type="text" v-model="editContent"  v-focus="editContent">
        <button @click="$emit('editComplete',editContent)">完成</button>
        <button @click="$emit('editCancel')">取消</button>
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
      },
      editContent: ''
    }
  },
  mounted () {
    this.editContent = this.todo.content
    console.log(this.todo.content)
  },
  computed: {
    // content: {
    //   get () {
    //     return this.todo.content
    //   },
    //   set (value) {
    //     this.editContent = value
    //   }

    // },
    done: {
      get () {
        return this.todo.done
      },
      set (value) {
        this.$emit('check', value)
      }
    }

  }

  // mounted () {
  //   this.editingTodo.content = this.todo.content
  //   this.editingTodo.done = this.todo.done
  // }
}
</script>
