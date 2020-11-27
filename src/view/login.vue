<template>
  <div class="wrap">
    <b-jumbotron>
      <h2>Login to your Electronic-X account</h2>
      <b-form @submit="onSubmit" @submit.stop.prevent>
        <b-form-input
          id="input-1"
          type="email"
          v-model="user.email"
          required
          placeholder="Enter email"
        ></b-form-input>
        <b-input
          type="password"
          id="text-password"
          v-model="user.password"
          required
          placeholder="Enter your password"
          aria-describedby="password-help-block"
        ></b-input>
        <p v-show="wrong" style="color: red">Your email address or password does not appear to be correct. Please try again.</p>
        <p>email: abc@mail.com
          <br> password:likeaboss</p>
        <b-button type="submit" variant="primary">Login</b-button>
        <p>Forgot your password?</p>
        <p>Not a member ? Create account</p>
      </b-form>
    </b-jumbotron>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        email: "",
        password: "",
      },
      wrong: false
    };
  },
  methods: {
    onSubmit() {
      const auth = this.$firebase.auth();
      auth.signInWithEmailAndPassword(this.user.email, this.user.password).then(cred=>{
        cred
        this.$router.push("/account");
      }).catch(err=>{
        this.wrong = true
        return err
      })
      this.$store.state.userCart = [];
    },
  },
};
</script>

<style scoped>
.wrap {
  background-color: rgb(245, 245, 245);
  padding: 50px 0;
}
@media screen and (max-width: 576px) {
  .jumbotron {
    width: 90% !important;
  }
}
.jumbotron {
  width: 50%;
  margin: 0 auto;
  background-color: rgb(255, 255, 255);
  padding: 2rem 1rem;
}
h2{
  width: 70%;
  margin: 0 auto;
}
.form-control {
  margin: 10px auto;
  width: 65%;
}
p {
  margin: 10px 0;
}
.btn-primary{
  background-color: #9d65c9;
  border: none;
  outline: none;
}
.btn-primary:focus {
  border: none;
  outline: none;
  box-shadow: none;
}
.btn-primary:hover{
  background-color: #5d54a4;
}
.btn-primary:active{
   background-color: #9d65c9 !important;
  border: none;
  outline: none;
  box-shadow: none !important;
}
.form-control:focus{
  box-shadow: none;
  border-color: #ced4da;
}
</style>