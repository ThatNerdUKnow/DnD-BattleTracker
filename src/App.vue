<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    
  </div>
</template>

<script>

const baseURL = "https://5e.tools/data/bestiary/"
const axios = require('axios')

export default {
  name: 'App',
  components: {
    
  },
  data: function(){
    return {
      test: "Test",
      monsters: []
    }
  },
  async mounted() {
    var totalUrl = baseURL + "index.json"
    await axios.get(totalUrl).then(res=>{
      Object.entries(res.data).forEach(data=>{
        axios.get(baseURL + data[1]).then(res=>{
          res.data.monster.forEach(monster=>{
            this.monsters.push(monster)
            console.log(monster.name)
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
