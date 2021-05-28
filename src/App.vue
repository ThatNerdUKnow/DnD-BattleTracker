<template>
  <div id="app" class="bg-light p-3">
    
    <span class="row">
      
      <sidebar v-if="sidebarVisible" class="" @addMonster="addMonster($event)" :monsters="monsters"></sidebar>
     
      <encounter
        id="encounter"
        class="col-xl-9"
        :monsters="encounter"
        @remove="remove($event)"
      ></encounter>
    </span>
  </div>
</template>

<script>
const baseURL = "https://5e.tools/data/bestiary/";
const axios = require("axios");

import sidebar from "./components/sidebar/sidebar.vue";
import encounter from "./components/encounter/encounter.vue";
import { v4 as uuid } from "uuid";

export default {
  name: "App",
  components: {
    sidebar,
    encounter,
  },
  data: function () {
    return {
      monsters: [],
      encounter: [],
      sidebarVisible: true
    };
  },
  methods: {
    addMonster(data) {
      data.n = uuid();
      console.log(data.n)
      this.encounter.push({...data});
    },
    remove(data) {
      this.encounter = this.encounter.filter((monster) => {
       return  monster.n != data;
        
      });
    },
    toggleSidebar(){
      this.sidebarVisible = !this.sidebarVisible;
    }
  },
  async mounted() {
    var totalUrl = baseURL + "index.json";
    await axios.get(totalUrl).then((res) => {
      Object.entries(res.data).forEach((data) => {
        axios.get(baseURL + data[1]).then((res) => {
          res.data.monster.forEach((monster) => {
            monster.id = uuid();
            try {
              if (monster.hp.average && monster.ac[0]) {
                this.monsters.push(monster);
              } else {
                console.log(
                  monster.name,
                  monster.source,
                  monster.hp,
                  monster.ac
                );
              }
            } catch (err) {
              console.log(monster.name, monster.source);
            }
          });
        });
      });
    });
  },
};
</script>

<style>
@import url('http://fonts.cdnfonts.com/css/vecna');


#app {
  font-family: Vecna, Helvetica, Arial, sans-serif;
  font-weight: 400;
  font-size: 16pt;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  max-height: 100vh;
}




</style>
