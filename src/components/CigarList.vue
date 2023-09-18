<template>
  <div class="">
    <h2>Our Inventory</h2>
    <div class="inventory-wrap" style="flex-wrap:wrap;">

      <Cigar 
        v-for="cigar in cigars"
        :key="cigar.id"
        :cigar="cigar"
        @selected-cigar="selectCigar"
      />
    </div>
  </div>
  </template>
  
  <script>
  import Cigar from './Cigar.vue';
  
  export default {
    components: {
      Cigar
    },
    props: {
      cigars: Array
    },
    methods:{
      selectCigar(payload){
        this.$emit('selected-cigar',payload);
      }
    }
  }
  </script>
  <style scoped>
  .inventory-wrap{
    display:flex;
    flex-wrap: wrap;
    gap:10px;
    flex-flow:row;
    max-width: 100%; 
    max-height: 100%;
    overflow: auto; 
   justify-content: center;
  padding: 10px; 


  }

    
  h2{
    color:brown;
    text-align: center;
  }
</style>