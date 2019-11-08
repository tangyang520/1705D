<template>
    <div>
        <ul>
            <li v-for="(item,index) in list" :key="index">{{item}}</li>
        </ul>
    </div>
</template>

<script>
export default {
    data(){
        return {
            list:[]
        }
    },
    created(){
        // 订阅
        this.$bus.$on("add",(val)=>{
            this.list.push(val)
        })
    }
}   
</script>

<style>

</style>