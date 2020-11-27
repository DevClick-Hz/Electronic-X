<template>
  <div>
    <!-----------------------------------nav bar------------------------------------>
    <div id="nav">
      <b-navbar toggleable="lg" type="light" variant="info">
        <b-navbar-brand href="../"
          ><img src="../assets/logo.png" alt=""
        /></b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>
            <b-form-input
              class="search-bar"
              v-model="search"
              placeholder="Search"
              @keyup="changeSearch"
            ></b-form-input>
             <b-button id="show-btn" @click="showModal('my-modal0')"
              ><i class="fas fa-heart">({{ favTotal }})</i>
            </b-button>
            <b-button id="show-btn" @click="showModal('my-modal')"
              ><i class="fas fa-shopping-cart">({{ amountTotal }})</i>
            </b-button>
            <b-button id="show-btn" @click="showModal('modal-1')"
              >Check out <i class="fas fa-angle-right"></i
            ></b-button>
            <router-link
              :to="logon === true ? '/account' : '/login'"
            >
              <img class="user-avatar" src="../assets/user.svg" alt="" />
            </router-link>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </div>
    <div class="cat-nav">
      <router-link :to="`/`" exact
        ><img src="../assets/home.svg" alt="home" title="home"
      />
      <p>Home</p>
      </router-link>
      <router-link :to="`../laptops`" exact
        ><img src="../assets/laptop.svg" alt="laptops" title="laptops"
      />
      <p>Laptops</p>
      </router-link>
      <router-link :to="`../phones`" exact
        ><img
          src="../assets/smartphone.svg"
          alt="smartphones"
          title="smartphones"
      />
      <p>Smartphones</p>
      </router-link>
      <router-link :to="`../drones`" exact
        ><img src="../assets/drone1.svg" alt="drones" title="drones"
      />
      <p>Drones</p>
      </router-link>
    </div>

