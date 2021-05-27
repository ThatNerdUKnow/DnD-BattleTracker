<template>
    <div >
        <h2>Encounter</h2> 
        <div class="container-fluid">
            
        <div class="row">
        <div class='col-lg-4' v-for="monster in monsters" :key="monster.n">
            <monster :monster="monster" @remove="remove($event)"></monster>
        </div>
        </div>
        </div>
    </div>
</template>
<script>
import monster from '../monster.vue'
export default {
    name: "encounter",
    components: {
        monster
    },
    props:{
        monsters: Array,
    },
    methods:{
        remove(data)
        {
            console.log("test")
            this.$emit("remove",data)
        }
    },
    computed:{
        combatRating: function(){
            var acc = 0;
            this.monsters.forEach(monster=>{
                console.log(monster.cr)
                acc = acc+ monster.cr
            })
            return acc;
        }
    }
}
</script>
