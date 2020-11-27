import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";
import firebase from 'firebase/app';


Vue.use(Vuex)
export const store = new Vuex.Store({
    plugins: [createPersistedState({
        storage: window.sessionStorage,
    })],
    state: {
        New: [
            {
                name: "Hornet-90",
                price: 1750,
                amount: 0,
                requestedAmount: 0,
                stock: 2,
                customerAmount: "",
                pic: require("../assets/drone3.jpg"),
                category:'drones'
            },
            {
                name: "Hawk-30",
                price: 2750,
                amount: 0,
                requestedAmount: 0,
                stock: 10,
                customerAmount: "",
                pic: require("../assets/drone5.jpg"),
                category:'drones'
            },
            {
                name: "iphoneX",
                price: 300,
                amount: 0,
                requestedAmount: 0,
                stock: 14,
                customerAmount: "",
                pic: require("../assets/phone2.jpg"),
                category:'phones'
            },
            {
                name: "Samsung S20",
                price: 10000,
                amount: 0,
                requestedAmount: 0,
                stock: 14,
                customerAmount: "",
                pic: require("../assets/samsung-s20.jpg"),
                category:'phones'
            },
            {
                name: "Dell laptop",
                price: 30000,
                amount: 0,
                requestedAmount: 0,
                stock: 23,
                pic: require("../assets/laptop.jpg"),
                category:'laptops'
            },
            {
                name: "Samsung laptop",
                price: 23000,
                amount: 0,
                requestedAmount: 0,
                stock: 23,
                pic: require("../assets/samsung-laptop.jpg"),
                category:'laptops'
            }
        ],
        laptops:[
            {
                name: "Dell laptop",
                price: 300,
                amount: 0,
                requestedAmount: 0,
                stock: 23,
                pic: require("../assets/laptop.jpg"),
                category:'laptops',
                reviews:[]
            },
            {
                name: "microsoft laptop",
                price: 33000,
                amount: 0,
                requestedAmount: 0,
                stock: 23,
                pic: require("../assets/microsoft-laptop.jpg"),
                category:'laptops',
                reviews:[]
            },
            {
                name: "hp laptop",
                price: 300,
                amount: 0,
                requestedAmount: 0,
                stock: 23,
                pic: require("../assets/laptop3.jpg"),
                category:'laptops',
                reviews:[]
            },
            {
                name: "Lenovo laptop",
                price: 300,
                amount: 0,
                requestedAmount: 0,
                stock: 23,
                pic: require("../assets/laptop4.jpg"),
                category:'laptops',
                reviews:[]
            },
            {
                name: "acer laptop",
                price: 300,
                amount: 0,
                requestedAmount: 0,
                stock: 23,
                pic: require("../assets/laptop2.jpg"),
                category:'laptops',
                reviews:[]
            },
            {
                name: "Samsung laptop",
                price: 1300,
                amount: 0,
                requestedAmount: 0,
                stock: 23,
                pic: require("../assets/samsung-laptop.jpg"),
                category:'laptops',
                reviews:[]
            }
        ],
        phones:[
            {
                name: "Samsung A20",
                price: 10000,
                amount: 0,
                requestedAmount: 0,
                stock: 14,
                customerAmount: "",
                pic: require("../assets/samsung-a20.jpg"),
                category:'phones',
                reviews:[]
            },
            {
                name: "Samsung S20",
                price: 10000,
                amount: 0,
                requestedAmount: 0,
                stock: 14,
                customerAmount: "",
                pic: require("../assets/samsung-s20.jpg"),
                category:'phones',
                reviews:[]
            },
            {
                name: "iphone 8",
                price: 300,
                amount: 0,
                requestedAmount: 0,
                stock: 14,
                customerAmount: "",
                pic: require("../assets/phone3.jpg"),
                category:'phones',
                reviews:[]
            },
            {
                name: "iphoneX",
                price: 300,
                amount: 0,
                requestedAmount: 0,
                stock: 14,
                customerAmount: "",
                pic: require("../assets/phone2.jpg"),
                category:'phones',
                reviews:[]
            },
            {
                name: "iphone 6s",
                price: 300,
                amount: 0,
                requestedAmount: 0,
                stock: 14,
                customerAmount: "",
                pic: require("../assets/iphone.jpg"),
                category:'phones',
                reviews:[]
            },
            {
                name: "iphone 6s plus",
                price: 300,
                amount: 0,
                requestedAmount: 0,
                stock: 14,
                customerAmount: "",
                pic: require("../assets/phone4.jpg"),
                category:'phones',
                reviews:[]
            }
        ],
        drones:[
            {
                name: "Hawk-30",
                price: 2750,
                amount: 0,
                requestedAmount: 0,
                stock: 10,
                customerAmount: "",
                pic: require("../assets/drone5.jpg"),
                category:'drones',
                reviews:[]
            },
            {
                name: "Hawk-20",
                price: 2750,
                amount: 0,
                requestedAmount: 0,
                stock: 10,
                customerAmount: "",
                pic: require("../assets/drone6.jpg"),
                category:'drones',
                reviews:[]
            },
            {
                name: "X-15",
                price: 300,
                amount: 0,
                requestedAmount: 0,
                stock: 2,
                customerAmount: "",
                pic: require("../assets/drone.jpg"),
                category:'drones',
                reviews:[]
            },
            {
                name: "X-20",
                price: 300,
                amount: 0,
                requestedAmount: 0,
                stock: 2,
                customerAmount: "",
                pic: require("../assets/drone2.jpg"),
                category:'drones',
                reviews:[]
            },
            {
                name: "Hornet-90",
                price: 750,
                amount: 0,
                requestedAmount: 0,
                stock: 2,
                customerAmount: "",
                pic: require("../assets/drone3.jpg"),
                category:'drones',
                reviews:[]
            },
            {
                name: "Hornet-60",
                price: 300,
                amount: 0,
                requestedAmount: 0,
                stock: 2,
                customerAmount: "",
                pic: require("../assets/drone4.jpg"),
                category:'drones',
                reviews:[]
            }
        ],
        guestCart: [],
        userCart:[],
        guestWish:[],
        userWish:[]
    },
    mutations: {
        deleteItem (state, ind) {
            if(state.userCart.length >0){
            state.userCart.splice(
                state.userCart.indexOf(ind),
                1
            );
            }else{
                state.guestCart.splice(
                    state.guestCart.indexOf(ind),
                    1
                )
            }
            
        },
        deleteWish(state,ind){
            if(state.userWish.length >0){
                state.userWish.splice(
                    state.userWish.indexOf(ind),
                    1
                );
                }else{
                    state.guestWish.splice(
                        state.guestWish.indexOf(ind),
                        1
                    )
                }
        },
        addItem (state, itm) {
            state.New.push(itm);
        },
        updateCart(state,userCart){
            state.userCart = userCart;
        }
    },
    actions:{
       loadCart({commit}){
             firebase.auth().onAuthStateChanged((user) => {
                if (user) {
                  const db = firebase.firestore();
                    db.collection('users').get().then(snap=>{
                     snap.forEach(doc=>{
                     if(doc.data().email === user.email){
                         let data = doc.data().userCart;
                      commit('updateCart', data)
                    }
                     })
                 })
                }
                })
        }
    },
    getters: {
        merge(state){
            let allProducts=[];
            allProducts.push(...state.laptops,...state.phones,...state.drones);
            return allProducts;
        }
    },

})
