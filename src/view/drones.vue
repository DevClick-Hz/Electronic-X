<template>
    <div>
      <category :search="search" :items="drones"></category>
    </div>
</template>

<!------------------------------------------script---------------------------------------------------->
<script>
import category from "../components/category"
export default {
    name: 'drones',
    components:{category},
    props:['search'],
    computed:{
        drones(){
            return this.$store.state.drones
        }
    }
}
</script>
