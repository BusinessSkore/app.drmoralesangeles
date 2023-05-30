<template v-show="!cargando">
  <div class="backgrnd">
    <!-- Spinner -->
    <Transition>
      <div v-if="cargando" class="spin">
        <img
          class="img"
          :src="'https://isys-assets-bucket.s3.amazonaws.com/logos/logo.png'"
        />
      </div>
    </Transition>
    <Navbar />
    <!------------------------------------------------ General ------------------------------------------------->
    <div v-show="!cargando" class="general">
      <div v-if="showModalAseguradoras" class="modal7">
        <div class="contenedor7">
          <header>
            Seleccione el Centro
          </header>
          <div class="contenido7">
            <div class="contenido7">
              <div>
                <input
                  id="search"
                  type="search"
                  v-model="searchField"
                  class="form-control"
                  placeholder="Introduzca el nombre del centro"
                  @keypress="buscar()"
                />
              </div>
              <div>
                <table id="customers">
                  <tr>
                    <th>NOMBRE</th>
                    <th>REGION</th>
                    <th>PROVINCIA</th>
                    <!-- <th>TELEFONO</th> -->
                  </tr>
                  <tr
                    v-for="(centro, index) in this.$store.state.user
                      .filteredCentros"
                    :key="index"
                    @click="setCentro(centro)"
                  >
                    <td>{{ centro.unap }}</td>
                    <td>{{ centro.region }}</td>
                    <td>{{ centro.provincia }}</td>
                    <!-- <td>{{ centro.telefono }}</td> -->
                  </tr>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="main">
          <!-- Modal -->

          <div v-if="showModal" class="modal">
            <div class="contenedor">
              <header>Filtros</header>
              <div class="contenido">
                <label @click="this.showModalMethod()" for="btn-modal">X</label>
                <div class="contenido">
                  <Filters
                    :filterEvaluacions="filterEvaluacions"
                    :search="search"
                    :filteredEvaluacions="filteredEvaluacions"
                  />
                </div>
              </div>
            </div>
          </div>

          <!-- Cuerpo -->
          <div class="card bg-secondary">
            <div class="card-body">
              <div>
                <!-- <div class="line"></div> -->
                <div class="grid">
                  <div class="evaluacions">
                    <div class="grid-fields">
                      <div>
                        <h4>
                          Evaluacionesadfdsfs ({{ evaluacions.length }})
                          <i
                            style="cursor:pointer"
                            @click="this.loadEvaluacionsOnly()"
                            class="fas fa-sync-alt"
                            _mstvisible="2"
                          ></i>
                        </h4>
                        <a
                          v-show="this.evaluacions.length"
                          class="navbar-option"
                          @click="this.$router.push('/printEvaluacionsSpprts')"
                          href="#"
                          ><i class="fas fa-print"></i> Imprimir Soportes</a
                        >
                      </div>
                      <div>
                        <label
                          class="ta-l col-form-label col-form-label-sm"
                          for="desde"
                          >Fecha:</label
                        ><input
                          id="desde"
                          type="date"
                          @change="loadEvaluacions()"
                          v-model="criterio.desde"
                          class="form-control"
                        />
                      </div>
                      <!-- <div>
                        <label
                          class="ta-l col-form-label col-form-label-sm"
                          for="desde"
                          >Centro:</label
                        >

                        <select
                          disabled
                          id="id_center"
                          type="id_center"
                          @change="loadEvaluacions()"
                          @focus="this.showModalAseguradorasMethod()"
                          v-model="this.$store.state.user.id_center"
                          class="form-control"
                        >
                          <option
                            v-for="(centro, index) in this.$store.state.user
                              .centros"
                            :key="index"
                            :value="centro.id_center"
                            >{{ centro.unap }}</option
                          >
                        </select>
                      </div> -->
                      <!-- <div>
                        <label
                          style="color: white"
                          class="ta-l col-form-label col-form-label-sm"
                          for="desde"
                          >-</label
                        >

                        <button
                          style="height: 40px"
                          class="btn btn-outline-success px-4"
                          @click="this.showModalAseguradorasMethod()"
                        >
                          Seleccionar Centro
                        </button>
                      </div> -->
                      <!-- <div>
                        <label
                          class="ta-l col-form-label col-form-label-sm"
                          for="desde"
                          >Orden:</label
                        ><select
                          id="orden"
                          type="orden"
                          @change="sortEvaluacions()"
                          v-model="this.$store.state.user.orden"
                          class="form-select"
                        >
                          <option>ASCENDENTE</option>
                          <option>DESCENDENTE</option>
                        </select>
                      </div> -->
                      <!-- <div>
                        <div class="radios">
                          <p style="margin: 0" for="eval_nutri_1">
                            Orden:
                          </p>
                          <div class="form-check grid-radio">
                            <div>
                              <input
                                id="true_radio_eval_nutri_1"
                                @change="sortEvaluacions()"
                                class="form-check-input"
                                type="radio"
                                v-model="this.$store.state.user.orden"
                                value="ASCENDENTE"
                              /><label
                                class="form-check-label"
                                for="true_radio_eval_nutri_1"
                                >ASCENDENTE</label
                              >
                            </div>
                            <div>
                              <input
                                @change="sortEvaluacions()"
                                id="false_radio_eval_nutri_1"
                                class="form-check-input"
                                type="radio"
                                v-model="this.$store.state.user.orden"
                                value="DESCENDENTE"
                              /><label
                                class="form-check-label"
                                for="false_radio_eval_nutri_1"
                                >DESCENDENTE</label
                              >
                            </div>
                          </div>
                        </div>
                      </div> -->
                    </div>
                    <div class="mycard-body">
                      <table id="customers">
                        <!-- <th>NO.</th> -->
                        <th>NO.</th>
                        <th>CEDULA</th>
                        <th>NOMBRE</th>
                        <th>APELLIDO</th>
                        <th>EDAD</th>
                        <!-- <th>NSS</th> -->
                        <!-- <th>AFILIACION</th> -->
                        <th>EVALUADO</th>
                        <tr
                          @click="goToEval(evaluacion)"
                          v-for="(evaluacion, index) in evaluacions"
                          :key="index"
                        >
                          <td>{{ evaluacion.order }}</td>
                        </tr>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!---------------------------------------------------------------------------------------------------------->
