<template>
  <div class="gridEncontrar">
  </div>
  <div>
    <h6>Filtrar por Estatus</h6>
    <div class="gridposts">
      <p
        :class="toColor(filter)"
        class="post"
        style="cursor: pointer"
        v-for="filter in filters"
        :key="filter"
        @click="() => filterCentros(filter)"
      >
        {{ filter }}
      </p>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  props: ["filterCentros", "search", "filteredCentros"],

  data() {
    return {
      term: "",
      filters2: [] as [],
    };
  },

};
</script>

<style lang="css" scoped>
h6 {
  text-align: center;
  margin-bottom: 8px;
}
* {
  margin: 0px;
}
.gridposts {
  display: grid;
  gap: 6px;
  grid-template-rows: auto auto;
  grid-template-columns: repeat(auto-fit, minmax(7rem, 1fr));
}

.gridposts > p {
  text-align: center;
  margin: 1px;
  color: white;
  font-size: 70%;
  padding: 5px;
}

/* Esquema de Colores Claros */

.centrodo {
  text-align: center;
  background-color: rgb(248, 105, 107);
  margin: 1px;
  color: white;
}

.RecibidoporAuditoría {
  text-align: center;
  background-color: rgb(250, 148, 115);
  margin: 1px;
  color: white;
}

.VerificadoporAuditoríaInterna {
  text-align: center;
  background-color: rgb(160, 57, 149);
  margin: 1px;
  color: white;
}

.VerificadoporAuditoríaExterna {
  text-align: center;
  background-color: rgb(255, 235, 132);
  margin: 1px;
  color: white;
}

.VerificadoporReclamacionesMédicas {
  text-align: center;
  background-color: rgb(204, 221, 130);
  margin: 1px;
  color: white;
}

.CargadoaLote {
  text-align: center;
  background-color: rgb(152, 206, 127);
  margin: 1px;
  color: white;
}

.EnviadoalaAseguradora {
  text-align: center;
  background-color: rgb(99, 190, 123);
  margin: 1px;
  color: white;
}

/* Esquema de Colores Profundos */

.Todos {
  text-align: center;
  background-color: grey;
  margin: 1px;
  color: white;
}

.gridposts > p:hover {
  box-shadow: 2px 2px 10px rgb(128, 128, 128);
  margin: 1px;
}

.gridEncontrar {
  display: grid;
  grid-auto-flow: dense;
  grid-template-rows: auto auto;
  gap: 4px;
  grid-template-columns: repeat(auto-fit, minmax(17rem, 1fr));
}

.gridEncontrar > div {
  text-align: center;
  margin: 7px;
  margin-bottom: 0px;
}

p {
  margin: 0%;
  border-radius: 7px;
}

a {
  text-decoration: none;
}

input {
  border-radius: 7px;
  margin-top: 0px;
}
</style>
