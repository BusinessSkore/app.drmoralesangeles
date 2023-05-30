<template>
  <nav>
    <div class="content">
      <nav :class="navMenuClas">
        <!-- Opciones Generales -->
        <a
          style="color: white"
          class="navbar-option"
          @click="this.hamburger('Cerrar Sesión')"
          href="#"
          ><i class="fas fa-sign-out-alt"></i> Cerrar Sesión</a
        >
        <a
          style="color: white"
          class="navbar-option"
          @click="this.hamburger('Mi Perfil')"
          href="#"
          ><i class="fas fa-user"></i> Mi Perfil</a
        >

        <a
          style="color: white"
          class="navbar-option"
          @click="this.$router.push('/dashboard')"
          href="#"
          ><i class="fas fa-columns"></i> Dashboard</a
        >
        <!-- Opciones Particulares -->
        <a
          v-if="
            this.$store.state.user.type == 'Gerente de operaciones' ||
              this.$store.state.user.type == 'Coordinador de Operaciones'
          "
          style="color: white"
          class="navbar-option"
          @click="this.$router.push('/centros')"
          href="#"
          ><i class="far fa-building"></i> Centros</a
        >

        <a
          v-if="
            this.$store.state.user.type == 'Supervisor en Sitio' ||
              this.$store.state.user.type == 'Médico Nutricionista Domiciliario'
          "
          style="color: white"
          class="navbar-option"
          @click="this.$router.push('/validate_evaluacions')"
          href="#"
          ><i class="fas fa-user-check"></i> Validar Afiliado</a
        >

        <a
          v-if="
            this.$store.state.user.type == 'Médico Nutricionista Domiciliario'
          "
          style="color: white"
          class="navbar-option"
          @click="this.$router.push('/listevalssupSitio')"
          href="#"
          ><i class="fas fa-list"></i> Listado de Evaluaciones</a
        >

        <a
          v-if="this.$store.state.user.type == 'Supervisor en Sitio'"
          style="color: white"
          class="navbar-option"
          @click="this.$router.push('/listevalssupSitio')"
          href="#"
          ><i class="fas fa-list"></i> Jornadas</a
        >

        <a
          v-if="this.$store.state.user.type == 'Supervisor General'"
          style="color: white"
          class="navbar-option"
          @click="this.$router.push('/listevalssupGener')"
          href="#"
          ><i class="fas fa-list"></i> Jornadas</a
        >

        <a
          v-if="
            this.$store.state.user.type == 'Médico Nutricionista' ||
              this.$store.state.user.type == 'Auditora Interna'
          "
          style="color: white"
          class="navbar-option"
          @click="this.$router.push('/evaluacions')"
          href="#"
          ><i class="fas fa-list"></i> Jornadas</a
        >

        <a
          v-if="this.$store.state.user.type == 'Auxiliar de Verificación'"
          style="color: white"
          class="navbar-option"
          @click="this.$router.push('/evaluacionsprtscn')"
          href="#"
          ><i class="fas fa-list"></i> Jornadas</a
        >

        <a
          v-if="
            this.$store.state.user.type == 'Encargada de Facturación' ||
              this.$store.state.user.type == 'Agente de Autorización'
          "
          style="color: white"
          class="navbar-option"
          @click="this.$router.push('/encFactEvalsAuto')"
          href="#"
          ><i class="fas fa-list"></i> Autorizaciones</a
        >

        <a
          v-if="
            this.$store.state.user.type ==
              'Subgerente de Promoción de la Salud y Prevención de la Enfermedad (P&P)'
          "
          style="color: white"
          class="navbar-option"
          @click="this.$router.push('/expediente')"
          href="#"
          ><i class="far fa-file-alt"></i> Expediente</a
        >
      </nav>

      <nav>
        <div class="mycontainer">
          <a
            class="item navbar-brand"
            @click="this.$router.push(`/dashboard`)"
            href="#"
          >
            <img
              class="localIMG"
              :src="
                'https://isys-assets-bucket.s3.amazonaws.com/logos/logoWhite.png'
              "
            />
            Elder <span class="version"> {{ this.systemVersion }}</span>
          </a>
          <a class="item navbar-brand userName" @click="hamburger()" href="#">
            <img
              class="rounded-circle"
              :src="this.$store.state.user.profileImg"
            />
            {{ this.$store.state.user.usuario }}
            <i :class="desplegar"></i>
          </a>
        </div>
      </nav>
    </div>
  </nav>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { getVersion } from "@/services/systems/Systems";

