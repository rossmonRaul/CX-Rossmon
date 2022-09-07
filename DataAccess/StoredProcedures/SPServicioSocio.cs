using Dapper;
using DataAccess.Conexion;
using Dominio.Dto;
using Dominio.Entiti;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.StoredProcedures
{
    public class SPServicioSocio
    {
        BdConexion bdConexion = new BdConexion();
        private SqlCommand sqlCommand;
        private SqlConnection sqlConnection;


        private readonly string obtenerServicioSocioQuery = "SPObtenerServiciosSocios";
        private readonly string insertarServicioSocioQuery = "SPInsertarServicioSocio";
        private readonly string actualizarServicioSocioQuery = "SPActualizarServicioSocio";
        private readonly string eliminarServicioSocioQuery = "SPEliminarServicioSocios";
        private readonly string obtenerServicioSocioPorIDQuery = "SPObtenerServicioSocioPorID";
        private readonly string obtenerServicioSocioActivosQuery = "SPObtenerServicioSocioActivos";


        public async Task<List<DtoServicioSocio>> ObtenerServicioSocio()
        {
            List<DtoServicioSocio> lista = new List<DtoServicioSocio>();
            try
            {

                using (var connection = new SqlConnection(bdConexion.connectionString))
                {
                    var result = await connection.QueryAsync<DtoServicioSocio>(obtenerServicioSocioQuery, commandType: System.Data.CommandType.StoredProcedure);
                    lista = result.ToList();
                }

            }
            catch (Exception)
            {
                throw;
            }

            return lista;
        }


        public async Task<List<DtoServicioSocio>> ObtenerServicioSocioActivos()
        {
            List<DtoServicioSocio> lista = new List<DtoServicioSocio>();
            try
            {

                using (var connection = new SqlConnection(bdConexion.connectionString))
                {
                    var result = await connection.QueryAsync<DtoServicioSocio>(obtenerServicioSocioActivosQuery, commandType: System.Data.CommandType.StoredProcedure);
                    lista = result.ToList();
                }

            }
            catch (Exception)
            {
                throw;
            }

            return lista;
        }
        public async Task<DtoRespuestaSP> InsertarServicioSocio(EntitiServicioSocio entitiServicioSocio)
        {
            DtoRespuestaSP rest = new DtoRespuestaSP();
            try
            {

                using (var connection = new SqlConnection(bdConexion.connectionString))
                {
                    connection.Open();
                    sqlCommand = new SqlCommand(insertarServicioSocioQuery, connection);
                    sqlCommand.CommandType = System.Data.CommandType.StoredProcedure;

                    sqlCommand.Parameters.AddWithValue("@IdSocio", entitiServicioSocio.Nombre); //colocar parametros correspondientes
                    sqlCommand.Parameters.AddWithValue("@IdLinea", entitiServicioSocio.LineaNegocio);
                    sqlCommand.Parameters.AddWithValue("@IdServicio", entitiServicioSocio.Servicio);
                

                    sqlCommand.Parameters.Add("@INDICADOR", SqlDbType.Int);
                    sqlCommand.Parameters.Add("@MENSAJE", SqlDbType.VarChar, 50);

                    sqlCommand.Parameters["@INDICADOR"].Direction = ParameterDirection.Output;
                    sqlCommand.Parameters["@MENSAJE"].Direction = ParameterDirection.Output;

                    await sqlCommand.ExecuteNonQueryAsync();

                    rest = new DtoRespuestaSP
                    {
                        indicador = Convert.ToInt32(sqlCommand.Parameters["@INDICADOR"].Value),
                        mensaje = sqlCommand.Parameters["@MENSAJE"].Value.ToString()
                    };



                }

            }
            catch (Exception)
            {
                throw;
            }

            return rest;
        }

        public async Task<DtoRespuestaSP> ActualizarServicioSocio(EntitiServicioSocio entitiServicioSocio)
        {
            DtoRespuestaSP rest = new DtoRespuestaSP();
            try
            {

                using (var connection = new SqlConnection(bdConexion.connectionString))
                {
                    connection.Open();
                    sqlCommand = new SqlCommand(actualizarServicioSocioQuery, connection);
                    sqlCommand.CommandType = System.Data.CommandType.StoredProcedure;

                    sqlCommand.Parameters.AddWithValue("@IdServicioSocio", entitiServicioSocio.idServicioSocio);
                    sqlCommand.Parameters.AddWithValue("@IdSocio", entitiServicioSocio.Nombre); //colocar parametros correspondientes
                    sqlCommand.Parameters.AddWithValue("@IdLinea", entitiServicioSocio.LineaNegocio);
                    sqlCommand.Parameters.AddWithValue("@IdServicio", entitiServicioSocio.Servicio);

                    sqlCommand.Parameters.Add("@INDICADOR", SqlDbType.Int);
                    sqlCommand.Parameters.Add("@MENSAJE", SqlDbType.VarChar, 50);
                    sqlCommand.Parameters["@INDICADOR"].Direction = ParameterDirection.Output;
                    sqlCommand.Parameters["@MENSAJE"].Direction = ParameterDirection.Output;

                    await sqlCommand.ExecuteNonQueryAsync();

                    rest = new DtoRespuestaSP
                    {
                        indicador = Convert.ToInt32(sqlCommand.Parameters["@INDICADOR"].Value),
                        mensaje = sqlCommand.Parameters["@MENSAJE"].Value.ToString()
                    };

                }

            }
            catch (Exception)
            {
                throw;
            }

            return rest;
        }

      
        public async Task<DtoServicioSocio> ObtenerServicioSocioPorID(int idServicioSocio)
        {
            object value = new object();
            try
            {

                sqlConnection = new SqlConnection(bdConexion.connectionString);
                sqlConnection.Open();

                DynamicParameters queryParameters = new DynamicParameters();
                queryParameters.Add("@IdServicioSocio", idServicioSocio);

                var result = await sqlConnection.QueryAsync<DtoServicioSocio>(obtenerServicioSocioPorIDQuery, queryParameters, commandType: System.Data.CommandType.StoredProcedure);
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
            return (DtoServicioSocio)Convert.ChangeType(value, typeof(DtoServicioSocio));
        }

        public async Task<DtoRespuestaSP> EliminarServicioSocio(int idServicioSocio)
        {
            DtoRespuestaSP dtoRespuestaSP = new DtoRespuestaSP();
            try
            {
                sqlConnection = new SqlConnection(bdConexion.connectionString);
                sqlConnection.Open();
                sqlCommand = new SqlCommand(eliminarServicioSocioQuery, sqlConnection);
                sqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                

                sqlCommand.Parameters.AddWithValue("@IdServicioSocio", idServicioSocio);

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
        
    }
}
