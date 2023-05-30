<template>
  <div class="general">
    <div class="flex-container">
      <!-- <img class="timbrado" :src="'https://isys-assets-bucket.s3.amazonaws.com/logos/logoSQR.png'" /> -->
      <div class="encabezado">
        <h3 class="titulocentro">
          Clínica Cruz Jiminián
        </h3>
        <h5 class="titulocentro">
          Av. Ortega y Gasset, No. 90, Santo Domingo, Rep. Dom.
        </h5>
        <h5 class="titulocentro">
          809-566-2271
        </h5>
        <h5 class="titulocentro">
          RNC: 101149868
        </h5>
      </div>
      <div class="encabezado" style="margin-top: 18px">
        <h4 class="titulocentro">Fecha: {{ formatDate(this.fechaActual) }}</h4>
        <h4 class="titulocentro">Hora: {{ formatTime(this.fechaActual) }}</h4>
        <h4 class="titulocentro">Factura No.: {{ this.evaluacion.facNo }}</h4>
      </div>
    </div>

    <div class="form-group">
      <label class="form-label"
        ><b>{{ this.titulo }}</b></label
      >

      <label class="form-label2"><b>Datos del Prestador</b></label>
      <div class="grid">
        <p class="field">
          <span class="bold">NOMBRE: </span>{{ evaluacion.nombre }}
        </p>
        <p class="field">
          <span class="bold">APELLIDO: </span>{{ evaluacion.apellido }}
        </p>
        <p class="field">
          <span class="bold">SEXO: </span>{{ evaluacion.sexo }}
        </p>
        <p class="field">
          <span class="bold">CEDULA: </span>{{ evaluacion.cedula }}
        </p>
        <p class="field"><span class="bold">NSS: </span>{{ evaluacion.nss }}</p>
        <p class="field">
          <span class="bold">REGIMEN: </span>{{ evaluacion.regimen }}
        </p>
        <p class="field">
          <span class="bold">TELEFONO: </span>{{ evaluacion.telefono }}
        </p>
        <p class="field">
          <span class="bold">TIPO DE CONTACTO: </span
          >{{ evaluacion.tipo_de_contacto }}
        </p>
        <p class="field">
          <span class="bold">NOMBRE DE CONTACTO: </span
          >{{ evaluacion.nombre_contacto }}
        </p>
        <p class="field">
          <span class="bold">UNAP: </span>{{ evaluacion.unap }}
        </p>
        <p class="field">
          <span class="bold">REGION: </span>{{ evaluacion.region }}
        </p>
        <p class="field">
          <span class="bold">PROVINCIA: </span>{{ evaluacion.provincia }}
        </p>
        <p class="field">
          <span class="bold">MUNICIPIO: </span>{{ evaluacion.municipio }}
        </p>
        <p class="field">
          <span class="bold">ESTADO: </span>{{ evaluacion.estado }}
        </p>
        <p class="field">
          <span class="bold">TALLA: </span>{{ evaluacion.talla }}
        </p>
        <p class="field">
          <span class="bold">PESO: </span>{{ evaluacion.peso }}
        </p>
        <p class="field">
          <span class="bold">CINTURA: </span>{{ evaluacion.cintura }}
        </p>
        <p class="field">
          <span class="bold">ABDOMEN: </span>{{ evaluacion.abdomen }}
        </p>
        <p class="field">
          <span class="bold">CADERA: </span>{{ evaluacion.cadera }}
        </p>
        <p class="field">
          <span class="bold">ALTURA DE RODILLA: </span
          >{{ evaluacion.altura_rodilla }}
        </p>
        <p class="field">
          <span class="bold">CINTURA / CADERA: </span
          >{{ evaluacion.Cintura / Cadera }}
        </p>
        <p class="field">
          <span class="bold">PRESION ARTERIAL SISTOLICA: </span
          >{{ evaluacion.presion_arterial_sistolica }}
        </p>
        <p class="field">
          <span class="bold">PRESION ARTERIAL DIASTOLICA: </span
          >{{ evaluacion.presion_arterial_diatolica }}
        </p>
        <p class="field">
          <span class="bold">FRECUENCIA CARDIACA: </span
          >{{ evaluacion.frecuencia_cardiaca }}
        </p>
        <p class="field">
          <span class="bold">FUERZA: </span>{{ evaluacion.fuerza }}
        </p>
        <p class="field"><span class="bold">IMC: </span>{{ evaluacion.imc }}</p>
        <p class="field">
          <span class="bold">FLEXIBILIDAD MIEMBROS SUPERIORES: </span
          >{{ evaluacion.flexibilidad_miembro_superior }}
        </p>
        <p class="field">
          <span class="bold">FLEXIBILIDAD MIEMBROS INFERIORES: </span
          >{{ evaluacion.flexibilidad_miembro_inferior }}
        </p>
        <p class="field">
          <span class="bold">PLIEGUE DE BICEPS: </span
          >{{ evaluacion.pliegue_bicep }}
        </p>
        <p class="field">
          <span class="bold">PLIEGUE ABDOMINAL: </span
          >{{ evaluacion.pliegue_abdominal }}
        </p>
        <p class="field">
          <span class="bold">PLIEGUE SUBESCAPULAR: </span
          >{{ evaluacion.pliegue_sub }}
        </p>
        <p class="field">
          <span class="bold">ENCAMADO: </span>{{ evaluacion.Encamado }}
        </p>
        <p class="field">
          <span class="bold">EDENTULO: </span>{{ evaluacion.Edentulo }}
        </p>
        <p class="field">
          <span class="bold">VIVE SOLO: </span>{{ evaluacion["vive solo"] }}
        </p>
        <p class="field">
          <span class="bold">ABANDONO: </span>{{ evaluacion.abandono }}
        </p>
        <p class="field">
          <span class="bold">MALTRATO: </span>{{ evaluacion.maltrato }}
        </p>
        <p class="field">
          <span class="bold">EXCESO DE MEDICAMENTO: </span
          >{{ evaluacion["exceso medicamento"] }}
        </p>
        <p class="field">
          <span class="bold">PSIQUIATRIA: </span
          >{{ evaluacion.specialist_appo_psiqui }}
        </p>
        <p class="field">
          <span class="bold">GERIATRIA: </span
          >{{ evaluacion.specialist_appo_geria }}
        </p>
        <p class="field">
          <span class="bold">ORTOPEDIA: </span
          >{{ evaluacion.specialist_appo_orto }}
        </p>
        <p class="field">
          <span class="bold">GASTROENTEROLOGIA: </span
          >{{ evaluacion.specialist_appo_gastro }}
        </p>
        <p class="field">
          <span class="bold">OFTALMOLOGIA: </span
          >{{ evaluacion.specialist_appo_oftal }}
        </p>
        <p class="field">
          <span class="bold">PSICOLOGIA: </span
          >{{ evaluacion.specialist_appo_psicolo }}
        </p>
        <p class="field">
          <span class="bold">NEUROLOGIA: </span
          >{{ evaluacion.specialist_appo_neurolo }}
        </p>
        <p class="field">
          <span class="bold">FISIATRIA: </span
          >{{ evaluacion.specialist_appo_fisia }}
        </p>
        <p class="field">
          <span class="bold">CARDIOLOGIA: </span
          >{{ evaluacion.specialist_appo_cardio }}
        </p>
        <p class="field">
          <span class="bold">ODONTOLOGIA: </span
          >{{ evaluacion.specialist_appo_odonto }}
        </p>
        <p class="field">
          <span class="bold">UROLOGIA: </span
          >{{ evaluacion.specialist_appo_urolo }}
        </p>
        <p class="field">
          <span class="bold">DIABETOLOGIA: </span
          >{{ evaluacion.specialist_appo_diabe }}
        </p>
        <p class="field">
          <span class="bold">ANDADOR DE 4 RUEDAS: </span
          >{{ evaluacion["Andador 4 Ruedas"] }}
        </p>
        <p class="field">
          <span class="bold">ANDADOR DE 4 PATAS: </span
          >{{ evaluacion["Andador 4 Patas"] }}
        </p>
        <p class="field">
          <span class="bold">BASTON: </span>{{ evaluacion.Bastón }}
        </p>
        <p class="field">
          <span class="bold">BASTON DE 4 PATAS: </span
          >{{ evaluacion["Bastón 4 P"] }}
        </p>
        <p class="field">
          <span class="bold">BASTON BLANCO (NO VIDENTE): </span
          >{{ evaluacion["Bastón No VIdente"] }}
        </p>
        <p class="field">
          <span class="bold">CAMA DE POSICION: </span
          >{{ evaluacion["Cama de Posición"] }}
        </p>
        <p class="field">
          <span class="bold">COLCHON DE AIRE: </span
          >{{ evaluacion["Colchón Aire"] }}
        </p>
        <p class="field">
          <span class="bold">FAJA ABDOMINAL: </span
          >{{ evaluacion["Faja Obdominal"] }}
        </p>
        <p class="field">
          <span class="bold">GLUCOMETRO: </span>{{ evaluacion.Glucómetro }}
        </p>
        <p class="field">
          <span class="bold">INODORO PORTATIL: </span
          >{{ evaluacion["Inodoro Porta"] }}
        </p>
        <p class="field">
          <span class="bold">MULETAS: </span>{{ evaluacion.Muletas }}
        </p>
        <p class="field">
          <span class="bold">PAMPERS XL: </span>{{ evaluacion["Pampers XL"] }}
        </p>
        <p class="field">
          <span class="bold">PAMPERS L: </span>{{ evaluacion["Pampers L"] }}
        </p>
        <p class="field">
          <span class="bold">PAMPERS M: </span>{{ evaluacion["Pampers M"] }}
        </p>
        <p class="field">
          <span class="bold">PAMPERS S: </span>{{ evaluacion["Pampers S"] }}
        </p>
        <p class="field">
          <span class="bold">SILLA DE BAÑO: </span
          >{{ evaluacion["Silla de Baño"] }}
        </p>
        <p class="field">
          <span class="bold">MEDIA DE COMPRESION: </span
          >{{ evaluacion["Media de Comprensión"] }}
        </p>
        <p class="field">
          <span class="bold">FECHA: </span>{{ evaluacion.fecha }}
        </p>
        <p class="field"><span class="bold">KIT: </span>{{ evaluacion.kit }}</p>
        <p class="field">
          <span class="bold">NOMBRE DEL DOCTOR: </span
          >{{ evaluacion.nombre_doctor }}
        </p>
        <!-- <p class="field">
          <span class="bold">COMENTARIO: </span>{{ evaluacion.comentary }}
        </p> -->
        <p class="field">
          <span class="bold">EVALUACION NUTRICIONAL 1: </span
          >{{ evaluacion.eval_nutri_1 }}
        </p>
        <p class="field">
          <span class="bold">EVALUACION NUTRICIONAL 2: </span
          >{{ evaluacion.eval_nutri_2 }}
        </p>
        <p class="field">
          <span class="bold">EVALUACION NUTRICIONAL 3: </span
          >{{ evaluacion.eval_nutri_3 }}
        </p>
        <p class="field">
          <span class="bold">EVALUACION NUTRICIONAL 4: </span
          >{{ evaluacion.eval_nutri_4 }}
        </p>
        <p class="field">
          <span class="bold">EVALUACION NUTRICIONAL 5: </span
          >{{ evaluacion.eval_nutri_5 }}
        </p>
        <p class="field">
          <span class="bold">EVALUACION NUTRICIONAL 6: </span
          >{{ evaluacion.eval_nutri_6 }}
        </p>
        <p class="field">
          <span class="bold">EVALUACION NUTRICIONAL 7: </span
          >{{ evaluacion.eval_nutri_7 }}
        </p>
        <p class="field">
          <span class="bold">EVALUACION NUTRICIONAL 8: </span
          >{{ evaluacion.eval_nutri_8 }}
        </p>
        <p class="field">
          <span class="bold">EVALUACION NUTRICIONAL 9: </span
          >{{ evaluacion.eval_nutri_9 }}
        </p>
        <p class="field">
          <span class="bold">EVALUACION NUTRICIONAL 10: </span
          >{{ evaluacion.eval_nutri_10 }}
        </p>
        <p class="field">
          <span class="bold">FECHA DE NACIMIENTO: </span
          >{{ evaluacion.fechaNacimiento }}
        </p>
        <p class="field">
          <span class="bold">EDAD: </span>{{ evaluacion.edad }}
        </p>
        <p class="field">
          <span class="bold">DIRECCION: </span>{{ evaluacion.direccion }}
        </p>
        <p class="field">
          <span class="bold">STATUS: </span>{{ evaluacion.status }}
        </p>
        <p class="field">
          <span class="bold">ID CENTRO: </span>{{ evaluacion.id_center }}
        </p>
        <!-- <p class="field">
          <span class="bold">ID PACIENTE: </span>{{ evaluacion.id_patient }}
        </p> -->
        <!-- <p class="field">
          <span class="bold">ID EVALUACION: </span>{{ evaluacion.id_form }}
        </p> -->
        <!-- <p class="field">
          <span class="bold">ID DOCTOR: </span>{{ evaluacion.id_doctor }}
        </p> -->
      </div>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <div class="flex-container2">
        <div>
          <p class="field bold">________________________________</p>
          <p class="field bold">Firma y Sello del PSS</p>
        </div>
        <div>
          <p class="field bold">________________________________</p>
          <p class="field bold">Firma del Familiar o Paciente</p>
        </div>
      </div>
      <br />
      <br />
      <br />
      <div>
        <p class="field clausule">
          Por este medio autorizo a la CLINICA CRUZ JIMINIAN, a suministrar toda
          información que sea solicitada por {{ this.evaluacion.nombARS }},
          correspondiente a todo tratamiento, servicio, estudio, laboratorio,
          diagnóstico o beneficios prestador a mi favor.
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Evaluacion } from "@/interfaces/Evaluacion";
import {
  deleteEvaluacion,
  getEvaluacion,
  updateEvaluacion,
} from "@/services/elderstatistic/Evaluacion";
import numeral from "numeral";
import moment from "moment";

