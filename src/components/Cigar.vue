<script>

export default {

  props: {
    cigar: Object
  },
  data() {
    return {
      hovered: false
    };
  },
  methods: {
      selectCigar() {
      this.$emit('selected-cigar', this.cigar);
    }
  }
}
</script>

<template>
  <div @mouseenter="hovered=true" @mouseleave="hovered=false" @click="selectCigar" :class="[{ overlay: hovered }, 'item-container']">
    <div class="split-prompt" v-if="hovered">Split This Item with Someone!</div>
    <h3>{{ cigar.name }}</h3>
    <p>Price: {{ cigar.price }}</p>
    <div class="cigar-img"><img :src="cigar.img" alt="Cigar Image"></div>
    <p>Purchasers: {{ cigar.purchasers.join(', ') }}</p>
  </div>
</template>

<style scoped>
.item-container{
  position: relative;
  padding:5px;
  flex-basis: 32%;
  height: 100%; 
  box-sizing: border-box; 
  text-align: center; 
  line-height: 50px;
  padding: 10px; 
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1); 
  border: 1px solid #e0e0e0;
  border-radius: 10px;
}
.overlay{
  background: #979797;
  color:gray;
  cursor:pointer;
  z-index:5;
}
.split-prompt{
  position: absolute;
  color:white;
  background-color: var(--cigar-brown);
  height: 25%;
  top: 40%;
  left: 0;
  right: 0;
  bottom: 0;
  justify-content: center;
  align-items: center;
  display:flex;
  z-index: 5;
}
.cigar-img img{
  width:200px;
  height: 200px;
  position: relative;
  z-index:1;
}
@media (min-width: 1024px) {
}
</style>
