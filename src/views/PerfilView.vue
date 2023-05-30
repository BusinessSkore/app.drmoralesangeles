<template>
  <div class="backgrnd">
    <Navbar />
    <Transition>
      <div v-if="cargando" class="spin">
        <img
          class="img"
          :src="'https://isys-assets-bucket.s3.amazonaws.com/logos/logo.png'"
        />
      </div>
    </Transition>
    <!-- Power User Dashboard -->
    <div
      v-if="this.$store.state.user.type == 'Power User'"
      v-show="!cargando"
      class="general"
    >
      <h3 v-if="this.$store.state.user.type == 'Power User'">
        Dashboard Paciente
      </h3>
      <div class="grid">
        <div
          v-show="!cargando"
          v-if="this.$store.state.user.type == 'Power User'"
          class="card bg-secondary"
          style="max-width: 25rem;"
        >
          <div class="card-header">
            <h5 class="section-title">Afiliado</h5>
          </div>
          <div class="card-body grid-small">
            <img class="imgAfil" :src="this.$store.state.user.imageUrl" />
            <div>
              <p class="field">
                <span class="bold">EVALUACIONES: </span
                >{{ this.$store.state.user.defaultStatus.length }}
              </p>
              <p
                class="field"
                v-show="
                  this.$store.state.user.defaultStatus[0].estado ==
                    'No Egresado'
                "
              >
                <span class="bold">PROXIMA CITA: </span
                >{{
                  formatDatePlus(
                    numeroAFecha(
                      this.$store.state.user.defaultStatus[
                        this.$store.state.user.defaultStatus.length - 1
                      ].fecha
                    )
                  )
                }}
              </p>
              <p class="field">
                <span class="bold">KIT ACTUAL: </span
                >{{
                  this.$store.state.user.defaultStatus[
                    this.$store.state.user.defaultStatus.length - 1
                  ].kit
                }}
              </p>
              <p class="field">
                <span class="bold">STATUS: </span
                >{{ this.$store.state.user.defaultStatus[0].estado }}
              </p>
              <p class="field">
                <span class="bold">REGION: </span
                >{{ this.$store.state.user.defaultStatus[0].region }}
              </p>
              <p class="field">
                <span class="bold">PROVINCIA: </span
                >{{ this.$store.state.user.defaultStatus[0].provincia }}
              </p>
              <p class="field">
                <span class="bold">MUNICIPIO: </span
                >{{ this.$store.state.user.defaultStatus[0].municipio }}
              </p>
              <p class="field">
                <span class="bold">SECTOR: </span
                >{{ this.$store.state.user.defaultStatus[0].barrio }}
              </p>
            </div>
          </div>
        </div>
        <!-- <div
          v-if="this.$store.state.user.type == 'Power User'"
          class="card bg-secondary"
        >
          <div class="card-body">
            <div>
              <div class="grid">
                <h5>
                  Nombre:
                  {{
                    this.$store.state.user.defaultStatus[0].nombre +
                      " " +
                      this.$store.state.user.defaultStatus[0].apellido
                  }}
                </h5>
                <h5>
                  Apellido:
                  {{ this.$store.state.user.defaultStatus[0].apellido }}
                </h5>
                <h5>
                  Sexo: {{ this.$store.state.user.defaultStatus[0].sexo }}
                </h5>
                <h5>
                  Cédula: {{ this.$store.state.user.defaultStatus[0].cedula }}
                </h5>
                <h5>
                  NSS:
                  {{
                    formatNumerInteger(
                      this.$store.state.user.defaultStatus[0].nss
                    )
                  }}
                </h5>
                <h5>
                  Provincia:
                  {{ this.$store.state.user.defaultStatus[0].provincia }}
                </h5>
                <h5>
                  Kit Actual: {{ this.$store.state.user.defaultStatus[0].kit }}
                </h5>
                <h5>
                  Status {{ this.$store.state.user.defaultStatus[0].estado }}
                </h5>
                <h5>
                  Cantidad de Evaluaciones:
                  {{ this.$store.state.user.defaultStatus.length }}
                </h5>
                <h5>
                  Próxima Cita:
                  {{
                    formatDatePlus(
                      numeroAFecha(
                        this.$store.state.user.defaultStatus[
                          this.$store.state.user.defaultStatus.length - 1
                        ].fecha
                      )
                    )
                  }}
                </h5>
                <h5>
                  Centro: {{ this.$store.state.user.defaultStatus[0].unap }}
                </h5>
              </div>
            </div>
          </div>
        </div> -->
        <div
          v-show="!cargando"
          v-if="this.$store.state.user.type == 'Power User'"
          class="card bg-secondary"
          style="max-width: 25rem;"
        >
          <div class="card-header">
            <h5 class="section-title">Datos Generales</h5>
          </div>
          <div class="card-body">
            <p class="field">
              <span class="bold">NOMBRE COMPLETO: </span
              >{{
                this.$store.state.user.defaultStatus[0].nombre +
                  " " +
                  this.$store.state.user.defaultStatus[0].apellido
              }}
            </p>
            <p class="field">
              <span class="bold">SEXO: </span
              >{{ this.$store.state.user.defaultStatus[0].sexo }}
            </p>
            <p class="field">
              <span class="bold">CEDULA: </span
              >{{ this.$store.state.user.defaultStatus[0].cedula }}
            </p>
            <p class="field">
              <span class="bold">NSS: </span
              >{{ this.$store.state.user.defaultStatus[0].nss }}
            </p>
            <p class="field">
              <span class="bold">REGIMEN: </span
              >{{ this.$store.state.user.defaultStatus[0].regimen }}
            </p>
            <p class="field">
              <span class="bold">TELEFONO: </span
              >{{ this.$store.state.user.defaultStatus[0].telefono }}
            </p>
            <p class="field">
              <span class="bold">TIPO DE CONTACTO: </span
              >{{ this.$store.state.user.defaultStatus[0].tipo_de_contacto }}
            </p>
            <p class="field">
              <span class="bold">NOMBRE DE CONTACTO: </span
              >{{ this.$store.state.user.defaultStatus[0].nombre_contacto }}
            </p>
            <p class="field">
              <span class="bold">CENTRO: </span
              >{{ this.$store.state.user.defaultStatus[0].unap }}
            </p>
          </div>
        </div>
        <!-- <div
          v-show="!cargando"
          v-if="this.$store.state.user.type == 'Power User'"
          class="card bg-secondary"
          style="max-width: 25rem;"
        >
          <div class="card-header">
            <h5 class="section-title">Ubicación</h5>
          </div>
          <div class="card-body">
            <p class="field">
              <span class="bold">REGION: </span
              >{{ this.$store.state.user.defaultStatus[0].region }}
            </p>
            <p class="field">
              <span class="bold">PROVINCIA: </span
              >{{ this.$store.state.user.defaultStatus[0].provincia }}
            </p>
            <p class="field">
              <span class="bold">MUNICIPIO: </span
              >{{ this.$store.state.user.defaultStatus[0].municipio }}
            </p>
            <p class="field">
              <span class="bold">BARRIO: </span
              >{{ this.$store.state.user.defaultStatus[0].barrio }}
            </p>
          </div>
        </div> -->
        <!-- <div
          v-show="!cargando"
          v-if="this.$store.state.user.type == 'Power User'"
          class="card bg-secondary"
          style="max-width: 25rem;"
        >
          <div class="card-header">
            <h5 class="section-title">Resumen</h5>
          </div>
          <div class="card-body">
            <p class="field">
              <span class="bold">CANTIDAD DE EVALUACIONES: </span
              >{{ this.$store.state.user.defaultStatus.length }}
            </p>
            <p class="field">
              <span class="bold">PROXIMA CITA: </span
              >{{
                formatDatePlus(
                  numeroAFecha(
                    this.$store.state.user.defaultStatus[
                      this.$store.state.user.defaultStatus.length - 1
                    ].fecha
                  )
                )
              }}
            </p>
            <p class="field">
              <span class="bold">KIT ACTUAL: </span
              >{{
                this.$store.state.user.defaultStatus[
                  this.$store.state.user.defaultStatus.length - 1
                ].kit
              }}
            </p>
            <p class="field">
              <span class="bold">ESTADO: </span
              >{{ this.$store.state.user.defaultStatus[0].estado }}
            </p>
          </div>
        </div> -->
        <!-- <div
          v-show="!cargando"
          v-if="this.$store.state.user.type == 'Power User'"
          class="card bg-secondary"
          style="max-width: 25rem;"
        >
          <div class="card-header">
            <h5 class="section-title">Últimas Medidas Antropométricas</h5>
          </div>
          <div class="card-body">
            <p class="field">
              <span class="bold">TALLA: </span
              >{{ this.$store.state.user.defaultStatus[0].talla + " cm" }}
            </p>
            <p class="field">
              <span class="bold">PESO: </span
              >{{ this.$store.state.user.defaultStatus[0].peso + " Kg" }}
            </p>
            <p class="field">
              <span class="bold">CINTURA: </span
              >{{ this.$store.state.user.defaultStatus[0].cintura + " cm" }}
            </p>
            <p class="field">
              <span class="bold">ABDOMEN: </span
              >{{ this.$store.state.user.defaultStatus[0].abdomen + " cm" }}
            </p>
            <p class="field">
              <span class="bold">CADERA: </span
              >{{ this.$store.state.user.defaultStatus[0].cadera + " cm" }}
            </p>
            <p class="field">
              <span class="bold">ALTURA DE RODILLA: </span
              >{{
                this.$store.state.user.defaultStatus[0].altura_rodilla + " cm"
              }}
            </p>
            <p class="field">
              <span class="bold">CINTURA / CADERA: </span
              >{{
                this.$store.state.user.defaultStatus[0]["Cintura/Cadera"] +
                  " cm"
              }}
            </p>
          </div>
        </div> -->
        <!-- <div
          v-show="!cargando"
          v-if="this.$store.state.user.type == 'Power User'"
          class="card bg-secondary"
          style="max-width: 25rem;"
        >
          <div class="card-header">
            <h5 class="section-title">Última Evaluación Funcional</h5>
          </div>
          <div class="card-body">
            <p class="field">
              <span class="bold">PRESION ARTERIAL SISTOLICA: </span
              >{{
                this.$store.state.user.defaultStatus[0]
                  .presion_arterial_sistolica + " mmHg"
              }}
            </p>
            <p class="field">
              <span class="bold">PRESION ARTERIAL DIASTOLICA: </span
              >{{
                this.$store.state.user.defaultStatus[0]
                  .presion_arterial_diatolica + " mmHg"
              }}
            </p>
            <p class="field">
              <span class="bold">FRECUENCIA CARDIACA: </span
              >{{
                this.$store.state.user.defaultStatus[0].frecuencia_cardiaca +
                  " Latidos x Min"
              }}
            </p>
            <p class="field">
              <span class="bold">FUERZA: </span
              >{{ this.$store.state.user.defaultStatus[0].fuerza + " Kg" }}
            </p>
            <p class="field">
              <span class="bold">INDICE DE MASA CORPORAL: </span
              >{{ this.$store.state.user.defaultStatus[0].imc + " Kg/m" }}
            </p>
            <p class="field">
              <span class="bold">FLEXIBILIDAD DE MIEMBROS SUPERIORES: </span
              >{{
                this.$store.state.user.defaultStatus[0]
                  .flexibilidad_miembro_superior + " cm"
              }}
            </p>
            <p class="field">
              <span class="bold">FLEXIBILIDAD DE MIEMBROS INFERIORES: </span
              >{{
                this.$store.state.user.defaultStatus[0]
                  .flexibilidad_miembro_inferior + " cm"
              }}
            </p>
            <p class="field">
              <span class="bold">PLIEGUE DE BICEPS: </span
              >{{
                this.$store.state.user.defaultStatus[0].pliegue_bicep + " mm"
              }}
            </p>
            <p class="field">
              <span class="bold">PLIEGUE ABDOMINAL: </span
              >{{
                this.$store.state.user.defaultStatus[0].pliegue_abdominal +
                  " mm"
              }}
            </p>
            <p class="field">
              <span class="bold">PLIEGUE SUBESCAPULAR: </span
              >{{ this.$store.state.user.defaultStatus[0].pliegue_sub + " mm" }}
            </p>
          </div>
        </div> -->
        <div
          v-show="!cargando"
          v-if="this.$store.state.user.type == 'Power User'"
          class="card bg-secondary"
          style="max-width: 25rem;"
        >
          <div class="card-header">
            <h5 class="section-title">Situación Actual y Alertas</h5>
          </div>
          <div class="card-body">
            <div class="grid-small2">
              <div>
                <h6>HALLAZGOS:</h6>
                <p
                  v-if="
                    this.$store.state.user.defaultStatus[
                      this.$store.state.user.defaultStatus.length - 1
                    ].Encamado == 'Si'
                  "
                  class="field"
                >
                  <span class="bold">ENCAMADO </span>
                </p>
                <p
                  v-if="
                    this.$store.state.user.defaultStatus[
                      this.$store.state.user.defaultStatus.length - 1
                    ].Edentulo == 'Si'
                  "
                  class="field"
                >
                  <span class="bold">EDENTULO </span>
                </p>
                <p
                  v-if="
                    this.$store.state.user.defaultStatus[
                      this.$store.state.user.defaultStatus.length - 1
                    ]['vive solo'] == 'Si'
                  "
                  class="field"
                >
                  <span class="bold">VIVE SOLO </span>
                </p>
                <p
                  v-if="
                    this.$store.state.user.defaultStatus[
                      this.$store.state.user.defaultStatus.length - 1
                    ].abandono == 'Si'
                  "
                  class="field"
                >
                  <span class="bold">ABANDONO </span>
                </p>
                <p
                  v-if="
                    this.$store.state.user.defaultStatus[
                      this.$store.state.user.defaultStatus.length - 1
                    ].maltrato == 'Si'
                  "
                  class="field"
                >
                  <span class="bold">MALTRATO </span>
                </p>
                <p
                  v-if="
                    this.$store.state.user.defaultStatus[
                      this.$store.state.user.defaultStatus.length - 1
                    ]['exceso medicamento'] == 'Si'
                  "
                  class="field"
                >
                  <span class="bold">EXCESO DE MEDICAMENTOS </span>
                </p>
              </div>
              <div>
                <h6>ESPECIALIDADES:</h6>
                <p
                  v-if="
                    this.$store.state.user.defaultStatus[
                      this.$store.state.user.defaultStatus.length - 1
                    ].specialist_appo_psiqui == 'Si'
                  "
                  class="field"
                >
                  <span class="bold">PSIQUIATRIA </span>
                </p>
                <p
                  v-if="
                    this.$store.state.user.defaultStatus[
                      this.$store.state.user.defaultStatus.length - 1
                    ].specialist_appo_geria == 'Si'
                  "
                  class="field"
                >
                  <span class="bold">GERIATRIA </span>
                </p>
                <p
                  v-if="
                    this.$store.state.user.defaultStatus[
                      this.$store.state.user.defaultStatus.length - 1
                    ].specialist_appo_orto == 'Si'
                  "
                  class="field"
                >
                  <span class="bold">ORTOPEDIA </span>
                </p>
                <p
                  v-if="
                    this.$store.state.user.defaultStatus[
                      this.$store.state.user.defaultStatus.length - 1
                    ].specialist_appo_gastro == 'Si'
                  "
                  class="field"
                >
                  <span class="bold">GASTROENTEROLOGIA </span>
                </p>
                <p
                  v-if="
                    this.$store.state.user.defaultStatus[
                      this.$store.state.user.defaultStatus.length - 1
                    ].specialist_appo_oftal == 'Si'
                  "
                  class="field"
                >
                  <span class="bold">OFTALMOLOGIA </span>
                </p>
                <p
                  v-if="
                    this.$store.state.user.defaultStatus[
                      this.$store.state.user.defaultStatus.length - 1
                    ].specialist_appo_psicolo == 'Si'
                  "
                  class="field"
                >
                  <span class="bold">PSICOLOGIA </span>
                </p>
                <p
                  v-if="
                    this.$store.state.user.defaultStatus[
                      this.$store.state.user.defaultStatus.length - 1
                    ].specialist_appo_neurolo == 'Si'
                  "
                  class="field"
                >
                  <span class="bold">NEUROLOGIA </span>
                </p>
                <p
                  v-if="
                    this.$store.state.user.defaultStatus[
                      this.$store.state.user.defaultStatus.length - 1
                    ].specialist_appo_fisia == 'Si'
                  "
                  class="field"
                >
                  <span class="bold">FISIATRIA </span>
                </p>
                <p
                  v-if="
                    this.$store.state.user.defaultStatus[
                      this.$store.state.user.defaultStatus.length - 1
                    ].specialist_appo_cardio == 'Si'
                  "
                  class="field"
                >
                  <span class="bold">CARDIOLOGIA </span>
                </p>
                <p
                  v-if="
                    this.$store.state.user.defaultStatus[
                      this.$store.state.user.defaultStatus.length - 1
                    ].specialist_appo_odonto == 'Si'
                  "
                  class="field"
                >
                  <span class="bold">ODONTOLOGIA </span>
                </p>
                <p
                  v-if="
                    this.$store.state.user.defaultStatus[
                      this.$store.state.user.defaultStatus.length - 1
                    ].specialist_appo_urolo == 'Si'
                  "
                  class="field"
                >
                  <span class="bold">UROLOGIA </span>
                </p>
                <p
                  v-if="
                    this.$store.state.user.defaultStatus[
                      this.$store.state.user.defaultStatus.length - 1
                    ].specialist_appo_diabe == 'Si'
                  "
                  class="field"
                >
                  <span class="bold">DIABETOLOGIA </span>
                </p>
              </div>
              <div>
                <h6>NECESIDADES:</h6>
                <p
                  v-if="
                    this.$store.state.user.defaultStatus[
                      this.$store.state.user.defaultStatus.length - 1
                    ]['Andador 4 Ruedas'] == 'Si'
                  "
                  class="field"
                >
                  <span class="bold">ANDADOR DE 4 RUEDAS </span>
                </p>
                <p
                  v-if="
                    this.$store.state.user.defaultStatus[
                      this.$store.state.user.defaultStatus.length - 1
                    ]['Andador 4 Patas'] == 'Si'
                  "
                  class="field"
                >
                  <span class="bold">ANDADOR DE 4 PATAS </span>
                </p>
                <p
                  v-if="
                    this.$store.state.user.defaultStatus[
                      this.$store.state.user.defaultStatus.length - 1
                    ]['Bastón'] == 'Si'
                  "
                  class="field"
                >
                  <span class="bold">BASTON </span>
                </p>
                <p
                  v-if="
                    this.$store.state.user.defaultStatus[
                      this.$store.state.user.defaultStatus.length - 1
                    ]['Bastón 4 P'] == 'Si'
                  "
                  class="field"
                >
                  <span class="bold">BASTON 4 PATAS </span>
                </p>
                <p
                  v-if="
                    this.$store.state.user.defaultStatus[
                      this.$store.state.user.defaultStatus.length - 1
                    ]['Bastón No VIdente'] == 'Si'
                  "
                  class="field"
                >
                  <span class="bold">BASTON BLANCO (NO VIDENTE) </span>
                </p>
                <p
                  v-if="
                    this.$store.state.user.defaultStatus[
                      this.$store.state.user.defaultStatus.length - 1
                    ]['Cama de Posición'] == 'Si'
                  "
                  class="field"
                >
                  <span class="bold">CAMA DE POSICION </span>
                </p>
                <p
                  v-if="
                    this.$store.state.user.defaultStatus[
                      this.$store.state.user.defaultStatus.length - 1
                    ]['Colchón Aire'] == 'Si'
                  "
                  class="field"
                >
                  <span class="bold">COLCHON DE AIRE </span>
                </p>
                <p
                  v-if="
                    this.$store.state.user.defaultStatus[
                      this.$store.state.user.defaultStatus.length - 1
                    ]['Faja Obdominal'] == 'Si'
                  "
                  class="field"
                >
                  <span class="bold">FAJA ABDOMINAL </span>
                </p>
                <p
                  v-if="
                    this.$store.state.user.defaultStatus[
                      this.$store.state.user.defaultStatus.length - 1
                    ]['Glucómetro'] == 'Si'
                  "
                  class="field"
                >
                  <span class="bold">GLUCOMETRO </span>
                </p>
                <p
                  v-if="
                    this.$store.state.user.defaultStatus[
                      this.$store.state.user.defaultStatus.length - 1
                    ]['Inodoro Porta'] == 'Si'
                  "
                  class="field"
                >
                  <span class="bold">INODORO PORTATIL </span>
                </p>
                <p
                  v-if="
                    this.$store.state.user.defaultStatus[
                      this.$store.state.user.defaultStatus.length - 1
                    ]['Muletas'] == 'Si'
                  "
                  class="field"
                >
                  <span class="bold">MULETAS </span>
                </p>
                <p
                  v-if="
                    this.$store.state.user.defaultStatus[
                      this.$store.state.user.defaultStatus.length - 1
                    ]['Pampers XL'] == 'Si'
                  "
                  class="field"
                >
                  <span class="bold">PAMPERS / SIZE XL </span>
                </p>
                <p
                  v-if="
                    this.$store.state.user.defaultStatus[
                      this.$store.state.user.defaultStatus.length - 1
                    ]['Pampers L'] == 'Si'
                  "
                  class="field"
                >
                  <span class="bold">PAMPERS / SIZE L </span>
                </p>
                <p
                  v-if="
                    this.$store.state.user.defaultStatus[
                      this.$store.state.user.defaultStatus.length - 1
                    ]['Pampers M'] == 'Si'
                  "
                  class="field"
                >
                  <span class="bold">PAMPERS / SIZE M </span>
                </p>
                <p
                  v-if="
                    this.$store.state.user.defaultStatus[
                      this.$store.state.user.defaultStatus.length - 1
                    ]['Pampers S'] == 'Si'
                  "
                  class="field"
                >
                  <span class="bold">PAMPERS / SIZE S </span>
                </p>
                <p
                  v-if="
                    this.$store.state.user.defaultStatus[
                      this.$store.state.user.defaultStatus.length - 1
                    ]['Silla de Baño'] == 'Si'
                  "
                  class="field"
                >
                  <span class="bold">SILLA DE BAÑO </span>
                </p>
                <p
                  v-if="
                    this.$store.state.user.defaultStatus[
                      this.$store.state.user.defaultStatus.length - 1
                    ]['Media de Comprensión'] == 'Si'
                  "
                  class="field"
                >
                  <span class="bold">MEDIA DE COMPRESION 20-30 MM/HG </span>
                </p>
              </div>
            </div>
          </div>
        </div>
        <!-- <div
          v-show="!cargando"
          v-if="this.$store.state.user.type == 'Power User'"
          class="card bg-secondary"
          style="max-width: 25rem;"
        >
          <div class="card-header">
            <h5 class="section-title">Alertas</h5>
          </div>
          <div class="card-body">
            <h6>CITAS:</h6>
            <p
              v-if="
                this.$store.state.user.defaultStatus[
                  this.$store.state.user.defaultStatus.length - 1
                ].specialist_appo_psiqui == 'Si'
              "
              class="field"
            >
              <span class="bold">PSIQUIATRIA </span>
            </p>
            <p
              v-if="
                this.$store.state.user.defaultStatus[
                  this.$store.state.user.defaultStatus.length - 1
                ].specialist_appo_geria == 'Si'
              "
              class="field"
            >
              <span class="bold">GERIATRIA </span>
            </p>
            <p
              v-if="
                this.$store.state.user.defaultStatus[
                  this.$store.state.user.defaultStatus.length - 1
                ].specialist_appo_orto == 'Si'
              "
              class="field"
            >
              <span class="bold">ORTOPEDIA </span>
            </p>
            <p
              v-if="
                this.$store.state.user.defaultStatus[
                  this.$store.state.user.defaultStatus.length - 1
                ].specialist_appo_gastro == 'Si'
              "
              class="field"
            >
              <span class="bold">GASTROENTEROLOGIA </span>
            </p>
            <p
              v-if="
                this.$store.state.user.defaultStatus[
                  this.$store.state.user.defaultStatus.length - 1
                ].specialist_appo_oftal == 'Si'
              "
              class="field"
            >
              <span class="bold">OFTALMOLOGIA </span>
            </p>
            <p
              v-if="
                this.$store.state.user.defaultStatus[
                  this.$store.state.user.defaultStatus.length - 1
                ].specialist_appo_psicolo == 'Si'
              "
              class="field"
            >
              <span class="bold">PSICOLOGIA </span>
            </p>
            <p
              v-if="
                this.$store.state.user.defaultStatus[
                  this.$store.state.user.defaultStatus.length - 1
                ].specialist_appo_neurolo == 'Si'
              "
              class="field"
            >
              <span class="bold">NEUROLOGIA </span>
            </p>
            <p
              v-if="
                this.$store.state.user.defaultStatus[
                  this.$store.state.user.defaultStatus.length - 1
                ].specialist_appo_fisia == 'Si'
              "
              class="field"
            >
              <span class="bold">FISIATRIA </span>
            </p>
            <p
              v-if="
                this.$store.state.user.defaultStatus[
                  this.$store.state.user.defaultStatus.length - 1
                ].specialist_appo_cardio == 'Si'
              "
              class="field"
            >
              <span class="bold">CARDIOLOGIA </span>
            </p>
            <p
              v-if="
                this.$store.state.user.defaultStatus[
                  this.$store.state.user.defaultStatus.length - 1
                ].specialist_appo_odonto == 'Si'
              "
              class="field"
            >
              <span class="bold">ODONTOLOGIA </span>
            </p>
            <p
              v-if="
                this.$store.state.user.defaultStatus[
                  this.$store.state.user.defaultStatus.length - 1
                ].specialist_appo_urolo == 'Si'
              "
              class="field"
            >
              <span class="bold">UROLOGIA </span>
            </p>
            <p
              v-if="
                this.$store.state.user.defaultStatus[
                  this.$store.state.user.defaultStatus.length - 1
                ].specialist_appo_diabe == 'Si'
              "
              class="field"
            >
              <span class="bold">DIABETOLOGIA </span>
            </p>
            <br />
            <h6>NECESIDADES:</h6>
            <p
              v-if="
                this.$store.state.user.defaultStatus[
                  this.$store.state.user.defaultStatus.length - 1
                ]['Andador 4 Ruedas'] == 'Si'
              "
              class="field"
            >
              <span class="bold">ANDADOR DE 4 RUEDAS </span>
            </p>
            <p
              v-if="
                this.$store.state.user.defaultStatus[
                  this.$store.state.user.defaultStatus.length - 1
                ]['Andador 4 Patas'] == 'Si'
              "
              class="field"
            >
              <span class="bold">ANDADOR DE 4 PATAS </span>
            </p>
            <p
              v-if="
                this.$store.state.user.defaultStatus[
                  this.$store.state.user.defaultStatus.length - 1
                ]['Bastón'] == 'Si'
              "
              class="field"
            >
              <span class="bold">BASTON </span>
            </p>
            <p
              v-if="
                this.$store.state.user.defaultStatus[
                  this.$store.state.user.defaultStatus.length - 1
                ]['Bastón 4 P'] == 'Si'
              "
              class="field"
            >
              <span class="bold">BASTON 4 PATAS </span>
            </p>
            <p
              v-if="
                this.$store.state.user.defaultStatus[
                  this.$store.state.user.defaultStatus.length - 1
                ]['Bastón No VIdente'] == 'Si'
              "
              class="field"
            >
              <span class="bold">BASTON BLANCO (NO VIDENTE) </span>
            </p>
            <p
              v-if="
                this.$store.state.user.defaultStatus[
                  this.$store.state.user.defaultStatus.length - 1
                ]['Cama de Posición'] == 'Si'
              "
              class="field"
            >
              <span class="bold">CAMA DE POSICION </span>
            </p>
            <p
              v-if="
                this.$store.state.user.defaultStatus[
                  this.$store.state.user.defaultStatus.length - 1
                ]['Colchón Aire'] == 'Si'
              "
              class="field"
            >
              <span class="bold">COLCHON DE AIRE </span>
            </p>
            <p
              v-if="
                this.$store.state.user.defaultStatus[
                  this.$store.state.user.defaultStatus.length - 1
                ]['Faja Obdominal'] == 'Si'
              "
              class="field"
            >
              <span class="bold">FAJA ABDOMINAL </span>
            </p>
            <p
              v-if="
                this.$store.state.user.defaultStatus[
                  this.$store.state.user.defaultStatus.length - 1
                ]['Glucómetro'] == 'Si'
              "
              class="field"
            >
              <span class="bold">GLUCOMETRO </span>
            </p>
            <p
              v-if="
                this.$store.state.user.defaultStatus[
                  this.$store.state.user.defaultStatus.length - 1
                ]['Inodoro Porta'] == 'Si'
              "
              class="field"
            >
              <span class="bold">INODORO PORTATIL </span>
            </p>
            <p
              v-if="
                this.$store.state.user.defaultStatus[
                  this.$store.state.user.defaultStatus.length - 1
                ]['Muletas'] == 'Si'
              "
              class="field"
            >
              <span class="bold">MULETAS </span>
            </p>
            <p
              v-if="
                this.$store.state.user.defaultStatus[
                  this.$store.state.user.defaultStatus.length - 1
                ]['Pampers XL'] == 'Si'
              "
              class="field"
            >
              <span class="bold">PAMPERS / SIZE XL </span>
            </p>
            <p
              v-if="
                this.$store.state.user.defaultStatus[
                  this.$store.state.user.defaultStatus.length - 1
                ]['Pampers L'] == 'Si'
              "
              class="field"
            >
              <span class="bold">PAMPERS / SIZE L </span>
            </p>
            <p
              v-if="
                this.$store.state.user.defaultStatus[
                  this.$store.state.user.defaultStatus.length - 1
                ]['Pampers M'] == 'Si'
              "
              class="field"
            >
              <span class="bold">PAMPERS / SIZE M </span>
            </p>
            <p
              v-if="
                this.$store.state.user.defaultStatus[
                  this.$store.state.user.defaultStatus.length - 1
                ]['Pampers S'] == 'Si'
              "
              class="field"
            >
              <span class="bold">PAMPERS / SIZE S </span>
            </p>
            <p
              v-if="
                this.$store.state.user.defaultStatus[
                  this.$store.state.user.defaultStatus.length - 1
                ]['Silla de Baño'] == 'Si'
              "
              class="field"
            >
              <span class="bold">SILLA DE BAÑO </span>
            </p>
            <p
              v-if="
                this.$store.state.user.defaultStatus[
                  this.$store.state.user.defaultStatus.length - 1
                ]['Media de Comprensión'] == 'Si'
              "
              class="field"
            >
              <span class="bold">MEDIA DE COMPRESION 20-30 MM/HG </span>
            </p>
          </div>
        </div> -->
      </div>
      <br />
      <div
        v-show="!cargando"
        v-if="this.$store.state.user.type == 'Power User'"
        class="card bg-secondary"
        style="max-width: 100%;"
      >
        <div class="card-header">
          <h5 class="section-title">Evaluaciones</h5>
        </div>
        <div class="card-body grid-small">
          <table id="customers">
            <tr>
              <th class="title">NO.</th>
              <th>FECHA</th>
              <th>KIT</th>
              <th>DOCTOR</th>
            </tr>
            <tr
              style="cursor: pointer"
              @click="this.$router.push(`/evaluacions/${index}`)"
              v-for="(item, index) in this.$store.state.user.defaultStatus"
              :key="index"
            >
              <td class="der">{{ index + 1 }}</td>
              <td class="der">
                {{ formatDate(numeroAFecha(item.fecha, false)) }}
              </td>
              <td class="der">
                {{ item.kit }}
              </td>
              <td>
                {{ item.nombre_doctor }}
              </td>
            </tr>
          </table>
        </div>
      </div>
      <br />
      <div
        v-show="!cargando"
        v-if="this.$store.state.user.type == 'Power User'"
        class="card bg-secondary"
        style="max-width: 100%;"
      >
        <div class="card-header">
          <h5 class="section-title">Evolución de Medidas Antropométricas</h5>
        </div>
        <div class="card-body grid-small">
          <table id="customers">
            <tr>
              <th class="title">NO.</th>
              <th>FECHA</th>
              <!-- <th>TALLA</th> -->
              <th>PESO (Kg)</th>
              <th>CINTURA (cm)</th>
              <th>ABDOMEN (cm)</th>
              <th>CADERA (cm)</th>
              <!-- <th>ALTURA DE RODILLA (cm)</th> -->
              <th>CINTURA / CADERA</th>
            </tr>
            <tr
              style="cursor: pointer"
              @click="this.$router.push(`/evaluacions/${index}`)"
              v-for="(item, index) in this.$store.state.user.defaultStatus"
              :key="index"
            >
              <td class="der">{{ index + 1 }}</td>
              <td class="der">
                {{ formatDate(numeroAFecha(item.fecha, false)) }}
              </td>
              <!-- <td class="der">
                {{ item.talla }}
              </td> -->
              <td class="der">
                {{ item.peso }}
              </td>
              <td class="der">
                {{ item.cintura }}
              </td>
              <td class="der">
                {{ item.abdomen }}
              </td>
              <td class="der">
                {{ item.cadera }}
              </td>
              <!-- <td class="der">
                {{ item.altura_rodilla }}
              </td> -->
              <td class="der">
                {{ formatNumber(item["Cintura/Cadera"], true) }}
              </td>
            </tr>
          </table>
        </div>
      </div>
      <br />
      <div
        v-show="!cargando"
        v-if="this.$store.state.user.type == 'Power User'"
        class="card bg-secondary"
        style="max-width: 100%;"
      >
        <div class="card-header">
          <h5 class="section-title">Evolución de Evaluación Funcional</h5>
        </div>
        <div class="card-body grid-small">
          <table id="customers">
            <tr>
              <th class="title">NO.</th>
              <th>FECHA</th>
              <th>PRESION ARTERIAL SISTOLICA (mmHg)</th>
              <th>PRESION ARTERIAL DIASTOLICA (mmHg)</th>
              <th>FRECUENCIA CARDIACA (l/m)</th>
              <th>FUERZA (Kg)</th>
              <th>IMC (Kg/m)</th>
              <!-- <th>FLEXIBILIDAD DE MIEMBROS SUPERIORES (cm)</th> -->
              <!-- <th>FLEXIBILIDAD DE MIEMBROS INFERIORES (cm)</th> -->
              <th>PLIEGUE DE BICEPS (mm)</th>
              <th>PLIEGUE ABDOMINAL (mm)</th>
              <th>PLIEGUE SUBESCAPULAR (mm)</th>
            </tr>
            <tr
              style="cursor: pointer"
              @click="this.$router.push(`/evaluacions/${index}`)"
              v-for="(item, index) in this.$store.state.user.defaultStatus"
              :key="index"
            >
              <td class="der">{{ index + 1 }}</td>
              <td class="der">
                {{ formatDate(numeroAFecha(item.fecha, false)) }}
              </td>
              <td class="der">
                {{ item.presion_arterial_sistolica }}
              </td>
              <td class="der">
                {{ item.presion_arterial_diatolica }}
              </td>
              <td class="der">
                {{ item.frecuencia_cardiaca }}
              </td>
              <td class="der">
                {{ item.fuerza }}
              </td>
              <td class="der">
                {{ item.imc }}
              </td>
              <!-- <td class="der">
                {{ item.flexibilidad_miembro_superior }}
              </td> -->
              <!-- <td class="der">
                {{ item.flexibilidad_miembro_inferior }}
              </td> -->
              <td class="der">
                {{ item.pliegue_bicep }}
              </td>
              <td class="der">
                {{ item.pliegue_abdominal }}
              </td>
              <td class="der">
                {{ item.pliegue_sub }}
              </td>
            </tr>
          </table>
        </div>
      </div>

      <div class="grid">
        <!------------------------------------------ Campo ------------------------------------------>
        <!-- <div
          v-if="this.$store.state.user.type == 'Power User'"
          class="card bg-secondary"
        >
          <div class="card-body">
            <div>
              <p class="bold">Cantidad de Mejoras por Estatus</p>
              <table id="customers">
                <tr>
                  <th>Estatus</th>
                  <th>Cantidad</th>
                </tr>
                <tr v-for="(tipoMejora, index) in mejorasPend" :key="index">
                  <td>{{ tipoMejora._id.estatus }}</td>
                  <td class="der">
                    {{ formatNumber(tipoMejora.count, false) }}
                  </td>
                </tr>
              </table>
            </div>
          </div>
        </div> -->
        <!------------------------------------------ ***** ------------------------------------------>
        <!------------------------------------------ Campo ------------------------------------------>
        <!-- <div
          v-if="this.$store.state.user.type == 'Power User'"
          class="card bg-secondary"
        >
          <div class="card-body">
            <div>
              <p class="bold">Cantidad de Usuarios por Rol</p>
              <table id="customers">
                <tr>
                  <th>Estatus</th>
                  <th>Cantidad</th>
                </tr>
                <tr v-for="(item, index) in usuariosCant" :key="index">
                  <td>{{ item._id.role }}</td>
                  <td class="der">
                    {{ formatNumber(item.count, false) }}
                  </td>
                </tr>
              </table>
            </div>
          </div>
        </div> -->
        <!------------------------------------------ ***** ------------------------------------------>
        <!------------------------------------------ Campo ------------------------------------------>
        <!-- <div
          v-if="
            this.$store.state.user.type == 'Power User' ||
              this.$store.state.user.type == 'Encargado'
          "
          class="card bg-secondary"
        >
          <div class="card-body">
            <div>
              <p class="bold">Facturación a Fundación por Período</p>
              <table id="customers">
                <tr>
                  <th>Período</th>
                  <th>Servicios</th>
                  <th>Facturado</th>
                  <th>Disponible</th>
                </tr>
                <tr v-for="(item, index) in periodos" :key="index">
                  <td>{{ getMonth(item._id.month) }}</td>
                  <td class="der">
                    {{ formatNumber(item.count, false) }}
                  </td>
                  <td class="der">
                    {{ formatNumber(item.cobertura, true) }}
                  </td>
                  <td :class="formatTable(this.presupuesto - item.cobertura)">
                    {{ formatNumber(this.presupuesto - item.cobertura, true) }}
                  </td>
                </tr>
              </table>
            </div>
          </div>
        </div> -->
        <!------------------------------------------ ***** ------------------------------------------>
        <!------------------------------------------ Campo ------------------------------------------>
        <!-- <div
          v-show="!cargando"
          v-if="
            this.$store.state.user.type == 'Power User' ||
              this.$store.state.user.type == 'Encargado'
          "
          class="card bg-secondary"
        >
          <div class="card-body">
            <div
              v-show="!cargando"
              v-if="
                this.$store.state.user.type == 'Power User' ||
                  this.$store.state.user.type == 'Encargado'
              "
            >
              <p class="bold">
                Facturación a Senasa Subsidiado por Período
              </p>
              <table id="customers">
                <tr>
                  <th>Período</th>
                  <th>Servicios</th>
                  <th>Facturado</th>
                  <th>Disponible</th>
                </tr>
                <tr v-for="(item, index) in periodos2" :key="index">
                  <td>{{ getMonth(item._id.month) }}</td>
                  <td class="der">
                    {{ formatNumber(item.count, false) }}
                  </td>
                  <td class="der">
                    {{ formatNumber(item.cobertura, true) }}
                  </td>
                  <td :class="formatTable(this.presupuesto2 - item.cobertura)">
                    {{ formatNumber(this.presupuesto2 - item.cobertura, true) }}
                  </td>
                </tr>
              </table>
            </div>
          </div>
        </div> -->
        <!------------------------------------------ ***** ------------------------------------------>
        <!------------------------------------------ Campo ------------------------------------------>
        <!-- <div
          v-show="!cargando"
          v-if="
            this.$store.state.user.type == 'Power User' ||
              this.$store.state.user.type == 'Encargado' ||
              this.$store.state.user.type == 'Administrador'
          "
          class="card bg-secondary"
        >
          <div class="card-body">
            <div>
              <p class="bold">
                Registro de Productos por Día
              </p>
              <table id="customers">
                <tr>
                  <th>Día</th>
                  <th>Productos</th>
                </tr>
                <tr v-for="(item, index) in dias" :key="index">
                  <td>{{ item._id.day }}</td>
                  <td class="der">
                    {{ formatNumber(item.count, false) }}
                  </td>
                </tr>
                <tr>
                  <td>Total: {{ formatNumber(this.totales.dias) }}</td>
                  <td class="der">
                    {{ formatNumber(this.totales.cantProductos) }}
                  </td>
                </tr>
              </table>
            </div>
          </div>
        </div> -->
        <!------------------------------------------ ***** ------------------------------------------>
      </div>
      <!---------------------------------------- Finish Dashboard por Usuario ---------------------------------------->
      <br />
      <div
        v-show="!cargando"
        v-if="this.$store.state.user.type == 'Power User'"
        class="card bg-secondary"
        style="max-width: 100%;"
      >
        <div class="card-header">
          <h5 class="section-title">Evolución de Peso (Kg)</h5>
        </div>
        <div class="card-body">
          <div class="slds-p-top--medium">
            <div>
              <svg
                version="1.2"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                class="quiz-graph"
              >
                <defs>
                  <pattern
                    id="grid"
                    width="50"
                    height="50"
                    patternUnits="userSpaceOnUse"
                  >
                    <path
                      d="M 50 0 L 0 0 0 50"
                      fill="none"
                      stroke="#e5e5e5"
                      stroke-width="1"
                    ></path>
                  </pattern>
                </defs>
                <rect
                  x="50"
                  width="calc(100% - 50px)"
                  height="300px"
                  fill="url(#grid)"
                  stroke="gray"
                ></rect>

                <g class="label-title">
                  <text x="-160" y="5" transform="rotate(-90)">Peso</text>
                </g>
                <g class="label-title">
                  <text x="50%" y="350">Evaluaciones</text>
                </g>
                <g class="x-labels">
                  <text
                    v-for="(item, index) in this.$store.state.user
                      .defaultStatus"
                    :key="index"
                    :x="50 + (index + 1) * 50"
                    y="320"
                  >
                    {{ index + 1 }}
                  </text>
                </g>
                <g class="y-labels">
                  <text x="42" y="5">120</text>
                  <text x="42" y="55">100</text>
                  <text x="42" y="105">80</text>
                  <text x="42" y="155">60</text>
                  <text x="42" y="205">40</text>
                  <text x="42" y="255">20</text>
                  <text x="42" y="305">0</text>
                </g>
                <linearGradient id="grad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop
                    offset="0%"
                    style="stop-color:rgba(160,57,149,.5);stop-opacity:1"
                  ></stop>
                  <stop
                    offset="100%"
                    style="stop-color:white;stop-opacity:0"
                  ></stop>
                </linearGradient>
                <polyline
                  fill="url(#grad)"
                  stroke="#A03995"
                  stroke-width="0"
                  :points="this.$store.state.user.polyline_points"
                ></polyline>

                <polyline
                  fill="none"
                  stroke="#A03995"
                  stroke-width="2"
                  :points="this.$store.state.user.polyline_pointsAll"
                ></polyline>
                <g>
                  <circle
                    v-for="(item, index) in this.$store.state.user.valores"
                    :key="index"
                    class="quiz-graph-start-dot"
                    :cx="this.getCx(index)"
                    :cy="item"
                    data-value="7.2"
                    r="6"
                  ></circle>
                </g>
              </svg>
            </div>
          </div>
        </div>
      </div>
      <br />
      <div
        v-show="!cargando"
        v-if="this.$store.state.user.type == 'Power User'"
        class="card bg-secondary"
        style="max-width: 100%;"
      >
        <div class="card-header">
          <h5 class="section-title">Evolución de Imc (Kg/m)</h5>
        </div>
        <div class="card-body">
          <div class="slds-p-top--medium">
            <div>
              <svg
                version="1.2"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                class="quiz-graph"
              >
                <defs>
                  <pattern
                    id="grid"
                    width="50"
                    height="50"
                    patternUnits="userSpaceOnUse"
                  >
                    <path
                      d="M 50 0 L 0 0 0 50"
                      fill="none"
                      stroke="#e5e5e5"
                      stroke-width="1"
                    ></path>
                  </pattern>
                </defs>
                <rect
                  x="50"
                  width="calc(100% - 50px)"
                  height="300px"
                  fill="url(#grid)"
                  stroke="gray"
                ></rect>

                <g class="label-title">
                  <text x="-160" y="5" transform="rotate(-90)">Imc</text>
                </g>
                <g class="label-title">
                  <text x="50%" y="350">Evaluaciones</text>
                </g>
                <g class="x-labels">
                  <text
                    v-for="(item, index) in this.$store.state.user
                      .defaultStatus"
                    :key="index"
                    :x="50 + (index + 1) * 50"
                    y="320"
                  >
                    {{ index + 1 }}
                  </text>
                </g>
                <g class="y-labels">
                  <text x="42" y="5">120</text>
                  <text x="42" y="55">100</text>
                  <text x="42" y="105">80</text>
                  <text x="42" y="155">60</text>
                  <text x="42" y="205">40</text>
                  <text x="42" y="255">20</text>
                  <text x="42" y="305">0</text>
                </g>
                <linearGradient id="grad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop
                    offset="0%"
                    style="stop-color:rgba(160,57,149,.5);stop-opacity:1"
                  ></stop>
                  <stop
                    offset="100%"
                    style="stop-color:white;stop-opacity:0"
                  ></stop>
                </linearGradient>
                <polyline
                  fill="url(#grad)"
                  stroke="#A03995"
                  stroke-width="0"
                  :points="this.$store.state.user.polyline_pointsImc"
                ></polyline>

                <polyline
                  fill="none"
                  stroke="#A03995"
                  stroke-width="2"
                  :points="this.$store.state.user.polyline_pointsImcAll"
                ></polyline>
                <g>
                  <circle
                    v-for="(item, index) in this.$store.state.user.valoresImc"
                    :key="index"
                    class="quiz-graph-start-dot"
                    :cx="this.getCx(index)"
                    :cy="item"
                    data-value="7.2"
                    r="6"
                  ></circle>
                </g>
              </svg>
            </div>
          </div>
        </div>
      </div>
      <br />
      <div
        v-show="!cargando"
        v-if="this.$store.state.user.type == 'Power User'"
        class="card bg-secondary"
        style="max-width: 100%;"
      >
        <div class="card-header">
          <h5 class="section-title">Evolución de Fuerza (Kg)</h5>
        </div>
        <div class="card-body">
          <div class="slds-p-top--medium">
            <div>
              <svg
                version="1.2"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                class="quiz-graph"
              >
                <defs>
                  <pattern
                    id="grid"
                    width="50"
                    height="50"
                    patternUnits="userSpaceOnUse"
                  >
                    <path
                      d="M 50 0 L 0 0 0 50"
                      fill="none"
                      stroke="#e5e5e5"
                      stroke-width="1"
                    ></path>
                  </pattern>
                </defs>
                <rect
                  x="50"
                  width="calc(100% - 50px)"
                  height="300px"
                  fill="url(#grid)"
                  stroke="gray"
                ></rect>

                <g class="label-title">
                  <text x="-160" y="5" transform="rotate(-90)">Fuerza</text>
                </g>
                <g class="label-title">
                  <text x="50%" y="350">Evaluaciones</text>
                </g>
                <g class="x-labels">
                  <text
                    v-for="(item, index) in this.$store.state.user
                      .defaultStatus"
                    :key="index"
                    :x="50 + (index + 1) * 50"
                    y="320"
                  >
                    {{ index + 1 }}
                  </text>
                </g>
                <g class="y-labels">
                  <text x="42" y="5">120</text>
                  <text x="42" y="55">100</text>
                  <text x="42" y="105">80</text>
                  <text x="42" y="155">60</text>
                  <text x="42" y="205">40</text>
                  <text x="42" y="255">20</text>
                  <text x="42" y="305">0</text>
                </g>
                <linearGradient id="grad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop
                    offset="0%"
                    style="stop-color:rgba(160,57,149,.5);stop-opacity:1"
                  ></stop>
                  <stop
                    offset="100%"
                    style="stop-color:white;stop-opacity:0"
                  ></stop>
                </linearGradient>
                <polyline
                  fill="url(#grad)"
                  stroke="#A03995"
                  stroke-width="0"
                  :points="this.$store.state.user.polyline_pointsFuerza"
                ></polyline>

                <polyline
                  fill="none"
                  stroke="#A03995"
                  stroke-width="2"
                  :points="this.$store.state.user.polyline_pointsFuerzaAll"
                ></polyline>
                <g>
                  <circle
                    v-for="(item, index) in this.$store.state.user
                      .valoresFuerza"
                    :key="index"
                    class="quiz-graph-start-dot"
                    :cx="this.getCx(index)"
                    :cy="item"
                    data-value="7.2"
                    r="6"
                  ></circle>
                </g>
              </svg>
            </div>
          </div>
        </div>
      </div>
      <br />
      <!-- <div
        v-show="!cargando"
        v-if="this.$store.state.user.type == 'Power User'"
        class="card bg-secondary"
        style="max-width: 100%;"
      >
        <div class="card-header">
          <h5 class="section-title">Evolución de Cintura (cm)</h5>
        </div>
        <div class="card-body">
          <div class="slds-p-top--medium">
            <div>
              <svg
                version="1.2"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                class="quiz-graph"
              >
                <defs>
                  <pattern
                    id="grid"
                    width="50"
                    height="50"
                    patternUnits="userSpaceOnUse"
                  >
                    <path
                      d="M 50 0 L 0 0 0 50"
                      fill="none"
                      stroke="#e5e5e5"
                      stroke-width="1"
                    ></path>
                  </pattern>
                </defs>
                <rect
                  x="50"
                  width="calc(100% - 50px)"
                  height="300px"
                  fill="url(#grid)"
                  stroke="gray"
                ></rect>

                <g class="label-title">
                  <text x="-160" y="5" transform="rotate(-90)">Cintura</text>
                </g>
                <g class="label-title">
                  <text x="50%" y="350">Evaluaciones</text>
                </g>
                <g class="x-labels">
                  <text
                    v-for="(item, index) in this.$store.state.user
                      .defaultStatus"
                    :key="index"
                    :x="50 + (index + 1) * 50"
                    y="320"
                  >
                    {{ index + 1 }}
                  </text>
                </g>
                <g class="y-labels">
                  <text x="42" y="5">120</text>
                  <text x="42" y="55">100</text>
                  <text x="42" y="105">80</text>
                  <text x="42" y="155">60</text>
                  <text x="42" y="205">40</text>
                  <text x="42" y="255">20</text>
                  <text x="42" y="305">0</text>
                </g>
                <linearGradient
                  id="gradCintura"
                  x1="0%"
                  y1="0%"
                  x2="0%"
                  y2="100%"
                >
                  <stop
                    offset="0%"
                    style="stop-color:rgba(160,57,149,.5);stop-opacity:1"
                  ></stop>
                  <stop
                    offset="100%"
                    style="stop-color:white;stop-opacity:0"
                  ></stop>
                </linearGradient>
                <polyline
                  fill="url(#gradCintura)"
                  stroke="#A03995"
                  stroke-width="0"
                  :points="this.$store.state.user.polyline_pointsCintura"
                ></polyline>

                <polyline
                  fill="none"
                  stroke="#A03995"
                  stroke-width="2"
                  :points="this.$store.state.user.polyline_pointsCinturaAll"
                ></polyline>
                <g>
                  <circle
                    v-for="(item, index) in this.$store.state.user
                      .valoresCintura"
                    :key="index"
                    class="quiz-graph-start-dot"
                    :cx="this.getCx(index)"
                    :cy="item"
                    data-value="7.2"
                    r="6"
                  ></circle>
                </g>
              </svg>
            </div>
          </div>
        </div>
      </div>
      <br /> -->

      <br />
      <!-- <div
        v-show="!cargando"
        v-if="this.$store.state.user.type == 'Power User'"
        class="card bg-secondary"
        style="max-width: 100%;"
      >
        <div class="card-header">
          <h5 class="section-title">Evolución de Abdomen (cm)</h5>
        </div>
        <div class="card-body">
          <div class="slds-p-top--medium">
            <div>
              <svg
                version="1.2"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                class="quiz-graph"
              >
                <defs>
                  <pattern
                    id="grid"
                    width="50"
                    height="50"
                    patternUnits="userSpaceOnUse"
                  >
                    <path
                      d="M 50 0 L 0 0 0 50"
                      fill="none"
                      stroke="#e5e5e5"
                      stroke-width="1"
                    ></path>
                  </pattern>
                </defs>
                <rect
                  x="50"
                  width="calc(100% - 50px)"
                  height="300px"
                  fill="url(#grid)"
                  stroke="gray"
                ></rect>

                <g class="label-title">
                  <text x="-160" y="5" transform="rotate(-90)">Abdomen</text>
                </g>
                <g class="label-title">
                  <text x="50%" y="350">Evaluaciones</text>
                </g>
                <g class="x-labels">
                  <text
                    v-for="(item, index) in this.$store.state.user
                      .defaultStatus"
                    :key="index"
                    :x="50 + (index + 1) * 50"
                    y="320"
                  >
                    {{ index + 1 }}
                  </text>
                </g>
                <g class="y-labels">
                  <text x="42" y="5">120</text>
                  <text x="42" y="55">100</text>
                  <text x="42" y="105">80</text>
                  <text x="42" y="155">60</text>
                  <text x="42" y="205">40</text>
                  <text x="42" y="255">20</text>
                  <text x="42" y="305">0</text>
                </g>
                <linearGradient
                  id="gradAbdomen"
                  x1="0%"
                  y1="0%"
                  x2="0%"
                  y2="100%"
                >
                  <stop
                    offset="0%"
                    style="stop-color:rgba(160,57,149,.5);stop-opacity:1"
                  ></stop>
                  <stop
                    offset="100%"
                    style="stop-color:white;stop-opacity:0"
                  ></stop>
                </linearGradient>
                <polyline
                  fill="url(#gradAbdomen)"
                  stroke="#A03995"
                  stroke-width="0"
                  :points="this.$store.state.user.polyline_pointsAbdomen"
                ></polyline>

                <polyline
                  fill="none"
                  stroke="#A03995"
                  stroke-width="2"
                  :points="this.$store.state.user.polyline_pointsAbdomenAll"
                ></polyline>
                <g>
                  <circle
                    v-for="(item, index) in this.$store.state.user
                      .valoresAbdomen"
                    :key="index"
                    class="quiz-graph-start-dot"
                    :cx="this.getCx(index)"
                    :cy="item"
                    data-value="7.2"
                    r="6"
                  ></circle>
                </g>
              </svg>
            </div>
          </div>
        </div>
      </div>
      <br /> -->
      <!-- <div
        v-show="!cargando"
        v-if="this.$store.state.user.type == 'Power User'"
        class="card bg-secondary"
        style="max-width: 100%;"
      >
        <div class="card-header">
          <h5 class="section-title">Evolución de Cadera (cm)</h5>
        </div>
        <div class="card-body">
          <div class="slds-p-top--medium">
            <div>
              <svg
                version="1.2"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                class="quiz-graph"
              >
                <defs>
                  <pattern
                    id="grid"
                    width="50"
                    height="50"
                    patternUnits="userSpaceOnUse"
                  >
                    <path
                      d="M 50 0 L 0 0 0 50"
                      fill="none"
                      stroke="#e5e5e5"
                      stroke-width="1"
                    ></path>
                  </pattern>
                </defs>
                <rect
                  x="50"
                  width="calc(100% - 50px)"
                  height="300px"
                  fill="url(#grid)"
                  stroke="gray"
                ></rect>

                <g class="label-title">
                  <text x="-160" y="5" transform="rotate(-90)">Cadera</text>
                </g>
                <g class="label-title">
                  <text x="50%" y="350">Evaluaciones</text>
                </g>
                <g class="x-labels">
                  <text
                    v-for="(item, index) in this.$store.state.user
                      .defaultStatus"
                    :key="index"
                    :x="50 + (index + 1) * 50"
                    y="320"
                  >
                    {{ index + 1 }}
                  </text>
                </g>
                <g class="y-labels">
                  <text x="42" y="5">120</text>
                  <text x="42" y="55">100</text>
                  <text x="42" y="105">80</text>
                  <text x="42" y="155">60</text>
                  <text x="42" y="205">40</text>
                  <text x="42" y="255">20</text>
                  <text x="42" y="305">0</text>
                </g>
                <linearGradient
                  id="gradCadera"
                  x1="0%"
                  y1="0%"
                  x2="0%"
                  y2="100%"
                >
                  <stop
                    offset="0%"
                    style="stop-color:rgba(160,57,149,.5);stop-opacity:1"
                  ></stop>
                  <stop
                    offset="100%"
                    style="stop-color:white;stop-opacity:0"
                  ></stop>
                </linearGradient>
                <polyline
                  fill="url(#gradCadera)"
                  stroke="#A03995"
                  stroke-width="0"
                  :points="this.$store.state.user.polyline_pointsCadera"
                ></polyline>

                <polyline
                  fill="none"
                  stroke="#A03995"
                  stroke-width="2"
                  :points="this.$store.state.user.polyline_pointsCaderaAll"
                ></polyline>
                <g>
                  <circle
                    v-for="(item, index) in this.$store.state.user
                      .valoresCadera"
                    :key="index"
                    class="quiz-graph-start-dot"
                    :cx="this.getCx(index)"
                    :cy="item"
                    data-value="7.2"
                    r="6"
                  ></circle>
                </g>
              </svg>
            </div>
          </div>
        </div>
      </div> 
      <br /> -->
    </div>
    <!-- Supervisor en Sitio Dashboard -->
    <div v-show="!cargando" class="general">
      <h3 v-if="this.$store.state.user.type == 'Supervisor en Sitio'">
        Mi Perfil
      </h3>
      <!-- Component Start -->
      <div class="container mt-5">
        <div class="row d-flex justify-content-center">
          <div class="col-md-7">
            <div class="card p-3 py-4">
              <div class="text-center">
                <img
                  :src="this.$store.state.user.profileImg"
                  width="100"
                  class="rounded-circle"
                />
              </div>

              <div class="text-center mt-3">
                <h5 class="mt-2 mb-0">{{ this.$store.state.user.usuario }}</h5>
                <span>{{ this.$store.state.user.type }}</span>

                <div class="px-4 mt-1">
                  <p class="fonts">
                    {{ this.$store.state.user.username }} |
                    {{ this.$store.state.user.email }}
                  </p>
                </div>

                <div v-if="this.$store.state.user.username == 'rmedinaa'" class="buttons">
                  <button
                    @click="openCorrectRegistr()"
                    class="btn btn-outline-primary px-4"
                  >
                    Abrir Corrector de Registros
                  </button>
                </div>

                <!-- <ul class="social-list">
                  <li><i class="fa fa-facebook"></i></li>
                  <li><i class="fa fa-dribbble"></i></li>
                  <li><i class="fa fa-instagram"></i></li>
                  <li><i class="fa fa-linkedin"></i></li>
                  <li><i class="fa fa-google"></i></li>
                </ul> -->
                <br />
                <div class="buttons">
                  <button
                    @click="selectImage"
                    class="btn btn-outline-primary px-4"
                  >
                    Seleccionar Imágen de Perfil
                  </button>
                </div>
                <!-- handdle image upload Start -->
                <div>
                  <form id="imageForm">
                    <input
                      v-show="false"
                      id="imageInput"
                      type="file"
                      ref="fileInput"
                      @input="uploadFile"
                      accept="image/*"
                    />
                    <!-- <button @click.prevent="uploadFile()">Upload</button> -->
                  </form>
                </div>
                <!-- handdle image upload Finish -->
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- Component Finish -->

      <button
        v-if="this.$store.state.user.type == 'NUTRIMED'"
        @click="this.$router.push('/evaluacions')"
        class="btn btn-success btn-sm"
        type="button"
      >
        <i class="fas fa-file" _mstvisible="2"></i> Evaluaciones
      </button>

      <!-- <div v-if="this.$store.state.user.type == 'CPN'" class="grid">
        Pacientes ♦ Visitas Domiciliarias ♦ Alertas ♦ Insumos Requeridos ♦
        Visitas Especializadas ♦ Reportes ♦ Informes
      </div> -->
      <!-- <iframe
        v-if="this.$store.state.user.type == 'CPN'"
        width="960"
        height="720"
        src="https://us-east-1.quicksight.aws.amazon.com/sn/embed/share/accounts/537976118724/dashboards/9507e421-2c38-45e9-bd82-8a67fbf9a1f2?directory_alias=isys-quicksight-account"
      >
      </iframe> -->

      <!-- <div v-if="this.$store.state.user.type == 'CPN'">
      
        <div v-for="data in myJson">{{data}}</div>
    </div> -->

      <div v-if="this.$store.state.user.type == 'CPN'">
        <br />
      </div>
    </div>
    <div v-show="!cargando" class="general">
      <h3 v-if="this.$store.state.user.type == 'CPN'">
        Dashboard CPN
      </h3>

      <div v-if="this.$store.state.user.type == 'CPN'" class="grid">
        Pacientes ♦ Visitas Domiciliarias ♦ Alertas ♦ Insumos Requeridos ♦
        Visitas Especializadas ♦ Reportes ♦ Informes
      </div>
      <iframe
        v-if="this.$store.state.user.type == 'CPN'"
        width="960"
        height="720"
        src="https://us-east-1.quicksight.aws.amazon.com/sn/embed/share/accounts/537976118724/dashboards/9507e421-2c38-45e9-bd82-8a67fbf9a1f2?directory_alias=isys-quicksight-account"
      >
      </iframe>

      <!-- <div v-if="this.$store.state.user.type == 'CPN'">
      
        <div v-for="data in myJson">{{data}}</div>
    </div> -->

      <div v-if="this.$store.state.user.type == 'CPN'">
        <br />
      </div>
    </div>
    <div v-show="!cargando" class="general">
      <h3 v-if="this.$store.state.user.type == 'ARS-SENASA'">
        Dashboard ARS SENASA
      </h3>
      <div v-if="this.$store.state.user.type == 'ARS-SENASA'" class="grid">
        Pacientes ♦ Alertas ♦ Informes
      </div>

      <iframe
        v-if="this.$store.state.user.type == 'ARS-SENASA'"
        width="1250"
        height="1500"
        src="https://us-east-1.quicksight.aws.amazon.com/sn/embed/share/accounts/537976118724/dashboards/e0add80c-c03c-4f3d-8838-b6fa026b9a16?directory_alias=isys-quicksight-account"
      >
      </iframe>

      <br />
    </div>
  </div>
