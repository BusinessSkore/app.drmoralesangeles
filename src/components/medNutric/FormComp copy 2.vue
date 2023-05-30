<template>
  <div>
    <div>
      <Navbar />
      <Transition>
        <div v-if="cargando" class="spin">
          <img class="img" :src="'https://isys-assets-bucket.s3.amazonaws.com/logos/logo.png'" />
        </div>
      </Transition>

      <div v-if="showModalAseguradoras" class="modal7">
        <div class="contenedor7">
          <header>
            Aseguradoras
          </header>
          <div class="contenido7">
            <div class="contenido7">
              <div>
                <input
                  id="search"
                  type="search"
                  v-model="search"
                  class="form-control"
                  @keypress="buscar()"
                />
              </div>
              <div>
                <p
                  class="ars"
                  style="cursor: pointer"
                  v-for="(seguro, index) in seguros2"
                  :key="index"
                  @click="setSeguro(seguro)"
                >
                  {{ seguro }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-show="!cargando" class="general">
        <!-- <h6 :class="isError(error)">{{ error }}</h6> -->
        <form>
          <fieldset>
            <h3>Hoja de Evaluación</h3>
            <h6>{{ encabezado }}</h6>
            <label class="form-label"><b>Datos Generales</b></label>
            <div class="grid">
              <div>
                <p class="field">
                  <span class="bold">NOMBRE: </span>{{ evaluacion.nombre }}
                </p>
              </div>
              <p class="field">
                <span class="bold">APELLIDO: </span>{{ evaluacion.apellido }}
              </p>
              <p class="field">
                <span class="bold">SEXO: </span>{{ evaluacion.sexo }}
              </p>
              <p class="field">
                <span class="bold">CEDULA: </span>{{ evaluacion.cedula }}
              </p>
              <p class="field">
                <span class="bold">NSS: </span>{{ evaluacion.nss }}
              </p>
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
            </div>
            <label class="form-label"><b>Ubicación</b></label>
            <div class="grid-1">
              <p class="field">
                <span class="bold">REGION: </span>{{ evaluacion.region }}
              </p>
              <p class="field">
                <span class="bold">PROVINCIA: </span>{{ evaluacion.provincia }}
              </p>
              <p class="field">
                <span class="bold">MUNICIPIO: </span>{{ evaluacion.municipio }}
              </p>
            </div>
            <label class="form-label"><b>Resumen</b></label>
            <div class="grid">
              <p class="field">
                <span class="bold">ESTADO: </span>{{ evaluacion.estado }}
              </p>
            </div>
            <label class="form-label"><b>Medidas Antropométricas</b></label>
            <div class="grid">
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
                >{{ evaluacion["Cintura/Cadera"] }}
              </p>
            </div>
            <label class="form-label"><b>Evaluaciones Funcionales</b></label>
            <div class="grid">
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
              <p class="field">
                <span class="bold">IMC: </span>{{ evaluacion.imc }}
              </p>
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
            </div>
            <label class="form-label"
              ><b>Situación Actual del Paciente</b></label
            >
            <div class="grid">
              <p class="field">
                <span class="bold">ENCAMADO: </span>{{ evaluacion.Encamado }}
              </p>
              <p class="field">
                <span class="bold">EDENTULO: </span>{{ evaluacion.Edentulo }}
              </p>
              <p class="field">
                <span class="bold">VIVE SOLO: </span
                >{{ evaluacion["vive solo"] }}
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
            </div>
            <label class="form-label"><b>Especialidades</b></label>
            <div class="grid">
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
            </div>
            <label class="form-label"><b>Necesidades</b></label>
            <div class="grid">
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
                <span class="bold">GLUCOMETRO: </span
                >{{ evaluacion.Glucómetro }}
              </p>
              <p class="field">
                <span class="bold">INODORO PORTATIL: </span
                >{{ evaluacion["Inodoro Porta"] }}
              </p>
              <p class="field">
                <span class="bold">MULETAS: </span>{{ evaluacion.Muletas }}
              </p>
              <p class="field">
                <span class="bold">PAMPERS XL: </span
                >{{ evaluacion["Pampers XL"] }}
              </p>
              <p class="field">
                <span class="bold">PAMPERS L: </span
                >{{ evaluacion["Pampers L"] }}
              </p>
              <p class="field">
                <span class="bold">PAMPERS M: </span
                >{{ evaluacion["Pampers M"] }}
              </p>
              <p class="field">
                <span class="bold">PAMPERS S: </span
                >{{ evaluacion["Pampers S"] }}
              </p>
              <p class="field">
                <span class="bold">SILLA DE BAÑO: </span
                >{{ evaluacion["Silla de Baño"] }}
              </p>
              <p class="field">
                <span class="bold">MEDIA DE COMPRESION: </span
                >{{ evaluacion["Media de Comprensión"] }}
              </p>
            </div>
            <label class="form-label"><b>Evaluación</b></label>
            <div class="grid">
              <p class="field">
                <span class="bold">FECHA: </span>{{ evaluacion.fecha }}
              </p>
              <p class="field">
                <span class="bold">KIT: </span>{{ evaluacion.kit }}
              </p>
              <p class="field">
                <span class="bold">NOMBRE DEL DOCTOR: </span
                >{{ evaluacion.nombre_doctor }}
              </p>
              <!-- <p class="field">
                <span class="bold">COMENTARIO: </span>{{ evaluacion.comentary }}
              </p> -->
            </div>
            <label class="form-label"><b>Evaluación Nutricional</b></label>
            <div class="grid-2">
              <p class="field">
                <span class="bold">1.¿TIENE ALGUNA ENFERMEDAD O CONDICIÓN QUE LE HA HECHO CAMBIAR LA CLASE O LA CANTIDAD DE ALIMENTO QUE CONSUME?</span
                >{{ evaluacion.eval_nutri_1 }}
              </p>
              <p class="field">
                <span class="bold">2.¿COME MENOS DE 2 COMIDAS AL DÍA?  </span
                >{{ evaluacion.eval_nutri_2 }}
              </p>
              <p class="field">
                <span class="bold">3.¿COME POCAS FRUTAS, VEGETALES O PRODUCTOS DE LECHE? </span
                >{{ evaluacion.eval_nutri_3 }}
              </p>
              <p class="field">
                <span class="bold">4.¿TOMA TRES O MÁS BEBIDAS DE CERVEZA, LICORES O VINO CASI TODOS LOS DÍAS? </span
                >{{ evaluacion.eval_nutri_4 }}
              </p>
              <p class="field">
                <span class="bold">5.¿TIENE PROBLEMAS CON LOS DIENTES O LA BOCA QUE LE DIFICULTAN COMER? </span
                >{{ evaluacion.eval_nutri_5 }}
              </p>
              <p class="field">
                <span class="bold">6.¿SIEMPRE TIENE SUFICIENTE DINERO PARA COMPRAR LOS ALIMENTOS QUE NECESITAS? </span
                >{{ evaluacion.eval_nutri_6 }}
              </p>
              <p class="field">
                <span class="bold">7.¿COME A SOLAS LA MAYOR PARTE DE LAS VECES? </span
                >{{ evaluacion.eval_nutri_7 }}
              </p>
              <p class="field">
                <span class="bold">8.¿TOMA AL DÍA TRES O MÁS MEDICINAS DIFERENTES, CON O SIN RECETA? </span
                >{{ evaluacion.eval_nutri_8 }}
              </p>
              <p class="field">
                <span class="bold">9.¿HA GANADO O PERDIDO PESO, SIN QUERER, 4,5 KG (10 LIBRAS) EN LOS ÚLTIMOS 6 MESES?</span
                >{{ evaluacion.eval_nutri_9 }}
              </p>
              <p class="field">
                <span class="bold">10.¿FÍSICAMENTE PUEDE IR DE COMPRAS, COCINAR O ALIMENTARSE?</span
                >{{ evaluacion.eval_nutri_10 }}
              </p>

              <!-- <div>
                <label
                  class="ta-l col-form-label col-form-label-sm"
                  for="fechaNacimiento"
                  >FECHA DE NACIMIENTO:</label
                ><input
                  id="fechaNacimiento"
                  type="Number"
                  v-model="evaluacion.fechaNacimiento"
                  class="form-control"
                />
              </div>
              <div>
                <label class="ta-l col-form-label col-form-label-sm" for="edad"
                  >EDAD:</label
                ><input
                  id="edad"
                  type="Number"
                  v-model="evaluacion.edad"
                  class="form-control"
                />
              </div>
              <div>
                <label
                  class="ta-l col-form-label col-form-label-sm"
                  for="direccion"
                  >DIRECCION:</label
                ><input
                  id="direccion"
                  type="direccion"
                  v-model="evaluacion.direccion"
                  class="form-control"
                />
              </div> -->
            </div>
            <!-- <label class="form-label"><b>Datos Internos</b></label>
            <div class="grid">
              <div>
                <label
                  class="ta-l col-form-label col-form-label-sm"
                  for="status"
                  >STATUS:</label
                ><input
                  id="status"
                  type="status"
                  v-model="evaluacion.status"
                  class="form-control"
                />
              </div>
              <div>
                <label
                  class="ta-l col-form-label col-form-label-sm"
                  for="id_center"
                  >ID CENTRO:</label
                ><input
                  id="id_center"
                  type="id_center"
                  v-model="evaluacion.id_center"
                  class="form-control"
                />
              </div>
              <div>
                <label
                  class="ta-l col-form-label col-form-label-sm"
                  for="id_patient"
                  >ID PACIENTE:</label
                ><input
                  id="id_patient"
                  type="id_patient"
                  v-model="evaluacion.id_patient"
                  class="form-control"
                />
              </div>
              <div>
                <label
                  class="ta-l col-form-label col-form-label-sm"
                  for="id_form"
                  >ID EVALUACION:</label
                ><input
                  id="id_form"
                  type="id_form"
                  v-model="evaluacion.id_form"
                  class="form-control"
                />
              </div>
              <div>
                <label
                  class="ta-l col-form-label col-form-label-sm"
                  for="id_doctor"
                  >ID DOCTOR:</label
                ><input
                  id="id_doctor"
                  type="id_doctor"
                  v-model="evaluacion.id_doctor"
                  class="form-control"
                />
              </div>
            </div> -->

            <button
              v-if="this.modoForm == 'add'"
              class="btn btn-primary"
              @click.prevent="saveEvaluacion()"
              :disabled="
                !evaluacion.facNo ||
                  !evaluacion.nombPres ||
                  !evaluacion.codPres ||
                  !evaluacion.aut ||
                  !evaluacion.fechAutor ||
                  !evaluacion.nombARS ||
                  !evaluacion.autPor ||
                  !evaluacion.montRec ||
                  !evaluacion.nombPac ||
                  !evaluacion.cedu ||
                  !evaluacion.aflNSS ||
                  !evaluacion.sex ||
                  !evaluacion.edad ||
                  !evaluacion.dir ||
                  !evaluacion.dx
              "
            >
              <i class="fas fa-save"></i> Guardar
            </button>

            <button
              v-if="this.modoForm == 'show'"
              class="btn btn-success"
              @click.prevent="handleUpdate()"
              :disabled="
                !evaluacion.facNo ||
                  !evaluacion.nombPres ||
                  !evaluacion.codPres ||
                  !evaluacion.aut ||
                  !evaluacion.fechAutor ||
                  !evaluacion.nombARS ||
                  !evaluacion.autPor ||
                  !evaluacion.montRec ||
                  !evaluacion.nombPac ||
                  !evaluacion.cedu ||
                  !evaluacion.aflNSS ||
                  !evaluacion.sex ||
                  !evaluacion.edad ||
                  !evaluacion.dir ||
                  !evaluacion.dx
              "
            >
              <i class="fas fa-save"></i> Actualizar
            </button>

            <button
              v-if="this.modoForm == 'show'"
              class="btn btn-warning"
              @click="this.$router.push(`/evaluacions2/${evaluacion._id}`)"
            >
              <i class="fas fa-print"></i> Imprimir
            </button>

            <button
              v-if="showDelete"
              class="btn btn-danger"
              @click.prevent="handleDelete()"
            >
              <i class="fas fa-trash-alt"></i> Eliminar
            </button>
          </fieldset>
        </form>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Navbar from "@/components/Navbar.vue";
import { defineComponent } from "vue";
import { Evaluacion } from "@/interfaces/Evaluacion";
// import { Funcion } from "@/interfaces/Funcion";
// import { Vitola } from "@/interfaces/Vitola";
// import { Evaluacion } from "@/interfaces/Evaluacion";
// import {
//   getPeg,
//   getMez,
//   getEmp,
// } from "@/services/elderstatistic/Evaluacion";
// import { getLigas } from "@/services/cruzjiminiancj/Liga";
import {
  // createEvaluacion,
  eliminateEvaluacions,
  // createEvaluaciona,
  getOneEvaluacion,
  deleteEvaluacion,
  getEvaluacion,
  updateEvaluacion,
} from "@/services/elderstatistic/Evaluacion";
// import { getVitolas } from "@/services/cruzjiminiancj/Vitola";
// import { getFuncions } from "@/services/cruzjiminiancj/Funcion";
import { createMensaje } from "@/services/cruzjiminiancj/ChatService";
import { getEvaluacions } from "@/services/elderstatistic/Evaluacion";
import numeral from "numeral";
import moment from "moment";
// import Pusher from "pusher-js";

export default defineComponent({
  name: "evaluacions-form",
  components: {
    Navbar,
  },
  data() {
    return {
      evaluacions: [] as Evaluacion[],
      subs: [],
      preSubs: [],
      almacenes: [
        {
          desc: "Almacén No. 01 (General)",
          subs: ["Donaciones", "Venta / Servicios", "Muestras Médicas"],
        },
        {
          desc: "Almacén No. 02 (Suministro de Oficina y Limpieza)",
          subs: [
            "Sub-01 (Materiales de Oficina)",
            "Sub-02 (Materiales de Limpieza)",
          ],
        },
        {
          desc: "Almacén No. 03 (Abastecimiento)",
          subs: [
            "Sub-01 (Carro de Paro UCI)",
            "Sub-02 (Carro de Paro 2do Piso)",
            "Sub-03 (Carro de Paro Perinato)",
            "Sub-04 (Carro de Paro Quirófano)",
            "Sub-05 (Carro de Paro 3er Piso)",
          ],
        },
        {
          desc: "Almacén No. 04 (Emergencia, Quirófano y Ambulatorio)",
          subs: [
            "Sub-01 (Emergencia)",
            "Sub-02 (Depósito Quirófano)",
            "Sub-03 (Imágenes)",
            "Sub-04 (Laboratorio Clínico)",
            "Sub-05 (Laboratorio Biomolecular)",
            "Sub-06 (Farmacia 3er Piso)",
            "Sub-07 (Emergencia Pediatrica)",
          ],
        },
        {
          desc: "Almacén No. 70 (Cocina)",
          subs: [
            "Sub-01 (Alimentos)",
            "Sub-02 (Bebidas y Líquidos)",
            "Sub-03 (Suministros)",
            "Sub-04 (Utencilios)",
          ],
        },
        {
          desc: "Almacén No. 98 (Vencidos)",
          subs: [],
        },
        {
          desc: "Almacén No. 99 (Averiado)",
          subs: [],
        },
      ],
      num1: 0,
      num2: 0,
      fechaActual: "",
      search: "",
      seguros2: [],
      seguros: [
        "NINGUNO",
        "ARS CMD",
        "MAPFRE SALUD ARS, S.A.",
        "FUTURO",
        "META SALUD",
        "YUNEN",
        "RESERVAS",
        "MONUMENTAL",
        "ASEMAP",
        "ARS APS S A",
        "SIMAG",
        "RENACER",
        "GRUPO MEDICO ASOCIADO",
        "PRIMERA ARS DE HUMANO",
        "UNIVERSAL",
        "HUMANO SEGUROS",
        "SENASA CONTRIBUTIVO",
        "SENASA SUBSIDIADO",
        "SEMMA",
        "IDOPPRIL",
        "ARS UASD",
        "OTRA",
      ],
      currentEdition: {} as any,
      // vitolas: [] as Vitola[],
      // evaluacions: [] as Evaluacion[],
      // evaluacionsEmp: [] as Evaluacion[],
      // evaluacionsPeg: [] as Evaluacion[],
      // evaluacionsMez: [] as Evaluacion[],
      campoFocus: "tipo",
      mensageError: "Error",
      mensageExito: "Evaluacion Registrado Exitosamente",
      mensageConfirm: "¿Está Seguro que desea Eliminar Este Evaluacion?",
      encabezado: "",
      modoForm: "",
      // funciones: [] as Funcion[],
      showDatosPadre: false,
      showDatosMadre: false,
      showDatosTutor: false,
      message: {
        username: "Ronnald",
        message: "Hola",
      },
      documento: {} as any,
      error: "",
      respuesta: {},
      actividad: "",
      showAlert: false,
      loadedAfiliado: {},
      cargando: false,
      evaluacion: {} as Evaluacion,
      oneEvaluacion: {} as Evaluacion,
      one: {},
      nextNo: Number,
      evaluacionSelected: [],
      clienteSelected: [],
      descripcionCliente: "",

      showInComentary: "",
      showModal: false,
      showModal7: false,
      showModalAseguradoras: false,
      showDelete: false,
      currentConsulta: "",
      estado: {} as object,
    };
  },

  async mounted() {
    this.evaluacion = this.$store.state.user.defaultStatus[
      this.$route.params.index
    ];
    this.evaluacion.fecha = this.numeroAFecha(this.evaluacion.fecha);
    this.evaluacion.fecha = this.formatDate(this.evaluacion.fecha);
  },

  methods: {
    numeroAFecha(numeroDeDias: any, esExcel = false) {
      var diasDesde1900 = esExcel ? 25567 + 1 : 25567 + 2;

      // 86400 es el número de segundos en un día, luego multiplicamos por 1000 para obtener milisegundos.
      return new Date((numeroDeDias - diasDesde1900) * 86400 * 1000);
    },

    setService() {
      if (this.evaluacion.tipServ == "Consulta") {
        this.evaluacion.descServ = "Consulta";
      } else {
        this.evaluacion.descServ = "";
      }
    },

    showModalAseguradorasMethod() {
      this.seguros2 = this.seguros;
      this.showModalAseguradoras = !this.showModalAseguradoras;
    },

    async redirect(id: string) {
      // alert("Redirecting");
      this.$router.push(`/evaluacions/${id}`);

      // Remounted
      this.modoForm = "show";
      this.encabezado = "Detalles de Evaluacion";
      this.showDeleteMethod();
      await this.loadEvaluacion(id);
      this.defSubs();

      // this.evaluacion.finVac = new Date();
      // this.evaluacion.fechaNac = new Date();
      // this.evaluacion.fechaCont = new Date();
      this.fixTime();
      this.focus();

      this.showModalMethod7();
    },

    async buscando() {
      this.toggleLoading();
      // try {
      //   const res = await getEvaluacions(this.criterio);
      //   this.evaluacions = res.data;
      // } catch (error) {
      //   console.error(error);
      // }
      // if (this.evaluacion.barcode !== "Todos") {
      //   this.evaluacions = this.evaluacions.filter((evaluacion: Evaluacion) => {
      //     return evaluacion.nombPac
      //       .toLowerCase()
      //       .includes(this.evaluacion.barcode.toLowerCase());
      //   });
      // }
      this.toggleLoading();
    },

    async changeFocus() {
      document.getElementById("nombPres").focus();
      await this.buscando();
      this.showModalMethod7();
    },
    calcVenc(date: any) {
      this.evaluacion.mesVenc = moment(date).format("MM");
      this.evaluacion.anoVenc = moment(date).format("YYYY");
    },

    // defSubs() {
    //   this.preSubs = this.almacenes.filter((almacen: Evaluacion) => {
    //     return almacen.desc
    //       .toLowerCase()
    //       .includes(this.evaluacion.almacn.toLowerCase());
    //   });
    //   this.subs = this.preSubs[0].subs;
    // },

    setSeguro(seguro: string) {
      this.evaluacion.nombARS = seguro;
      this.showModalAseguradorasMethod();
      this.search = "";
      document.getElementById("nombPres").focus();
    },

    buscar(term: string) {
      this.seguros2 = this.seguros;
      if (term !== "") {
        this.seguros2 = this.seguros.filter((seguro: string) => {
          return seguro.toLowerCase().includes(this.search.toLowerCase());
        });
      }
      if (this.seguros2.length == 1) {
        if (confirm("¿" + this.seguros2[0] + "?")) {
          this.setSeguro(this.seguros2[0]);
          document.getElementById("tipServ").focus();
        }
      }
    },

    showModalMethod7() {
      this.seguros2 = this.seguros;
      this.showModal7 = !this.showModal7;
      // document.getElementById("oficio").focus();
    },

    showModalMethod() {
      this.showModal = !this.showModal;
    },

    deleteService(it: any) {
      if (confirm("Está Seguro que desea Eliminar Esta Consulta?")) {
        this.evaluacion.consultas.splice(it, 1);
      }
    },

    editService(index: number, consulta: any) {
      this.currentEdition = consulta;
      this.showModalMethod();
    },

    newFormatDate(dateValue: Date) {
      // let out = moment(dateValue).add(0, "h");
      // return moment(out).format("DD/MM/YYYY");
      moment.locale("es");
      return moment(dateValue).calendar();
      // .startOf("hour")
      // .fromNow();
    },

    async addActivity() {
      if (this.currentConsulta !== "") {
        this.evaluacion.consultas.push({
          description: this.currentConsulta,
          date: new Date(),
        });
        this.currentConsulta = "";
      }
      document.getElementById("barcode").focus();
    },

    calcularEdad(date: any) {
      let years = 0;
      let edad = Math.floor(
        moment(new Date()).diff(moment(date, "YYYY-MM-DD"), "years", true)
      );
      if (edad > 124 || edad < 0) {
        console.log('Verificar Fecha de Nacimiento')
      } else {
        years = edad;
      }
      this.evaluacion.edad = years;
    },

    // async filterEvaluacions() {
    //   this.toggleLoading();
    //   try {
    //     const res = await getPeg();
    //     this.evaluacionsPeg = res.data;
    //   } catch (error) {
    //     console.error(error);
    //   }

    //   try {
    //     const res = await getEmp();
    //     this.evaluacionsEmp = res.data;
    //   } catch (error) {
    //     console.error(error);
    //   }

    //   try {
    //     const res = await getMez();
    //     this.evaluacionsMez = res.data;
    //   } catch (error) {
    //     console.error(error);
    //   }

    //   this.toggleLoading();
    // },

    // async loadLigas() {
    //   // this.toggleLoading();
    //   try {
    //     const res = await getLigas();
    //     this.ligas = res.data;
    //   } catch (error) {
    //     console.error(error);
    //   }
    //   // this.toggleLoading();
    // },

    // async loadVitolas() {
    //   // this.toggleLoading();
    //   try {
    //     const res = await getVitolas();
    //     this.vitolas = res.data;
    //   } catch (error) {
    //     console.error(error);
    //   }
    //   // this.toggleLoading();
    // },

    async loadEvaluacions() {
      this.toggleLoading();
      // try {
      //   const res = await getEvaluacions(this.criterio);
      //   this.seguros = res.data;
      // } catch (error) {
      //   console.error(error);
      // }
      this.toggleLoading();
    },

    fixTime() {
      // if (this.evaluacion.fechAutor) {
      //   this.evaluacion.fechAutor = this.formatDateToFix(
      //     this.evaluacion.fechAutor,
      //     false
      //   );
      // }
      // if (this.evaluacion.ing) {
      //   this.evaluacion.ing = this.formatDateToFix(this.evaluacion.ing, false);
      // }
      // if (this.evaluacion.egr) {
      //   this.evaluacion.egr = this.formatDateToFix(this.evaluacion.egr, false);
      // }
    },

    formatDateToFix(dateValue: Date, incTime: boolean) {
      if (incTime == true) {
        let out = moment(dateValue).add(0, "days");
        return moment(out).format("yyyy-MM-DDTHH:mm");
      } else {
        let out = moment(dateValue).add(4, "hours");
        return moment(out).format("yyyy-MM-DD");
      }
    },

    async loadEvaluacion(index: number) {
      // this.toggleLoading();
      // try {
      // const { data } = await getEvaluacion(id);
      this.evaluacion = this.$store.state.user.defaultStatus[index];
      // this.fixTime();
      // } catch (error) {
      //console.error(error);
      // }
      // this.toggleLoading();
    },

    async handleUpdate() {
      this.toggleLoading();
      try {
        if (typeof this.$route.params.id === "string") {
          this.evaluacion.userMod = this.$store.state.user.usuario;
          await updateEvaluacion(this.$route.params.id, this.evaluacion);
          this.addMessage();
          this.$router.push("/evaluacions");
        }
      } catch (error) {
        //console.error(error);
      }
      this.toggleLoading();
      // this.toggleAlert();
    },

    async handleDelete() {
      if (confirm(this.mensageConfirm)) {
        try {
          if (typeof this.$route.params.id === "string") {
            await deleteEvaluacion(this.$route.params.id);
            this.addMessage();
            this.$router.push("/evaluacions");
          }
        } catch (error) {
          //console.error(error);
        }
      }
    },

    showDeleteMethod() {
      if (this.$store.state.user.type == "Power User") {
        this.showDelete = true;
      }
    },

    toggleShowDatosPadre() {
      this.showDatosPadre = !this.showDatosPadre;
    },
    toggleShowDatosMadre() {
      this.showDatosMadre = !this.showDatosMadre;
    },
    toggleShowDatosTutor() {
      this.showDatosTutor = !this.showDatosTutor;
    },

    async addMessage() {
      try {
        const res = await createMensaje(this.message);
      } catch (error) {
        console.error(error);
      }
    },

    isError(message: string) {
      if (message == this.mensageExito) {
        return "success";
      } else {
        return "error";
      }
    },

    toggleAlert() {
      this.showAlert = !this.showAlert;
    },
    calcEvaluacion() {
      (this.evaluacion.retension = this.evaluacion.bruto * 0.1),
        (this.evaluacion.neto = this.evaluacion.bruto * 0.9);
    },
    formatNumber(value: number) {
      return numeral(value).format("00000000");
    },

    // formatDate(dateValue: Date) {
    //   let out = moment(dateValue).add(4, "hours");
    //   return moment(out).format("MM");
    // },

    formatDate(dateValue: Date) {
      let out = moment(dateValue).add(0, "days");
      return moment(out).format("D/MM/yyyy");
    },

    formatDatePlus(dateValue: Date) {
      let out = moment(dateValue).add(30, "days");
      return moment(out).format("yyyy-MM-DTHH:mm");
    },

    fillFields() {
      // this.evaluacion.instit = "Clínica Cruz Jiminián";
      // this.evaluacion.nombPres = "Clínica Cruz Jiminián";
      // this.evaluacion.fechAutor = new Date();
      // this.evaluacion.ing = new Date();
      // this.evaluacion.egr = new Date();
      // this.evaluacion.tipo = "cent";
      // this.evaluacion.fechaNac = new Date();
      // this.evaluacion.fechaCont = new Date();
    },

    async loadOneEvaluacion() {
      try {
        const res = await getOneEvaluacion();
        this.oneEvaluacion = res.data;
        this.one = this.oneEvaluacion[0];
        if (typeof this.one.no === "number") {
          this.nextNo = this.one.no + 1;
        } else {
          this.one.no = 0;
          this.nextNo = this.one.no + 1;
        }
        if (this.nextNo == null) {
          this.nextNo = 0;
        }
        this.evaluacion.no = this.nextNo;
        this.evaluacion.principal = this.nextNo;
        this.evaluacion.principal = this.nextNo;
      } catch (error) {
        console.error(error);
      }
    },

    async saveEvaluaciona() {
      await this.loadOneEvaluacion();
      // try {
      //   const res = await createEvaluaciona(this.evaluacion);
      //   // // console.log(res);
      // } catch (error) {
      //   console.error(error);
      // }
    },

    async saveEvaluacion() {
      this.toggleLoading();
      try {
        try {
          const res = await getOneEvaluacion();
          this.oneEvaluacion = res.data;
          this.one = this.oneEvaluacion[0];
          this.nextNo = this.one.no + 1;
          this.evaluacion.no = this.nextNo;
        } catch (error) {
          console.error(error);
        }
        this.evaluacion.userReg = this.$store.state.user.usuario;
        // const res = await createEvaluacion(this.evaluacion).then(
        //   (res: { data: { title: any; }; }) => {
        //     this.error = this.respuesta = res.data.title;
        //     // this.$router.push("/");
        //     this.res = res;
        //     this.respuesta = res.data;
        //     this.addMessage();
        //   },
        //   (err: { response: { data: { error: any; }; }; }) => {
        //     // console.log(err.response);
        //     this.error = err.response.data.error;
        //   }
        // );
        // this.$router.push("/evaluacions/");
      } catch (error) {
        console.error(error);
      }
      await this.toggleLoading();
      if (this.error !== this.mensageError) {
        await this.cleanFields();
      }
      await this.fillFields();
      document.getElementById(this.campoFocus).focus();
      this.toggleAlert();
    },

    async deleteAllEvaluacions() {
      try {
        const res = await eliminateEvaluacions(this.evaluacion);
        // // console.log(res);
      } catch (error) {
        console.error(error);
      }
    },

    cleanFields() {
      this.evaluacion.facNo = "";
      this.evaluacion.nombPres = "";
      this.evaluacion.codPres = "";
      this.evaluacion.med = "";
      this.evaluacion.naf = "";
      this.evaluacion.aut = "";
      this.evaluacion.fechAutor = "";
      this.evaluacion.nombARS = "";
      this.evaluacion.autPor = "";
      this.evaluacion.montRec = "";
      this.evaluacion.nombPac = "";
      this.evaluacion.cedu = "";
      this.evaluacion.aflNSS = "";
      this.evaluacion.sex = "";
      this.evaluacion.edad = "";
      this.evaluacion.ing = "";
      this.evaluacion.egr = "";
      this.evaluacion.dir = "";
      this.evaluacion.dx = "";
      this.evaluacion.tipServ = "";
      this.evaluacion.descServ = "";
    },

    toggleLoading() {
      this.cargando = !this.cargando;
    },

    focus() {
      document.getElementById(this.campoFocus).focus();
    },
    focus2() {
      document.getElementById(this.campoFocus2).focus();
    },

    // isMed() {
    //   if (this.evaluacion.tipo == "cent") {
    //     this.evaluacion.nombPres = "Clínica Cruz Jiminián";
    //     this.encabezado = "Nueva Reclamación por Servicios";
    //     return false;
    //   } else {
    //     this.encabezado = "Nueva Reclamación por Honorarios Médicos";
    //     return true;
    //   }
    // },
  },
});
</script>

<style lang="css" scoped>
.field {
  font-size: 80%;
  margin-left: 10px;
}

.bold {
  font-weight: bold;
}
/* .closeModal {
  cursor: pointer;
} */

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

.orange {
  background-color: orange;
}

.yellow {
  background-color: yellow;
}

/* <!----------------------------------------------------------------------------------------------------------> */

.general {
  width: 100%;
  max-width: 1500px;
  margin: 0px auto;
}
.grid-consultas {
  display: grid;
  grid-auto-flow: dense;
  grid-template-rows: auto auto;
  gap: 3px;
  grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr));
}

