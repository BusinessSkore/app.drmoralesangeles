<template v-show="!cargando">
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
      <div v-show="!cargando" class="general">
        <div v-if="showModalMunicipios" class="modalMunicipios">
          <div class="contenedorMunicipios">
            <header>
              Seleccione el Municipio
            </header>
            <label @click="this.showModalMunicipioMethod()" for="btn-modal"
              >X</label
            >
            <div class="contenidoMunicipios">
              <div class="contenidoMunicipios">
                <div>
                  <input
                    id="search"
                    type="search"
                    v-model="search"
                    class="form-control"
                    placeholder="Introduzca el nombre del municipio"
                    @keypress="buscar()"
                  />
                </div>
                <div>
                  <table id="municipios">
                    <tr>
                      <th>MUNICIPIO</th>
                      <th>PROVINCIA</th>
                      <th>REGION</th>
                    </tr>
                    <tr
                      v-for="(municipio, index) in this.municipiosFiltrados"
                      :key="index"
                      @click="setMunicipio(municipio)"
                    >
                      <td>{{ municipio.municipio }}</td>
                      <td>{{ municipio.provincia }}</td>
                      <td>{{ municipio.region }}</td>
                    </tr>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
        <form>
          <fieldset>
            <h6 style="margin-top: 35px">{{ encabezado }}</h6>
            <label class="form-label"><b>Datos Generales</b></label>
            <div class="form-group">
              <div class="grid">
                <div>
                  <label
                    class="ta-l col-form-label col-form-label-sm"
                    for="unap"
                    >NOMBRE:</label
                  ><input
                    id="unap"
                    type="String"
                    v-model="centro.unap"
                    class="form-control"
                  />
                </div>
                <div>
                  <label
                    class="ta-l col-form-label col-form-label-sm"
                    for="municipio"
                    >MUNICIPIO:</label
                  ><input
                    id="municipio"
                    type="String"
                    v-model="centro.municipio"
                    class="form-control"
                    @focus="this.showModalMunicipioMethod()"
                  />
                </div>
                <div>
                  <label
                    class="ta-l col-form-label col-form-label-sm"
                    for="provincia"
                    >PROVINCIA:</label
                  ><input
                    disabled
                    id="provincia"
                    type="String"
                    v-model="centro.provincia"
                    class="form-control"
                  />
                </div>
                <div>
                  <label
                    class="ta-l col-form-label col-form-label-sm"
                    for="region"
                    >REGION:</label
                  ><input
                    disabled
                    id="region"
                    type="String"
                    v-model="centro.region"
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
                    type="String"
                    v-model="centro.telefono"
                    class="form-control"
                    @change="defTelefono()"
                  />
                </div>
              </div>
            </div>

            <button
              v-if="this.modoForm == 'add'"
              class="btn btn-primary"
              @click.prevent="createCentro(true)"
              :disabled="
                !centro.municipio ||
                  !centro.provincia ||
                  !centro.region ||
                  !centro.telefono ||
                  !centro.unap
              "
            >
              <i class="fas fa-save"></i> Guardar
            </button>

            <button
              v-if="this.modoForm == 'show'"
              class="btn btn-success"
              @click.prevent="createCentro(false)"
              :disabled="
                !centro.municipio ||
                  !centro.provincia ||
                  !centro.region ||
                  !centro.telefono ||
                  !centro.unap
              "
            >
              <i class="fas fa-save"></i> Actualizar
            </button>

            <button
              v-if="this.modoForm == 'show' &&
              this.centro.status == 'A'
              "
              class="btn btn-info"
              @click.prevent="ValidateCentro(false)"
              :disabled="
                !centro.municipio ||
                  !centro.provincia ||
                  !centro.region ||
                  !centro.telefono ||
                  !centro.unap
              "
            >
              <i class="fas fa-check"></i> Validar
            </button>
            <button
              v-if="showDelete"
              class="btn btn-info"
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
import { create } from "@/services/centro/Centro";
import { defineComponent } from "vue";
import { Centro } from "@/interfaces/Centro";
import numeral from "numeral";
import moment from "moment";

