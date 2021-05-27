<template>
  <div id="app">
    <span class='row'>
    <sidebar :monsters="monsters"></sidebar>
    <div class='row row-cols-xl-2 col-lg-8'>
    <div v-for="monster in monsters" :key="monster.id">
      <monster :monster="monster"></monster>
    </div>
    
    </div>
    </span>
  </div>
</template>

<script>

const baseURL = "https://5e.tools/data/bestiary/"
const axios = require('axios')
import monster from './components/monster.vue'
import sidebar from './components/sidebar/sidebar.vue'
import {v4 as uuid} from 'uuid'


export default {
  name: 'App',
  components: {
    monster,
    sidebar
  },
  data: function(){
    return {
      monsters: [],
    }
  },
  async mounted() {
    var totalUrl = baseURL + "index.json"
    await axios.get(totalUrl).then(res=>{
      Object.entries(res.data).forEach(data=>{
        axios.get(baseURL + data[1]).then(res=>{
          res.data.monster.forEach(monster=>{
            monster.id = uuid()
            try{
            if(monster.hp.average && monster.ac[0])
            {
            this.monsters.push(monster)
            }
            else
            {
              console.log(monster.name,monster.source)
            }
            }
            catch(err)
            {
              console.log(monster.name, monster.source)
            }
          })
        })
      })
    })
  }
  

}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  max-height: 100vh;
}
</style>
