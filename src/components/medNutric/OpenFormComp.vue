<template>
<!-- {{this.evaluacion.status}} -->
  <!-- {{ this.cantidadEvaluaciones }} -->
  <!-- <h1>Fecha</h1>
  {{ evaluacion.fecha }}<br />
  <h1>cedula</h1>
  {{ evaluacion.cedula }}<br />
  <h1>nombre</h1>
  {{ evaluacion.nombre }}<br />
  <h1>apellido</h1>
  {{ evaluacion.apellido }}<br />
  <h1>sexo</h1>
  {{ evaluacion.sexo }}<br />
  <h1>fechaNacimiento</h1>
  {{ evaluacion.fechaNacimiento }}<br />
  <h1>edad</h1>
  {{ evaluacion.edad }}<br />
  <h1>nss</h1>
  {{ evaluacion.nss }}<br />
  <h1>regimen</h1>
  {{ evaluacion.regimen }}<br />
  <h1>direccion</h1>
  {{ evaluacion.direccion }}<br />
  <h1>telefono</h1>
  {{ evaluacion.telefono }}<br />
  <h1>tipo_de_contacto</h1>
  {{ evaluacion.tipo_de_contacto }}<br />
  <h1>nombre_contacto</h1>
  {{ evaluacion.nombre_contacto }}<br />
  <h1>supervisor</h1>
  {{ evaluacion.supervisor }}<br />
  <h1>unap</h1>
  {{ evaluacion.unap }}<br />
  <h1>unap state</h1>
  {{ this.$store.state.user.unap }} -->

  <div>
    <div>
      <Navbar />
      <Transition>
        <div v-if="cargando" class="spin">
          <img
            class="img"
            :src="'https://isys-assets-bucket.s3.amazonaws.com/logos/logo.png'"
          />
          <br />
          <h6 style="margin-top: 20px" class="ta-c">
            {{ this.estadoLoading }}
          </h6>
        </div>
      </Transition>

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
                    v-model="search"
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
                    </tr>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-if="showModalConfirm" class="modalConfirm">
          <div class="contenedor">
            <header>Notificación</header>
            <div class="contenido">
              <label @click="this.showModalConfirmMethod()" for="btn-modal"
                >X</label
              >
              <div class="contenido">
                <p>
                  Afiliado Validado Exitosamente
                </p>
                <button
                  class="btn btn-success"
                  @click.prevent="this.showModalConfirmMethod()"
                >
                  Validar Otro Afiliado
                </button>
                <button
                  class="btn btn-info"
                  @click.prevent="this.$router.push('/evaluacions')"
                >
                  Ver Listado
                </button>
              </div>
            </div>
          </div>
        </div>
        <form>
          <fieldset>
            <h6>{{ encabezado }}</h6>
            <label class="form-label"><b>Datos del Afiliado</b></label>
            <div class="grid">
              <div>
                <label
                  class="ta-l col-form-label col-form-label-sm"
                  for="cedula"
                  >CEDULA:</label
                >
                <div v-show="showSpinner" class="lds-ripple">
                  <div></div>
                  <div></div>
                </div>
                <input
                  id="cedula"
                  type="cedula"
                  @change="defCedula()"
                  v-model="evaluacion.cedula"
                  class="form-control"
                />
              </div>
              <div>
                <label
                  class="ta-l col-form-label col-form-label-sm"
                  for="nombre"
                  >NOMBRE:</label
                ><input
                  id="nombre"
                  type="nombre"
                  v-model="evaluacion.nombre"
                  class="form-control"
                />
              </div>
              <div>
                <label
                  class="ta-l col-form-label col-form-label-sm"
                  for="apellido"
                  >APELLIDO:</label
                ><input
                  id="apellido"
                  type="apellido"
                  v-model="evaluacion.apellido"
                  class="form-control"
                />
              </div>
              <!-- <div class="grid-sfe"> -->
              <div>
                <label class="ta-l col-form-label col-form-label-sm" for="sexo"
                  >SEXO:</label
                ><select
                  id="sexo"
                  type="sexo"
                  v-model="evaluacion.sexo"
                  class="form-select"
                >
                  <option>MASCULINO</option>
                  <option>FEMENINO</option>
                </select>
              </div>
              <div>
                <label
                  class="ta-l col-form-label col-form-label-sm"
                  for="fechaNacimiento"
                  >NACIMIENTO:</label
                ><input
                  id="fechaNacimiento"
                  type="date"
                  @change="calcularEdad(evaluacion.fechaNacimiento)"
                  v-model="evaluacion.fechaNacimiento"
                  class="form-control"
                />
              </div>
              <div>
                <label class="ta-l col-form-label col-form-label-sm" for="edad"
                  >EDAD:</label
                ><input
                  disabled
                  id="edad"
                  type="Number"
                  v-model="evaluacion.edad"
                  class="form-control"
                />
              </div>
              <!-- </div> -->

              <div>
                <label class="ta-l col-form-label col-form-label-sm" for="nss"
                  >NSS:</label
                ><input
                  id="nss"
                  type="nss"
                  v-model="evaluacion.nss"
                  class="form-control"
                />
              </div>

              <div>
                <label
                  class="ta-l col-form-label col-form-label-sm"
                  for="regimen"
                  >REGIMEN:</label
                ><select
                  disabled
                  id="regimen"
                  type="regimen"
                  v-model="evaluacion.regimen"
                  class="form-select"
                >
                  <option>SUBSIDIADO</option>
                  <option>CONTRIBUTIVO</option>
                  <option>PENSIONADO</option>
                </select>
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
              </div>
              <div>
                <label
                  class="ta-l col-form-label col-form-label-sm"
                  for="telefono"
                  >TELEFONO:</label
                ><input
                  id="telefono"
                  type="telefono"
                  @change="defTelefono()"
                  v-model="evaluacion.telefono"
                  class="form-control"
                />
              </div>
              <div>
                <label
                  class="ta-l col-form-label col-form-label-sm"
                  for="tipo_de_contacto"
                  >TIPO DE CONTACTO:</label
                ><select
                  id="tipo_de_contacto"
                  type="tipo_de_contacto"
                  @change="setContactName()"
                  v-model="evaluacion.tipo_de_contacto"
                  class="form-select"
                >
                  <option>PROPIO</option>
                  <option>PROMOTOR DE SALUD</option>
                  <option>GESTOR DE SALUD</option>
                  <option>OTROS</option>
                </select>
              </div>
              <div v-show="this.evaluacion.tipo_de_contacto == 'OTROS'">
                <label
                  class="ta-l col-form-label col-form-label-sm"
                  for="tipo_de_contacto"
                  >ESPECIFIQUE:</label
                >
                <input
                  id="especificacion_contacto"
                  type="especificacion_contacto"
                  v-model="evaluacion.especificacion_contacto"
                  class="form-control"
                />
              </div>
              <div>
                <label
                  class="ta-l col-form-label col-form-label-sm"
                  for="nombre_contacto"
                  >NOMBRE DE CONTACTO:</label
                ><input
                  :disabled="this.evaluacion.tipo_de_contacto == 'PROPIO'"
                  id="nombre_contacto"
                  type="nombre_contacto"
                  v-model="evaluacion.nombre_contacto"
                  class="form-control"
                />
              </div>
            </div>
            <label class="form-label"><b>Datos de la Evaluación</b></label>
            <div class="grid">
              <div class="grid">
                <div>
                  <label
                    class="ta-l col-form-label col-form-label-sm"
                    for="fecha"
                    >FECHA:</label
                  ><input
                    @change="fechaState()"
                    id="fecha"
                    type="date"
                    v-model="evaluacion.fecha"
                    class="form-control"
                  />
                </div>
                <div>
                  <label
                    class="ta-l col-form-label col-form-label-sm"
                    for="unap"
                    >UNAP:</label
                  ><select
                    :disabled="this.lockCentro"
                    id="unap"
                    type="unap"
                    v-model="evaluacion.id_center"
                    class="form-select"
                    @focus="this.showModalAseguradorasMethod()"
                  >
                    <option
                      v-for="(centro, index) in this.$store.state.user
                        .filteredCentros"
                      :key="index"
                      @click="setCentro(centro)"
                      :value="centro.id_center"
                    >
                      {{ centro.unap }}
                    </option>
                  </select>
                </div>
                <div>
                  <label
                    class="ta-l col-form-label col-form-label-sm"
                    for="supervisor"
                    >SUPERVISOR:</label
                  ><input
                    disabled
                    id="supervisor"
                    type="supervisor"
                    v-model="evaluacion.supervisor"
                    class="form-control"
                  />
                </div>
                <div>
                  <label
                    class="ta-l col-form-label col-form-label-sm"
                    for="cantidadEvaluaciones"
                    >CANTIDAD EVALUACIONES:</label
                  ><input
                    disabled
                    id="cantidadEvaluaciones"
                    type="cantidadEvaluaciones"
                    v-model="evaluacion.cantidadEvaluaciones"
                    class="form-control"
                  />
                </div>
                <div>
                  <label
                    class="ta-l col-form-label col-form-label-sm"
                    for="cantidadEvaluaciones"
                    >ESTATUS:</label
                  ><select
                    disabled
                    id="cantidadEvaluaciones"
                    type="cantidadEvaluaciones"
                    v-model="evaluacion.status"
                    class="form-select"
                  >
                  <option value="1">NO EGRESADO</option>
                  <option value="2">PRE-EGRESADO</option>
                  <option value="3">EGRESADO</option>
                  </select>
                </div>
                <div
                  v-show="
                    evaluacion.fecha &&
                      evaluacion.cedula &&
                      evaluacion.nombre &&
                      evaluacion.apellido &&
                      evaluacion.sexo &&
                      evaluacion.fechaNacimiento &&
                      evaluacion.edad &&
                      evaluacion.nss &&
                      evaluacion.regimen &&
                      evaluacion.direccion &&
                      evaluacion.telefono &&
                      evaluacion.tipo_de_contacto &&
                      evaluacion.nombre_contacto &&
                      evaluacion.supervisor &&
                      evaluacion.unap
                  "
                >
                  <label
                    class="ta-l col-form-label col-form-label-sm"
                    for="unap"
                  ></label>
                  <div class="grid-short">
                    <div>
                      <button
                        @click.prevent="selectImage"
                        class="btn btn-outline-primary px-4"
                      >
                        Seleccionar Escáner SIRS
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="grid">
              <div>
                <label
                  class="ta-l col-form-label col-form-label-sm"
                  for="comentary"
                  >COMENTARIO:</label
                ><textarea
                  id="comentary"
                  type="comentary"
                  v-model="evaluacion.comentary"
                  class="form-control"
                />
              </div>
            </div>

            <button
              v-show="this.evaluacion.consAfil"
              :disabled="
                !evaluacion.fecha ||
                  !evaluacion.cedula ||
                  !evaluacion.nombre ||
                  !evaluacion.apellido ||
                  !evaluacion.sexo ||
                  !evaluacion.fechaNacimiento ||
                  !evaluacion.edad ||
                  !evaluacion.nss ||
                  !evaluacion.regimen ||
                  !evaluacion.direccion ||
                  !evaluacion.telefono ||
                  !evaluacion.tipo_de_contacto ||
                  !evaluacion.nombre_contacto ||
                  !evaluacion.supervisor ||
                  !evaluacion.unap
              "
              class="btn btn-primary"
              @click.prevent="createEvaluacion()"
            >
              <i class="fas fa-save"></i> Guardar
            </button>

            <!-- handdle image upload Start -->
            <div>
              <input
                v-show="false"
                id="imageInput"
                type="file"
                ref="fileInput"
                @input="uploadFile"
                accept="image/*"
              />
            </div>
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
import { getAllVal } from "@/services/centro/Centro";
import { getS3Url_cedulafecha } from "@/services/s3/s3Service";
import {
  getManyByDate,
  getManyByCedula,
  getOne,
} from "@/services/evaluacion/Evaluacion";
import { defineComponent } from "vue";
import { Evaluacion } from "@/interfaces/Evaluacion";
import { create } from "@/services/evaluacion/Evaluacion";
import { getEvaluacions } from "@/services/elderstatistic/Evaluacion";
import {
  getPatient,
  getPatientFechaNacimiento,
} from "@/services/elderstatistic/UsuarioService";
import numeral from "numeral";
import moment from "moment";