export default defineComponent({
  name: "centros-form",
  components: {
    Navbar,
  },
  data() {
    return {
      municipios: [
        {
          municipio: "DISTRITO NACIONAL ",
          provincia: "DISTRITO NACIONAL ",
          region: "REGION A (0)",
        },
        {
          municipio: "MONTE PLATA",
          provincia: "MONTE PLATA ",
          region: "REGION A (0)",
        },
        {
          municipio: "BAYAGUANA",
          provincia: "MONTE PLATA ",
          region: "REGION A (0)",
        },
        {
          municipio: "PERALVILLO",
          provincia: "MONTE PLATA ",
          region: "REGION A (0)",
        },
        {
          municipio: "YAMASA",
          provincia: "MONTE PLATA ",
          region: "REGION A (0)",
        },
        {
          municipio: "SABANA GRANDE DE BOYA",
          provincia: "MONTE PLATA ",
          region: "REGION A (0)",
        },
        {
          municipio: "SANTO DOMINGO NORTE",
          provincia: "SANTO DOMINGO DE GUZMÁN",
          region: "REGION A (0)",
        },
        {
          municipio: "SANTO DOMINGO ESTE",
          provincia: "SANTO DOMINGO DE GUZMÁN",
          region: "REGION A (0)",
        },
        {
          municipio: "SANTO DOMINGO OESTE",
          provincia: "SANTO DOMINGO DE GUZMÁN",
          region: "REGION A (0)",
        },
        {
          municipio: "LOS ALCARRIZOS",
          provincia: "SANTO DOMINGO DE GUZMÁN",
          region: "REGION A (0)",
        },
        {
          municipio: "PEDRO BRAND",
          provincia: "SANTO DOMINGO DE GUZMÁN",
          region: "REGION A (0)",
        },
        {
          municipio: "GUERRA",
          provincia: "SANTO DOMINGO DE GUZMÁN",
          region: "REGION A (0)",
        },
        {
          municipio: "BOCA CHICA ",
          provincia: "SANTO DOMINGO DE GUZMÁN",
          region: "REGION A (0)",
        },
        {
          municipio: "BANI",
          provincia: "PERAVIA",
          region: "REGION A (I)",
        },
        {
          municipio: "NIZAO",
          provincia: "PERAVIA",
          region: "REGION A (I)",
        },
        {
          municipio: "SAN CRISTOBAL",
          provincia: "SAN CRISTOBAL",
          region: "REGION A (I)",
        },
        {
          municipio: "SABANA GRANDE DE PALENQUE",
          provincia: "SAN CRISTOBAL",
          region: "REGION A (I)",
        },
        {
          municipio: "BAJOS DE HAINA",
          provincia: "SAN CRISTOBAL",
          region: "REGION A (I)",
        },
        {
          municipio: "GAMBITA GARABITOS",
          provincia: "SAN CRISTOBAL",
          region: "REGION A (I)",
        },
        {
          municipio: "VILLA ALTAGRACIA",
          provincia: "SAN CRISTOBAL",
          region: "REGION A (I)",
        },
        {
          municipio: "YAGUATE",
          provincia: "SAN CRISTOBAL",
          region: "REGION A (I)",
        },
        {
          municipio: "SAN GREGORIO DE NIGUA",
          provincia: "SAN CRISTOBAL",
          region: "REGION A (I)",
        },
        {
          municipio: "LOS CACAOS",
          provincia: "SAN CRISTOBAL",
          region: "REGION A (I)",
        },
        {
          municipio: "SAN JOSE DE OCOA",
          provincia: "SAN JOSE DE OCOA",
          region: "REGION A (I)",
        },
        {
          municipio: "RANCHO ARRIBA",
          provincia: "SAN JOSE DE OCOA",
          region: "REGION A (I)",
        },
        {
          municipio: "SABANA LARGA",
          provincia: "SAN JOSE DE OCOA",
          region: "REGION A (I)",
        },
        {
          municipio: "MOCA",
          provincia: "ESPALLIAT",
          region: "REGION B (II)",
        },
        {
          municipio: "CAYETANO GERMOSEN ",
          provincia: "ESPALLIAT",
          region: "REGION B (II)",
        },
        {
          municipio: "GASPAR HERNANDEZ",
          provincia: "ESPALLIAT",
          region: "REGION B (II)",
        },
        {
          municipio: "JAMAO AL NORTE ",
          provincia: "ESPALLIAT",
          region: "REGION B (II)",
        },
        {
          municipio: "SAN VICTOR",
          provincia: "ESPALLIAT",
          region: "REGION B (II)",
        },
        {
          municipio: "PUERTO PLATA ",
          provincia: "PUERTO PLATA",
          region: "REGION B (II)",
        },
        {
          municipio: "ALTAMIRA",
          provincia: "PUERTO PLATA",
          region: "REGION B (II)",
        },
        {
          municipio: "GUANANICO",
          provincia: "PUERTO PLATA",
          region: "REGION B (II)",
        },
        {
          municipio: "IMBERT",
          provincia: "PUERTO PLATA",
          region: "REGION B (II)",
        },
        {
          municipio: "LOS HIDALGOS ",
          provincia: "PUERTO PLATA",
          region: "REGION B (II)",
        },
        {
          municipio: "LUPERON ",
          provincia: "PUERTO PLATA",
          region: "REGION B (II)",
        },
        {
          municipio: "SOSUA ",
          provincia: "PUERTO PLATA",
          region: "REGION B (II)",
        },
        {
          municipio: "VILLA ISABELA",
          provincia: "PUERTO PLATA",
          region: "REGION B (II)",
        },
        {
          municipio: "VILLA MONTELLANO ",
          provincia: "PUERTO PLATA",
          region: "REGION B (II)",
        },
        {
          municipio: "SANTIAGO DE LOS CABALLEROS",
          provincia: "SANTIAGO",
          region: "REGION B (II)",
        },
        {
          municipio: "BAITOA",
          provincia: "SANTIAGO",
          region: "REGION B (II)",
        },
        {
          municipio: "HANICO",
          provincia: "SANTIAGO",
          region: "REGION B (II)",
        },
        {
          municipio: "LICEY AL MEDIO ",
          provincia: "SANTIAGO",
          region: "REGION B (II)",
        },
        {
          municipio: "PUNAL ",
          provincia: "SANTIAGO",
          region: "REGION B (II)",
        },
        {
          municipio: "SABAN IGLESIAS",
          provincia: "SANTIAGO",
          region: "REGION B (II)",
        },
        {
          municipio: "SAN JOSE DE LAS MATAS",
          provincia: "SANTIAGO",
          region: "REGION B (II)",
        },
        {
          municipio: "TAMBORIL ",
          provincia: "SANTIAGO",
          region: "REGION B (II)",
        },
        {
          municipio: "VILLA BISONO ",
          provincia: "SANTIAGO",
          region: "REGION B (II)",
        },
        {
          municipio: "VILLA GONZALES",
          provincia: "SANTIAGO",
          region: "REGION B (II)",
        },
        {
          municipio: "SAN FRANCISCO DE MACORIS",
          provincia: "DUARTE",
          region: "REGION C (III)",
        },
        {
          municipio: "ARENOSO ",
          provincia: "DUARTE",
          region: "REGION C (III)",
        },
        {
          municipio: "CASTILLO",
          provincia: "DUARTE",
          region: "REGION C (III)",
        },
        {
          municipio: "HOSTOS",
          provincia: "DUARTE",
          region: "REGION C (III)",
        },
        {
          municipio: "LAS GUARANAS",
          provincia: "DUARTE",
          region: "REGION C (III)",
        },
        {
          municipio: "PIMENTEL ",
          provincia: "DUARTE",
          region: "REGION C (III)",
        },
        {
          municipio: "VILLA ARRIBA",
          provincia: "DUARTE",
          region: "REGION C (III)",
        },
        {
          municipio: "SALCEDO",
          provincia: "HERMANAS MIRABAL",
          region: "REGION C (III)",
        },
        {
          municipio: "TENARES",
          provincia: "HERMANAS MIRABAL",
          region: "REGION C (III)",
        },
        {
          municipio: "VILLA TAPIA",
          provincia: "HERMANAS MIRABAL",
          region: "REGION C (III)",
        },
        {
          municipio: "NAGUA",
          provincia: "MARIA TRINIDAD SANCHEZ",
          region: "REGION C (III)",
        },
        {
          municipio: "CABRERA",
          provincia: "MARIA TRINIDAD SANCHEZ",
          region: "REGION C (III)",
        },
        {
          municipio: "EL FACTOR ",
          provincia: "MARIA TRINIDAD SANCHEZ",
          region: "REGION C (III)",
        },
        {
          municipio: "RIO SAN JUAN",
          provincia: "MARIA TRINIDAD SANCHEZ",
          region: "REGION C (III)",
        },
        {
          municipio: "SAMANA",
          provincia: "SAMANA ",
          region: "REGION C (III)",
        },
        {
          municipio: "LAS TERRENAS",
          provincia: "SAMANA ",
          region: "REGION C (III)",
        },
        {
          municipio: "SANCHEZ",
          provincia: "SAMANA ",
          region: "REGION C (III)",
        },
        {
          municipio: "NEIBA",
          provincia: "BAHORUCO",
          region: "REGION D (IV)",
        },
        {
          municipio: "GALVAN",
          provincia: "BAHORUCO",
          region: "REGION D (IV)",
        },
        {
          municipio: "LOS RIOS ",
          provincia: "BAHORUCO",
          region: "REGION D (IV)",
        },
        {
          municipio: "TAMAYO ",
          provincia: "BAHORUCO",
          region: "REGION D (IV)",
        },
        {
          municipio: "VILLA JARAGUA",
          provincia: "BAHORUCO",
          region: "REGION D (IV)",
        },
        {
          municipio: "BARAHONA",
          provincia: "BARAHONA",
          region: "REGION D (IV)",
        },
        {
          municipio: "CABRAL ",
          provincia: "BARAHONA",
          region: "REGION D (IV)",
        },
        {
          municipio: "EL PENON ",
          provincia: "BARAHONA",
          region: "REGION D (IV)",
        },
        {
          municipio: "ENRIQUILLO",
          provincia: "BARAHONA",
          region: "REGION D (IV)",
        },
        {
          municipio: "FUNDACION",
          provincia: "BARAHONA",
          region: "REGION D (IV)",
        },
        {
          municipio: "JAQUIMEYES",
          provincia: "BARAHONA",
          region: "REGION D (IV)",
        },
        {
          municipio: "LA CIENAGA",
          provincia: "BARAHONA",
          region: "REGION D (IV)",
        },
        {
          municipio: "LAS SALINAS",
          provincia: "BARAHONA",
          region: "REGION D (IV)",
        },
        {
          municipio: "PARAISO ",
          provincia: "BARAHONA",
          region: "REGION D (IV)",
        },
        {
          municipio: "POLO ",
          provincia: "BARAHONA",
          region: "REGION D (IV)",
        },
        {
          municipio: "VICENTE NOBLE",
          provincia: "BARAHONA",
          region: "REGION D (IV)",
        },
        {
          municipio: "COMENDADOR ",
          provincia: "ELIAS PINA ",
          region: "REGION D (IV)",
        },
        {
          municipio: "BANICA",
          provincia: "ELIAS PINA ",
          region: "REGION D (IV)",
        },
        {
          municipio: "EL LLANO ",
          provincia: "ELIAS PINA ",
          region: "REGION D (IV)",
        },
        {
          municipio: "HONDO VALLE",
          provincia: "ELIAS PINA ",
          region: "REGION D (IV)",
        },
        {
          municipio: "JUAN SANTIAGO ",
          provincia: "ELIAS PINA ",
          region: "REGION D (IV)",
        },
        {
          municipio: "PEDRO SANTANA",
          provincia: "ELIAS PINA ",
          region: "REGION D (IV)",
        },
        {
          municipio: "JIMANI",
          provincia: "INDEPENDENCIA",
          region: "REGION D (IV)",
        },
        {
          municipio: "CRISTOBAL",
          provincia: "INDEPENDENCIA",
          region: "REGION D (IV)",
        },
        {
          municipio: "DUVERGE",
          provincia: "INDEPENDENCIA",
          region: "REGION D (IV)",
        },
        {
          municipio: "LA DESCUBIERTA",
          provincia: "INDEPENDENCIA",
          region: "REGION D (IV)",
        },
        {
          municipio: "MELLA",
          provincia: "INDEPENDENCIA",
          region: "REGION D (IV)",
        },
        {
          municipio: "POSTRER RIO ",
          provincia: "INDEPENDENCIA",
          region: "REGION D (IV)",
        },
        {
          municipio: "SANTA CRUZ DE EL SEIBO ",
          provincia: "EL SEIBO ",
          region: "REGION E (V)",
        },
        {
          municipio: "MICHES",
          provincia: "EL SEIBO ",
          region: "REGION E (V)",
        },
        {
          municipio: "HATO MAYOR DEL REY",
          provincia: "HATO MAYOR ",
          region: "REGION E (V)",
        },
        {
          municipio: "EL VALLE",
          provincia: "HATO MAYOR ",
          region: "REGION E (V)",
        },
        {
          municipio: "SABANA DE LA MAR",
          provincia: "HATO MAYOR ",
          region: "REGION E (V)",
        },
        {
          municipio: "HIGUEY",
          provincia: "LA ALTAGRACIA",
          region: "REGION E (V)",
        },
        {
          municipio: "SAN RAFAEL DE YUMA",
          provincia: "LA ALTAGRACIA",
          region: "REGION E (V)",
        },
        {
          municipio: "LA ROMANA",
          provincia: "LA ROMANA ",
          region: "REGION E (V)",
        },
        {
          municipio: "GUAYMATE",
          provincia: "LA ROMANA ",
          region: "REGION E (V)",
        },
        {
          municipio: "VILLA HERMOSA",
          provincia: "LA ROMANA ",
          region: "REGION E (V)",
        },
        {
          municipio: "SAN PEDRO DE MACORIS",
          provincia: "SAN PEDRO DE MACORIS",
          region: "REGION E (V)",
        },
        {
          municipio: "CONSUELO ",
          provincia: "SAN PEDRO DE MACORIS",
          region: "REGION E (V)",
        },
        {
          municipio: "GUAYACANES",
          provincia: "SAN PEDRO DE MACORIS",
          region: "REGION E (V)",
        },
        {
          municipio: "QUISQUEYA",
          provincia: "SAN PEDRO DE MACORIS",
          region: "REGION E (V)",
        },
        {
          municipio: "RAMON SANTANA",
          provincia: "SAN PEDRO DE MACORIS",
          region: "REGION E (V)",
        },
        {
          municipio: "SAN JOSE DE LOS LLANOS",
          provincia: "SAN PEDRO DE MACORIS",
          region: "REGION E (V)",
        },
        {
          municipio: "AZUA DE COMPOSTELA ",
          provincia: "AZUA",
          region: "REGION F (VI)",
        },
        {
          municipio: "ESTEBANIA",
          provincia: "AZUA",
          region: "REGION F (VI)",
        },
        {
          municipio: "GUAYABAL",
          provincia: "AZUA",
          region: "REGION F (VI)",
        },
        {
          municipio: "LAS CHARCAS",
          provincia: "AZUA",
          region: "REGION F (VI)",
        },
        {
          municipio: "LAS YAYAS DE VIAJAMA",
          provincia: "AZUA",
          region: "REGION F (VI)",
        },
        {
          municipio: "PADRE DE LAS CASAS",
          provincia: "AZUA",
          region: "REGION F (VI)",
        },
        {
          municipio: "PERALTA",
          provincia: "AZUA",
          region: "REGION F (VI)",
        },
        {
          municipio: "PUEBLO VIEJO ",
          provincia: "AZUA",
          region: "REGION F (VI)",
        },
        {
          municipio: "SABANA YEGUA ",
          provincia: "AZUA",
          region: "REGION F (VI)",
        },
        {
          municipio: "TABARA ARRIBA",
          provincia: "AZUA",
          region: "REGION F (VI)",
        },
        {
          municipio: "SAN JUAN DE LA MAGUANA",
          provincia: "SAN JUAN ",
          region: "REGION F (VI)",
        },
        {
          municipio: "BOECHIO",
          provincia: "SAN JUAN ",
          region: "REGION F (VI)",
        },
        {
          municipio: "EL CERCADO ",
          provincia: "SAN JUAN ",
          region: "REGION F (VI)",
        },
        {
          municipio: "JUAN DE HERRERA",
          provincia: "SAN JUAN ",
          region: "REGION F (VI)",
        },
        {
          municipio: "LAS MATAS DE FARFAN ",
          provincia: "SAN JUAN ",
          region: "REGION F (VI)",
        },
        {
          municipio: "VALLEJUELO ",
          provincia: "SAN JUAN ",
          region: "REGION F (VI)",
        },
        {
          municipio: "PEDERNALES ",
          provincia: "PEDERNALES ",
          region: "REGION F (VI)",
        },
        {
          municipio: "OVIEDO ",
          provincia: "PEDERNALES ",
          region: "REGION F (VI)",
        },
        {
          municipio: "DAJABON",
          provincia: "DAJABON",
          region: "REGION G (VII)",
        },
        {
          municipio: "EL PINO ",
          provincia: "DAJABON",
          region: "REGION G (VII)",
        },
        {
          municipio: "LOMA DE CABRERA",
          provincia: "DAJABON",
          region: "REGION G (VII)",
        },
        {
          municipio: "PARTIDO",
          provincia: "DAJABON",
          region: "REGION G (VII)",
        },
        {
          municipio: "RESTAURACION ",
          provincia: "DAJABON",
          region: "REGION G (VII)",
        },
        {
          municipio: "MONTE CRISTI ",
          provincia: "MONTE CRISTI ",
          region: "REGION G (VII)",
        },
        {
          municipio: "CASTANUELA",
          provincia: "MONTE CRISTI ",
          region: "REGION G (VII)",
        },
        {
          municipio: "GUAYUBIN ",
          provincia: "MONTE CRISTI ",
          region: "REGION G (VII)",
        },
        {
          municipio: "LAS MATAS DE SANTA CRUZ",
          provincia: "MONTE CRISTI ",
          region: "REGION G (VII)",
        },
        {
          municipio: "PEPILLO SALCEDO ",
          provincia: "MONTE CRISTI ",
          region: "REGION G (VII)",
        },
        {
          municipio: "VILLA VASQUEZ",
          provincia: "MONTE CRISTI ",
          region: "REGION G (VII)",
        },
        {
          municipio: "SAN IGNACIO DE SABANETA",
          provincia: "SANTIAGO RODRIGUEZ",
          region: "REGION G (VII)",
        },
        {
          municipio: "MONCION",
          provincia: "SANTIAGO RODRIGUEZ",
          region: "REGION G (VII)",
        },
        {
          municipio: "VILLA LOS ALMACIGOS",
          provincia: "SANTIAGO RODRIGUEZ",
          region: "REGION G (VII)",
        },
        {
          municipio: "MAO",
          provincia: "VALVERDE",
          region: "REGION G (VII)",
        },
        {
          municipio: "ESPERANZA",
          provincia: "VALVERDE",
          region: "REGION G (VII)",
        },
        {
          municipio: "LAGUNA SALADA",
          provincia: "VALVERDE",
          region: "REGION G (VII)",
        },
        {
          municipio: "LA VEGA",
          provincia: "LA VEGA",
          region: "REGION H (VIII)",
        },
        {
          municipio: "CONSTANZA",
          provincia: "LA VEGA",
          region: "REGION H (VIII)",
        },
        {
          municipio: "JARABACOA",
          provincia: "LA VEGA",
          region: "REGION H (VIII)",
        },
        {
          municipio: "JIMA ABAJO ",
          provincia: "LA VEGA",
          region: "REGION H (VIII)",
        },
        {
          municipio: "BONAO",
          provincia: "MONSENOR NOUEL",
          region: "REGION H (VIII)",
        },
        {
          municipio: "MAIMON ",
          provincia: "MONSENOR NOUEL",
          region: "REGION H (VIII)",
        },
        {
          municipio: "PIEDRA BLANCA",
          provincia: "MONSENOR NOUEL",
          region: "REGION H (VIII)",
        },
        {
          municipio: "COTUI",
          provincia: "SANCHEZ RAMIREZ",
          region: "REGION H (VIII)",
        },
        {
          municipio: "CEVICOS",
          provincia: "SANCHEZ RAMIREZ",
          region: "REGION H (VIII)",
        },
        {
          municipio: "FANTINO",
          provincia: "SANCHEZ RAMIREZ",
          region: "REGION H (VIII)",
        },
        {
          municipio: "LA MATA",
          provincia: "SANCHEZ RAMIREZ",
          region: "REGION H (VIII)",
        },
      ],
      municipiosFiltrados: [
        {
          municipio: "DISTRITO NACIONAL ",
          provincia: "DISTRITO NACIONAL ",
          region: "REGION A (0)",
        },
        {
          municipio: "MONTE PLATA",
          provincia: "MONTE PLATA ",
          region: "REGION A (0)",
        },
        {
          municipio: "BAYAGUANA",
          provincia: "MONTE PLATA ",
          region: "REGION A (0)",
        },
        {
          municipio: "PERALVILLO",
          provincia: "MONTE PLATA ",
          region: "REGION A (0)",
        },
        {
          municipio: "YAMASA",
          provincia: "MONTE PLATA ",
          region: "REGION A (0)",
        },
        {
          municipio: "SABANA GRANDE DE BOYA",
          provincia: "MONTE PLATA ",
          region: "REGION A (0)",
        },
        {
          municipio: "SANTO DOMINGO NORTE",
          provincia: "SANTO DOMINGO DE GUZMÁN",
          region: "REGION A (0)",
        },
        {
          municipio: "SANTO DOMINGO ESTE",
          provincia: "SANTO DOMINGO DE GUZMÁN",
          region: "REGION A (0)",
        },
        {
          municipio: "SANTO DOMINGO OESTE",
          provincia: "SANTO DOMINGO DE GUZMÁN",
          region: "REGION A (0)",
        },
        {
          municipio: "LOS ALCARRIZOS",
          provincia: "SANTO DOMINGO DE GUZMÁN",
          region: "REGION A (0)",
        },
        {
          municipio: "PEDRO BRAND",
          provincia: "SANTO DOMINGO DE GUZMÁN",
          region: "REGION A (0)",
        },
        {
          municipio: "GUERRA",
          provincia: "SANTO DOMINGO DE GUZMÁN",
          region: "REGION A (0)",
        },
        {
          municipio: "BOCA CHICA ",
          provincia: "SANTO DOMINGO DE GUZMÁN",
          region: "REGION A (0)",
        },
        {
          municipio: "BANI",
          provincia: "PERAVIA",
          region: "REGION A (I)",
        },
        {
          municipio: "NIZAO",
          provincia: "PERAVIA",
          region: "REGION A (I)",
        },
        {
          municipio: "SAN CRISTOBAL",
          provincia: "SAN CRISTOBAL",
          region: "REGION A (I)",
        },
        {
          municipio: "SABANA GRANDE DE PALENQUE",
          provincia: "SAN CRISTOBAL",
          region: "REGION A (I)",
        },
        {
          municipio: "BAJOS DE HAINA",
          provincia: "SAN CRISTOBAL",
          region: "REGION A (I)",
        },
        {
          municipio: "GAMBITA GARABITOS",
          provincia: "SAN CRISTOBAL",
          region: "REGION A (I)",
        },
        {
          municipio: "VILLA ALTAGRACIA",
          provincia: "SAN CRISTOBAL",
          region: "REGION A (I)",
        },
        {
          municipio: "YAGUATE",
          provincia: "SAN CRISTOBAL",
          region: "REGION A (I)",
        },
        {
          municipio: "SAN GREGORIO DE NIGUA",
          provincia: "SAN CRISTOBAL",
          region: "REGION A (I)",
        },
        {
          municipio: "LOS CACAOS",
          provincia: "SAN CRISTOBAL",
          region: "REGION A (I)",
        },
        {
          municipio: "SAN JOSE DE OCOA",
          provincia: "SAN JOSE DE OCOA",
          region: "REGION A (I)",
        },
        {
          municipio: "RANCHO ARRIBA",
          provincia: "SAN JOSE DE OCOA",
          region: "REGION A (I)",
        },
        {
          municipio: "SABANA LARGA",
          provincia: "SAN JOSE DE OCOA",
          region: "REGION A (I)",
        },
        {
          municipio: "MOCA",
          provincia: "ESPALLIAT",
          region: "REGION B (II)",
        },
        {
          municipio: "CAYETANO GERMOSEN ",
          provincia: "ESPALLIAT",
          region: "REGION B (II)",
        },
        {
          municipio: "GASPAR HERNANDEZ",
          provincia: "ESPALLIAT",
          region: "REGION B (II)",
        },
        {
          municipio: "JAMAO AL NORTE ",
          provincia: "ESPALLIAT",
          region: "REGION B (II)",
        },
        {
          municipio: "SAN VICTOR",
          provincia: "ESPALLIAT",
          region: "REGION B (II)",
        },
        {
          municipio: "PUERTO PLATA ",
          provincia: "PUERTO PLATA",
          region: "REGION B (II)",
        },
        {
          municipio: "ALTAMIRA",
          provincia: "PUERTO PLATA",
          region: "REGION B (II)",
        },
        {
          municipio: "GUANANICO",
          provincia: "PUERTO PLATA",
          region: "REGION B (II)",
        },
        {
          municipio: "IMBERT",
          provincia: "PUERTO PLATA",
          region: "REGION B (II)",
        },
        {
          municipio: "LOS HIDALGOS ",
          provincia: "PUERTO PLATA",
          region: "REGION B (II)",
        },
        {
          municipio: "LUPERON ",
          provincia: "PUERTO PLATA",
          region: "REGION B (II)",
        },
        {
          municipio: "SOSUA ",
          provincia: "PUERTO PLATA",
          region: "REGION B (II)",
        },
        {
          municipio: "VILLA ISABELA",
          provincia: "PUERTO PLATA",
          region: "REGION B (II)",
        },
        {
          municipio: "VILLA MONTELLANO ",
          provincia: "PUERTO PLATA",
          region: "REGION B (II)",
        },
        {
          municipio: "SANTIAGO DE LOS CABALLEROS",
          provincia: "SANTIAGO",
          region: "REGION B (II)",
        },
        {
          municipio: "BAITOA",
          provincia: "SANTIAGO",
          region: "REGION B (II)",
        },
        {
          municipio: "HANICO",
          provincia: "SANTIAGO",
          region: "REGION B (II)",
        },
        {
          municipio: "LICEY AL MEDIO ",
          provincia: "SANTIAGO",
          region: "REGION B (II)",
        },
        {
          municipio: "PUNAL ",
          provincia: "SANTIAGO",
          region: "REGION B (II)",
        },
        {
          municipio: "SABAN IGLESIAS",
          provincia: "SANTIAGO",
          region: "REGION B (II)",
        },
        {
          municipio: "SAN JOSE DE LAS MATAS",
          provincia: "SANTIAGO",
          region: "REGION B (II)",
        },
        {
          municipio: "TAMBORIL ",
          provincia: "SANTIAGO",
          region: "REGION B (II)",
        },
        {
          municipio: "VILLA BISONO ",
          provincia: "SANTIAGO",
          region: "REGION B (II)",
        },
        {
          municipio: "VILLA GONZALES",
          provincia: "SANTIAGO",
          region: "REGION B (II)",
        },
        {
          municipio: "SAN FRANCISCO DE MACORIS",
          provincia: "DUARTE",
          region: "REGION C (III)",
        },
        {
          municipio: "ARENOSO ",
          provincia: "DUARTE",
          region: "REGION C (III)",
        },
        {
          municipio: "CASTILLO",
          provincia: "DUARTE",
          region: "REGION C (III)",
        },
        {
          municipio: "HOSTOS",
          provincia: "DUARTE",
          region: "REGION C (III)",
        },
        {
          municipio: "LAS GUARANAS",
          provincia: "DUARTE",
          region: "REGION C (III)",
        },
        {
          municipio: "PIMENTEL ",
          provincia: "DUARTE",
          region: "REGION C (III)",
        },
        {
          municipio: "VILLA ARRIBA",
          provincia: "DUARTE",
          region: "REGION C (III)",
        },
        {
          municipio: "SALCEDO",
          provincia: "HERMANAS MIRABAL",
          region: "REGION C (III)",
        },
        {
          municipio: "TENARES",
          provincia: "HERMANAS MIRABAL",
          region: "REGION C (III)",
        },
        {
          municipio: "VILLA TAPIA",
          provincia: "HERMANAS MIRABAL",
          region: "REGION C (III)",
        },
        {
          municipio: "NAGUA",
          provincia: "MARIA TRINIDAD SANCHEZ",
          region: "REGION C (III)",
        },
        {
          municipio: "CABRERA",
          provincia: "MARIA TRINIDAD SANCHEZ",
          region: "REGION C (III)",
        },
        {
          municipio: "EL FACTOR ",
          provincia: "MARIA TRINIDAD SANCHEZ",
          region: "REGION C (III)",
        },
        {
          municipio: "RIO SAN JUAN",
          provincia: "MARIA TRINIDAD SANCHEZ",
          region: "REGION C (III)",
        },
        {
          municipio: "SAMANA",
          provincia: "SAMANA ",
          region: "REGION C (III)",
        },
        {
          municipio: "LAS TERRENAS",
          provincia: "SAMANA ",
          region: "REGION C (III)",
        },
        {
          municipio: "SANCHEZ",
          provincia: "SAMANA ",
          region: "REGION C (III)",
        },
        {
          municipio: "NEIBA",
          provincia: "BAHORUCO",
          region: "REGION D (IV)",
        },
        {
          municipio: "GALVAN",
          provincia: "BAHORUCO",
          region: "REGION D (IV)",
        },
        {
          municipio: "LOS RIOS ",
          provincia: "BAHORUCO",
          region: "REGION D (IV)",
        },
        {
          municipio: "TAMAYO ",
          provincia: "BAHORUCO",
          region: "REGION D (IV)",
        },
        {
          municipio: "VILLA JARAGUA",
          provincia: "BAHORUCO",
          region: "REGION D (IV)",
        },
        {
          municipio: "BARAHONA",
          provincia: "BARAHONA",
          region: "REGION D (IV)",
        },
        {
          municipio: "CABRAL ",
          provincia: "BARAHONA",
          region: "REGION D (IV)",
        },
        {
          municipio: "EL PENON ",
          provincia: "BARAHONA",
          region: "REGION D (IV)",
        },
        {
          municipio: "ENRIQUILLO",
          provincia: "BARAHONA",
          region: "REGION D (IV)",
        },
        {
          municipio: "FUNDACION",
          provincia: "BARAHONA",
          region: "REGION D (IV)",
        },
        {
          municipio: "JAQUIMEYES",
          provincia: "BARAHONA",
          region: "REGION D (IV)",
        },
        {
          municipio: "LA CIENAGA",
          provincia: "BARAHONA",
          region: "REGION D (IV)",
        },
        {
          municipio: "LAS SALINAS",
          provincia: "BARAHONA",
          region: "REGION D (IV)",
        },
        {
          municipio: "PARAISO ",
          provincia: "BARAHONA",
          region: "REGION D (IV)",
        },
        {
          municipio: "POLO ",
          provincia: "BARAHONA",
          region: "REGION D (IV)",
        },
        {
          municipio: "VICENTE NOBLE",
          provincia: "BARAHONA",
          region: "REGION D (IV)",
        },
        {
          municipio: "COMENDADOR ",
          provincia: "ELIAS PINA ",
          region: "REGION D (IV)",
        },
        {
          municipio: "BANICA",
          provincia: "ELIAS PINA ",
          region: "REGION D (IV)",
        },
        {
          municipio: "EL LLANO ",
          provincia: "ELIAS PINA ",
          region: "REGION D (IV)",
        },
        {
          municipio: "HONDO VALLE",
          provincia: "ELIAS PINA ",
          region: "REGION D (IV)",
        },
        {
          municipio: "JUAN SANTIAGO ",
          provincia: "ELIAS PINA ",
          region: "REGION D (IV)",
        },
        {
          municipio: "PEDRO SANTANA",
          provincia: "ELIAS PINA ",
          region: "REGION D (IV)",
        },
        {
          municipio: "JIMANI",
          provincia: "INDEPENDENCIA",
          region: "REGION D (IV)",
        },
        {
          municipio: "CRISTOBAL",
          provincia: "INDEPENDENCIA",
          region: "REGION D (IV)",
        },
        {
          municipio: "DUVERGE",
          provincia: "INDEPENDENCIA",
          region: "REGION D (IV)",
        },
        {
          municipio: "LA DESCUBIERTA",
          provincia: "INDEPENDENCIA",
          region: "REGION D (IV)",
        },
        {
          municipio: "MELLA",
          provincia: "INDEPENDENCIA",
          region: "REGION D (IV)",
        },
        {
          municipio: "POSTRER RIO ",
          provincia: "INDEPENDENCIA",
          region: "REGION D (IV)",
        },
        {
          municipio: "SANTA CRUZ DE EL SEIBO ",
          provincia: "EL SEIBO ",
          region: "REGION E (V)",
        },
        {
          municipio: "MICHES",
          provincia: "EL SEIBO ",
          region: "REGION E (V)",
        },
        {
          municipio: "HATO MAYOR DEL REY",
          provincia: "HATO MAYOR ",
          region: "REGION E (V)",
        },
        {
          municipio: "EL VALLE",
          provincia: "HATO MAYOR ",
          region: "REGION E (V)",
        },
        {
          municipio: "SABANA DE LA MAR",
          provincia: "HATO MAYOR ",
          region: "REGION E (V)",
        },
        {
          municipio: "HIGUEY",
          provincia: "LA ALTAGRACIA",
          region: "REGION E (V)",
        },
        {
          municipio: "SAN RAFAEL DE YUMA",
          provincia: "LA ALTAGRACIA",
          region: "REGION E (V)",
        },
        {
          municipio: "LA ROMANA",
          provincia: "LA ROMANA ",
          region: "REGION E (V)",
        },
        {
          municipio: "GUAYMATE",
          provincia: "LA ROMANA ",
          region: "REGION E (V)",
        },
        {
          municipio: "VILLA HERMOSA",
          provincia: "LA ROMANA ",
          region: "REGION E (V)",
        },
        {
          municipio: "SAN PEDRO DE MACORIS",
          provincia: "SAN PEDRO DE MACORIS",
          region: "REGION E (V)",
        },
        {
          municipio: "CONSUELO ",
          provincia: "SAN PEDRO DE MACORIS",
          region: "REGION E (V)",
        },
        {
          municipio: "GUAYACANES",
          provincia: "SAN PEDRO DE MACORIS",
          region: "REGION E (V)",
        },
        {
          municipio: "QUISQUEYA",
          provincia: "SAN PEDRO DE MACORIS",
          region: "REGION E (V)",
        },
        {
          municipio: "RAMON SANTANA",
          provincia: "SAN PEDRO DE MACORIS",
          region: "REGION E (V)",
        },
        {
          municipio: "SAN JOSE DE LOS LLANOS",
          provincia: "SAN PEDRO DE MACORIS",
          region: "REGION E (V)",
        },
        {
          municipio: "AZUA DE COMPOSTELA ",
          provincia: "AZUA",
          region: "REGION F (VI)",
        },
        {
          municipio: "ESTEBANIA",
          provincia: "AZUA",
          region: "REGION F (VI)",
        },
        {
          municipio: "GUAYABAL",
          provincia: "AZUA",
          region: "REGION F (VI)",
        },
        {
          municipio: "LAS CHARCAS",
          provincia: "AZUA",
          region: "REGION F (VI)",
        },
        {
          municipio: "LAS YAYAS DE VIAJAMA",
          provincia: "AZUA",
          region: "REGION F (VI)",
        },
        {
          municipio: "PADRE DE LAS CASAS",
          provincia: "AZUA",
          region: "REGION F (VI)",
        },
        {
          municipio: "PERALTA",
          provincia: "AZUA",
          region: "REGION F (VI)",
        },
        {
          municipio: "PUEBLO VIEJO ",
          provincia: "AZUA",
          region: "REGION F (VI)",
        },
        {
          municipio: "SABANA YEGUA ",
          provincia: "AZUA",
          region: "REGION F (VI)",
        },
        {
          municipio: "TABARA ARRIBA",
          provincia: "AZUA",
          region: "REGION F (VI)",
        },
        {
          municipio: "SAN JUAN DE LA MAGUANA",
          provincia: "SAN JUAN ",
          region: "REGION F (VI)",
        },
        {
          municipio: "BOECHIO",
          provincia: "SAN JUAN ",
          region: "REGION F (VI)",
        },
        {
          municipio: "EL CERCADO ",
          provincia: "SAN JUAN ",
          region: "REGION F (VI)",
        },
        {
          municipio: "JUAN DE HERRERA",
          provincia: "SAN JUAN ",
          region: "REGION F (VI)",
        },
        {
          municipio: "LAS MATAS DE FARFAN ",
          provincia: "SAN JUAN ",
          region: "REGION F (VI)",
        },
        {
          municipio: "VALLEJUELO ",
          provincia: "SAN JUAN ",
          region: "REGION F (VI)",
        },
        {
          municipio: "PEDERNALES ",
          provincia: "PEDERNALES ",
          region: "REGION F (VI)",
        },
        {
          municipio: "OVIEDO ",
          provincia: "PEDERNALES ",
          region: "REGION F (VI)",
        },
        {
          municipio: "DAJABON",
          provincia: "DAJABON",
          region: "REGION G (VII)",
        },
        {
          municipio: "EL PINO ",
          provincia: "DAJABON",
          region: "REGION G (VII)",
        },
        {
          municipio: "LOMA DE CABRERA",
          provincia: "DAJABON",
          region: "REGION G (VII)",
        },
        {
          municipio: "PARTIDO",
          provincia: "DAJABON",
          region: "REGION G (VII)",
        },
        {
          municipio: "RESTAURACION ",
          provincia: "DAJABON",
          region: "REGION G (VII)",
        },
        {
          municipio: "MONTE CRISTI ",
          provincia: "MONTE CRISTI ",
          region: "REGION G (VII)",
        },
        {
          municipio: "CASTANUELA",
          provincia: "MONTE CRISTI ",
          region: "REGION G (VII)",
        },
        {
          municipio: "GUAYUBIN ",
          provincia: "MONTE CRISTI ",
          region: "REGION G (VII)",
        },
        {
          municipio: "LAS MATAS DE SANTA CRUZ",
          provincia: "MONTE CRISTI ",
          region: "REGION G (VII)",
        },
        {
          municipio: "PEPILLO SALCEDO ",
          provincia: "MONTE CRISTI ",
          region: "REGION G (VII)",
        },
        {
          municipio: "VILLA VASQUEZ",
          provincia: "MONTE CRISTI ",
          region: "REGION G (VII)",
        },
        {
          municipio: "SAN IGNACIO DE SABANETA",
          provincia: "SANTIAGO RODRIGUEZ",
          region: "REGION G (VII)",
        },
        {
          municipio: "MONCION",
          provincia: "SANTIAGO RODRIGUEZ",
          region: "REGION G (VII)",
        },
        {
          municipio: "VILLA LOS ALMACIGOS",
          provincia: "SANTIAGO RODRIGUEZ",
          region: "REGION G (VII)",
        },
        {
          municipio: "MAO",
          provincia: "VALVERDE",
          region: "REGION G (VII)",
        },
        {
          municipio: "ESPERANZA",
          provincia: "VALVERDE",
          region: "REGION G (VII)",
        },
        {
          municipio: "LAGUNA SALADA",
          provincia: "VALVERDE",
          region: "REGION G (VII)",
        },
        {
          municipio: "LA VEGA",
          provincia: "LA VEGA",
          region: "REGION H (VIII)",
        },
        {
          municipio: "CONSTANZA",
          provincia: "LA VEGA",
          region: "REGION H (VIII)",
        },
        {
          municipio: "JARABACOA",
          provincia: "LA VEGA",
          region: "REGION H (VIII)",
        },
        {
          municipio: "JIMA ABAJO ",
          provincia: "LA VEGA",
          region: "REGION H (VIII)",
        },
        {
          municipio: "BONAO",
          provincia: "MONSENOR NOUEL",
          region: "REGION H (VIII)",
        },
        {
          municipio: "MAIMON ",
          provincia: "MONSENOR NOUEL",
          region: "REGION H (VIII)",
        },
        {
          municipio: "PIEDRA BLANCA",
          provincia: "MONSENOR NOUEL",
          region: "REGION H (VIII)",
        },
        {
          municipio: "COTUI",
          provincia: "SANCHEZ RAMIREZ",
          region: "REGION H (VIII)",
        },
        {
          municipio: "CEVICOS",
          provincia: "SANCHEZ RAMIREZ",
          region: "REGION H (VIII)",
        },
        {
          municipio: "FANTINO",
          provincia: "SANCHEZ RAMIREZ",
          region: "REGION H (VIII)",
        },
        {
          municipio: "LA MATA",
          provincia: "SANCHEZ RAMIREZ",
          region: "REGION H (VIII)",
        },
      ],
      showModalMunicipios: false,
      search: "",
      seguros2: [],
      currentEdition: {} as any,
      campoFocus: "unap",
      mensageError: "Error",
      mensageExito: "Centro Registrado Exitosamente",
      mensageConfirm: "¿Está Seguro que desea Eliminar Este Centro?",
      encabezado: "",
      modoForm: "",
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
      centro: {} as Centro,
      oneCentro: {} as Centro,
      one: {},
      nextNo: Number,
      centroSelected: [],
      clienteSelected: [],
      descripcionCliente: "",

      showInComentary: "",
      showModal: false,
      showModal7: false,
      showDelete: false,
      currentConsulta: "",
      estado: {} as object,
    };
  },

  updated() {
    if (this.centro.unap) {
      this.centro.unap = this.centro.unap.toUpperCase();
    }
  },

  async mounted() {
    if (this.$route.fullPath == "/centros/new") {
      this.modoForm = "add";
      this.encabezado = "Nuevo Centro";
    } else {
      this.modoForm = "show";
      this.encabezado = "Detalles de Centro";
    }

    if (this.modoForm == "add") {
      this.fillFields();
    } else {
      // this.showDeleteMethod();
      // if (typeof this.$route.params.id === "string") {
      //   await this.loadCentro(this.$route.params.id);
      // }
      this.centro = this.$store.state.user.currentCentro;
    }

    this.focus();
  },

  methods: {
    ValidateCentro() {
      this.centro.status = "V";
      alert('Centro Validado Satisfactoriamente')
      this.createCentro();
    },

    async createCentro(generateId: boolean) {
      await this.toggleLoading();
      if (generateId) {
        let no = this.$store.state.user.proxCodCentro + 1;
        let completivo = "900";
        let id_center = completivo + no;
        this.centro.id_center = id_center;
      }
      try {
        const res = await create(this.centro).then(
          async (res) => {
            if (res.data.Status == "Success") {
              this.$router.push("/centros");
            }
          },
          (err) => {
            console.log(err);
            this.toggleLoading();
          }
        );
      } catch (error) {
        console.error(error);
      }
      await this.toggleLoading();
    },

    defTelefono() {
      if (this.centro.telefono.length == 10) {
        let part1 = this.centro.telefono.substring(0, 3);
        let part2 = this.centro.telefono.substring(3, 6);
        let part3 = this.centro.telefono.substring(6, 10);
        let telefonoGuiones = part1 + "-" + part2 + "-" + part3;
        this.centro.telefono = telefonoGuiones;
      } else if (this.centro.telefono.length == 12) {
        let telefonoGuiones = this.centro.telefono;
        this.centro.telefono = telefonoGuiones;
      } else {
        alert("Teléfono Incorrecto");
        this.centro.telefono = "";
      }
    },

    setMunicipio(municipio: any) {
      this.centro.municipio = municipio.municipio;
      this.centro.provincia = municipio.provincia;
      this.centro.region = municipio.region;
      this.showModalMunicipioMethod();
      this.search = "";
      document.getElementById("telefono").focus();
      this.municipiosFiltrados = this.municipios;
    },

    showModalMunicipioMethod() {
      this.showModalMunicipios = !this.showModalMunicipios;
    },

    setSeguro(seguro: string) {
      this.centro.seguro = seguro;
      this.showModalMethod7();
      this.search = "";
      document.getElementById("ubicacion").focus();
    },

    buscar() {
      this.municipiosFiltrados = this.municipios.filter((municipio: any) => {
        return municipio.municipio
          .toLowerCase()
          .includes(this.search.toLowerCase());
      });
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
        this.centro.consultas.splice(it, 1);
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
        this.centro.consultas.push({
          description: this.currentConsulta,
          date: new Date(),
        });
        this.currentConsulta = "";
      }
      document.getElementById("currentConsulta").focus();
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
      this.centro.edad = years;
    },

    fixTime() {
      this.centro.fecha = this.formatDateToFix(this.centro.fecha, true);
      this.centro.fechaActual = this.formatDateToFix(
        this.centro.fechaActual,
        true
      );
    },

    formatDateToFix(dateValue: Date, incTime: boolean) {
      if (incTime == true) {
        let out = moment(dateValue).add(0, "days");
        return moment(out).format("yyyy-MM-DDTHH:mm");
      } else {
        let out = moment(dateValue).add(0, "days");
        return moment(out).format("yyyy-MM-DD");
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
    calcCentro() {
      (this.centro.retension = this.centro.bruto * 0.1),
        (this.centro.neto = this.centro.bruto * 0.9);
    },
    formatNumber(value: number) {
      return numeral(value).format("00000000");
    },

    formatDate(dateValue: Date) {
      let out = moment(dateValue).add(0, "days");
      return moment(out).format("yyyy-MM-DTHH:mm");
    },

    formatDatePlus(dateValue: Date) {
      let out = moment(dateValue).add(30, "days");
      return moment(out).format("yyyy-MM-DTHH:mm");
    },

    fillFields() {
      this.centro.status = "A";
    },

    cleanFields() {
      this.centro.id_center = "";
      this.centro.municipio = "";
      this.centro.provincia = "";
      this.centro.region = "";
      this.centro.status = "";
      this.centro.telefono = "";
      this.centro.unap = "";
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
.modalMunicipios {
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

.contenedorMunicipios {
  width: 350px;
  height: 350px;
  overflow-y: scroll;
  margin: auto;
  background: #fff;
  box-shadow: 1px 7px 25px rgba(5, 24, 250, 0.6);
  transition: all 500ms ease;
  position: relative;
}

.contenedorMunicipios header {
  padding: 10px;
  background: rgb(82, 45, 109);
  color: #fff;
  position: fixed;
  width: 350px;
}

.contenedorMunicipios label {
  position: absolute;
  top: 10px;
  right: 10px;
  color: #fff;
  font-size: 15px;
  cursor: pointer;
}

.contenidoMunicipios {
  padding: 7px;
  margin-top: 18px;
}

.ars {
  margin: 0%;
  font-size: 12px;
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
  grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr));
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
  background-color: rgb(147, 147, 147);
}

h5 {
  font-size: 90%;
  color: rgb(147, 147, 147);
  font-weight: bold;
  text-align: center;
}

form {
  /* text-align:center;   */
  /* background-color: white; */
  /* box-shadow: 2px 2px 10px rgb(199, 199, 199); */
  /* border-radius: 4px; */
  padding: 2%;
}

legend {
  color: rgb(160, 57, 149);
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
  /* color: rgb(160, 57, 149); */
  border-radius: 7px;
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
#municipios {
  font-family: Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

#municipios td,
#municipios th {
  border: 1px solid #ddd;
  padding: 3px;
  cursor: pointer;
}

#municipios tr:nth-child(even) {
  background-color: #f2f2f2;
}

#municipios tr:hover {
  background-color: #ddd;
}

#municipios th {
  padding-top: 8px;
  padding-bottom: 8px;
  text-align: center;
  background-color: rgb(160, 57, 149);
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
  background: rgb(160, 57, 149);
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
  height: 300;
  margin: auto;
  background: #fff;
  box-shadow: 1px 7px 25px rgba(5, 24, 250, 0.6);
  transition: all 500ms ease;
  position: relative;
}

.contenedor7 header {
  padding: 10px;
  background: rgb(160, 57, 149);
  color: #fff;
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
