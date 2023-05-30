<template>
  <!-- {{this.flexCheckDefault}}<br/>
{{this.passwordFieldType}} -->
  <!-- <button @click="arreglar()">Arreglar</button> -->
  <!-- {{ this.usuario.email }} -->
  <Transition>
    <div v-if="cargando" class="spin">
      <img
        class="img"
        :src="'https://isys-assets-bucket.s3.amazonaws.com/logos/logo.png'"
      />
    </div>
  </Transition>

  <div v-if="showModal" class="modal">
    <div class="contenedor">
      <header>Información</header>
      <div class="contenido">
        <label @click="this.showModalMethod()" for="btn-modal" class="close"
          >Cerrar</label
        >
        <div class="contenido">
          <a target="_blank" href="https://elderstatistic.com/">
            <img
              class="flyer2"
              src="https://isys-assets-bucket.s3.amazonaws.com/flayer.165fa0a8.png"
            />
          </a>
        </div>
      </div>
    </div>
  </div>
  <Transition>
    <div v-show="!cargando" class="general">
      <div class="row">
        <div class="side">
          <form>
            <fieldset>
              <div class="row2">
                <img
                  class="localIMG"
                  :src="
                    'https://isys-assets-bucket.s3.amazonaws.com/logos/logo.png'
                  "
                />
                <!-- <h1>Elder</h1> -->
              </div>
              <h5>
                <!-- <div v-if="cargando" class="spin">Iniciando Sesión, Por Favor Espere...</div> -->
              </h5>
              <div>
                <h5>Iniciar Sesión</h5>
                <!-- <legend>Iniciar Sesión</legend> -->
                <!-- <h6>Por favor, ingrese sus credenciales.</h6> -->
                <h6 class="error">{{ error }}</h6>
                <div class="form-group">
                  <div class="grid">
                    <div>
                      <label
                        class="col-form-label col-form-label-sm mt-4"
                        for="username"
                        >Nombre de usuario</label
                      ><input
                        class="form-control"
                        type="text"
                        id="username"
                        v-model="usuario.username"
                      />
                    </div>
                    <div>
                      <label
                        class="col-form-label col-form-label-sm mt-4"
                        for="password"
                        >Contraseña</label
                      ><input
                        class="form-control"
                        :type="passwordFieldType"
                        id="password"
                        v-model="usuario.password"
                      />
                    </div>
                    <fieldset class="form-group">
                      <div class="form-check">
                        <input
                          @change="this.togglePasswordFieldType()"
                          class="form-check-input"
                          type="checkbox"
                          value=""
                          v-model="flexCheckDefault"
                          id="flexCheckDefault"
                        />
                        <label class="form-check-label" for="flexCheckDefault">
                          Mostrar Contraseña
                        </label>
                      </div>
                    </fieldset>
                  </div>
                </div>

                <button class="btn btn-primary" @click.prevent="login()">
                  Iniciar Sesión
                </button>
                <h6>¿No tienes cuenta?</h6>
                <!-- <h6>
                  <router-link class="nav-link" to="/signup"
                    >Regístrate</router-link
                  >
                </h6> -->
                <button
                  class="btn btn-secondary"
                  @click.prevent="this.$router.push(`/signup`)"
                >
                  Regístrate
                </button>
              </div>
            </fieldset>
          </form>
        </div>
        <div class="main">
          <a target="_blank" href="https://elderstatistic.com/">
            <img
              class="flyer"
              src="https://isys-assets-bucket.s3.amazonaws.com/flayer.165fa0a8.png"
            />
          </a>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script lang="ts">
