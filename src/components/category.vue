<template>
  <div class="products">
    <b-card-group deck>
      <router-link
        :to="`./${item.category}/${item.name}`"
        class="card"
        v-for="item in filteredProducts"
        :key="item.name"
      >
        {{ item.value }}
        <img :src="item.pic" />
        <div class="item-desc">
          <h4 class="itm-title">{{ item.name }}</h4>
          <h6 class="star">
            <i class="fas fa-star"></i><i class="fas fa-star"></i
            ><i class="fas fa-star"></i> <i class="fas fa-star"></i
            ><i class="fas fa-star"></i
            ><span class="reviews-num">(39) reviews</span>
          </h6>
          <h5>{{ item.price }} kr</h5>
        </div>
      </router-link>
    </b-card-group>
  </div>
</template>


<!-------------------------------------------------Script-------------------------------------------------->
<script>
export default {
  name: "category",
  props: {
    items: Array,
    search: String,
  },
  data() {
    return {
      cartShow: false,
      cartNum: 0,
    };
  },
  computed: {
    filteredProducts: function () {
      return this.items.filter((product) => {
        return product.name.toUpperCase().match(this.search.toUpperCase());
      });
    },
  },
};
</script>


<!-------------------------------------------------Style-------------------------------------------------->
<style scoped>
.card-deck {
  padding: 50px 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 290px));
  justify-content: center;
  gap: 10px;
  margin: 0;
  width: 70%;
  margin: 0 auto;
  color: rgb(66, 66, 66);
  position: relative;
}
@media (max-width: 576px) {
  .card-deck {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 290px));
    justify-content: center;
    gap: 10px;
    margin: 0;
    padding-bottom: 200px;
    width: 70%;
    margin: 0 auto;
    color: rgb(66, 66, 66);
    position: relative;
  }
}
p {
  margin: 0;
}
img {
  display: block;
  height: 100%;
  width: 100%;
}
.card {
  height: 380px;
  margin: 0;
  background-color: rgb(255, 255, 255);
}

.card img {
  height: 70%;
  object-fit: contain;
}
.item-desc {
  padding: 15px;
  color: rgb(58, 58, 58);
  text-align: left;
}
.itm-title {
  color: #9d65c9;
}
.star {
  color: #fdd835;
}
a {
  text-decoration: none !important;
}
.reviews-num {
  color: black;
}
</style>