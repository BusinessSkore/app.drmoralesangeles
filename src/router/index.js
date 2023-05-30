import { createRouter, createWebHistory } from "vue-router";

import store from "../store";

import GuestLayout from "../layouts/GuestLayout.vue";
import LogIn from "../views/LogInView.vue";
import SignUp from "../views/SignUpView.vue";

import DashboardLayout from "../layouts/DashboardLayout.vue";
import Dashboard from "../views/DashboardView.vue";

import Perfil from "../views/PerfilView.vue";
import FixRegister from "../views/FixRegisterView.vue";

let allRoles = [
  "Supervisor en Sitio",
  "Médico Nutricionista",
  "Subgerente de Promoción de la Salud y Prevención de la Enfermedad (P&P)",
  "Supervisor General",
  "Gerente de Operaciones",
  "Coordinador de Operaciones",
  "Auxiliar de Validación",
  "Auxiliar de Convocatoria",
  "Auditora Interna",
  "Encargada de Facturación",
  "Encargada de Verificación",
  "Analista de Datos",
  "Gerencia ARS SeNaSa",
  "Agente de Autorización",
  "Gestor ARS SeNaSa",
  "Médico Nutricionista Domiciliario",
  "Administrador de Datos"
];

// Centro -------------------------------------------------------------------

import CentroComponent from "../components/Centro/PrincipalComponent.vue";
import CentroDetailComponent from "../components/Centro/FormComp.vue";
import CentroPrintComponent from "../components/Centro/PrintComponent.vue";
import CentroFormComp from "../components/Centro/FormComp.vue";

// Componentes por Roles -------------------------------------------------------------------

// encargada de Verificación -------------------------------------------------------------------
import encVerifEvaluacionComponent from "../components/encVerif/PrincipalComponent.vue";
import encVerifDetailsFormComp from "../components/encVerif/SeguiFormComp.vue";

// Médico Nutricionista
import medNutricEvaluacionComponent from "../components/medNutric/PrincipalComponent.vue";
import MedNutriFormComp from "../components/medNutric/CompleteFormComp.vue";

// Supervisor en Sitio
import supSitioEvaluacionValidate from "../components/supSitio/OpenFormComp.vue";
import supSitioEvaluacionComponent from "../components/supSitio/PrincipalComponent.vue";
import supSitioDetailsFormComp from "../components/supSitio/SeguiFormComp.vue";

// Supervisor General
import supGenerEvaluacionComponent from "../components/supGener/PrincipalComponent.vue";
import supGenerEvaluacionsDetails from "../components/supGener/SeguiFormComp.vue";
// import supSitioEvaluacionValidate from "../components/supSitio/OpenFormComp.vue";
// import supSitioDetailsFormComp from "../components/supSitio/SeguiFormComp.vue";

// Encargada de Facturacion
import encFactEvalsAutoComponent from "../components/encFact/PrincipalComponent.vue";
import encFactEvalsAutoDetailsComponent from "../components/encFact/FactsFormComp.vue";

// Auxiliar de Validación
import listevalsauxvalidComponent from "../components/auxValid/PrincipalPrtscnComponent.vue";
import printEvaluacionsSpprts from "../components/auxValid/printEvaluacionsSpprts.vue";
import printEvaluacionScan from "../components/auxValid/printEvaluacionScan.vue";

// Evaluacion -------------------------------------------------------------------

import CompleteFormComp from "../components/Evaluacion/CompleteFormComp.vue";
import FacturedFormComp from "../components/Evaluacion/FactsFormComp.vue";
import SeguiFormComp from "../components/Evaluacion/SeguiFormComp.vue";
import OpenEvaluacionComponent from "../components/Evaluacion/OpenFormComp.vue";
import EvaluacionComponent from "../components/Evaluacion/PrincipalComponent.vue";
import EvaluacionFactsComponent from "../components/Evaluacion/PrincipalFactsComponent.vue";
import EvaluacionPrtscnComponent from "../components/Evaluacion/PrincipalPrtscnComponent.vue";
import EvaluacionCierreComponent from "../components/Evaluacion/PrincipalCierreComponent.vue";
import EvaluacionDetailComponent from "../components/Evaluacion/FormComp.vue";
import EvaluacionPrintComponent from "../components/Evaluacion/PrintComponent.vue";
import EvaluacionFormComp from "../components/Evaluacion/FormComp.vue";