</template>

<script lang="ts">
import Filters from "@/components/Evaluacion/FiltersComponent.vue";
import ListadoComponent from "@/components/Evaluacion/ListComponent.vue";
import Navbar from "@/components/Navbar.vue";
import moment from "moment";
import { Evaluacion } from "@/interfaces/Evaluacion";
import { getManyByDateOnly } from "@/services/evaluacion/Evaluacion";
import { getAll } from "@/services/centro/Centro";
import Pusher from "pusher-js";

export default {
  name: "App",

  components: {
    Filters,
    // ListadoComponent,
    Navbar,
  },

  data() {
    return {
      searchField: "",
      showModalAseguradoras: false,
      filteredCentros: [] as any,
      centros: [] as any,
      criterio: {} as any,
      navMenuClas2: ["menu-navegacion2"],
      player: new Audio(),
      showModal: false,
      cargando: false,
      evaluacions: [] as Evaluacion[],
      evaluacionsFiltradas: [] as Evaluacion[],
      str: "",
      type: "",
    };
  },

  methods: {
    uniqueValues(data: any) {
      let result = data.filter((item: any, index: any) => {
        return data.indexOf(item) === index;
      });

      alert(result);
    },
    setCentro(centro: any) {
      this.$store.state.user.currentCentro = centro;
      this.$store.state.user.unap = centro.unap;
      this.$store.state.user.region = centro.region;
      this.$store.state.user.provincia = centro.provincia;
      this.$store.state.user.municipio = centro.municipio;
      this.$store.state.user.id_center = centro.id_center;
      this.$store.state.user.id_center = centro.id_center;
      this.loadEvaluacionsOnly();
      this.showModalAseguradorasMethod();
      this.search = "";
      this.lockCentro = true;
    },

    buscar(term: string) {
      this.$store.state.user.filteredCentros = this.$store.state.user.centros;
      if (term !== "") {
        this.$store.state.user.filteredCentros = this.$store.state.user.centros.filter(
          (centro: any) => {
            return centro.unap
              .toLowerCase()
              .includes(this.searchField.toLowerCase());
          }
        );
      }
    },

    showModalAseguradorasMethod() {
      this.showModalAseguradoras = !this.showModalAseguradoras;
    },

    async loadServsByEsp() {
      this.toggleLoading();
      this.toggleLoading();
    },

    fixTime() {
      if (this.criterio.desde) {
        this.criterio.desde = this.formatDateToFix(this.criterio.desde, false);
      }
      if (this.$store.state.user.desde) {
        this.$store.state.user.desde = this.formatDateToFix(
          this.$store.state.user.desde,
          false
        );
      }
    },

    formatDateToFix(dateValue: Date) {
      let out = moment(dateValue).add(0, "h");
      return moment(out).format("yyyy-MM-DD");
    },

    hamburger(texto: string) {
      switch (texto) {
        case "Aseguradoras":
          this.$router.push("/aseguradoras");
          break;
        case "Especialistas":
          this.$router.push("/especialistas");
          break;
        case "Evaluacions":
          this.$router.push("/evaluacions");
          break;
        case "Productos":
          this.$router.push("/productos");
          break;
        case "Dashboard":
          this.$router.push("/dashboard");
          break;
        case "Usuarios":
          this.$router.push("/usuarios");
          break;
        case "Mejoras":
          this.$router.push("/mejoras");
          break;
        case "Cerrar Sesión":
          this.salir();
          break;
      }
      if (this.navMenuClas.length == 1) {
        this.navMenuClas.push("spread");
        this.desplegar = "fas fa-caret-up";
      } else {
        this.navMenuClas.pop();
        this.desplegar = "fas fa-caret-down";
      }
    },

    pusherSubscribe() {
      // Start pusher subscribe
      var pusher = new Pusher("d7b50b87118775ed0b11", {
        cluster: "us2",
      });

      var channel = pusher.subscribe("my-channel");
      channel.bind("my-event", (data: any) => {
        this.loadEvaluacions2();
        // this.player.src = this.song.src;
        // this.player.play();
      });
      // End pusher subscribe
    },

    showModalMethod() {
      this.showModal = !this.showModal;
    },

    toggleLoading() {
      this.cargando = !this.cargando;
    },

    async search(term: string) {
      this.toggleLoading();

      this.toggleLoading();
    },

    sortEvaluacions() {
      if (this.$store.state.user.orden == "ASCENDENTE") {
        this.evaluacionsFiltradas = this.evaluacionsFiltradas.sort(
          (a: any, b: any) => a.order - b.order
        );
      } else {
        this.evaluacionsFiltradas = this.evaluacionsFiltradas.sort(
          (a: any, b: any) => b.order - a.order
        );
      }
    },

    async loadCentros() {
      this.toggleLoading();
      try {
        const res = await getAll();
        this.$store.state.user.centros = res.data.centros;
        this.$store.state.user.filteredCentros = res.data.centros;
      } catch (error) {
        console.error(error);
      }

      // this.sortEvaluacions();

      this.toggleLoading();
    },

    async loadEvaluacionsOnly() {
      this.$store.state.user.desde = this.criterio.desde;
      this.criterio.id_centerKit = this.$store.state.user.id_center;
      // this.criterio.id_centerKit = "303"
      this.toggleLoading();
      try {
        const res = await getManyByDateOnly(this.criterio.desde);
        this.evaluacions = res.data.evaluaciones.Items;
        // this.evaluacionsFiltradas = res.data.response.Items;
        // this.$store.state.user.listToPrint = res.data.response.Items;
      } catch (error) {
        console.error(error);
      }

      this.sortEvaluacions();

      this.toggleLoading();
    },
  },

  mounted() {
    // let data = ["Ronnald", "Ronnald", "Anabel"];
    // this.uniqueValues(data);

    if (!this.$store.state.user.id_center) {
      this.loadCentros();
      // this.showModalAseguradorasMethod();
    }

    if (!this.$store.state.user.orden) {
      this.$store.state.user.orden = "ASCENDENTE";
    }

    if (!this.$store.state.user.desde) {
      // alert('No hay fecha')
      this.criterio.desde = new Date();
      this.$store.state.user.desde = new Date();
      this.fixTime();
    } else {
      // alert('Si hay fecha')
      this.criterio.desde = this.$store.state.user.desde;
      this.loadEvaluacionsOnly();
    }
  },
};
</script>

