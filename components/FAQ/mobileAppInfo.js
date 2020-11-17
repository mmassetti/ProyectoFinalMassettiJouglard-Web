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
          Podés descargar el archivo .apk que instalará la aplicación en tu
          celular{" "}
          <a
            href="https://drive.google.com/file/d/1MCRqb2NhgA-TdGfLy9EfepoU1uPrBMWl/view?usp=sharing"
            target="_blank"
          >
            <strong>acá</strong>
          </a>
          . Al querer instalarla, posiblemente se te pida que{" "}
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
