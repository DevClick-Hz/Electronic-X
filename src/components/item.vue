<template>
  <div class="wrap">
    <div class="navigate">
      <router-link :to="`../${product.category}`">{{
        product.category
      }}</router-link>
      >
      <h6>{{ product.name }}</h6>
    </div>
    <div class="pro-cont">
      <div class="itm-pic">
        <img :src="product.pic" />
      </div>
      <div class="itm-txt">
        <h1>{{ product.name }}</h1>
        <h6 class="star">
          <i class="fas fa-star"></i><i class="fas fa-star"></i
          ><i class="fas fa-star"></i> <i class="fas fa-star"></i
          ><i class="fas fa-star"></i
          ><span class="reviews-num">(39) reviews</span>
        </h6>
        <p>
          It is a long established fact that a reader will be distracted by the
          readable content of a page when looking at its layout. The point of
          using Lorem Ipsum
        </p>
        <h5>In Stock: {{ product.stock }}</h5>
        <h3>{{ product.price }} kr</h3>
        <b-button variant="primary" @click="addToWish(product), showWish()"><i class="fas fa-heart"></i> Add to wish list</b-button>
        <b-button  variant="primary" @click="addToCart(product), showCheckNav()">
         <i class="fas fa-cart-plus"></i> add to cart
        </b-button>
      </div>
    </div>
    <b-tabs content-class="mt-3" lazy>
      <b-tab title="Description">
        <b-alert show
          >Lorem ipsum dolor sit amet consectetur adipisicing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commo consequat. Duis aute irure dolor in reprehend in
          voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
          sint occaecat cupidatat non proident, sunt in culpa qui officia
          deserunt</b-alert
        >
      </b-tab>
      <b-tab title="Product Details">
        <b-alert show>
          <div class="detail">
            <p>Weight</p>
            <p>400 g</p>
          </div>
        </b-alert>
        <b-alert show>
          <div class="detail">
            <p>Dimensions</p>
            <p>10 x 10 x 15 cm</p>
          </div>
        </b-alert>
        <b-alert show>
          <div class="detail">
            <p>Materials</p>
            <p>60% cotton, 40% polyester</p>
          </div>
        </b-alert>
      </b-tab>
      <b-tab title="Reviews">
        <b-alert show>
          <div class="person-review">
            <b-avatar :src="person1" size="6rem"></b-avatar>
            <div class="the-rev">
              <h6 class="star">
                <span class="name">John kennedy</span>
                <star-rating :rating="5" :increment="0.5" :read-only="true" :star-size="25"></star-rating>
              </h6>
              <p>
                The European languages are members of the same family. Their
                separate existence is a myth. For science, music, sport, etc,
                Europe uses the same vocabulary. The languages only differ in
                their grammar.
              </p>
            </div>
          </div>
        </b-alert>
        <b-alert show>
          <div class="person-review">
            <b-avatar :src="person2" size="6rem"></b-avatar>
            <div class="the-rev">
              <h6 class="star">
                <span class="name">Sarah jemison</span>
                <star-rating :rating="5" :increment="0.5" :read-only="true" :star-size="25"></star-rating>
              </h6>
              <p>
                The European languages are members of the same family. Their
                separate existence is a myth. For science, music, sport, etc,
                Europe uses the same vocabulary. The languages only differ in
                their grammar.
              </p>
            </div>
          </div>
        </b-alert>
        <b-alert show v-for="(rev,index) in product.reviews" :key="index">
          <div class="person-review">
            <b-avatar :src="theUser.profilePic" size="6rem"></b-avatar>
            <div class="the-rev">
              <h6 class="star">
                <span class="name">{{rev.userName}}</span>
                <star-rating :rating="rev.stars" :increment="0.5" :read-only="true" :star-size="25"></star-rating>
              </h6>
              <p>
                {{rev.theReview}}
              </p>
              <!--<div class="edit-rev">
                Edit | Delete
              </div>-->
            </div>
          </div>
        </b-alert>
        <!---------------------------------review area--------------------------------------->
        <b-form  @submit="addReview" @submit.stop.prevent v-show="logon">
          <star-rating @rating-selected ="setRating" :increment="0.5" :star-size="25"></star-rating>
           <b-form-textarea
           id="textarea"
            v-model="reviewText"
            placeholder="Write a review..."
            rows="3"
             max-rows="6"
        ></b-form-textarea>
        <b-button type="submit" variant="primary">Submit a review</b-button>
        </b-form>
        <a href="#">See all reviews</a>
      </b-tab>
    </b-tabs>
  </div>
