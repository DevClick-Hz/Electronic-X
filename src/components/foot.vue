<template>
    <footer>
        <div class="elec">
            <h5>Electronic-X</h5>
            <h5>&copy; 2020</h5>
        </div>
        <div class="media">
          <i class="fab fa-instagram fa-lg"></i>
          <i class="fab fa-twitter fa-lg"></i>
          <i class="fab fa-facebook fa-lg"></i>
          <i class="fab fa-youtube fa-lg"></i>
        </div>
        <div class="contact">
            <h5>Contact Us</h5>
          <h6>telephone: +467000000000</h6>
          <h6>Email: Electronic-X@Electronic-X.com</h6>
        </div>
    </footer>
</template>
<script>
export default {
    name: 'foot'
}
</script>


<style scoped>
footer{
    background-color: #17a2b8 !important;
    color: white;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-around;
    padding: 0.5rem 1rem;
    margin-top: 3rem;
    position: absolute;
    bottom: 0;
    width: 100%;
}
@media screen and (min-width: 320px) and (max-width: 780px) {
    footer{
        position: relative;
    }
}
.elec , .media ,.contact{
    display: flex;
    align-items: center;
    gap: 10px;
    margin: 0;
    padding: 0;
}
.media i{
    cursor: pointer;
}
.contact{
    flex-direction: column;
}
</style>