export default defineComponent({
  name: "evaluacion-list",
  data() {
    return {
      titulo: "",
      fechaActual: new Date(),
      cargando: false,
      evaluacion: {} as Evaluacion,
    };
  },
  methods: {
    formatDate(dateValue: Date) {
      let out = moment(dateValue).add(0, "days");
      return moment(out).format("D/MM/yyyy");
    },

    numeroAFecha(numeroDeDias: any, esExcel = false) {
      var diasDesde1900 = esExcel ? 25567 + 1 : 25567 + 2;

      // 86400 es el número de segundos en un día, luego multiplicamos por 1000 para obtener milisegundos.
      return new Date((numeroDeDias - diasDesde1900) * 86400 * 1000);
    },

    toPrint() {
      window.print();
    },
    toggleLoading() {
      this.cargando = !this.cargando;
    },
    formatSecuence(value: number) {
      return numeral(value).format("00000000");
    },

    formatNumber(value: number) {
      return numeral(value).format("0,0.00");
    },

    formatNumber2(value: number) {
      return numeral(value).format("00000000");
    },

    // formatDate(dateValue: Date) {
    //   let out = moment(dateValue).add(0, "h");
    //   return moment(out).format("D/MM/yyyy");
    // },

    formatTime(dateValue: Date) {
      let out = moment(dateValue).add(0, "h");
      return moment(out).format("hh:mm a");
    },

    formatDate2(dateValue: Date) {
      let out = moment(dateValue).add(0, "h");
      return moment(out).format("D/MM/yyyy");
    },

    async loadEvaluacion(id: string) {
      this.toggleLoading();
      try {
        const { data } = await getEvaluacion(id);
        this.evaluacion = data;
      } catch (error) {
        //console.error(error);
      }
      await this.toggleLoading();
      this.toPrint();

      if (this.$store.state.ids.length == 0) {
        this.$router.push(`/dashboard`);
      } else {
        this.$router.push(`/evaluacionslot/new`);
      }

      this.$router.push(`/evaluacions/${this.evaluacion._id}`);
    },
    async handleUpdate() {
      try {
        if (typeof this.$route.params.id === "string") {
          await updateEvaluacion(this.$route.params.id, this.evaluacion);
          this.$router.push("/evaluacions");
        }
      } catch (error) {
        //console.error(error);
      }
    },
    async handleDelete() {
      try {
        if (typeof this.$route.params.id === "string") {
          deleteEvaluacion(this.$route.params.id);
          this.$router.push("/evaluacions");
        }
      } catch (error) {
        //console.error(error);
      }
    },
  },
  mounted() {
    this.evaluacion = this.$store.state.user.defaultStatus[
      this.$route.params.index
    ];
    this.evaluacion.fecha = this.numeroAFecha(this.evaluacion.fecha);
    this.evaluacion.fecha = this.formatDate(this.evaluacion.fecha);
  },

  updated() {
    if (this.evaluacion.tipo == "med") {
      this.titulo = "Reclamación por Honorarios Médicos";
    } else {
      this.titulo = "Reclamación por Servicios";
    }
  },

  // beforeUnmount() {
  //   this.toPrint();
  // }
});
</script>

