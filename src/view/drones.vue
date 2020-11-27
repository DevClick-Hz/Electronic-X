<template>
  <div>
    <category :items="drones" :search="search"></category>
  </div>
</template>

<!------------------------------------------script---------------------------------------------------->
<script>
import { bus } from "../main";
import category from "../components/category";
export default {
  name: "drones",
  data() {
    return {
      search: "",
    };
  },
  components: { category },
  computed: {
    drones() {
      return this.$store.state.drones;
    },
  },
  created() {
    bus.$on("changeSearch", (data) => {
      this.search = data;
    });
  },
};
</script>
