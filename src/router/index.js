import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import About from "../views/About.vue";
import Services from "../views/Services.vue";
import Products from "../views/Products.vue";
import ContactUs from "../views/ContactUs.vue";
import SignIn from "../views/SignIn.vue";
import SignUp from "@/views/SignUp.vue";
import Cart from "@/views/Cart.vue";
import Profile from "@/views/Profile.vue";  
import Checkout from "@/views/Checkout.vue";

const routes = [
  { path: "/", name: "Home", component: Home },
  { path: "/about", name: "About", component: About },
  { path: "/services", name: "Services", component: Services },
  { path: "/products", name: "Products", component: Products },
  { path: "/contactus", name: "ContactUs", component: ContactUs },
  { path: "/signin", name: "SignIn", component: SignIn },
  { path: "/signup", name: "SignUp", component: SignUp },
  { path: "/cart", name:"Cart", component: Cart },
  { path: "/profile", name:"Profile" , component: Profile },
  { path: "/checkout", name:"Checkout" , component: Checkout },

];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
