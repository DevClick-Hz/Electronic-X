import home from './view/home'
import item from './components/item'
import laptops from './view/laptops'
import phones from './view/phones'
import drones from './view/drones'
export default [
    {path: '/', component: home },
    {path: '/:category/:name',component: item},
    {path: '/laptops', component:laptops},
    {path: '/phones', component:phones},
    {path: '/drones', component:drones}
]