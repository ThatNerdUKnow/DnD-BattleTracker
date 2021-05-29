<template>
  <div :id="monster.n" class="animate__animated animate__fadeInUp">
    <div class="card m-3 shadow-lg">
      <span class="card-header">
        <div class="row">
          <img :src="image" class="monsterToken img-fluid" />
          <!--<img id="shield" src="@/assets/shield.png">-->
          <div class="col-lg-6">
            <h2>{{ monster.name }}</h2>
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
            <form class="my-2">
              <div class="">
                <div class="input-group">
                  <div class="input-group-prepend">
                    <span
                      class="btn btn-outline-danger mx-1 col"
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
                    <div class="btn btn-outline-success mx-1" @click="heal()">
                      Heal
                    </div>
                  </div>
                </div>
              </div>
            </form>

            <span class="btn btn-outline-danger btn-sm mx-2" @click="remove()"
              >Remove</span
            >
            Source:
            <div class="badge bg-primary">{{ monster.source }}</div>
          </div>
          <div v-if="monster.ac[0].ac" class="col-lg-6 my-3">
            <span id="armorClass" class="h3 p-3">
              <span class="">
                {{ monster.ac[0].ac }}
              </span>
            </span>
          </div>
        </div>
      </span>

      <div class="stats card-body float-left">
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
            <td>{{ monster.str }}</td>
            <td>{{ monster.dex }}</td>
            <td>{{ monster.con }}</td>
            <td>{{ monster.int }}</td>
            <td>{{ monster.wis }}</td>
            <td>{{ monster.cha }}</td>
          </tr>
        </table>

        <div v-if="monster.skill">
          Skills:
          <span v-for="skill in Object.entries(monster.skill)" :key="skill[0]"
            ><span class="m-1 badge bg-primary"
              >{{ skill[0] }} {{ skill[1] }}</span
            ></span
          >
        </div>
        <div v-if="monster.senses">
          Senses:
          <span v-for="sense in monster.senses" :key="sense"
            ><span class="m-1 badge bg-primary">{{ sense }}</span></span
          >
        </div>
        <div v-if="monster.languages">
          Languages:
          <span v-for="language in monster.languages" :key="language"
            ><span class="mx-1 badge bg-primary">{{ language }} </span></span
          >
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
      </div>
    </div>
  </div>
</template>
<script>

import {attackTypes} from '../utils/utils'
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
        regex: /{@[^{@}]+}/g
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
    parse(entry){
      
      var tags = [...entry.matchAll(this.regex)]
      var parsed = entry;
      if(tags)
      {
        tags.forEach(tag=>{
          var input = tag["0"];
          input = input.replace(/{|}/g,"")
          var args = input.split(" ")
          
          const command = args[0]
          args.shift()
          var output = "";
          switch(command){
            case '@hit':
              output = "+ " + args.join()
            break;
            case "@atk":
              
              output = attackTypes[args.join("")]
              break;
            default:
              output = args.join(" ")
          }

          
          parsed = parsed.replace(tag,output)
        })
      }
      
      return parsed;
    }
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


</style>