<!--------------------------------shopping cart------------------------------------->
    <b-modal ref="my-modal" hide-footer title="Your shopping cart">
      <ul class="cart-menu">
        <li v-for="(item,index) in cartItems" :key="index">
          <img :src="item.pic" />
          <h5>{{ item.name }}</h5>
          <div class="item-amount">
            <button @click="decreaseAmount(item)" :disabled="item.amount === 1">
              -
            </button>
            <h6>{{ item.amount }}</h6>
            <button
              @click="increaseAmount(item)"
              :disabled="item.amount >= item.stock"
            >
              +
            </button>
          </div>
          <h6>{{ item.price * item.amount }}</h6>
          <h6 class="remove-itm" @click="deleteItem(item)">
            <span class="delete-btn">X</span>
          </h6>
        </li>
      </ul>
      <div class="subTotal" v-show="cartItems.length > 0">
        <h4>Subtotal:</h4>
        <h4>{{ subTotal }}.00 kr</h4>
      </div>
      <b-button class="mt-2" block @click="hideModal('my-modal')"
        >Back to shopping</b-button
      >
    </b-modal>

    <!--------------------------------Wish List------------------------------------->
    <b-modal ref="my-modal0" hide-footer title="Your wish list">
      <ul class="cart-menu">
        <li v-for="(item,index) in wishItems" :key="index" class="wishItem">
          <img :src="item.pic" @click="goToItem(`../${item.category}/${item.name}`)"/>
          <h5>{{ item.name }}</h5>
          <h6>{{ item.price }} kr</h6>
          <h6 class="remove-itm" @click="deleteItemWish(item)">
            <span class="delete-btn">X</span>
          </h6>
        </li>
      </ul>
      <b-button class="mt-2" block @click="hideModal('my-modal0')"
        >Back to shopping</b-button
      >
    </b-modal>
    <!--------------------------------checkout------------------------------------->

    <b-modal ref="modal-1" hide-footer title="Checkout" id="modal-xl" size="xl">
      <div class="check-cont">
        <b-form @submit="onSubmit" @submit.stop.prevent>
        <div class="d-block text-center w-50 w-100">
          <h3>Billing Details</h3>
          <div id="billing">
            <div class="card-gp">
                <label for="card-name">First name</label>
                <b-form-input
                v-model="theUser.firstName"
                required
              ></b-form-input>
              </div>
            <div class="card-gp">
                <label for="card-name">Last name</label>
                <b-form-input
                v-model="theUser.lastName"
                required
              ></b-form-input>
              </div>

            <div class="card-gp">
                <label for="card-name">Country</label>
                <b-form-input
                v-model="theUser.country"
                required
              ></b-form-input>
              </div>
            <div class="card-gp">
                <label for="card-name">City</label>
                <b-form-input
                v-model="theUser.city"
                required
              ></b-form-input>
              </div>
           <div class="card-gp ad">
                <label for="card-name">Address</label>
                <b-form-input
                id="input-3"
                required
              ></b-form-input>
              </div>
            <div class="card-gp">
                <label for="card-name">Email</label>
                <b-form-input
                v-model="theUser.email"
                required
              ></b-form-input>
              </div>
            <div class="card-gp">
                <label for="card-name">Mobile number</label>
                <b-form-input
                required
              ></b-form-input>
              </div>
              </div>
        </div>

        <!-------------------------------order details section------------------------------->
        <div class="d-block text-center w-50 w-100">
          <h3>Your order</h3>
          <div class="order-details">
            <div class="ord-sec">
              <h6>product</h6>
              <h6>amount</h6>
              <h6>total</h6>
            </div>
            <div class="pro-detials">
              <li v-for="(item,index) in cartItems" :key="index">
                <p>{{ item.name }}</p>
                <p>{{ item.amount }}</p>
                <p>{{ item.price * item.amount }} kr</p>
              </li>
            </div>
            <div class="ord-sec">
              <h6>shipping</h6>
              <h6>free shipping</h6>
            </div>
            <div class="total-sec">
              <div class="ord-sec">
                <h5>Subtotal:</h5>
                <h5>
                  <span class="highlight-total">{{ subTotal }}.00 kr</span>
                </h5>
              </div>
            </div>
          </div>

          <!-------------------------------payment details section------------------------------->
          <div class="pay-wrap">
            <h3>Card details</h3>
            <div class="payment">
              <div class="card-gp">
                <label for="cardNum">Card Number</label>
                 <b-form-input
                v-model="cardNo"
                required
              ></b-form-input>
                <p v-show="invalid" style="color: red">
                  the card number you entered is invalid
                </p>
              </div>
              <div class="card-gp">
                <label for="card-name">Name on card</label>
                <b-form-input
                required
              ></b-form-input>
              </div>
              <div class="card-label">
                <label for="CVC">CVC</label>
                 <b-form-input
                required
              ></b-form-input>
              </div>
              <div class="card-label">
                <label for="Expire-date">Expire date</label>
                 <b-form-input
                required
              ></b-form-input>
              </div>
            </div>
            <b-button class="mt-2" block type="submit"
              >Place Order</b-button
            >
          </div>
        </div>
        </b-form>
      </div>
    </b-modal>
  </div>
</template>


