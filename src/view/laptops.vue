<template>
  <div>
    <category :items="laptops" :search="search"></category>
  </div>
</template>

<!------------------------------------------script---------------------------------------------------->
<script>
import { bus } from "../main";
import category from "../components/category";
export default {
  name: "laptops",
  data() {
    return {
      search: "",
    };
  },
  components: { category },
  computed: {
    laptops() {
      return this.$store.state.laptops;
    },
  },
  created() {
    bus.$on("changeSearch", (data) => {
      this.search = data;
    });
  },
};
</script>
