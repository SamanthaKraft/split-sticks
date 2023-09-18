<template>
  <div class="">
    <h2>Our Inventory</h2>
    <div class="inventory-wrap" style="flex-wrap:wrap;">
<!-- really simple container that could be placed on mutiple apps (reusablitly). easier to style collab and read IMO. 
  Faster if Cigar component is only thing re-rendering, don't need to re-render entire list  -->
      <Cigar 
        v-for="cigar in cigars"
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
      selectCigar(cigar){
        this.$emit('selected-cigar',cigar);
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