<style lang="css" scoped>
.clausule {
  font-size: 30%;
}
.flex-container {
  display: flex;
  flex-wrap: wrap;
}

.flex-container2 {
  justify-content: space-between;
  display: flex;
  /* gap: 120px; */
}

.firma {
  display: block;
  /* margin-left: auto; */
  /* margin-right: auto; */
  width: 250px;
  /* height: 25%; */
  margin-bottom: 10px;
}

.timbrado {
  display: block;
  margin-left: 10px;
  margin-right: 10px;
  /* margin-right: auto; */
  width: 80px;
  height: 80px;
  /* height: 10%; */
  margin-bottom: 10px;
  margin-top: 10px;
}

.footer {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  /* background-color: rgb(4, 0, 102); */
  margin-bottom: 7px;
  /* color: white; */
  text-align: center;
}

.encabezado {
  /* background-color: rgb(4, 0, 102); */
  /* margin-bottom: 7px; */
  padding: 10px;
}

h3,
h4,
h5,
h6 {
  text-align: center;
  color: rgb(4, 0, 102);
  margin: 0;
  font-size: 95%;
}

.titulocentro {
  /* font-size: 150%; */
  text-align: left;
}
.field {
  font-size: 80%;
  margin-left: 10px;
}

.field-grande {
  font-size: 95%;
}
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
  box-shadow: 0px 1px 10px rgba(0, 0, 0, 0.4);
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

