<template>
  <div id="app">
    <div class='row row-cols-xl-4'>
    <div v-for="monster in monsters" :key="monster.id">
      <monster :monster="monster"></monster>
    </div>
    </div>
  </div>
</template>

<script>

const baseURL = "https://5e.tools/data/bestiary/"
const axios = require('axios')
import monster from './components/monster.vue'
import {v4 as uuid} from 'uuid'


export default {
  name: 'App',
  components: {
    monster
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
            this.monsters.push(monster)
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
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
