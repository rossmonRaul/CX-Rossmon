﻿using Dapper;
using Dominio.Dto;
using Dominio.Entiti;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Dominio.Interfaces.Infraestructura.BaseDatos;

namespace DataAccess.StoredProcedures
{
    /*
    public class SPSocios
    {
        BdConexion bdConexion = new BdConexion();
        private SqlCommand sqlCommand;
        private SqlConnection sqlConnection;


        private readonly string obtenerSociosQuery = "SPObtenerSocios";
        private readonly string insertarSociosQuery = "SPInsertarSocios";
        private readonly string actualizarSociosQuery = "SPActualizarSocios";
        private readonly string eliminarSociosQuery = "SPEliminarSocios";
        private readonly string obtenerSociosPorIDQuery = "SPObtenerSociosPorID";
        private readonly string obtenerSociosActivosQuery = "SPObtenerSociosActivos";
        private readonly string obtenerTiposPersonaQuery = "SPObtenerTiposPersona"; 

        public async Task<List<DtoSocio>> ObtenerSocios()
        {
            List<DtoSocio> lista = new List<DtoSocio>();
            try
            {

                using (var connection = new SqlConnection(bdConexion.connectionString))
                {
                    var result = await connection.QueryAsync<DtoSocio>(obtenerSociosQuery, commandType: System.Data.CommandType.StoredProcedure);
                    lista = result.ToList();
                }

            }
            catch (Exception)
            {
                throw;
            }

            return lista;
        }
        public async Task<List<DtoTipoPersona>> ObtenerTiposPersona()
        {
            List<DtoTipoPersona> lista = new List<DtoTipoPersona>();
            try
            {

                using (var connection = new SqlConnection(bdConexion.connectionString))
                {
                    var result = await connection.QueryAsync<DtoTipoPersona>(obtenerTiposPersonaQuery, commandType: System.Data.CommandType.StoredProcedure);
                    lista = result.ToList();
                }

            }
            catch (Exception)
            {
                throw;
            }

            return lista;
        }

        public async Task<DtoRespuestaSP> InsertarSocios(EntitiSocio entitiSocio)
        {
            DtoRespuestaSP dtoRespuestaSP = new DtoRespuestaSP();
            try
            {
                sqlConnection = new SqlConnection(bdConexion.connectionString);
                sqlConnection.Open();
                sqlCommand = new SqlCommand(insertarSociosQuery, sqlConnection); //cambiar SP 
                sqlCommand.CommandType = System.Data.CommandType.StoredProcedure;

                sqlCommand.Parameters.AddWithValue("@Nombre", entitiSocio.Nombre); 
                sqlCommand.Parameters.AddWithValue("@Cedula", entitiSocio.Cedula);
                sqlCommand.Parameters.AddWithValue("@Correo", entitiSocio.Correo);
                sqlCommand.Parameters.AddWithValue("@Telefono", entitiSocio.Telefono);
                sqlCommand.Parameters.AddWithValue("@IdTipoPersona", entitiSocio.IdTipoPersona);
                sqlCommand.Parameters.Add("@INDICADOR", SqlDbType.Int);
                sqlCommand.Parameters.Add("@MENSAJE", SqlDbType.VarChar, 50);

                sqlCommand.Parameters["@INDICADOR"].Direction = ParameterDirection.Output;
                sqlCommand.Parameters["@MENSAJE"].Direction = ParameterDirection.Output;

                await sqlCommand.ExecuteNonQueryAsync();

                dtoRespuestaSP = new DtoRespuestaSP
                {
                    indicador = Convert.ToInt32(sqlCommand.Parameters["@INDICADOR"].Value),
                    mensaje = sqlCommand.Parameters["@MENSAJE"].Value.ToString()
                };

            }
            catch (Exception)
            {
                throw;
            }
            finally
            {
                this.sqlConnection.Close();
            }
            return dtoRespuestaSP;
        }

        public async Task<DtoSocio> ObtenerSocioPorId(int idSocio)
        {
            object value = new object();
            try
            {

                sqlConnection = new SqlConnection(bdConexion.connectionString);
                sqlConnection.Open();

                DynamicParameters queryParameters = new DynamicParameters();
                queryParameters.Add("@IdSocio", idSocio);

                var result = await sqlConnection.QueryAsync<DtoSocio>(obtenerSociosPorIDQuery, queryParameters, commandType: System.Data.CommandType.StoredProcedure);
                value = result.FirstOrDefault();

            }
            catch (Exception)
            {
                throw;
            }
            finally
            {
                this.sqlConnection.Close();
            }
            return (DtoSocio)Convert.ChangeType(value, typeof(DtoSocio));
        }

        public async Task<DtoRespuestaSP> EliminarSocio(int idSocio)
        {
            DtoRespuestaSP dtoRespuestaSP = new DtoRespuestaSP();
            try
            {
                sqlConnection = new SqlConnection(bdConexion.connectionString);
                sqlConnection.Open();
                sqlCommand = new SqlCommand(eliminarSociosQuery, sqlConnection);
                sqlCommand.CommandType = System.Data.CommandType.StoredProcedure;

                sqlCommand.Parameters.AddWithValue("@IdSocio", idSocio);

                sqlCommand.Parameters.Add("@INDICADOR", SqlDbType.Int);
                sqlCommand.Parameters.Add("@MENSAJE", SqlDbType.VarChar, 50);
                sqlCommand.Parameters["@INDICADOR"].Direction = ParameterDirection.Output;
                sqlCommand.Parameters["@MENSAJE"].Direction = ParameterDirection.Output;

                await sqlCommand.ExecuteNonQueryAsync();
                dtoRespuestaSP = new DtoRespuestaSP
                {
                    indicador = Convert.ToInt32(sqlCommand.Parameters["@INDICADOR"].Value),
                    mensaje = sqlCommand.Parameters["@MENSAJE"].Value.ToString()
                };

            }
            catch (Exception)
            {
                throw;
            }
            finally
            {
                this.sqlConnection.Close();
            }
            return dtoRespuestaSP;

        }

        public async Task<DtoRespuestaSP> ActualizarSocio(EntitiSocio entitiSocio)
        {
            DtoRespuestaSP dtoRespuestaSP = new DtoRespuestaSP();
            try
            {
                sqlConnection = new SqlConnection(bdConexion.connectionString);
                sqlConnection.Open();
                sqlCommand = new SqlCommand(actualizarSociosQuery, sqlConnection);
                sqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                sqlCommand.Parameters.AddWithValue("@IdSocio", entitiSocio.IdSocio);
                sqlCommand.Parameters.AddWithValue("@Cedula", entitiSocio.Cedula); 
                sqlCommand.Parameters.AddWithValue("@Nombre", entitiSocio.Nombre);
                sqlCommand.Parameters.AddWithValue("@Telefono", entitiSocio.Telefono);
                sqlCommand.Parameters.AddWithValue("@Correo", entitiSocio.Correo);
                sqlCommand.Parameters.AddWithValue("@IdTipoPersona", entitiSocio.IdTipoPersona);

                sqlCommand.Parameters.Add("@INDICADOR", SqlDbType.Int);
                sqlCommand.Parameters.Add("@MENSAJE", SqlDbType.VarChar, 50);
                sqlCommand.Parameters["@INDICADOR"].Direction = ParameterDirection.Output;
                sqlCommand.Parameters["@MENSAJE"].Direction = ParameterDirection.Output;

                await sqlCommand.ExecuteNonQueryAsync();
                dtoRespuestaSP = new DtoRespuestaSP
                {
                    indicador = Convert.ToInt32(sqlCommand.Parameters["@INDICADOR"].Value),
                    mensaje = sqlCommand.Parameters["@MENSAJE"].Value.ToString()
                };

            }
            catch (Exception)
            {
                throw;
            }
            finally
            {
                this.sqlConnection.Close();
            }
            return dtoRespuestaSP;
        }

        public async Task<List<DtoSocio>> ObtenerSociosActivos()
        {
            List<DtoSocio> lista = new List<DtoSocio>();
            try
            {

                using (var connection = new SqlConnection(bdConexion.connectionString))
                {
                    var result = await connection.QueryAsync<DtoSocio>(obtenerSociosActivosQuery, commandType: System.Data.CommandType.StoredProcedure);
                    lista = result.ToList();
                }

            }
            catch (Exception)
            {
                throw;
            }

            return lista;
        }
    }
    */
    public class SPSocios : IRepositorioSocios
    {
        private readonly IContextoBD contextoBD;