</template>


<!------------------------------------------------Scripts-------------------------------------------->
<script>
import { busCart } from "../main";
import {busWish} from "../main";
import firebase from 'firebase/app';
import StarRating from 'vue-star-rating';
export default {
  props:['logon'],
  components: {
  StarRating
},
  data() {
    return {
      itemName: this.$route.params.name,
      cartShow: false,
      cartNum: 0,
      person1: require("../assets/person.jpg"),
      person2: require("../assets/person1.jpg"),
      reviewText: "",
      theUser:{},
      rating:0,
      wished:false
    };
  },
  computed: {
    product() {
      return this.$store.getters.merge.find(
        (product) => product.name === this.itemName
      );
    },
  },
  methods: {
     setRating: function(rating){
      this.rating= rating;
    },
   async addToCart(itm) {
        await firebase.auth().onAuthStateChanged((user) => {
            if (user) {
              const db =  this.$firebase.firestore();
        db.collection('users').get().then(snap=>{
        snap.forEach(doc=>{
          if(doc.data().email === user.email){
            const theCart =  db.collection('users').doc(`${doc.id}`);
            if(this.$store.state.userCart.length > 0){
              console.log('not empty');
               if (this.$store.state.userCart.some(prod=> prod.name === itm.name)){
              this.$store.state.userCart.forEach(prod=> {
                if(prod.name === itm.name){
                  console.log('same shit');
               theCart.update({
              userCart: firebase.firestore.FieldValue.arrayRemove(prod)});
                  prod.amount++
                  theCart.update({
              userCart: firebase.firestore.FieldValue.arrayUnion(prod)});
                }
              })
                }else{
                  console.log('new item');
                itm.amount =1;
                this.$store.state.userCart.push(itm);
              theCart.update({
              userCart: firebase.firestore.FieldValue.arrayUnion(itm)});
                }      
          }else{
            console.log('empty');
            itm.amount = 1;
              theCart.update({
              userCart: firebase.firestore.FieldValue.arrayUnion(itm)});
              this.$store.state.userCart.push(itm);
          }
          }else{
            return ''
          }
        })
    })
            }else{
        if (
          this.$store.state.guestCart.length > 0 &&
          this.$store.state.guestCart.includes(itm)
        ) {
          itm.amount = itm.amount + 1;
          return this.$store.state.guestCart;
        } else {
          this.$store.state.guestCart.push(itm);
          itm.amount = 1;
        }
            }
       })
    },
    //--------------------------------- add to wish list ------------------------>
    async addToWish(itm) {
      this.wished = !this.wished
      const db = this.$firebase.firestore();
       await firebase.auth().onAuthStateChanged((user) => {
            if (user) {
        db.collection('users').get().then(snap=>{
        snap.forEach(doc=>{
          if(doc.data().email === user.email){
            const theCart =  db.collection('users').doc(`${doc.id}`);
            if( this.$store.state.userWish.length > 0){
              this.$store.state.userWish.forEach(prod=>{
                if(prod.name === itm.name){
              console.log('notempty');
           theCart.update({
              userWish: firebase.firestore.FieldValue.arrayRemove(prod)});
              this.$store.commit("deleteWish", prod);
                }else{
                  console.log('they are not the same');
               theCart.update({
              userWish: firebase.firestore.FieldValue.arrayUnion(itm)});
              this.$store.state.userWish.push(itm);
                }
              })
          }else{
            console.log('empty');
              itm.amount = 1;
            theCart.update({
              userWish: firebase.firestore.FieldValue.arrayUnion(itm)});
              this.$store.state.userWish.push(itm);
          }
          }
        })
    })
            }else{
        if (
          this.$store.state.guestWish.length > 0 &&
          this.$store.state.guestWish.includes(itm)
        ) {
          itm.amount = itm.amount + 1;
          return this.$store.state.guestWish;
        } else {
          this.$store.state.guestWish.push(itm);
          itm.amount = 1;
        }
            }
       })
    },
    toggleCart() {
      this.cartShow = !this.cartShow;
    },
    toggleModal() {
      // We pass the ID of the button that we want to return focus to
      // when the modal has hidden
      this.$parent.$refs["my-modal"].toggle("#toggle-btn");
    },
    showCheckNav() {
      busCart.$emit("showCheck");
    },
    showWish(){
      busWish.$emit("showwishList");
    },
    addReview(){
      this.product.reviews.push({userName:this.theUser.firstName +' '+ this.theUser.lastName, theReview: this.reviewText, stars: this.rating});
      this.reviewText = ''
    }
  },
  async mounted() {
     await firebase.auth().onAuthStateChanged((user) => {
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
              return "error"
            }
        })
  },
};
</script>


