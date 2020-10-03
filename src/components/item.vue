<template>
    <div>
      <div class="navigate">
      <router-link :to="`../${product.category}`">{{product.category}}</router-link>
      >
      <h6>{{product.name}}</h6>
      </div>
      <div class="pro-cont">
        <div class="itm-pic">
            <img :src="product.pic">
        </div>
        <div class="itm-txt">
          <h1>{{product.name}}</h1>
          <p>It is a long established fact that a reader will be 
              distracted by the readable content of a page when looking at its layout. 
              The point of using Lorem Ipsum</p>
              <h4>In Stock: {{product.stock}}</h4>
              <h3>{{product.price}}kr</h3>
              <button class="addCart" @click="addToCart(product)">add to cart</button>
        </div>
     </div>
    </div>
</template>


<!------------------------------------------------Scripts-------------------------------------------->
<script>
import _ from "lodash";
export default {
    data(){
        return{
         itemName: this.$route.params.name,
         cartShow: false,
         cartNum: 0,
         itemCate: this.$route.params.category
        }
    },
    computed:{
     product(){
         return this.$store.getters.merge.find(
        product => product.name === this.itemName
      );
     },
    subTotal() {
      return _.sumBy(this.cartItems, function (item) {
        return item.price * item.amount;
      });
    },
    amountTotal() {
      return _.sumBy(this.cartItems, function (item) {
        return item.amount;
      });
    },
    cartItems() {
      return this.$store.state.cartItems;
    }
    },
    methods: {
    addToCart(itm) {
      if (
        this.$store.state.cartItems.length > 0 &&
        this.$store.state.cartItems.includes(itm)
      ) {
        itm.amount = itm.amount + 1;
        return this.$store.state.cartItems;
      } else {
        this.$store.state.cartItems.push(itm);
        itm.amount = 1;
      }
      this.cartNum = this.cartNum + 1;
    },
    deleteItem(ind) {
      ind.amount = 0;
      this.$store.commit("deleteItem", ind);
    },
    toggleCart() {
      this.cartShow = !this.cartShow;
    },
    }
}

</script>


<!------------------------------------------------Style-------------------------------------------->
<style scoped>
@media (max-width: 575px) {
  .cart-menu {
    position: relative !important;
    margin: 0 auto !important;
    padding: 10px 10px !important;
    width: 100% !important;
  }
  .cart-menu li {
    width: 100% !important;
  }
}
@media (max-width: 740px){
  .pro-cont{
    padding: 0 20px !important;
  }
}
.pro-cont{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    margin-top:50px;
    padding-bottom: 200px;
    height: 60%;
}
.itm-pic{
    max-width:500px;
    margin:0;
    max-height: 400px;
}
img{
    width:100%;
    height: 100%;
    display: block;
}
.itm-txt{
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    width: 600px;
    text-align: left;
    margin:0;
    position: relative;
}
.addCart {
  background-color: rgb(0, 228, 0);
  color: white;
  width: 5rem;
  padding: 5px 0;
}
.cart-menu h4 {
  color: white;
}
.cart-menu {
  position: absolute;
  right: 0;
  top: 56px;
  width: 400px;
  max-height: 450px;
  overflow-y: scroll;
  z-index: 5;
  background-color: #17a2b8 !important;
  color: rgb(80, 80, 80);
  padding: 0 10px 10px 10px;
}
.cart-menu li {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
  padding: 10px;
  background-color: white;
}
.cart-menu img {
  display: block;
  height: 100px;
  width: 30%;
}
.cart-menu h5 {
  width: 25%;
}
.item-amount {
  display: flex;
  align-items: center;
  justify-content: space-between;
  align-content: center;
  width: 25%;
}
.item-amount > button {
  margin: 0 3px;
  width: 20px;
  height: 20px;
  padding: 0;
}
button {
  border: none;
}
.subTotal {
  display: flex;
  justify-content: space-around;
}
.fa-trash {
  color: red;
}
.place-order {
  background-color: rgb(0, 228, 0);
  color: rgb(255, 255, 255);
}
h6,
h5 {
  margin: 0;
}
.tab {
  text-decoration: none !important;
  color: rgb(219, 219, 219);
}
.tab:hover {
  color: white;
}
.navigate{
  display: flex;
  align-items: center;
  gap: 10px;
  width: 150px;
  margin: 25px 35px;
}
</style>