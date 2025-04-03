const multer = require('multer');

const uploadFile = (folder) => {
  const storage = multer.diskStorage({
    destination: `public/images/${folder}`,
    filename: function (req, file, cb) {
      console.log(file);
      let originalName = file.originalname;
      let newName = Date.now() + '-' + originalName;
      cb(null, newName);
    },
  });

  //ESTE IMG ES EL NOMBRE QUE LE DAS AL INPUT DEL FORMULARIO DE TIPO FILE
  //POR QUE EN EL METODO DE SINGLE APARECE IMG
  const upload = multer({ storage: storage }).single('img');
  return upload;
};

module.exports = uploadFile;