const routes = [
  {
    path: "/",
    component: GuestLayout,
    children: [
      {
        path: "/",
        name: "LogIn",
        component: LogIn,
      },
      {
        path: "/signup",
        name: "SignUp",
        component: SignUp,
      },
    ],
  },
  {
    path: "/dashboard",
    component: DashboardLayout,
    meta: {
      requiresAuth: true,
    },
    children: [
      {
        path: "/",
        name: "Dashboard",
        component: Dashboard,
        meta: {
          roles: allRoles,
        },
      },

      // Centro --------------------------------------------------------------------
      {
        path: "/centros",
        name: "centros",
        component: CentroComponent,
        meta: {
          roles: [
            "Supervisor en Sitio",
            "Médico Nutricionista",
            "Subgerente de Promoción de la Salud y Prevención de la Enfermedad (P&P)",
            "Supervisor General",
            "Gerente de Operaciones",
            "Coordinador de Operaciones",
            "Auxiliar de Verificación",
            "Auxiliar de Convocatoria",
            "Auditora Interna",
            "Encargada de Facturación",
          ],
        },
      },
      {
        path: "/centros/:id",
        name: "centro-details",
        component: CentroDetailComponent,
        meta: {
          roles: [
            "Supervisor en Sitio",
            "Médico Nutricionista",
            "Subgerente de Promoción de la Salud y Prevención de la Enfermedad (P&P)",
            "Supervisor General",
            "Gerente de Operaciones",
            "Coordinador de Operaciones",
            "Auxiliar de Verificación",
            "Auxiliar de Convocatoria",
            "Auditora Interna",
            "Encargada de Facturación",
          ],
        },
      },
      {
        path: "/centros2/:id",
        name: "centro-details2",
        component: CentroPrintComponent,
        meta: {
          roles: [
            "Supervisor en Sitio",
            "Médico Nutricionista",
            "Subgerente de Promoción de la Salud y Prevención de la Enfermedad (P&P)",
            "Supervisor General",
            "Gerente de Operaciones",
            "Coordinador de Operaciones",
            "Auxiliar de Verificación",
            "Auxiliar de Convocatoria",
            "Auditora Interna",
            "Encargada de Facturación",
          ],
        },
      },
      {
        path: "/centros/new",
        name: "centros-form",
        component: CentroFormComp,
        meta: {
          roles: [
            "Supervisor en Sitio",
            "Médico Nutricionista",
            "Subgerente de Promoción de la Salud y Prevención de la Enfermedad (P&P)",
            "Supervisor General",
            "Gerente de Operaciones",
            "Coordinador de Operaciones",
            "Auxiliar de Verificación",
            "Auxiliar de Convocatoria",
            "Auditora Interna",
            "Encargada de Facturación",
          ],
        },
      },

      // Evaluacion --------------------------------------------------------------------
      {
        path: "/validate_evaluacions",
        name: "validate_evaluacions",
        component: supSitioEvaluacionValidate,
        meta: {
          roles: ["Supervisor en Sitio", "Médico Nutricionista Domiciliario"],
        },
      },
      {
        path: "/openEvaluacions",
        name: "openEvaluacions",
        component: OpenEvaluacionComponent,
        meta: {
          roles: [
            "Supervisor en Sitio",
            "Médico Nutricionista",
            "Subgerente de Promoción de la Salud y Prevención de la Enfermedad (P&P)",
            "Supervisor General",
            "Gerente de Operaciones",
            "Coordinador de Operaciones",
            "Auxiliar de Verificación",
            "Auxiliar de Convocatoria",
            "Auditora Interna",
            "Encargada de Facturación",
          ],
        },
      },
      {
        path: "/evaluacions",
        name: "evaluacions",
        component: EvaluacionComponent,
        meta: {
          roles: [
            "Supervisor en Sitio",
            "Médico Nutricionista",
            "Subgerente de Promoción de la Salud y Prevención de la Enfermedad (P&P)",
            "Supervisor General",
            "Gerente de Operaciones",
            "Coordinador de Operaciones",
            "Auxiliar de Verificación",
            "Auxiliar de Convocatoria",
            "Auditora Interna",
            "Encargada de Facturación",
          ],
        },
      },
      {
        path: "/listevalsencvalid",
        name: "listevalsencvalid",
        component: encVerifEvaluacionComponent,
        meta: {
          roles: ["Encargada de Verificación"],
        },
      },
      {
        path: "/listevalsmednutric",
        name: "listevalsmednutric",
        component: medNutricEvaluacionComponent,
        meta: {
          roles: ["Médico Nutricionista", "Médico Nutricionista Domiciliario"],
        },
      },
      {
        path: "/listevalssupSitio",
        name: "listevalssupSitio",
        component: supSitioEvaluacionComponent,
        meta: {
          roles: ["Supervisor en Sitio", "Médico Nutricionista Domiciliario"],
        },
      },
      {
        path: "/listevalssupGener",
        name: "listevalssupGener",
        component: supGenerEvaluacionComponent,
        meta: {
          roles: ["Supervisor General"],
        },
      },
      {
        path: "/evaluacionscierre",
        name: "evaluacionscierre",
        component: EvaluacionCierreComponent,
        meta: {
          roles: [
            "Supervisor en Sitio",
            "Médico Nutricionista",
            "Subgerente de Promoción de la Salud y Prevención de la Enfermedad (P&P)",
            "Supervisor General",
            "Gerente de Operaciones",
            "Coordinador de Operaciones",
            "Auxiliar de Verificación",
            "Auxiliar de Convocatoria",
            "Auditora Interna",
            "Encargada de Facturación",
          ],
        },
      },
      {
        path: "/listevalsauxvalid",
        name: "listevalsauxvalid",
        component: listevalsauxvalidComponent,
        meta: {
          roles: ["Auxiliar de Validación"],
        },
      },
      {
        path: "/evaluacionsprtscn",
        name: "evaluacionsprtscn",
        component: EvaluacionPrtscnComponent,
        meta: {
          roles: [
            "Supervisor en Sitio",
            "Médico Nutricionista",
            "Subgerente de Promoción de la Salud y Prevención de la Enfermedad (P&P)",
            "Supervisor General",
            "Gerente de Operaciones",
            "Coordinador de Operaciones",
            "Auxiliar de Verificación",
            "Auxiliar de Convocatoria",
            "Auditora Interna",
            "Encargada de Facturación",
          ],
        },
      },
      {
        path: "/encFactEvalsAuto",
        name: "encFactEvalsAuto",
        component: encFactEvalsAutoComponent,
        meta: {
          roles: [
            "Supervisor en Sitio",
            "Médico Nutricionista",
            "Subgerente de Promoción de la Salud y Prevención de la Enfermedad (P&P)",
            "Supervisor General",
            "Gerente de Operaciones",
            "Coordinador de Operaciones",
            "Auxiliar de Verificación",
            "Auxiliar de Convocatoria",
            "Auditora Interna",
            "Encargada de Facturación",
            "Agente de Autorización",
          ],
        },
      },
      {
        path: "/printEvaluacionScan",
        name: "printEvaluacionScan",
        component: printEvaluacionScan,
        meta: {
          roles: ["Auxiliar de Validación"],
        },
      },
      {
        path: "/printEvaluacionsSpprts",
        name: "printEvaluacionsSpprts",
        component: printEvaluacionsSpprts,
        meta: {
          roles: ["Auxiliar de Validación"],
        },
      },

      {
        path: "/evaluacions_details",
        name: "supSitio-evaluacion-details",
        component: supSitioDetailsFormComp,
        meta: {
          roles: ["Supervisor en Sitio", "Médico Nutricionista Domiciliario"],
        },
      },

      {
        path: "/verifications_details",
        name: "encVerif-evaluacion-details",
        component: encVerifDetailsFormComp,
        meta: {
          roles: ["Encargada de Verificación"],
        },
      },
      {
        path: "/evaluacions/:index",
        name: "evaluacion-details",
        component: SeguiFormComp,
        meta: {
          roles: [
            "Supervisor en Sitio",
            "Médico Nutricionista",
            "Subgerente de Promoción de la Salud y Prevención de la Enfermedad (P&P)",
            "Supervisor General",
            "Gerente de Operaciones",
            "Coordinador de Operaciones",
            "Auxiliar de Verificación",
            "Auxiliar de Convocatoria",
            "Auditora Interna",
            "Encargada de Facturación",
          ],
        },
      },
      {
        path: "/evaluacions_complete",
        name: "evaluacion-complete2",
        component: MedNutriFormComp,
        meta: {
          roles: ["Médico Nutricionista", "Médico Nutricionista Domiciliario"],
        },
      },
      {
        path: "/supGenerEvaluacionsDetails",
        name: "supGenerEvaluacionsDetails",
        component: supGenerEvaluacionsDetails,
        meta: {
          roles: ["Supervisor General"],
        },
      },
      {
        path: "/evaluacions/complete",
        name: "evaluacion-complete",
        component: CompleteFormComp,
        meta: {
          roles: [
            "Supervisor en Sitio",
            "Médico Nutricionista",
            "Subgerente de Promoción de la Salud y Prevención de la Enfermedad (P&P)",
            "Supervisor General",
            "Gerente de Operaciones",
            "Coordinador de Operaciones",
            "Auxiliar de Verificación",
            "Auxiliar de Convocatoria",
            "Auditora Interna",
            "Encargada de Facturación",
          ],
        },
      },
      {
        path: "/encFactEvalsAutoDetails",
        name: "evaluacion-complete",
        component: encFactEvalsAutoDetailsComponent,
        meta: {
          roles: [
            "Supervisor en Sitio",
            "Médico Nutricionista",
            "Subgerente de Promoción de la Salud y Prevención de la Enfermedad (P&P)",
            "Supervisor General",
            "Gerente de Operaciones",
            "Coordinador de Operaciones",
            "Auxiliar de Verificación",
            "Auxiliar de Convocatoria",
            "Auditora Interna",
            "Encargada de Facturación",
          ],
        },
      },
      {
        path: "/evaluacions2/:id",
        name: "evaluacion-details2",
        component: EvaluacionPrintComponent,
        meta: {
          roles: [
            "Supervisor en Sitio",
            "Médico Nutricionista",
            "Subgerente de Promoción de la Salud y Prevención de la Enfermedad (P&P)",
            "Supervisor General",
            "Gerente de Operaciones",
            "Coordinador de Operaciones",
            "Auxiliar de Verificación",
            "Auxiliar de Convocatoria",
            "Auditora Interna",
            "Encargada de Facturación",
          ],
        },
      },
      {
        path: "/evaluacions/new",
        name: "evaluacions-form",
        component: EvaluacionFormComp,
        meta: {
          roles: [
            "Supervisor en Sitio",
            "Médico Nutricionista",
            "Subgerente de Promoción de la Salud y Prevención de la Enfermedad (P&P)",
            "Supervisor General",
            "Gerente de Operaciones",
            "Coordinador de Operaciones",
            "Auxiliar de Verificación",
            "Auxiliar de Convocatoria",
            "Auditora Interna",
            "Encargada de Facturación",
          ],
        },
      },
      {
        path: "/miPerfil",
        name: "miPerfil",
        component: Perfil,
        meta: {
          roles: allRoles,
        },
      },

      {
        path: "/fixRegister",
        name: "fixRegister",
        component: FixRegister,
        meta: {
          roles: [
            "Supervisor en Sitio",
            "Médico Nutricionista",
            "Subgerente de Promoción de la Salud y Prevención de la Enfermedad (P&P)",
            "Supervisor General",
            "Gerente de Operaciones",
            "Coordinador de Operaciones",
            "Auxiliar de Validación",
            "Auxiliar de Convocatoria",
            "Auditora Interna",
            "Encargada de Facturación",
            "Encargada de Verificación",
          ],
        },
      },

      {
        path: "/dashboard",
        name: "Dashboard",
        component: Dashboard,
        meta: {
          roles: allRoles,
        },
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  // console.log(to)
  if (to.meta?.requiresAuth && store.state.isAuthenticated) {
    // let users enter if authenticated
    if (to.meta?.roles?.includes(store.state.user.type)) {
      next();
    } else {
      // console.log('User is not authorized for route.')
      alert("Usuario no Autorizado.");
    }
  } else if (to.meta?.requiresAuth) {
    // otherwise, route them to /login
    next("/");
  } else {
    next();
  }
});

export default router;
