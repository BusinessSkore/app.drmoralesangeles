<template>
  <div v-if="cargando" class="spin">
    <img
      class="img"
      :src="'https://isys-assets-bucket.s3.amazonaws.com/logos/logo.png'"
    />
  </div>
  <div v-show="!cargando" class="general">
    <form>
      <fieldset>
        <img
          :src="'https://isys-assets-bucket.s3.amazonaws.com/logos/logo.png'"
        />
        <legend><b>Crear Cuenta</b></legend>
        <h6>Por favor, ingrese sus datos.</h6>
        <h6 class="error">{{ error }}</h6>
        <div class="form-group">
          <div class="grid">
            <div>
              <label class="col-form-label col-form-label-sm mt-4" for="name"
                >Nombre Completo</label
              ><input
                class="form-control"
                type="text"
                id="name"
                v-model="usuario.name"
              />
            </div>
            <div>
              <label class="col-form-label col-form-label-sm mt-4" for="email"
                >Correo electrónico</label
              ><input
                class="form-control"
                type="text"
                id="email"
                v-model="usuario.email"
              />
            </div>
            <div>
              <label
                class="col-form-label col-form-label-sm mt-4"
                for="username"
                >Usuario</label
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
            <div>
              <label
                class="col-form-label col-form-label-sm mt-4"
                for="confirmPassword"
                >Confirmar Contraseña</label
              ><input
                class="form-control"
                :type="passwordFieldType"
                id="password"
                v-model="confirmPassword"
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
                  Mostrar Contraseñas
                </label>
              </div>
            </fieldset>
          </div>
        </div>
        <button class="btn btn-primary" @click.prevent="signup()">
          Crear Cuenta
        </button>
        <h6>¿Ya tienes cuenta?</h6>
        <h6>
          <router-link class="nav-link" to="/">Iniciar Sesión</router-link>
        </h6>
      </fieldset>
    </form>
  </div>
</template>

<script lang="ts">
import { registerUsuario } from "@/services/usuario/UsuarioService";
import { Usuario } from "@/interfaces/Usuario";
export default {
  name: "LoginView",
  components: {},

  data() {
    return {
      confirmPassword: "",
      passwordFieldType: "password",
      flexCheckDefault: false,
      cargando: false,
      error: "",
      usuario: {} as Usuario,
      respuesta: {},
      resp: {},
    };
  },

  updated() {
    if (this.usuario.name) {this.usuario.name = this.usuario.name.toUpperCase();}
    if (this.usuario.email) {this.usuario.email = this.usuario.email.toUpperCase();}
    if (this.usuario.username) {this.usuario.username = this.usuario.username.toUpperCase();}
  },

  methods: {
    togglePasswordFieldType() {
      if (this.flexCheckDefault == false) {
        this.passwordFieldType = "password";
      } else {
        this.passwordFieldType = "text";
      }
    },

    toggleLoading() {
      this.cargando = !this.cargando;
    },

    async signup() {
      if (this.usuario.password == this.confirmPassword) {
        if (
          !this.usuario.name ||
          !this.usuario.email ||
          !this.usuario.username ||
          !this.usuario.password
        ) {
          this.error = "Todos los Campos son Requeridos";
        } else {
          if (this.usuario.password.length >= 8) {
            this.toggleLoading();
            const resp = await registerUsuario(this.usuario).then(
              (res) => {
                this.error = "";
                this.$router.push("/");
                this.resp = resp;
                this.respuesta = res;
              },
              (err) => {
                if (err.response.status === 401) {
                  this.error = err.response.data.message;
                } else {
                  this.error =
                    "Sorry.... the backend server is down!! please try again later";
                }
              }
            );
            this.toggleLoading();
          } else {
            alert("La contraseña debe tener 8 caracteres mínimo");
          }
        }
      } else {
        alert("Las Contraseñas no Coinciden");
      }
    },

    // login() {
    //   this.$store.dispatch("loginAction");
    //   this.$store.state.user.type = this.role;
    //   this.$router.push("/dashboard");
    // },
  },
};
</script>

<style lang="css" scoped>
* {
  margin: 0;
}

.general {
  width: 100%;
  max-width: 25rem;
  margin: 0px auto;
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
  /* box-shadow: 2px 2px 10px rgb(199, 199, 199); */
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
  color: rgb(160, 57, 149);
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

.texto_responsive:before {
  content: attr(data-desktoptext);
}

@media (max-width: 900px) {
  .texto_responsive:before {
    content: attr(data-tablettext);
  }
}

@media (max-width: 400px) {
  .texto_responsive:before {
    content: attr(data-phonetext);
  }
}

h2 {
  color: white;
  font-weight: bold;
  text-align: center;
}

h6 {
  color: rgb(70, 70, 70);
  font-weight: bold;
  text-align: center;
}

button {
  background-color: rgb(82, 45, 109);
  color: white;
  width: 100%;
  border-radius: 4px;
  margin-top: 30px;
}

label {
  /* font-weight: bold; */
  line-height: 0;
}

img {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 25%;
  margin-bottom: 10px;
}

.ta-r {
  text-align: right;
}

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
  color: rgb(82, 45, 109);
  font-weight: bold;
  text-align: center;
}
</style>
