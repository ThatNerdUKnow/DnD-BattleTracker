<template>
  <div id="app" class="py-3 container">
    <!--
    <div id="wrapper">
    <div @click="toggleSidebar()" class="btn btn-primary">Show Sidebar</div>
    <div class="btn btn-primary">Add Player</div>
    </div>-->
    <span class="row">
      
      <sidebar v-if="sidebarVisible" class="col-12 pb-3" @addMonster="addMonster($event)" :monsters="monsters"></sidebar>
     
     
      <encounter
        id="encounter"
        class="col-12 p-3"
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
              if(monster.hp)
              {
                this.monsters.push(monster);
              }
                        
            } catch (err) {
              console.log(err,monster)
            }
          });
        });
      });
    });
  },
};
</script>

<style>
@import url('https://fonts.cdnfonts.com/css/vecna');


#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  
  
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  max-height: 100vh;
}

h1,h2,h3,h4,h5,h6,th,td{
  font-family: Vecna,sans-serif;
  font-size: 16pt;
}

#wrapper
{
  position:absolute;
  left: 85vw;
  top: 95vh;
  z-index: 50;
}

</style>
