import { createRouter, createWebHistory } from "vue-router";
import CountryDetailsPage from "../pages/CountryDetailsPage";
import CountriesPage from "../pages/CountriesPage";

const routes = [
  {
    path: "/country/:id",
    name: "CountryDetailsPage",
    component: CountryDetailsPage,
    props: true
  },
  {
    path: "/",
    name: "CountriesPage",
    component: CountriesPage,
    props: true
  }
];

const router = createRouter({
  history: createWebHistory(''),
  routes
});

export default router;