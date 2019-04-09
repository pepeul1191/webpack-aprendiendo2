require 'sinatra'
require 'sequel'
require 'sqlite3'

# conexión a base de datos
Sequel::Model.plugin :json_serializer
DB = Sequel.connect('sqlite://db/demo.db')

# clases ORM
class Departamento < Sequel::Model(DB[:departamentos])
end

class Provincia < Sequel::Model(DB[:provincias])
end

class Distrito < Sequel::Model(DB[:distritos])
end

class DistritoProvinciaDepartamento < Sequel::Model(DB[:vw_distrito_provincia_departamentos])
end

class TipoEstacion < Sequel::Model(DB[:tipo_estaciones])
end


class Estacion < Sequel::Model(DB[:estaciones])
end

# aplicación sinatra
before do
  headers['Access-Control-Allow-Origin'] = '*'
  headers['Access-Control-Allow-Methods'] = 'POST, GET, OPTIONS'
  headers['Content-type'] = 'text/html; charset=UTF-8'
  headers['server'] = 'Ruby, Ubuntu'
end

get '/test/conexion' do
  'Ok'
end

get '/' do
  'Error: Url Vacía'
end

# rutas : departamento
get '/departamento/listar' do
  Departamento.all.to_a.to_json
end

post '/departamento/guardar' do
  data = JSON.parse(params[:data])
  nuevos = data['nuevos']
  editados = data['editados']
  eliminados = data['eliminados']
  rpta = []
  array_nuevos = []
  error = false
  execption = nil
  DB.transaction do
    begin
      if nuevos.length != 0
        nuevos.each do |nuevo|
          n = Departamento.new(
            :nombre => nuevo['nombre']
          )
          n.save
          t = {
            :temporal => nuevo['id'],
            :nuevo_id => n.id
          }
          array_nuevos.push(t)
        end
      end
      if editados.length != 0
        editados.each do |editado|
          e = Departamento.where(
            :id => editado['id']
          ).first
          e.nombre = editado['nombre']
          e.save
        end
      end
      if eliminados.length != 0
        eliminados.each do |eliminado|
          Departamento.where(
            :id => eliminado
          ).delete
        end
      end
    rescue Exception => e
      Sequel::Rollback
      error = true
      execption = e
    end
  end
  if error == false
    return {
      :tipo_mensaje => 'success',
      :mensaje => [
        'Se ha registrado los cambios en los departamentos',
        array_nuevos
        ]
      }.to_json
  else
    status 500
    return {
      :tipo_mensaje => 'error',
      :mensaje => [
        'Se ha producido un error en guardar la tabla de departamentos',
        execption.message
        ]
      }.to_json
  end
end

#rutas provincia
get '/provincia/listar/:departamento_id' do
  Provincia.select(:id, :nombre).where(:departamento_id => params['departamento_id']).all().to_a.to_json
end

post '/provincia/guardar' do
  data = JSON.parse(params[:data])
  nuevos = data['nuevos']
  editados = data['editados']
  eliminados = data['eliminados']
  usuario_id = data['extra']
  departamento_id = data['extra']['departamento_id']
  rpta = []
  array_nuevos = []
  error = false
  execption = nil
  DB.transaction do
    begin
      if nuevos.length != 0
        nuevos.each do |nuevo|
          n = Provincia.new(
            :nombre => nuevo['nombre'],
            :departamento_id => departamento_id
          )
          n.save
          t = {
            :temporal => nuevo['id'],
            :nuevo_id => n.id
          }
          array_nuevos.push(t)
        end
      end
      if editados.length != 0
        editados.each do |editado|
          e = Provincia.where(
            :id => editado['id']
          ).first
          e.nombre = editado['nombre']
          e.save
        end
      end
      if eliminados.length != 0
        eliminados.each do |eliminado|
          Provincia.where(
            :id => eliminado
          ).delete
        end
      end
    rescue Exception => e
      Sequel::Rollback
      error = true
      execption = e
    end
  end
  if error == false
    return {
      :tipo_mensaje => 'success',
      :mensaje => [
        'Se ha registrado los cambios en las provincias',
        array_nuevos
        ]
      }.to_json
  else
    status 500
    return {
      :tipo_mensaje => 'error',
      :mensaje => [
        'Se ha producido un error en guardar la tabla de provincias',
        execption.message
        ]
      }.to_json
  end
end

# rutas : distrito
get '/distrito/listar/:provincia_id' do
  Distrito.select(:id, :nombre).where(:provincia_id => params['provincia_id']).all().to_a.to_json
end