<style lang="css" scoped>
/* Tabla */
#customers {
  font-family: Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

#customers td,
#customers th {
  border: 1px solid #ddd;
  padding: 3px;
  cursor: pointer;
}

#customers tr:nth-child(even) {
  background-color: #f2f2f2;
}

#customers tr:hover {
  background-color: #ddd;
}

#customers th {
  padding-top: 8px;
  padding-bottom: 8px;
  text-align: center;
  background-color: rgb(82, 45, 109);
  color: white;
}

td,
th {
  font-size: 75%;
}

/* Modal 7 */

#search {
  margin-top: 35px;
}

.modal7 {
  z-index: 100;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  /* background: rgba(5, 24, 250, 0.1); */
  transition: all 500ms ease;
  overflow-y: scroll;
}

.contenedor7 {
  width: 350px;
  height: 350px;
  overflow-y: scroll;
  margin: auto;
  background: #fff;
  box-shadow: 1px 7px 25px rgba(5, 24, 250, 0.6);
  transition: all 500ms ease;
  position: relative;
}

.contenedor7 header {
  padding: 10px;
  background: rgb(82, 45, 109);
  color: #fff;
  position: fixed;
  width: 350px;
}

.contenedor7 label {
  position: absolute;
  top: 10px;
  right: 10px;
  color: #fff;
  font-size: 15px;
  cursor: pointer;
}

