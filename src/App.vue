<!-- App.vue -->
<template>

  <div>
    <Cart v-model:cartList="cartItems" @deleteItem="removeFromList" @checkout="updateInventory" v-model:forceOpen="openCart"/>
    <CigarList :cigars="cigarList" @selected-cigar="selectCigar"/>
    <Popup v-model:poppedUp="popupPurchase" :item="selectedItem" @cart-item="addToCart" :dynamicComponent="countryComp"></Popup>
  </div>
  
</template>

<script>
//import all components
import CigarList from './components/CigarList.vue';
import Cart from '/components/Cart.vue';
import Popup from '/components/PurchasePopup.vue';
import Country from "/components/Country.vue"
import { Cigar } from './Models.js';
import { User } from './Models.js';

export default {
  name: 'App',
  components: {
    CigarList,
    Popup,
    Cart,
    Country
  },
  data() {
    return {
      cigarList: [

      ],
      popupPurchase:false,
      selectedItem:Cigar,
      cartItems: [], 
      myAccount:new User("23","Sam",this.cartItems),
      showCart:false,
      openCart:false,
      countryComp:Country
    }
  },
  watch:{

  },
  methods:{
    selectCigar(item){
        setTimeout(() => {
        this.popupPurchase = true;
        this.selectedItem = item;
      }, 0);
    },
    addToCart(item){
      if(this.cartItems.findIndex(it =>it.id ===item.id)<0){
        this.cartItems.push(item);
        this.openCart=true;
      }else{
        alert("you already added "+item.name+" to your cart");
      }

    },
    removeFromList(item){
      let index = this.cartItems.findIndex(cartItem => cartItem.id === item.id);
      if (index > -1) {item
          this.cartItems.splice(index, 1);
      }
    },
    updateInventory(){
      //in a production version, this would update the inventory on the backend, probably 1 cigar per call
      this.cartItems.forEach((item)=>{
        let cigar = this.cigarList.find(c=>c.id===item.id)
        if(cigar.purchasers.length>0){cigar.purchasers.splice(0, this.cartItems.length);}
        else{
          cigar.purchasers.push(this.myAccount.name);
        }
      });
      //splice instead of assign to new empty array, in case non-vue code refs it
      this.cartItems.splice(0, this.cartItems.length);
    }
  },

  async created() {
    try {
      const response = await fetch('/data.json');
      const data = await response.json();

      if (!data) {
            throw new Error("Data does not exist or is empty");
        }
      this.cigarList = data.map(item => new Cigar(item.id, item.name,  item.purchasers, item.price, item.img, item.country));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
}
</script>
<style scoped>
</style>