import { loginUsuario } from "@/services/usuario/UsuarioService";
import { getAll } from "@/services/centro/Centro";
import { Usuario } from "@/interfaces/Usuario";
export default {
  name: "LoginView",
  components: {},

  data() {
    return {
      passwordFieldType: "password",
      flexCheckDefault: false,
      showModal: true,
      cargando: false,
      error: "",
      usuario: {} as Usuario,
    };
  },

  // mounted() {
  //   this.loadCentros();
  // },

  methods: {
    async loadCentros() {
      try {
        const res = await getAll();
        this.$store.state.user.centros = res.data.centros;
        this.$store.state.user.filteredCentros = res.data.centros;
      } catch (error) {
        console.error(error);
      }
    },

    togglePasswordFieldType() {
      if (this.flexCheckDefault == false) {
        this.passwordFieldType = "password";
      } else {
        this.passwordFieldType = "text";
      }
    },
    calcPctoGrasa() {
      let input = {
        bicep: 4.0,
        abd: 5.0,
        sub: 7.0,
      };

      let result = 12.4;

      let response = {
        input: input,
        result: result,
      };

      return response;
    },

    getValue(originalValue: number) {
      let result;
      let rangoVertical = 20;
      let relacionCambiaria = originalValue / rangoVertical;
      let valorVertical = 50;

      let sustraendo = relacionCambiaria * valorVertical;
      let totalVertical = 300;
      result = totalVertical - sustraendo;
      return result;
    },

    calcPolyline_points(isAll: boolean) {
      let couple;
      let points: string[] = [];
      if (isAll) {
        points = ["100,300"];
      } else {
        points = [];
      }

      let scale = 100;
      for (let i = 0; i < this.$store.state.user.defaultStatus.length; i++) {
        couple =
          scale +
          "," +
          this.getValue(this.$store.state.user.defaultStatus[i].peso);
        this.$store.state.user.valores.push(
          this.getValue(this.$store.state.user.defaultStatus[i].peso)
        );
        this.$store.state.user.valores2.push(scale);
        points.push(couple);
        scale = scale + 50;
      }
      if (isAll) {
        points.push(`${scale - 50},300`);
      }

      let str = "";

      for (let i = 0; i < points.length; i++) {
        str = str + points[i] + " ";
      }

      return str;
    },

    calcPolyline_pointsCintura(isAll: boolean) {
      let couple;
      let points: string[] = [];
      if (isAll) {
        points = ["100,300"];
      } else {
        points = [];
      }

      let scale = 100;
      for (let i = 0; i < this.$store.state.user.defaultStatus.length; i++) {
        couple =
          scale +
          "," +
          this.getValue(this.$store.state.user.defaultStatus[i].cintura);
        this.$store.state.user.valoresCintura.push(
          this.getValue(this.$store.state.user.defaultStatus[i].cintura)
        );
        this.$store.state.user.valoresCintura2.push(scale);
        points.push(couple);
        scale = scale + 50;
      }
      if (isAll) {
        points.push(`${scale - 50},300`);
      }

      let str = "";

      for (let i = 0; i < points.length; i++) {
        str = str + points[i] + " ";
      }

      return str;
    },

    calcPolyline_pointsAbdomen(isAll: boolean) {
      let couple;
      let points: string[] = [];
      if (isAll) {
        points = ["100,300"];
      } else {
        points = [];
      }

      let scale = 100;
      for (let i = 0; i < this.$store.state.user.defaultStatus.length; i++) {
        couple =
          scale +
          "," +
          this.getValue(this.$store.state.user.defaultStatus[i].abdomen);
        this.$store.state.user.valoresAbdomen.push(
          this.getValue(this.$store.state.user.defaultStatus[i].abdomen)
        );
        this.$store.state.user.valoresAbdomen2.push(scale);
        points.push(couple);
        scale = scale + 50;
      }
      if (isAll) {
        points.push(`${scale - 50},300`);
      }

      let str = "";

      for (let i = 0; i < points.length; i++) {
        str = str + points[i] + " ";
      }

      return str;
    },

    calcPolyline_pointsCadera(isAll: boolean) {
      let couple;
      let points: string[] = [];
      if (isAll) {
        points = ["100,300"];
      } else {
        points = [];
      }

      let scale = 100;
      for (let i = 0; i < this.$store.state.user.defaultStatus.length; i++) {
        couple =
          scale +
          "," +
          this.getValue(this.$store.state.user.defaultStatus[i].cadera);
        this.$store.state.user.valoresCadera.push(
          this.getValue(this.$store.state.user.defaultStatus[i].cadera)
        );
        this.$store.state.user.valoresCadera2.push(scale);
        points.push(couple);
        scale = scale + 50;
      }
      if (isAll) {
        points.push(`${scale - 50},300`);
      }

      let str = "";

      for (let i = 0; i < points.length; i++) {
        str = str + points[i] + " ";
      }

      return str;
    },

    calcPolyline_pointsImc(isAll: boolean) {
      let couple;
      let points: string[] = [];
      if (isAll) {
        points = ["100,300"];
      } else {
        points = [];
      }

      let scale = 100;
      for (let i = 0; i < this.$store.state.user.defaultStatus.length; i++) {
        couple =
          scale +
          "," +
          this.getValue(this.$store.state.user.defaultStatus[i].imc);
        this.$store.state.user.valoresImc.push(
          this.getValue(this.$store.state.user.defaultStatus[i].imc)
        );
        this.$store.state.user.valoresImc2.push(scale);
        points.push(couple);
        scale = scale + 50;
      }
      if (isAll) {
        points.push(`${scale - 50},300`);
      }

      let str = "";

      for (let i = 0; i < points.length; i++) {
        str = str + points[i] + " ";
      }

      return str;
    },
    calcPolyline_pointsFuerza(isAll: boolean) {
      let couple;
      let points: string[] = [];
      if (isAll) {
        points = ["100,300"];
      } else {
        points = [];
      }

      let scale = 100;
      for (let i = 0; i < this.$store.state.user.defaultStatus.length; i++) {
        couple =
          scale +
          "," +
          this.getValue(this.$store.state.user.defaultStatus[i].fuerza);
        this.$store.state.user.valoresFuerza.push(
          this.getValue(this.$store.state.user.defaultStatus[i].fuerza)
        );
        this.$store.state.user.valoresFuerza2.push(scale);
        points.push(couple);
        scale = scale + 50;
      }
      if (isAll) {
        points.push(`${scale - 50},300`);
      }

      let str = "";

      for (let i = 0; i < points.length; i++) {
        str = str + points[i] + " ";
      }

      return str;
    },

    showModalMethod() {
      this.showModal = !this.showModal;
    },

    arreglar() {
      this.usuario.email = this.usuario.email.toLowerCase().trim();
    },

    toggleLoading() {
      this.cargando = !this.cargando;
    },

    // login() {
    //   this.$store.dispatch("loginAction");
    //   this.$store.state.user.type = this.role;
    //   this.$store.state.user.usuario = this.usuario;
    //
    // },

    async login() {
      this.toggleLoading();
      await loginUsuario(this.usuario).then(
        (res) => {
          if (res.status === 200) {
            // localStorage.setItem("token", res.data.token);
            this.$store.dispatch("loginAction");
            this.$store.state.user.type = res.data.user.role;
            this.$store.state.user.usuario = res.data.user.name;
            this.$store.state.user.username = res.data.user.username;
            this.$store.state.user.email = res.data.user.email;
            this.$store.state.user.profileImg = `https://isys-assets-bucket.s3.amazonaws.com/usuarios/${this.$store.state.user.username}.jpg`;

            this.$router.push("/dashboard");
          }
        },
        (err) => {
          if (err.response.status === 403) {
            this.error = err.response.data.message;
          } else if (err.response.status === 401) {
            this.error = err.response.data.message;
          } else {
            this.error =
              "Sorry.... the backend server is down!! please try again later";
          }
        }
      );
      this.toggleLoading();
    },

    // async login() {

    //   if (
    //     this.usuario.email == "MVASQUEZ" ||
    //     this.usuario.password == "liamarie"
    //   ) {
    //     this.$store.dispatch("loginAction");
    //     this.$store.state.user.type = "NUTRIMED";
    //     this.$store.state.user.usuario = "MAYFER VASQUEZ";
    //     // this.$store.state.user.defaultStatus = this.laCanela;
    //     this.$router.push("/dashboard");
    //   } else {
    //     if (
    //       this.usuario.email == "ARS-SENASA" ||
    //       this.usuario.password == "ARS-SENASA2023"
    //     ) {
    //       this.$store.dispatch("loginAction");
    //       this.$store.state.user.type = "ARS-SENASA";
    //       this.$store.state.user.usuario = "ARS SENASA";
    //       this.$store.state.user.defaultStatus = this.laCanela;
    //       this.$router.push("/dashboard");
    //     } else {
    //       if (
    //         this.usuario.email == "LA CANELA" ||
    //         this.usuario.password == "LA CANELA303"
    //       ) {
    //         this.$store.dispatch("loginAction");
    //         this.$store.state.user.type = "CPN";
    //         this.$store.state.user.usuario = "LA CANELA";
    //         this.$store.state.user.defaultStatus = this.laCanela;
    //         this.$router.push("/dashboard");
    //       } else {
    //         if (this.usuario.email != this.usuario.password) {
    //           alert("Credenciales Inválidas");
    //         } else {
    //           this.toggleLoading();
    //           // let user = {
    //           //   email: this.email,
    //           //   password: this.password,
    //           // };
    //           this.arreglar();
    //           await loginUsuario(this.usuario).then(
    //             // axios.post("http://localhost:5000/login", user).then(
    //             (res) => {
    //               //if successfull
    //               if (res.status === 200) {
    //                 // localStorage.setItem("token", res.data.token);
    //                 //Authenticated True
    //                 this.$store.dispatch("loginAction");
    //                 this.$store.state.user.valores = [];
    //                 this.$store.state.user.valores2 = [];

    //                 this.$store.state.user.valoresCintura = [];
    //                 this.$store.state.user.valoresCintura2 = [];

    //                 this.$store.state.user.valoresAbdomen = [];
    //                 this.$store.state.user.valoresAbdomen2 = [];

    //                 this.$store.state.user.valoresCadera = [];
    //                 this.$store.state.user.valoresCadera2 = [];

    //                 this.$store.state.user.valoresImc = [];
    //                 this.$store.state.user.valoresImc2 = [];

    //                 this.$store.state.user.valoresImc = [];
    //                 this.$store.state.user.valoresImc2 = [];

    //                 this.$store.state.user.valoresFuerza = [];
    //                 this.$store.state.user.valoresFuerza2 = [];

    //                 this.$store.state.user.type = "Power User";
    //                 // alert(res.data.usuario.role)
    //                 this.$store.state.user.usuario =
    //                   res.data.Items[0].nombre +
    //                   " " +
    //                   res.data.Items[0].apellido;

    //                 let cedulaAfiliadoActual = res.data.Items[0].cedula;
    //                 let urlPartOne = cedulaAfiliadoActual.slice(0, 3);
    //                 let urlPartTwo = cedulaAfiliadoActual.slice(4, 6);
    //                 let urlPartThree = cedulaAfiliadoActual.slice(6, 8);
    //                 // this.imageUrl = `http://www.arssenasa.gov.do/Sistemas/afiliacion/fotos/${urlPartOne}/${urlPartTwo}/${urlPartThree}/${cedulaAfiliadoActual}.jpg`;

    //                 this.$store.state.user.imageUrl = `http://www.arssenasa.gov.do/Sistemas/afiliacion/fotos/${urlPartOne}/${urlPartTwo}/${urlPartThree}/${cedulaAfiliadoActual}.jpg`;

    //                 this.$store.state.user.defaultStatus = res.data.Items;
    //                 // Peso-----------------------------------------------------------------
    //                 this.$store.state.user.polyline_points = this.calcPolyline_points(
    //                   true
    //                 );
    //                 this.$store.state.user.polyline_pointsAll = this.calcPolyline_points(
    //                   false
    //                 );
    //                 // Cintura-----------------------------------------------------------------
    //                 this.$store.state.user.polyline_pointsCintura = this.calcPolyline_pointsCintura(
    //                   true
    //                 );
    //                 this.$store.state.user.polyline_pointsCinturaAll = this.calcPolyline_pointsCintura(
    //                   false
    //                 );
    //                 // Abdomen-----------------------------------------------------------------
    //                 this.$store.state.user.polyline_pointsAbdomen = this.calcPolyline_pointsAbdomen(
    //                   true
    //                 );
    //                 this.$store.state.user.polyline_pointsAbdomenAll = this.calcPolyline_pointsAbdomen(
    //                   false
    //                 );

    //                 // Cadera-----------------------------------------------------------------
    //                 this.$store.state.user.polyline_pointsCadera = this.calcPolyline_pointsCadera(
    //                   true
    //                 );
    //                 this.$store.state.user.polyline_pointsCaderaAll = this.calcPolyline_pointsCadera(
    //                   false
    //                 );

    //                 // Imc-----------------------------------------------------------------
    //                 this.$store.state.user.polyline_pointsImc = this.calcPolyline_pointsImc(
    //                   true
    //                 );
    //                 this.$store.state.user.polyline_pointsImcAll = this.calcPolyline_pointsImc(
    //                   false
    //                 );

    //                 // Fuerza-----------------------------------------------------------------
    //                 this.$store.state.user.polyline_pointsFuerza = this.calcPolyline_pointsFuerza(
    //                   true
    //                 );
    //                 this.$store.state.user.polyline_pointsFuerzaAll = this.calcPolyline_pointsFuerza(
    //                   false
    //                 );

    //                 // this.$store.state.user.aseguradoras = res.data.usuario.aseguradoras;
    //                 this.$router.push("/dashboard");
    //               }
    //             },
    //             (err) => {
    //               // console.log(err.response);
    //               this.error = err.response.data.error;
    //             }
    //           );
    //           this.toggleLoading();
    //         }
    //       }
    //     }
    //   }
    // },
  },
};
</script>

