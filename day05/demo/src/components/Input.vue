<template>
  <div>
      <input type="text" v-model="val"><button @click="add">add</button>
  </div>
</template>

<script>
export default {
    data(){
        return {
            val:""
        }
    },
    methods:{
        add(){
            this.$bus.$emit("add",this.val)
            this.val=""
        }
    }
}
</script>

<style>

</style>