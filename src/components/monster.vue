<template>
    <div class="monster">
        {{monster.name}} <br>
        HP: {{monster.hp.average}} <br>
        <div class="stats">
        Armor Class: {{monster.ac[0].ac}} <br>
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
.monster{
    padding: 5px;
}
</style>
