import { Button, Grid, Icon, styled } from "@mui/material";
import { Span } from "app/components/Typography";
import { useEffect, useState } from "react";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import axios from "axios"; // Asegúrate de importar axios

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

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevenir el comportamiento por defecto del formulario
    try {
      const response = await axios.post("http://localhost:4000/edificios/one", {
        carrera: state.ubicacion,
        nombre: state.nombre,
        seccion: state.seccion,
      });
      console.log("Registro exitoso:", response.data);
      alert("Registro exitoso");
      // Puedes limpiar el formulario o redirigir al usuario
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
              type="text"
              name="ubicacion"
              id="standard-basic"
              value={ubicacion}
              onChange={handleChange}
              errorMessages={["Este campo es obligatorio"]}
              label="Ubicacion"
            />

            <TextField
              type="text"
              name="nombre"
              label="Nombre del Edificio"
              onChange={handleChange}
              value={nombre}
              validators={["required"]}
              errorMessages={["Este campo es obligatorio"]}
            />

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
