<template>
  <div class='d-flex justify-content-between'>
    <div class="col">{{monster.name}}</div>
    <div class="col">CR: {{monster.cr}}</div>
      
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