.contenido7 {
  padding: 7px;
}

.ars {
  margin: 0%;
  font-size: 12px;
}

/* End Modal */

.btn {
  width: 100%;
  height: 45%;
  font-size: 75%;
}
.mycard-body {
  overflow-x: scroll;
  margin-top: 10px;
}

.grid-fields {
  display: grid;
  grid-auto-flow: dense;
  grid-template-rows: auto auto;
  gap: 3px;
  grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr));
}

.line {
  width: 100%;
  /* max-width: 1200px; */
  margin: 0 auto;
  height: 2px;
  background: rgb(82, 45, 109);
  /* background: rgb(160, 57, 149); */
  /* margin-bottom: 60px; */
}

.cardOpciones {
  position: fixed;
  /* width: 15%; */
}
.row {
  display: flex;
  flex-wrap: wrap;
}

.side {
  flex: 15%;
  /* background-color: #f1f1f1; */
  /* padding: 20px; */
}

/* Main column */
.main {
  flex: 85%;
  /* background-color: white; */
  /* padding: 20px; */
}

@media screen and (max-width: 700px) {
  .row {
    flex-direction: column;
  }

  .cardOpciones {
    position: fixed;
    /* z-index: 100; */
    /* top: 0; */
  }
}

* {
  box-sizing: border-box;
}

.equis {
  position: absolute;
  top: 7px;
  right: 10px;
  color: rgb(0, 0, 0);
  font-size: 12px;
  cursor: pointer;
}

/* Responsiveness */
/* @media screen and (max-width: 800px) {
  .menu-navegacion2 {
    width: 50vw;
  }
} */

/* @media screen and (max-width: 500px) {
  .menu-navegacion2 {
    width: 65vw;
  }
} */

.navbar-option:hover {
  color: rgb(160, 57, 149);
  font-size: 16px;
  font-weight: bold;
}

.navbar-option {
  margin: 7px;
  font-size: 15px;
  /* color: white; */
  /* font-family: "Agency FB Bold"; */
  text-decoration: none;
}

/* Menú Lateral Fijo*/

.menu-navegacion2 {
  /* position: fixed; */
  /* top: 34px; */
  /* left: 0; */
  /* width: 15vw; */
  /* height: 100%; */
  /* background-image: linear-gradient(
    180deg,
    rgb(255, 255, 255) 0%,
    rgb(255, 255, 255) 100%
  ); */
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: left;
  /* transition: transform 0.3s ease-in-out; */
  /* transform: translate(0%); */
  /* box-shadow: 0 0 6px rgba(35, 47, 62, 0.5); */
  z-index: 100;
  /* padding-left: 10px; */
  padding-top: 0px;
  /* overflow-y: scroll; */
}

/* -------------------------------Loading... -------------------------------*/

