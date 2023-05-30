<template>
  <div v-if="cargando" class="spin">
    <img
      class="img"
      :src="'https://isys-assets-bucket.s3.amazonaws.com/logos/logo.png'"
    />
  </div>

  <!-- First Implementation -->
  <h1>Fix Register</h1>
  {{ this.statusProceso }} <br />
  <button
    :disabled="cargando"
    @click="iterateRunFixed()"
    class="btn btn-secondary btn-sm"
    type="button"
  >
    Iterate Run Data Fixer
  </button>

  <!-- <button
    :disabled="cargando"
    @click="runFixer()"
    class="btn btn-info btn-sm"
    type="button"
  >
    Run Data Fixer
  </button> -->

  <!-- <button
    :disabled="cargando"
    @click="fetchData()"
    class="btn btn-warning btn-sm"
    type="button"
  >
    Fetch Data
  </button> -->

  <!-- <button @click="deleteKey()" class="btn btn-danger btn-sm" type="button">
    Delete Key
  </button> -->

  <!-- <button @click="putItem()" class="btn btn-success btn-sm" type="button">
    Save New Object
  </button> -->

  <br />
  <br />
  <!-- Second Implementation -->
  {{ this.statusProcesoEncontrarNuevos }} <br />
  {{ this.count }}
  <button
    :disabled="cargando"
    @click="iterateRunFixedEncontrarNuevos()"
    class="btn btn-secondary btn-sm"
    type="button"
  >
    Iterate Run Data Fixer Encontrar Nuevos
  </button>

  <!-- TERCER CORRECTOR DE REGISTROS  -->
  <br />
  <br />
  <!-- Second Implementation -->
  {{ this.statusProcesoCorregirNuevos }} <br />
  {{ this.count }}
  <button
    :disabled="cargando"
    @click="iterateRunFixedCorregirNuevos()"
    class="btn btn-secondary btn-sm"
    type="button"
  >
    Iterate Run Data Fixer Corregir Nuevos
  </button>
</template>

<script lang="ts">
import { getManyByCedula } from "@/services/evaluacion/Evaluacion";

import { getPatient } from "@/services/elderstatistic/UsuarioService";
import {
  getOne,
  create,
  getOneEncontrarNuevos,
} from "@/services/evaluacion/Evaluacion";
import cedulaData from "./cedulas.json";
import pacienteData from "./pacientesNuevos.json";
import evaluacionesData from "./evaluaciones.json";

