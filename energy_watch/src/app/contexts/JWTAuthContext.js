import { createContext, useEffect, useReducer } from "react";
import axios from "axios";
import { MatxLoading } from "app/components";

const initialState = {
  user: null,
  isInitialized: false,
  isAuthenticated: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "INIT":
      return {
        ...state,
        isAuthenticated: !!action.payload.user,
        isInitialized: true,
        user: action.payload.user,
      };
    case "LOGIN":
      return { ...state, isAuthenticated: true, user: action.payload.user };
    case "LOGOUT":
      return { ...state, isAuthenticated: false, user: null };
    case "REGISTER":
      return { ...state, isAuthenticated: true, user: action.payload.user };
    default:
      return state;
  }
};

const AuthContext = createContext({
  ...initialState,
  login: () => {},
  logout: () => {},
  register: () => {},
});

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const login = async (correo, contrasena) => {
    const response = await axios.post("http://localhost:4000/usuarios/login", {
      correo,
      contrasena,
    });
    const { user, token } = response.data.usuario;

    localStorage.setItem("jwtToken", token); // Guardar el token en localStorage
    localStorage.setItem("user", JSON.stringify(user)); // Guardar el usuario en localStorage
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`; // Configurar el token como default para futuras peticiones

    dispatch({ type: "LOGIN", payload: { user } });
  };

  const register = async (correo, nombre, contrasena) => {
    const response = await axios.post("http://localhost:4000/usuarios/one", {
      correo,
      nombre,
      contrasena,
    });
    const { user } = response.data;

    dispatch({ type: "REGISTER", payload: { user } });
  };

  const logout = () => {
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("user");
    delete axios.defaults.headers.common["Authorization"];
    dispatch({ type: "LOGOUT" });
  };

  useEffect(() => {
    const init = async () => {
      const token = localStorage.getItem("jwtToken");
      const user = JSON.parse(localStorage.getItem("user"));

      if (token && user) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        dispatch({ type: "INIT", payload: { user } });
      } else {
        dispatch({ type: "INIT", payload: { user: null } });
      }
    };

    init();
  }, []);

  // SHOW LOADER
  if (!state.isInitialized) return <MatxLoading />;

  return (
    <AuthContext.Provider value={{ ...state, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
