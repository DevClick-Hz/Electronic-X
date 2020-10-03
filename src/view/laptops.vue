<template>
    <div>
      <category :search="search" :items="laptops"></category>
    </div>
</template>

<!------------------------------------------script---------------------------------------------------->
<script>
import category from "../components/category"
export default {
    name: 'laptops',
    components:{category},
    props:['search'],
    computed:{
        laptops(){
            return this.$store.state.laptops
        }
    }
}
</script>
