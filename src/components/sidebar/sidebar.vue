<template>
<div class="col-md-2">
  <form class="">
        <input type="text" class="form-control" placeholder="Search for a monster 🔎" v-model="searchTerm">
    </form>
  <div id="content" class=" overflow-auto no-gutters">
    
    <ul v-for="monster in monsters" :key="monster.id" class="list-group">
      <li v-if="monster.name.toLowerCase().includes(searchTerm.toLowerCase())" class="list-group-item">
        <minimonster  @add="addMonster($event)" :monster="monster"></minimonster>
      </li>
    </ul>
  </div>
</div>
</template>
<script>
import minimonster from "./miniMonster.vue";

export default {
  name: "sidebar",
  data(){
      return {
          searchTerm: ""
      }
  },
  props: {
    monsters: Array,
  },
  components: {
    minimonster,
  },
  methods: {
    addMonster(data) {
      this.$emit("addMonster", data);
    },
  },
};
</script>
<style scoped>
#content {
  max-height: 100vh;
}
</style>
