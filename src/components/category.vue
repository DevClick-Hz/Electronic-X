<template>
<div class="products">
      <b-card-group deck>
        <router-link :to="`./${item.category}/${item.name}`" class="card" v-for="item in filteredProducts" :key="item.name">
        {{item.value}}
          <img :src="item.pic" />
          <div class="item-desc">
            <h4>{{item.name}}</h4>
            <h6>In Stock:{{item.stock}}</h6>
            <h5>{{item.price}} kr</h5>
          </div>
        </router-link>
      </b-card-group>
    </div>    
</template>


<!-------------------------------------------------Script-------------------------------------------------->
<script>
export default {
    name: 'category',
    props:{
      search: String,
      items: Array
    },
    data() {
    return {
      cartShow: false,
      cartNum: 0
    }
  },
  computed: {
    filteredProducts: function () {
      return this.items.filter((product) => {
        return product.name.toUpperCase().match(this.search.toUpperCase());
      });
    },
  }
}
</script>


<!-------------------------------------------------Style-------------------------------------------------->
<style scoped>
@media (min-width: 576px) {
  .card-deck {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 330px));
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
  height: 400px;
  padding-bottom: 20px;
  margin: 0;
  background-color: rgb(255, 255, 255);
  box-shadow: 0 0 7px rgb(54, 54, 54);
}
.card img {
  height: 70%;
}
.item-desc {
  margin: auto auto;
  color: rgb(58, 58, 58);
}
a{
  text-decoration: none !important;
}
</style>