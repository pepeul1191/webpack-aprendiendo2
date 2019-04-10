import _ from 'underscore';

var UploadTemplate = _.template(`
  <h1>Upload</h1>
  <div class="row" id="formUpload">
    <div class="col-md-4">
      <div class="form-group" style="margin-bottom:10px">
        <label for="txtExtraData1">Data Extra 1</label>
        <input type="input" class="form-control" id="txtExtraData1" placeholder="Datos Extra 1">
      </div>
      <div class="form-group" style="margin-bottom:10px">
        <label for="txtExtraData2">Data Extra 2</label>
        <input type="input" class="form-control" id="txtExtraData2" placeholder="Datos Extra 2">
      </div>
      <div class="form-group" style="margin-bottom:10px">
        <label style="width:100%">Foto</label>
        <label id="imagen_id" class="oculto">E</label>
        <input type="file" id="input_file" name="myFile" type="file" class="hidden"/>
        <button id="buscar_file" class="btn btn-primary btn-file pull-left"><i class="fa fa-file-image-o" aria-hidden="true"></i>Buscar </button>
        <button id="subir_file" class="btn btn-primary btn-file pull-left" disabled><i class="fa fa-upload" aria-hidden="true"></i>Subir </button>
        <a target="_blank" id="ver_file" class="btn btn-primary btn-file pull-left" disabled><i class="fa fa-search" aria-hidden="true" style="margin-right: 5px"></i>Ver </a>
      </div>
    </div>
    <div class="col-md-3">
      <div class="form-group">
        <label id="lblMensaje"></label>
      </div>
    </div>
    <div class="col-md-3">
      <div class="form-group" id="formUbicaciones">
        <label for="txtDistrito">Ver modelo de selcción en consola</label><br>
        <button type="button" class="btn btn-primary" id="verModelo"><i class="fa fa-search" aria-hidden="true"></i>Ver Modelo</button>
      </div>
    </div>
  </div>
`);

export default UploadTemplate;
