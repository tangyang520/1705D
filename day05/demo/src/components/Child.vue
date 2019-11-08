<template>
    <div class="child">
        子组件 === {{title}} <button @click="$emit('some',con)">子向父传</button>
    </div>
</template>

<script>
export default {
    props:["title"],
    data(){
        return {
            con:"这是子组件的数据"
        }
    },
    methods:{
        
    }
}
</script>

<style>

</style>