export default {
  name: "DashboardView",
  components: {},

  data() {
    return {
      count: { news: 0, olds: 0, total: 0 },
      cedulas: cedulaData,
      pacientes: pacienteData,
      evaluaciones: evaluacionesData,
      statusProceso: "No Comenzado",
      statusProcesoEncontrarNuevos: "No Comenzado",
      statusProcesoCorregirNuevos: "No Comenzado",
      evaluacion: {} as any,
      cargando: false,
      cedula: false,
    };
  },

  methods: {
    async iterateRunFixedCorregirNuevos() {
      for (var i = 0; i < this.pacientes.length; i++) {
        await this.runFixerCorregirNuevos(
          this.pacientes[i].cedula,
          this.pacientes[i].fecha
        );
        // alert(`Completado ${i + 1} de ${this.evaluaciones.length}`);
        this.statusProcesoCorregirNuevos = `Completado ${i + 1} de ${
          this.pacientes.length
        }`;
      }
    },

    async iterateRunFixedEncontrarNuevos() {
      for (var i = 0; i < this.cedulas.length; i++) {
        await this.runFixerEncontrarNuevos(this.cedulas[i].cedula);
        // alert(`Completado ${i + 1} de ${this.evaluaciones.length}`);
        this.statusProcesoEncontrarNuevos = `Completado ${i + 1} de ${
          this.cedulas.length
        }`;
      }
    },

    async iterateRunFixed() {
      for (var i = 0; i < this.evaluaciones.length; i++) {
        await this.runFixer(
          this.evaluaciones[i].cedula,
          this.evaluaciones[i].fecha
        );
        // alert(`Completado ${i + 1} de ${this.evaluaciones.length}`);
        this.statusProceso = `Completado ${i + 1} de ${
          this.evaluaciones.length
        }`;
      }
    },

    async runFixerCorregirNuevos(cedula: string, fecha: string) {
      
        await this.fetchData(cedula, fecha);

        // Consulta Evaluaciones Viejas
        const patientData = await getPatient(this.evaluacion.cedula);

        if (patientData.data.title == "Usuario no Encontrado") {
          patientData.data.Items = [];
        }

        // Consulta Evaluaciones Nuevas
        const patientData2 = await getManyByCedula(this.evaluacion.cedula);

        // Uniendo Evaluaciones Viejas y Nuevas
        for (var j = 0; j < patientData2.data.Items.length; j++) {
          patientData.data.Items.push(patientData2.data.Items[j]);
        }

        await this.chageEvaluacion(patientData.data.Items.length - 1);
        await this.putItem();
      
    },

    async runFixerEncontrarNuevos(cedula: string) {
      await this.fetchDataEncontrarNuevos(cedula);
      await this.evaluateCedula();
    },

    async runFixer(cedula: string, fecha: string) {
      await this.fetchData(cedula, fecha);
      // await this.deleteKey();
      await this.chageStatus();
      await this.putItem();
    },

    async putItem() {
      if (this.evaluacion) {
        // await this.toggleLoading();
        try {
          const res = await create(this.evaluacion).then(
            async (res) => {
              // alert(JSON.stringify(res.data));
              this.evaluacion = {};
            },
            (err) => {
              alert(err);
            }
          );
        } catch (error) {
          alert(error);
        }
      }
      // await this.toggleLoading();
    },

    evaluateCedula() {
      if (this.cedula) {
        this.count.news = this.count.news + 1;
      } else {
        this.count.olds = this.count.olds + 1;
      }

      this.count.total = this.count.news + this.count.olds;
    },

    chageEvaluacion(cantEvals: number) {
      if (this.evaluacion) {
        this.evaluacion.cantidadEvaluaciones = cantEvals;
      }
    },

    chageStatus() {
      if (this.evaluacion) {
        this.evaluacion.status = "3";
      }
    },

    deleteKey() {
      if (this.evaluacion) {
        if ("cambiokit" in this.evaluacion) {
          delete this.evaluacion["cambiokit"];
        }
        if ("justificacioncambiokit" in this.evaluacion) {
          delete this.evaluacion["justificacioncambiokit"];
        }
      }
    },

    // toggleLoading() {
    //   this.cargando = !this.cargando;
    // },

    async fetchDataEncontrarNuevos(cedula: string) {
      // this.toggleLoading();
      try {
        const res = await getOneEncontrarNuevos(cedula);
        this.cedula = res.data;
      } catch (error) {
        console.error(error);
      }
      // this.toggleLoading();
    },

    async fetchData(cedula: string, fecha: string) {
      // this.toggleLoading();
      try {
        const res = await getOne(cedula, fecha);
        this.evaluacion = res.data.Items[0];
      } catch (error) {
        console.error(error);
      }
      // this.toggleLoading();
    },
  },
};
</script>

<style lang="css" scoped>
.myrounded-circle {
  border-radius: 50%;
  height: 25px;
  width: 25px;
  /* Hay que formatear imagen antes de guardarla para que esté totalmente cuadrada  como en ws */
}

/* Start Image Upload */
.imagePreviewWrapper {
  width: 430px;
  height: 768px;
  display: block;
  cursor: pointer;
  margin: 0 auto 30px;
  background-size: cover;
  background-position: center center;
}

.bold {
  font-weight: bold;
}

/* .myCard {
  margin: 10px;
} */

.bg-secondary {
  background-color: white;
}

.der {
  text-align: right;
}

.red {
  color: red;
}

.green {
  color: green;
}

/* Start Tabla */
#customers {
  font-family: Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

#customers td {
  border: 1px solid #ddd;
  padding: 3px;
  /* cursor: pointer; */
}

#customers th {
  border: 1px solid #ddd;
  padding: 3px;
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

/* End Tabla */

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

.valor1 {
  text-align: left;
  /* background-color: rgb(255, 0, 0); */
  margin: 1px;
  font-weight: bold;
  color: rgb(255, 0, 0);
}

.valor2 {
  text-align: left;
  /* background-color: rgb(255, 64, 0); */
  margin: 1px;
  font-weight: bold;
  color: rgb(255, 64, 0);
}

.valor3 {
  text-align: left;
  /* background-color: rgb(255, 128, 0); */
  margin: 1px;
  font-weight: bold;
  color: rgb(255, 128, 0);
}

.valor4 {
  text-align: left;
  /* background-color: rgb(255, 192, 0); */
  margin: 1px;
  font-weight: bold;
  color: rgb(255, 192, 0);
}