.grid {
  display: grid;
  grid-auto-flow: dense;
  grid-template-rows: auto auto;
  gap: 3px;
  grid-template-columns: repeat(auto-fit, minmax(10rem, 1fr));
}

.grid-1 {
  display: grid;
  grid-auto-flow: dense;
  grid-template-rows: auto auto;
  gap: 3px;
  grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr));
}

.grid-2 {
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
  grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
}

/* h4 {
  background-color: grey;
  color: white;
  text-align: center;
  box-shadow: 2px 2px 10px rgb(199, 199, 199);
} */

h6 {
  color: white;
  /* font-weight: bold; */
  text-align: center;
  background-color: rgb(82, 45, 109);
  /* background-color: rgb(147, 147, 147); */
}

h5 {
  font-size: 90%;
  color: rgb(147, 147, 147);
  font-weight: bold;
  text-align: center;
}

fieldset {
  margin-top: 40px;
}

form {
  /* text-align:center;   */
  /* background-color: white; */
  /* box-shadow: 2px 2px 10px rgb(199, 199, 199); */
  /* border-radius: 4px; */
  padding: 2%;
}

legend {
  color: rgb(82, 45, 109);
  text-align: center;
}

input,
select,
textarea {
  border-radius: 7px;
  margin-bottom: 3px;
}

