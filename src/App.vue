<template>
  <div id="app">
    <!-----------------------------------------navbar------------------------------------------------>
    <navbar></navbar>
        <div class="search-bar">
          <input type="text" v-model="search" placeholder="Search for a product">
        </div>
    <router-view :search="search"></router-view>
    <checkout></checkout>
    <foot></foot>
  </div>
</template>

<script>
import foot from "./components/foot"
import navbar from './components/navbar'
import checkout from './components/checkout'
export default {
  name: "App",
  data() {
    return {
      search: "",
    };
  },
  components: {foot , navbar, checkout},
};
</script>

<style>
html,
body {
  margin: 0;
  padding: 0;
  position: relative;
  min-height: 100vh;
}
html {
  background-color: #fafafa;
}
#nav .router-link-active {
  color: white !important;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin: 0;
  padding: 0;
  width: 100%;
  font-family: "Faustina", serif;
}
button {
  border: none;
}
.tab {
  text-decoration: none !important;
  color: rgb(189, 189, 189);
}
.tab:hover {
  color: white;
}
p {
  margin: 0;
}
img {
  display: block;
  height: 100%;
  width: 100%;
}

.products {
  margin-top: 100px !important;
}
a {
  color: rgb(44, 44, 44);
  text-decoration: none;
}

.checkout {
  width: 100%;
  position: fixed;
  left: 0;
  top: 0;
  height: 100vh;
  list-style: none;
  background-color: rgb(255, 255, 255, 0.7);
  z-index: 10;
}
.checkout h2 {
  text-align: right;
  margin: 10px 20px;
  color: rgb(255, 0, 0);
  cursor: pointer;
}
.inner-cont {
  width: 80%;
  height: 100%;
  margin: 0 auto;
  background-color: rgb(240, 240, 240);
  overflow: scroll;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  padding: 3rem 1rem;
}
.check-items,
.Address {
  width: 40%;
  margin: 0;
  background-color: white;
  border-radius: 5px;
  padding: 10px 20px;
  margin: 2rem 0;
}
.check-items li {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
  padding: 10px;
  border-bottom: 1px dotted black;
}
.check-items img {
  display: block;
  height: 120px;
  width: 30%;
}
.order-overview {
  width: 40%;
  margin: 2rem 0;
  background-color: white;
  border-radius: 5px;
  padding: 10px 20px;
}
.cost {
  display: flex;
  justify-content: space-around;
  border-bottom: 1px dotted black;
  width: 60%;
  margin: 20px auto;
}
.payment input {
  border: 2px solid lightgray;
  border-radius: 10px;
  height: 35px;
  text-align: center;
}
.payment {
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  width: 40%;
  background-color: white;
  padding: 10px 20px;
  text-align: left;
  gap: 10px;
  border-radius: 5px;
  margin: 2rem 0;
}
.payment button {
  background-color: rgb(0, 228, 0);
  width: 35%;
  border-radius: 10px;
  color: white;
  margin: 0 auto;
}
.address-form {
  display: flex;
  justify-content: space-between;
  gap: 10px;
  text-align: left;
}
.form-left,
.form-right {
  display: flex;
  flex-direction: column;
}
input{
  outline: none;
}
.search-bar input{
  width: 100%;
  border: none;
  padding: 0 20px;
}
</style>
