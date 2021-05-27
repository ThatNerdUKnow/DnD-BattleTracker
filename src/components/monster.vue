<template>
    <div class="card m-3">
    <div class="card-header">
        <strong>{{monster.name}}</strong> <br> Source: <div class="badge bg-primary">{{monster.source}}</div>
    </div>
        
       
        <div class="stats card-body">
             HP: {{monster.hp}} <br>
        Armor Class: {{monster.ac}} <br>
        STR: {{monster.str}} <br>
        DEX: {{monster.dex}} <br>
        CON: {{monster.con}} <br>
        INT: {{monster.int}} <br>
        WIS: {{monster.wis}} <br>
        CHA: {{monster.cha}} <br>
        </div>

    </div>
</template>
<script>


export default {
    name: "monster",
    props:{
        monster: Object
    }
}
</script>
<style scoped>

</style>