        public SPSocios(IContextoBD contextoBD)
        {
            this.contextoBD = contextoBD;
        }

        public async Task<DtoRespuestaSP> InsertarSocios(EntitiSocio entitiSocio)
        {
            try
            {
                Dictionary<string, object> data = new Dictionary<string, object>();
                data.Add("Nombre", entitiSocio.Nombre);
                data.Add("Cedula", entitiSocio.Cedula);
                data.Add("Correo", entitiSocio.Correo);
                data.Add("Telefono", entitiSocio.Telefono);
                data.Add("IdTipoPersona", entitiSocio.IdTipoPersona);
                string query = "SPInsertarSocios";

                return await this.contextoBD.EjecutarSP(query, data);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<DtoRespuestaSP> ActualizarSocio(EntitiSocio entitiSocio)
        {

            try
            {
                Dictionary<string, object> data = new Dictionary<string, object>();

                data.Add("IdSocio", entitiSocio.IdSocio);
                data.Add("Nombre", entitiSocio.Nombre);
                data.Add("Cedula", entitiSocio.Cedula);
                data.Add("Correo", entitiSocio.Correo);
                data.Add("Telefono", entitiSocio.Telefono);
                data.Add("IdTipoPersona", entitiSocio.IdTipoPersona);
                string query = "SPActualizarSocios";

                return await this.contextoBD.EjecutarSP(query, data);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<DtoRespuestaSP> EliminarSocio(int idSocio)

        {
            try
            {
                Dictionary<string, object> data = new Dictionary<string, object>();
                data.Add("IdSocio", idSocio);
                string query = "SPEliminarSocios";

                return await this.contextoBD.EjecutarSP(query, data);
            }
            catch (Exception)
            {
                throw;
            }
        }


        public async Task<DtoSocio> ObtenerSocioPorId(int idSocio)
        {
            try
            {
                Dictionary<string, object> data = new Dictionary<string, object>();
                data.Add("IdSocio", idSocio);
                string query = "SPObtenerSociosPorID";

                return await this.contextoBD.ObtenerDato<DtoSocio>(query, data);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<List<DtoSocio>> ObtenerSocios()
        {
            try
            {
                string query = "SPObtenerSocios";
                var result = await this.contextoBD.ObtenerListaDeDatos<DtoSocio>(query);

                return result;
            }
            catch (Exception)
            {
                throw;
            }
        }
        public async Task<List<DtoSocio>> ObtenerSociosActivos()
        {
            try
            {
                string query = "SPObtenerSociosActivos";
                var result = await this.contextoBD.ObtenerListaDeDatos<DtoSocio>(query);

                return result;
            }
            catch (Exception)
            {
                throw;
            }
        }
        public async Task<List<DtoTipoPersona>> ObtenerTiposPersona()
        {
            try
            {
                string query = "SPObtenerTiposPersona";
                var result = await this.contextoBD.ObtenerListaDeDatos<DtoTipoPersona>(query);

                return result;
            }
            catch (Exception)
            {
                throw;
            }
        }
    }

}
