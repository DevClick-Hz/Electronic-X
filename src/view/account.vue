<template>
  <div class="wrap">
    <b-jumbotron>
      <div class="logout">
        <h4>Welcome! {{ theUser.firstName }} {{ theUser.lastName }}</h4>
        <b-button variant="primary" @click="logout">Logout <i class="fas fa-sign-out-alt fa-lg"></i></b-button>
      </div>
      <p style="color: red"> the changes made on this account won't be saved as its a test account only and it will reset after refreshing the page</p>
      <b-avatar :src="theUser.profilePic" size="6em"></b-avatar>
      <b-tabs content-class="mt-3" fill>
        <b-tab title="My profile" active>
          <div class="info">
            <div class="info-label">
              <p>profile picture</p>
              <b-button v-b-toggle.collapse-1 class="m-1">Change</b-button>
            </div>
            <b-collapse id="collapse-1">
              <b-card>
                <p>profile picture:</p>
               <b-form-file id="form-image" :disabled="busy" @change="fileSelected" accept="image/*"></b-form-file>
                <b-button variant="primary" v-b-toggle.collapse-1 @click="fileUpload">Save changes</b-button>
              </b-card>
            </b-collapse>
          </div>
          <div class="info">
            <div class="info-label">
              <p>email</p>
              <p>{{ theUser.email }}</p>
              <b-button v-b-toggle.collapse-2 class="m-1">Change</b-button>
            </div>
            <b-collapse id="collapse-2">
              <b-card>
                <p>new email:</p>
                <input type="email" v-model="email" required/>
                <b-button variant="primary" v-b-toggle.collapse-2 @click="saveChange('email',email)" :disabled="!checkEmail">Save changes</b-button>
              </b-card>
            </b-collapse>
          </div>
          <div class="info">
            <div class="info-label">
              <p>password</p>
              <b-button v-b-toggle.collapse-3 class="m-1">Change</b-button>
            </div>
            <b-collapse id="collapse-3">
              <b-card>
                <p>new password:</p>
                <input type="text" v-model="password" required/>
                <b-button variant="primary" v-b-toggle.collapse-3 @click="saveChange('password',password)" :disabled="!password">Save changes</b-button>
              </b-card>
            </b-collapse>
          </div>

          <div class="info">
            <div class="info-label">
              <p>first name</p>
              <p>{{ theUser.firstName }}</p>
              <b-button v-b-toggle.collapse-4 class="m-1">Change</b-button>
            </div>
            <b-collapse id="collapse-4">
              <b-card>
                <p>first name:</p>
                <input type="text"  v-model="firstName" required/>
                <b-button variant="primary" v-b-toggle.collapse-4 @click="saveChange('firstName',firstName)" :disabled="!firstName">Save changes</b-button>
              </b-card>
            </b-collapse>
          </div>

          <div class="info">
            <div class="info-label">
              <p>last name</p>
              <p>{{ theUser.lastName }}</p>
              <b-button v-b-toggle.collapse-5 class="m-1">Change</b-button>
            </div>
            <b-collapse id="collapse-5">
              <b-card >
                <p>last name:</p>
                <input type="text" v-model="lastName" required/>
                <b-button type="submit" variant="primary" v-b-toggle.collapse-5 @click="saveChange('lastName',lastName)" :disabled="!lastName">Save changes</b-button>
              </b-card>
            </b-collapse>
          </div>

          <div class="info">
            <div class="info-label">
              <p>address</p>
              <b-button v-b-toggle.collapse-6 class="m-1">Change</b-button>
            </div>
            <b-collapse id="collapse-6">
              <b-card>
                <p>country:</p>
                <input type="text" v-model="country"/>
            <b-button variant="primary" @click="saveChange('country',country)" :disabled="!country">Save changes</b-button>
              </b-card>
              <b-card>
                <p>city:</p>
                <input type="text" v-model="city"/>
                <b-button variant="primary" @click="saveChange('city',city)" :disabled="!city">Save changes</b-button>
              </b-card>
            </b-collapse>
          </div>
        </b-tab>
        <b-tab title="My orders"><p>you don't have any orders</p></b-tab>
      </b-tabs>
    </b-jumbotron>
  </div>
