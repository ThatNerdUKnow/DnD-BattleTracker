<template>
  <div class="card m-3">
    <div class="card-header">
      <strong>{{ monster.name }}</strong> <br />
      Source:
      <div class="badge bg-primary">{{ monster.source }}</div>
    </div>

    <div class="stats card-body">
      HP: {{ this.HP }}
      DMG: {{damage}}

      <form>
        <div class="btn btn-danger" @click="hurt()">Hurt</div>
        <input
          type="number"
          min="0"
          :value="damage"
          :max="monster.hp.average"
        />
        <div class="btn btn-success" @click="heal()">Heal</div>
      </form>

      <div class="progress p-0">
        <div
          class="progress-bar progress-bar-striped bg-danger"
          role="progressbar"
          :style="'width: ' + 100 * (this.HP / monster.hp.average) + '%'"
        ></div>
      </div>

      <br />
      Armor Class: {{ monster.ac[0].ac }} <br />
      STR: {{ monster.str }} <br />
      DEX: {{ monster.dex }} <br />
      CON: {{ monster.con }} <br />
      INT: {{ monster.int }} <br />
      WIS: {{ monster.wis }} <br />
      CHA: {{ monster.cha }} <br />
    </div>
  </div>
</template>
<script>
export default {
  name: "monster",
  props: {
    monster: Object,
    damage: Number
  },
  data() {
    return {
      HP: this.monster.hp.average,
      
    };
  },
  methods: {
    hurt() {},
    heal() {
        console.log(this.HP)
        console.log(this.damage)
        console.log(this.HP + this.damage)
      this.HP = this.HP + this.damage;
    },
  },
};
</script>
<style scoped>
</style>
