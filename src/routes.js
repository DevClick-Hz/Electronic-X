import home from './view/home'
import item from './components/item'
import laptops from './view/laptops'
import phones from './view/phones'
import drones from './view/drones'
import login from './view/login'
import account from './view/account'
export default [
    {path: '/', component: home },
    {path: '/:category/:name',component: item},
    {path: '/laptops', component:laptops},
    {path: '/phones', component:phones},
    {path: '/drones', component:drones},
    {path: '/login',component: login},
    {path: '/account', component: account}
]