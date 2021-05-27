<template>
  <div class="card m-3">
    <div class="card-header d-flex">
      <img :src="image" class="img-fluid col-1 d-inline" />
      <div class="d-inline">
        
      <strong>{{ monster.name }}</strong>

     

      HP: {{ this.HP }}

      <!-- Progress Bar -->
      <div class="progress">
        <div
          class="progress-bar bg-danger"
          role="progressbar"
          :style="'width: ' + 100 * (this.HP / monster.hp.average) + '%'"
        ></div>
      </div>
      </div>
      

      <br />
      Source:
      <div class="badge bg-primary">{{ monster.source }}</div>

       <div
        class="btn btn-outline-danger btn-sm mx-2 float-right"
        @click="remove()"
      >
        Remove
      </div>
    </div>

    <!-- Card Body-->
    <div class="stats card-body float-left">
      <!-- Form Controls -->
      <form class="my-2">
        <div class="btn btn-outline-danger" @click="hurt()">Hurt</div>
        <input
          class="form-control"
          type="number"
          min="0"
          v-model="damage"
          :max="monster.hp.average"
        />
        <div class="btn btn-outline-success" @click="heal()">Heal</div>
      </form>

      <br />

      <!-- Stats -->
      <div class="border border-secondary">
        <strong>Stats</strong> <br />
        Armor Class: {{ monster.ac[0].ac }} <br />
        STR: {{ monster.str }} <br />
        DEX: {{ monster.dex }} <br />
        CON: {{ monster.con }} <br />
        INT: {{ monster.int }} <br />
        WIS: {{ monster.wis }} <br />
        CHA: {{ monster.cha }} <br />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "monster",
  props: {
    monster: Object,
  },
  data() {
    return {
      HP: this.monster.hp.average,
      damage: 0,
      image:
        "https://5e.tools/img/" +
        this.monster.source +
        "/" +
        this.monster.name +
        ".png",
    };
  },
  methods: {
    hurt() {
      if (this.damage > this.HP) {
        this.HP = 0;
      } else {
        this.HP = this.HP - this.damage;
      }
      this.cleanup();
    },
    heal() {
      var diff = this.monster.hp.average - this.HP;
      if (this.damage > diff) {
        this.HP = this.monster.hp.average;
      } else {
        this.HP = this.HP + Number(this.damage);
      }

      this.cleanup();
    },
    cleanup() {
      this.damage = 0;
    },
    remove() {
      this.$emit("remove", this.monster.n);
    },
  },
};
</script>
<style scoped>
</style>