<!--------------------------------------------------------script------------------------------------------------------------->
<script>
import _ from "lodash";
import { bus } from "../main";
import { busCart } from "../main";
import {busWish} from "../main";
import firebase from 'firebase/app';
export default {
  name: "navbar",
  props: ['logon','cartItems','wishItems'],
  data() {
    return {
      cartShow: false,
      cartNum: 0,
      search: "",
      show: true,
      invalid: false,
      cardNo: "",
      scrolled: false,
       theUser: {

      },
    };
  },
  created() {
    busCart.$on("showCheck", this.showModal);
    busWish.$on("showwishList", this.showModal0);
  },
   computed: {
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
    favTotal() {
      return _.sumBy(this.wishItems, function (item) {
        return item.amount;
      });
    },
  },
  methods: {
    async increaseAmount(itm){
       await firebase.auth().onAuthStateChanged((user) => {
            if (user) {
              const db = this.$firebase.firestore();
        db.collection('users').get().then(snap=>{
        snap.forEach(doc=>{
          if(doc.data().email === user.email){
            const theCart =  db.collection('users').doc(`${doc.id}`);
            if( this.$store.state.userCart.length > 0){
              console.log('notempty');
              theCart.update({
              userCart: firebase.firestore.FieldValue.arrayRemove(itm)});
              itm.amount++
              theCart.update({
              userCart: firebase.firestore.FieldValue.arrayUnion(itm)});
          }
          }
        })
        })
            }else{
              itm.amount++
            }
       })
    },
   async decreaseAmount(itm){
       await firebase.auth().onAuthStateChanged((user) => {
            if (user) {
              const db = this.$firebase.firestore();
        db.collection('users').get().then(snap=>{
        snap.forEach(doc=>{
          if(doc.data().email === user.email){
            const theCart =  db.collection('users').doc(`${doc.id}`);
            if( this.$store.state.userCart.length > 0){
              theCart.update({
              userCart: firebase.firestore.FieldValue.arrayRemove(itm)});
              itm.amount--
              theCart.update({
              userCart: firebase.firestore.FieldValue.arrayUnion(itm)});
          }
          }
        })
        })
            }else{
              itm.amount--
            }
       })
    },
    async deleteItem(ind) {
      const db = this.$firebase.firestore();
        await firebase.auth().onAuthStateChanged((user) => {
            if (user) {
             db.collection('users').get().then(snap=>{
             snap.forEach(doc=>{
             if(doc.data().email === user.email){
            const theCart =  db.collection('users').doc(`${doc.id}`);
            if( this.$store.state.userCart.length > 0){
              theCart.update({
              userCart: firebase.firestore.FieldValue.arrayRemove(ind)});
              this.$store.commit("deleteItem", ind);
            }
            }
           })
           })
            }else{
              ind.amount = 0;
             this.$store.commit("deleteItem", ind);
            }
         })
     },
     deleteItemWish(itm){
       const db = this.$firebase.firestore();
         firebase.auth().onAuthStateChanged((user) => {
            if (user) {
             db.collection('users').get().then(snap=>{
             snap.forEach(doc=>{
             if(doc.data().email === user.email){
            const theWish =  db.collection('users').doc(`${doc.id}`);
            if( this.$store.state.userWish.length > 0){
              theWish.update({
              userWish: firebase.firestore.FieldValue.arrayRemove(itm)});
              this.$store.commit("deleteWish", itm);
            }
            }
           })
           })
            }else{
              itm.amount = 0;
             this.$store.commit("deleteWish", itm);
            }
         })
     },
     goToItem(link){
       this.$router.push(link).catch(()=>{});
       this.$router.go(link).catch(()=>{});
     },
    showModal(modal) {
      this.$refs[modal].show();
    },
    hideModal(modal) {
      this.$refs[modal].hide();
    },
    onSubmit(evt) {
      evt.preventDefault();
      var american = /^(?:3[47][0-9]{13})$/;
      var visa = /^(?:4[0-9]{12}(?:[0-9]{3})?)$/;
      var master = /^(?:5[1-5][0-9]{14})$/;
      if (
        this.cardNo.match(american) ||
        this.cardNo.match(visa) ||
        this.cardNo.match(master)
      ) {
        return true;
      } else {
        this.invalid = true;
      }
    },
    changeSearch() {
      bus.$emit("changeSearch", this.search);
    },
  },
  mounted() {
    firebase.auth().onAuthStateChanged((user) => {
            if (user) {
              const db = this.$firebase.firestore();
                db.collection('users').get().then(snap=>{
                 snap.forEach(doc=>{
                 if(doc.data().email === user.email){
                  this.theUser = doc.data();
                }
                 })
             })
            }else{
              this.theUser ={}
            }
        })
  }
};
</script>


<!--------------------------------------------------------style------------------------------------------------------------->


<style scoped>
/*------------------------------------navbar style-----------------------------------*/
.navbar {
  padding: 4px 10px;
  background: none !important;
  color: #9d65c9;
}
.navbar-brand img {
  max-height: 200px;
  max-width: 200px;
}
.user-avatar {
  height: 35px !important;
  width: 35px !important;
}
@media screen and (max-width: 576px) {
  .navbar-brand img {
    height: 70px;
    width: 150px;
  }
}