.valor5 {
  text-align: left;
  /* background-color: rgb(171, 187, 26); */
  margin: 1px;
  font-weight: bold;
  color: rgb(171, 187, 26);
}

.valor6 {
  text-align: left;
  /* background-color: rgb(86, 182, 53); */
  margin: 1px;
  font-weight: bold;
  color: rgb(86, 182, 53);
}

.valor7 {
  text-align: left;
  /* background-color: rgb(0, 176, 80); */
  margin: 1px;
  font-weight: bold;
  color: rgb(0, 176, 80);
}

.ta-r {
  text-align: right;
}
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
  /* cursor: pointer; */
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

p {
  font-size: 75%;
  margin: 0;
}
/* -------------------------------Structure... -------------------------------*/
h4 {
  text-align: center;
}

/* * {
  margin: 0;
} */

.general {
  width: 100%;
  max-width: 1250px;
  margin: 0px auto;
  padding-top: 45px;
  /* background-color: rgb(242, 243, 243); */
}

.grid-small2 {
  display: grid;
  grid-auto-flow: dense;
  grid-template-rows: auto auto;
  gap: 4px;
  grid-template-columns: repeat(auto-fit, minmax(10rem, 1fr));
}
.grid-small {
  display: grid;
  grid-auto-flow: dense;
  grid-template-rows: auto auto;
  gap: 4px;
  grid-template-columns: repeat(auto-fit, minmax(10rem, 1fr));
}

.grid {
  display: grid;
  grid-auto-flow: dense;
  grid-template-rows: auto auto;
  gap: 3px;
  grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
}

.grid-2 {
  display: grid;
  grid-auto-flow: dense;
  grid-template-rows: auto auto;
  gap: 3px;
  grid-template-columns: repeat(auto-fit, minmax(40rem, 1fr));
}
/* -------------------------------**********-------------------------------*/
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
  width: 55px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.imgAfil {
  pointer-events: none;
  width: 150px;
}

.title {
  color: red;
}

.backgrnd {
  background-color: rgb(242, 243, 243);
}
/* -------------------------------**********-------------------------------*/

.card-body {
  overflow-x: scroll;
  margin-top: 10px;
}

.graph {
  overflow-x: scroll;
}
/* graph */
.quiz-chartTip {
  padding: 5px 10px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  background-color: rgba(255, 255, 255, 0.9);
  box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.1);
  position: absolute;
  z-index: 50;
  max-width: 250px;
}

.quiz-graph {
  padding: 10px;
  height: 370px;
  width: 100%;
}

.quiz-graph .x-labels {
  text-anchor: middle;
}

.quiz-graph .y-labels {
  text-anchor: end;
}

.quiz-graph .quiz-graph-grid {
  stroke: #ccc;
  stroke-dasharray: 0;
  stroke-width: 1;
}

.label-title {
  text-anchor: middle;
  text-transform: uppercase;
  font-size: 12px;
  fill: gray;
}

.quiz-graph-dot,
.quiz-graph-start-dot {
  fill: rgba(160, 57, 149, 1);
  stroke-width: 2;
  stroke: white;
}

/* Profile Styles Start */
body {
  background: #eee;
}

.card {
  border: none;

  position: relative;
  overflow: hidden;
  border-radius: 8px;
  cursor: pointer;
}

.card:before {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  width: 4px;
  height: 100%;
  background-color: #e1bee7;
  transform: scaleY(1);
  transition: all 0.5s;
  transform-origin: bottom;
}

.card:after {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  width: 4px;
  height: 100%;
  background-color: #8e24aa;
  transform: scaleY(0);
  transition: all 0.5s;
  transform-origin: bottom;
}

.card:hover::after {
  transform: scaleY(1);
}

.fonts {
  font-size: 11px;
}

.social-list {
  display: flex;
  list-style: none;
  justify-content: center;
  padding: 0;
}

.social-list li {
  padding: 10px;
  color: #8e24aa;
  font-size: 19px;
}

.buttons button:nth-child(1) {
  border: 1px solid #8e24aa !important;
  color: #8e24aa;
  height: 40px;
}

.buttons button:nth-child(1):hover {
  border: 1px solid #8e24aa !important;
  color: #fff;
  height: 40px;
  background-color: #8e24aa;
}

.buttons button:nth-child(2) {
  border: 1px solid #8e24aa !important;
  background-color: #8e24aa;
  color: #fff;
  height: 40px;
}
/* Profile Styles Finish */
</style>
