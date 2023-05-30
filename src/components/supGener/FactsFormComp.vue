<template>
  <!-- {{ this.evaluacion.verificacion }} -->
  <!-- {{ this.evaluacion.precio }} -->
  <div>
    <div>
      <Navbar />
      <Transition>
        <div v-if="cargando" class="spin">
          <img
            class="img"
            :src="'https://isys-assets-bucket.s3.amazonaws.com/logos/logo.png'"
          />
        </div>
      </Transition>
      <div v-if="showModalEVAL" class="modalSSIRS">
        <div class="contenedorSSIRS">
          <header>
            Escáner Evaluación
            <a target="_blank" :href="this.$store.state.user.evaluacion"
              ><i style="color: white" class="fas fa-download"></i
            ></a>
          </header>
          <div class="contenidoSSIRS">
            <label
              @click="this.showModalEVALMethod()"
              for="btn-modal"
              class="close"
              >Cerrar</label
            >
            <div class="contenidoSSIRS">
              <img class="flyer2" :src="this.$store.state.user.evaluacion" />
              <!-- </a> -->
            </div>
          </div>
        </div>
      </div>
      <div v-if="showModalSSIRS" class="modalSSIRS">
        <div class="contenedorSSIRS">
          <header>
            Escáner SIRS
            <a target="_blank" :href="this.$store.state.user.consultasAfiliados"
              ><i style="color: white" class="fas fa-download"></i
            ></a>
          </header>
          <div class="contenidoSSIRS">
            <label
              @click="this.showModalSSIRSMethod()"
              for="btn-modal"
              class="close"
              >Cerrar</label
            >
            <div class="contenidoSSIRS">
              <img
                class="flyer2"
                :src="this.$store.state.user.consultasAfiliados"
              />
              <!-- </a> -->
            </div>
          </div>
        </div>
      </div>
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
                    v-for="(centro, index) in filteredCentros"
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
      <div v-show="!cargando" class="general">
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
                  @click.prevent="this.$router.push('/listevalssupGener')"
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
                  disabled
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
                  :disabled="this.evaluacion.evaluado"
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
                  :disabled="this.evaluacion.evaluado"
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
                    disabled
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
                  ><input
                    disabled
                    id="unap"
                    type="unap"
                    v-model="evaluacion.unap"
                    class="form-control"
                    @focus="this.showModalAseguradorasMethod()"
                  />
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
              </div>
            </div>
            <label class="form-label"><b>Datos de Facturación</b></label>
            <div class="grid">
              <div class="grid">
                <div>
                  <label
                    class="ta-l col-form-label col-form-label-sm"
                    for="fecha"
                    >FECHA:</label
                  ><input
                    id="fecha"
                    type="date"
                    v-model="evaluacion.fechaAuts"
                    class="form-control"
                  />
                </div>
                <div>
                  <label class="ta-l col-form-label col-form-label-sm" for="kit"
                    >KIT:</label
                  ><input
                    disabled
                    id="kit"
                    type="kit"
                    v-model="evaluacion.kit"
                    class="form-control"
                  />
                </div>
                <div>
                  <label
                    class="ta-l col-form-label col-form-label-sm"
                    for="autorizacion"
                    >AUTORIZACION:</label
                  ><input
                    @change="markAuto()"
                    id="autorizacion"
                    type="autorizacion"
                    v-model="evaluacion.autorizacion"
                    class="form-control"
                  />
                </div>
                <div>
                  <label
                    class="ta-l col-form-label col-form-label-sm"
                    for="autorizPor"
                    >AUTORIZADO POR:</label
                  ><input
                    disabled
                    id="autorizPor"
                    type="autorizPor"
                    v-model="evaluacion.autorizPor"
                    class="form-control"
                  />
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
              <label class="form-label"
                ><b>Documentos y Soportes Escaneados</b></label
              >

              <div class="grid">
                <div>
                  <button
                    v-show="
                      this.$store.state.user.type == 'Supervisor en Sitio'
                    "
                    @click.prevent="selectImage"
                    class="btn btn-outline-primary px-4"
                  >
                    Cambiar Escáner SIRS
                  </button>
                  <button
                    @click.prevent="this.showModalSSIRSMethod()"
                    class="btn btn-outline-primary px-4"
                  >
                    Ver Escáner SIRS
                  </button>
                </div>
                <div v-if="this.evaluacion.evaluado">
                  <button
                    v-show="
                      this.$store.state.user.type == 'Supervisor en Sitio'
                    "
                    @click.prevent="selectImageEval"
                    class="btn btn-outline-primary px-4"
                  >
                    Seleccionar Escáner Evaluación
                  </button>
                  <button
                    @click.prevent="this.showModalEVALMethod()"
                    class="btn btn-outline-primary px-4"
                  >
                    Ver Escáner Evaluación
                  </button>
                </div>
              </div>

              <br />
              <label class="form-label"><b>Acciones</b></label>

              <div class="grid">
                <button
                  :disabled="!evaluacion.autorizacion || !evaluacion.fechaAuts"
                  class="btn btn-primary"
                  @click.prevent="createEvaluacion()"
                >
                  <i class="fas fa-save"></i> Guardar
                </button>
                <button
                  v-show="
                    this.evaluacion.statusAdministrativo == 'VALIDADO' ||
                      this.$store.state.user.type == 'Supervisor General'
                  "
                  @click.prevent="this.deleteEvaluacion()"
                  class="btn btn-outline-danger px-4"
                >
                  Eliminar Evaluación
                </button>
              </div>
            </div>

            <!-- handdle image upload Start -->
            <div>
              <!-- <form id="imageForm"> -->
              <input
                v-show="false"
                id="imageInput"
                type="file"
                ref="fileInput"
                @input="uploadFile"
                accept="image/*"
              />
              <input
                v-show="false"
                id="imageInputEval"
                type="file"
                ref="fileInputEval"
                @input="uploadFileEval"
                accept="image/*"
              />
              <!-- </form> -->
            </div>
            <!-- handdle image upload Finish -->

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
              @click="this.$router.push(`/listevalssupGener2/${evaluacion._id}`)"
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
import {
  getS3Url_cedulafecha,
  getS3Url_cedulafechaEval,
} from "@/services/s3/s3Service";
import { defineComponent } from "vue";
import { Evaluacion } from "@/interfaces/Evaluacion";
import { create } from "@/services/evaluacion/Evaluacion";
import { getEvaluacions } from "@/services/elderstatistic/Evaluacion";
import { destroy } from "@/services/evaluacion/Evaluacion";
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
      showModalConfirm: false,
      showSpinner: false,
      lockCentro: false,
      filteredCentros: [],
      centros: [
        {
          unap: "MATA NARANJO",
          region: "REGIÓN I",
          provincia: "SAN CRISTOBAL",
          telefono: "-",
          id_center: "303",
        },
        {
          unap: "IGLESIA VIDA EN CRISTO",
          region: "REGIÓN SANTO DOMINGO NORTE",
          provincia: "SANTO DOMINGO DE GUZMÁN",
          telefono: "-",
        },
        {
          unap: "JUNTA DE VECINOS SAN ANTONIO",
          region: "REGIÓN SANTO DOMINGO ESTE",
          provincia: "SANTO DOMINGO DE GUZMÁN",
          telefono: "-",
        },
        {
          unap: "NANCY ORTIZ",
          region: "REGIÓN I",
          provincia: "PERAVIA",
          telefono: "-",
        },
        {
          unap: "ARROYO HONDO",
          region: "REGIÓN V",
          provincia: "LA ROMANA",
          telefono: "-",
        },
        {
          unap: "CENTRO FUNDACION DE DIOS",
          region: "REGIÓN DISTRITO NACIONAL",
          provincia: "DISTRITO NACIONAL",
          telefono: "-",
        },
        {
          unap: "HATO VIEJO",
          region: "REGIÓN MONTE PLATA",
          provincia: "MONTE PLATA",
          telefono: "-",
        },
        {
          unap: "CENTRO DIAGNOSTICO HATO MAYOR",
          region: "REGIÓN V",
          provincia: "HATO MAYOR",
          telefono: "-",
        },
        {
          unap: "CERCA",
          region: "REGIÓN SANTO DOMINGO ESTE",
          provincia: "SANTO DOMINGO DE GUZMÁN",
          telefono: "-",
        },
        {
          unap: "LA CIENAGA",
          region: "REGIÓN I",
          provincia: "SAN JOSE DE OCOA",
          telefono: "-",
        },
        {
          unap: "LA PALMILLA",
          region: "REGIÓN SANTO DOMINGO NORTE",
          provincia: "SANTO DOMINGO DE GUZMÁN",
          telefono: "-",
        },
        {
          unap: "VOLUNTARIADO NACIONAL DE RESCATE Y PREVENCIÓN",
          region: "REGIÓN SANTO DOMINGO ESTE",
          provincia: "SANTO DOMINGO DE GUZMÁN",
          telefono: "-",
        },
        {
          unap: "FUNDACION MI SUEÑO",
          region: "REGIÓN SANTO DOMINGO ESTE",
          provincia: "SANTO DOMINGO DE GUZMÁN",
          telefono: "-",
        },
        {
          unap: "GERONIMO PINALES",
          region: "REGIÓN I",
          provincia: "SAN CRISTOBAL",
          telefono: "-",
        },
        {
          unap: "LA CIENAGA",
          region: "REGIÓN IV",
          provincia: "BARAHONA",
          telefono: "-",
        },
        {
          unap: "EL CAIMITO",
          region: "REGIÓN III",
          provincia: "DUARTE",
          telefono: "-",
        },
        {
          unap: "LOS RANCHITOS",
          region: "REGIÓN I",
          provincia: "SAN JOSE DE OCOA",
          telefono: "-",
        },
        {
          unap: "LA GUAZARA",
          region: "REGIÓN IV",
          provincia: "BARAHONA",
          telefono: "-",
        },
        {
          unap: "LA CATALINA",
          region: "REGIÓN I",
          provincia: "PERAVIA",
          telefono: "-",
        },
        {
          unap: "BARRIO DUARTE",
          region: "REGIÓN I",
          provincia: "SAN CRISTOBAL",
          telefono: "-",
        },
        {
          unap: "DON JUAN",
          region: "REGIÓN V",
          provincia: "SAN PEDRO DE MACORIS",
          telefono: "-",
        },
        {
          unap: "CABRETO NARANJO",
          region: "REGIÓN SANTO DOMINGO ESTE",
          provincia: "SANTO DOMINGO DE GUZMÁN",
          telefono: "-",
        },
        {
          unap: "FUNDACIÓN DR. RAMON DURAN",
          region: "REGIÓN DISTRITO NACIONAL",
          provincia: "DISTRITO NACIONAL",
          telefono: "-",
        },
        {
          unap: "CENTRO DE SALUD INTEGRAL DR. SOCRATES MAÑON",
          region: "REGIÓN SANTO DOMINGO ESTE",
          provincia: "SANTO DOMINGO DE GUZMÁN",
          telefono: "-",
        },
        {
          unap: "FUNDACION PABLITO",
          region: "REGIÓN SANTO DOMINGO ESTE",
          provincia: "SANTO DOMINGO DE GUZMÁN",
          telefono: "-",
        },
        {
          unap: "RALMA",
          region: "REGIÓN SANTO DOMINGO ESTE",
          provincia: "SANTO DOMINGO DE GUZMÁN",
          telefono: "-",
        },
        {
          unap: "JAIBON",
          region: "REGIÓN VII",
          provincia: "VALVERDE",
          telefono: "-",
        },
        {
          unap: "LOS FRAILES III",
          region: "REGIÓN SANTO DOMINGO ESTE",
          provincia: "SANTO DOMINGO DE GUZMÁN",
          telefono: "-",
        },
        {
          unap: "SAN BARTOLO",
          region: "REGIÓN VIII",
          provincia: "LA VEGA",
          telefono: "-",
        },
        {
          unap: "LA JOYA",
          region: "REGIÓN SANTO DOMINGO ESTE",
          provincia: "SANTO DOMINGO DE GUZMÁN",
          telefono: "-",
        },
        {
          unap: "GUERRA",
          region: "REGIÓN SANTO DOMINGO ESTE",
          provincia: "SANTO DOMINGO DE GUZMÁN",
          telefono: "-",
        },
        {
          unap: "EL CAOBAL",
          region: "REGIÓN I",
          provincia: "SAN CRISTOBAL",
          telefono: "-",
        },
        {
          unap: "MATA GORDA",
          region: "REGIÓN I",
          provincia: "PERAVIA",
          telefono: "-",
        },
        {
          unap: "FUNDACION LEVANTANDO LOS CAIDOS",
          region: "REGIÓN SANTO DOMINGO ESTE",
          provincia: "SANTO DOMINGO DE GUZMÁN",
          telefono: "-",
        },
        {
          unap: "PUEBLO NUEVO",
          region: "REGIÓN MONTE PLATA",
          provincia: "MONTE PLATA",
          telefono: "-",
        },
        {
          unap: "CLINICA RURAL LAS CHARCAS",
          region: "REGIÓN VI",
          provincia: "AZUA",
          telefono: "-",
        },
        {
          unap: "FUNBIDE",
          region: "REGIÓN SANTO DOMINGO ESTE",
          provincia: "SANTO DOMINGO DE GUZMÁN",
          telefono: "-",
        },
        {
          unap: "FUNDACION",
          region: "REGIÓN IV",
          provincia: "BARAHONA",
          telefono: "-",
        },
        {
          unap: "MELLA",
          region: "REGIÓN IV",
          provincia: "INDEPENDENCIA",
          telefono: "-",
        },
        {
          unap: "LOS COROZOS",
          region: "REGIÓN VIII",
          provincia: "SANCHEZ RAMIREZ",
          telefono: "-",
        },
        {
          unap: "MAMA TINGO",
          region: "REGIÓN V",
          provincia: "LA ALTAGRACIA",
          telefono: "-",
        },
        {
          unap: "EL HIGUERO",
          region: "REGIÓN VIII",
          provincia: "LA VEGA",
          telefono: "-",
        },
        {
          unap: "LA ESPERANZA",
          region: "REGIÓN VII",
          provincia: "MONTE CRISTI",
          telefono: "-",
        },
        {
          unap: "LAS MERCEDES",
          region: "REGIÓN IV",
          provincia: "INDEPENDENCIA",
          telefono: "-",
        },
        {
          unap: "SAN FRANCISCO",
          region: "REGIÓN VI",
          provincia: "AZUA",
          telefono: "-",
        },
        {
          unap: "JUAN LOPEZ",
          region: "REGIÓN II",
          provincia: "ESPAILLAT",
          telefono: "-",
        },
        {
          unap: "BUEN PASTOR",
          region: "REGIÓN II",
          provincia: "SANTIAGO",
          telefono: "-",
        },
        {
          unap: "TIERRA DURA",
          region: "REGIÓN II",
          provincia: "ESPAILLAT",
          telefono: "-",
        },
        {
          unap: "MAMA TINGO",
          region: "REGIÓN II",
          provincia: "SANTIAGO",
          telefono: "-",
        },
        {
          unap: "MARGARIN",
          region: "REGIÓN V",
          provincia: "EL SEIBO",
          telefono: "-",
        },
        {
          unap: "EL LIMONAL",
          region: "REGIÓN I",
          provincia: "PERAVIA",
          telefono: "-",
        },
        {
          unap: "VILLA ESPERANZA",
          region: "REGIÓN VI",
          provincia: "SAN JUAN DE LA MAGUANA",
          telefono: "-",
        },
        {
          unap: "JUNTA DE VECINO ADRIAN MARTINEZ",
          region: "REGIÓN I",
          provincia: "PERAVIA",
          telefono: "-",
        },
        {
          unap: "EL PINO",
          region: "REGIÓN VIII",
          provincia: "LA VEGA",
          telefono: "-",
        },
        {
          unap: "GREGORIO LUPERON",
          region: "REGIÓN II",
          provincia: "PUERTO PLATA",
          telefono: "-",
        },
        {
          unap: "MAMA TINGO",
          region: "REGIÓN I",
          provincia: "SAN CRISTOBAL",
          telefono: "-",
        },
        {
          unap: "CENTRO COMUNITARIO LOS RAMIREZ",
          region: "REGIÓN DISTRITO NACIONAL",
          provincia: "DISTRITO NACIONAL",
          telefono: "-",
        },
        {
          unap: "SAN ANTONIO",
          region: "REGIÓN MONTE PLATA",
          provincia: "MONTE PLATA",
          telefono: "-",
        },
        {
          unap: "VILLA LIBERACION",
          region: "REGIÓN SANTO DOMINGO ESTE",
          provincia: "SANTO DOMINGO DE GUZMÁN",
          telefono: "-",
        },
        {
          unap: "LOS COCOS",
          region: "REGIÓN SANTO DOMINGO OESTE",
          provincia: "SANTO DOMINGO DE GUZMÁN",
          telefono: "-",
        },
        {
          unap: "FUNDAZURZA",
          region: "REGIÓN DISTRITO NACIONAL",
          provincia: "DISTRITO NACIONAL",
          telefono: "-",
        },
        {
          unap: "LA CIENAGA",
          region: "REGIÓN DISTRITO NACIONAL",
          provincia: "DISTRITO NACIONAL",
          telefono: "-",
        },
        {
          unap: "LA CEIBA DE MADERA",
          region: "REGIÓN II",
          provincia: "ESPAILLAT",
          telefono: "-",
        },
        {
          unap: "CAMPO LINDO II",
          region: "REGIÓN SANTO DOMINGO ESTE",
          provincia: "SANTO DOMINGO DE GUZMÁN",
          telefono: "-",
        },
        {
          unap: "CABRETO",
          region: "REGIÓN SANTO DOMINGO ESTE",
          provincia: "SANTO DOMINGO DE GUZMÁN",
          telefono: "-",
        },
        {
          unap: "SANTA ROSA",
          region: "REGIÓN II",
          provincia: "ESPAILLAT",
          telefono: "-",
        },
        {
          unap: "30 DE MAYO",
          region: "REGIÓN IV",
          provincia: "BARAHONA",
          telefono: "-",
        },
        {
          unap: "HATO NUEVO",
          region: "REGIÓN VI",
          provincia: "AZUA",
          telefono: "-",
        },
        {
          unap: "FUNDACION YAGUATE",
          region: "REGIÓN I",
          provincia: "SAN CRISTOBAL",
          telefono: "-",
        },
        {
          unap: "FUNDACION FANTINO",
          region: "REGIÓN III",
          provincia: "MARÍA TRINIDAD SANCHEZ",
          telefono: "-",
        },
        {
          unap: "LOS GUANDULES I",
          region: "REGIÓN DISTRITO NACIONAL",
          provincia: "DISTRITO NACIONAL",
          telefono: "-",
        },
        {
          unap: "FUNDACION LOS TRES BRAZOS (DOMICILIARIOS)",
          region: "REGIÓN SANTO DOMINGO ESTE",
          provincia: "SANTO DOMINGO DE GUZMÁN",
          telefono: "-",
        },
        {
          unap: "FUNDACION",
          region: "REGIÓN V",
          provincia: "LA ROMANA",
          telefono: "-",
        },
        {
          unap: "FUNDACIÓN SOL VIVIENTE",
          region: "REGIÓN SANTO DOMINGO ESTE",
          provincia: "SANTO DOMINGO DE GUZMÁN",
          telefono: "-",
        },
        {
          unap: "FUNDACION SIEMBRA Y COSECHA  RD",
          region: "REGIÓN SANTO DOMINGO OESTE",
          provincia: "SANTO DOMINGO DE GUZMÁN",
          telefono: "-",
        },
        {
          unap: "LAS FLORES",
          region: "REGIÓN I",
          provincia: "SAN JOSE DE OCOA",
          telefono: "-",
        },
        {
          unap: "MENDOZA",
          region: "REGIÓN SANTO DOMINGO ESTE",
          provincia: "SANTO DOMINGO DE GUZMÁN",
          telefono: "-",
        },
        {
          unap: "YACOT (DOMICILIARIO)",
          region: "REGIÓN SANTO DOMINGO OESTE",
          provincia: "SANTO DOMINGO DE GUZMÁN",
          telefono: "-",
        },
        {
          unap: "FUNDACION LOS GARCIA (DOMICILIARIO)",
          region: "REGIÓN SANTO DOMINGO OESTE",
          provincia: "SANTO DOMINGO DE GUZMÁN",
          telefono: "-",
        },
        {
          unap: "FUNDACION VALIENTE",
          region: "REGIÓN SANTO DOMINGO ESTE",
          provincia: "SANTO DOMINGO DE GUZMÁN",
          telefono: "-",
        },
        {
          unap: "FUNRASO",
          region: "REGIÓN SANTO DOMINGO ESTE",
          provincia: "SANTO DOMINGO DE GUZMÁN",
          telefono: "-",
        },
        {
          unap: "MINISTERIO JESUS DE NAZARET",
          region: "REGIÓN SANTO DOMINGO NORTE",
          provincia: "SANTO DOMINGO DE GUZMÁN",
          telefono: "-",
        },
        {
          unap: "FUNDACION PROAYUDA ENVEJECIENTES",
          region: "REGIÓN I",
          provincia: "PERAVIA",
          telefono: "-",
        },
        {
          unap: "CAPOTILLO CDC",
          region: "REGIÓN DISTRITO NACIONAL",
          provincia: "DISTRITO NACIONAL",
          telefono: "-",
        },
        {
          unap: "MANOGUAYABO",
          region: "REGIÓN SANTO DOMINGO OESTE",
          provincia: "SANTO DOMINGO DE GUZMÁN",
          telefono: "-",
        },
        {
          unap: "MARIANO CESTERO",
          region: "REGIÓN VII",
          provincia: "DAJABON",
          telefono: "-",
        },
        {
          unap: "PONTON",
          region: "REGIÓN VIII",
          provincia: "LA VEGA",
          telefono: "-",
        },
        {
          unap: "VALENTIN SALINERO",
          region: "REGIÓN VII",
          provincia: "DAJABON",
          telefono: "-",
        },
        {
          unap: "ENRIQUILLO",
          region: "REGIÓN VII",
          provincia: "VALVERDE",
          telefono: "-",
        },
        {
          unap: "EL PINAR",
          region: "REGIÓN I",
          provincia: "SAN JOSE DE OCOA",
          telefono: "-",
        },
        {
          unap: "GUAYABAL",
          region: "REGIÓN VI",
          provincia: "AZUA",
          telefono: "-",
        },
        {
          unap: "ASOC. DE LIDERES EMPRENDEDORES VOLUNTARIOS",
          region: "REGIÓN SANTO DOMINGO NORTE",
          provincia: "SANTO DOMINGO DE GUZMÁN",
          telefono: "-",
        },
        {
          unap: "LA CURVA",
          region: "REGIÓN VII",
          provincia: "DAJABON",
          telefono: "-",
        },
        {
          unap: "CRISTOBAL",
          region: "REGIÓN IV",
          provincia: "INDEPENDENCIA",
          telefono: "-",
        },
        {
          unap: "EL LICEY",
          region: "REGIÓN II",
          provincia: "LA VEGA",
          telefono: "-",
        },
        {
          unap: "PEDRO BRAND CENTRO DIAGNOSTICO",
          region: "REGIÓN SANTO DOMINGO OESTE",
          provincia: "SANTO DOMINGO DE GUZMÁN",
          telefono: "-",
        },
        {
          unap: "ESMERALDO DIAZ",
          region: "REGIÓN DISTRITO NACIONAL",
          provincia: "DISTRITO NACIONAL",
          telefono: "-",
        },
        {
          unap: "JAQUIMEYES",
          region: "REGIÓN IV",
          provincia: "BARAHONA",
          telefono: "-",
        },
        {
          unap: "LA ATALAYA",
          region: "REGIÓN VIII",
          provincia: "SANCHEZ RAMIREZ",
          telefono: "-",
        },
        {
          unap: "ASCENCION DEL SEÑOR",
          region: "REGIÓN DISTRITO NACIONAL",
          provincia: "DISTRITO NACIONAL",
          telefono: "-",
        },
        {
          unap: "LA LUISA",
          region: "REGIÓN MONTE PLATA",
          provincia: "MONTE PLATA",
          telefono: "-",
        },
        {
          unap: "VILLA ORTEGA",
          region: "REGIÓN V",
          provincia: "HATO MAYOR",
          telefono: "-",
        },
        {
          unap: "JOBA ARRIBA",
          region: "REGIÓN II",
          provincia: "ESPAILLAT",
          telefono: "-",
        },
        {
          unap: "PUNTA DE GARZA",
          region: "REGIÓN V",
          provincia: "SAN PEDRO DE MACORIS",
          telefono: "-",
        },
        {
          unap: "LA AGUSTINA",
          region: "REGIÓN DISTRITO NACIONAL",
          provincia: "DISTRITO NACIONAL",
          telefono: "-",
        },
        {
          unap: "TOMAS DESIR LEBRON",
          region: "REGIÓN V",
          provincia: "LA ROMANA",
          telefono: "-",
        },
        {
          unap: "GOUTIER",
          region: "REGIÓN V",
          provincia: "SAN PEDRO DE MACORIS",
          telefono: "-",
        },
        {
          unap: "HOSPITAL NUESTRA SEÑORA DEL CARMEN",
          region: "REGIÓN VI",
          provincia: "AZUA",
          telefono: "-",
        },
        {
          unap: "DIOS HABLA",
          region: "REGIÓN SANTO DOMINGO NORTE",
          provincia: "SANTO DOMINGO DE GUZMÁN",
          telefono: "-",
        },
        {
          unap: "EL RUBIO",
          region: "REGIÓN II",
          provincia: "SANTIAGO",
          telefono: "-",
        },
        {
          unap: "PADRE CAVALOTTO",
          region: "REGIÓN V",
          provincia: "LA ROMANA",
          telefono: "-",
        },
        {
          unap: "CANOA",
          region: "REGIÓN IV",
          provincia: "BARAHONA",
          telefono: "-",
        },
        {
          unap: "PLAYA BARAHONA",
          region: "REGIÓN IV",
          provincia: "BARAHONA",
          telefono: "-",
        },
        {
          unap: "HOSPITAL SAGRADO CORAZON DE JESUS",
          region: "REGIÓN V",
          provincia: "SAN PEDRO DE MACORIS",
          telefono: "-",
        },
        {
          unap: "LA NUEVA BARQUITA",
          region: "REGIÓN SANTO DOMINGO NORTE",
          provincia: "SANTO DOMINGO DE GUZMÁN",
          telefono: "-",
        },
        {
          unap: "VILLA BAO",
          region: "REGIÓN II",
          provincia: "SANTIAGO",
          telefono: "-",
        },
        {
          unap: "CAMPO LINDO I",
          region: "REGIÓN SANTO DOMINGO ESTE",
          provincia: "SANTO DOMINGO DE GUZMÁN",
          telefono: "-",
        },
        {
          unap: "ISABELITA",
          region: "REGIÓN SANTO DOMINGO ESTE",
          provincia: "SANTO DOMINGO DE GUZMÁN",
          telefono: "-",
        },
        {
          unap: "QUITA SUEÑO",
          region: "REGIÓN I",
          provincia: "SAN CRISTOBAL",
          telefono: "-",
        },
        {
          unap: "RANCHO VIEJO",
          region: "REGIÓN VIII",
          provincia: "LA VEGA",
          telefono: "-",
        },
        {
          unap: "MIRADOR SUR",
          region: "REGIÓN V",
          provincia: "EL SEIBO",
          telefono: "-",
        },
        {
          unap: "SAN ANTONIO",
          region: "REGIÓN I",
          provincia: "SAN JOSE DE OCOA",
          telefono: "-",
        },
        {
          unap: "PUEBLO ABAJO",
          region: "REGIÓN I",
          provincia: "SAN JOSE DE OCOA",
          telefono: "-",
        },
        {
          unap: "EL PUEBLECITO",
          region: "REGIÓN I",
          provincia: "SAN CRISTOBAL",
          telefono: "-",
        },
        {
          unap: "LAS CHINAS",
          region: "REGIÓN V",
          provincia: "HATO MAYOR",
          telefono: "-",
        },
        {
          unap: "BONAGUA",
          region: "REGIÓN II",
          provincia: "ESPAILLAT",
          telefono: "-",
        },
        {
          unap: "EL HIGUERO",
          region: "REGIÓN V",
          provincia: "LA ROMANA",
          telefono: "-",
        },
        {
          unap: "EL DIQUE",
          region: "REGIÓN SANTO DOMINGO ESTE",
          provincia: "SANTO DOMINGO DE GUZMÁN",
          telefono: "-",
        },
        {
          unap: "FUNDACION VILLA FARO",
          region: "REGIÓN SANTO DOMINGO ESTE",
          provincia: "SANTO DOMINGO DE GUZMÁN",
          telefono: "-",
        },
        {
          unap: "VALENTIN BUTTEN",
          region: "REGIÓN DISTRITO NACIONAL",
          provincia: "DISTRITO NACIONAL",
          telefono: "-",
        },
        {
          unap: "ENTRADA DE MAO",
          region: "REGIÓN VII",
          provincia: "VALVERDE",
          telefono: "-",
        },
        {
          unap: "VILLA HERMOSA I & II",
          region: "REGIÓN V",
          provincia: "LA ROMANA",
          telefono: "-",
        },
        {
          unap: "FUNDACION 2 ENERO",
          region: "REGIÓN SANTO DOMINGO ESTE",
          provincia: "SANTO DOMINGO DE GUZMÁN",
          telefono: "-",
        },
        {
          unap: "FUNDACION BARRIO ANGELES",
          region: "REGIÓN DISTRITO NACIONAL",
          provincia: "DISTRITO NACIONAL",
          telefono: "-",
        },
        {
          unap: "CORBANO NORTE",
          region: "REGIÓN VI",
          provincia: "SAN JUAN DE LA MAGUANA",
          telefono: "-",
        },
        {
          unap: "CLINICA RURAL LOS  YAGUARIZOS",
          region: "REGIÓN I",
          provincia: "PERAVIA",
          telefono: "-",
        },
        {
          unap: "LIMONES DEL FACTOR",
          region: "REGIÓN III",
          provincia: "MARÍA TRINIDAD SANCHEZ",
          telefono: "-",
        },
        {
          unap: "EL DIAZ PINEYRO",
          region: "REGIÓN SANTO DOMINGO OESTE",
          provincia: "SANTO DOMINGO DE GUZMÁN",
          telefono: "-",
        },
        {
          unap: "CABALLONA",
          region: "REGIÓN SANTO DOMINGO OESTE",
          provincia: "SANTO DOMINGO DE GUZMÁN",
          telefono: "-",
        },
        {
          unap: "LA FURNIA",
          region: "REGIÓN IV",
          provincia: "BARAHONA",
          telefono: "-",
        },
        {
          unap: "FUNDACION VILLA MORADA",
          region: "REGIÓN SANTO DOMINGO ESTE",
          provincia: "SANTO DOMINGO DE GUZMÁN",
          telefono: "-",
        },
        {
          unap: "ANGELINA",
          region: "REGIÓN V",
          provincia: "SAN PEDRO DE MACORIS",
          telefono: "-",
        },
        {
          unap: "COLONIA MIXTA",
          region: "REGIÓN IV",
          provincia: "INDEPENDENCIA",
          telefono: "-",
        },
        {
          unap: "ENCAMADOS (DOMICILIARIOS)",
          region: "REGIÓN DISTRITO NACIONAL",
          provincia: "SANTO DOMINGO DE GUZMÁN",
          telefono: "-",
        },
        {
          unap: "VIRGILIO DE LA NUEZ",
          region: "REGIÓN II",
          provincia: "SANTIAGO",
          telefono: "-",
        },
        {
          unap: "BELLA VISTA",
          region: "REGIÓN II",
          provincia: "SANTIAGO",
          telefono: "-",
        },
        {
          unap: "LOMA DE CASTAÑUELAS",
          region: "REGIÓN VII",
          provincia: "MONTE CRISTI",
          telefono: "-",
        },
        {
          unap: "LAS YAGUITAS",
          region: "REGIÓN V",
          provincia: "HATO MAYOR",
          telefono: "-",
        },
        {
          unap: "EL SALADO",
          region: "REGIÓN V",
          provincia: "LA ALTAGRACIA",
          telefono: "-",
        },
        {
          unap: "LOS PLATANITOS",
          region: "REGIÓN V",
          provincia: "LA ALTAGRACIA",
          telefono: "-",
        },
        {
          unap: "HOYO DE JAYA",
          region: "REGIÓN III",
          provincia: "DUARTE",
          telefono: "-",
        },
        {
          unap: "LOTES Y SERVICIOS",
          region: "REGIÓN SANTO DOMINGO NORTE",
          provincia: "SANTO DOMINGO DE GUZMÁN",
          telefono: "-",
        },
        {
          unap: "FUNDACION DOMINICANA DE DESARROLLO SOSTENIBLE PROHUMANO",
          region: "REGIÓN SANTO DOMINGO OESTE",
          provincia: "SANTO DOMINGO DE GUZMÁN",
          telefono: "-",
        },
        {
          unap: "VILLA CARMELA",
          region: "REGIÓN SANTO DOMINGO NORTE",
          provincia: "SANTO DOMINGO DE GUZMÁN",
          telefono: "-",
        },
        {
          unap: "MATANZAS",
          region: "REGIÓN II",
          provincia: "SANTIAGO",
          telefono: "-",
        },
        {
          unap: "VILLA HERMOSA III",
          region: "REGIÓN V",
          provincia: "LA ROMANA",
          telefono: "-",
        },
        {
          unap: "EL JAVILLAR",
          region: "REGIÓN II",
          provincia: "PUERTO PLATA",
          telefono: "-",
        },
        {
          unap: "LA MAJAGUA",
          region: "REGIÓN III",
          provincia: "SAMANÁ",
          telefono: "-",
        },
        {
          unap: "CAMPAMENTO 16 DE AGOSTO",
          region: "REGIÓN SANTO DOMINGO OESTE",
          provincia: "SANTO DOMINGO DE GUZMÁN",
          telefono: "-",
        },
        {
          unap: "JUAN SANCHEZ",
          region: "REGIÓN MONTE PLATA",
          provincia: "MONTE PLATA",
          telefono: "-",
        },
        {
          unap: "VILLA NAVARRO",
          region: "REGIÓN V",
          provincia: "HATO MAYOR",
          telefono: "-",
        },
        {
          unap: "MORQUECHO",
          region: "REGIÓN V",
          provincia: "HATO MAYOR",
          telefono: "-",
        },
        {
          unap: "MATA HAMBRE",
          region: "REGIÓN DISTRITO NACIONAL",
          provincia: "DISTRITO NACIONAL",
          telefono: "-",
        },
        {
          unap: "DE LAS MANOS DE JESUS",
          region: "REGIÓN SANTO DOMINGO OESTE",
          provincia: "SANTO DOMINGO DE GUZMÁN",
          telefono: "-",
        },
        {
          unap: "LAS CAOBAS",
          region: "REGIÓN SANTO DOMINGO OESTE",
          provincia: "SANTO DOMINGO DE GUZMÁN",
          telefono: "-",
        },
        {
          unap: "JUNTA DE DESARROLLO DE GUALEY",
          region: "REGIÓN DISTRITO NACIONAL",
          provincia: "DISTRITO NACIONAL",
          telefono: "-",
        },
        {
          unap: "POLO",
          region: "REGIÓN IV",
          provincia: "BARAHONA",
          telefono: "-",
        },
        {
          unap: "HATO DEL PADRE",
          region: "REGIÓN VI",
          provincia: "SAN JUAN DE LA MAGUANA",
          telefono: "-",
        },
        {
          unap: "YERBA BUENA",
          region: "REGIÓN V",
          provincia: "HATO MAYOR",
          telefono: "-",
        },
        {
          unap: "LA RAQUETA",
          region: "REGIÓN IV",
          provincia: "BARAHONA",
          telefono: "-",
        },
        {
          unap: "BOCA CHICA II",
          region: "REGIÓN SANTO DOMINGO ESTE",
          provincia: "SANTO DOMINGO DE GUZMÁN",
          telefono: "-",
        },
        {
          unap: "LOS LIMONES DE VIILA TAPIA",
          region: "REGIÓN III",
          provincia: "HERMANAS MIRABAL",
          telefono: "-",
        },
        {
          unap: "LOS TOCONES",
          region: "REGIÓN II",
          provincia: "SANTIAGO",
          telefono: "-",
        },
        {
          unap: "LAS CHARCAS DE GARABITO",
          region: "REGIÓN VI",
          provincia: "SAN JUAN DE LA MAGUANA",
          telefono: "-",
        },
        {
          unap: "LA REFORMA",
          region: "REGIÓN III",
          provincia: "DUARTE",
          telefono: "-",
        },
        {
          unap: "HATO SAN PEDRO",
          region: "REGIÓN MONTE PLATA",
          provincia: "MONTE PLATA",
          telefono: "-",
        },
        {
          unap: "SAN MARTIN DE PORRES",
          region: "REGIÓN V",
          provincia: "SAN PEDRO DE MACORIS",
          telefono: "-",
        },
        {
          unap: "PALO BLANCO",
          region: "REGIÓN II",
          provincia: "SANTIAGO",
          telefono: "-",
        },
        {
          unap: "MUNICIPAL",
          region: "REGIÓN DISTRITO NACIONAL",
          provincia: "DISTRITO NACIONAL",
          telefono: "-",
        },
        {
          unap: "LUIS J SUAREZ",
          region: "REGIÓN V",
          provincia: "LA ROMANA",
          telefono: "-",
        },
        {
          unap: "ESTEBANIA BORINQUE",
          region: "REGIÓN I",
          provincia: "SAN CRISTOBAL",
          telefono: "-",
        },
        {
          unap: "LLANO DE PEREZ",
          region: "REGIÓN II",
          provincia: "PUERTO PLATA",
          telefono: "-",
        },
        {
          unap: "LAS LAGUNAS",
          region: "REGIÓN II",
          provincia: "ESPAILLAT",
          telefono: "-",
        },
        {
          unap: "JUNTA DE VECINOS PERALEJOS CAMBIA",
          region: "REGIÓN DISTRITO NACIONAL",
          provincia: "DISTRITO NACIONAL",
          telefono: "-",
        },
        {
          unap: "ESCALERETA",
          region: "REGIÓN II",
          provincia: "PUERTO PLATA",
          telefono: "-",
        },
        {
          unap: "HOSPITAL MUNICIPAL YAMASA",
          region: "REGIÓN MONTE PLATA",
          provincia: "MONTE PLATA",
          telefono: "-",
        },
        {
          unap: "SAN ISIDRO",
          region: "REGIÓN SANTO DOMINGO ESTE",
          provincia: "SANTO DOMINGO DE GUZMÁN",
          telefono: "-",
        },
        {
          unap: "MERCEDITO VIZCAINO",
          region: "REGIÓN I",
          provincia: "SAN CRISTOBAL",
          telefono: "-",
        },
        {
          unap: "DIVINA PROVIDENCIA",
          region: "REGIÓN DISTRITO NACIONAL",
          provincia: "DISTRITO NACIONAL",
          telefono: "-",
        },
        {
          unap: "FELIZ GARCIA",
          region: "REGIÓN II",
          provincia: "ESPAILLAT",
          telefono: "-",
        },
        {
          unap: "VILLA SOMBRERO",
          region: "REGIÓN I",
          provincia: "PERAVIA",
          telefono: "-",
        },
        {
          unap: "CAYACOA",
          region: "REGIÓN V",
          provincia: "SAN PEDRO DE MACORIS",
          telefono: "-",
        },
        {
          unap: "VILLA LIBERACION",
          region: "REGIÓN II",
          provincia: "PUERTO PLATA",
          telefono: "-",
        },
        {
          unap: "PERPETUO SOCORRO",
          region: "REGIÓN VI",
          provincia: "SAN JUAN DE LA MAGUANA",
          telefono: "-",
        },
        {
          unap: "PADRE DE LAS CASAS",
          region: "REGIÓN II",
          provincia: "PUERTO PLATA",
          telefono: "-",
        },
        {
          unap: "JACAGUA ARRIBA",
          region: "REGIÓN II",
          provincia: "SANTIAGO",
          telefono: "-",
        },
        {
          unap: "SAN BARTOLO",
          region: "REGIÓN SANTO DOMINGO ESTE",
          provincia: "SANTO DOMINGO DE GUZMÁN",
          telefono: "-",
        },
        {
          unap: "LOS YAYALES",
          region: "REGIÓN III",
          provincia: "MARÍA TRINIDAD SANCHEZ",
          telefono: "-",
        },
        {
          unap: "MADRE LAURA",
          region: "REGIÓN SANTO DOMINGO ESTE",
          provincia: "SANTO DOMINGO DE GUZMÁN",
          telefono: "-",
        },
        {
          unap: "BOCA FERREA",
          region: "REGIÓN II",
          provincia: "ESPAILLAT",
          telefono: "-",
        },
        {
          unap: "LOS ARROCES",
          region: "REGIÓN VIII",
          provincia: "MONSEÑOR NOUEL",
          telefono: "-",
        },
        {
          unap: "MANUEL RODRIGUEZ",
          region: "REGIÓN II",
          provincia: "ESPAILLAT",
          telefono: "-",
        },
        {
          unap: "KM 10",
          region: "REGIÓN V",
          provincia: "LA ROMANA",
          telefono: "-",
        },
        {
          unap: "VILLA DUARTE",
          region: "REGIÓN SANTO DOMINGO ESTE",
          provincia: "SANTO DOMINGO DE GUZMÁN",
          telefono: "-",
        },
        {
          unap: "CORALES CAÑA",
          region: "REGIÓN SANTO DOMINGO ESTE",
          provincia: "SANTO DOMINGO DE GUZMÁN",
          telefono: "-",
        },
        {
          unap: "SANTA CLARA",
          region: "REGIÓN V",
          provincia: "SAN PEDRO DE MACORIS",
          telefono: "-",
        },
        {
          unap: "BARRIO LINDO",
          region: "REGIÓN VIII",
          provincia: "SANCHEZ RAMIREZ",
          telefono: "-",
        },
        {
          unap: "BASIMA",
          region: "REGIÓN I",
          provincia: "SAN CRISTOBAL",
          telefono: "-",
        },
        {
          unap: "MONTE ADENTRO",
          region: "REGIÓN SANTO DOMINGO ESTE",
          provincia: "SANTO DOMINGO DE GUZMÁN",
          telefono: "-",
        },
        {
          unap: "EL SILENCIO",
          region: "REGIÓN I",
          provincia: "SAN CRISTOBAL",
          telefono: "-",
        },
        {
          unap: "YOLANDA GUZMAN",
          region: "REGIÓN DISTRITO NACIONAL",
          provincia: "DISTRITO NACIONAL",
          telefono: "-",
        },
        {
          unap: "LOS COROZOS",
          region: "REGIÓN SANTO DOMINGO OESTE",
          provincia: "SANTO DOMINGO DE GUZMÁN",
          telefono: "-",
        },
        {
          unap: "LOS ALCARRIZOS I",
          region: "REGIÓN SANTO DOMINGO OESTE",
          provincia: "SANTO DOMINGO DE GUZMÁN",
          telefono: "-",
        },
        {
          unap: "SIERRA PRIETA",
          region: "REGIÓN VIII",
          provincia: "SANCHEZ RAMIREZ",
          telefono: "-",
        },
        {
          unap: "CABALLERO",
          region: "REGIÓN VIII",
          provincia: "SANCHEZ RAMIREZ",
          telefono: "-",
        },
        {
          unap: "LOS COCOS",
          region: "REGIÓN IV",
          provincia: "BAHORUCO",
          telefono: "-",
        },
        {
          unap: "LAS PALOMAS",
          region: "REGIÓN IV",
          provincia: "BARAHONA",
          telefono: "-",
        },
        {
          unap: "PILOTO",
          region: "REGIÓN VII",
          provincia: "MONTE CRISTI",
          telefono: "-",
        },
        {
          unap: "EL PEÑON",
          region: "REGIÓN IV",
          provincia: "BARAHONA",
          telefono: "-",
        },
        {
          unap: "LAS 7S",
          region: "REGIÓN VIII",
          provincia: "LA VEGA",
          telefono: "-",
        },
        {
          unap: "CORBANO SUR 2",
          region: "REGIÓN VI",
          provincia: "SAN JUAN DE LA MAGUANA",
          telefono: "-",
        },
        {
          unap: "EL PUERTO",
          region: "REGIÓN V",
          provincia: "SAN PEDRO DE MACORIS",
          telefono: "-",
        },
        {
          unap: "FUNDACOSI",
          region: "REGIÓN SANTO DOMINGO NORTE",
          provincia: "SANTO DOMINGO DE GUZMÁN",
          telefono: "-",
        },
        {
          unap: "MAIMON",
          region: "REGIÓN II",
          provincia: "PUERTO PLATA",
          telefono: "-",
        },
        {
          unap: "PARAISO",
          region: "REGIÓN IV",
          provincia: "BARAHONA",
          telefono: "-",
        },
        {
          unap: "PINA VIEJA",
          region: "REGIÓN VIII",
          provincia: "SANCHEZ RAMIREZ",
          telefono: "-",
        },
        {
          unap: "URBANO VILLA TAPIA",
          region: "REGIÓN III",
          provincia: "HERMANAS MIRABAL",
          telefono: "-",
        },
        {
          unap: "INGENIO OZAMA",
          region: "REGIÓN SANTO DOMINGO ESTE",
          provincia: "SANTO DOMINGO DE GUZMÁN",
          telefono: "-",
        },
        {
          unap: "ANA CRUZ",
          region: "REGIÓN II",
          provincia: "SANTIAGO",
          telefono: "-",
        },
        {
          unap: "RIO GRANDE",
          region: "REGIÓN II",
          provincia: "PUERTO PLATA",
          telefono: "-",
        },
        {
          unap: "SANTA BARBARA",
          region: "REGIÓN VII",
          provincia: "MONTE CRISTI",
          telefono: "-",
        },
        {
          unap: "PALOMA MENSAJERA",
          region: "REGIÓN IV",
          provincia: "BAHORUCO",
          telefono: "-",
        },
        {
          unap: "MATANCITAS",
          region: "REGIÓN III",
          provincia: "MARÍA TRINIDAD SANCHEZ",
          telefono: "-",
        },
        {
          unap: "FUNDACION PERAVIA",
          region: "REGIÓN I",
          provincia: "PERAVIA",
          telefono: "-",
        },
        {
          unap: "SABANA TORO",
          region: "REGIÓN I",
          provincia: "SAN CRISTOBAL",
          telefono: "-",
        },
        {
          unap: "MONTAÑO",
          region: "REGIÓN I",
          provincia: "SAN CRISTOBAL",
          telefono: "-",
        },
        {
          unap: "VENDAÑO",
          region: "REGIÓN I",
          provincia: "SAN CRISTOBAL",
          telefono: "-",
        },
        {
          unap: "DOÑA ANA",
          region: "REGIÓN I",
          provincia: "SAN CRISTOBAL",
          telefono: "-",
        },
        {
          unap: "CABARETE",
          region: "REGIÓN II",
          provincia: "PUERTO PLATA",
          telefono: "-",
        },
        {
          unap: "LOS LIMONES DE PIMENTEL",
          region: "REGIÓN III",
          provincia: "DUARTE",
          telefono: "-",
        },
        {
          unap: "VILLA LIBERACION",
          region: "REGIÓN II",
          provincia: "SANTIAGO",
          telefono: "-",
        },
        {
          unap: "CAMBITA PUEBLO",
          region: "REGIÓN I",
          provincia: "SAN CRISTOBAL",
          telefono: "-",
        },
        {
          unap: "LA CEIBA",
          region: "REGIÓN VIII",
          provincia: "MONSEÑOR NOUEL",
          telefono: "-",
        },
        {
          unap: "JUAN PABLO SEGUNDO",
          region: "REGIÓN SANTO DOMINGO OESTE",
          provincia: "SANTO DOMINGO DE GUZMÁN",
          telefono: "-",
        },
        {
          unap: "PAJARITO",
          region: "REGIÓN I",
          provincia: "SAN CRISTOBAL",
          telefono: "-",
        },
        {
          unap: "GUANANITO",
          region: "REGIÓN I",
          provincia: "SAN CRISTOBAL",
          telefono: "-",
        },
        {
          unap: "LOS TOMINES",
          region: "REGIÓN VII",
          provincia: "SANTIAGO RODRÍGUEZ",
          telefono: "-",
        },
        {
          unap: "RAMONA SANTANA DE LLUBERES",
          region: "REGIÓN I",
          provincia: "SAN CRISTOBAL",
          telefono: "-",
        },
        {
          unap: "LOS MOGOTES",
          region: "REGIÓN I",
          provincia: "SAN CRISTOBAL",
          telefono: "-",
        },
        {
          unap: "LAS GORDAS",
          region: "REGIÓN III",
          provincia: "MARÍA TRINIDAD SANCHEZ",
          telefono: "-",
        },
        {
          unap: "PINO HERRADO",
          region: "REGIÓN I",
          provincia: "SAN CRISTOBAL",
          telefono: "-",
        },
        {
          unap: "CAÑO PIEDRA",
          region: "REGIÓN VIII",
          provincia: "MONSEÑOR NOUEL",
          telefono: "-",
        },
        {
          unap: "PARAISO DE DIOS",
          region: "REGIÓN I",
          provincia: "SAN CRISTOBAL",
          telefono: "-",
        },
        {
          unap: "LA CANELA",
          region: "REGIÓN II",
          provincia: "SANTIAGO",
          telefono: "-",
        },
        {
          unap: "EL PESCOZON",
          region: "REGIÓN VIII",
          provincia: "SANCHEZ RAMIREZ",
          telefono: "-",
        },
        {
          unap: "HATO NUEVO",
          region: "REGIÓN SANTO DOMINGO OESTE",
          provincia: "SANTO DOMINGO DE GUZMÁN",
          telefono: "-",
        },
        {
          unap: "LA LOMETA",
          region: "REGIÓN III",
          provincia: "MARÍA TRINIDAD SANCHEZ",
          telefono: "-",
        },
        {
          unap: "BIENVENIDO",
          region: "REGIÓN SANTO DOMINGO OESTE",
          provincia: "SANTO DOMINGO DE GUZMÁN",
          telefono: "-",
        },
        {
          unap: "BARRIO NUEVO LA HERRADURA",
          region: "REGIÓN II",
          provincia: "SANTIAGO",
          telefono: "-",
        },
        {
          unap: "LAS SALINAS",
          region: "REGIÓN IV",
          provincia: "BARAHONA",
          telefono: "-",
        },
        {
          unap: "CAMBOYA",
          region: "REGIÓN I",
          provincia: "SAN CRISTOBAL",
          telefono: "-",
        },
        {
          unap: "NORMAN RUIZ",
          region: "REGIÓN I",
          provincia: "SAN CRISTOBAL",
          telefono: "-",
        },
        {
          unap: "BRISAS DEL ESTE",
          region: "REGIÓN SANTO DOMINGO ESTE",
          provincia: "SANTO DOMINGO DE GUZMÁN",
          telefono: "-",
        },
        {
          unap: "MOSCU",
          region: "REGIÓN I",
          provincia: "SAN CRISTOBAL",
          telefono: "-",
        },
        {
          unap: "LOS TOROS",
          region: "REGIÓN I",
          provincia: "SAN CRISTOBAL",
          telefono: "-",
        },
        {
          unap: "MANUEL BUENO",
          region: "REGIÓN VII",
          provincia: "DAJABON",
          telefono: "-",
        },
        {
          unap: "HERNANDO ALONZO",
          region: "REGIÓN VIII",
          provincia: "SANCHEZ RAMIREZ",
          telefono: "-",
        },
        {
          unap: "SABANA GRANDE DE PALENQUE",
          region: "REGIÓN I",
          provincia: "SAN CRISTOBAL",
          telefono: "-",
        },
        {
          unap: "VILLA HERMOSA V",
          region: "REGIÓN V",
          provincia: "LA ROMANA",
          telefono: "-",
        },
        {
          unap: "PARCELEROS",
          region: "REGIÓN I",
          provincia: "SAN CRISTOBAL",
          telefono: "-",
        },
        {
          unap: "LAS TARANAS",
          region: "REGIÓN III",
          provincia: "DUARTE",
          telefono: "-",
        },
        {
          unap: "5TO CENTENARIO",
          region: "REGIÓN I",
          provincia: "SAN CRISTOBAL",
          telefono: "-",
        },
        {
          unap: "EL CAIMITO",
          region: "REGIÓN II",
          provincia: "SANTIAGO",
          telefono: "-",
        },
        {
          unap: "BARRIO OBRERO",
          region: "REGIÓN II",
          provincia: "SANTIAGO",
          telefono: "-",
        },
        {
          unap: "RINCON HONDO",
          region: "REGIÓN III",
          provincia: "DUARTE",
          telefono: "-",
        },
        {
          unap: "PALMITO",
          region: "REGIÓN IV",
          provincia: "INDEPENDENCIA",
          telefono: "-",
        },
        {
          unap: "PADRE ADOLFO CASADO",
          region: "REGIÓN VIII",
          provincia: "MONSEÑOR NOUEL",
          telefono: "-",
        },
        {
          unap: "VILLA JARAGUA",
          region: "REGIÓN IV",
          provincia: "BAHORUCO",
          telefono: "-",
        },
        {
          unap: "VILLA CARMEN",
          region: "REGIÓN VI",
          provincia: "SAN JUAN DE LA MAGUANA",
          telefono: "-",
        },
        {
          unap: "LOS RANCHITOS",
          region: "REGIÓN VIII",
          provincia: "LA VEGA",
          telefono: "-",
        },
        {
          unap: "RESTAURACIÓN",
          region: "REGIÓN VII",
          provincia: "DAJABON",
          telefono: "-",
        },
        {
          unap: "PAYITA",
          region: "REGIÓN III",
          provincia: "MARÍA TRINIDAD SANCHEZ",
          telefono: "-",
        },
        {
          unap: "VILLA ELISA",
          region: "REGIÓN VII",
          provincia: "MONTE CRISTI",
          telefono: "-",
        },
        {
          unap: "LA RANCHA",
          region: "REGIÓN VI",
          provincia: "SAN JUAN DE LA MAGUANA",
          telefono: "-",
        },
        {
          unap: "MELLA",
          region: "REGIÓN II",
          provincia: "SANTIAGO",
          telefono: "-",
        },
        {
          unap: "BARRIO NORTE",
          region: "REGIÓN VII",
          provincia: "DAJABON",
          telefono: "-",
        },
        {
          unap: "COMEDERO ARRIBA",
          region: "REGIÓN VIII",
          provincia: "SANCHEZ RAMIREZ",
          telefono: "-",
        },
        {
          unap: "PORVENIR",
          region: "REGIÓN V",
          provincia: "SAN PEDRO DE MACORIS",
          telefono: "-",
        },
        {
          unap: "LOS TRANSFORMADORES",
          region: "REGIÓN VI",
          provincia: "SAN JUAN DE LA MAGUANA",
          telefono: "-",
        },
        {
          unap: "LOS CIRUELOS",
          region: "REGIÓN II",
          provincia: "SANTIAGO",
          telefono: "-",
        },
        {
          unap: "URBANA NAGUA",
          region: "REGIÓN III",
          provincia: "MARÍA TRINIDAD SANCHEZ",
          telefono: "-",
        },
        {
          unap: "EL CACIQUE",
          region: "REGIÓN MONTE PLATA",
          provincia: "MONTE PLATA",
          telefono: "-",
        },
        {
          unap: "PALO AMARILLO",
          region: "REGIÓN II",
          provincia: "SANTIAGO",
          telefono: "-",
        },
        {
          unap: "RIO ARRIBA",
          region: "REGIÓN I",
          provincia: "PERAVIA",
          telefono: "-",
        },
        {
          unap: "SAN ANTONIO",
          region: "REGIÓN VII",
          provincia: "VALVERDE",
          telefono: "-",
        },
        {
          unap: "FUNDACION NACIONAL EDUCACION Y SOCIEDAD PARA ENVEJECIENTES",
          region: "REGIÓN SANTO DOMINGO NORTE",
          provincia: "SANTO DOMINGO DE GUZMÁN",
          telefono: "-",
        },
        {
          unap: "PLATANAL",
          region: "REGIÓN II",
          provincia: "SANTIAGO",
          telefono: "-",
        },
        {
          unap: "LOS JOBOS",
          region: "REGIÓN VI",
          provincia: "AZUA",
          telefono: "-",
        },
        {
          unap: "CATAREY",
          region: "REGIÓN I",
          provincia: "SAN CRISTOBAL",
          telefono: "-",
        },
        {
          unap: "FE Y ESPERANZA",
          region: "REGIÓN SANTO DOMINGO ESTE",
          provincia: "SANTO DOMINGO DE GUZMÁN",
          telefono: "-",
        },
        {
          unap: "BALAGUER",
          region: "REGIÓN II",
          provincia: "SANTIAGO",
          telefono: "-",
        },
        {
          unap: "CAMBITA CRUCE",
          region: "REGIÓN I",
          provincia: "SAN CRISTOBAL",
          telefono: "-",
        },
        {
          unap: "ACTIVO 20 30",
          region: "REGIÓN I",
          provincia: "PERAVIA",
          telefono: "-",
        },
        {
          unap: "LOS TANQUESITOS",
          region: "REGIÓN SANTO DOMINGO ESTE",
          provincia: "SANTO DOMINGO DE GUZMÁN",
          telefono: "-",
        },
        {
          unap: "JUAN ALBERTO ESPINOLA",
          region: "REGIÓN III",
          provincia: "DUARTE",
          telefono: "-",
        },
        {
          unap: "LEONIDAS SOLANO",
          region: "REGIÓN DISTRITO NACIONAL",
          provincia: "DISTRITO NACIONAL",
          telefono: "-",
        },
        {
          unap: "EL LIMONCITO",
          region: "REGIÓN VIII",
          provincia: "SANCHEZ RAMIREZ",
          telefono: "-",
        },
        {
          unap: "LA BOMBITA",
          region: "REGIÓN VI",
          provincia: "AZUA",
          telefono: "-",
        },
        {
          unap: "GONZALO",
          region: "REGIÓN MONTE PLATA",
          provincia: "MONTE PLATA",
          telefono: "-",
        },
        {
          unap: "LA UREÑA",
          region: "REGIÓN SANTO DOMINGO ESTE",
          provincia: "SANTO DOMINGO DE GUZMÁN",
          telefono: "-",
        },
        {
          unap: "SABANA LARGA ABAJO",
          region: "REGIÓN I",
          provincia: "SAN JOSE DE OCOA",
          telefono: "-",
        },
        {
          unap: "LA OTRA BANDA",
          region: "REGIÓN II",
          provincia: "SANTIAGO",
          telefono: "-",
        },
        {
          unap: "LAS COLES",
          region: "REGIÓN III",
          provincia: "DUARTE",
          telefono: "-",
        },
        {
          unap: "OJO DE AGUA",
          region: "REGIÓN I",
          provincia: "SAN JOSE DE OCOA",
          telefono: "-",
        },
        {
          unap: "BACUI ARRIBA",
          region: "REGIÓN VIII",
          provincia: "LA VEGA",
          telefono: "-",
        },
        {
          unap: "LAS 300 (TRESCIENTAS)",
          region: "REGIÓN VII",
          provincia: "VALVERDE",
          telefono: "-",
        },
        {
          unap: "CONANI",
          region: "REGIÓN I",
          provincia: "SAN CRISTOBAL",
          telefono: "-",
        },
        {
          unap: "LOS GUANDULES",
          region: "REGIÓN II",
          provincia: "SANTIAGO",
          telefono: "-",
        },
        {
          unap: "SANTA ROSA",
          region: "REGIÓN SANTO DOMINGO OESTE",
          provincia: "SANTO DOMINGO DE GUZMÁN",
          telefono: "-",
        },
        {
          unap: "LAS GUARANAS",
          region: "REGIÓN III",
          provincia: "DUARTE",
          telefono: "-",
        },
        {
          unap: "LA GUAYIGA",
          region: "REGIÓN SANTO DOMINGO OESTE",
          provincia: "SANTO DOMINGO DE GUZMÁN",
          telefono: "-",
        },
        {
          unap: "PALAVE",
          region: "REGIÓN SANTO DOMINGO OESTE",
          provincia: "SANTO DOMINGO DE GUZMÁN",
          telefono: "-",
        },
        {
          unap: "EL CARRIL",
          region: "REGIÓN I",
          provincia: "SAN CRISTOBAL",
          telefono: "-",
        },
        {
          unap: "VIETNAM",
          region: "REGIÓN SANTO DOMINGO ESTE",
          provincia: "SANTO DOMINGO DE GUZMÁN",
          telefono: "-",
        },
        {
          unap: "LA ALTAGRACIA",
          region: "REGIÓN I",
          provincia: "SAN CRISTOBAL",
          telefono: "-",
        },
        {
          unap: "JIMA ARRIBA",
          region: "REGIÓN VIII",
          provincia: "LA VEGA",
          telefono: "-",
        },
        {
          unap: "YAGUITA DE PASTOR",
          region: "REGIÓN II",
          provincia: "SANTIAGO",
          telefono: "-",
        },
        {
          unap: "SALUD MENTAL",
          region: "REGIÓN I",
          provincia: "SAN CRISTOBAL",
          telefono: "-",
        },
        {
          unap: "LAS FLORES",
          region: "REGIÓN VII",
          provincia: "SANTIAGO RODRÍGUEZ",
          telefono: "-",
        },
        {
          unap: "LA PEÑA",
          region: "REGIÓN III",
          provincia: "DUARTE",
          telefono: "-",
        },
        {
          unap: "HOYA DE CAIMITO",
          region: "REGIÓN II",
          provincia: "SANTIAGO",
          telefono: "-",
        },
        {
          unap: "5 DE ABRIL",
          region: "REGIÓN I",
          provincia: "SAN CRISTOBAL",
          telefono: "-",
        },
        {
          unap: "LAS FLORES",
          region: "REGIÓN I",
          provincia: "SAN CRISTOBAL",
          telefono: "-",
        },
        {
          unap: "QUIJA QUIETA",
          region: "REGIÓN VI",
          provincia: "SAN JUAN DE LA MAGUANA",
          telefono: "-",
        },
        {
          unap: "LA JOYA",
          region: "REGIÓN III",
          provincia: "DUARTE",
          telefono: "-",
        },
        {
          unap: "LAS FLORES",
          region: "REGIÓN II",
          provincia: "ESPAILLAT",
          telefono: "-",
        },
        {
          unap: "PEDRO JUSTO CARRION",
          region: "REGIÓN V",
          provincia: "SAN PEDRO DE MACORIS",
          telefono: "-",
        },
        {
          unap: "LOS LIRIOS",
          region: "REGIÓN IV",
          provincia: "BARAHONA",
          telefono: "-",
        },
        {
          unap: "LAS CANAS",
          region: "REGIÓN VIII",
          provincia: "SANCHEZ RAMIREZ",
          telefono: "-",
        },
        {
          unap: "CANASTICAS",
          region: "REGIÓN I",
          provincia: "SAN CRISTOBAL",
          telefono: "-",
        },
        {
          unap: "VISTA EL VALLE",
          region: "REGIÓN III",
          provincia: "DUARTE",
          telefono: "-",
        },
        {
          unap: "BUENA VISTA",
          region: "REGIÓN VIII",
          provincia: "LA VEGA",
          telefono: "-",
        },
        {
          unap: "JICOME",
          region: "REGIÓN VII",
          provincia: "VALVERDE",
          telefono: "-",
        },
        {
          unap: "GREGORIO LUPERON",
          region: "REGIÓN DISTRITO NACIONAL",
          provincia: "DISTRITO NACIONAL",
          telefono: "-",
        },
        {
          unap: "CARMEN RENATA",
          region: "REGIÓN DISTRITO NACIONAL",
          provincia: "DISTRITO NACIONAL",
          telefono: "-",
        },
        {
          unap: "LA CUEVA",
          region: "REGIÓN VIII",
          provincia: "SANCHEZ RAMIREZ",
          telefono: "-",
        },
        {
          unap: "VILLA ESTELA",
          region: "REGIÓN IV",
          provincia: "BARAHONA",
          telefono: "-",
        },
        {
          unap: "SAONA",
          region: "REGIÓN I",
          provincia: "PERAVIA",
          telefono: "-",
        },
        {
          unap: "CARLOS DANIEL",
          region: "REGIÓN VII",
          provincia: "VALVERDE",
          telefono: "-",
        },
        {
          unap: "LA UNION",
          region: "REGIÓN SANTO DOMINGO NORTE",
          provincia: "SANTO DOMINGO DE GUZMÁN",
          telefono: "-",
        },
        {
          unap: "MADRE VIEJA NORTE",
          region: "REGIÓN I",
          provincia: "SAN CRISTOBAL",
          telefono: "-",
        },
        {
          unap: "EL RINCON",
          region: "REGIÓN VIII",
          provincia: "LA VEGA",
          telefono: "-",
        },
        {
          unap: "LA BIJA",
          region: "REGIÓN VIII",
          provincia: "SANCHEZ RAMIREZ",
          telefono: "-",
        },
        {
          unap: "LOS AGUAYOS",
          region: "REGIÓN III",
          provincia: "DUARTE",
          telefono: "-",
        },
        {
          unap: "LAS MAGUANAS",
          region: "REGIÓN VI",
          provincia: "SAN JUAN DE LA MAGUANA",
          telefono: "-",
        },
        {
          unap: "MERCEDES NAVARRO",
          region: "REGIÓN II",
          provincia: "PUERTO PLATA",
          telefono: "-",
        },
        {
          unap: "ONDINA",
          region: "REGIÓN V",
          provincia: "HATO MAYOR",
          telefono: "-",
        },
        {
          unap: "EL VIGIADOR",
          region: "REGIÓN VII",
          provincia: "MONTE CRISTI",
          telefono: "-",
        },
        {
          unap: "EL NARANJAL",
          region: "REGIÓN I",
          provincia: "SAN JOSE DE OCOA",
          telefono: "-",
        },
        {
          unap: "OCTAVIA GAUTIER DE VIDAL",
          region: "REGIÓN VIII",
          provincia: "LA VEGA",
          telefono: "-",
        },
        {
          unap: "PERALVILLO",
          region: "REGIÓN MONTE PLATA",
          provincia: "MONTE PLATA",
          telefono: "-",
        },
        {
          unap: "PAYA",
          region: "REGIÓN I",
          provincia: "PERAVIA",
          telefono: "-",
        },
        {
          unap: "EL GUANO",
          region: "REGIÓN II",
          provincia: "SANTIAGO",
          telefono: "-",
        },
        {
          unap: "VICENTE NOBLE",
          region: "REGIÓN IV",
          provincia: "BARAHONA",
          telefono: "-",
        },
        {
          unap: "LA ESTANCIA",
          region: "REGIÓN VI",
          provincia: "SAN JUAN DE LA MAGUANA",
          telefono: "-",
        },
        {
          unap: "VILLA HERMOSA IV",
          region: "REGIÓN V",
          provincia: "LA ROMANA",
          telefono: "-",
        },
        {
          unap: "LAS COLINAS",
          region: "REGIÓN III",
          provincia: "DUARTE",
          telefono: "-",
        },
        {
          unap: "CAMPO LINDO",
          region: "REGIÓN V",
          provincia: "SAN PEDRO DE MACORIS",
          telefono: "-",
        },
        {
          unap: "MATA MAMON",
          region: "REGIÓN SANTO DOMINGO NORTE",
          provincia: "SANTO DOMINGO DE GUZMÁN",
          telefono: "-",
        },
        {
          unap: "JIMAYACO",
          region: "REGIÓN VIII",
          provincia: "LA VEGA",
          telefono: "-",
        },
        {
          unap: "HIGUERITO",
          region: "REGIÓN VI",
          provincia: "SAN JUAN DE LA MAGUANA",
          telefono: "-",
        },
        {
          unap: "CRISTO REY",
          region: "REGIÓN III",
          provincia: "DUARTE",
          telefono: "-",
        },
        {
          unap: "CALICHE DE LOS RIOS",
          region: "REGIÓN DISTRITO NACIONAL",
          provincia: "DISTRITO NACIONAL",
          telefono: "-",
        },
        {
          unap: "JUMA",
          region: "REGIÓN VIII",
          provincia: "MONSEÑOR NOUEL",
          telefono: "-",
        },
        {
          unap: "BORUCO",
          region: "REGIÓN VII",
          provincia: "VALVERDE",
          telefono: "-",
        },
        {
          unap: "LA CAYA",
          region: "REGIÓN VII",
          provincia: "VALVERDE",
          telefono: "-",
        },
        {
          unap: "BAOBA DEL PIÑAL",
          region: "REGIÓN III",
          provincia: "MARÍA TRINIDAD SANCHEZ",
          telefono: "-",
        },
        {
          unap: "UNIVERSIDAD DE NORDESTANA",
          region: "REGIÓN III",
          provincia: "DUARTE",
          telefono: "-",
        },
        {
          unap: "VILLA CERRO",
          region: "REGIÓN V",
          provincia: "LA ALTAGRACIA",
          telefono: "-",
        },
        {
          unap: "BARRIO SUR",
          region: "REGIÓN VII",
          provincia: "VALVERDE",
          telefono: "-",
        },
        {
          unap: "ARROYO HONDO",
          region: "REGIÓN II",
          provincia: "SANTIAGO",
          telefono: "-",
        },
        {
          unap: "CANCA LA PIEDRA",
          region: "REGIÓN II",
          provincia: "SANTIAGO",
          telefono: "-",
        },
        {
          unap: "GALVAN",
          region: "REGIÓN IV",
          provincia: "BAHORUCO",
          telefono: "-",
        },
        {
          unap: "SAN PABLO APOSTOL",
          region: "REGIÓN DISTRITO NACIONAL",
          provincia: "DISTRITO NACIONAL",
          telefono: "-",
        },
        {
          unap: "LA GALLERA",
          region: "REGIÓN VII",
          provincia: "MONTE CRISTI",
          telefono: "-",
        },
        {
          unap: "SAVICA",
          region: "REGIÓN IV",
          provincia: "BARAHONA",
          telefono: "-",
        },
        {
          unap: "MAMA TINGO",
          region: "REGIÓN SANTO DOMINGO NORTE",
          provincia: "SANTO DOMINGO DE GUZMÁN",
          telefono: "-",
        },
        {
          unap: "COMEDERO ABAJO",
          region: "REGIÓN VIII",
          provincia: "SANCHEZ RAMIREZ",
          telefono: "-",
        },
        {
          unap: "BARRIO LINDO SPM",
          region: "REGIÓN V",
          provincia: "SAN PEDRO DE MACORIS",
          telefono: "-",
        },
        {
          unap: "JIMA ABAJO",
          region: "REGIÓN VIII",
          provincia: "LA VEGA",
          telefono: "-",
        },
        {
          unap: "EL CRUCE DE GUAYACANES",
          region: "REGIÓN VII",
          provincia: "VALVERDE",
          telefono: "-",
        },
        {
          unap: "SAN RAFAEL",
          region: "REGIÓN DISTRITO NACIONAL",
          provincia: "DISTRITO NACIONAL",
          telefono: "-",
        },
        {
          unap: "NUEVA ISABELA",
          region: "REGIÓN SANTO DOMINGO NORTE",
          provincia: "SANTO DOMINGO DE GUZMÁN",
          telefono: "-",
        },
        {
          unap: "LAS ESPINAS",
          region: "REGIÓN VII",
          provincia: "SANTIAGO RODRÍGUEZ",
          telefono: "-",
        },
        {
          unap: "SODECA",
          region: "REGIÓN DISTRITO NACIONAL",
          provincia: "DISTRITO NACIONAL",
          telefono: "-",
        },
        {
          unap: "LA GLORIA",
          region: "REGIÓN II",
          provincia: "SANTIAGO",
          telefono: "-",
        },
        {
          unap: "EL AHOGADO",
          region: "REGIÓN VII",
          provincia: "MONTE CRISTI",
          telefono: "-",
        },
        {
          unap: "LA UNION",
          region: "REGIÓN II",
          provincia: "SANTIAGO",
          telefono: "-",
        },
        {
          unap: "SAN GABRIEL",
          region: "REGIÓN DISTRITO NACIONAL",
          provincia: "DISTRITO NACIONAL",
          telefono: "-",
        },
        {
          unap: "NUEVA ESPERANZA",
          region: "REGIÓN SANTO DOMINGO ESTE",
          provincia: "SANTO DOMINGO DE GUZMÁN",
          telefono: "-",
        },
        {
          unap: "SAN JOSE",
          region: "REGIÓN VIII",
          provincia: "MONSEÑOR NOUEL",
          telefono: "-",
        },
        {
          unap: "CEPAE",
          region: "REGIÓN I",
          provincia: "SAN CRISTOBAL",
          telefono: "-",
        },
        {
          unap: "VILLA LIBERACIÓN",
          region: "REGIÓN VI",
          provincia: "SAN JUAN DE LA MAGUANA",
          telefono: "-",
        },
        {
          unap: "LOS MARTIRES",
          region: "REGIÓN II",
          provincia: "SANTIAGO",
          telefono: "-",
        },
        {
          unap: "LOS CIRUELITOS",
          region: "REGIÓN II",
          provincia: "SANTIAGO",
          telefono: "-",
        },
        {
          unap: "PRADO COLONIA",
          region: "REGIÓN VI",
          provincia: "AZUA",
          telefono: "-",
        },
        {
          unap: "CESAC DE LA SALLE",
          region: "REGIÓN SANTO DOMINGO OESTE",
          provincia: "SANTO DOMINGO DE GUZMÁN",
          telefono: "-",
        },
        {
          unap: "EL PEDREGAL",
          region: "REGIÓN SANTO DOMINGO OESTE",
          provincia: "SANTO DOMINGO DE GUZMÁN",
          telefono: "-",
        },
        {
          unap: "EL FERNANDEZ",
          region: "REGIÓN DISTRITO NACIONAL",
          provincia: "DISTRITO NACIONAL",
          telefono: "-",
        },
        {
          unap: "ESTANCIA DEL YAQUE",
          region: "REGIÓN II",
          provincia: "SANTIAGO",
          telefono: "-",
        },
        {
          unap: "LOS FRAILES II",
          region: "REGIÓN SANTO DOMINGO ESTE",
          provincia: "SANTO DOMINGO DE GUZMÁN",
          telefono: "-",
        },
        {
          unap: "CAAMAÑO",
          region: "REGIÓN IV",
          provincia: "BAHORUCO",
          telefono: "-",
        },
        {
          unap: "FUNDACIÓN JOSE MARIA",
          region: "REGIÓN V",
          provincia: "SAN PEDRO DE MACORIS",
          telefono: "-",
        },
        {
          unap: "BAITOITA",
          region: "REGIÓN IV",
          provincia: "BARAHONA",
          telefono: "-",
        },
        {
          unap: "INGENIO SANTA FE",
          region: "REGIÓN V",
          provincia: "SAN PEDRO DE MACORIS",
          telefono: "-",
        },
        {
          unap: "COMUNAL LAS PALMAS",
          region: "REGIÓN SANTO DOMINGO OESTE",
          provincia: "SANTO DOMINGO DE GUZMÁN",
          telefono: "-",
        },
        {
          unap: "BAYACANES",
          region: "REGIÓN VIII",
          provincia: "LA VEGA",
          telefono: "-",
        },
        {
          unap: "LA CEIBITA",
          region: "REGIÓN II",
          provincia: "SANTIAGO",
          telefono: "-",
        },
        {
          unap: "MATA BONITA",
          region: "REGIÓN III",
          provincia: "MARÍA TRINIDAD SANCHEZ",
          telefono: "-",
        },
        {
          unap: "PADRE GRANERO",
          region: "REGIÓN II",
          provincia: "PUERTO PLATA",
          telefono: "-",
        },
        {
          unap: "ARENOSO",
          region: "REGIÓN III",
          provincia: "DUARTE",
          telefono: "-",
        },
        {
          unap: "BOCA DE MAO",
          region: "REGIÓN VII",
          provincia: "VALVERDE",
          telefono: "-",
        },
        {
          unap: "BARRIO LUPERON",
          region: "REGIÓN VII",
          provincia: "DAJABON",
          telefono: "-",
        },
        {
          unap: "LAS CARMELITAS",
          region: "REGIÓN VIII",
          provincia: "LA VEGA",
          telefono: "-",
        },
        {
          unap: "CANCINO ADENTRO",
          region: "REGIÓN SANTO DOMINGO ESTE",
          provincia: "SANTO DOMINGO DE GUZMÁN",
          telefono: "-",
        },
        {
          unap: "ALTO VELO",
          region: "REGIÓN IV",
          provincia: "BARAHONA",
          telefono: "-",
        },
        {
          unap: "SOSUA",
          region: "REGIÓN II",
          provincia: "PUERTO PLATA",
          telefono: "-",
        },
        {
          unap: "HATO MAYOR",
          region: "REGIÓN II",
          provincia: "SANTIAGO",
          telefono: "-",
        },
        {
          unap: "MANGANAGUA",
          region: "REGIÓN DISTRITO NACIONAL",
          provincia: "DISTRITO NACIONAL",
          telefono: "-",
        },
        {
          unap: "LOS ALCARRIZOS II",
          region: "REGIÓN SANTO DOMINGO OESTE",
          provincia: "SANTO DOMINGO DE GUZMÁN",
          telefono: "-",
        },
        {
          unap: "CTU",
          region: "REGIÓN DISTRITO NACIONAL",
          provincia: "DISTRITO NACIONAL",
          telefono: "-",
        },
        {
          unap: "BUENOS AIRES",
          region: "REGIÓN II",
          provincia: "SANTIAGO",
          telefono: "-",
        },
        {
          unap: "LA CUABA",
          region: "REGIÓN SANTO DOMINGO OESTE",
          provincia: "SANTO DOMINGO DE GUZMÁN",
          telefono: "-",
        },
        {
          unap: "BOHECHIO",
          region: "REGIÓN VI",
          provincia: "SAN JUAN DE LA MAGUANA",
          telefono: "-",
        },
        {
          unap: "GUARAGUAO",
          region: "REGIÓN III",
          provincia: "DUARTE",
          telefono: "-",
        },
        {
          unap: "LOS BOTADOS",
          region: "REGIÓN MONTE PLATA",
          provincia: "MONTE PLATA",
          telefono: "-",
        },
        {
          unap: "ENSANCHE BERMUDEZ",
          region: "REGIÓN II",
          provincia: "SANTIAGO",
          telefono: "-",
        },
        {
          unap: "CLUB 16 DE AGOSTO",
          region: "REGIÓN SANTO DOMINGO OESTE",
          provincia: "SANTO DOMINGO DE GUZMÁN",
          telefono: "-",
        },
        {
          unap: "EL RANCHITO",
          region: "REGIÓN VIII",
          provincia: "LA VEGA",
          telefono: "-",
        },
        {
          unap: "VILLA ESPERANZA",
          region: "REGIÓN SANTO DOMINGO NORTE",
          provincia: "SANTO DOMINGO DE GUZMÁN",
          telefono: "-",
        },
        {
          unap: "VILLA BLANCA",
          region: "REGIÓN SANTO DOMINGO NORTE",
          provincia: "SANTO DOMINGO DE GUZMÁN",
          telefono: "-",
        },
        {
          unap: "BARRIO MÉXICO",
          region: "REGIÓN V",
          provincia: "SAN PEDRO DE MACORIS",
          telefono: "-",
        },
        {
          unap: "VILLA ELSA",
          region: "REGIÓN VII",
          provincia: "MONTE CRISTI",
          telefono: "-",
        },
        {
          unap: "SABANA ALTA",
          region: "REGIÓN VI",
          provincia: "SAN JUAN DE LA MAGUANA",
          telefono: "-",
        },
        {
          unap: "EL MAMON",
          region: "REGIÓN SANTO DOMINGO ESTE",
          provincia: "SANTO DOMINGO DE GUZMÁN",
          telefono: "-",
        },
        {
          unap: "CASTILLO URBANO",
          region: "REGIÓN III",
          provincia: "DUARTE",
          telefono: "-",
        },
        {
          unap: "BAYONA",
          region: "REGIÓN SANTO DOMINGO OESTE",
          provincia: "SANTO DOMINGO DE GUZMÁN",
          telefono: "-",
        },
        {
          unap: "SABANA REY",
          region: "REGIÓN VIII",
          provincia: "LA VEGA",
          telefono: "-",
        },
        {
          unap: "IGLESIA SANTA ANA",
          region: "REGIÓN DISTRITO NACIONAL",
          provincia: "DISTRITO NACIONAL",
          telefono: "-",
        },
        {
          unap: "LOS CASABES",
          region: "REGIÓN SANTO DOMINGO NORTE",
          provincia: "SANTO DOMINGO DE GUZMÁN",
          telefono: "-",
        },
        {
          unap: "EL PINO",
          region: "REGIÓN VII",
          provincia: "DAJABON",
          telefono: "-",
        },
        {
          unap: "LA PENUELA",
          region: "REGIÓN IV",
          provincia: "BARAHONA",
          telefono: "-",
        },
        {
          unap: "BALDEMIRO CARRERAS",
          region: "REGIÓN VII",
          provincia: "SANTIAGO RODRÍGUEZ",
          telefono: "-",
        },
        {
          unap: "JINOVA",
          region: "REGIÓN VI",
          provincia: "SAN JUAN DE LA MAGUANA",
          telefono: "-",
        },
        {
          unap: "BARRIO ENRIQUILLO",
          region: "REGIÓN SANTO DOMINGO OESTE",
          provincia: "SANTO DOMINGO DE GUZMÁN",
          telefono: "-",
        },
        {
          unap: "SAN FELIPE",
          region: "REGIÓN SANTO DOMINGO NORTE",
          provincia: "SANTO DOMINGO DE GUZMÁN",
          telefono: "-",
        },
        {
          unap: "CALETA",
          region: "REGIÓN V",
          provincia: "LA ROMANA",
          telefono: "-",
        },
        {
          unap: "LA ESPERANZA",
          region: "REGIÓN SANTO DOMINGO NORTE",
          provincia: "SANTO DOMINGO DE GUZMÁN",
          telefono: "-",
        },
        {
          unap: "LOS JAVIELES",
          region: "REGIÓN MONTE PLATA",
          provincia: "MONTE PLATA",
          telefono: "-",
        },
        {
          unap: "GUAYACANES",
          region: "REGIÓN V",
          provincia: "SAN PEDRO DE MACORIS",
          telefono: "-",
        },
        {
          unap: "ANTI TB INFANTIL",
          region: "REGIÓN DISTRITO NACIONAL",
          provincia: "DISTRITO NACIONAL",
          telefono: "-",
        },
        {
          unap: "HOSTOS",
          region: "REGIÓN III",
          provincia: "DUARTE",
          telefono: "-",
        },
        {
          unap: "JOSUE",
          region: "REGIÓN II",
          provincia: "PUERTO PLATA",
          telefono: "-",
        },
        {
          unap: "ALDEAS INFANTILES SOS",
          region: "REGIÓN SANTO DOMINGO ESTE",
          provincia: "SANTO DOMINGO DE GUZMÁN",
          telefono: "-",
        },
        {
          unap: "PALMARITO",
          region: "REGIÓN IV",
          provincia: "BARAHONA",
          telefono: "-",
        },
        {
          unap: "EL CAJUILITO",
          region: "REGIÓN I",
          provincia: "SAN CRISTOBAL",
          telefono: "-",
        },
        {
          unap: "PROSPERIDAD",
          region: "REGIÓN VIII",
          provincia: "MONSEÑOR NOUEL",
          telefono: "-",
        },
        {
          unap: "SABANA YEGUA",
          region: "REGIÓN VI",
          provincia: "AZUA",
          telefono: "-",
        },
        {
          unap: "LA PICHINGA",
          region: "REGIÓN III",
          provincia: "MARÍA TRINIDAD SANCHEZ",
          telefono: "-",
        },
        {
          unap: "MARGARA I",
          region: "REGIÓN SANTO DOMINGO ESTE",
          provincia: "SANTO DOMINGO DE GUZMÁN",
          telefono: "-",
        },
        {
          unap: "PUEBLO NUEVO",
          region: "REGIÓN VII",
          provincia: "VALVERDE",
          telefono: "-",
        },
        {
          unap: "GURABO",
          region: "REGIÓN VII",
          provincia: "VALVERDE",
          telefono: "-",
        },
        {
          unap: "LA CIENEGA",
          region: "REGIÓN SANTO DOMINGO OESTE",
          provincia: "SANTO DOMINGO DE GUZMÁN",
          telefono: "-",
        },
        {
          unap: "MAJAGUAL",
          region: "REGIÓN MONTE PLATA",
          provincia: "MONTE PLATA",
          telefono: "-",
        },
        {
          unap: "EL CATEY",
          region: "REGIÓN III",
          provincia: "SAMANÁ",
          telefono: "-",
        },
        {
          unap: "ENSANCHE LUPERON",
          region: "REGIÓN DISTRITO NACIONAL",
          provincia: "DISTRITO NACIONAL",
          telefono: "-",
        },
        {
          unap: "CENTRO COMUNITARIO VILLAS AGRICOLAS",
          region: "REGIÓN DISTRITO NACIONAL",
          provincia: "DISTRITO NACIONAL",
          telefono: "-",
        },
        {
          unap: "SAN FRANCISCO",
          region: "REGIÓN V",
          provincia: "LA ALTAGRACIA",
          telefono: "-",
        },
        {
          unap: "BARRIO DUARTE",
          region: "REGIÓN SANTO DOMINGO OESTE",
          provincia: "SANTO DOMINGO DE GUZMÁN",
          telefono: "-",
        },
        {
          unap: "SAN ANTONIO DE PADUA",
          region: "REGIÓN SANTO DOMINGO OESTE",
          provincia: "SANTO DOMINGO DE GUZMÁN",
          telefono: "-",
        },
        {
          unap: "FE VIOLETA ORTEGA",
          region: "REGIÓN III",
          provincia: "HERMANAS MIRABAL",
          telefono: "-",
        },
        {
          unap: "KOREA",
          region: "REGIÓN II",
          provincia: "SANTIAGO",
          telefono: "-",
        },
        {
          unap: "VILLA LA MATA",
          region: "REGIÓN VIII",
          provincia: "SANCHEZ RAMIREZ",
          telefono: "-",
        },
        {
          unap: "SAN PEDRO APOSTOL",
          region: "REGIÓN DISTRITO NACIONAL",
          provincia: "DISTRITO NACIONAL",
          telefono: "-",
        },
        {
          unap: "NA",
          region: "REGIÓN II",
          provincia: "SANTIAGO",
          telefono: "-",
        },
        {
          unap: "VILLA FRANCISCA",
          region: "REGIÓN DISTRITO NACIONAL",
          provincia: "DISTRITO NACIONAL",
          telefono: "-",
        },
        {
          unap: "SAN CARLOS",
          region: "REGIÓN DISTRITO NACIONAL",
          provincia: "DISTRITO NACIONAL",
          telefono: "-",
        },
        {
          unap: "CENTRO COMUNAL",
          region: "REGIÓN V",
          provincia: "LA ROMANA",
          telefono: "-",
        },
        {
          unap: "LAS MERCEDES",
          region: "REGIÓN V",
          provincia: "SAN PEDRO DE MACORIS",
          telefono: "-",
        },
        {
          unap: "LA EXPERIENCIA",
          region: "REGIÓN V",
          provincia: "LA ROMANA",
          telefono: "-",
        },
        {
          unap: "LA MINA",
          region: "REGIÓN VII",
          provincia: "VALVERDE",
          telefono: "-",
        },
        {
          unap: "PEDRO CORTO",
          region: "REGIÓN VI",
          provincia: "SAN JUAN DE LA MAGUANA",
          telefono: "-",
        },
        {
          unap: "BAHORUCO",
          region: "REGIÓN IV",
          provincia: "BARAHONA",
          telefono: "-",
        },
        {
          unap: "DISPENSARIO MARIA AUXILIADORA",
          region: "REGIÓN DISTRITO NACIONAL",
          provincia: "DISTRITO NACIONAL",
          telefono: "-",
        },
        {
          unap: "DAMAJAGUA",
          region: "REGIÓN VII",
          provincia: "VALVERDE",
          telefono: "-",
        },
        {
          unap: "GREGORIO LUPERÓN",
          region: "REGIÓN MONTE PLATA",
          provincia: "MONTE PLATA",
          telefono: "-",
        },
        {
          unap: "QUISQUEYA",
          region: "REGIÓN V",
          provincia: "SAN PEDRO DE MACORIS",
          telefono: "-",
        },
        {
          unap: "ZONA B",
          region: "REGIÓN DISTRITO NACIONAL",
          provincia: "DISTRITO NACIONAL",
          telefono: "-",
        },
        {
          unap: "OSCAR SANTANA",
          region: "REGIÓN DISTRITO NACIONAL",
          provincia: "DISTRITO NACIONAL",
          telefono: "-",
        },
        {
          unap: "SABANA DEL PUERTO",
          region: "REGIÓN VIII",
          provincia: "MONSEÑOR NOUEL",
          telefono: "-",
        },
        {
          unap: "PALO ALTO",
          region: "REGIÓN IV",
          provincia: "BARAHONA",
          telefono: "-",
        },
        {
          unap: "LOS FRAILES I",
          region: "REGIÓN SANTO DOMINGO ESTE",
          provincia: "SANTO DOMINGO DE GUZMÁN",
          telefono: "-",
        },
        {
          unap: "PONCE ADENTRO",
          region: "REGIÓN SANTO DOMINGO NORTE",
          provincia: "SANTO DOMINGO DE GUZMÁN",
          telefono: "-",
        },
        {
          unap: "LA ESPERILLA",
          region: "REGIÓN DISTRITO NACIONAL",
          provincia: "DISTRITO NACIONAL",
          telefono: "-",
        },
        {
          unap: "HOYO DE BARTOLA",
          region: "REGIÓN II",
          provincia: "SANTIAGO",
          telefono: "-",
        },
        {
          unap: "LAGUNA SALADA",
          region: "REGIÓN VII",
          provincia: "VALVERDE",
          telefono: "-",
        },
        {
          unap: "VILLA FEDERICO",
          region: "REGIÓN I",
          provincia: "SAN CRISTOBAL",
          telefono: "-",
        },
        {
          unap: "LA FURNIA",
          region: "REGIÓN IV",
          provincia: "BARAHONA",
          telefono: "-",
        },
        {
          unap: "LAS CHARCAS DE MARIA NOVA",
          region: "REGIÓN VI",
          provincia: "SAN JUAN DE LA MAGUANA",
          telefono: "-",
        },
        {
          unap: "LA ROSA DE CENOVI",
          region: "REGIÓN III",
          provincia: "DUARTE",
          telefono: "-",
        },
        {
          unap: "EL TAMARINDO",
          region: "REGIÓN VII",
          provincia: "SANTIAGO RODRÍGUEZ",
          telefono: "-",
        },
        {
          unap: "FUNDAMBIENTE",
          region: "REGIÓN II",
          provincia: "SANTIAGO",
          telefono: "-",
        },
        {
          unap: "INVI CEA",
          region: "REGIÓN IV",
          provincia: "BARAHONA",
          telefono: "-",
        },
        {
          unap: "MARIA MONTEZ",
          region: "REGIÓN IV",
          provincia: "BARAHONA",
          telefono: "-",
        },
        {
          unap: "SANTA LUCIA",
          region: "REGIÓN II",
          provincia: "SANTIAGO",
          telefono: "-",
        },
        {
          unap: "COMUNAL LA ZURZA",
          region: "REGIÓN DISTRITO NACIONAL",
          provincia: "DISTRITO NACIONAL",
          telefono: "-",
        },
        {
          unap: "PROLONGACION VENEZUELA",
          region: "REGIÓN SANTO DOMINGO ESTE",
          provincia: "SANTO DOMINGO DE GUZMÁN",
          telefono: "-",
        },
        {
          unap: "EL LIBERTADOR DE HERRERA",
          region: "REGIÓN SANTO DOMINGO OESTE",
          provincia: "SANTO DOMINGO DE GUZMÁN",
          telefono: "-",
        },
        {
          unap: "EL SAMAN",
          region: "REGIÓN VII",
          provincia: "VALVERDE",
          telefono: "-",
        },
        {
          unap: "JUAN DE HERRERA",
          region: "REGIÓN VI",
          provincia: "SAN JUAN DE LA MAGUANA",
          telefono: "-",
        },
        {
          unap: "FELIX TEJADA",
          region: "REGIÓN II",
          provincia: "SANTIAGO",
          telefono: "-",
        },
        {
          unap: "PADRE MARCILLA",
          region: "REGIÓN DISTRITO NACIONAL",
          provincia: "DISTRITO NACIONAL",
          telefono: "-",
        },
        {
          unap: "SAN NICOLAS",
          region: "REGIÓN II",
          provincia: "SANTIAGO",
          telefono: "-",
        },
        {
          unap: "BATEY ANTONCI",
          region: "REGIÓN MONTE PLATA",
          provincia: "MONTE PLATA",
          telefono: "-",
        },
        {
          unap: "HERMANAS MIRABAL",
          region: "REGIÓN III",
          provincia: "DUARTE",
          telefono: "-",
        },
        {
          unap: "LOS PERALEJOS",
          region: "REGIÓN DISTRITO NACIONAL",
          provincia: "DISTRITO NACIONAL",
          telefono: "-",
        },
        {
          unap: "LOS POMOS",
          region: "REGIÓN VIII",
          provincia: "LA VEGA",
          telefono: "-",
        },
        {
          unap: "GUANUMA",
          region: "REGIÓN SANTO DOMINGO NORTE",
          provincia: "SANTO DOMINGO DE GUZMÁN",
          telefono: "-",
        },
        {
          unap: "EL BUEN PASTOR",
          region: "REGIÓN V",
          provincia: "SAN PEDRO DE MACORIS",
          telefono: "-",
        },
        {
          unap: "JAPÓN",
          region: "REGIÓN V",
          provincia: "SAN PEDRO DE MACORIS",
          telefono: "-",
        },
        {
          unap: "PALMA REAL",
          region: "REGIÓN DISTRITO NACIONAL",
          provincia: "DISTRITO NACIONAL",
          telefono: "-",
        },
        {
          unap: "GREGORIO LUPERON",
          region: "REGIÓN V",
          provincia: "LA ROMANA",
          telefono: "-",
        },
        {
          unap: "SAN JUAN BAUTISTA",
          region: "REGIÓN DISTRITO NACIONAL",
          provincia: "DISTRITO NACIONAL",
          telefono: "-",
        },
      ],
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

      currentEdition: {} as any,

      campoFocus: "autorizacion",
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
      showModalEVAL: false,
      showModalSSIRS: false,
      showModal: false,
      showModal7: false,
      showModalAseguradoras: false,
      showDelete: false,
      currentConsulta: "",
      estado: {} as object,
    };
  },

  async mounted() {
    this.focus();
    this.evaluacion = this.$store.state.user.currentEvaluacion;
    this.fillFields();
    this.fixTime();
    this.defPrice();
  },

  updated() {
    let joined = this.evaluacion.cedula + this.evaluacion.fecha;
    this.$store.state.user.consultasAfiliados = `https://isys-assets-bucket.s3.amazonaws.com/consultasAfiliados/${joined}.jpg`;
    this.$store.state.user.evaluacion = `https://isys-assets-bucket.s3.amazonaws.com/evaluaciones/${joined}.jpg`;
  },

  methods: {
    defPrice() {
      if (this.evaluacion.kit == "KIT 1") {
        this.evaluacion.precio = 3275;
      } else if (this.evaluacion.kit == "KIT 2A") {
        this.evaluacion.precio = 4585;
      } else if (this.evaluacion.kit == "KIT 2B") {
        this.evaluacion.precio = 4585;
      } else if (this.evaluacion.kit == "KIT 3") {
        this.evaluacion.precio = 5275;
      } else {
        this.evaluacion.precio = 0;
      }
    },

    isVerified() {
      let isVerified;
      if (
        this.evaluacion.datPersCorrc == true &&
        this.evaluacion.todCompc == true &&
        this.evaluacion.pacRefe == true &&
        this.evaluacion.asiCiónCorc == true &&
        this.evaluacion.comsPert == true &&
        this.evaluacion.escSirsCorr == true &&
        this.evaluacion.escEvCoc == true &&
        this.evaluacion.todFirmCompc == true &&
        this.evaluacion.todCorrc == true &&
        this.evaluacion.sinTachadEnm == true
      ) {
        isVerified = true;
      } else {
        isVerified = false;
      }
      this.evaluacion.verificacion = isVerified;
    },

    async deleteEvaluacion() {
      if (confirm("¿Está Seguro que Desea Eliminar Esta Evaluación?")) {
        await this.toggleLoading();
        try {
          const res = await destroy(
            this.evaluacion.cedula,
            this.evaluacion.fecha
          ).then(
            async (res) => {
              await this.toggleLoading();
              this.$router.push("/listevalssupGener");
            },
            (err) => {
              this.toggleLoading();
              console.error(err);
            }
          );
        } catch (error) {
          console.error(error);
        }
      }
    },

    async uploadFile() {
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
      this.evaluacion.consAfil = true;
      this.evaluacion.statusAdministrativo = "VALIDADO";
      this.createEvaluacion();
      this.$router.push("/listevalssupGener");
    },

    async uploadFileEval() {
      this.toggleLoading();
      let input = this.$refs.fileInputEval;
      let file = input.files;
      const file2 = file[0];
      const url = await getS3Url_cedulafechaEval(
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
      this.evaluacion.evaluacion = true;
      this.evaluacion.statusAdministrativo = "EVALUADO";
      this.createEvaluacion();
      this.$router.push("/listevalssupGener");
    },

    selectImageEval() {
      this.$refs.fileInputEval.click();
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

    setPatienData(patient: any, patientFechaNacimiento: any) {
      if (patient) {
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
        // alert(part1)
        // alert(part2)
        // alert(part3)
        let cedulaGuiones = part1 + "-" + part2 + "-" + part3;
        this.evaluacion.cedula = cedulaGuiones.trim();

        this.toggleSpinner();
        try {
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
            alert(JSON.stringify(patientData.data));
            this.setPatienData(
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
          const patientData = await getPatient(this.evaluacion.cedula);
          const patientFechaNacimientoData = await getPatientFechaNacimiento(
            this.evaluacion.cedula
          );
          this.setPatienData(
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
      this.$router.push(`/listevalssupGener/${id}`);

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

    setCentro(centro: any) {
      this.evaluacion.unap = centro.unap;
      this.evaluacion.region = centro.region;
      this.evaluacion.provincia = centro.provincia;
      this.evaluacion.municipio = centro.municipio;
      this.evaluacion.id_center = centro.id_center;
      this.evaluacion.id_centerKit =
        this.evaluacion.id_center + "-" + centro.id_center;
      this.$store.state.user.id_center = centro.id_center;
      this.showModalAseguradorasMethod();
      this.search = "";
      document.getElementById("nombre").focus();
      this.filteredCentros = this.centros;
      this.lockCentro = true;
    },

    buscar(term: string) {
      this.filteredCentros = this.centros;
      if (term !== "") {
        this.filteredCentros = this.centros.filter((centro: any) => {
          return centro.unap.toLowerCase().includes(this.search.toLowerCase());
        });
      }
      if (this.filteredCentros.length == 1) {
        if (
          confirm(
            "¿ DESEA SELECCIONAR " +
              this.filteredCentros[0].unap +
              " DE " +
              this.filteredCentros[0].region +
              ", PROVINCIA " +
              this.filteredCentros[0].provincia +
              "?"
          )
        ) {
          this.setCentro(this.filteredCentros[0]);
        }
      }
    },

    showModalEVALMethod() {
      this.showModalEVAL = !this.showModalEVAL;
    },

    showModalSSIRSMethod() {
      this.showModalSSIRS = !this.showModalSSIRS;
    },

    showModalMethod7() {
      this.seguros2 = this.seguros;
      this.showModal7 = !this.showModal7;
      // document.getElementById("oficio").focus();
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

    async loadEvaluacions() {
      this.toggleLoading();

      this.toggleLoading();
    },

    fixTime() {
      if (this.evaluacion.fechaAuts) {
        this.evaluacion.fechaAuts = this.formatDateToFix(
          this.evaluacion.fechaAuts,
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

    // formatDate(dateValue: Date) {
    //   let out = moment(dateValue).add(4, "hours");
    //   return moment(out).format("MM");
    // },

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

    markAuto() {
      if (this.evaluacion.autorizacion) {
        this.evaluacion.autorizado = true;
      } else {
        this.evaluacion.autorizado = false;
      }
    },

    fillFields() {
      this.evaluacion.fechaAuts = new Date();
      if (this.$store.state.user.type == "Encargada de Facturación") {
        this.evaluacion.autorizPor = this.$store.state.user.usuario;
      }
      this.evaluacion.autorizado = false;
    },

    async saveEvaluaciona() {
      await this.loadOneEvaluacion();
    },

    async createEvaluacion() {
      this.estadoLoading = "Consultando Evaluaciónes Anteriores...";
      this.toggleLoading();
      // const res = await getManyByCedula(this.evaluacion.cedula);

      this.toggleLoading();
      this.estadoLoading = "Cargando...";
      // this.cantEvalPac = res.data.Count;
      // if (this.cantEvalPac == 9) {
      // alert("Este Paciente ya Cuenta con 9 Evaluaciones. Está dado de Alta.");
      // } else if (this.cantEvalPac == 8) {
      // alert(
      // "Esta es la Evaluación para el Alta del Paciente, Asegúrece de Verificar el Kit de Alta"
      // );

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
          this.estadoLoading = "Verificando Turno del Paciente...";
          this.toggleLoading();

          // this.evaluacion.fecha = this.formatDate(this.evaluacion.fecha);

          // try {
          //   // alert("Bucando Order");
          //   const res = await getManyByDate(
          //     this.$store.state.user.desde,
          //     this.$store.state.user.id_center
          //   );
          //   this.evaluacion.order = res.data.response.Count + 1;
          //   // alert(this.evaluacion.order);
          // } catch (error) {
          //   console.error(error);
          //   // alert(error);
          // }

          // this.evaluacion.id_centerKit = this.evaluacion.id_center;

          this.estadoLoading = "Actualizando Hoja de Evaluación...";

          try {
            const res = await create(this.evaluacion).then(
              async (res) => {
                // this.cleanFields();
                // this.fillFields();
                // this.fixTime();
                await this.toggleLoading();
                this.estadoLoading = "Cargando...";
                if (res.data.Status == "Success") {
                  this.$router.push("/listevalssupGener");
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
      // } else {
      //   if (this.evaluacion.nss.length == 9) {
      //     if (
      //       this.evaluacion.fecha &&
      //       this.evaluacion.cedula &&
      //       this.evaluacion.nombre &&
      //       this.evaluacion.apellido &&
      //       this.evaluacion.sexo &&
      //       this.evaluacion.fechaNacimiento &&
      //       this.evaluacion.edad &&
      //       this.evaluacion.nss &&
      //       this.evaluacion.regimen &&
      //       this.evaluacion.direccion &&
      //       this.evaluacion.telefono &&
      //       this.evaluacion.tipo_de_contacto &&
      //       this.evaluacion.nombre_contacto &&
      //       this.evaluacion.supervisor &&
      //       this.evaluacion.unap
      //     ) {
      //       this.toggleLoading();
      //       this.evaluacion.fecha = this.formatDate(this.evaluacion.fecha);

      //       this.estadoLoading = "Asignando Turno al Paciente...";
      //       await this.toggleLoading();

      //       try {
      //         // alert("Bucando Order");
      //         const res = await getManyByDate(
      //           this.$store.state.user.desde,
      //           this.$store.state.user.id_center
      //         );
      //         this.evaluacion.order = res.data.response.Count + 1;
      //         // alert(this.evaluacion.order);
      //       } catch (error) {
      //         console.error(error);
      //         // alert(error);
      //       }

      //       this.estadoLoading = "Creando Hoja de Evaluación...";

      //       this.evaluacion.id_centerKit = this.evaluacion.id_center;
      //       try {
      //         const res = await create(this.evaluacion).then(
      //           async (res) => {
      //             // this.cleanFields();
      //             this.fillFields();
      //             this.fixTime();
      //             await this.toggleLoading();
      //             this.estadoLoading = "Cargando...";
      //             if (res.data.Status == "Success") {
      //               this.$router.push("/listevalssupGener");
      //               this.showModalConfirmMethod();
      //             }
      //           },
      //           (err) => {
      //             alert(err);
      //           }
      //         );
      //       } catch (error) {
      //         console.error(error);
      //       }

      //       document.getElementById(this.campoFocus).focus();
      //     } else {
      //       alert("Asegúrece de llenar todos los Campos");
      //       // document.getElementById("cedula").focus();
      //     }
      //   } else {
      //     alert("Por Favor, Verifique el NSS");
      //     document.getElementById("nss").focus();
      //   }
      // }
    },

    // async deleteAllEvaluacions() {
    //   try {
    //     const res = await eliminateEvaluacions(this.evaluacion);
    //     // // console.log(res);
    //   } catch (error) {
    //     console.error(error);
    //   }
    // },

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
.flyer2 {
  width: 100%;
  /* height: 75%; */
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
.grid-verif {
  display: grid;
  grid-auto-flow: dense;
  grid-template-rows: auto auto;
  gap: 3px;
  grid-template-columns: repeat(auto-fit, minmax(21rem, 1fr));
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

/* Modal Scáner SIRS */
.modalSSIRS {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
  transition: all 500ms ease;
}

.contenedorSSIRS {
  width: 700px;
  height: 90%;
  margin: auto;
  background: #fff;
  box-shadow: 1px 7px 25px rgba(0, 0, 0, 0.5);
  transition: all 500ms ease;
  position: relative;
  overflow-y: scroll;
}

.contenedorSSIRS header {
  padding: 10px;
  background: rgb(82, 45, 109);
  color: #fff;
}

.contenedorSSIRS label {
  position: absolute;
  top: 10px;
  right: 10px;
  color: white;
  font-size: 15px;
  cursor: pointer;
}

.contenidoSSIRS {
  padding: 7px;
}

/* End Modal */

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