<!------------------------------------------------Style-------------------------------------------->
<style scoped>
.fas{
  margin: 0 5px;
}
.vue-star-rating{
  margin: 10px 0;
}
.btn-primary{
  background-color: #9d65c9;
  border: none;
  outline: none;
  margin: 20px 0;
  width: 50%;
}
.btn-primary:focus {
  border: none;
  outline: none;
  box-shadow: none;
}
.btn-primary:hover{
  background-color: #5d54a4;
}
.btn-primary:active{
   background-color: #9d65c9 !important;
  border: none;
  outline: none;
  box-shadow: none !important;
}
@media (max-width: 575px) {
  .pro-cont {
    padding: 0 20px !important;
    width: 100% !important;
  }
  .itm-pic,
  .itm-txt {
    width: 100% !important;
  }
  .the-rev {
    width: 100% !important;
  }
  .b-avatar {
    width: 6rem !important;
    height: 6rem !important;
    margin: 10px auto;
  }
  .alert {
    padding: 0.75rem 0;
  }
  .detail {
    width: 100% !important;
    padding: 0 5px;
  }
}
@media (max-width: 740px) {
  .pro-cont {
    padding: 0 20px !important;
    width: 100% !important;
  }
  .itm-pic,
  .itm-txt {
    width: 100% !important;
  }
  .the-rev {
    width: 100% !important;
  }
  .b-avatar {
    width: 6rem !important;
    height: 6rem !important;
    margin: 10px auto;
  }
  .alert {
    padding: 0.75rem 0;
  }
  .detail {
    width: 100% !important;
    padding: 0 5px;
  }
}
.pro-cont {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  margin: 50px auto;
  height: 60%;
  width: 80%;
}
.itm-pic {
  width: 50%;
  margin: 0;
  max-height: 400px;
}
img {
  width: 100%;
  height: 100%;
  display: block;
  object-fit: contain;
}
.itm-txt {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 50%;
  text-align: left;
  margin: 0;
  position: relative;
  padding: 10px 30px;
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
.navigate {
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  padding: 20px;
  background-color: rgb(238, 238, 238);
}
.star {
  color: #fdd835;
}
.reviews-num {
  color: black;
}
.itm-txt a {
  color: black;
}
.detail {
  display: flex;
  width: 50%;
  justify-content: space-between;
  align-items: center;
}
.tabs {
  width: 80%;
  margin: 0 auto 50px auto;
}
.alert-info {
  background: none;
  text-align: left;
}
.nav-link a {
  color: #9d65c9 !important;
}
.person-review {
  display: flex;
  text-align: left;
  align-items: center;
  flex-wrap: wrap;
  gap: 20px;
}
p {
  margin: 0;
}
.the-rev {
  width: 80%;
  margin: 15px 0;
}
.name {
  color: rgb(0, 0, 0);
}

</style>