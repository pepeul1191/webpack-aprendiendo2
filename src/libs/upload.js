import Backbone from 'backbone';
import $ from 'jquery';
import _ from 'underscore';

var UploadView = Backbone.View.extend({
	//el: "#formUbicaciones",
	initialize: function(params){
    // inicializar variables
    this.imagenId = params["imagenId"];
    this.inputFileId = params["inputFileId"];
    this.buscarBtnId = params["buscarBtnId"];
    this.subirBtnId = params["subirBtnId"];
    this.verBtnId = params["verBtnId"];
    this.mensajes = params["mensajes"];
		this.url = params["url"];
		this.model = params["model"];
    this.extraData = params["extraData"];
    this.fileName = params["fileName"];
		this.maxSize = params["maxSize"];
		this.allowTypes = params["allowTypes"];
		this.lblMensaje = params["lblMensaje"];
		this.method = params["method"];
    // asignacion dinamica de eventos
    this.events = this.events || {};
    this.events["click #" + this.buscarBtnId] = "triggerInputFile";
    this.events["click #" + this.subirBtnId] = "subirFile";
    this.delegateEvents();
	},
  events: {
    // se está usando asignacion dinamica de eventos en el constructor
		"click #verModelo": "verModelo",
  },
  triggerInputFile: function() {
    $("#" + this.inputFileId).trigger("click");
		$("#" + this.subirBtnId).prop("disabled", false);
  },
	verModelo: function(event){
		console.log(this.model.toString());
	},
  subirFile: function() {
    var formData = new FormData();
		// anexar archivo si es formato y tamaño válido
		var file = $("#" + this.inputFileId)[0].files[0];
		if(!_.contains(this.allowTypes, file.type)){
			$("#" + this.lblMensaje).removeClass("color-success");
			$("#" + this.lblMensaje).removeClass("color-warning");
			$("#" + this.lblMensaje).addClass("color-danger");
			$("#" + this.lblMensaje).html(this.mensajes.formatoNoValido);
		}else{
			if(file.size > this.maxSize){
				$("#" + this.lblMensaje).removeClass("color-success");
        $("#" + this.lblMensaje).removeClass("color-warning");
        $("#" + this.lblMensaje).addClass("color-danger");
        $("#" + this.lblMensaje).html(this.mensajes.tamanioNoValido);
			}else{
				formData.append(this.fileName, file);
		    // anexar al formData los datos extras a enviar
		    for(var i = 0; i < this.extraData.length; i++){
		      formData.append(this.extraData[i]["llave"], $("#" + this.extraData[i]["domId"]).val());
		    }
		    //for(var pair of formData.entries()) {console.log(pair[0]+ ', ' + pair[1]);}
		    var viewInstance = this;
		    $.ajax({
		      type: viewInstance.method,
					url: viewInstance.url,
					headers: {
						[CSRF_KEY]: CSRF,
					},
		      data: formData,
		      //use contentType, processData for sure.
		      contentType: false,
		      processData: false,
		      beforeSend: function() {
		        $("#" + viewInstance.subirBtnId).attr("disabled", "true");
						$("#" + viewInstance.lblMensaje).html("Subiendo");
					},

		      success: function(data) {
		        var data = JSON.parse(data);
						$("#" + viewInstance.lblMensaje).html(viewInstance.mensajes["success"]);
		        $("#" + viewInstance.subirBtnId).removeAttr("disabled");
						$("#" + viewInstance.verBtnId).attr("href", data["mensaje"][2]);
						$("#" + viewInstance.lblMensaje).removeClass("color-danger");
						$("#" + viewInstance.lblMensaje).removeClass("color-warning");
						$("#" + viewInstance.lblMensaje).addClass("color-success");
						$("#" + viewInstance.verBtnId).attr("disabled", false);
						// setear modelo
						//viewInstance.model.set("id", data["mensaje"][1]);
			      			viewInstance.model.set("file_id", data["mensaje"]["file_id"]);
						viewInstance.model.set("file_url", data["mensaje"]["file_url"])
						for(var i = 0; i < viewInstance.extraData.length; i++){
							var extra_data = viewInstance.model.get("extra_data");
							extra_data[viewInstance.extraData[i]["llave"]] = $("#" + viewInstance.extraData[i]["domId"]).val();
				      viewInstance.model.set("extra_data", extra_data);
				    }
		      },
		      error: function(error) {
		        console.log(error);
		        $("#" + viewInstance.subirBtnId).removeAttr("disabled");
		      }
		    });
			}
		}
  },
});

export default UploadView;