<style lang="css" scoped>
@import url(//db.onlinewebfonts.com/c/07c59baffb7b091cefbe80dd2d731661?family=Magistral);
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

h1 {
  font-family: Magistral;
}

.close {
  margin-top: 13px;
  margin-right: 15px;
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
  background: rgba(0, 0, 0, 0.5);
  transition: all 500ms ease;
}

.contenedor {
  width: 700px;
  height: 300;
  margin: auto;
  background: #fff;
  box-shadow: 1px 7px 25px rgba(0, 0, 0, 0.5);
  transition: all 500ms ease;
  position: relative;
}

.contenedor header {
  padding: 10px;
  background: rgb(82, 45, 109);
  color: #fff;
}

.contenedor label {
  position: absolute;
  top: 10px;
  right: 10px;
  color: white;
  font-size: 15px;
  cursor: pointer;
}

.contenido {
  padding: 7px;
}

/* End Modal */

h1 {
  margin-top: 7px;
  margin-left: 10px;
}
h5 {
  margin-top: 20px;
  margin-bottom: 20px;
  font-weight: bold;
  color: rgb(51, 55, 60);
}

.row2 {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
}

.side2 {
  flex: 40%;
}

/* Main column */
.main2 {
  flex: 60%;
}

.row {
  display: flex;
  flex-wrap: wrap;
}

.side {
  flex: 40%;
  /* background-color: #f1f1f1; */
  /* padding: 20px; */
}

/* Main column */
.main {
  flex: 60%;
  /* background-color: white; */
  /* padding: 20px; */
}

@media screen and (max-width: 700px) {
  .row {
    flex-direction: column;
  }
}

* {
  box-sizing: border-box;
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

* {
  margin: 0;
}

.general {
  width: 100%;
  margin: 0px auto;
  max-width: 1000px;
  margin: 0px auto;
}

.grid-title {
  display: grid;
  grid-auto-flow: dense;
  grid-template-rows: auto auto;
  gap: 3px;
  grid-template-columns: repeat(auto-fit, minmax(5rem, 1fr));
  /* height: 100px; */
}

.grid {
  display: grid;
  grid-auto-flow: dense;
  grid-template-rows: auto auto;
  gap: 3px;
  grid-template-columns: repeat(auto-fit, minmax(100%, 1fr));
}

form {
  background-color: white;
  border-radius: 4px;
  padding: 10%;
}

.error {
  color: white;
  text-align: center;
  margin-top: 20px;
  margin-bottom: 20px;
  background-color: rgb(255, 85, 85);
}

legend,
.nav-link {
  /* color: rgb(160, 57, 149); */
  text-align: center;
  line-height: 1;
  margin: 0;
}

input,
select,
textarea {
  border-radius: 4px;
}

.form-label {
  background-color: rgb(220, 220, 220);
  width: 100%;
  color: rgb(160, 57, 149);
  border-radius: 7px;
}

/* .texto_responsive:before {
  content: attr(data-desktoptext);
} */

/* @media (max-width: 900px) {
  .texto_responsive:before {
    content: attr(data-tablettext);
  }
} */

/* @media (max-width: 400px) {
  .texto_responsive:before {
    content: attr(data-phonetext);
  }
} */

h2 {
  color: white;
  font-weight: bold;
  text-align: center;
}

h6 {
  color: rgb(70, 70, 70);
  font-weight: bold;
  text-align: center;
  margin-top: 30px;
  margin-bottom: 10px;
}

button {
  /* background-color: rgb(82, 45, 109);
  color: white; */
  width: 100%;
  border-radius: 4px;
  margin-top: 30px;
}

label {
  /* font-weight: bold; */
  line-height: 0;
}

.localIMG {
  /* display: block;
  margin-left: auto;
  margin-right: auto; */
  width: 48.75%;
  margin-bottom: 10px;
}

.flyer {
  width: 100%;
  margin-top: 120px;
  margin-bottom: 20px;
}

.flyer2 {
  width: 100%;
  /* margin-top: 120px;
  margin-bottom: 20px; */
}

/* .ta-r {
  text-align: right;
} */

.img {
  pointer-events: none;
  width: 55px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

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

h5 {
  /* color: rgb(82, 45, 109);
  font-weight: bold; */
  text-align: center;
}

.ta-c {
  text-align: center;
}
</style>
