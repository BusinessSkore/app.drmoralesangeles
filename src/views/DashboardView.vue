<template>
  <div class="backgrnd">
    <Navbar />
    <!-- <JsonExcel :data="this.evaluacions" /> -->

    <!-- <download-excel :data="items">
        Download
        <v-icon>mdi-file-excel</v-icon>
      </download-excel> -->

    <Transition>
      <div v-if="cargando" class="spin">
        <img
          class="img"
          :src="'https://isys-assets-bucket.s3.amazonaws.com/logos/logo.png'"
        />
      </div>
    </Transition>
    <div
      v-show="!cargando"
      v-if="this.$store.state.user.type == 'Supervisor en Sitio'"
      class="general"
    >
      <h3>
        Dashboard
      </h3>

      <a
        class="navbar-option"
        @click="this.$router.push('/validate_evaluacions')"
        href="#"
        ><i class="fas fa-user-check"></i> Validar Afiliado</a
      >
      <a
        class="navbar-option"
        @click="this.$router.push('/listevalssupSitio')"
        href="#"
        ><i class="fas fa-list"></i> Jornadas</a
      >

      <!-- <button
        @click="this.$router.push('/evaluacions')"
        class="btn btn-success btn-sm"
        type="button"
      >
        <i class="fas fa-file" _mstvisible="2"></i> Evaluaciones
      </button> -->
      <br />
      <br />
    </div>
    <div
      v-show="!cargando"
      v-if="this.$store.state.user.type == 'Encargada de Verificación'"
      class="general"
    >
      <h3>
        Dashboard
      </h3>
      <a
        class="navbar-option"
        @click="this.$router.push('/listevalsencvalid')"
        href="#"
        ><i class="fas fa-list"></i> Listado de Evaluaciones</a
      >
      <br />
      <div id="embeddingContainerAnalDats"></div>
      <br />
    </div>
    <div
      v-show="!cargando"
      v-if="this.$store.state.user.type == 'Médico Nutricionista Domiciliario'"
      class="general"
    >
      <h3>
        Dashboard
      </h3>
      <a
        class="navbar-option"
        @click="this.$router.push('/validate_evaluacions')"
        href="#"
        ><i class="fas fa-user-check"></i> Validar Afiliado</a
      >
      <a
        class="navbar-option"
        @click="this.$router.push('/listevalssupSitio')"
        href="#"
        ><i class="fas fa-list"></i> Listado de Evaluaciones</a
      >

      <!-- <a
        class="navbar-option"
        @click="this.$router.push('/listevalsmednutric')"
        href="#"
        ><i class="fas fa-list"></i> Listado de Evaluaciones</a
      > -->
      <br />
      <br />
    </div>
    <div
      v-show="!cargando"
      v-if="this.$store.state.user.type == 'Médico Nutricionista'"
      class="general"
    >
      <h3>
        Dashboard
      </h3>
      <a
        class="navbar-option"
        @click="this.$router.push('/listevalsmednutric')"
        href="#"
        ><i class="fas fa-list"></i> Listado de Evaluaciones</a
      >
      <br />
      <br />
    </div>
    <div
      v-show="!cargando"
      v-if="this.$store.state.user.type == 'Auditora Interna'"
      class="general"
    >
      <h3>
        Dashboard
      </h3>
      <a
        class="navbar-option"
        @click="this.$router.push('/evaluacionsprtscn')"
        href="#"
        ><i class="fas fa-list"></i> Jornadas</a
      >
      <br />
      <br />
    </div>
    <div
      v-show="!cargando"
      v-if="this.$store.state.user.type == 'Agente de Autorización'"
      class="general"
    >
      <h3>
        Dashboard
      </h3>

      <a
        class="navbar-option"
        @click="this.$router.push('/encFactEvalsAuto')"
        href="#"
        ><i class="fas fa-list"></i> Autorizaciones</a
      >
      <br />
      <!-- <div id="embeddingContainer"></div> -->
      <!-- <div>
        <label class="ta-l col-form-label col-form-label-sm" for="desde"
          >Fecha:</label
        ><input
          id="desde"
          type="date"
          @change="loadEvaluacions()"
          v-model="criterio.desde"
          class="form-control"
        />
      </div> -->
      <br />
      <!-- <div>
        <table id="customers">
          
          <th>FECHA</th>
          <th>NOMBRE</th>
          <th>APELLIDO</th>
          <th>CEDULA</th>
          <th>NSS</th>
          <th>TELÉFONO</th>
          
          <th>REGIÓN</th>
          <th>PROVINCIA</th>
          <th>UNAP</th>
          <th>KIT</th>
          <th>PRECIO</th>
          <th>SUPERVISOR</th>
          <th>AUTORIZACION</th>
          <tr v-for="(evaluacion, index) in evaluacions" :key="index">
            
            <td>{{ evaluacion.fecha }}</td>
            <td>{{ evaluacion.nombre }}</td>
            <td>{{ evaluacion.apellido }}</td>
            <td>{{ evaluacion.cedula }}</td>
            <td>{{ `'${evaluacion.nss}` }}</td>
            <td>{{ evaluacion.telefono }}</td>
            
            <td>{{ getRegion(evaluacion.id_center) }}</td>
            <td>{{ getProvincia(evaluacion.id_center) }}</td>
            <td>{{ getUnap(evaluacion.id_center) }}</td>
            <td>{{ evaluacion.kit }}</td>
            <td>{{ getPrecio(evaluacion.kit) }}</td>
            <td>{{ evaluacion.supervisor }}</td>
            <td>{{ `'${evaluacion.autorizacion}` }}</td>
          </tr>
        </table>
      </div> -->
      <br />
    </div>
    <div
      v-show="!cargando"
      v-if="this.$store.state.user.type == 'Encargada de Facturación'"
      class="general"
    >
      <h3>
        Dashboard
      </h3>

      <a
        class="navbar-option"
        @click="this.$router.push('/encFactEvalsAuto')"
        href="#"
        ><i class="fas fa-list"></i> Autorizaciones</a
      >
      <br />
      <div id="embeddingContainer"></div>
      <!-- <div>
        <label class="ta-l col-form-label col-form-label-sm" for="desde"
          >Fecha:</label
        ><input
          id="desde"
          type="date"
          @change="loadEvaluacions()"
          v-model="criterio.desde"
          class="form-control"
        />
      </div> -->
      <br />
      <!-- <div>
        <table id="customers">
          
          <th>FECHA</th>
          <th>NOMBRE</th>
          <th>APELLIDO</th>
          <th>CEDULA</th>
          <th>NSS</th>
          <th>TELÉFONO</th>
          
          <th>REGIÓN</th>
          <th>PROVINCIA</th>
          <th>UNAP</th>
          <th>KIT</th>
          <th>PRECIO</th>
          <th>SUPERVISOR</th>
          <th>AUTORIZACION</th>
          <tr v-for="(evaluacion, index) in evaluacions" :key="index">
            
            <td>{{ evaluacion.fecha }}</td>
            <td>{{ evaluacion.nombre }}</td>
            <td>{{ evaluacion.apellido }}</td>
            <td>{{ evaluacion.cedula }}</td>
            <td>{{ `'${evaluacion.nss}` }}</td>
            <td>{{ evaluacion.telefono }}</td>
            
            <td>{{ getRegion(evaluacion.id_center) }}</td>
            <td>{{ getProvincia(evaluacion.id_center) }}</td>
            <td>{{ getUnap(evaluacion.id_center) }}</td>
            <td>{{ evaluacion.kit }}</td>
            <td>{{ getPrecio(evaluacion.kit) }}</td>
            <td>{{ evaluacion.supervisor }}</td>
            <td>{{ `'${evaluacion.autorizacion}` }}</td>
          </tr>
        </table>
      </div> -->
      <br />
    </div>
    <div
      v-show="!cargando"
      v-if="this.$store.state.user.type == 'Analista de Datos'"
      class="general"
    >
      <h3>
        Dashboard
      </h3>

      <br />
      <div id="embeddingContainerAnalDats"></div>
      <br />
    </div>
    <div
      v-show="!cargando"
      v-if="this.$store.state.user.type == 'Auxiliar de Validación'"
      class="general"
    >
      <h3>
        Dashboard
      </h3>
      <a
        class="navbar-option"
        @click="this.$router.push('/listevalsauxvalid')"
        href="#"
        ><i class="fas fa-list"></i> Jornadas</a
      >
      <br />
      <br />
    </div>
    <div
      v-show="!cargando"
      v-if="
        this.$store.state.user.type ==
          'Subgerente de Promoción de la Salud y Prevención de la Enfermedad (P&P)'
      "
      class="general"
    >
      <h3>
        Dashboard
      </h3>
      <a
        class="navbar-option"
        @click="this.$router.push('/expediente')"
        href="#"
        ><i class="far fa-file-alt"></i> Expediente</a
      >
      <br />
      <br />
    </div>
    <div
      v-show="!cargando"
      v-if="this.$store.state.user.type == 'Supervisor General'"
      class="general"
    >
      <h3>
        Dashboard
      </h3>
      <!-- <a class="navbar-option" @click="this.$router.push('/centros')" href="#"
        ><i class="far fa-building"></i> Centros</a
      > -->
      <a
        class="navbar-option"
        @click="this.$router.push('/listevalssupGener')"
        href="#"
        ><i class="fas fa-list"></i> Jornadas</a
      >
      <br />
      <br />
    </div>
    <div
      v-show="!cargando"
      v-if="this.$store.state.user.type == 'Gerente de Operaciones'"
      class="general"
    >
      <h3>
        Dashboard
      </h3>
      <a class="navbar-option" @click="this.$router.push('/centros')" href="#"
        ><i class="far fa-building"></i> Centros</a
      >
      <a
        class="navbar-option"
        @click="this.$router.push('/evaluacionsprtscn')"
        href="#"
        ><i class="fas fa-list"></i> Jornadas</a
      >
      <br />
      <div id="embeddingContainerGteOper"></div>
      <br />
    </div>
    <div
      v-show="!cargando"
      v-if="this.$store.state.user.type == 'Administrador de Datos'"
      class="general"
    >
      <h3>
        Dashboard
      </h3>
      <a
        target="_blank"
        class="navbar-option"
        href="https://isys-assets-bucket.s3.amazonaws.com/AWSDynamoDBData/backup.json"
        ><i class="fas fa-download"></i> Descargar Backup</a
      >
      <!-- <div id="embeddingContainerGtorSenasa"></div> -->
      <br />
    </div>
    <div
      v-show="!cargando"
      v-if="this.$store.state.user.type == 'Gestor ARS SeNaSa'"
      class="general"
    >
      <h3>
        Dashboard
      </h3>
      <div id="embeddingContainerGtorSenasa"></div>
      <br />
    </div>
    <div
      v-show="!cargando"
      v-if="this.$store.state.user.type == 'Gerencia ARS SeNaSa'"
      class="general"
    >
      <h3>
        Dashboard
      </h3>
      <div id="embeddingContainerGciaSenasa"></div>
      <br />
    </div>
    <div
      v-show="!cargando"
      v-if="this.$store.state.user.type == 'Coordinador de Operaciones'"
      class="general"
    >
      <h3>
        Dashboard
      </h3>
      <a class="navbar-option" @click="this.$router.push('/centros')" href="#"
        ><i class="far fa-building"></i> Centros</a
      >
      <a
        class="navbar-option"
        @click="this.$router.push('/evaluacionsprtscn')"
        href="#"
        ><i class="fas fa-list"></i> Jornadas</a
      >
      <br />
      <br />
    </div>
    <div
      v-show="!cargando"
      v-if="this.$store.state.user.type == 'Auxiliar de Convocatoria'"
      class="general"
    >
      <h3>
        Dashboard
      </h3>
      <!-- <a
        class="navbar-option"
        @click="this.$router.push('/evaluacionscierre')"
        href="#"
        ><i class="fas fa-calendar-day"></i> Cierres</a
      > -->
      <br />
      <div id="embeddingContainerAuxConvoc"></div>
      <br />
      <br />
      <br />
    </div>
  </div>
</template>

