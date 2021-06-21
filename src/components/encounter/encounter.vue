<template>
  <div class="bg-light h-100">
    <h2>Encounter</h2>
    <div>
      <h4
        >XP: {{ totalXP }}x({{ multiplier }}) = ({{
          totalXP * multiplier
        }}XP)</h4
      >
    </div>
    <div id="encounter" class="">
      <!--Mosaic experiment-->
      <div class="h-100 overflow-auto row p-2">
        <div class="col-lg" v-for="col in chunk" :key="chunk.indexOf(col)">
          <monster :monster="monster" v-for="monster in col" :key="monster.n" @remove="remove($event)"></monster>
          
        </div>
      </div>
<!--
      <div class="h-100 overflow-auto row">
        <div class="col-lg-6" v-for="monster in monsters" :key="monster.n">
          <monster :monster="monster" @remove="remove($event)"></monster>
        </div>
      </div>-->
    </div>
  </div>
</template>
<script>
import monster from "../monster.vue";
const tools = require("5eutils");
import { xpChart, xpMultiplier } from "../../utils/utils.js";


export default {
  name: "encounter",
  components: {
    monster,
  },
  props: {
    monsters: Array,
  },
  methods: {
    remove(data) {
      this.$emit("remove", data);
    },
  },
  computed: {
    combatRating: function () {
      var acc = 0;
      this.monsters.forEach((monster) => {
        acc = acc + tools.Parser.crToNumber(monster.cr);
      });
      return acc;
    },
    chunk: function () {
      const mIndex = Math.ceil(this.monsters.length/2);
      const mCopy = [...this.monsters];
      var chunk = [];
      chunk.push(mCopy.splice(0,mIndex))
      chunk.push(mCopy.splice(-mIndex))
      return chunk
    },
    totalXP: function () {
      var acc = 0;
      this.monsters.forEach((monster) => {
        if (monster.cr) {
          var monsterXP = xpChart[monster.cr];

          acc = acc + monsterXP;
        }
      });
      return acc;
    },
    multiplier: function () {
      var num = this.monsters.length;

      const multiplier = xpMultiplier(num);

      return multiplier;
    },
  },
};
</script>
<style scoped>
#encounter {
  height: 90vh;
}
</style>