get '/distrito/buscar' do
  DistritoProvinciaDepartamento.where(Sequel.like(:nombre, params['nombre'] + '%')).limit(10).to_a.to_json
end

get '/distrito/count' do
  DistritoProvinciaDepartamento.count.to_s
end

get '/distrito/buscar_pagina' do
  data = JSON.parse(params['data'])
  step = data['step']
  page = data['page']
  puts data
  inicio = (page - 1) * step
  DistritoProvinciaDepartamento.limit(step, inicio).to_a.to_json
end

post '/distrito/guardar' do
  data = JSON.parse(params[:data])
  nuevos = data['nuevos']
  editados = data['editados']
  eliminados = data['eliminados']
  usuario_id = data['extra']
  provincia_id = data['extra']['provincia_id']
  rpta = []
  array_nuevos = []
  error = false
  execption = nil
  DB.transaction do
    begin
      if nuevos.length != 0
        nuevos.each do |nuevo|
          n = Distrito.new(
            :nombre => nuevo['nombre'],
            :provincia_id => provincia_id
          )
          n.save
          t = {
            :temporal => nuevo['id'],
            :nuevo_id => n.id
          }
          array_nuevos.push(t)
        end
      end
      if editados.length != 0
        editados.each do |editado|
          e = Distrito.where(
            :id => editado['id']
          ).first
          e.nombre = editado['nombre']
          e.save
        end
      end
      if eliminados.length != 0
        eliminados.each do |eliminado|
          Distrito.where(
            :id => eliminado
          ).delete
        end
      end
    rescue Exception => e
      Sequel::Rollback
      error = true
      execption = e
    end
  end
  if error == false
    return {
      :tipo_mensaje => 'success',
      :mensaje => [
        'Se ha registrado los cambios en los distritos',
        array_nuevos
        ]
      }.to_json
  else
    status 500
    return {
      :tipo_mensaje => 'error',
      :mensaje => [
        'Se ha producido un error en guardar la tabla de distritos',
        execption.message
        ]
      }.to_json
  end
end

# rutas : tipo_estacion
get '/tipo_estacion/listar' do
  TipoEstacion.select(:id, :nombre).all().to_a.to_json
end

get '/estacion/listar' do
  #Estacion.select(:id, :nombre, :descripcion, :latitud, :longitud, :altura, :tipo_estacion_id, :distrito_id).all().to_a.to_json
   DB.fetch('
    SELECT E.id, E.nombre, E.descripcion, E.latitud, E.longitud, E.altura, E.tipo_estacion_id, E.distrito_id, D.nombre AS distrito
    FROM estaciones E
    INNER JOIN vw_distrito_provincia_departamentos D ON D.id = E.distrito_id
    ').to_a.to_json
end

post '/estacion/guardar' do
  data = JSON.parse(params[:data])
  nuevos = data['nuevos']
  editados = data['editados']
  eliminados = data['eliminados']
  rpta = []
  array_nuevos = []
  error = false
  execption = nil
  DB.transaction do
    begin
      if nuevos.length != 0
        nuevos.each do |nuevo|
          n = Estacion.new(
            :nombre => nuevo['nombre'],
            :descripcion => nuevo['descripcion'],
            :latitud => nuevo['latitud'],
            :longitud => nuevo['longitud'],
            :altura => nuevo['altura'],
            :tipo_estacion_id => nuevo['tipo_estacion_id'],
            :distrito_id => nuevo['distrito_id'],
          )
          n.save
          t = {
            :temporal => nuevo['id'],
            :nuevo_id => n.id
          }
          array_nuevos.push(t)
        end
      end
      if editados.length != 0
        editados.each do |editado|
          e = Estacion.where(
            :id => editado['id']
          ).first
          e.nombre = editado['nombre']
          e.descripcion = editado['descripcion']
          e.latitud = editado['latitud']
          e.longitud = editado['longitud']
          e.altura = editado['altura']
          e.tipo_estacion_id = editado['tipo_estacion_id']
          e.distrito_id = editado['distrito_id']
          e.save
        end
      end
      if eliminados.length != 0
        eliminados.each do |eliminado|
          Estacion.where(
            :id => eliminado
          ).delete
        end
      end
    rescue Exception => e
      Sequel::Rollback
      error = true
      execption = e
    end
  end
  if error == false
    return {
      :tipo_mensaje => 'success',
      :mensaje => [
        'Se ha registrado los cambios en las estaciones',
        array_nuevos
        ]
      }.to_json
  else
    status 500
    return {
      :tipo_mensaje => 'error',
      :mensaje => [
        'Se ha producido un error en guardar la tabla de estaciones',
        execption.message
        ]
      }.to_json
  end
end