</template>

<script>
import firebase from 'firebase/app';
export default {
  name: 'account',
  data() {
    return {
      theUser: {

      },
      email: "",
      password: "",
      firstName: "",
      lastName: "",
     city: "",
     country: "",
     busy: false,
     avatar: null,
     profilePic: null
    };
  },
  computed:{
    checkEmail() {
     var re = /\S+@\S+\.\S+/;
     let check = false
        if(re.test(this.email) && this.email){
          check = true
        }else{
          check = false
        }
        return check
     }
  },
  methods: {
    logout() {
      const auth = this.$firebase.auth();
      auth.signOut().then(()=>{
        this.$router.push("/");
      })
  },
  saveChange(field ,info){
    firebase.auth().onAuthStateChanged((user) => {
            if (user) {
              const db = this.$firebase.firestore();
                db.collection('users').get().then(snap=>{
                 snap.forEach(doc=>{
                 if(doc.data().email === user.email){
                  this.theUser[field] = info;
                  this[field] = '';
                  /*let docu= doc.id;
                  db.collection('users').doc(docu).update({[field]: info});
                  if(field === 'email'){
                    user.updateEmail(`${info}`);
                  }*/     
                 }
                 })
             })
            }else{
              return "error"
            }
        })
  },
   fileSelected(event){
     this.avatar = event.target.files[0];
   },
   fileUpload(){
    const user = firebase.auth().currentUser;
    const storageRef=firebase.storage().ref(user.uid + '/profilePicture/' + this.avatar.name).put(this.avatar);
      storageRef.on(`state_changed`,snapshot=>{
        this.uploadValue = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
      }, error=>{console.log(error.message)},
      ()=>{this.uploadValue=100;
        storageRef.snapshot.ref.getDownloadURL().then((url)=>{
         this.profilePic = url;
         const db = this.$firebase.firestore();
                db.collection('users').get().then(snap=>{
                 snap.forEach(doc=>{
                 if(doc.data().email === user.email){
                   let docu = doc.id;
                   db.collection('users').doc(`${docu}`).update({"profilePic": url});
                   this.theUser.profilePic = url
                }
                 })
             })
        });
      }      
      )
    }
  },
 async mounted() {
     await firebase.auth().onAuthStateChanged((user) => {
            if (user) {
              const db = this.$firebase.firestore();
                db.collection('users').get().then(snap=>{
                 snap.forEach(doc=>{
                 if(doc.data().email === user.email){
                  this.theUser = doc.data();
                }
                 })
             })
            }else{
              return "error"
            }
        })
  },
};
</script>

<style scoped>
.b-avatar{
  margin: 15px 0;
}
.custom-file{
  width: 199px;
}
.wrap {
  background-color: rgb(245, 245, 245);
  padding: 50px 0;
}
@media screen and (max-width: 576px) {
  .jumbotron {
    width: 90% !important;
  }
  .card-body{
    flex-direction: column;
    gap: 30px;
  }
  .card-body p{
    width: 100% !important;
    text-align: center;
  }
}
.jumbotron {
  width: 50%;
  margin: 0 auto;
  background-color: rgb(255, 255, 255);
  padding: 2rem 1rem;
}
.info {
  border-bottom: 1px solid rgb(212, 212, 212);
}
.info-label {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.form-group{
  margin: 0;
  width: 37%;
}
.card-body {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  text-align: left;
}
.card-body p {
  margin: 0 !important;
  width: 20%;
}
.card {
  margin: 5px auto;
  border: none;
}
.logout {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
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
p{
  margin: 0;
}
.btn-secondary{
  margin: 10px 0 !important;
  background-color: white;
  border: 1px solid black;
  color: black;
  border-radius: 0;
}
.btn-secondary:focus, .btn-secondary:active{
  box-shadow: none !important;
  background-color: white !important;
  color: black !important;
}
.btn-secondary:hover{
  background-color: rgb(245, 245, 245) !important;
}
</style>