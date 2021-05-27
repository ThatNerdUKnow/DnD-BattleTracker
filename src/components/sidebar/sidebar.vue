<template>
  <div id="content" class="col-md-2 h-100 overflow-auto no-gutters">
    <form class="">
        <input type="text" class="form-control" placeholder="Search for a monster 🔎" v-model="searchTerm">
    </form>
    <ul v-for="monster in monsters" :key="monster.id" class="list-group">
      <li v-if="monster.name.toLowerCase().includes(searchTerm.toLowerCase())" class="list-group-item">
        <minimonster  @add="addMonster($event)" :monster="monster"></minimonster>
      </li>
    </ul>
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
