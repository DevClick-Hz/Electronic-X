<template>
    <div>
      <category :search="search" :items="phones"></category>
    </div>
</template>

<!------------------------------------------script---------------------------------------------------->
<script>
import category from "../components/category"
export default {
    name: 'phones',
    components:{category},
    props:['search'],
    computed:{
        phones(){
            return this.$store.state.phones
        }
    }
}
</script>
