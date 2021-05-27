<template>
  <div id="app" class="bg-light p-lg-5 p-1">
    <span class="row">
      <sidebar class="" @addMonster="addMonster($event)" :monsters="monsters"></sidebar>
     
      <encounter
        id="encounter"
        class="col-lg-10"
        :monsters="encounter"
        @remove="remove($event)"
      ></encounter>
      <monster></monster>
    </span>
  </div>
</template>

<script>
const baseURL = "https://5e.tools/data/bestiary/";
const axios = require("axios");
import monster from "./components/monster.vue";
import sidebar from "./components/sidebar/sidebar.vue";
import encounter from "./components/encounter/encounter.vue";
import { v4 as uuid } from "uuid";

export default {
  name: "App",
  components: {
    monster,
    sidebar,
    encounter,
  },
  data: function () {
    return {
      monsters: [],
      encounter: [],
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
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  max-height: 100vh;
}

#encounter {
  
}
</style>
