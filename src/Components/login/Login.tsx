import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Usuario from "../../entidades/Usuario";
import * as CryptoJS from "crypto-js";
import "./login.css";

function Login() {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState<Usuario>(new Usuario());
  const [txtValidacion, setTxtValidacion] = useState<string>("");
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    if (usuario?.rol) {
      const usuarioParaAlmacenar = {
        usuario: usuario.usuario,
        rol: usuario.rol,
      };

      localStorage.setItem("usuario", JSON.stringify(usuarioParaAlmacenar));
      navigate("/menu", {
        replace: true,
        state: {
          logged: true,
          usuario: usuarioParaAlmacenar,
        },
      });
    }
  }, [usuario]);

  const login = async () => {
    if (usuario?.usuario == undefined || usuario?.usuario === "") {
      setTxtValidacion("Ingrese el nombre de usuario");
      return;
    }
    if (usuario?.clave == undefined || usuario?.clave === "") {
      setTxtValidacion("Ingrese la clave");
      return;
    }

    // Llamada al backend
    const encryptedPassword = CryptoJS.SHA256(usuario.clave).toString();

    const response = await fetch("http://localhost:8080/api/usuarios/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: usuario.usuario,
        password: encryptedPassword,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      const newUsuario = {
        usuario: data.username,
        rol: data.role,
      };
      // Crear un nuevo objeto Usuario y asignarle las propiedades de newUsuario
      const usuarioActualizado = new Usuario();
      usuarioActualizado.usuario = newUsuario.usuario;
      usuarioActualizado.rol = newUsuario.rol;
      setUsuario(usuarioActualizado);
      localStorage.setItem("usuario", JSON.stringify(newUsuario));
      navigate("/menu", {
        replace: true,
        state: {
          logged: true,
          usuario: newUsuario,
        },
      });
    } else {
      setTxtValidacion("Usuario y/o clave incorrectas");
      return;
    }
  };

  return (
    <>
      <div className="login-form__center">
        <form className="login-form">
          <div className="mb-3">
            <label htmlFor="txtUsuario" className="form-label">
              Usuario
            </label>
            <input
              type="text"
              id="txtUsuario"
              className="form-control"
              placeholder="Ingrese el nombre"
              defaultValue={usuario?.usuario}
              onChange={(e) =>
                setUsuario((prevUsuario) => ({
                  ...prevUsuario,
                  usuario: String(e.target.value),
                }))
              }
              onKeyDown={(e) => {
                if (e.key === "Enter") login();
              }}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="txtClave" className="form-label">
              Clave
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="txtClave"
              className="form-control"
              placeholder="Ingrese la clave"
              defaultValue={usuario?.clave}
              onChange={(e) =>
                setUsuario((prevUsuario) => ({
                  ...prevUsuario,
                  clave: String(e.target.value),
                }))
              }
              onKeyDown={(e) => {
                if (e.key === "Enter") login();
              }}
            />
            <input
              type="checkbox"
              id="showPassword"
              checked={showPassword}
              onChange={togglePasswordVisibility}
            />
            <label htmlFor="showPassword">Mostrar contraseña</label>
          </div>
          <div className="col">
            <button onClick={login} className="btn btn-success" type="button">
              Ingresar
            </button>
          </div>
          <div>
            <p style={{ color: "red", lineHeight: 5, padding: 5 }}>
              {txtValidacion}
            </p>
          </div>
        </form>
      </div>
    </>
  );
}
export default Login;