export default defineComponent({
  name: "evaluacions-form",
  components: {
    Navbar,
  },
  data() {
    return {
      estadoLoading: "Cargando...",
      cantEvalPac: 0,
      showModalConfirm: false,
      showSpinner: false,
      lockCentro: false,
      filteredCentros: [],
      evaluacions: [] as Evaluacion[],
      subs: [],
      preSubs: [],
      num1: 0,
      num2: 0,
      fechaActual: "",
      search: "",
      seguros2: [],
      currentEdition: {} as any,
      campoFocus: "cedula",
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
    if (!this.$store.state.user.id_center) {
      this.loadCentros();
      document.getElementById("unap").focus();
    }
    this.fillFields();
    this.fixTime();
  },

  updated() {
    if (this.evaluacion.nombre) {
      this.evaluacion.nombre = this.evaluacion.nombre.toUpperCase();
    }
    if (this.evaluacion.apellido) {
      this.evaluacion.apellido = this.evaluacion.apellido.toUpperCase();
    }
    if (this.evaluacion.direccion) {
      this.evaluacion.direccion = this.evaluacion.direccion.toUpperCase();
    }
    if (this.evaluacion.especificacion_contacto) {
      this.evaluacion.especificacion_contacto = this.evaluacion.especificacion_contacto.toUpperCase();
    }
    if (this.evaluacion.nombre_contacto) {
      this.evaluacion.nombre_contacto = this.evaluacion.nombre_contacto.toUpperCase();
    }
    if (this.evaluacion.comentary) {
      this.evaluacion.comentary = this.evaluacion.comentary.toUpperCase();
    }

    let joined = this.evaluacion.cedula + this.evaluacion.fecha;
    this.$store.state.user.consultasAfiliados = `https://isys-assets-bucket.s3.amazonaws.com/consultasAfiliados/${joined}.jpg`;
  },

  methods: {
    async consExistEvaluacion() {
      try {
        const res = await getOne(
          this.evaluacion.cedula,
          this.evaluacion.fecha
        ).then(
          async (res) => {
            if (res.data.Count == 1) {
              alert("Evaluación Creada");
              this.evaluacion.cedula = "";
              document.getElementById("cedula").focus();
            }
          },
          (err) => {
            console.error(err);
          }
        );
      } catch (error) {
        console.error(error);
      }
    },

    async loadCentros() {
      this.estadoLoading = "Cargando Listado de Centros...";
      this.toggleLoading();
      try {
        const res = await getAllVal();
        this.$store.state.user.centros = res.data.centros;
        this.$store.state.user.filteredCentros = res.data.centros;
      } catch (error) {
        console.error(error);
      }

      this.toggleLoading();
      this.estadoLoading = "Cargando...";
    },

    fechaState() {
      this.consExistEvaluacion();
      this.$store.state.user.desde = this.evaluacion.fecha;
    },

    async uploadFile() {
      this.estadoLoading = "Cargando Escáner SIRS...";
      this.toggleLoading();
      let input = this.$refs.fileInput;
      let file = input.files;
      const file2 = file[0];
      const url = await getS3Url_cedulafecha(
        this.evaluacion.cedula + this.evaluacion.fecha
      );

      await fetch(url.data, {
        method: "PUT",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        body: file2,
      });
      this.toggleLoading();
      this.estadoLoading = "Cargando...";
      this.evaluacion.consAfil = true;
      this.evaluacion.statusAdministrativo = "VALIDADO";
      this.createEvaluacion();
    },

    selectImage() {
      this.$refs.fileInput.click();
    },

    handleChangeDireccion() {
      document.getElementById("unap").focus();
    },
    toggleSpinner() {
      this.showSpinner = !this.showSpinner;
    },

    setPatienData(cantEvals: number, patient: any, patientFechaNacimiento: any) {
      if (patient.status == "3"){
        alert("Paciente Egresado, No puede ser evaluado.")
        this.evaluacion.cedula = ""
        this.evaluacion.nombre = ""
        this.evaluacion.apellido = ""
        this.evaluacion.sexo = ""
        this.evaluacion.fechaNacimiento = ""
        this.evaluacion.nss = ""
        this.evaluacion.telefono = ""
        this.evaluacion.tipo_de_contacto = ""
      }
      this.evaluacion.status = patient.status
      this.evaluacion.cantidadEvaluaciones = cantEvals
      if (patient) {
        this.evaluacion.altura_rodilla = patient.altura_rodilla;
        this.evaluacion.nombre = patient.nombre;
        this.evaluacion.apellido = patient.apellido;
        this.evaluacion.sexo = patient.sexo.toUpperCase();
        this.evaluacion.fechaNacimiento = this.formatDateToFix(
          patientFechaNacimiento.fechaNacimiento
        );
        this.calcularEdad(this.evaluacion.fechaNacimiento);
        this.evaluacion.nss = patient.nss;
        this.evaluacion.telefono = patient.telefono;
        this.evaluacion.tipo_de_contacto = patient.tipo_de_contacto.toUpperCase();
        this.setContactName();
        document.getElementById("unap").focus();
      }
    },
    defTelefono() {
      if (this.evaluacion.telefono.length == 10) {
        let part1 = this.evaluacion.telefono.substring(0, 3);
        let part2 = this.evaluacion.telefono.substring(3, 6);
        let part3 = this.evaluacion.telefono.substring(6, 10);
        let telefonoGuiones = part1 + "-" + part2 + "-" + part3;
        this.evaluacion.telefono = telefonoGuiones;
      } else if (this.evaluacion.telefono.length == 12) {
        let telefonoGuiones = this.evaluacion.telefono;
        this.evaluacion.telefono = telefonoGuiones;
      } else {
        alert("Teléfono Incorrecto");
        this.evaluacion.telefono = "";
      }
    },
    async defCedula() {
      if (this.evaluacion.cedula.length == 11) {
        let part1 = this.evaluacion.cedula.substring(0, 3);
        let part2 = this.evaluacion.cedula.substring(3, 10);
        let part3 = this.evaluacion.cedula.substring(10, 11);
        let cedulaGuiones = part1 + "-" + part2 + "-" + part3;
        this.evaluacion.cedula = cedulaGuiones.trim();

        this.toggleSpinner();

        try {
          await this.consExistEvaluacion();
          const patientData = await getPatient(this.evaluacion.cedula);

          const patientFechaNacimientoData = await getPatientFechaNacimiento(
            this.evaluacion.cedula
          );
          if (
            patientData.data.title == "Usuario no Encontrado" ||
            patientFechaNacimientoData.data.title == "Usuario no Encontrado"
          ) {
            // alert('No Encontrado')
          } else {
            // alert(JSON.stringify(patientData.data));
            this.setPatienData(
              patientData.data.Items.length,
              patientData.data.Items[0],
              patientFechaNacimientoData.data.Items[0]
            );
          }
        } catch (error) {
          console.log(error);
        }
        await this.toggleSpinner();

        document.getElementById("unap").focus();
      } else if (this.evaluacion.cedula.length == 13) {
        this.toggleSpinner();
        try {
          await this.consExistEvaluacion();
          const patientData = await getPatient(this.evaluacion.cedula);
          const patientFechaNacimientoData = await getPatientFechaNacimiento(
            this.evaluacion.cedula
          );
          this.setPatienData(
            patientData.data.Items.length,
            patientData.data.Items[0],
            patientFechaNacimientoData.data.Items[0]
          );
        } catch (error) {
          console.log(error);
        }
        await this.toggleSpinner();

        document.getElementById("unap").focus();
      } else {
        alert("Por Favor, Verifique la Cédula");
        document.getElementById("cedula").focus();
      }
    },
    setContactName() {
      if (this.evaluacion.tipo_de_contacto == "PROPIO") {
        this.evaluacion.nombre_contacto =
          this.evaluacion.nombre + " " + this.evaluacion.apellido;
      } else {
        this.evaluacion.nombre_contacto = "";
      }
    },
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
      this.fixTime();
      this.focus();

      this.showModalMethod7();
    },

    calcVenc(date: any) {
      this.evaluacion.mesVenc = moment(date).format("MM");
      this.evaluacion.anoVenc = moment(date).format("YYYY");
    },

    setCentro(centro: any) {
      this.evaluacion.unap = centro.unap;
      this.evaluacion.region = centro.region;
      this.evaluacion.provincia = centro.provincia;
      this.evaluacion.municipio = centro.municipio;
      this.evaluacion.id_center = centro.id_center;
      this.evaluacion.id_centerKit = this.evaluacion.id_center;
      this.$store.state.user.id_center = centro.id_center;
      this.$store.state.user.unap = centro.unap;
      this.showModalAseguradorasMethod();
      this.search = "";
      document.getElementById("cedula").focus();
      // this.filteredCentros = this.centros;
      this.lockCentro = true;
    },

    buscar(term: string) {
      this.$store.state.user.filteredCentros = this.$store.state.user.centros;
      if (term !== "") {
        this.$store.state.user.filteredCentros = this.$store.state.user.centros.filter(
          (centro: any) => {
            return centro.unap
              .toLowerCase()
              .includes(this.search.toLowerCase());
          }
        );
      }
    },

    showModalMethod7() {
      this.seguros2 = this.seguros;
      this.showModal7 = !this.showModal7;
    },

    showModalConfirmMethod() {
      this.showModalConfirm = !this.showModalConfirm;
      document.getElementById("cedula").focus();
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
      moment.locale("es");
      return moment(dateValue).calendar();
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

    fixTime() {
      if (this.evaluacion.fecha) {
        this.evaluacion.fecha = this.formatDateToFix(
          this.evaluacion.fecha,
          false
        );
      }
      if (this.$store.state.user.desde) {
        this.$store.state.user.desde = this.formatDateToFix(
          this.$store.state.user.desde,
          false
        );
      }
    },

    formatDateToFix(dateValue: Date, incTime: boolean) {
      if (incTime == true) {
        let out = moment(dateValue).add(0, "days");
        return moment(out).format("yyyy-MM-DDTHH:mm");
      } else {
        let out = moment(dateValue).add(0, "hours");
        return moment(out).format("yyyy-MM-DD");
      }
    },

    async loadEvaluacion(index: number) {
      this.evaluacion = this.$store.state.user.defaultStatus[index];
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

    formatDate(dateValue: Date) {
      let out = moment(dateValue).add(0, "hours");
      return moment(out).format("YYYY-MM-DD");
    },

    formatInvertedDate(dateValue: Date) {
      let out = moment(dateValue).add(0, "hours");
      return moment(out).format("MM/DD/YYYY");
    },

    formatDatePlus(dateValue: Date) {
      let out = moment(dateValue).add(30, "days");
      return moment(out).format("yyyy-MM-DTHH:mm");
    },

    fillFields() {
      this.evaluacion.consAfil = false;

      if (this.$store.state.user.id_center) {
        this.evaluacion.unap = this.$store.state.user.unap;
        this.evaluacion.region = this.$store.state.user.region;
        this.evaluacion.provincia = this.$store.state.user.provincia;
        this.evaluacion.municipio = this.$store.state.user.municipio;
        this.evaluacion.id_centerKit = this.$store.state.user.id_centerKit;

        this.evaluacion.id_center = this.$store.state.user.id_center;
        this.lockCentro = true;
      } else {
        document.getElementById("unap").focus();
      }

      this.evaluacion.estado = "ACTIVO";

      if (!this.$store.state.user.desde) {
        this.evaluacion.fecha = new Date();
      } else {
        this.evaluacion.fecha = this.$store.state.user.desde;
      }

      this.fechaState();
      if (this.$store.state.user.type == "Supervisor en Sitio") {
        this.evaluacion.supervisor = this.$store.state.user.usuario;
      }
      if (this.$store.state.user.type == "Médico Nutricionista") {
        this.evaluacion.nombre_doctor = this.$store.state.user.usuario;
      }
      this.evaluacion.regimen = "SUBSIDIADO";

      // this.evaluacion.id_form = 0;

      this.evaluacion.specialist_appo_psiqui = false;
      this.evaluacion.specialist_appo_geria = false;
      this.evaluacion.specialist_appo_orto = false;
      this.evaluacion.specialist_appo_gastro = false;
      this.evaluacion.specialist_appo_oftal = false;
      this.evaluacion.specialist_appo_psicolo = false;
      this.evaluacion.specialist_appo_neurolo = false;
      this.evaluacion.specialist_appo_fisia = false;
      this.evaluacion.specialist_appo_cardio = false;
      this.evaluacion.specialist_appo_odonto = false;
      this.evaluacion.specialist_appo_urolo = false;
      this.evaluacion.specialist_appo_diabe = false;

      this.evaluacion["Andador 4 Ruedas"] = false;
      this.evaluacion["Andador 4 Patas"] = false;
      this.evaluacion["Bastón"];
      this.evaluacion["Bastón 4 P"] = false;
      this.evaluacion["Bastón No VIdente"] = false;
      this.evaluacion["Cama de Posición"] = false;
      this.evaluacion["Colchón Aire"] = false;
      this.evaluacion["Faja Obdominal"] = false;
      this.evaluacion["Glucómetro"];
      this.evaluacion["Inodoro Porta"] = false;
      this.evaluacion["Muletas"];
      this.evaluacion["Pampers XL"] = false;
      this.evaluacion["Pampers L"] = false;
      this.evaluacion["Pampers M"] = false;
      this.evaluacion["Pampers S"] = false;
      this.evaluacion["Silla de Baño"] = false;
      this.evaluacion["Media de Comprensión"] = false;

      // this.evaluacion.cambiokit = false;
      this.evaluacion.status = "1";

      this.evaluacion.precio = 0;

      this.evaluacion.estadofc = "";
      this.evaluacion.riesgocardiovascular = "";

      this.evaluacion.autorizacion = "";
      this.evaluacion.statusAdministrativo = "";

      this.evaluacion.comentary = "";
      this.evaluacion.comentaryNutri = "";
      // this.evaluacion.justificacioncambiokit = "";

      // this.evaluacion.id_doctor = "";
      // this.evaluacion.id_patient = "";
    },

    async createEvaluacion() {
      this.estadoLoading = "Consultando Evaluaciónes Anteriores...";
      this.toggleLoading();
      const res = await getManyByCedula(this.evaluacion.cedula);

      this.toggleLoading();
      this.estadoLoading = "Cargando...";
      this.cantEvalPac = res.data.Count;
      if (this.cantEvalPac == 9) {
        alert("Este Paciente ya Cuenta con 9 Evaluaciones. Está dado de Alta.");
      } else if (this.cantEvalPac == 8) {
        alert(
          "Esta es la Evaluación para el Alta del Paciente, Asegúrece de Verificar el Kit de Alta"
        );

        if (this.evaluacion.nss.length == 9) {
          if (
            this.evaluacion.fecha &&
            this.evaluacion.cedula &&
            this.evaluacion.nombre &&
            this.evaluacion.apellido &&
            this.evaluacion.sexo &&
            this.evaluacion.fechaNacimiento &&
            this.evaluacion.edad &&
            this.evaluacion.nss &&
            this.evaluacion.regimen &&
            this.evaluacion.direccion &&
            this.evaluacion.telefono &&
            this.evaluacion.tipo_de_contacto &&
            this.evaluacion.nombre_contacto &&
            this.evaluacion.supervisor &&
            this.evaluacion.unap
          ) {
            this.estadoLoading = "Asignando Turno al Paciente...";
            this.toggleLoading();

            this.evaluacion.fecha = this.formatDate(this.evaluacion.fecha);

            try {
              // alert("Bucando Order");
              const res = await getManyByDate(
                this.$store.state.user.desde,
                this.$store.state.user.id_center
              );
              this.evaluacion.order = res.data.response.Count + 1;
              // alert(this.evaluacion.order);
            } catch (error) {
              console.error(error);
              // alert(error);
            }

            this.evaluacion.id_centerKit = this.evaluacion.id_center;

            this.estadoLoading = "Creando Hoja de Evaluación...";

            try {
              const res = await create(this.evaluacion).then(
                async (res) => {
                  // this.cleanFields();
                  this.fillFields();
                  this.fixTime();
                  await this.toggleLoading();
                  this.estadoLoading = "Cargando...";
                  if (res.data.Status == "Success") {
                    this.$router.push("/evaluacions");
                  }
                },
                (err) => {
                  alert(err);
                }
              );
            } catch (error) {
              console.error(error);
            }

            document.getElementById(this.campoFocus).focus();
          } else {
            alert("Asegúrece de llenar todos los Campos");
          }
        } else {
          alert("Por Favor, Verifique el NSS");
          document.getElementById("nss").focus();
        }
      } else {
        if (this.evaluacion.nss.length == 9) {
          if (
            this.evaluacion.fecha &&
            this.evaluacion.cedula &&
            this.evaluacion.nombre &&
            this.evaluacion.apellido &&
            this.evaluacion.sexo &&
            this.evaluacion.fechaNacimiento &&
            this.evaluacion.edad &&
            this.evaluacion.nss &&
            this.evaluacion.regimen &&
            this.evaluacion.direccion &&
            this.evaluacion.telefono &&
            this.evaluacion.tipo_de_contacto &&
            this.evaluacion.nombre_contacto &&
            this.evaluacion.supervisor &&
            this.evaluacion.unap
          ) {
            this.toggleLoading();
            this.evaluacion.fecha = this.formatDate(this.evaluacion.fecha);

            this.estadoLoading = "Asignando Turno al Paciente...";
            await this.toggleLoading();

            try {
              // alert("Bucando Order");
              const res = await getManyByDate(
                this.$store.state.user.desde,
                this.$store.state.user.id_center
              );
              this.evaluacion.order = res.data.response.Count + 1;
              // alert(this.evaluacion.order);
            } catch (error) {
              console.error(error);
              // alert(error);
            }

            this.estadoLoading = "Creando Hoja de Evaluación...";

            this.evaluacion.id_centerKit = this.evaluacion.id_center;
            try {
              const res = await create(this.evaluacion).then(
                async (res) => {
                  // this.cleanFields();
                  this.fillFields();
                  this.fixTime();
                  await this.toggleLoading();
                  this.estadoLoading = "Cargando...";
                  if (res.data.Status == "Success") {
                    this.$router.push("/evaluacions");
                    this.showModalConfirmMethod();
                  }
                },
                (err) => {
                  alert(err);
                }
              );
            } catch (error) {
              console.error(error);
            }

            document.getElementById(this.campoFocus).focus();
          } else {
            alert("Asegúrece de llenar todos los Campos");
            // document.getElementById("cedula").focus();
          }
        } else {
          alert("Por Favor, Verifique el NSS");
          document.getElementById("nss").focus();
        }
      }
    },

    cleanFields() {
      this.evaluacion.nombre = "";
      this.evaluacion.apellido = "";
      this.evaluacion.sexo = "";
      this.evaluacion.cedula = "";
      this.evaluacion.nss = "";
      this.evaluacion.regimen = "";
      this.evaluacion.telefono = "";
      this.evaluacion.tipo_de_contacto = "";
      this.evaluacion.nombre_contacto = "";
      this.evaluacion.especificacion_contacto = "";
      this.evaluacion.region = "";
      this.evaluacion.provincia = "";
      this.evaluacion.municipio = "";
      this.evaluacion.estado = "";
      this.evaluacion.talla = "";
      this.evaluacion.peso = "";
      this.evaluacion.cintura = "";
      this.evaluacion.abdomen = "";
      this.evaluacion.cadera = "";
      this.evaluacion.altura_rodilla = "";

      this.evaluacion.presion_arterial_sistolica = "";
      this.evaluacion.presion_arterial_diatolica = "";
      this.evaluacion.frecuencia_cardiaca = "";
      this.evaluacion.fuerza = "";
      this.evaluacion.imc = "";
      this.evaluacion.flexibilidad_miembro_superior = "";
      this.evaluacion.flexibilidad_miembro_inferior = "";
      this.evaluacion.pliegue_bicep = "";
      this.evaluacion.pliegue_abdominal = "";
      this.evaluacion.pliegue_sub = "";
      this.evaluacion.Encamado = "";
      this.evaluacion.Edentulo = "";

      this.evaluacion.abandono = "";
      this.evaluacion.maltrato = "";

      this.evaluacion.specialist_appo_psiqui = "";
      this.evaluacion.specialist_appo_geria = "";
      this.evaluacion.specialist_appo_orto = "";
      this.evaluacion.specialist_appo_gastro = "";
      this.evaluacion.specialist_appo_oftal = "";
      this.evaluacion.specialist_appo_psicolo = "";
      this.evaluacion.specialist_appo_neurolo = "";
      this.evaluacion.specialist_appo_fisia = "";
      this.evaluacion.specialist_appo_cardio = "";
      this.evaluacion.specialist_appo_odonto = "";
      this.evaluacion.specialist_appo_urolo = "";
      this.evaluacion.specialist_appo_diabe = "";

      this.evaluacion.fecha = "";
      this.evaluacion.kit = "";
      this.evaluacion.nombre_doctor = "";
      this.evaluacion.comentary = "";
      this.evaluacion.eval_nutri_1 = "";
      this.evaluacion.eval_nutri_2 = "";
      this.evaluacion.eval_nutri_3 = "";
      this.evaluacion.eval_nutri_4 = "";
      this.evaluacion.eval_nutri_5 = "";
      this.evaluacion.eval_nutri_6 = "";
      this.evaluacion.eval_nutri_7 = "";
      this.evaluacion.eval_nutri_8 = "";
      this.evaluacion.eval_nutri_9 = "";
      this.evaluacion.eval_nutri_10 = "";
      this.evaluacion.fechaNacimiento = "";
      this.evaluacion.edad = "";
      this.evaluacion.direccion = "";
      this.evaluacion.status = "";
      this.evaluacion.id_center = "";
      // this.evaluacion.id_patient = "";
      // this.evaluacion.id_form = "";
      // this.evaluacion.id_doctor = "";
      this.evaluacion.precio = "";

      this.evaluacion.autorizacion = "";
      this.evaluacion.pctoGrasa = "";
      this.evaluacion.estadoImc = "";
      this.evaluacion.estadoFuerza = "";
      this.evaluacion.riesgocardiovascular = "";
      this.evaluacion.estadofc = "";
      this.evaluacion.cambioKit = "";
      this.evaluacion.justificacionCambioKit = "";
      this.evaluacion.riesgoNutricional = "";
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
  },
});
</script>

<style lang="css" scoped>
.ta-c {
  text-align: center;
}

/* Start New Spinner */

.lds-ripple {
  display: inline-block;
  position: absolute;
  width: 40px;
  height: 40px;
}
.lds-ripple div {
  position: absolute;
  border: 2px solid rgb(47, 164, 231);
  opacity: 1;
  border-radius: 50%;
  animation: lds-ripple 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;
}
.lds-ripple div:nth-child(2) {
  animation-delay: -0.5s;
}
@keyframes lds-ripple {
  0% {
    top: 18px;
    left: 18px;
    width: 0;
    height: 0;
    opacity: 0;
  }
  4.9% {
    top: 18px;
    left: 18px;
    width: 0;
    height: 0;
    opacity: 0;
  }
  5% {
    top: 18px;
    left: 18px;
    width: 0;
    height: 0;
    opacity: 1;
  }
  100% {
    top: 0px;
    left: 0px;
    width: 36px;
    height: 36px;
    opacity: 0;
  }
}
/* end New Spinner */

/* .inlineField {
  display: flex;
  align-items: center;
}

.inlineFieldSelect {
  width: 20px;
} */

.date {
  width: 150px;
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
/* Finish Image Upload */

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
.grid-sfe {
  display: grid;
  grid-auto-flow: dense;
  grid-template-rows: auto auto;
  gap: 3px;
  grid-template-columns: repeat(auto-fit, minmax(10rem, 1fr));
}
.grid-short {
  display: grid;
  grid-auto-flow: dense;
  grid-template-rows: auto auto;
  gap: 3px;
  grid-template-columns: repeat(auto-fit, minmax(7rem, 1fr));
}
.grid-consultas {
  display: grid;
  grid-auto-flow: dense;
  grid-template-rows: auto auto;
  gap: 3px;
  grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr));
}

.grid-oneLine {
  display: grid;
  grid-auto-flow: dense;
  grid-template-rows: auto auto;
  gap: 3px;
  grid-template-columns: repeat(auto-fit, minmax(100%, 1fr));
}
.grid {
  display: grid;
  grid-auto-flow: dense;
  grid-template-rows: auto auto;
  gap: 3px;
  grid-template-columns: repeat(auto-fit, minmax(13rem, 1fr));
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

/* Modal Confirm*/
.modalConfirm {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  /* background: rgba(0, 0, 0, 0.1); */
  transition: all 500ms ease;
}

.contenedor {
  width: 400px;
  height: 300;
  margin: auto;
  background: #fff;
  box-shadow: 1px 7px 25px rgba(0, 0, 0, 0.6);
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

/* End Modal Confirm*/
</style>