@keyframes spinner {
  0% {
    transform: translate3d(-50%, -50%, 0) rotate(0deg);
  }
  100% {
    transform: translate3d(-50%, -50%, 0) rotate(360deg);
  }
}
.spin::before {
  animation: 1.5s linear infinite spinner;
  animation-play-state: inherit;
  border: solid 5px #cfd0d1;
  border-bottom-color: rgb(160, 57, 149);
  border-radius: 50%;
  content: "";
  height: 70px;
  width: 70px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate3d(-50%, -50%, 0);
  will-change: transform;
}

.img {
  pointer-events: none;
  /* opacity: 0.7; */
  width: 55px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
/* -------------------------------**********-------------------------------*/

.general {
  width: 100%;
  flex: 70%;
  max-width: 1500px;
  margin: 0px auto;
  padding-top: 45px;
}

.grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: auto auto;
  gap: 1em;
  grid-template-areas:
    "filters filters filters filters filters filters filters"
    "evaluacions evaluacions evaluacions evaluacions evaluacions evaluacions evaluacions";
}

.grid .filters {
  grid-area: filters;
  background-color: rgb(250, 250, 250);
  /* box-shadow: 2px 2px 10px rgb(199, 199, 199); */
  border-radius: 7px;
}

.grid .evaluacions {
  grid-area: evaluacions;
  /* background-color: rgb(255, 255, 255); */
  /* box-shadow: 2px 2px 10px rgb(199, 199, 199); */
  /* border-radius: 7px; */
  padding-top: 0px;
}

h4 {
  /* background-color: rgb(100, 100, 100); */
  /* border-radius: 7px; */
  color: rgb(65, 65, 65);
  /* font-size: 75%; */
  /* text-align: center; */
  /* box-shadow: 2px 2px 10px rgb(199, 199, 199); */
}

.subTitle {
  /* background-color: rgb(100, 100, 100); */
  /* border-radius: 7px; */
  color: rgb(65, 65, 65);
  font-size: 75%;
  text-align: center;
  /* box-shadow: 2px 2px 10px rgb(199, 199, 199); */
}

/* <!-------------------------------------------------- Menú --------------------------------------------------> */

* {
  box-sizing: border-box;
}

#btn-mas {
  display: none;
}
.container {
  position: fixed;
  bottom: 0%;
  left: 80%;
  z-index: 100;
}
.redes a,
.btn-mas label {
  display: block;
  text-decoration: none;
  color: #fff;
  width: 55px;
  height: 55px;
  line-height: 55px;
  text-align: center;
  border-radius: 50%;
  box-shadow: 0px 1px 10px rgba(5, 24, 250, 0.4);
  transition: all 500ms ease;
}
.redes a:hover {
  background: #fff;
  color: #2780e3;
}
.redes a {
  margin-bottom: -15px;
  opacity: 0;
  visibility: hidden;
}
#btn-mas:checked ~ .redes a {
  margin-bottom: 10px;
  opacity: 1;
  visibility: visible;
}
.btn-mas label {
  cursor: pointer;
  background: #2780e3;
  font-size: 23px;
}
#btn-mas:checked ~ .btn-mas label {
  transform: rotate(135deg);
  font-size: 25px;
  background-color: grey;
}

.green {
  background-color: green;
}

.red {
  background-color: red;
}

.blue {
  background-color: blue;
}

.yellow {
  background-color: orange;
}

/* <!----------------------------------------------------------------------------------------------------------> */

/* Modal */
.modal {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  /* background: rgba(5, 24, 250, 0.1); */
  transition: all 500ms ease;
}

.contenedor {
  width: 400px;
  height: 300;
  margin: auto;
  background: #fff;
  box-shadow: 1px 7px 25px rgba(5, 24, 250, 0.6);
  transition: all 500ms ease;
  position: relative;
}

.contenedor header {
  padding: 10px;
  background: rgb(147, 147, 147);
  color: #fff;
}

.contenedor label {
  position: absolute;
  top: 10px;
  right: 10px;
  color: #fff;
  font-size: 15px;
  cursor: pointer;
}

.contenido {
  padding: 7px;
}

/* End Modal */

/* Start Transition */
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
/* End Transition */

.backgrnd {
  background-color: rgb(242, 243, 243);
}
</style>
