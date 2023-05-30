import { Usuario } from "@/interfaces/Usuario";
import { AxiosResponse } from "axios";
import axios from "./axios";

export const registerUsuario = async (
  usuario: Usuario
): Promise<AxiosResponse> => await axios.post("/register", usuario);

export const loginUsuario = async (
  usuario: Usuario
): Promise<AxiosResponse> => await axios.post("/login", usuario);