.navbar a {
  color: #9d65c9 !important;
}
.navbar-brand {
  margin: 0 10px;
  font-size: 1.7rem;
  color: #9d65c9 !important;
}
.navbar-nav {
  width: 100%;
  justify-content: center;
  align-items: center;
  gap: 40px;
}
input {
  width: 50%;
  text-align: center;
}
.btn-primary {
  background: #9d65c9 !important;
  border: none;
}
.btn-primary:active {
  background: #9d65c9 !important;
  border: none;
}
.btn-primary:hover {
  background: #5d54a4 !important;
  border: none;
}
.btn-primary:focus {
  box-shadow: none !important;
}
.cat-nav {
  width: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #9d65c9;
  padding: 10px;
}
.cat-nav a{
  color: white;
  text-decoration: none;
}
.cat-nav p{
  margin: 0;
}
.cat-nav img {
  height: 50px;
  width: 50px;
  margin: 0 40px;
  position: relative;
}

.btn-secondary {
  background-color: #9d65c9;
  border: none;
}
.btn-secondary:hover {
  background-color: #5d54a4;
  border: none;
}
.btn-secondary:active {
  background: #9d65c9 !important;
  border: none;
}
.btn-secondary:focus {
  box-shadow: none;
}
@media screen and (max-width: 576px) {
  .cat-nav img {
    height: 40px;
    width: 40px;
    margin: 0 20px;
  }
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
  position: relative;
  max-height: 450px;
  overflow-y: scroll;
  z-index: 5;
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
  border-bottom: 1px dotted black;
}
.cart-menu img {
  display: block;
  height: 100px;
  width: 30%;
  object-fit: contain;
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
.cart-menu::-webkit-scrollbar {
  width: 10px;
  height: 10px;
}
.cart-menu::-webkit-scrollbar-track {
  background: rgb(255, 255, 255);
}
.cart-menu::-webkit-scrollbar-thumb {
  background: #9d65c9;
}
.item-amount {
  display: flex;
  align-items: center;
  justify-content: space-between;
  align-content: center;
  width: 25%;
}
.remove-itm {
  cursor: pointer;
}
.delete-btn {
  color: red;
}

/*-------------------------------------------checkout------------------------------------------------*/
#billing{
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.check-cont {
  display: flex;
  gap: 10px;
}
.order-details {
  background-color: #f6f6f6;
  padding: 20px;
}

.pro-detials li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px;
}
li p {
  margin: 0;
  width: 30%;
}
.ord-sec {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid #dee0e4;
  border-bottom: 1px solid #dee0e4;
  padding: 5px 0;
  margin: 10px 0;
}
.highlight-total {
  color: #9d65c9;
}
form {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  text-align: left;
  border: 1px solid #dee0e4;
  border-radius: 5px;
  padding: 10px;
}
h3 {
  width: 50%;
  margin: 30px auto;
  padding: 10px 0;
  border-bottom: 3px solid #9d65c9;
}
.form-group {
  width: 50%;
}
form input {
  width: 100%;
  text-align: left;
}
#input-group-3 {
  width: 100% !important;
}
.payment {
  margin: 0;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: space-between;
  border: 1px solid #dee0e4;
}
.card-gp {
  width: 48%;
  text-align: left;
}
.ad{
  width: 100%;
}
.card-label {
  width: 48%;
  display: flex;
  flex-direction: column;
}
.payment input {
  width: 100%;
  text-align: left;
}
@media (min-width: 568px) and (max-width: 1024px) {
  .check-cont {
    flex-wrap: wrap;
  }
}
@media screen and (max-width: 567px) {
  .card-gp {
    width: 100% !important;
  }
  .card-label {
    width: 100% !important;
  }
  .check-cont {
    flex-wrap: wrap;
  }
}
.form-inline {
  border: none;
  padding: 0;
}
form input {
  margin: 5px 0;
}
.wishItem{
  cursor: pointer;
}
</style>

