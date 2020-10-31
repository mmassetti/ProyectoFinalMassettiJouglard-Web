const dataAppInfo = {
  rows: [
    {
      title: (
        <p>
          <strong>¿Dónde puedo descargar la aplicación móvil?</strong>
        </p>
      ),
      content: (
        <p>
          En la parte superior derecha en esta web hay un botón con el símbolo
          de una rueda, al presionarlo encontrarás la opción{" "}
          <strong>'Descargar App Android'</strong>, desde donde podrás bajar el
          archivo .apk que instalará la aplicación en tu celular. Al querer
          instalarla, posiblemente se te pida que{" "}
          <a
            href="https://miracomosehace.com/instalar-aplicaciones-externas-origen-desconocido-android/"
            target="blank"
            style={{ color: "blue" }}
          >
            habilites la opción de 'Instalar aplicaciones de origen
            desconocido'.
          </a>
        </p>
      ),
    },
  ],
};

const styleAppInfo = {
  bgColor: "#FDFDFD",
  rowTitleColor: "#252D32",
  rowTitleTextSize: "large",
  rowContentColor: "1D1D1D",
  rowContentTextSize: "18px",
  rowContentPaddingLeft: "50px",
  rowContentPaddingRight: "50px",
  arrowColor: "black",
};

export { dataAppInfo, styleAppInfo };