.orange {
  background-color: orange;
}

.yellow {
  background-color: yellow;
}

/* <!----------------------------------------------------------------------------------------------------------> */

.general {
  width: 100%;
  max-width: 750px;
  margin: 0px auto;
}

.grid {
  display: grid;
  grid-auto-flow: dense;
  grid-template-rows: auto auto;
  gap: 3px;
  grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr));
}

.grid-3 {
  display: grid;
  grid-auto-flow: dense;
  grid-template-rows: auto auto;
  gap: 3px;
  grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr));
}
/* .grid-timbrado {
  display: grid;
  grid-auto-flow: dense;
  grid-template-rows: auto auto;
  gap: 0px;
  grid-template-columns: repeat(auto-fit, minmax(50%, 1fr));
} */

.grid-2 {
  display: grid;
  grid-auto-flow: dense;
  grid-template-rows: auto auto;
  gap: 3px;
  grid-template-columns: repeat(auto-fit, minmax(50%, 1fr));
}

/* h4 {
  background-color: grey;
  color: white;
  text-align: center;
  box-shadow: 2px 2px 10px rgb(199, 199, 199);
} */

/* h5 {
  font-size: 90%;
  color: rgb(147, 147, 147);
  font-weight: bold;
  text-align: center;
} */

form {
  /* text-align:center;   */
  /* background-color: white; */
  /* box-shadow: 2px 2px 10px rgb(199, 199, 199); */
  /* border-radius: 4px; */
  padding: 2%;
}

