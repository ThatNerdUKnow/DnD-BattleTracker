<template>
  <div class='d-flex justify-content-between'>
      {{monster.name}}
      <div @click="add()" class='btn btn-outline-success'>Add</div>
  </div>
</template>
<script>
export default {
  name: "minimonster",
  props: {
    monster: Object,
  },
  methods:{
      add(){
          this.$emit("add",this.monster)
      }
  }
};
</script>
