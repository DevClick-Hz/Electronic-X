import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
export const store = new Vuex.Store({
    state: {
        New: [
            {
                name: "Hornet-90",
                price: 750,
                amount: 0,
                requestedAmount: 0,
                stock: 2,
                customerAmount: "",
                pic: require("../assets/drone.jpg"),
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
                name: "Dell laptop",
                price: 300,
                amount: 0,
                requestedAmount: 0,
                stock: 23,
                pic: require("../assets/laptop.jpg"),
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
                category:'laptops'
            },
            {
                name: "hp laptop",
                price: 300,
                amount: 0,
                requestedAmount: 0,
                stock: 23,
                pic: require("../assets/laptop3.jpg"),
                category:'laptops'
            },
            {
                name: "Lenovo laptop",
                price: 300,
                amount: 0,
                requestedAmount: 0,
                stock: 23,
                pic: require("../assets/laptop4.jpg"),
                category:'laptops'
            },
            {
                name: "acer laptop",
                price: 300,
                amount: 0,
                requestedAmount: 0,
                stock: 23,
                pic: require("../assets/laptop2.jpg"),
                category:'laptops'
            },
        ],
        phones:[
            {
                name: "iphone 8",
                price: 300,
                amount: 0,
                requestedAmount: 0,
                stock: 14,
                customerAmount: "",
                pic: require("../assets/phone3.jpg"),
                category:'phones'
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
                name: "iphone 6s",
                price: 300,
                amount: 0,
                requestedAmount: 0,
                stock: 14,
                customerAmount: "",
                pic: require("../assets/iphone.jpg"),
                category:'phones'
            },
            {
                name: "iphone 6s plus",
                price: 300,
                amount: 0,
                requestedAmount: 0,
                stock: 14,
                customerAmount: "",
                pic: require("../assets/phone4.jpg"),
                category:'phones'
            }
        ],
        drones:[
            {
                name: "X-15",
                price: 300,
                amount: 0,
                requestedAmount: 0,
                stock: 2,
                customerAmount: "",
                pic: require("../assets/drone.jpg"),
                category:'drones'
            },
            {
                name: "X-20",
                price: 300,
                amount: 0,
                requestedAmount: 0,
                stock: 2,
                customerAmount: "",
                pic: require("../assets/drone2.jpg"),
                category:'drones'
            },
            {
                name: "Hornet-90",
                price: 750,
                amount: 0,
                requestedAmount: 0,
                stock: 2,
                customerAmount: "",
                pic: require("../assets/drone3.jpg"),
                category:'drones'
            },
            {
                name: "Hornet-60",
                price: 300,
                amount: 0,
                requestedAmount: 0,
                stock: 2,
                customerAmount: "",
                pic: require("../assets/drone4.jpg"),
                category:'drones'
            }
        ],
        cartItems: [],
    },
    mutations: {
        deleteItem (state, ind) {
            state.cartItems.splice(
                state.cartItems.indexOf(ind),
                1
            );
        },
        addItem (state, itm) {
            state.New.push(itm);
        },
    },
    getters: {
        merge(state){
            let allProducts=[];
            allProducts.push(...state.laptops,...state.phones,...state.drones);
            return allProducts;
        }
    },

})