legend {
  color: rgb(4, 0, 102);
  text-align: center;
}

input,
select,
textarea {
  border-radius: 7px;
  margin-bottom: 3px;
  width: 100%;
  padding: 10px;
  font-size: 75%;
}

legend {
  margin: 0;
}

.form-label {
  /* background-color: rgb(220, 220, 220); */
  width: 100%;
  /* background-color: #cfd0d1; */
  /* text-align: left; */
  color: rgb(4, 0, 102);
  /* border-radius: 7px; */
  font-size: 110%;
  margin-top: 20px;
  /* padding-left: 10px; */
}

.form-label2 {
  /* background-color: rgb(220, 220, 220); */
  width: 100%;
  background-color: #cfd0d1;
  text-align: left;
  /* color: rgb(4, 0, 102); */
  /* border-radius: 7px; */
  /* font-size: 110%; */
  margin-top: 20px;
  margin-bottom: 10px;
  padding-left: 10px;
}

.ta-l {
  text-align: left;
}

label {
  text-align: center;
}

.col-form-label {
  font-weight: bold;
  line-height: 0;
}

/* button {
  background-color: rgb(147, 147, 147);
  color: white;
  width: 100%;
  border-radius: 4px;
  margin-top: 30px;
} */

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
  border-bottom-color: rgb(4, 0, 102);
  border-radius: 50%;
  content: "";
  height: 90px;
  width: 90px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate3d(-50%, -50%, 0);
  will-change: transform;
}

.img {
  pointer-events: none;
  /* opacity: 0.7; */
  width: 80px;
  position: absolute;
  top: 50%;
  /* left: 50%; */
  transform: translate(-50%, -50%);
}
/* -------------------------------**********-------------------------------*/

.input-r {
  text-align: right;
}

.error {
  color: white;
  text-align: center;
  margin-top: 20px;
  margin-bottom: 20px;
  background-color: rgb(255, 85, 85);
}

.success {
  color: white;
  text-align: center;
  margin-top: 20px;
  margin-bottom: 20px;
  background-color: rgb(0, 255, 0);
}

p {
  font-size: 130%;
  margin: 0;
}

.bold {
  font-weight: bold;
}
</style>
