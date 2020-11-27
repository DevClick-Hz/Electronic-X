<template>
  <footer>
    <div class="foot-info">
    <div class="media">
      <h5>Follow us</h5>
      <div class="social">
      <i class="fab fa-instagram fa-lg"></i>
      <i class="fab fa-twitter fa-lg"></i>
      <i class="fab fa-facebook fa-lg"></i>
      <i class="fab fa-youtube fa-lg"></i>
      </div>
      <p>Download our app</p>
      <div class="stores">
        <img src="../assets/apple-store.svg" alt="">
        <img src="../assets/google-play.svg" alt="">
      </div>
    </div>
    <div class="contact">
      <h5>Find us</h5>
      <p><i class="fas fa-map-marker-alt"></i> Sweden,Stockholm</p>
      <p><i class="fas fa-phone-alt"></i> +467000000000</p>
      <p><i class="fas fa-envelope"></i> info@Electronic-X.com</p>
    </div>
    <div class="support">
      <h5>Help & Support</h5>
      <p>Customer Support</p>
      <p>Return</p>
      <p>Payment</p>
      <p>Delivery</p>
      <p></p>
    </div>
    <div class="Discover">
      <h5>Discover Electronic-X</h5>
      <p>About us</p>
      <p>Career</p>
      <p>privacy policy</p>
      <p></p>
    </div>
    </div>
    <h6>Electronic-X &copy; 2020</h6>
  </footer>
</template>
<script>
export default {
  name: "foot",
};
</script>


<style scoped>
footer {
  background-color: #9d65c9 !important;
  color: white;
  padding: 0.5rem 1rem;
}
.foot-info{
   display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: space-around;
  text-align: left;
  gap: 5px;
  margin: 30px 0;
  padding: 30px 0;
  border-bottom: 1px solid white;
}
footer h5{
  border-bottom: 1px dotted white;
  width: 100%;
}
footer p{
  margin: 0;
}
.media,
.contact,
.Discover,
.support {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
  margin: 0;
  padding: 0;
}
.media i {
  cursor: pointer;
}
.fab{
  margin: 0 3px;
}
.stores img{
  height: 30px;
  width: 30px;
  margin: 0 5px;
}
.stores{
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
}
</style>