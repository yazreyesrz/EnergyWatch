import React from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import LineChartGeneral from "app/views/charts/echarts/LineChartGeneral";

const PrintToPDF = () => {
  const handlePrint = () => {
    const input = document.getElementById("content-to-print");

    html2canvas(input)
      .then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF();
        const imgWidth = 210; // Ancho de la página A4 en mm
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
        pdf.save("grafica.pdf");
      })
      .catch((error) => {
        console.error("Error al generar PDF:", error);
      });
  };

  // Función para obtener la fecha actual en formato legible
  const getCurrentDate = () => {
    const currentDate = new Date();
    const formattedDate = `${currentDate.getDate()}/${
      currentDate.getMonth() + 1
    }/${currentDate.getFullYear()}`;
    return formattedDate;
  };

  return (
    <div>
      <button
        onClick={handlePrint}
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          backgroundColor: "#333c87",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
          transition: "background-color 0.3s ease", // Transición suave para el color de fondo
        }}
        // Estilos adicionales para el efecto hover
        onMouseOver={(e) => {
          e.target.style.backgroundColor = "#007bff"; // Cambia el color de fondo al pasar el cursor
        }}
        onMouseOut={(e) => {
          e.target.style.backgroundColor = "#333c87"; // Restaura el color de fondo al quitar el cursor
        }}
      >
        Generar PDF
      </button>
      <div id="content-to-print">
        <p>Fecha: {getCurrentDate()}</p>
        <LineChartGeneral height="550px" />
      </div>
    </div>
  );
};

export default PrintToPDF;