export default defineComponent({
  name: "Nav-bar",

  data() {
    return {
      systemVersion: "V 5.5.0",
      systemName: "elderstatistic",
      desplegar: "fas fa-caret-down",
      showMenu: false,
      showName: false,
      showFactura: false,
      navMenuClas: ["menu-navegacion"],
    };
  },

  // async mounted() {
  //   this.loadVersion();
  // },

  methods: {
    async loadVersion() {
      alert("Obteniendo Versión del Sistema");

      try {
        const res = await getVersion(this.systemName);
        this.evaluacions = res.data;
      } catch (error) {
        console.error(error);
      }
    },

    hamburger(texto: string) {
      switch (texto) {
        case "Cxcs":
          this.$router.push("/cxcs");
          break;
        case "Empleados":
          this.$router.push("/empleados");
          break;
        case "Reclamos":
          this.$router.push("/reclamos");
          break;
        case "Especialistas":
          this.$router.push("/especialistas");
          break;
        case "Llamadas":
          this.$router.push("/llamadas");
          break;
        case "Productos":
          this.$router.push("/productos");
          break;
        case "Dashboard":
          this.$router.push("/dashboard");
          break;
        case "Usuarios":
          this.$router.push("/usuarios");
          break;
        case "Mejoras":
          this.$router.push("/mejoras");
          break;
        case "Mi Perfil":
          this.$router.push("/miPerfil");
          break;
        case "Cerrar Sesión":
          this.salir();
          break;
      }
      if (this.navMenuClas.length == 1) {
        this.navMenuClas.push("spread");
        this.desplegar = "fas fa-caret-up";
      } else {
        this.navMenuClas.pop();
        this.desplegar = "fas fa-caret-down";
      }
    },

    tglMenu() {
      this.showMenu = !this.showMenu;
    },

    tshowFactura() {
      (this.showName = false), (this.showFactura = !this.showFactura);
    },

    tglName() {
      this.showName = !this.showName;
      this.showFactura = false;
    },

    salir() {
      this.$router.push("/");
      this.$store.dispatch("logoutAction");
    },
  },
});
</script>

<style scoped>
.myrounded-circle {
  border-radius: 50%;
  height: 25px;
  width: 25px;
  /* Hay que formatear imagen antes de guardarla para que esté totalmente cuadrada  como en ws */
}

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

.navbar-brand {
  font-family: Magistral;
}

.navbar-option:hover {
  color: rgb(160, 57, 149);
  font-size: 14px;
  font-weight: bold;
}

.userName:hover {
  color: rgb(160, 57, 149);
}

.userName {
  font-size: 12px;
}

img {
  /* display: block; */
  /* margin-left: auto; */
  /* margin-right: auto; */
  width: 20px;
  /* margin-bottom: 10px; */
}

.navbar-option {
  margin: 7px;
  font-size: 13px;
}

.line {
  width: 100%;
  /* max-width: 1200px; */
  margin: 0 auto;
  height: 2px;
  background: rgb(160, 57, 149);
  /* margin-bottom: 60px; */
}

.mycontainer {
  /* height: 40px; */
  background-color: rgb(82, 45, 109);

  /* padding: 5px; */

  display: flex;
  justify-content: space-between;
  margin-top: 0px;
}

.navbar-brand {
  color: white;
  /* font-family: "Copperplate Gothic Light"; */
  margin-left: 12px;
  /* font-size: 24px; */
  /* font-weight: 700; */
  line-height: 24px;
}

.navbar-brand2 {
  color: white;
  margin-right: 28px;
  margin-top: 7px;
}

.navbar-option {
  color: white;
  /* font-family: "Agency FB Bold"; */
  text-decoration: none;
}

.version {
  font-size: 50%;
  font-family: "Agency FB Bold";
}

li {
  font-size: 75%;
}

/* Menú Lateral Móvil*/

.menu-navegacion {
  position: fixed;
  top: 34px;
  right: 0;
  width: 15vw;
  height: 100%;
  background-image: linear-gradient(
    180deg,
    rgb(82, 45, 109) 0%,
    rgb(82, 45, 109) 100%
  );
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: left;
  transition: transform 0.3s ease-in-out;
  transform: translate(110%);
  box-shadow: 0 0 6px rgba(35, 47, 62, 0.5);
  z-index: 100;
  padding-left: 10px;
  padding-top: 0px;
  overflow-y: scroll;
}

.spread {
  transform: translate(0);
}

.equis {
  position: absolute;
  top: 7px;
  right: 10px;
  color: #fff;
  font-size: 12px;
  cursor: pointer;
}

.name {
  position: absolute;
  top: 40px;
  right: 10px;
  color: #fff;
  font-size: 15px;
}

/* .closeSesion {
  position: absolute;
  bottom: 0;
  right: 10px;
  color: #fff;
  font-size: 13px;
  cursor: pointer;
} */

.versionNumber {
  position: absolute;
  bottom: 0;
  left: 10px;
  color: #fff;
  /* font-size: 15px; */
  /* cursor: pointer; */
}

/* Responsiveness */
@media screen and (max-width: 800px) {
  .menu-navegacion {
    width: 50vw;
  }
}

@media screen and (max-width: 500px) {
  .menu-navegacion {
    width: 65vw;
  }
}

/* nav { */
/* position: fixed; */
/* width: 100%; */
/* left: 0; */
/* top: 0; */
/* } */

nav {
  position: fixed;
  width: 100%;
  margin-top: 0;
  z-index: 100;
}
</style>
