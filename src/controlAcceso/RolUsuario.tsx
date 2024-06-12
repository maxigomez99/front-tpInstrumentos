import { Navigate } from "react-router-dom";
import { Roles } from "../entidades/Roles";
import Usuario from "../entidades/Usuario";
import { useState } from "react";

interface Props {
  rol: Roles;
  children?: React.ReactNode;
}

function RolUsuario({ rol, children }: Props) {
  const [jsonUsuario] = useState<any>(localStorage.getItem("usuario"));
  const usuarioLogueado: Usuario = JSON.parse(jsonUsuario) as Usuario;
  //si esta logueado y es administrador lo dejo ingresar si no

  if (usuarioLogueado && usuarioLogueado.rol === rol) {
    return <>{children}</>;
  } else if (usuarioLogueado && usuarioLogueado.rol === Roles.ADMIN) {
    return <Navigate replace to="/grilla" />;
  } else if (usuarioLogueado) {
    return <Navigate replace to="/menu" />;
  } else {
    return <Navigate replace to="/login" />;
  }
}
export default RolUsuario;
