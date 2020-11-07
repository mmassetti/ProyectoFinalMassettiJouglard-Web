const dataWebInfo = {
  rows: [
    {
      title: (
        <p>
          <strong>¿Qué información puedo ver en esta web?</strong>
        </p>
      ),
      content: <p>Lorem ipsum dolor sit amet, consectetur.</p>,
    },
    {
      title: (
        <p>
          <strong>¿Puedo modificar contenido en esta web?</strong>
        </p>
      ),
      content: (
        <p>
          Podés editar la descripción de una sesión, lote o pastura. A
          diferencia de la aplicación móvil, en la web no permitiremos eliminar
          sesiones, lotes, pasturas, imágenes o notas, hasta que no se
          implemente el sistema de Registro/Logueo de usuarios.
        </p>
      ),
    },
    {
      title: (
        <p>
          <strong>¿Cómo se utiliza un archivo CSV?</strong>
        </p>
      ),
      content: <p>Lorem ipsum dolor sit amet, consectetur.</p>,
    },
  ],
};

const styleWebInfo = {
  bgColor: "EEEEE",
  rowTitleColor: "#f44336",
  rowTitleTextSize: "large",
  rowContentColor: "1D1D1D",
  rowContentTextSize: "18px",
  rowContentPaddingLeft: "50px",
  rowContentPaddingRight: "50px",
  arrowColor: "black",
};

export { dataWebInfo, styleWebInfo };
