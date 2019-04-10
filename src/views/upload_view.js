import Backbone from 'backbone';
import $ from 'jquery';
import _ from 'underscore';
import UploadTemplate from '../templates/upload_template';
import File from '../models/file';
import UploadView from '../libs/upload';

var UploadViewTab = Backbone.View.extend({
	el: '#workspace',
  uploadView: null,
	initialize: function(){
    this.uploadView = new UploadView({
      el: "#formUpload",
      imagenId: "imagen_id",
      inputFileId: "input_file",
      buscarBtnId: "buscar_file",
      subirBtnId: "subir_file",
      verBtnId: "ver_file",
      fileName: "myFile",
      lblMensaje: "lblMensaje",
      mensajes: {
        "formatoNoValido": "Archivo formato no válido",
        "tamanioNoValido": "Tamaño de archivo no válido",
        "errorAjax": "Error de comunicación con el servidor",
        "success": "Se cargado el archivo",
      },
      url: BASE_URL + "file/upload",
      extraData: [
        {"llave": "key1", "domId": "txtExtraData1"},
        {"llave": "key2", "domId": "txtExtraData2"},
      ],
      maxSize: 3545850, //bytes
      allowTypes: ["image/png", "image/jpeg"],
      method: "POST",
      model: new File(),
    });
	},
	events: {
    "click #buscar_file": "buscarFile",
    "click #subir_file": "subirFile",
	},
  buscarFile: function(event){
    this.uploadView.triggerInputFile();
  },
  subirFile: function(event){
    this.uploadView.subirFile();
  },
	render: function() {
		$(this.el).html(
      UploadTemplate({
        nombre: 'Pepe',
        base_url: BASE_URL,
      }))
    ;
	},
});

export default UploadViewTab;
