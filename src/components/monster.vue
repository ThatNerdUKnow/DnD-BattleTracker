<template>
  <div :id="monster.n" data-class="animate__animated animate__fadeInUp" :class="{KO: this.KO}" >
    <div class="card m-m-3 mb-3 shadow-lg">
      <span class="card-header">
        <div class="row">
          <img alt="" :src="image" class="monsterToken img-fluid" />
          <!--<img id="shield" src="@/assets/shield.png">-->
          <div class="col-xl-6">
            <h2>{{ monster.name }}</h2>
            
            
            <div v-if="monster.hp.average">
              <strong>HP: {{ this.HP }} </strong>
              <!-- Progress Bar -->
              <div class="progress p-0 w-100">
                <div
                  class="progress-bar bg-danger"
                  role="progressbar"
                  :style="'width: ' + 100 * (this.HP / monster.hp.average) + '%'"
                ></div>
              </div>

              <!-- Form Controls -->
              <form @submit.prevent id="formControls" class="my-2">
                <div class="">
                  <div class="input-group">
                    <div class="input-group-prepend">
                      <span
                        class="btn btn-danger col"
                        @click="hurt()"
                        >Hurt</span
                      >
                    </div>
                    <input
                      class="form-control col-auto"
                      type="number"
                      min="0"
                      v-model="damage"
                      :max="monster.hp.average"
                    />
                    <div class="input-group-append">
                      <div
                        class="btn btn-success"
                        @click="heal()"
                      >
                        Heal
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
            <div v-if="monster.hp.special || monster.hp.lair">
              HP: {{monster.hp.special || monster.hp.lair}}
            </div>

            <span class="btn btn-outline-danger btn-sm mr-2" @click="remove()"
              >Remove</span
            >
            Source:
            <div class="badge bg-primary">{{ monster.source }}</div>
          </div>
          <div class="col-lg-6 my-3">
            <div @click="toggleStats()" class="btn btn-primary btn-sm mb-3">
              {{ showStats ? "Hide" : "Show" }} Stats
            </div>
            <br />
            <span v-if="armorClass" id="armorClass" class="h3 p-3">
              <span class="">
                {{ armorClass}}
              </span>
            </span>
          </div>
        </div>
      </span>

      <div
        v-if="showStats"
        class="stats card-body float-left animate__animated animate__fadeIn"
      >
        <!-- Stats -->
        <h4>Stats</h4>
        <table class="table">
          <thead>
            <th>STR</th>
            <th>DEX</th>
            <th>CON</th>
            <th>INT</th>
            <th>WIS</th>
            <th>CHA</th>
          </thead>
          <tr>
            <td>{{ monster.str }}({{this.modifiers.str >=0? "+" + this.modifiers.str:this.modifiers.str}})</td>
            <td>{{ monster.dex }}({{this.modifiers.dex >=0? "+" + this.modifiers.dex:this.modifiers.dex}})</td>
            <td>{{ monster.con }}({{this.modifiers.con >=0? "+" + this.modifiers.con:this.modifiers.con}})</td>
            <td>{{ monster.int }}({{this.modifiers.int >=0? "+" + this.modifiers.int:this.modifiers.int}})</td>
            <td>{{ monster.wis }}({{this.modifiers.wis >=0? "+" + this.modifiers.wis:this.modifiers.wis}})</td>
            <td>{{ monster.cha }}({{this.modifiers.cha >=0? "+" + this.modifiers.cha:this.modifiers.cha}})</td>
          </tr>
        </table>

        <div v-if="monster.skill">
          Skills:
          <span v-for="skill in Object.entries(monster.skill)" :key="skill[0]"
            ><span class="m-1 badge bg-info text-dark"
              >{{ skill[0] }} {{ skill[1] }}</span
            ></span
          >
        </div>
        <div v-if="monster.senses">
          Senses:
          <span v-for="sense in monster.senses" :key="sense"
            ><span class="m-1 badge bg-warning text-dark">{{ sense }}</span></span
          >
        </div>
        <div v-if="monster.languages">
          Languages:
          <span v-for="language in monster.languages" :key="language"
            ><span class="mx-1 badge bg-primary">{{ language }} </span></span
          >
        </div>

        <div v-if="monster.resist">
          Resistances:
          <span class="mx-1 badge bg-danger" v-for="resistance in monster.resist" :key="resistance">{{resistance}}</span>
          
        </div>

        <div v-if="monster.vulnerable">
          Vulnerabilities:
          <span class="mx-1 badge bg-success" v-for="vuln in monster.vulnerable" :key="vuln">{{vuln}}</span>
          
        </div>

        <div v-if="monster.trait">
          <hr />
          <h3>Traits:</h3>
          <div v-for="trait in monster.trait" :key="trait.name">
            <span class="badge bg-primary mx-1">{{ trait.name }}</span>
            <span v-for="entry in trait.entries" :key="entry" class="info">{{
              parse(entry)
            }}</span>
          </div>
        </div>

        <div v-if="monster.action">
          <hr />
          <h3>Actions</h3>
          <div v-for="action in monster.action" :key="action.name">
            <span class="badge bg-primary mx-1">{{ action.name }}</span>
            <span v-for="entry in action.entries" :key="entry" class="info">{{
              parse(entry)
            }}</span>
          </div>
        </div>

        <div v-if="monster.legendary">
          <hr />
          <h3>Legendary Actions</h3>
          <div v-for="action in monster.legendary" :key="action.name">
            <span class="badge bg-primary mx-1">{{ action.name }}</span>
            <span v-for="entry in action.entries" :key="entry" class="info">{{
              parse(entry)
            }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { attackTypes } from "../utils/utils";
export default {
  name: "monster",
  props: {
    monster: Object,
  },
  mounted(){
    console.log(this.monster)
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
      regex: /{@[^{@}]+}/g,
      showStats: false,
      armorClass: this.monster.ac[0].ac || this.monster.ac[0]
    };
  },
  computed: {
    modifiers: function () {
      var str = Math.floor((this.monster.str - 10) / 2);
      var dex = Math.floor((this.monster.dex - 10) / 2);
      var con = Math.floor((this.monster.con - 10) / 2);
      var int = Math.floor((this.monster.int - 10) / 2);
      var wis = Math.floor((this.monster.wis - 10) / 2);
      var cha = Math.floor((this.monster.cha - 10) / 2);

      return { str, dex, con, int, wis, cha };
    },
    KO: function(){
      return this.HP === 0
    }
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
    toggleStats() {
      this.showStats = !this.showStats;
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
    parse(entry) {
      var tags = [];
      try {
        tags = [...entry.matchAll(this.regex)];
      } catch (err) {
        console.log(err);
        console.log(entry);
        tags = [];
      }
      var parsed = entry;
      if (tags) {
        tags.forEach((tag) => {
          var input = tag["0"];
          input = input.replace(/{|}/g, "");
          var args = input.split(" ");

          const command = args[0];
          args.shift();
          var output = "";
          switch (command) {
            case "@hit":
              output = "+ " + args.join();
              break;
            case "@atk":
              output = attackTypes[args.join("")];
              break;
            default:
              output = args.join(" ");
          }

          parsed = parsed.replace(tag, output);
        });
      }

      return parsed;
    },
  },
};
</script>
<style scoped>
.monsterToken {
  width: 175px;
  height: auto;
  position: absolute;
  display: inline;
  left: 75%;
  top: -20px;
  z-index: 2;
}


#formControls{
  z-index: 3
}
#shield {
  width: 100px;
  left: 50%;
  position: absolute;
}
#armorClass {
  background-image: url("~@/assets/shield.png");
  background-repeat: no-repeat;
  background-size: cover;
}

.form-control
{
  z-index:5
}

.KO
{
  filter: grayscale(90%)
}
</style>
