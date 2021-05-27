<template>
    <div id='content' class="col-lg-4 h-100 overflow-auto">
        <div v-for="monster in monsters" :key="monster.id">
            <minimonster @add="addMonster($event)" :monster="monster"></minimonster>
        </div>
    </div>
</template>
<script>
import minimonster from './miniMonster.vue'

export default {
    name: "sidebar",
    props:{
        monsters: Array
    },
    components:{
        minimonster
    },
    methods:{
        addMonster(data){
            this.$emit('addMonster',data)
        }
    }
    
}
</script>
<style scoped>
#content
{
    max-height: 100vh;
    
}
</style>
