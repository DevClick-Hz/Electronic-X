<template>
<div>
  <!-----------------------------------nav bar------------------------------------>
    <div id="nav">
      <b-navbar toggleable="lg" type="dark" variant="info">
        <b-navbar-brand href="#">Electronic-X</b-navbar-brand>
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>
            <b-nav-item>
              <router-link to="/" class="tab">Home</router-link>
            </b-nav-item>
          </b-navbar-nav>
          <b-navbar-nav class="ml-auto">
            <b-nav-item class="theCart">
              <i class="fas fa-shopping-cart" @click="toggleCart">({{amountTotal}})</i>
            </b-nav-item>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </div>
    <div class="pro-nav">
        <div class="cat-tabs">
          <router-link :to="`../laptops`" exact>laptops</router-link>
          <router-link :to="`../phones`" exact>Smart phones</router-link>
          <router-link :to="`../drones`" exact>drones</router-link>
        </div>
      </div>


       <!--------------------------------Cart List------------------------------------->
    <ul class="cart-menu" v-show="cartShow===true">
      <li v-for="item in cartItems" :key="item.name">
        <img :src="item.pic" />
        <h5>{{item.name}}</h5>
        <div class="item-amount">
          <button @click="item.amount-- " :disabled="item.amount===1">-</button>
          <h6>{{item.amount}}</h6>
          <button @click="item.amount++" :disabled="item.amount >= item.stock">+</button>
        </div>
        <h6>{{item.price*item.amount}}</h6>
        <button @click="deleteItem(item)">
          <i class="fas fa-trash"></i>
        </button>
      </li>
      <div class="subTotal" v-show="cartItems.length>0">
        <h4>Subtotal</h4>
        <h4>{{subTotal}}</h4>
      </div>
      <button class="place-order" v-show="cartItems.length>0">
        <p>Proceed to Checkout</p>
      </button>
    </ul>
      </div>
</template>


<!--------------------------------------------------------script------------------------------------------------------------->
<script>
import _ from "lodash";
export default {
    name: 'navbar',
    data(){
      return{
        cartShow: false,
        cartNum: 0,
      }
    },
    computed: {
    products() {
      return this.$store.state.mostPopular();
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
    },
  },
  methods: {
    deleteItem(ind) {
      ind.amount = 0;
      this.$store.commit("deleteItem", ind);
    },
    toggleCart() {
      this.cartShow = !this.cartShow;
    },
  },
}
</script>


<!--------------------------------------------------------style------------------------------------------------------------->
<style scoped>

/*------------------------------------navbar style-----------------------------------*/
.pro-nav{
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin: 0;
  gap: 50px;
  padding: 4px 10px;
  background-color: #17a2b8;
}
.pro-nav .router-link-active {
  color: rgb(255, 255, 255) !important;
  border-bottom: 2px solid rgb(0, 228, 0);
}
.cat-tabs a {
  color: rgb(209, 209, 209);
  margin: 0 10px;
  font-size: 1.3rem;
}
.cat-tabs a:hover {
  text-decoration: none;
  color: rgb(255, 255, 255);
}
.navbar{
    padding: 4px 10px;
}
.navbar-brand{
    margin: 0 10px;
    font-size: 1.7rem;
}
/*-----------------------------------cart style-------------------------------------*/
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
.cart-menu h4 {
  color: white;
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
  padding: 5px 10px;
}
.place-order p {
  color: rgb(255, 255, 255);
  font-size: 18px;
  margin: 0;
}
.cart-menu::-webkit-scrollbar {
  width: 10px;
  height: 10px;
}
.cart-menu::-webkit-scrollbar-track {
  background: rgb(255, 255, 255);
}
.cart-menu::-webkit-scrollbar-thumb {
  background: rgb(0, 228, 0);
}
.item-amount {
  display: flex;
  align-items: center;
  justify-content: space-between;
  align-content: center;
  width: 25%;
}
</style>