legend {
  margin: 0;
}

.form-label {
  background-color: rgb(220, 220, 220);
  width: 100%;
  /* color: rgb(82, 45, 109); */
  /* border-radius: 7px; */
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

/* ---------------------------------------- */
.redOption {
  color: red;
}

.greenOption {
  color: green;
}

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
  width: 700px;
  height: 300;
  margin: auto;
  background: #fff;
  box-shadow: 1px 7px 25px rgba(5, 24, 250, 0.6);
  transition: all 500ms ease;
  position: relative;
}

.contenedor header {
  padding: 10px;
  /* background: rgb(82, 45, 109); */
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

/* Modal 7 */

#search {
  margin-top: 35px;
}

.modal7 {
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

/* Notas Adhesivas */
/* *{
  margin:0;
  padding:0;
} */

/* body{
  font-family:arial,sans-serif;
  font-size:100%;
  margin:1em;
  background:#666;
  color:#fff;
} */

/* h2,p{
  font-size:100%;
  font-weight:normal;
} */

ul,
li {
  list-style: none;
}
ul {
  overflow: hidden;
  padding: 3em;
}
ul li a {
  text-decoration: none;
  color: #000;
  background: #ffc;
  display: block;
  height: 20em;
  width: 15em;
  padding: 2em;
  -moz-box-shadow: 5px 5px 7px rgba(33, 33, 33, 1);
  -webkit-box-shadow: 5px 5px 7px rgba(33, 33, 33, 0.7);
  box-shadow: 5px 5px 7px rgba(33, 33, 33, 0.7);
  -moz-transition: -moz-transform 0.15s linear;
  -o-transition: -o-transform 0.15s linear;
  -webkit-transition: -webkit-transform 0.15s linear;
}
ul li {
  margin: 1em;
  float: left;
}
ul li h2 {
  font-size: 100%;
  font-weight: bold;
  padding-bottom: 10px;
}
ul li p {
  font-family: "Reenie Beanie", arial, sans-serif;
  font-size: 100%;
}
ul li a {
  -webkit-transform: rotate(-6deg);
  -o-transform: rotate(-6deg);
  -moz-transform: rotate(-6deg);
}
ul li:nth-child(even) a {
  -o-transform: rotate(4deg);
  -webkit-transform: rotate(4deg);
  -moz-transform: rotate(4deg);
  position: relative;
  top: 5px;
  background: #cfc;
}
ul li:nth-child(3n) a {
  -o-transform: rotate(-3deg);
  -webkit-transform: rotate(-3deg);
  -moz-transform: rotate(-3deg);
  position: relative;
  top: -5px;
  background: #ccf;
}
ul li:nth-child(5n) a {
  -o-transform: rotate(5deg);
  -webkit-transform: rotate(5deg);
  -moz-transform: rotate(5deg);
  position: relative;
  top: -10px;
}
ul li a:hover,
ul li a:focus {
  box-shadow: 10px 10px 7px rgba(5, 24, 250, 0.7);
  -moz-box-shadow: 10px 10px 7px rgba(5, 24, 250, 0.7);
  -webkit-box-shadow: 10px 10px 7px rgba(5, 24, 250, 0.7);
  -webkit-transform: scale(1.25);
  -moz-transform: scale(1.25);
  -o-transform: scale(1.25);
  position: relative;
  z-index: 5;
}
ol {
  text-align: center;
}
ol li {
  display: inline;
  padding-right: 1em;
}
ol li a {
  color: #fff;
}
/* End Notas Adhesivas */

.card-body {
  background-color: #ddd;
  overflow-x: scroll;
}
</style>