</template>

<script lang="ts">
import axios, { AxiosInstance, AxiosResponse } from "axios";
import Navbar from "@/components/Navbar.vue";
import { getDash } from "@/services/dashboard/dashboardService";
import { getS3Url } from "@/services/s3/s3Service";
import numeral from "numeral";
import Pusher from "pusher-js";
import moment from "moment";
import { generateUploadURL } from "./s3.js";
export default {
  name: "DashboardView",
  components: {
    Navbar,
  },

  data() {
    return {
      // previewImage: null,
      // selectedFile: null,
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
    };
  },

  methods: {

    openCorrectRegistr(){
      this.$router.push("/fixRegister");
    },  
    // Start Image Upload
    selectImage() {
      this.$refs.fileInput.click();
    },

    pickFile() {
      let input = this.$refs.fileInput;
      let file = input.files;
      if (file && file[0]) {
        let reader = new FileReader();
        reader.onload = (e) => {
          this.previewImage = e.target.result;
        };
        reader.readAsDataURL(file[0]);
        this.$emit("input", file[0]);
      }
    },

    pickFile2() {
      let input = this.$refs.fileInput;
      let file = input.files;
      const file2 = file[0];
    },

    async uploadFile() {
      this.toggleLoading();
      let input = this.$refs.fileInput;
      let file = input.files;
      const file2 = file[0];

      const url = await getS3Url(this.$store.state.user.username);
      // console.log(url);

      await fetch(url.data, {
        method: "PUT",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        body: file2,
      });
      this.toggleLoading();

      if (
        confirm(
          "Los cambios tardan unos minutos en aplicarse, deberá reiniciar la sesión para aplicar los mismos, ¿Desea Continuar?"
        )
      ) {
        this.$router.push("/");
        this.$store.dispatch("logoutAction");
      }
    },

    // Finish Image Upload

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
/* Finish Image Upload */
/* @import url(//db.onlinewebfonts.com/c/07c59baffb7b091cefbe80dd2d731661?family=Magistral);
@font-face {
  font-family: "Magistral";
  src: url("//db.onlinewebfonts.com/t/07c59baffb7b091cefbe80dd2d731661.eot");
  src: url("//db.onlinewebfonts.com/t/07c59baffb7b091cefbe80dd2d731661.eot?#iefix")
      format("embedded-opentype"),
    url("//db.onlinewebfonts.com/t/07c59baffb7b091cefbe80dd2d731661.woff2")
      format("woff2"),
    url("//db.onlinewebfonts.com/t/07c59baffb7b091cefbe80dd2d731661.woff")
      format("woff"),
    url("//db.onlinewebfonts.com/t/07c59baffb7b091cefbe80dd2d731661.ttf")
      format("truetype"),
    url("//db.onlinewebfonts.com/t/07c59baffb7b091cefbe80dd2d731661.svg#Magistral")
      format("svg");
}

.section-title {
  font-family: Magistral;
} */

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
