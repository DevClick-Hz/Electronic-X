<template>
  <div>
    <category :items="phones" :search="search"></category>
  </div>
</template>

<!------------------------------------------script---------------------------------------------------->
<script>
import { bus } from "../main";
import category from "../components/category";
export default {
  name: "phones",
  data() {
    return {
      search: "",
    };
  },
  components: { category },
  computed: {
    phones() {
      return this.$store.state.phones;
    },
  },
  created() {
    bus.$on("changeSearch", (data) => {
      this.search = data;
    });
  },
};
</script>
