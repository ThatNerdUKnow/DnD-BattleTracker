<template>
  <div class="bg-light h-100">
    <h2>Encounter</h2>
    <div>
      <strong>XP: {{ totalXP }} X Multiplier ({{ multiplier }}) = ({{totalXP*multiplier}})</strong>
    </div>
    <div id="encounter" class="">
      <div class="h-100 overflow-auto row">
        <div class="col-lg-6" v-for="monster in monsters" :key="monster.n">
          <monster :monster="monster" @remove="remove($event)"></monster>
        </div>
      </div>
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
      console.log(num);
      const multiplier = xpMultiplier(num);
      console.log(multiplier);
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
