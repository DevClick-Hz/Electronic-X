<template>
    <div class="checkout" v-show="showCheck">
      <h2 @click="showCheck=false">
        <i class="far fa-window-close"></i>
      </h2>
      <div class="inner-cont">
        <ul class="check-items">
          <h3>your items</h3>
          <li v-for="item in cartItems" :key="item.name">
            <img :src="item.pic" />
            <h5>{{item.name}}</h5>
            <div class="item-amount">
              <button @click="item.amount--" :disabled="item.amount===1">-</button>
              <h6>{{item.amount}}</h6>
              <button @click="item.amount++" :disabled="item.amount >= item.stock">+</button>
            </div>
            <h6>{{item.price*item.amount}} kr</h6>
            <button @click="deleteItem(item)">
              <i class="fas fa-trash"></i>
            </button>
          </li>
        </ul>
        <div class="order-overview">
          <h3>Order overview ({{amountTotal}} Products)</h3>
          <div class="cost">
            <h6>Total</h6>
            <h6>{{subTotal}} kr</h6>
          </div>
          <div class="cost">
            <h6>Shipping</h6>
            <h6>0 kr</h6>
          </div>
          <h5>Subtotal {{subTotal}} kr</h5>
        </div>
        <div class="payment form-group">
          <h3>Payment method</h3>
          <label>Name</label>
          <input type="text" placeholder="Name on card" name="name" id="name" />
          <label>Card Number</label>
          <input type="tel" placeholder="#### #### #### ####" class="form-control" v-cardformat:formatCardNumber />
          <div class="card-expire">
            <input   id="card-exp" placeholder="mm/yy" class="form-control" v-cardformat:formatCardExpiry  data-error="true"/>
            <input  placeholder="CVC" class="form-control" v-cardformat:formatCardCVC/>
          </div>
          <button>Place Order</button>
        </div>
        <div class="Address">
          <h3>Billing Address</h3>
          <div class="address-form">
            <div class="form-left">
              <label>First Name</label>
              <input type="text" />
              <label>Last Name</label>
              <input type="text" />
              <label>Street Name</label>
              <input type="text" />
              <label>City</label>
              <input type="text" />
            </div>
            <div class="form-right">
              <label>Country</label>
              <input type="text" />
              <label>Zip code</label>
              <input type="text" />
              <label>Mobile</label>
              <input type="text" />
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import _ from "lodash";
export default {
    data(){
        return{
            
        }
    },
    computed:{
         amountTotal() {
      return _.sumBy(this.cartItems, function (item) {
        return item.amount;
      });
    },
     cartItems() {
      return this.$store.state.cartItems;
    },
    subTotal() {
      return _.sumBy(this.cartItems, function (item) {
        return item.price * item.amount;
      });
    }
    }
    
}
</script>