<template>
  <div>
    <listado-categorias></listado-categorias>
    <mapa-establecimientos></mapa-establecimientos>
    <categoria-cafe></categoria-cafe>
    <categoria-restaurant></categoria-restaurant>
    <categoria-hotel></categoria-hotel>
  </div>
</template>

<script>
import CategoriaCafe from "./CategoriaCafe";
import ListadoCategorias from "./ListadoCategorias";
import MapaEstablecimientos from "./MapaEstablecimientos";
import CategoriaHotel from "./CategoriaHotel";
import CategoriaRestaurant from "./CategoriaRestaurant";

export default {
  components: {
    ListadoCategorias,
    MapaEstablecimientos,
    CategoriaCafe,
    CategoriaHotel,
    CategoriaRestaurant,
  },
};
</script>
