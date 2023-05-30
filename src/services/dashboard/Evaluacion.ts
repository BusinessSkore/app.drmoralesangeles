import { Evaluacion } from "@/interfaces/Evaluacion";
import { AxiosResponse } from "axios";
import axios from "./axios";

export const getEvaluacions = async (): Promise<AxiosResponse<Evaluacion[]>> =>
  await axios.get("/evaluacions/get");

export const getEvaluacion = async (id: string): Promise<AxiosResponse<Evaluacion>> =>
  await axios.get(`/evaluacions/GetById/${id}`);

export const getOneEvaluacion = async (): Promise<AxiosResponse<Evaluacion>> =>
  await axios.get("/evaluacions/GetOne");

export const registerEvaluacion = async (
  evaluacion: Evaluacion
): Promise<AxiosResponse> => await axios.post("/evaluacions/signup", evaluacion);

// export const loginEvaluacion = async (evaluacion: Evaluacion): Promise<AxiosResponse> =>
//   await axios.get(`/paciente/buscar_por_cedula?cedula=${evaluacion.email}`);

// export const loginEvaluacion = async (evaluacion: Evaluacion): Promise<AxiosResponse> =>
//   await axios.post("/evaluacions/login", evaluacion);

export const eliminateEvaluacions = async (
  evaluacion: Evaluacion
): Promise<AxiosResponse> => await axios.post("/evaluacions/delete", evaluacion);

export const getEvaluacionsCant = async (): Promise<AxiosResponse<Evaluacion[]>> =>
  await axios.get("/evaluacions/getCantUsu");

export const getEvaluacionsByUser = async (
  evaluacion: Evaluacion
): Promise<AxiosResponse<Evaluacion>> =>
  await axios.post("/evaluacions/GetByUser", evaluacion);

export const getEvaluacionsAsignar = async (
  evaluacion: Evaluacion
): Promise<AxiosResponse<Evaluacion>> =>
  await axios.post("/evaluacions/GetByGroup", evaluacion);

export const updateEvaluacion = async (
  id: string,
  newEvaluacion: Evaluacion
): Promise<AxiosResponse<Evaluacion>> =>
  await axios.put(`/evaluacions/Update/${id}`, newEvaluacion);

export const deleteEvaluacion = async (id: string): Promise<AxiosResponse> =>
  await axios.delete(`/evaluacions/Delete/${id}`);
