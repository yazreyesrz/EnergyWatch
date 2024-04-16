import { Button, Grid, Icon, MenuItem, styled } from "@mui/material";
import { Span } from "app/components/Typography";
import { useEffect, useState } from "react";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import axios from "axios";

const TextField = styled(TextValidator)(() => ({
  width: "100%",
  marginBottom: "16px",
}));

const SimpleForm = () => {
  const [state, setState] = useState({
    ubicacion: "",
    nombre: "",
    seccion: "",
  });

  useEffect(() => {
    ValidatorForm.addValidationRule("isPasswordMatch", (value) => {
      if (value !== state.password) return false;
      return true;
    });
    return () => ValidatorForm.removeValidationRule("isPasswordMatch");
  }, [state.password]);

  const opcionesUbicacion = ["IDS", "BIOMEDICA", "Carrera C"]; // Ejemplo de opciones para Ubicacion
  const opcionesEdificio = ["UD1", "Edificio Y", "Edificio Z"]; // Ejemplo de opciones para Nombre del Edificio

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:4000/edificios/one", {
        ubicacion: state.ubicacion,
        nombre: state.nombre,
        seccion: state.seccion,
      });
      console.log("Registro exitoso:", response.data);
      alert("Registro exitoso");
      setState({ ubicacion: "", nombre: "", seccion: "" }); // Limpiar el formulario después del envío
    } catch (error) {
      console.error("Error al registrar el edificio:", error);
    }
  };

  const handleChange = (event) => {
    event.persist();
    setState((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const { ubicacion, nombre, seccion } = state;

  return (
    <div>
      <ValidatorForm onSubmit={handleSubmit} onError={() => null}>
        <Grid container spacing={6}>
          <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
            <TextField
              select
              name="carrera"
              label="Carrera"
              value={ubicacion}
              onChange={handleChange}
              validators={["required"]}
              errorMessages={["Este campo es obligatorio"]}
            >
              {opcionesUbicacion.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              select
              name="nombre"
              label="Nombre del Edificio"
              value={nombre}
              onChange={handleChange}
              validators={["required"]}
              errorMessages={["Este campo es obligatorio"]}
            >
              {opcionesEdificio.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              type="number"
              name="seccion"
              label="Sección"
              value={seccion}
              onChange={handleChange}
              validators={["required"]}
              errorMessages={["Este campo es obligatorio"]}
            />
          </Grid>
        </Grid>

        <Button color="primary" variant="contained" type="submit">
          <Icon>send</Icon>
          <Span sx={{ pl: 1, textTransform: "capitalize" }}>Registrar</Span>
        </Button>
      </ValidatorForm>
    </div>
  );
};

export default SimpleForm;
