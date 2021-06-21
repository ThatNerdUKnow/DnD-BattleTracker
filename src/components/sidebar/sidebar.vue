<template>
<div class=" g-0">
  <form @submit.prevent class="">
        <input @blur="toggleSearch(false)" @focus="toggleSearch(true)" type="text" class="form-control" placeholder="Search for a monster 🔎" v-model="searchTerm">
    </form>
  <div v-if="showSearch" @mouseout="resultsToggle(false,$event)" @mouseover="resultsToggle(true,$event)" id="content" class="w-100 overflow-auto no-gutter">
    
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
          searchTerm: "",
         searchFocus: false,
         resultsFocus: false
      }
  },
  props: {
    monsters: Array,
  },
  components: {
    minimonster,
  },
  computed:{
    showSearch(){
      if(this.searchFocus || this.resultsFocus)
      {return true}
      else
      {return false}
    }
  },
  methods: {
    addMonster(data) {
      this.$emit("addMonster", data);
    },
    toggleSearch(toggle)
    {
      this.searchFocus = toggle
    },
    resultsToggle(toggle,event)
    {
      if(event.type== "mouseout")
      {
      var parent = document.getElementById('content')
      
      if(parent.contains(event.relatedTarget))
      {
        
        return
      }
      }
      this.resultsFocus = toggle
    }
    
  },
};
</script>
<style scoped>
#content {
  position: relative;
  max-height: 25vh;
  z-index: 5;
  
}
</style>
