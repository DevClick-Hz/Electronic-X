<template>
  <div class="main-cont">
      <category :search="search" :items="filteredProducts"></category>
  </div>
</template>

<!---------------------------------------Script------------------------------------------------------->
<script>
import category from "../components/category"
 export default {
  name: "home",
  components:{category},
  props:['search'],
  data() {
    return {
      cartShow: false,
      cartNum: 0,
      slide: 0,
        sliding: null
    }
  },
  computed: {
    filteredProducts: function () {
      return this.$store.state.New.filter((product) => {
        return product.name.toUpperCase().match(this.search.toUpperCase());
      });
    }
 },
  methods: {
      onSlideStart() {
        this.sliding = true
      },
      onSlideEnd() {
        this.sliding = false
      }
    }
 }
</script>

<!---------------------------------------style------------------------------------------------------->
<style scoped>
#carousel-1{
  margin: 1rem 0;
}

</style>
