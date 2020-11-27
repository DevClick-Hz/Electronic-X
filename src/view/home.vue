<template>
  <div class="main-cont">
    <b-carousel
      id="carousel-1"
      v-model="slide"
      indicators
      :interval="3000"
      img-width="1024"
      img-height="400"
      style="text-shadow: 1px 1px 2px #333"
      @sliding-start="onSlideStart"
      @sliding-end="onSlideEnd"
    >
      <!-- Text slides with image -->
      <b-carousel-slide>
        <template v-slot:img>
          <div class="slide-cont">
            <div class="slide-txt">
              <h1>X-15</h1>
              <h5>
                The point of using Lorem Ipsum is that it has a more-or-less
                normal distribution of letters, as opposed to using 'Content
                here The point of using Lorem Ipsum is that it has a
                more-or-less The point of using Lorem Ipsum is that it has a
                more-or-less normal distribution of letters, as opposed to using
                'Content here The point of using Lorem Ipsum is that it has a
                more-or-less
              </h5>
              <button class="know-More">Read More</button>
            </div>
            <img src="../assets/drone.jpg" alt="" height="400" />
          </div>
        </template>
      </b-carousel-slide>

      <!-- Slides with image only -->
      <b-carousel-slide>
        <template v-slot:img>
          <div class="slide-cont">
            <div class="slide-txt">
              <h1>Iphone 8</h1>
              <h5>
                The point of using Lorem Ipsum is that it has a more-or-less
                normal distribution of letters, as opposed to using 'Content
                here The point of using Lorem Ipsum is that it has a
                more-or-less The point of using Lorem Ipsum is that it has a
                more-or-less normal distribution of letters, as opposed to using
                'Content here The point of using Lorem Ipsum is that it has a
                more-or-less
              </h5>
              <button class="know-More">Read More</button>
            </div>
            <img src="../assets/iphone.jpg" alt="" height="400" />
          </div>
        </template>
      </b-carousel-slide>

      <!-- Slides with img slot -->
      <!-- Note the classes .d-block and .img-fluid to prevent browser default image alignment -->
      <b-carousel-slide>
        <template v-slot:img>
          <div class="slide-cont">
            <div class="slide-txt">
              <h1>The New Acer</h1>
              <h5>
                The point of using Lorem Ipsum is that it has a more-or-less
                normal distribution of letters, as opposed to using 'Content
                here The point of using Lorem Ipsum is that it has a
                more-or-less The point of using Lorem Ipsum is that it has a
                more-or-less normal distribution of letters, as opposed to using
                'Content here The point of using Lorem Ipsum is that it has a
                more-or-less
              </h5>
              <button class="know-More">Read More</button>
            </div>
            <img src="../assets/laptop2.jpg" height="400" />
          </div>
        </template>
      </b-carousel-slide>
    </b-carousel>

    <!----------------------------------------------------------------------------->
    <div class="features">
      <div class="feature">
        <img src="../assets/support.svg" alt="" />
        <div class="fea-txt">
          <h5>Support 24/7</h5>
          <p>Contact us any time you need</p>
        </div>
      </div>
      <div class="feature">
        <img src="../assets/shipping.svg" alt="" />
        <div class="fea-txt">
          <h5>Free Shipping</h5>
          <p>On all orders over 1000 kr</p>
        </div>
      </div>
      <div class="feature">
        <img src="../assets/payment.svg" alt="" />
        <div class="fea-txt">
          <h5>100% Payment Secure</h5>
          <p>Your payment are safe with us</p>
        </div>
      </div>
      <div class="feature">
        <img src="../assets/free-return.svg" alt="" />
        <div class="fea-txt">
          <h5>Free Returns</h5>
          <p>Returns are free within 7 days</p>
        </div>
      </div>
    </div>
    <h4 class="sec">New arrivals</h4>
    <category :items="newArrival" :search="search"></category>
  </div>
</template>

<!---------------------------------------Script------------------------------------------------------->
<script>
import { bus } from "../main";
import category from "../components/category";
export default {
  name: "home",
  data() {
    return {
      search: "",
      slide: 0,
      sliding: null,
    };
  },
  components: { category },
  computed: {
    newArrival() {
      return this.$store.state.New;
    },
  },
  created() {
    bus.$on("changeSearch", (data) => {
      this.search = data;
    });
  },
  methods: {
    onSlideStart() {
      this.sliding = true;
    },
    onSlideEnd() {
      this.sliding = false;
    },
  },
  mounted(){
    this.$store.state.guestCart = [];
  }
};
</script>

<!---------------------------------------style------------------------------------------------------->
<style>
.sec {
  text-align: left !important;
  border-bottom: 3px solid #9d65c9;
  font-weight: 700;
  width: 70%;
  margin: 0 auto;
  color: grey;
}
.features {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: flex-start;
  padding: 50px 0;
  color: grey;
  width: 70%;
  margin: 0 auto;
}
.feature {
  display: flex;
}
.feature img {
  height: 50px;
  width: 50px;
}
.fea-txt {
  text-align: left;
  margin: 0 10px;
}
.fea-txt p {
  font-size: 0.8rem;
}
.slide-cont {
  padding: 20px 0;
  background-color: white !important;
  color: rgb(36, 36, 36);
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 20px;
}
.carousel {
  padding: 20px;
}
.carousel img {
  width: 35%;
  object-fit: contain;
  float: right;
}
.slide-txt {
  width: 50%;
  height: 100%;
  z-index: 100;
  float: left;
  text-align: left;
  padding: 0 20px;
  text-shadow: none;
}

.know-More {
  color: white;
  background: #9d65c9;
  border: none;
  outline: none;
  padding: 5px 10px;
}
@media screen and (max-width: 576px) {
  .slide-txt {
    width: 100%;
  }
  .carousel img {
    width: 100%;
  }
}
@media screen and (min-width: 577px) and (max-width: 1024px) {
  .slide-txt {
    width: 100%;
  }
  .carousel img {
    width: 100%;
  }
}
.carousel-indicators li {
  color: #9d65c9 !important;
  background-color: #9d65c9 !important;
  border-radius: 50%;
  height: 10px;
  width: 10px;
  border: none;
  outline: none;
}
</style>
