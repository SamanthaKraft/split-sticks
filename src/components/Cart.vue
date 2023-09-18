
<template>
    <div class="cart-icon" @click="toggleDropdown">
        <i class="fas fa-shopping-cart"></i>
    </div>
    <div ref="clickOutsideRef" v-if="visible" :class="['cart-dropdown', { 'show-content': visible }]">
        <div class="cart-header">
            <h3>Your Cart</h3>
        </div>
        <li class="cart-item" v-for="item in cartList">

            <span class="item-name">{{item.name }}</span>
            <span class="item-price">{{ item.price }}</span>
            <button @click="deleteItem(item)"><i class="fa fa-trash"></i></button>
            <div v-if="item.purchaseSplit===0"><span>Split Item:Charged Later</span></div>
        </li>
        <div class="cart-footer">
            <button :disabled="cartList.length<1" class="checkout-btn" @click="checkout">Checkout</button>
        </div>
        
    </div>
</template>

<script>

    export default{
        props:{
            cartList:[],
            forceOpen:false
        },
        data(){
            return{
                visible:false,
                iconClicked:false
            }
        },
        methods:{
            deleteItem(item){
                this.$emit("deleteItem", item);
                this.iconClicked=true;
            },
            checkout(){
                this.$emit("checkout");
            },
            toggleDropdown(){
                this.visible=!this.visible;
                this.iconClicked=true;
                this.$emit("update:forceOpen", this.visible);
            },
            handleClickEvent(e){
                //clicked anywhere
                //don't close on first click (which tech outside container)
                if(this.iconClicked){
                    this.iconClicked=false;
                    //return without closing
                    return;
                }
                if (this.$refs.clickOutsideRef && !this.$refs.clickOutsideRef.contains(e.target)) {

                    //controls own state and lets parent know about changes
                    this.visible=false;
                    this.$emit("update:forceOpen", this.visible);
                }
            }
        },
        watch:{
            forceOpen(open){
                if(open){
                    this.visible=true;
                    this.iconClicked=true;
                }
            }
        },
        mounted(){
            document.addEventListener("click",this.handleClickEvent);
        },
        beforeDestroy(){
            document.removeEventListener("click",this.handleClickEvent);
        }
    }

</script>

<style scoped>
.cart-icon{
    position:absolute;
    top:0;
    right:20px;
    height: 40px;
    width: 40px;
    cursor: pointer;
}
.cart-dropdown{
    position:absolute;
    top:50px;
    right:100px;
    display:flex;
    flex-flow:column;
    min-height: 500px;
    width:250px;
    overflow-y: auto;
    background:var(--off-white);
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1); 
    border: 1px solid #e0e0e0; 
    border-radius: 10px;
    z-index: 10;
    
}
.show-content {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.5s ease-out;
}
.cart-header {
    padding: 10px 15px;
    background-color: #f5f5f5;
    border-bottom: 1px solid #ccc;
}
.cart-item {
    border-bottom: solid grey 1px;
    list-style-type: none;
    padding: 0;
    margin: 0;
}

.cart-item li {
    display: flex;
    justify-content: space-between;
    padding: 10px 15px;
    border-bottom: 1px solid #f5f5f5;
}

.item-name {
    font-weight: bold;
}

.item-price {
    color: #555;
}

.cart-footer {
    padding: 10px 15px;
    background-color: #f5f5f5;
    border-top: 1px solid #ccc;
}

.checkout-btn {
    background-color: #007BFF;
    color: #ffffff;
    padding: 8px 15px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
}

.checkout-btn:hover {
    background-color: #0056b3;
}
.cart-item
button{
    cursor: pointer;
    padding:5px;
    border:none;
}
button:disabled {
    background-color: #e0e0e0;
    color: #999;
    cursor: not-allowed;
}

</style>