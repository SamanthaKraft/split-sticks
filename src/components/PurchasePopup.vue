<template>
    <div class="popup-container" v-if="poppedUp">
        <div ref="clickOutsideRef" class="popup-body" >
            <p>{{ item.name }}</p>
            <p>{{ item.country }}</p>
            <span><component :country="item.country" :is="dynamicComponent"></component></span>
            <div class="cigar-img"><img :src="item.img" alt="Cigar Image"></div>
            <div v-if="item.purchaseSplit==0">
                <p>No one has decided to split this item yet</p>
                <p>Click on the Split button to buy half a box. You won't get charged until the other half has been bought by another user.</p>
            </div>
            <div v-else>
                <p>User {{ item.purchasers[0] }} wants to split this box!</p>
                <p>Click on the Purchase button to split this item with them. You will be charged and can pick up your item at our shop.</p>
            </div>
            <button class="purchase-btn" @click="addToCart">{{ item.purchaseSplit == 0?"Split":"Purchase" }}</button>
        </div>
    </div>
</template>
<script>

export default{
    components:{
    },
    props:{
        item:Object,
        poppedUp:Boolean,
        dynamicComponent:{}
    },
    data(){
        return{

        }
    },
    watch:{

    },
    methods:{
        handleClickOutside(e) {
            if (this.poppedUp==true && this.$refs.clickOutsideRef && !this.$refs.clickOutsideRef.contains(e.target)) {
                this.$emit('update:poppedUp', false);
            }
        },
        addToCart(){
            this.$emit('cart-item', this.item);
            this.$emit('update:poppedUp', false);
        }
    },
    mounted(){
    document.addEventListener('click', this.handleClickOutside);
  },
  beforeDestroy() {
    document.removeEventListener('click', this.handleClickOutside);
  },
}
</script>

<style>
.popup-container {
    position: fixed;  
    top: 0;
    left: 0;  
    width: 100vw;
    height: 100vh;
    background: rgba(175, 175, 175, 0.5);  
    z-index: 10;
}

.popup-body {
    position: fixed;  
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 50%;
    height: 80%;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
    border: 1px solid #e0e0e0;
    border-radius: 10px;
    background-color: var(--off-white);
    z-index: 11;
    padding: 20px;
    display: flex;
    flex-flow: column;
    justify-content: space-around;
    align-items: center;
}

.cigar-img img {
    width: 200px;
    height: 200px;
    position: relative;
}
.purchase-btn{
    background-color: var(--cigar-brown);
    cursor: pointer;
    border: none;
    border-radius: 5px;
    color: white;
    padding: 5px 10px;
    font-weight: bold;
    transition: background-color 0.2s;
}

</style>