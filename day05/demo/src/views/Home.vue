<template>
  <div class="home">
    <Child :title="title" @some="some"></Child>
    <br>
    <Input />
    <List></List>
  </div>
</template>

<script>
// @ is an alias to /src
import Child from "../components/Child"
import Input from "../components/Input"
import List from "../components/List"

export default {
  name: 'home',
  components: {
    Child,
    Input,
    List
  },
  data(){
    return {
      title:"这是父组件的数据"
    }
  },
  methods:{
    some(con){
      console.log(con)
    }
  }
}
</script>
