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

                sqlCommand.Parameters.AddWithValue("@Nombre", entitiSocio.Nombre); //colocar parametros correspondientes
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
                queryParameters.Add("@Cedula", idSocio);

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

                sqlCommand.Parameters.AddWithValue("@Cedula", idSocio);

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
                sqlCommand.Parameters.AddWithValue("@Cedula", entitiSocio.Cedula); //colocar parametros correspondientes
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


}