<script lang="ts">
// import JsonExcel from "vue-json-excel";
import Navbar from "@/components/Navbar.vue";
import { getDash } from "@/services/dashboard/dashboardService";
import { getUrl2 } from "@/services/isys/QuicksightService";
import { getManyByDateOnly } from "@/services/evaluacion/Evaluacion";
import numeral from "numeral";
import Pusher from "pusher-js";
import moment from "moment";
import {
  embedDashboard,
  embedVisual,
  embedSession,
  embedQSearchBar,
} from "amazon-quicksight-embedding-sdk";
export default {
  name: "DashboardView",
  components: {
    Navbar,
    // JsonExcel
  },

  data() {
    return {
      criterio: {} as any,
      polyline_points:
        "50,300 100,167.5 150,100 250,80 350,160 450,100 550,100 650,150 750,200 750,300",
      imageUrl: "",
      dias: [] as any,
      presupuesto: 400000,
      presupuesto2: 2335000,
      usuariosCant: [] as any,
      facturasCant: [] as any,
      factsGpedByCli: [] as any,
      mejorasPend: [] as any,
      totales: {} as any,
      cargando: false,
      capurl: "",
      capurlAuxConvoc: "",
      capurlAnalDats: "",
      capurlGteOper: "",
      capurlGciaSenasa: "",
      capurlGtorSenasa: "",
    };
  },

  methods: {
    getRegion(id_center: string) {
      switch (id_center) {
        case "900244":
          return "II";
        case "900161":
          return "I";
        case "900457":
          return "VIII";
        case "900200":
          return "0";
        case "900536":
          return "II";
        case "900287":
          return "IV";
        case "900559":
          return "VI";
        case "900188":
          return "0";
        case "900152":
          return "I";
        case "900197":
          return "0";
        case "900355":
          return "V";
        case "900157":
          return "I";
        case "900062":
          return "0";
        case "900049":
          return "0";
        case "900517":
          return "III";
        case "900158":
          return "I";
        case "900175":
          return "0";
        case "900292":
          return "IV";
        case "900408":
          return "VII";
        case "900190":
          return "0";
        case "900239":
          return "III";
        case "900302":
          return "IV";
        case "900243":
          return "III";
        case "900356":
          return "V";
        case "900337":
          return "V";
        case "900007":
          return "0";
        case "900331":
          return "V";
        case "900108":
          return "I";
        case "900245":
          return "II";
        case "900449":
          return "VIII";
        case "900509":
          return "II";
        case "900072":
          return "0";
        case "900401":
          return "VII";
        case "900183":
          return "0";
        case "900095":
          return "0";
        case "900546":
          return "0";
        case "900042":
          return "0";
        case "900478":
          return "VIII";
        case "900067":
          return "0";
        case "900085":
          return "0";
        case "900173":
          return "0";
        case "900316":
          return "III";
        case "900464":
          return "VIII";
        case "900254":
          return "II";
        case "900510":
          return "II";
        case "900272":
          return "III";
        case "900202":
          return "0";
        case "900155":
          return "I";
        case "900265":
          return "II";
        case "900131":
          return "I";
        case "900170":
          return "0";
        case "900352":
          return "0";
        case "900216":
          return "0";
        case "900211":
          return "0";
        case "900150":
          return "I";
        case "900107":
          return "0";
        case "900360":
          return "V";
        case "900185":
          return "0";
        case "900297":
          return "IV";
        case "900426":
          return "VII";
        case "900290":
          return "IV";
        case "900167":
          return "0";
        case "900047":
          return "0";
        case "900300":
          return "IV";
        case "900353":
          return "V";
        case "900146":
          return "V";
        case "900383":
          return "VI";
        case "900282":
          return "IV";
        case "900268":
          return "II";
        case "900534":
          return "III";
        case "900180":
          return "0";
        case "900273":
          return "II";
        case "900469":
          return "VIII";
        case "900531":
          return "III";
        case "900013":
          return "0";
        case "900043":
          return "0";
        case "900385":
          return "VI";
        case "900445":
          return "VIII";
        case "900525":
          return "0";
        case "900274":
          return "II";
        case "900575":
          return "VII";
        case "900516":
          return "VII";
        case "900548":
          return "I";
        case "900504":
          return "III";
        case "900018":
          return "0";
        case "900054":
          return "0";
        case "900048":
          return "0";
        case "900119":
          return "I";
        case "900342":
          return "V";
        case "900154":
          return "I";
        case "900256":
          return "II";
        case "900299":
          return "IV";
        case "900037":
          return "0";
        case "900251":
          return "0";
        case "900524":
          return "0";
        case "900467":
          return "VIII";
        case "900006":
          return "0";
        case "900015":
          return "0";
        case "900537":
          return "II";
        case "900416":
          return "VII";
        case "900313":
          return "II";
        case "900328":
          return "II";
        case "900502":
          return "0";
        case "900050":
          return "0";
        case "900284":
          return "IV";
        case "900012":
          return "0";
        case "900343":
          return "V";
        case "900030":
          return "0";
        case "900402":
          return "VII";
        case "900166":
          return "I";
        case "900489":
          return "III";
        case "900382":
          return "VI";
        case "900490":
          return "IV";
        case "900447":
          return "VIII";
        case "900458":
          return "VIII";
        case "900002":
          return "0";
        case "900053":
          return "0";
        case "900027":
          return "0";
        case "900096":
          return "0";
        case "900147":
          return "I";
        case "900159":
          return "I";
        case "900078":
          return "0";
        case "900237":
          return "III";
        case "900428":
          return "VII";
        case "900169":
          return "0";
        case "900495":
          return "VI";
        case "900332":
          return "V";
        case "900429":
          return "VII";
        case "900293":
          return "IV";
        case "900418":
          return "VII";
        case "900076":
          return "0";
        case "900511":
          return "0";
        case "900213":
          return "0";
        case "900143":
          return "I";
        case "900440":
          return "VIII";
        case "900527":
          return "V";
        case "900003":
          return "0";
        case "900226":
          return "II";
        case "900523":
          return "0";
        case "900480":
          return "VIII";
        case "900563":
          return "VII";
        case "900481":
          return "VIII";
        case "900261":
          return "III";
        case "900247":
          return "III";
        case "900020":
          return "0";
        case "900138":
          return "I";
        case "900351":
          return "V";
        case "900198":
          return "0";
        case "900303":
          return "IV";
        case "900471":
          return "VIII";
        case "900117":
          return "I";
        case "900259":
          return "II";
        case "900505":
          return "III";
        case "900540":
          return "VIII";
        case "900260":
          return "III";
        case "900569":
          return "III";
        case "900553":
          return "0";
        case "900151":
          return "I";
        case "900314":
          return "II";
        case "900140":
          return "I";
        case "900258":
          return "III";
        case "900165":
          return "I";
        case "900566":
          return "II";
        case "900064":
          return "0";
        case "900181":
          return "0";
        case "900476":
          return "VIII";
        case "900177":
          return "0";
        case "900442":
          return "VIII";
        case "900115":
          return "0";
        case "900514":
          return "VI";
        case "900120":
          return "I";
        case "900333":
          return "V";
        case "900532":
          return "VIII";
        case "900427":
          return "VII";
        case "900097":
          return "0";
        case "900218":
          return "II";
        case "900433":
          return "VII";
        case "900109":
          return "0";
        case "900040":
          return "0";
        case "900255":
          return "II";
        case "900141":
          return "I";
        case "900088":
          return "0";
        case "900248":
          return "II";
        case "900405":
          return "VII";
        case "900276":
          return "IV";
        case "900235":
          return "II";
        case "900113":
          return "I";
        case "900091":
          return "0";
        case "900522":
          return "III";
        case "900556":
          return "I";
        case "900384":
          return "VI";
        case "900010":
          return "0";
        case "900526":
          return "0";
        case "900310":
          return "III";
        case "900430":
          return "VII";
        case "900573":
          return "III";
        case "900508":
          return "II";
        case "900397":
          return "VI";
        case "900519":
          return "VIII";
        case "900086":
          return "0";
        case "900223":
          return "III";
        case "900340":
          return "V";
        case "900422":
          return "VII";
        case "900077":
          return "0";
        case "900507":
          return "I";
        case "900574":
          return "VIII";
        case "900039":
          return "0";
        case "900568":
          return "VIII";
        case "900431":
          return "VII";
        case "900386":
          return "VI";
        case "900220":
          return "II";
        case "900485":
          return "I";
        case "900224":
          return "II";
        case "900122":
          return "I";
        case "900036":
          return "0";
        case "900406":
          return "VII";
        case "900414":
          return "VII";
        case "900046":
          return "0";
        case "900488":
          return "III";
        case "900460":
          return "VIII";
        case "900492":
          return "I";
        case "900468":
          return "VIII";
        case "900263":
          return "III";
        case "900114":
          return "I";
        case "900410":
          return "VII";
        case "900084":
          return "0";
        case "900178":
          return "0";
        case "900055":
          return "0";
        case "900482":
          return "-";
        case "900506":
          return "0";
        case "900004":
          return "0";
        case "900357":
          return "V";
        case "900221":
          return "II";
        case "900409":
          return "VII";
        case "900232":
          return "III";
        case "900394":
          return "VI";
        case "900212":
          return "0";
        case "900317":
          return "III";
        case "900089":
          return "0";
        case "900267":
          return "III";
        case "900392":
          return "VI";
        case "900371":
          return "V";
        case "900135":
          return "I";
        case "900423":
          return "VII";
        case "900368":
          return "V";
        case "900208":
          return "0";
        case "900230":
          return "III";
        case "900101":
          return "0";
        case "900330":
          return "III";
        case "900229":
          return "II";
        case "900240":
          return "II";
        case "900404":
          return "VII";
        case "900081":
          return "0";
        case "900452":
          return "VIII";
        case "900419":
          return "VII";
        case "900070":
          return "0";
        case "900057":
          return "-";
        case "900320":
          return "III";
        case "900162":
          return "I";
        case "900008":
          return "0";
        case "900016":
          return "0";
        case "900493":
          return "I";
        case "900228":
          return "II";
        case "900395":
          return "VI";
        case "900033":
          return "0";
        case "900187":
          return "0";
        case "900156":
          return "I";
        case "900225":
          return "III";
        case "900090":
          return "0";
        case "900073":
          return "0";
        case "900023":
          return "0";
        case "900545":
          return "0";
        case "900075":
          return "0";
        case "900417":
          return "VII";
        case "900459":
          return "VIII";
        case "900501":
          return "III";
        case "900034":
          return "0";
        case "900437":
          return "VIII";
        case "900129":
          return "I";
        case "900083":
          return "0";
        case "900350":
          return "V";
        case "900486":
          return "0";
        case "900092":
          return "0";
        case "900024":
          return "0";
        case "900483":
          return "VIII";
        case "900250":
          return "III";
        case "900446":
          return "VIII";
        case "900125":
          return "I";
        case "900093":
          return "0";
        case "900309":
          return "II";
        case "900367":
          return "V";
        case "900137":
          return "I";
        case "900547":
          return "0";
        case "900102":
          return "0";
        case "900025":
          return "0";
        case "900308":
          return "III";
        case "900551":
          return "I";
        case "900139":
          return "I";
        case "900530":
          return "III";
        case "900209":
          return "0";
        case "900184":
          return "0";
        case "900262":
          return "II";
        case "900327":
          return "III";
        case "900179":
          return "0";
        case "900301":
          return "IV";
        case "900376":
          return "VI";
        case "900203":
          return "0";
        case "900441":
          return "VIII";
        case "900425":
          return "VII";
        case "900472":
          return "0";
        case "900443":
          return "VIII";
        case "900354":
          return "V";
        case "900335":
          return "V";
        case "900362":
          return "V";
        case "900379":
          return "VI";
        case "900470":
          return "VIII";
        case "900558":
          return "0";
        case "900435":
          return "VII";
        case "900275":
          return "III";
        case "900311":
          return "II";
        case "900479":
          return "VIII";
        case "900171":
          return "0";
        case "900104":
          return "0";
        case "900334":
          return "V";
        case "900133":
          return "I";
        case "900424":
          return "VII";
        case "900066":
          return "0";
        case "900280":
          return "IV";
        case "900063":
          return "0";
        case "900391":
          return "VI";
        case "900513":
          return "I";
        case "900074":
          return "0";
        case "900450":
          return "VIII";
        case "900363":
          return "V";
        case "900533":
          return "III";
        case "900372":
          return "VI";
        case "900454":
          return "VIII";
        case "900474":
          return "VIII";
        case "900145":
          return "I";
        case "900098":
          return "0";
        case "900448":
          return "VIII";
        case "900252":
          return "III";
        case "900344":
          return "V";
        case "900453":
          return "VIII";
        case "900497":
          return "0";
        case "900577":
          return "VII";
        case "900487":
          return "0";
        case "900538":
          return "0";
        case "900193":
          return "0";
        case "900550":
          return "I";
        case "900336":
          return "V";
        case "900500":
          return "I";
        case "900323":
          return "II";
        case "900388":
          return "VI";
        case "900494":
          return "I";
        case "900552":
          return "I";
        case "900319":
          return "II";
        case "900087":
          return "0";
        case "900134":
          return "I";
        case "900241":
          return "II";
        case "900231":
          return "II";
        case "900172":
          return "0";
        case "900214":
          return "0";
        case "900103":
          return "0";
        case "900570":
          return "III";
        case "900325":
          return "II";
        case "900246":
          return "II";
        case "900056":
          return "0";
        case "900496":
          return "0";
        case "900381":
          return "VI";
        case "900080":
          return "0";
        case "900099":
          return "0";
        case "900403":
          return "VII";
        case "900174":
          return "0";
        case "900321":
          return "II";
        case "900242":
          return "III";
        case "900412":
          return "VII";
        case "900205":
          return "0";
        case "900298":
          return "IV";
        case "900019":
          return "0";
        case "900338":
          return "V";
        case "900160":
          return "I";
        case "900069":
          return "-";
        case "900009":
          return "0";
        case "900370":
          return "V";
        case "900128":
          return "I";
        case "900191":
          return "0";
        case "900373":
          return "VI";
        case "900432":
          return "VII";
        case "900491":
          return "I";
        case "900304":
          return "IV";
        case "900124":
          return "I";
        case "900148":
          return "I";
        case "900415":
          return "VII";
        case "900456":
          return "VIII";
        case "900318":
          return "III";
        case "900365":
          return "V";
        case "900014":
          return "0";
        case "900347":
          return "V";
        case "900182":
          return "0";
        case "900196":
          return "0";
        case "900189":
          return "0";
        case "900192":
          return "0";
        case "900094":
          return "0";
        case "900374":
          return "VI";
        case "900217":
          return "0";
        case "900364":
          return "V";
        case "900477":
          return "VIII";
        case "900176":
          return "0";
        case "900400":
          return "VI";
        case "900079":
          return "0";
        case "900421":
          return "VII";
        case "900270":
          return "II";
        case "900149":
          return "I";
        case "900387":
          return "VI";
        case "900164":
          return "I";
        case "900518":
          return "III";
        case "900434":
          return "VII";
        case "900565":
          return "II";
        case "900032":
          return "0";
        case "900163":
          return "I";
        case "900462":
          return "VIII";
        case "900031":
          return "0";
        case "900322":
          return "III";
        case "900112":
          return "I";
        case "900473":
          return "VIII";
        case "900194":
          return "0";
        case "900528":
          return "III";
        case "900283":
          return "IV";
        case "900571":
          return "VIII";
        case "900222":
          return "III";
        case "900035":
          return "0";
        case "900059":
          return "0";
        case "900028":
          return "0";
        case "900116":
          return "I";
        case "900420":
          return "VII";
        case "900544":
          return "I";
        case "900118":
          return "I";
        case "900389":
          return "VI";
        case "900227":
          return "III";
        case "900576":
          return "II";
        case "900060":
          return "0";
        case "900029":
          return "0";
        case "900346":
          return "V";
        case "900123":
          return "I";
        case "900543":
          return "I";
        case "900279":
          return "IV";
        case "900294":
          return "IV";
        case "900017":
          return "0";
        case "900539":
          return "VIII";
        case "900461":
          return "VIII";
        case "900439":
          return "VIII";
        case "900281":
          return "IV";
        case "900082":
          return "0";
        case "900463":
          return "VIII";
        case "900438":
          return "VIII";
        case "900503":
          return "III";
        case "900199":
          return "0";
        case "900005":
          return "0";
        case "900291":
          return "IV";
        case "900105":
          return "0";
        case "900277":
          return "IV";
        case "900541":
          return "III";
        case "900512":
          return "I";
        case "900038":
          return "0";
        case "900375":
          return "VI";
        case "900051":
          return "0";
        case "900549":
          return "0";
        case "900071":
          return "0";
        case "900377":
          return "0";
        case "900307":
          return "IV";
        case "900234":
          return "II";
        case "900100":
          return "0";
        case "900026":
          return "0";
        case "900564":
          return "VII";
        case "900312":
          return "III";
        case "900398":
          return "VI";
        case "900045":
          return "0";
        case "900396":
          return "VI";
        case "900407":
          return "VII";
        case "900535":
          return "VIII";
        case "900444":
          return "VIII";
        case "900132":
          return "I";
        case "900455":
          return "VIII";
        case "900345":
          return "V";
        case "900207":
          return "0";
        case "900058":
          return "0";
        case "900236":
          return "II";
        case "900561":
          return "V";
        case "900266":
          return "II";
        case "900288":
          return "IV";
        case "900554":
          return "I";
        case "900555":
          return "0";
        case "900111":
          return "I";
        case "900285":
          return "IV";
        case "900204":
          return "0";
        case "900215":
          return "0";
        case "900520":
          return "VIII";
        case "900021":
          return "0";
        case "900451":
          return "VIII";
        case "900399":
          return "VI";
        case "900306":
          return "IV";
        case "900341":
          return "V";
        case "900271":
          return "III";
        case "900130":
          return "I";
        case "900484":
          return "VIII";
        case "900257":
          return "II";
        case "900560":
          return "V";
        case "900390":
          return "VI";
        case "900436":
          return "VII";
        case "900411":
          return "VII";
        case "900127":
          return "I";
        case "900289":
          return "IV";
        case "900393":
          return "VI";
        case "900249":
          return "II";
        case "900264":
          return "II";
        case "900361":
          return "V";
        case "900110":
          return "I";
        case "900269":
          return "III";
        case "900557":
          return "0";
        case "900168":
          return "0";
        case "900144":
          return "I";
        case "900366":
          return "V";
        case "900339":
          return "V";
        case "900068":
          return "0";
        case "900329":
          return "II";
        case "900106":
          return "0";
        case "900296":
          return "IV";
        case "900475":
          return "VIII";
        case "900358":
          return "V";
        case "900324":
          return "III";
        case "900348":
          return "V";
        case "900041":
          return "0";
        case "900465":
          return "VIII";
        case "900210":
          return "0";
        case "900001":
          return "0";
        case "900295":
          return "IV";
        case "900061":
          return "0";
        case "900052":
          return "0";
        case "900466":
          return "VIII";
        case "900136":
          return "I";
        case "900219":
          return "III";
        case "900065":
          return "0";
        case "900521":
          return "VIII";
        case "900315":
          return "III";
        case "900567":
          return "VIII";
        case "900562":
          return "VII";
        case "900011":
          return "0";
        case "900359":
          return "V";
        case "900233":
          return "II";
        case "900326":
          return "II";
        case "900278":
          return "IV";
        case "900380":
          return "VI";
        case "900201":
          return "0";
        case "900349":
          return "V";
        case "900NaN":
          return "-";
        case "900498":
          return "V";
        case "900378":
          return "VI";
        case "900206":
          return "0";
        case "900305":
          return "IV";
        case "900238":
          return "II";
        case "900153":
          return "I";
        case "900515":
          return "IV";
        case "900369":
          return "V";
        case "900186":
          return "0";
        case "900253":
          return "II";
        case "900572":
          return "VIII";
        case "900126":
          return "I";
        case "900044":
          return "0";
        case "900195":
          return "0";
        case "900022":
          return "0";
        case "900413":
          return "VII";
        case "900286":
          return "IV";
        case "900529":
          return "-";
        case "900121":
          return "I";
        case "900542":
          return "0";
        case "900142":
          return "I";
        case "900587":
          return "III";
        case "900584":
          return "II";
        case "900585":
          return "II";
        case "900586":
          return "II";
        case "900590":
          return "IV";
        case "900578":
          return "I";
        case "900580":
          return "0";
        case "900591":
          return "IV";
        case "900579":
          return "0";
        case "900581":
          return "0";
        case "900583":
          return "I";

        default:
          return "";
      }
    },

    getProvincia(id_center: string) {
      switch (id_center) {
        case "900244":
          return "PUERTO PLATA";
        case "900161":
          return "SAN JOSE DE OCOA";
        case "900457":
          return "LA VEGA";
        case "900200":
          return "DISTRITO NACIONAL";
        case "900536":
          return "ESPALLIAT";
        case "900287":
          return "BARAHONA";
        case "900188":
          return "SANTO DOMINGO OESTE";
        case "900559":
          return "SAN JUAN";
        case "900197":
          return "SANTO DOMINGO OESTE";
        case "900152":
          return "SAN CRISTOBAL";
        case "900355":
          return "HATO MAYOR";
        case "900062":
          return "SANTO DOMINGO ESTE";
        case "900157":
          return "SAN JOSE DE OCOA";
        case "900049":
          return "DISTRITO NACIONAL";
        case "900517":
          return "HERMANAS MIRABAL";
        case "900175":
          return "SANTO DOMINGO OESTE";
        case "900158":
          return "SAN CRISTOBAL";
        case "900292":
          return "BARAHONA";
        case "900190":
          return "SANTO DOMINGO NORTE";
        case "900408":
          return "DAJABON";
        case "900239":
          return "SANTIAGO";
        case "900302":
          return "BARAHONA";
        case "900243":
          return "SANTIAGO";
        case "900356":
          return "LA ROMANA";
        case "900337":
          return "SAN PEDRO DE MACORIS";
        case "900007":
          return "DISTRITO NACIONAL";
        case "900331":
          return "SAN PEDRO DE MACORIS";
        case "900108":
          return "PERAVIA";
        case "900245":
          return "ESPALLIAT";
        case "900449":
          return "SANCHEZ RAMIREZ";
        case "900072":
          return "SANTO DOMINGO ESTE";
        case "900509":
          return "SANTIAGO";
        case "900183":
          return "SANTO DOMINGO OESTE";
        case "900401":
          return "DAJABON";
        case "900546":
          return "SANTO DOMINGO ESTE";
        case "900095":
          return "MONTE PLATA";
        case "900042":
          return "DISTRITO NACIONAL";
        case "900067":
          return "SANTO DOMINGO ESTE";
        case "900478":
          return "MONSENOR NOUEL";
        case "900085":
          return "SANTO DOMINGO ESTE";
        case "900173":
          return "SANTO DOMINGO OESTE";
        case "900316":
          return "DUARTE";
        case "900464":
          return "LA VEGA";
        case "900254":
          return "PUERTO PLATA";
        case "900510":
          return "PUERTO PLATA";
        case "900272":
          return "PUERTO PLATA";
        case "900202":
          return "SANTO DOMINGO NORTE";
        case "900155":
          return "PERAVIA";
        case "900265":
          return "SANTIAGO";
        case "900170":
          return "SANTO DOMINGO OESTE";
        case "900131":
          return "SAN CRISTOBAL";
        case "900352":
          return "DISTRITO NACIONAL";
        case "900216":
          return "SANTO DOMINGO OESTE";
        case "900211":
          return "SANTO DOMINGO NORTE";
        case "900150":
          return "SAN CRISTOBAL";
        case "900107":
          return "MONTE PLATA";
        case "900360":
          return "SAN PEDRO DE MACORIS";
        case "900185":
          return "SANTO DOMINGO OESTE";
        case "900297":
          return "BARAHONA";
        case "900426":
          return "ESPERANZA, VALVERDE";
        case "900167":
          return "SANTO DOMINGO NORTE";
        case "900290":
          return "INDEPENDENCIA";
        case "900047":
          return "DISTRITO NACIONAL";
        case "900300":
          return "BARAHONA";
        case "900353":
          return "EL SEIBO";
        case "900146":
          return "LA ALTAGRACIA";
        case "900383":
          return "AZUA";
        case "900282":
          return "INDEPENDENCIA";
        case "900268":
          return "PUERTO PLATA";
        case "900180":
          return "SANTO DOMINGO OESTE";
        case "900534":
          return "DUARTE";
        case "900273":
          return "SANTIAGO";
        case "900469":
          return "SANCHEZ RAMIREZ";
        case "900531":
          return "DUARTE";
        case "900013":
          return "DISTRITO NACIONAL";
        case "900043":
          return "DISTRITO NACIONAL";
        case "900385":
          return "AZUA";
        case "900525":
          return "SANTO DOMINGO ESTE";
        case "900445":
          return "MONSENOR NOUEL";
        case "900274":
          return "SANTIAGO";
        case "900575":
          return "VALVERDE";
        case "900516":
          return "SANTIAGO RODRIGUEZ";
        case "900548":
          return "SAN CRISTOBAL";
        case "900504":
          return "MARIA TRINIDAD SANCHEZ";
        case "900054":
          return "SANTO DOMINGO ESTE";
        case "900018":
          return "DISTRITO NACIONAL";
        case "900048":
          return "DISTRITO NACIONAL";
        case "900119":
          return "SAN CRISTOBAL";
        case "900342":
          return "SAN PEDRO DE MACORIS";
        case "900154":
          return "SAN CRISTOBAL";
        case "900256":
          return "SANTIAGO";
        case "900299":
          return "BAHORUCO";
        case "900251":
          return "SANTO DOMINGO NORTE";
        case "900037":
          return "DISTRITO NACIONAL";
        case "900524":
          return "SANTO DOMINGO ESTE";
        case "900467":
          return "MONSENOR NOUEL";
        case "900006":
          return "DISTRITO NACIONAL";
        case "900015":
          return "DISTRITO NACIONAL";
        case "900537":
          return "SANTIAGO";
        case "900416":
          return "DAJABON";
        case "900313":
          return "MARIA TRINIDAD SANCHEZ";
        case "900502":
          return "SANTO DOMINGO ESTE";
        case "900328":
          return "DUARTE";
        case "900050":
          return "SANTO DOMINGO NORTE";
        case "900284":
          return "BAHORUCO";
        case "900012":
          return "DISTRITO NACIONAL";
        case "900343":
          return "ALTAGRACIA";
        case "900030":
          return "DISTRITO NACIONAL";
        case "900402":
          return "VALVERDE";
        case "900166":
          return "PERAVIA";
        case "900489":
          return "DUARTE";
        case "900382":
          return "AZUA";
        case "900490":
          return "MARIA TRINIDAD SANCHEZ";
        case "900447":
          return "LA VEGA";
        case "900458":
          return "LA VEGA";
        case "900002":
          return "DISTRITO NACIONAL";
        case "900053":
          return "SANTO DOMINGO ESTE";
        case "900027":
          return "DISTRITO NACIONAL";
        case "900096":
          return "MONTE PLATA";
        case "900147":
          return "PERAVIA";
        case "900078":
          return "SANTO DOMINGO ESTE";
        case "900159":
          return "SAN CRISTOBAL";
        case "900237":
          return "SANTIAGO";
        case "900428":
          return "MONTE CRISTI";
        case "900169":
          return "SANTO DOMINGO NORTE";
        case "900495":
          return "SAN JUAN";
        case "900332":
          return "LA ROMANA";
        case "900429":
          return "MONTE CRISTI";
        case "900293":
          return "BARAHONA";
        case "900076":
          return "SANTO DOMINGO ESTE";
        case "900418":
          return "VALVERDE";
        case "900213":
          return "SANTO DOMINGO NORTE";
        case "900511":
          return "DISTRITO NACIONAL";
        case "900143":
          return "SAN CRISTOBAL";
        case "900440":
          return "SANCHEZ RAMIREZ";
        case "900527":
          return "SAN PEDRO DE MACORIS";
        case "900003":
          return "DISTRITO NACIONAL";
        case "900226":
          return "PUERTO PLATA";
        case "900523":
          return "DISTRITO NACIONAL";
        case "900480":
          return "MONSENOR NOUEL";
        case "900563":
          return "VALVERDE";
        case "900481":
          return "LA VEGA";
        case "900261":
          return "EPAILLAT";
        case "900247":
          return "SANTIAGO";
        case "900020":
          return "DISTRITO NACIONAL";
        case "900138":
          return "SAN CRISTOBAL";
        case "900198":
          return "SANTO DOMINGO NORTE";
        case "900351":
          return "HATO MAYOR";
        case "900303":
          return "BARAHONA";
        case "900471":
          return "LA VEGA";
        case "900117":
          return "SAN CRISTOBAL";
        case "900259":
          return "PUERTO PLATA";
        case "900505":
          return "DUARTE";
        case "900540":
          return "MONSENOR NOUEL";
        case "900260":
          return "SANTIAGO";
        case "900553":
          return "SANTO DOMINGO NORTE";
        case "900569":
          return "MARIA TRINIDAD SANCHEZ";
        case "900151":
          return "SAN JOSE DE OCOA";
        case "900314":
          return "DUARTE";
        case "900140":
          return "SAN CRISTOBAL";
        case "900258":
          return "SANTIAGO";
        case "900165":
          return "SAN CRISTOBAL";
        case "900064":
          return "SANTO DOMINGO ESTE";
        case "900566":
          return "ESPALLIAT";
        case "900181":
          return "SANTO DOMINGO NORTE";
        case "900177":
          return "SANTO DOMINGO NORTE";
        case "900476":
          return "LA VEGA";
        case "900115":
          return "SANTO DOMINGO OESTE";
        case "900442":
          return "SANCHEZ RAMIREZ";
        case "900514":
          return "AZUA";
        case "900120":
          return "VILLA ALTAGRACIA";
        case "900333":
          return "SAN PEDRO DE MACORIS";
        case "900532":
          return "MONSENOR NOUEL";
        case "900427":
          return "VALVERDE";
        case "900097":
          return "MONTE PLATA";
        case "900218":
          return "SANTIAGO";
        case "900109":
          return "DISTRITO NACIONAL";
        case "900433":
          return "SANTIAGO RODRIGUEZ";
        case "900040":
          return "DISTRITO NACIONAL";
        case "900255":
          return "SANTIAGO";
        case "900088":
          return "SANTO DOMINGO ESTE";
        case "900141":
          return "PERAVIA";
        case "900248":
          return "ESPALLIAT";
        case "900405":
          return "DAJABON";
        case "900276":
          return "BARAHONA";
        case "900235":
          return "SANTIAGO";
        case "900113":
          return "PERAVIA";
        case "900091":
          return "MONTE PLATA";
        case "900522":
          return "DUARTE";
        case "900556":
          return "SAN JOSE DE OCOA";
        case "900384":
          return "SAN JUAN";
        case "900526":
          return "DISTRITO NACIONAL";
        case "900010":
          return "DISTRITO NACIONAL";
        case "900310":
          return "SAMANA ";
        case "900430":
          return "VALVERDE";
        case "900573":
          return "DUARTE";
        case "900508":
          return "SANTIAGO";
        case "900397":
          return "SAN JUAN";
        case "900086":
          return "SANTO DOMINGO ESTE";
        case "900519":
          return "LA VEGA";
        case "900223":
          return "ESPAILLAT";
        case "900340":
          return "SAN PEDRO DE MACORIS";
        case "900077":
          return "SANTO DOMINGO ESTE";
        case "900422":
          return "MONTE CRISTI";
        case "900507":
          return "PERAVIA";
        case "900574":
          return "SANCHEZ RAMIREZ";
        case "900039":
          return "DISTRITO NACIONAL";
        case "900568":
          return "SANCHEZ RAMIREZ";
        case "900431":
          return "VALVERDE";
        case "900386":
          return "SAN JUAN";
        case "900220":
          return "SANTIAGO";
        case "900485":
          return "SAN CRISTOBAL";
        case "900224":
          return "SANTIAGO";
        case "900122":
          return "SAN CRISTOBAL";
        case "900036":
          return "DISTRITO NACIONAL";
        case "900406":
          return "SANTIAGO RODRIGUEZ";
        case "900414":
          return "SANTIAGO RODRIGUEZ";
        case "900046":
          return "DISTRITO NACIONAL";
        case "900488":
          return "HERMANAS MIRABAL";
        case "900460":
          return "SANCHEZ RAMIREZ";
        case "900492":
          return "SAN CRISTOBAL";
        case "900468":
          return "SANCHEZ RAMIREZ";
        case "900263":
          return "PUERTO PLATA";
        case "900114":
          return "SAN CRISTOBAL";
        case "900410":
          return "VALVERDE";
        case "900178":
          return "SANTO DOMINGO NORTE";
        case "900084":
          return "SANTO DOMINGO ESTE";
        case "900055":
          return "SANTO DOMINGO ESTE";
        case "900506":
          return "DISTRITO NACIONAL";
        case "900482":
          return "-";
        case "900004":
          return "DISTRITO NACIONAL";
        case "900357":
          return "LA ALTAGRACIA";
        case "900221":
          return "SANTIAGO";
        case "900409":
          return "VALVERDE";
        case "900232":
          return "SANTIAGO";
        case "900394":
          return "SAN JUAN";
        case "900212":
          return "SANTO DOMINGO NORTE";
        case "900089":
          return "SANTO DOMINGO ESTE";
        case "900317":
          return "DUARTE";
        case "900267":
          return "SANTIAGO";
        case "900392":
          return "SAN JUAN";
        case "900371":
          return "HATO MAYOR";
        case "900135":
          return "SAN JOSE DE OCOA";
        case "900423":
          return "SANTIAGO RODRIGUEZ";
        case "900208":
          return "SANTO DOMINGO NORTE";
        case "900368":
          return "HATO MAYOR ";
        case "900230":
          return "SANTIGO";
        case "900101":
          return "MONTE PLATA";
        case "900330":
          return "DUARTE";
        case "900229":
          return "SANTIAGO";
        case "900240":
          return "SANTIAGO";
        case "900081":
          return "SANTO DOMINGO ESTE";
        case "900404":
          return "VALVERDE";
        case "900452":
          return "LA VEGA";
        case "900070":
          return "SANTO DOMINGO ESTE";
        case "900419":
          return "VALVERDE";
        case "900057":
          return "-";
        case "900320":
          return "DUARTE";
        case "900162":
          return "PERAVIA";
        case "900008":
          return "DISTRITO NACIONAL";
        case "900016":
          return "DISTRITO NACIONAL";
        case "900493":
          return "PERAVIA";
        case "900228":
          return "SANTIAGO";
        case "900395":
          return "SAN JUAN";
        case "900033":
          return "DISTRITO NACIONAL";
        case "900187":
          return "SANTO DOMINGO OESTE";
        case "900156":
          return "SAN CRISTOBAL";
        case "900090":
          return "SANTO DOMINGO ESTE";
        case "900225":
          return "SANTIAGO";
        case "900073":
          return "SANTO DOMINGO ESTE";
        case "900545":
          return "SANTO DOMINGO NORTE";
        case "900023":
          return "DISTRITO NACIONAL";
        case "900075":
          return "SANTO DOMINGO ESTE";
        case "900417":
          return "DAJABON";
        case "900459":
          return "LA VEGA";
        case "900501":
          return "DUARTE";
        case "900034":
          return "DISTRITO NACIONAL";
        case "900437":
          return "LA VEGA";
        case "900083":
          return "SANTO DOMINGO ESTE";
        case "900129":
          return "SAN JOSE DE OCOA";
        case "900486":
          return "SANTO DOMINGO ESTE";
        case "900350":
          return "HATO MAYOR";
        case "900092":
          return "MONTE PLATA";
        case "900024":
          return "DISTRITO NACIONAL";
        case "900483":
          return "MONSENOR NOUEL";
        case "900250":
          return "SANTIAGO";
        case "900446":
          return "SANCHEZ RAMIREZ";
        case "900125":
          return "SAN CRISTOBAL";
        case "900093":
          return "MONTE PLATA";
        case "900309":
          return "DUARTE";
        case "900367":
          return "LA ROMANA";
        case "900547":
          return "SANTO DOMINGO NORTE";
        case "900137":
          return "PERAVIA";
        case "900102":
          return "MONTE PLATA";
        case "900025":
          return "DISTRITO NACIONAL";
        case "900308":
          return "DUARTE";
        case "900551":
          return "SAN CRISTOBAL";
        case "900139":
          return "SAN CRISTOBAL";
        case "900209":
          return "SANTO DOMINGO NORTE";
        case "900530":
          return "DUARTE";
        case "900184":
          return "SANTO DOMINGO OESTE";
        case "900262":
          return "SANTIAGO";
        case "900327":
          return "DUARTE";
        case "900179":
          return "DISTRITO NACIONAL";
        case "900301":
          return "BARAHONA";
        case "900203":
          return "SANTO DOMINGO OESTE";
        case "900376":
          return "SAN JUAN";
        case "900441":
          return "SANCHEZ RAMIREZ";
        case "900472":
          return "SANTO DOMINGO OESTE";
        case "900425":
          return "VALVERDE";
        case "900443":
          return "SANCHEZ RAMIREZ";
        case "900354":
          return "SAN PEDRO DE MACORIS";
        case "900335":
          return "SAN PEDRO DE MACORIS";
        case "900362":
          return "LA ROMANA";
        case "900379":
          return "SAN JUAN";
        case "900470":
          return "SANCHEZ RAMIREZ";
        case "900558":
          return "MONTE PLATA";
        case "900435":
          return "VALVERDE";
        case "900275":
          return "SANTIAGO";
        case "900311":
          return "DUARTE";
        case "900171":
          return "SANTO DOMINGO OESTE";
        case "900479":
          return "LA VEGA";
        case "900104":
          return "MONTE PLATA";
        case "900334":
          return "SAN PEDRO DE MACORIS";
        case "900133":
          return "SAN CRISTOBAL";
        case "900424":
          return "MONTE CRISTI";
        case "900066":
          return "SANTO DOMINGO ESTE";
        case "900063":
          return "SANTO DOMINGO ESTE";
        case "900280":
          return "BAHORUCO";
        case "900391":
          return "SAN JUAN";
        case "900074":
          return "SANTO DOMINGO ESTE";
        case "900513":
          return "SAN CRISTOBAL";
        case "900450":
          return "LA VEGA";
        case "900363":
          return "LA ALTAGRACIA";
        case "900533":
          return "MARIA TRINIDAD SANCHEZ";
        case "900372":
          return "SAN JUAN";
        case "900454":
          return "LA VEGA";
        case "900474":
          return "MONSENOR NOUEL";
        case "900145":
          return "SAN CRISTOBAL";
        case "900098":
          return "MONTE PLATA";
        case "900448":
          return "MONSENOR NOUEL";
        case "900252":
          return "MOCA";
        case "900344":
          return "SAN PEDRO DE MACORIS";
        case "900497":
          return "SANTO DOMINGO ESTE";
        case "900453":
          return "SANCHEZ RAMIREZ";
        case "900487":
          return "SANTO DOMINGO ESTE";
        case "900577":
          return "VALVERDE";
        case "900538":
          return "SANTO DOMINGO ESTE";
        case "900193":
          return "SANTO DOMINGO OESTE";
        case "900550":
          return "SAN CRISTOBAL";
        case "900336":
          return "LA ROMANA";
        case "900500":
          return "SAN CRISTOBAL";
        case "900323":
          return "DUARTE";
        case "900388":
          return "SAN JUAN";
        case "900494":
          return "SAN CRISTOBAL";
        case "900552":
          return "SAN JOSE DE OCOA";
        case "900087":
          return "SANTO DOMINGO NORTE";
        case "900319":
          return "SAMANA";
        case "900134":
          return "PERAVIA";
        case "900241":
          return "SANTIAGO";
        case "900172":
          return "SANTO DOMINGO OESTE";
        case "900231":
          return "PUERTO PLATA";
        case "900214":
          return "SANTO DOMINGO OESTE";
        case "900103":
          return "MONTE PLATA";
        case "900570":
          return "MARIA TRINIDAD SANCHEZ";
        case "900325":
          return "MARIA TRINIDAD SANCHEZ";
        case "900056":
          return "SANTO DOMINGO ESTE";
        case "900246":
          return "SANTIAGO";
        case "900496":
          return "SANTO DOMINGO ESTE";
        case "900381":
          return "AZUA";
        case "900080":
          return "SANTO DOMINGO ESTE";
        case "900099":
          return "MONTE PLATA";
        case "900403":
          return "DAJABON";
        case "900174":
          return "SANTO DOMINGO OESTE";
        case "900321":
          return "DUARTE";
        case "900242":
          return "SANTIAGO";
        case "900205":
          return "SANTO DOMINGO NORTE";
        case "900412":
          return "VALVERDE";
        case "900298":
          return "BARAHONA";
        case "900019":
          return "DISTRITO NACIONAL";
        case "900338":
          return "SAN PEDRO DE MACORIS";
        case "900160":
          return "SAN CRISTOBAL";
        case "900069":
          return "-";
        case "900009":
          return "DISTRITO NACIONAL";
        case "900370":
          return "HATO MAYOR";
        case "900128":
          return "SAN CRISTOBAL";
        case "900191":
          return "SANTO DOMINGO OESTE";
        case "900373":
          return "SAN JUAN";
        case "900432":
          return "SANTIAGO RODRIGUEZ";
        case "900491":
          return "SAN CRISTOBAL";
        case "900304":
          return "BARAHONA";
        case "900124":
          return "SAN CRISTOBAL";
        case "900148":
          return "SAN CRISTOBAL";
        case "900415":
          return "DAJABON";
        case "900456":
          return "SANCHEZ RAMIREZ";
        case "900318":
          return "DUARTE";
        case "900365":
          return "LA ROMANA";
        case "900014":
          return "DISTRITO NACIONAL";
        case "900182":
          return "SANTO DOMINGO OESTE";
        case "900347":
          return "SAN PEDRO DE MACORIS";
        case "900196":
          return "SANTO DOMINGO NORTE";
        case "900189":
          return "SANTO DOMINGO OESTE";
        case "900192":
          return "SANTO DOMINGO NORTE";
        case "900094":
          return "MONTE PLATA";
        case "900217":
          return "SANTO DOMINGO NORTE";
        case "900374":
          return "SAN JUAN";
        case "900364":
          return "LA ROMANA";
        case "900176":
          return "SANTO DOMINGO OESTE";
        case "900477":
          return "LA VEGA";
        case "900079":
          return "DISTRITO NACIONAL";
        case "900400":
          return "SAN JUAN";
        case "900421":
          return "VALVERDE";
        case "900270":
          return "SANTIAGO";
        case "900149":
          return "SAN CRISTOBAL";
        case "900387":
          return "AZUA";
        case "900164":
          return "SAN CRISTOBAL";
        case "900518":
          return "MARIA TRINIDAD SANCHEZ";
        case "900434":
          return "MONTE CRISTI";
        case "900565":
          return "SANTIAGO";
        case "900032":
          return "DISTRITO NACIONAL";
        case "900163":
          return "PERAVIA";
        case "900462":
          return "LA VEGA";
        case "900031":
          return "DISTRITO NACIONAL";
        case "900322":
          return "DUARTE";
        case "900112":
          return "PERAVIA";
        case "900194":
          return "SANTO DOMINGO OESTE";
        case "900473":
          return "LA VEGA";
        case "900528":
          return "HERMANAS MIRABAL";
        case "900283":
          return "INDEPENDENCIA";
        case "900571":
          return "SANCHEZ RAMIREZ";
        case "900222":
          return "MOCA";
        case "900059":
          return "SANTO DOMINGO ESTE";
        case "900035":
          return "DISTRITO NACIONAL";
        case "900028":
          return "DISTRITO NACIONAL";
        case "900116":
          return "SAN CRISTOBAL";
        case "900420":
          return "MONTE CRISTI";
        case "900544":
          return "PERAVIA";
        case "900118":
          return "SAN CRISTOBAL";
        case "900389":
          return "SAN JUAN";
        case "900227":
          return "SANTIAGO";
        case "900576":
          return "SANTIAGO";
        case "900060":
          return "SANTO DOMINGO ESTE";
        case "900029":
          return "DISTRITO NACIONAL";
        case "900346":
          return "SAN PEDRO DE MACORIS";
        case "900123":
          return "SAN CRISTOBAL";
        case "900543":
          return "PERAVIA";
        case "900279":
          return "BARAHONA";
        case "900294":
          return "INDEPENDENCIA";
        case "900017":
          return "DISTRITO NACIONAL";
        case "900539":
          return "LA VEGA";
        case "900461":
          return "SANCHEZ RAMIREZ";
        case "900439":
          return "MONSENOR NOUEL";
        case "900082":
          return "SANTO DOMINGO ESTE";
        case "900281":
          return "BARAHONA";
        case "900463":
          return "LA VEGA";
        case "900438":
          return "LA VEGA";
        case "900199":
          return "SANTO DOMINGO OESTE";
        case "900503":
          return "DUARTE";
        case "900005":
          return "DISTRITO NACIONAL";
        case "900291":
          return "BARAHONA";
        case "900105":
          return "MONTE PLATA";
        case "900277":
          return "BARAHONA";
        case "900541":
          return "DUARTE";
        case "900512":
          return "SAN CRISTOBAL";
        case "900038":
          return "DISTRITO NACIONAL";
        case "900051":
          return "SANTO DOMINGO ESTE";
        case "900375":
          return "AZUA";
        case "900549":
          return "SANTO DOMINGO OESTE";
        case "900071":
          return "SANTO DOMINGO ESTE";
        case "900377":
          return "SANTO DOMINGO NORTE";
        case "900307":
          return "BAHORUCO";
        case "900234":
          return "PUERTO PLATA";
        case "900100":
          return "MONTE PLATA";
        case "900026":
          return "DISTRITO NACIONAL";
        case "900564":
          return "VALVERDE";
        case "900312":
          return "MARIA TRINIDAD SANCHEZ";
        case "900398":
          return "SAN JUAN";
        case "900045":
          return "DISTRITO NACIONAL";
        case "900396":
          return "AZUA";
        case "900407":
          return "VALVERDE";
        case "900535":
          return "SANCHEZ RAMIREZ";
        case "900444":
          return "SANCHEZ RAMIREZ";
        case "900132":
          return "SAN CRISTOBAL";
        case "900455":
          return "SANCHEZ RAMIREZ";
        case "900345":
          return "SAN PEDRO DE MACORIS";
        case "900207":
          return "SANTO DOMINGO OESTE";
        case "900058":
          return "SANTO DOMINGO ESTE";
        case "900236":
          return "SANTIAGO";
        case "900561":
          return "LA ALTAGRACIA";
        case "900266":
          return "SANTIAGO";
        case "900288":
          return "BARAHONA";
        case "900554":
          return "SAN CRISTOBAL";
        case "900555":
          return "MONTE PLATA";
        case "900111":
          return "SAN CRISTOBAL";
        case "900285":
          return "BARAHONA";
        case "900215":
          return "SANTO DOMINGO OESTE";
        case "900204":
          return "SANTO DOMINGO NORTE";
        case "900520":
          return "LA VEGA";
        case "900021":
          return "DISTRITO NACIONAL";
        case "900451":
          return "LA VEGA";
        case "900399":
          return "SAN JUAN";
        case "900306":
          return "BARAHONA";
        case "900341":
          return "SAN PEDRO DE MACORIS";
        case "900271":
          return "SANTIAGO";
        case "900130":
          return "PERAVIA";
        case "900484":
          return "SANCHEZ RAMIREZ";
        case "900257":
          return "SANTIAGO";
        case "900560":
          return "SAN PEDRO DE MACORIS";
        case "900390":
          return "SAN JUAN";
        case "900436":
          return "MONTE CRISTI";
        case "900411":
          return "MONTE CRISTI";
        case "900127":
          return "SAN CRISTOBAL";
        case "900289":
          return "BARAHONA";
        case "900393":
          return "SAN JUAN";
        case "900249":
          return "SANTIAGO";
        case "900264":
          return "PUERTO PLATA";
        case "900361":
          return "SAN PEDRO DE MACORIS";
        case "900110":
          return "SAN CRISTOBAL";
        case "900557":
          return "SANTO DOMINGO NORTE";
        case "900269":
          return "SANTIAGO";
        case "900168":
          return "SANTO DOMINGO OESTE";
        case "900144":
          return "SAN JOSE DE OCOA";
        case "900366":
          return "LA ROMANA";
        case "900068":
          return "SANTO DOMINGO ESTE";
        case "900339":
          return "SEIBO";
        case "900329":
          return "HERMANAS MIRABAL";
        case "900106":
          return "MONTE PLATA";
        case "900296":
          return "INDEPENDENCIA";
        case "900475":
          return "COTUI";
        case "900358":
          return "SAN PEDRO DE MACORIS";
        case "900324":
          return "MARIA TRINIDAD SANCHEZ";
        case "900041":
          return "DISTRITO NACIONAL";
        case "900348":
          return "SAN PEDRO DE MACORIS";
        case "900210":
          return "SANTO DOMINGO NORTE";
        case "900465":
          return "LA VEGA";
        case "900001":
          return "DISTRITO NACIONAL";
        case "900061":
          return "SANTO DOMINGO ESTE";
        case "900295":
          return "BARAHONA";
        case "900052":
          return "SANTO DOMINGO ESTE";
        case "900466":
          return "LA VEGA";
        case "900136":
          return "SAN CRISTOBAL";
        case "900065":
          return "SANTO DOMINGO ESTE";
        case "900219":
          return "SANTIAGP";
        case "900521":
          return "SANCHEZ RAMIREZ";
        case "900315":
          return "DUARTE";
        case "900567":
          return "LA VEGA";
        case "900562":
          return "VALVERDE";
        case "900011":
          return "DISTRITO NACIONAL";
        case "900359":
          return "SAN PEDRO DE MACORIS";
        case "900233":
          return "SANTIAGO";
        case "900326":
          return "MARIA TRINIDAD SANCHEZ";
        case "900278":
          return "BARAHONA";
        case "900380":
          return "SAN JUAN";
        case "900201":
          return "SANTO DOMINGO NORTE";
        case "900349":
          return "SAN PEDRO DE MACORIS";
        case "900NAN":
          return "-";
        case "900498":
          return "LA ROMANA";
        case "900206":
          return "SANTO DOMINGO OESTE";
        case "900378":
          return "AZUA";
        case "900305":
          return "BARAHONA";
        case "900238":
          return "PUERTO PLATA";
        case "900153":
          return "SAN JOSE DE OCOA";
        case "900515":
          return "BARAHONA";
        case "900186":
          return "SANTO DOMINGO OESTE";
        case "900369":
          return "HATO MAYOR";
        case "900253":
          return "ESPALLIAT";
        case "900572":
          return "SANCHEZ RAMIREZ";
        case "900126":
          return "SAN CRISTOBAL";
        case "900044":
          return "DISTRITO NACIONAL";
        case "900195":
          return "SANTO DOMINGO OESTE";
        case "900022":
          return "DISTRITO NACIONAL";
        case "900413":
          return "SANTIAGO RODRIGUEZ";
        case "900286":
          return "BARAHONA";
        case "900542":
          return "SANTO DOMINGO ESTE";
        case "900529":
          return "-";
        case "900121":
          return "SAN CRISTOBAL";
        case "900142":
          return "SAN JOSE DE OCOA";
        case "900587":
          return "DUARTE";
        case "900584":
          return "SANTIAGO";
        case "900585":
          return "ESPALLIAT";
        case "900586":
          return "PUERTO PLATA";
        case "900590":
          return "BARAHONA";
        case "900578":
          return "VILLA ALTAGRACIA";
        case "900580":
          return "DISTRITO NACIONAL";
        case "900591":
          return "BARAHONA";
        case "900579":
          return "DISTRITO NACIONAL";
        case "900581":
          return "DISTRITO NACIONAL";
        case "900583":
          return "SAN CRISTOBAL";

        default:
          return "";
      }
    },

    getPrecio(kit: string) {
      switch (kit) {
        case "KIT 1":
          return 3275;
        case "KIT 2A":
          return 4585;
        case "KIT 2B":
          return 4585;
        case "KIT 3":
          return 5275;
        default:
          return 0;
      }
    },

    getUnap(id_center: string) {
      switch (id_center) {
        case "900244":
          return "EL JAVILLAR ";
        case "900161":
          return "SAN ANTONIO";
        case "900457":
          return "EL RINCON";
        case "900200":
          return "FUNDACION SOL VIVIENTE";
        case "900536":
          return "SANTA ROSA";
        case "900287":
          return "LA FURNIA";
        case "900559":
          return "VILLA ESPERANZA ";
        case "900188":
          return "HATO NUEVO";
        case "900152":
          return "NORMAN RUIZ";
        case "900197":
          return "FUNDACION DOMINICANA DE DESARROLLO SOSTENIBLE PROHUMANO";
        case "900355":
          return "ONDINA";
        case "900157":
          return "PUEBLO ABAJO";
        case "900580":
          return "JUNTA DE VECINO LOS PERALEJOS";
        case "900062":
          return "MARGARA I";
        case "900049":
          return "Club Leonida Solano";
        case "900612":
          return "SOTO";
        case "900517":
          return "LOS LIMONES DE VILLA TAPIA";
        case "900158":
          return "QUITA SUEÃ‘O";
        case "900175":
          return "BARRIO ENRIQUILLO";
        case "900292":
          return "LOS LIRIOS";
        case "900408":
          return "MANUEL BUENO";
        case "900190":
          return "VILLA BLANCA";
        case "900239":
          return "Guano";
        case "900302":
          return "PEÃ‘ON";
        case "900243":
          return "Hoyo de bartola";
        case "900356":
          return "PADRE CAVALOTO";
        case "900337":
          return "CLINICA URBANA QUISQUEYA";
        case "900007":
          return "MANGANAGUA";
        case "900331":
          return "ANGELINA";
        case "900108":
          return "ACTIVOS 20-30";
        case "900245":
          return "JOBA ARRIBA";
        case "900449":
          return "LA ATALAYA";
        case "900509":
          return "LOS CIRUELITOS";
        case "900072":
          return "CABRETO NARANJO";
        case "900586":
          return "PADRES LAS CASAS ";
        case "900401":
          return "LA CURVA";
        case "900183":
          return "SAN ANTONIO DE PADUA";
        case "900095":
          return "EL CACIQUE";
        case "900546":
          return "FUNDACION  LA NUEVA OPORTUNIDAD";
        case "900042":
          return "CLINICA URBANA YOLANDA GUZMAN";
        case "900478":
          return "PROSPERIDAD";
        case "900067":
          return "CENTRO SALUD INTEGRAL DOCTOR SOCRATES";
        case "900085":
          return "VILLA DUARTE";
        case "900173":
          return "CAMPAMENTO 16 DE AGOSTO";
        case "900316":
          return "HERMANAS MIRABAL";
        case "900621":
          return "GUACHUPITA ";
        case "900464":
          return "EL HIGUERO";
        case "900254":
          return "LLANO DE PEREZ";
        case "900510":
          return "VILLA LIBERACION";
        case "900272":
          return "SOSUA";
        case "900202":
          return "La Esperanza";
        case "900155":
          return "PAYA";
        case "900265":
          return "PALO AMARILLO";
        case "900131":
          return "CONANI";
        case "900170":
          return "BAYONA";
        case "900352":
          return "MAMA TINGO";
        case "900216":
          return "SUBCENTRO LAS CAOBAS";
        case "900211":
          return "Nueva Barquita";
        case "900150":
          return "MOSCU";
        case "900107":
          return "LA CUABA";
        case "900360":
          return "SAN MARTIN DE PORRES";
        case "900185":
          return "CLUB 16 DE AGOSTO";
        case "900297":
          return "GUAZARAS";
        case "900426":
          return "JICOME";
        case "900290":
          return "LAS MERCEDES";
        case "900167":
          return "2 DE ENERO";
        case "900047":
          return "JUNTA DE DESARROLLO GUALEY";
        case "900300":
          return "CIENAGA";
        case "900353":
          return "MIRADOR SUR";
        case "900146":
          return "MAMA TINGO";
        case "900383":
          return "LA BOMBITA";
        case "900282":
          return "COLONIAL MIXTA";
        case "900268":
          return "RIO GRANDE";
        case "900534":
          return "LAS TARANAS";
        case "900180":
          return "MANOGUAYABO";
        case "900273":
          return "VILLA BAO";
        case "900469":
          return "La Canas";
        case "900605":
          return "CPN MAJAGUAL";
        case "900531":
          return "LOS AGUAYOS";
        case "900013":
          return "FUNDACION ESCOBA ";
        case "900603":
          return "SAN JOSE DE CONUCO ";
        case "900043":
          return "CLUB VILLA FRANCISCA";
        case "900385":
          return "GUAYABAL";
        case "900445":
          return "LA CEIBA";
        case "900525":
          return "FUNRASO ";
        case "900274":
          return "VILLA LIBERACION";
        case "900575":
          return "ENRIQUILLO";
        case "900516":
          return "LOS TOMINES";
        case "900548":
          return "BARRIO DUARTE  VILLA ALTAGRACIA";
        case "900504":
          return "LOS YAYALES";
        case "900018":
          return "ANTI TB INFANTIL";
        case "900054":
          return "INGENIO OZAMA";
        case "900048":
          return "Cienaga";
        case "900119":
          return "CAOBAL";
        case "900342":
          return "EL PUERTO";
        case "900154":
          return "Paraiso";
        case "900256":
          return "LOS GUANDULES";
        case "900299":
          return "PALOMA MENSAJERA";
        case "900037":
          return "DISPENSARIO MEDICO LA ESPERILLA";
        case "900251":
          return "LA UNION";
        case "900524":
          return "RALMA";
        case "900467":
          return "JUMA";
        case "900006":
          return "CENTRO COMUNAL LA ZURZA";
        case "900015":
          return "LOS GUANDULES";
        case "900537":
          return "BELLA VISTA";
        case "900416":
          return "MARIANO CESTERO";
        case "900313":
          return "LA PAYITA";
        case "900328":
          return "La peâ€“a";
        case "900502":
          return "SAN BARTOLO ";
        case "900050":
          return "FUNDACION VILLA MORADA";
        case "900284":
          return "LAS SABILAS";
        case "900012":
          return "CARMEN RENATA";
        case "900343":
          return "EL SALADO";
        case "900030":
          return "GREGORIO LUPERON";
        case "900606":
          return "POASI";
        case "900402":
          return "LAGUNA SALADA";
        case "900166":
          return "VILLA SOMBRERO";
        case "900489":
          return "LAS COLINAS";
        case "900607":
          return "LA MONTAÃ‘ITA ";
        case "900382":
          return "LOS JOBOS";
        case "900490":
          return "LOS YAYALES";
        case "900447":
          return "LICEY";
        case "900579":
          return "PEDRO BRAND CENTRO DIAGNOSTICO ";
        case "900458":
          return "CPN JIMA ARRIBA";
        case "900002":
          return "FUNDADORES";
        case "900053":
          return "CPN FE Y ESPERANZA";
        case "900027":
          return "PADRE MARCILLA";
        case "900611":
          return "SALUD MENTAL LA ZURZA ";
        case "900096":
          return "GONZALO";
        case "900147":
          return "MATA GORDA";
        case "900589":
          return "EL RANCHITO";
        case "900159":
          return "SABANA GRANDE DE PALENQUE";
        case "900078":
          return "PROLONGACION VENEZUELA LOS 3 BRAZOS";
        case "900588":
          return "LA CEIBA";
        case "900237":
          return "FUNDA AMBIENTE";
        case "900428":
          return "LA ESPERANZA";
        case "900169":
          return "ASOCIACION LIDERES EMPRENDEDORES VOLUNTARIOS";
        case "900495":
          return "'-";
        case "900332":
          return "ANTITUBERCULOSO DR. LUIS J SUARES";
        case "900429":
          return "LA GALLERA";
        case "900293":
          return "MARIA MONTEZ";
        case "900610":
          return "HATILLO SAN CRISTOBAL";
        case "900418":
          return "BAHORUCO";
        case "900076":
          return "CAMPO LINDO I";
        case "900511":
          return "CENTRO FUNDACION DE DIOS";
        case "900213":
          return "PONCE ADENTRO";
        case "900143":
          return "LOS MOGOTES";
        case "900440":
          return "HERNANDO ALONZO";
        case "900527":
          return "CENTRO DIAGNOSTICO HATO MAYOR";
        case "900003":
          return "LOS RAMIREZ";
        case "900226":
          return "CABARETE";
        case "900523":
          return "SAN PABLO APOSTOL ";
        case "900480":
          return "SABANA DEL PUERTO";
        case "900563":
          return "ENRIQUILLO";
        case "900481":
          return "SABANA REY";
        case "900261":
          return "MANUEL RODRIGUEZ";
        case "900247":
          return "LA CANELA";
        case "900020":
          return "BARRIO ANGELES";
        case "900138":
          return "GERONIMOS PENALES";
        case "900351":
          return "LAS YAGUITAS";
        case "900198":
          return "FUNDACION NACIONAL EDUACACION Y SOCIEDAD PARA ENVEJECIENTES";
        case "900303":
          return "POLO CENTRO";
        case "900471":
          return "'-";
        case "900117":
          return "CAMBITA CRUCE";
        case "900259":
          return "MAIMON";
        case "900505":
          return "LOS LIMONES DE PIMENTEL";
        case "900540":
          return "SABANA DEL PUERTO";
        case "900583":
          return "LOS TOROS CAMBITA CRUCE";
        case "900260":
          return "MAMA TINGO";
        case "900569":
          return "LAS GORDAS";
        case "900553":
          return "LA UREÃ‘A ";
        case "900151":
          return "EL NARANJAL ";
        case "900314":
          return "CRISTO REY";
        case "900140":
          return "LA ALTAGRACIA";
        case "900258":
          return "LOS TOCONES";
        case "900165":
          return "VILLA FEDERICO";
        case "900566":
          return "JUAN LOPEZ";
        case "900064":
          return "FUNDACIÃ“N LEVANTANDO LOS CAÍDOS";
        case "900181":
          return "MATA MAMON";
        case "900476":
          return "LOS POMOS";
        case "900177":
          return "LA PALMITA";
        case "900442":
          return "BARRIO LINDO";
        case "900115":
          return "BARRIO DUARTE";
        case "900514":
          return "HOSPITAL NUESTRA SEÃ‘ORA DEL CARMEN ";
        case "900120":
          return "CATAREY";
        case "900333":
          return "BARRIO LINDO";
        case "900532":
          return "CAÃ‘O PIEDRA";
        case "900595":
          return "SALADILLO";
        case "900427":
          return "LA CAYA";
        case "900097":
          return "JUAN SANCHEZ";
        case "900218":
          return "ARROYO HONDO";
        case "900433":
          return "LAS FLORES";
        case "900109":
          return "FUNDACION  PROAYUDA PARA ENVEJECIENTES";
        case "900040":
          return "LOS PERALEJOS";
        case "900255":
          return "LOS CIRUELOS";
        case "900601":
          return "RINCON HONDO";
        case "900141":
          return "LA CATALINA";
        case "900088":
          return "JUNTA DE VECINO SAN ANTONIO";
        case "900248":
          return "CEIBA DE MADERA";
        case "900405":
          return "RESTAURACION";
        case "900276":
          return "ALTO VELO";
        case "900235":
          return "ESTANCIA DEL YAQUE";
        case "900113":
          return "NANCY ORTIZ";
        case "900091":
          return "Hato Nuevo";
        case "900522":
          return "LA REFORMA";
        case "900556":
          return "LA CIENAGA ";
        case "900384":
          return "VILLA LIBERACION";
        case "900010":
          return "LA AGUSTINA";
        case "900526":
          return "LA CUABA ";
        case "900310":
          return "EL CATEY";
        case "900430":
          return "LA MINA";
        case "900573":
          return "LAS COLES";
        case "900508":
          return "EL GUANO";
        case "900397":
          return "LAS CHARCHAS DE MARIA NOVA";
        case "900519":
          return "LICEY";
        case "900086":
          return "LOS TANQUECITOS";
        case "900223":
          return "BONAGUA";
        case "900616":
          return "BOMBA DE YAIBA";
        case "900340":
          return "DON JUAN";
        case "900422":
          return "EL AHOGADO";
        case "900077":
          return "CAMPO LINDO II";
        case "900507":
          return "RIO ARRIBA";
        case "900574":
          return "COMEDERO ABAJO";
        case "900039":
          return "CENTRO COMUNITARIOS VILLAS AGRICOLAS";
        case "900568":
          return "CABALLERO";
        case "900431":
          return "LAS 300";
        case "900386":
          return "BOHECHIO";
        case "900220":
          return "BARRIO NUEVO LA HERRADURA";
        case "900485":
          return "CLINICA RURAL CAMBOYA";
        case "900224":
          return "BUEN PASTOR";
        case "900122":
          return "CAJULITO SAN CRISTOBAL";
        case "900036":
          return "CENTRO COMUNAL VILLAS AGRICOLAS";
        case "900406":
          return "Tomines";
        case "900414":
          return "EL TAMARINDO";
        case "900046":
          return "La esperilla";
        case "900488":
          return "FE VIOLETA, HERMANAS MIRABAL.";
        case "900460":
          return "SIERRA PRIETA";
        case "900492":
          return "CPN CONANI";
        case "900597":
          return "GUACO";
        case "900468":
          return "LA BIJA";
        case "900263":
          return "MERCEDES NAVARRO";
        case "900114":
          return "5 DE ABRIL";
        case "900410":
          return "Saman";
        case "900084":
          return "Clinica Rural La Ureâ€“a";
        case "900585":
          return "TIERRA DURA ";
        case "900178":
          return "FUNDACOSI XXI";
        case "900055":
          return "VOLUNTARIADO NACIONAL DE RESCATE Y PREVENCION";
        case "900482":
          return "'-";
        case "900506":
          return "MAMA TINGO";
        case "900004":
          return "ASCENCION DEL SENOR";
        case "900357":
          return "PLATANITOS";
        case "900221":
          return "BARRIO OBRERO";
        case "900409":
          return "GURABO";
        case "900232":
          return "EL PUNAL";
        case "900623":
          return "CPN VALPIANA (SANTO DOMINGO OESTE)";
        case "900394":
          return "LA ESTANCIA";
        case "900212":
          return "NUEVA ISABELITA";
        case "900317":
          return "HOSTOS";
        case "900089":
          return "MIS SUEÃ‘OS";
        case "900267":
          return "PLATANAL";
        case "900392":
          return "HIGUERITO";
        case "900371":
          return "Hospital Seâ€“ora del Carmen";
        case "900135":
          return "EL PINAR";
        case "900423":
          return "EL PINO";
        case "900368":
          return "VILLA NAVARRO";
        case "900208":
          return "LOTES Y SERVICIOS";
        case "900230":
          return "Ciruelito";
        case "900101":
          return "HOSPITAL MUNICIPAL DE YAMASA";
        case "900330":
          return "VISTA AL VALLE";
        case "900229":
          return "CANCA LA PIEDRA";
        case "900240":
          return "HATO MAYOR";
        case "900596":
          return "GUARAGUAO";
        case "900404":
          return "CARLOS DANIEL";
        case "900081":
          return "MADRE LAURA (GUERRA)";
        case "900452":
          return "BUENA VISTA";
        case "900419":
          return "BARRIO SUR";
        case "900070":
          return "CPN GUERRA";
        case "900057":
          return "'-";
        case "900320":
          return "LA ROSA DE CENOVI";
        case "900162":
          return "SAONA";
        case "900008":
          return "ENSANCHE LUPERON";
        case "900016":
          return "Club Villa Francisco";
        case "900493":
          return "FUNDACION PROAYUDA PARA ENVEJECIENTES ( PERAVIA)";
        case "900228":
          return "CAIMITO DEL JANICO";
        case "900395":
          return "LA MAGUANA";
        case "900033":
          return "EL FERNANDEZ";
        case "900187":
          return "HERMANAS MIRABAL";
        case "900156":
          return "EL PUEBLECITO";
        case "900225":
          return "BUENOS AIRES";
        case "900090":
          return "CORALES CAÃ‘A";
        case "900073":
          return "ISABELITA";
        case "900023":
          return "MATA HAMBRE";
        case "900545":
          return "LA NUEVA BARQUITA";
        case "900075":
          return "VIETNAM";
        case "900584":
          return "LA UNION";
        case "900417":
          return "BARRIO NORTE";
        case "900459":
          return "LAS 7S";
        case "900501":
          return "EL CAIMI ";
        case "900034":
          return "CENTRO PARROQUIAL SAN GABRIEL";
        case "900591":
          return "CPN BAHORUCO";
        case "900437":
          return "LAS YAYAS";
        case "900129":
          return "Cienaga";
        case "900083":
          return "BRISAS DEL ESTE";
        case "900350":
          return "LAS CHINAS";
        case "900604":
          return "LLANOS DEL INGENIO";
        case "900486":
          return "FRAILES I";
        case "900092":
          return "BATEY ANTOCI";
        case "900024":
          return "IGLESIA SANTA ANA";
        case "900483":
          return "SAN JOSE";
        case "900250":
          return "LA OTRA BANDA";
        case "900446":
          return "EL PESCOZON";
        case "900125":
          return "PINO HERRADO";
        case "900093":
          return "CENTRO DE PRIMER NIVEL HATO SAN PEDRO";
        case "900309":
          return "CASTILLO URBANO";
        case "900367":
          return "VILLA HERMOSA V";
        case "900137":
          return "FUNDACION DE PERAVIA";
        case "900547":
          return "LA ESPERANZA ANTIGUO CPN SAN FELIPE ";
        case "900102":
          return "PERALVILLO";
        case "900025":
          return "LA MUNICIPAL";
        case "900308":
          return "ARENOSO";
        case "900551":
          return "LAS FLORES SAN CRISTOBAL";
        case "900139":
          return "GUANANITO";
        case "900530":
          return "LA PEÃ‘A";
        case "900209":
          return "MAMA TINGO";
        case "900184":
          return "CESAC DE LA SALLE";
        case "900262":
          return "MATANZAS";
        case "900327":
          return "LA JOYA";
        case "900179":
          return "LA CIENEGA";
        case "900602":
          return "LAS GARITAS";
        case "900301":
          return "PARAISO";
        case "900593":
          return "LOS PLATANITOS LA ALTAGRACIA";
        case "900376":
          return "JUAN DE HERRERA";
        case "900203":
          return "LA GUAYIGA";
        case "900441":
          return "La Atalaya";
        case "900425":
          return "ENTRADA DE MAO";
        case "900472":
          return "LOS COROZOS";
        case "900443":
          return "LAS CANAS";
        case "900354":
          return "MORQUECHO";
        case "900335":
          return "Buen Pastor";
        case "900362":
          return "TOMAS DESIR LEBRON";
        case "900379":
          return "VILLA CARMEN";
        case "900470":
          return "La Cueva";
        case "900558":
          return "HATO VIEJO ";
        case "900435":
          return "JAIBON";
        case "900275":
          return "YAGUITA PASTOR";
        case "900311":
          return "Consultorio Universidad Nordestana";
        case "900479":
          return "RANCHO VIEJO";
        case "900171":
          return "BIENVENIDO";
        case "900104":
          return "SABANA DE LOS JAVIELES";
        case "900334":
          return "BARRIO MEXICO";
        case "900133":
          return "Doâ€“a Ana";
        case "900424":
          return "EL VIJADOR";
        case "900624":
          return "LA CIENAGA OESTE";
        case "900066":
          return "CPN RAMAL";
        case "900280":
          return "CAAMAÃ‘O";
        case "900063":
          return "FUNDACION PABLITO";
        case "900391":
          return "HATO DEL PADRE";
        case "900513":
          return "MERCEDITO VIZCAINO";
        case "900074":
          return "MENDOZA";
        case "900450":
          return "BARRANCA";
        case "900363":
          return "VILLA CERROS";
        case "900533":
          return "LA MAJAGUA ";
        case "900372":
          return "CLINICA EL ROSARIO";
        case "900454":
          return "LAS CARMELITAS";
        case "900625":
          return "EL PINITO";
        case "900609":
          return "SAN LAZARO ";
        case "900474":
          return "PADRE ADOLFO CASADO";
        case "900145":
          return "MADRE VIEJA NORTE";
        case "900098":
          return "LA LUISA PRIETA";
        case "900448":
          return "Caâ€“o Piedra";
        case "900252":
          return "LAS FLORES";
        case "900344":
          return "FUNDACION JOSE MARIA";
        case "900453":
          return "Caballero";
        case "900497":
          return "LA JOYA";
        case "900577":
          return "ENRIQUILLO";
        case "900487":
          return "BOCA CHICA 2";
        case "900538":
          return "NUEVA ESPERANZA ";
        case "900193":
          return "EL DIAZ PIÃ‘EIRO";
        case "900550":
          return "PARCELEROS SAN CRISTOBAL";
        case "900336":
          return "CENTRO COMUNAL";
        case "900500":
          return "DOÃ‘A ANA ";
        case "900323":
          return "Los Aguayos";
        case "900388":
          return "CORBANO NORTE";
        case "900494":
          return "PUEBLO NUEVO SAN CRISTOBAL";
        case "900552":
          return "CLINICA RURAL SABANA LARGA DE OCOA ";
        case "900319":
          return "La Majagua";
        case "900614":
          return "ZAMBRANA";
        case "900087":
          return "IGLESIA VIDA EN CRISTO";
        case "900134":
          return "EL LIMONAL";
        case "900241":
          return "HOYA DEL CAIMITO";
        case "900618":
          return "BARRIO 27 DE FEBRERO";
        case "900231":
          return "CPN JOSUE";
        case "900172":
          return "CABALLONA";
        case "900214":
          return "SANTA ROSA";
        case "900587":
          return "LAS GUARANAS";
        case "900103":
          return "GREGORIO LUPERON";
        case "900570":
          return "LOS LIMONES DEL FACTOR";
        case "900325":
          return "MATA BONITA";
        case "900246":
          return "KOREA";
        case "900056":
          return "FRAILES II";
        case "900496":
          return "FUNBIDE";
        case "900381":
          return "PRADO COLONIAL";
        case "900080":
          return "MONTE ADENTRO (BOCA CHICA)";
        case "900099":
          return "MAJAGUAL";
        case "900403":
          return "VALENTIN SALINERO";
        case "900174":
          return "Barrio Duarte";
        case "900321":
          return "LAS GUARANAS";
        case "900242":
          return "HOYO BARTOLA";
        case "900412":
          return "SAN ANTONIO";
        case "900205":
          return "LOS CASABES";
        case "900298":
          return "PALO ALTO";
        case "900592":
          return "EL DIQUE GUALEY ";
        case "900019":
          return "SAN PEDRO APOSTOL";
        case "900338":
          return "CPN PEDRO JUSTO CARRION";
        case "900160":
          return "SALUD MENTAL";
        case "900069":
          return "'-";
        case "900009":
          return "ESMERALDO DIAZ";
        case "900370":
          return "YERBA BUENA";
        case "900128":
          return "CEPAE";
        case "900191":
          return "DE LAS MANOS DE JESUS";
        case "900613":
          return "VILLA LIBERACIÃ“N";
        case "900373":
          return "CPN BARRANCA";
        case "900432":
          return "LAS ESPINAS";
        case "900491":
          return "CPN CANASTICA";
        case "900304":
          return "SAVICA";
        case "900124":
          return "PAJARITO";
        case "900148":
          return "MATA NARANJO";
        case "900415":
          return "BARRIO LUPERON";
        case "900456":
          return "COMEDERO ARRIBA";
        case "900318":
          return "HOYO DE JAYA";
        case "900365":
          return "VILLA HERMOSA III";
        case "900014":
          return "ZONA B";
        case "900347":
          return "HOSPITAL CATOLICO CORAZON DE JESUS";
        case "900182":
          return "PALAVE";
        case "900196":
          return "FUNDACION DOCTOR DURAN";
        case "900189":
          return "JUAN PABLO SEGUNDO";
        case "900619":
          return "PINITO SABANETA";
        case "900192":
          return "DIOS HABLA";
        case "900094":
          return "LOS BOTADOS";
        case "900374":
          return "LOS TRANSFORMADORES";
        case "900217":
          return "VILLA CARMELA";
        case "900364":
          return "VILLA HERMOSA I II";
        case "900477":
          return "PONTON";
        case "900176":
          return "EL LIBERTADOR DE HERRERA";
        case "900400":
          return "LAS CHARCAS DE GARABITOS";
        case "900079":
          return "BOCA CHICA II";
        case "900421":
          return "DAMAJAGUA";
        case "900270":
          return "SAN NICOLAS";
        case "900615":
          return "LOS COCOS ";
        case "900149":
          return "Mercadito Vizcaino";
        case "900387":
          return "Clinica Rural Las Charcas";
        case "900164":
          return "VENDAÃ‘O";
        case "900518":
          return "LA PICHINGA";
        case "900434":
          return "LOMA DE CATAÃ‘UELAS";
        case "900565":
          return "EL RUBIO";
        case "900617":
          return "LOS QUEMADOS.";
        case "900032":
          return "SAN CARLOS";
        case "900163":
          return "UNAP Rio Arriba";
        case "900462":
          return "EL PINO";
        case "900031":
          return "SAN JUAN BAUTISTA";
        case "900322":
          return "LAS TARANAS";
        case "900581":
          return "EL MAMON GUERRA";
        case "900112":
          return "JUNTA DE VECINO ADRIAN MARTINEZ";
        case "900473":
          return "OCTAVIA GAUTIER DE VIDAL";
        case "900194":
          return "EL PEDREGAL";
        case "900528":
          return "LOS LIMONES DE VILLA TAPIA ";
        case "900283":
          return "CRISTOBAL";
        case "900571":
          return "LOS COROZOS";
        case "900222":
          return "BOCA FERREA";
        case "900035":
          return "SOCIEDAD PARA EL DESARROLLO DEL CALICHE (SODECA)";
        case "900059":
          return "EL DIQUE";
        case "900028":
          return "SAN RAFAEL";
        case "900116":
          return "BASIMA";
        case "900420":
          return "CPN SANTA BARBARA";
        case "900544":
          return "FUNDACION PERAVIA";
        case "900118":
          return "Canastica";
        case "900389":
          return "LA RANCHA";
        case "900227":
          return "CAIMITO DE JANICO";
        case "900576":
          return "LA CEIBA DE MADERA ";
        case "900060":
          return "FUNDACION DE ENVEJECIENTE ARI";
        case "900029":
          return "DISPENSARIO MEDICO MARIA AUXILIADORA";
        case "900346":
          return "GUAYACANES";
        case "900123":
          return "MONTAÃ‘O";
        case "900543":
          return "CENTRO COMUNAL LOS PINOS ";
        case "900279":
          return "BAITOITA";
        case "900294":
          return "MELLA";
        case "900017":
          return "VALENTIN BUTTEN";
        case "900539":
          return "SAN BARTOLO";
        case "900622":
          return "CPN MIRACIELO (SAN CRISTOBAL)";
        case "900461":
          return "EL LIMONCITO";
        case "900439":
          return "LOS ARROCES";
        case "900600":
          return "SABANETA ";
        case "900281":
          return "CANOA";
        case "900082":
          return "VILLA LIBERACION";
        case "900463":
          return "EL RANCHITO";
        case "900438":
          return "BACUI";
        case "900503":
          return "EL CAIMITO";
        case "900199":
          return "FUNDACION SIEMBRA Y COSECHA";
        case "900005":
          return "CALICHE DE LOS RIOS";
        case "900291":
          return "LAS SALINAS";
        case "900105":
          return "CENTRO DIGNOSTICO DON JUAN";
        case "900277":
          return "30 DE MAYO";
        case "900541":
          return "CONSULTORIO UNIVERSIDAD NORDE NORDESTANA";
        case "900512":
          return "PARAISO DE DIOS ";
        case "900038":
          return "JUNTA DE VECINOS LOS PERALEJOS";
        case "900375":
          return "SABANA YEGUA";
        case "900051":
          return "ALDEAS INFANTILES";
        case "900549":
          return "SUBCENTRO DE ATENCION PRIMARIA ALCARRIZOS I";
        case "900071":
          return "CABRETO";
        case "900377":
          return "VILLA ESPERANZA I & II";
        case "900307":
          return "VILLA JARAGUA";
        case "900234":
          return "ESCALERETA";
        case "900100":
          return "SAN ANTONIO";
        case "900026":
          return " CLUB LEONIDAS SOLANO";
        case "900564":
          return "EL SAMAN";
        case "900312":
          return "LA LOMETA";
        case "900398":
          return "PEDRO CORTO";
        case "900045":
          return "CTU";
        case "900396":
          return "LAS CHARCAS DE AZUA";
        case "900407":
          return "Enrriquillo";
        case "900535":
          return "SIERRA PRIETA";
        case "900444":
          return "Pescozon";
        case "900132":
          return "CPN Pajarito";
        case "900455":
          return "Comedero abajo";
        case "900582":
          return "FUNDC. NAC. Y SOC. PARA ENVEJECIENTES ";
        case "900345":
          return "GOUTIER";
        case "900207":
          return "Los Corozos";
        case "900058":
          return "Frailes I";
        case "900236":
          return "FELIX TEJADA";
        case "900561":
          return "SAN FRANCISCO ";
        case "900266":
          return "PALMARITO LOS COCOS";
        case "900288":
          return "LA GUAZARA";
        case "900554":
          return "NAJAYO ARRIBA ";
        case "900555":
          return "PUEBLO NUEVO ";
        case "900111":
          return "SABANA TORO";
        case "900285":
          return "INVI CEA";
        case "900204":
          return "La Union";
        case "900215":
          return "SUBCENTRO DE ATENCION PRIMARIA ALCARRIZOS II";
        case "900620":
          return "YACOT";
        case "900520":
          return "JIMA ARRIBA";
        case "900594":
          return "POSTRER RIO";
        case "900021":
          return "FUNDACION DIVINA PROVIDENCIA";
        case "900451":
          return "BAYACANES";
        case "900399":
          return "QUIJA QUIETA";
        case "900306":
          return "VILLA ESTELA";
        case "900341":
          return "EL BUEN PASTOR";
        case "900271":
          return "SANTA LUCIA";
        case "900130":
          return "CLINICA RURAL LOS YAGUARIZOS";
        case "900484":
          return "VILLA LA MATA";
        case "900257":
          return "LOS MARTIRES";
        case "900560":
          return "CAYACOA LOS LLANOS ";
        case "900390":
          return "CORBANO SUR II";
        case "900436":
          return "VILLA ELISA";
        case "900411":
          return "PILOTO";
        case "900127":
          return "CENTRO RAMONA SANTANA DE LLUBERES";
        case "900289":
          return "LA PEÃ‘UELA";
        case "900393":
          return "JINOVA";
        case "900249":
          return "LA GLORIA";
        case "900264":
          return "PADRE GRANERO";
        case "900361":
          return "SANTA CLARA";
        case "900110":
          return "FUNDACION YAGUATE AVANZA";
        case "900269":
          return "San Jose";
        case "900557":
          return "NUEVA ISABELA ";
        case "900578":
          return "EL SILENCIO ";
        case "900168":
          return "Alacarrizo I";
        case "900144":
          return "LOS RANCHITOS";
        case "900366":
          return "VILLA HERMOSA IV";
        case "900339":
          return "CPN VILLA GUERRERO";
        case "900598":
          return "LA TORRE";
        case "900068":
          return "SAN ISIDRO";
        case "900329":
          return "URBANO VILLA TAPIA";
        case "900106":
          return "Hato San Pedro";
        case "900296":
          return "PALMITO";
        case "900475":
          return "Piâ€“a Vieja";
        case "900358":
          return "PORVENIR";
        case "900324":
          return "LAS YAYALES";
        case "900348":
          return "INGENIO SANTA FE";
        case "900590":
          return "LA PLAYA ";
        case "900041":
          return "PALMA REAL";
        case "900465":
          return "JIMA ABAJO";
        case "900210":
          return "MINISTERIO DE JESUS DE NAZARET";
        case "900001":
          return "30 DE MAYO";
        case "900295":
          return "PALMARITO";
        case "900061":
          return "FUNDACION VILLA FARO";
        case "900052":
          return "CANCINO ADENTRO";
        case "900466":
          return "JIMAYACO";
        case "900136":
          return "ESTEBANIA BORINQUE";
        case "900219":
          return "BALAGUER";
        case "900065":
          return "FRAILES III";
        case "900521":
          return "PIÃ‘A VIEJA";
        case "900315":
          return "EL CAIMITO";
        case "900567":
          return "PONTON ";
        case "900562":
          return "PUEBLO NUEVO";
        case "900011":
          return "OSCAR SANTANA";
        case "900359":
          return "PUNTA DE GARZA";
        case "900233":
          return "ENSANCHE BERMUDEZ";
        case "900326":
          return "MATANCITA";
        case "900278":
          return "FUNDACION";
        case "900380":
          return "SABANA ALTA";
        case "900201":
          return "GUANUMA";
        case "900349":
          return "JAPON";
        case "900NaN":
          return "'-";
        case "900599":
          return "LOS QUEMADOS";
        case "900608":
          return "SAN JOSE AFUERA ";
        case "900498":
          return "KM 10 LA ROMANA";
        case "900378":
          return "SAN FRANCISCO";
        case "900206":
          return "LOS COCOS";
        case "900305":
          return "VICENTE NOBLE 1,2,5";
        case "900238":
          return "GREGORIO LUPERON";
        case "900153":
          return "OJO DE AGUA";
        case "900515":
          return "LA CIENAGA";
        case "900369":
          return "VILLA ORTEGA";
        case "900186":
          return "COMUNAL LAS PALMAS";
        case "900253":
          return "LAS LAGUNAS";
        case "900572":
          return "LA CUEVA DE CEVICOS";
        case "900126":
          return "NIVEL VENDANO";
        case "900044":
          return "La agustina";
        case "900195":
          return "LA ESTANCIA NUEVA";
        case "900022":
          return "FUNDAZURZA";
        case "900413":
          return "BALDEMIRO CABRERA";
        case "900286":
          return "JAQUIMEYES";
        case "900529":
          return "'-";
        case "900121":
          return "5TO CENTENARIO";
        case "900542":
          return "CERCA";
        case "900142":
          return "LAS FLORES";

        default:
          return "";
      }
    },

    async loadEvaluacions() {
      this.$store.state.user.desde = this.criterio.desde;
      // this.criterio.id_centerKit = this.$store.state.user.id_center;
      // this.criterio.id_centerKit = "303"
      // if (this.criterio.desde && this.criterio.id_centerKit) {
      if (this.criterio.desde) {
        this.toggleLoading();
        try {
          const res = await getManyByDateOnly(this.criterio.desde);
          this.evaluacions = res.data.response.Items;
          this.evaluacionsFiltradas = res.data.response.Items;
        } catch (error) {
          console.error(error);
        }

        // this.filterBySupervisor();

        // this.calKits();
        this.toggleLoading();
      }
    },
    //   Dashboard(embeddedURL: any) {
    //   var containerDiv = document.getElementById("dashboardContainer");
    //   var options = {
    //     url: embeddedURL,
    //     container: containerDiv,
    //     scrolling: "yes",
    //     height: "850px",
    //     width: "100%"
    //   };
    //   this.dashboard = QuicksightEmbedding.embedDashboard(options);
    // }

    async GetDashboardURL() {
      const url = await getDash();
      alert(url);
    },
    getCx(index: any) {
      return this.$store.state.user.valores2[index];
    },

    getImg() {
      let cedulaAfiliadoActual = this.$store.state.user.defaultStatus[0].cedula;
      let urlPartOne = cedulaAfiliadoActual.slice(0, 3);
      let urlPartTwo = cedulaAfiliadoActual.slice(4, 6);
      let urlPartThree = cedulaAfiliadoActual.slice(6, 8);
      this.imageUrl = `http://www.arssenasa.gov.do/Sistemas/afiliacion/fotos/${urlPartOne}/${urlPartTwo}/${urlPartThree}/${cedulaAfiliadoActual}.jpg`;
    },

    formatDatePlus(dateValue: Date) {
      let out = moment(dateValue).add(30, "days");
      return moment(out).format("D/MM/yyyy");
    },

    formatDate(dateValue: Date) {
      let out = moment(dateValue).add(0, "days");
      return moment(out).format("D/MM/yyyy");
    },

    numeroAFecha(numeroDeDias: any, esExcel = false) {
      var diasDesde1900 = esExcel ? 25567 + 1 : 25567 + 2;

      // 86400 es el número de segundos en un día, luego multiplicamos por 1000 para obtener milisegundos.
      return new Date((numeroDeDias - diasDesde1900) * 86400 * 1000);
    },

    formatTable(dif: number) {
      if (dif < 0) {
        return "der red";
      } else {
        return "der green";
      }
    },

    getMonth(month: number) {
      switch (month) {
        case 1:
          return "Enero";
        case 2:
          return "Febrero";
        case 3:
          return "Marzo";
        case 4:
          return "Abril";
        case 5:
          return "Mayo";
        case 6:
          return "Junio";
        case 7:
          return "Julio";
        case 8:
          return "Agosto";
        case 9:
          return "Septiembre";
        case 10:
          return "Octubre";
        case 11:
          return "Noviembre";
        case 12:
          return "Diciembre";

        default:
          return "Error";
      }
    },
    getARS(id_ars: string) {
      switch (id_ars) {
        case "5":
          return "ARS CMD";
        case "14":
          return "MAPFRE SALUD ARS, S.A.";
        case "8":
          return "FUTURO";
        case "12":
          return "META SALUD";
        case "23":
          return "YUNEN";
        case "17":
          return "RESERVAS";
        case "13":
          return "MONUMENTAL";
        case "4":
          return "ASEMAP";
        case "1":
          return "ARS APS S A";
        case "21":
          return "SIMAG";
        case "16":
          return "RENACER";
        case "59":
          return "GRUPO MEDICO ASOCIADO";
        case "9":
          return "GRUPO MEDICO ASOCIADO";
        case "24":
          return "PRIMERA  ARS DE HUMANO";
        case "22":
          return "UNIVERSAL";
        case "29":
          return "ALBA GAS S.R.L.";
        case "10":
          return "HUMANO SEGUROS";
        case "20":
          return "SENASA CONTRIBUTIVO";
        case "61":
          return "SENASA SUBSIDIADO";
        case "18":
          return "SEMMA";
        case "65":
          return "IDOPPRIL";
        default:
          return "ARS Descripcion";
      }
    },

    toColor(type: string) {
      if (type == "1 - Recibido por Auditoría Interna") {
        return "valor1";
      } else if (type == "2 - Verificado por Auditoría Interna") {
        return "valor2";
      } else if (type == "3 - Verificado por Auditoría Externa") {
        return "valor3";
      } else if (type == "4 - Recibido por Reclamaciones Médicas") {
        return "valor4";
      } else if (type == "5 - Verificado por Reclamaciones Médicas") {
        return "valor5";
      } else if (type == "6 - Cargado a Lote") {
        return "valor6";
      } else if (type == "7 - Enviado a la Aseguradora") {
        return "valor7";
      } else if (type == "Todos") {
        return "Todos";
      }
    },

    valorTotal() {
      this.totales.dias = this.dias.length;
      this.totales.cantProductos = this.dias.reduce(
        (accum: any, item: any) => accum + item.count,
        0
      );

      // this.totales.count = this.periodos.reduce(
      //   (accum: any, item: any) => accum + item.count,
      //   0
      // );
      // this.totales.cobertura = this.periodos.reduce(
      //   (accum: any, item: any) => accum + item.cobertura,
      //   0
      // );
      // this.totales.facturas = this.facturasCant.reduce(
      //   (accum: any, item: any) => accum + item.count,
      //   0
      // );
      // this.totales.facturas2 = this.factsGpedByCli.reduce(
      //   (accum: any, item: any) => accum + item.count,
      //   0
      // );
      // this.totales.cobertura2 = this.factsGpedByCli.reduce(
      //   (accum: any, item: any) => accum + item.cobertura,
      //   0
      // );
      // this.totales.cantClientes = this.factsGpedByCli.length;
    },

    pusherSubscribe() {
      // Start pusher subscribe
      var pusher = new Pusher("f2c972e55a9c9eac5f9a", {
        cluster: "us2",
      });

      var channel = pusher.subscribe("my-channel");
      channel.bind("my-event", (data: any) => {
        this.loadfacturasCant2();
        this.loadfactsGpedByCli2();
        // this.player.src = this.song.src;
        // this.player.play();
      });
      // End pusher subscribe
    },

    toggleLoading() {
      this.cargando = !this.cargando;
    },

    formatNumerInteger(value: number, decimal: boolean) {
      if (decimal == true) {
        return numeral(value).format("0");
      } else {
        return numeral(value).format("0");
      }
    },

    formatNumber(value: number, decimal: boolean) {
      if (decimal == true) {
        return numeral(value).format("0,0.00");
      } else {
        return numeral(value).format("0,0");
      }
    },

    formatNumberPcto(value: number, decimal: boolean) {
      if (decimal == true) {
        return numeral(value).format("0,0.00");
      } else {
        return numeral(value).format("0,0.00");
      }
    },

    async defineurlGciaSenasa() {
      try {
        const res = await getUrl2("ELDER_GERENCIA_SENASA_DASHBOARD");
        this.capurlGciaSenasa = res.data;
        this.myEmbedVisualGciaSenasa();
      } catch (error) {
        console.log(error);
      }
    },

    async defineurlGtorSenasa() {
      try {
        const res = await getUrl2("ELDER_GESTOR_SENASA_DASHBOARD");
        this.capurlGtorSenasa = res.data;
        this.myEmbedVisualGtorSenasa();
      } catch (error) {
        console.log(error);
      }
    },

    async defineurlGteOper() {
      try {
        const res = await getUrl2("ELDER_GERENTE_OPERACION_DASHBOARD");
        this.capurlGteOper = res.data;
        this.myEmbedVisualGteOper();
      } catch (error) {
        console.log(error);
      }
    },

    async defineurlAnalDats() {
      try {
        const res = await getUrl2("ELDER_REPORTE_DATA_DASHBOARD_ID");
        this.capurlAnalDats = res.data;
        this.myEmbedVisualAnalDats();
      } catch (error) {
        console.log(error);
      }
    },

    async defineurlAuxConvoc() {
      try {
        const res = await getUrl2("ELDER_CIERRE_DIARIO_AUTO_DASHBOARD_ID");
        this.capurlAuxConvoc = res.data;
        this.myEmbedVisualAuxConvoc();
      } catch (error) {
        console.log(error);
      }
    },

    async defineurl() {
      try {
        const res = await getUrl2("ELDER_MTRZ_GEN_AUTO_DASHBOARD_ID");
        this.capurl = res.data;
        this.myEmbedVisual();
      } catch (error) {
        console.log(error);
      }
    },

    myEmbedVisual() {
      const containerDiv = document.getElementById("embeddingContainer");
      const options = {
        url: this.capurl,
        container: containerDiv,
        height: "600px",
      };

      const embeddedDashboardExperience = embedDashboard(options);
      // let embeddedVisualExperience;
      // embeddedVisualExperience = QuickSightEmbedding.embedDashboard(options);

      // embeddedVisualExperience.on("error", onerror);
      embeddedDashboardExperience.on("load", embedVisual);
    },

    myEmbedVisualAnalDats() {
      const containerDiv = document.getElementById(
        "embeddingContainerAnalDats"
      );
      const options = {
        url: this.capurlAnalDats,
        container: containerDiv,
        height: "800px",
      };

      const embeddedDashboardExperience = embedDashboard(options);
      // let embeddedVisualExperience;
      // embeddedVisualExperience = QuickSightEmbedding.embedDashboard(options);

      // embeddedVisualExperience.on("error", onerror);
      embeddedDashboardExperience.on("load", embedVisual);
    },

    myEmbedVisualGciaSenasa() {
      const containerDiv = document.getElementById(
        "embeddingContainerGciaSenasa"
      );
      const options = {
        url: this.capurlGciaSenasa,
        container: containerDiv,
        height: "800px",
      };

      const embeddedDashboardExperience = embedDashboard(options);
      // let embeddedVisualExperience;
      // embeddedVisualExperience = QuickSightEmbedding.embedDashboard(options);

      // embeddedVisualExperience.on("error", onerror);
      embeddedDashboardExperience.on("load", embedVisual);
    },

    myEmbedVisualGtorSenasa() {
      const containerDiv = document.getElementById(
        "embeddingContainerGtorSenasa"
      );
      const options = {
        url: this.capurlGtorSenasa,
        container: containerDiv,
        height: "800px",
      };

      const embeddedDashboardExperience = embedDashboard(options);
      // let embeddedVisualExperience;
      // embeddedVisualExperience = QuickSightEmbedding.embedDashboard(options);

      // embeddedVisualExperience.on("error", onerror);
      embeddedDashboardExperience.on("load", embedVisual);
    },

    myEmbedVisualGteOper() {
      const containerDiv = document.getElementById("embeddingContainerGteOper");
      const options = {
        url: this.capurlGteOper,
        container: containerDiv,
        height: "800px",
      };

      const embeddedDashboardExperience = embedDashboard(options);
      // let embeddedVisualExperience;
      // embeddedVisualExperience = QuickSightEmbedding.embedDashboard(options);

      // embeddedVisualExperience.on("error", onerror);
      embeddedDashboardExperience.on("load", embedVisual);
    },

    myEmbedVisualAuxConvoc() {
      const containerDiv = document.getElementById(
        "embeddingContainerAuxConvoc"
      );
      const options = {
        url: this.capurlAuxConvoc,
        container: containerDiv,
        height: "800px",
      };

      const embeddedDashboardExperience = embedDashboard(options);
      // let embeddedVisualExperience;
      // embeddedVisualExperience = QuickSightEmbedding.embedDashboard(options);

      // embeddedVisualExperience.on("error", onerror);
      embeddedDashboardExperience.on("load", embedVisual);
    },
  },

  mounted() {
    if (this.$store.state.user.type == "Encargada de Facturación") {
      this.defineurl();
    }
    if (this.$store.state.user.type == "Auxiliar de Convocatoria") {
      this.defineurlAuxConvoc();
    }
    if (this.$store.state.user.type == "Analista de Datos") {
      this.defineurlAnalDats();
    }
    if (this.$store.state.user.type == "Gerente de Operaciones") {
      this.defineurlGteOper();
    }
    if (this.$store.state.user.type == "Gerencia ARS SeNaSa") {
      this.defineurlGciaSenasa();
    }
    if (this.$store.state.user.type == "Gestor ARS SeNaSa") {
      this.defineurlGtorSenasa();
    }
    this.$store.state.user.currentSupervisor = {
      nombre: this.$store.state.user.usuario,
    };
    if (this.$store.state.user.type == "Médico Nutricionista Domiciliario") {
      this.$store.state.user.supervisor = this.$store.state.user.usuario;
    }
  },
};
</script>

<style lang="css" scoped>
.bold {
  font-weight: bold;
}

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

.navbar-option:hover {
  color: rgb(160, 57, 149);
  font-size: 16px;
  font-weight: bold;
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
  grid-template-columns: repeat(auto-fill, minmax(12rem, 1fr));
}

.navbar-option {
  margin: 7px;
  font-size: 15px;
  /* color: white; */
  /* font-family: "Agency FB Bold"; */
  text-decoration: none;
  margin-right: 20px;
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
  /* overflow-x: scroll; */
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
</style>
