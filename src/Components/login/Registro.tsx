import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as CryptoJS from "crypto-js";
import "./registro.css";

interface Usuario {
  nombre: string;
  clave: string;
  rol: { id: number };
}

interface Role {
  id: number;
  name: string;
}

const Registro = () => {
  const [usuario, setUsuario] = useState<Usuario>({
    nombre: "",
    clave: "",
    rol: { id: 0 },
  });
  const [roles, setRoles] = useState<Role[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRoles = async () => {
      const response = await fetch("http://localhost:8080/api/usuarios/roles");
      const data = await response.json();
      setRoles(data);
      // Inicializar el estado 'usuario' después de que los roles se hayan cargado
      setUsuario({
        nombre: "",
        clave: "",
        rol: { id: data[0].id }, // Usar el id del primer rol
      });
    };

    fetchRoles();
  }, []);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    if (e.target.name === "rol") {
      setUsuario({
        ...usuario,
        rol: { id: parseInt(e.target.value) },
      });
    } else {
      setUsuario({
        ...usuario,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const encryptedPassword = CryptoJS.SHA256(usuario.clave).toString();

    const response = await fetch(
      "http://localhost:8080/api/usuarios/registro",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: usuario.nombre,
          password: encryptedPassword,
          role: usuario.rol,
        }),
      }
    );

    if (response.ok) {
      // Redirigir a la ruta de inicio de sesión
      navigate("/login");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="formulario">
      <label>
        Nombre de usuario:
        <input type="text" name="nombre" onChange={handleChange} />
      </label>
      <label>
        Contraseña:
        <input type="password" name="clave" onChange={handleChange} />
      </label>
      <label>
        Rol:
        <select name="rol" onChange={handleChange} value={usuario?.rol.id}>
          {roles.map((role) => (
            <option key={role.id} value={role.id}>
              {role.name}
            </option>
          ))}
        </select>
      </label>
      <input type="submit" value="Registrar" />
    </form>
  );
};

export default Registro;
