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

    public class SPEstadoHallazgo
    {
        BdConexion bdConexion = new BdConexion();
        private SqlCommand sqlCommand;
        private SqlConnection sqlConnection;


        private readonly string obtenerEstadoHallazgoQuery = "SPObtenerEstadoHallazgo";
        private readonly string insertarEstadoHallazgoQuery = "SPInsertarEstadoHallazgo";
        private readonly string actualizarEstadoHallazgoQuery = "SPActualizarEstadoHallazgo";
        private readonly string eliminarEstadoHallazgoQuery = "SPEliminarEstadoHallazgo";
        private readonly string obtenerEstadoHallazgoPorIDQuery = "SPObtenerEstadoHallazgoPorID";
        public async Task<List<DtoEstadoHallazgo>> ObtenerEstadoHallazgo()
        {
            List<DtoEstadoHallazgo> lista = new List<DtoEstadoHallazgo>();
            try
            {

                using (var connection = new SqlConnection(bdConexion.connectionString))
                {
                    var result = await connection.QueryAsync<DtoEstadoHallazgo>(obtenerEstadoHallazgoQuery, commandType: System.Data.CommandType.StoredProcedure);
                    lista = result.ToList();
                }

            }
            catch (Exception)
            {
                throw;
            }

            return lista;
        }

        public async Task<DtoRespuestaSP> InsertarEstadoHallazgo(EntitiEstadoHallazgo entitiEstadoHallazgo)
        {
            DtoRespuestaSP dtoRespuestaSP = new DtoRespuestaSP();
            try
            {
                sqlConnection = new SqlConnection(bdConexion.connectionString);
                sqlConnection.Open();
                sqlCommand = new SqlCommand(insertarEstadoHallazgoQuery, sqlConnection); //cambiar SP 
                sqlCommand.CommandType = System.Data.CommandType.StoredProcedure;

                sqlCommand.Parameters.AddWithValue("@Codigo", entitiEstadoHallazgo.codigo);
                sqlCommand.Parameters.AddWithValue("@EstadoHallazgo", entitiEstadoHallazgo.estadoHallazgo); //colocar parametros correspondientes

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

        public async Task<DtoRespuestaSP> ActualizarEstadoHallazgo(EntitiEstadoHallazgo entitiEstadoHallazgo)
        {
            DtoRespuestaSP dtoRespuestaSP = new DtoRespuestaSP();
            try
            {
                sqlConnection = new SqlConnection(bdConexion.connectionString);
                sqlConnection.Open();
                sqlCommand = new SqlCommand(actualizarEstadoHallazgoQuery, sqlConnection);
                sqlCommand.CommandType = System.Data.CommandType.StoredProcedure;

                sqlCommand.Parameters.AddWithValue("@IdEstadoHallazgo", entitiEstadoHallazgo.idEstadoHallazgo);
                sqlCommand.Parameters.AddWithValue("@EstadoHallazgo", entitiEstadoHallazgo.estadoHallazgo);

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

        public async Task<DtoRespuestaSP> EliminarEstadoHallazgo(int idEstadoHallazgo)
        {
            DtoRespuestaSP dtoRespuestaSP = new DtoRespuestaSP();
            try
            {
                sqlConnection = new SqlConnection(bdConexion.connectionString);
                sqlConnection.Open();
                sqlCommand = new SqlCommand(eliminarEstadoHallazgoQuery, sqlConnection);
                sqlCommand.CommandType = System.Data.CommandType.StoredProcedure;

                sqlCommand.Parameters.AddWithValue("@IdEstadoHallazgo", idEstadoHallazgo);

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


        public async Task<DtoEstadoHallazgo> ObtenerEstadoHallazgoPorID(int idEstadoHallazgo)
        {
            object value = new object();
            try
            {

                sqlConnection = new SqlConnection(bdConexion.connectionString);
                sqlConnection.Open();

                DynamicParameters queryParameters = new DynamicParameters();
                queryParameters.Add("@IdEstadoHallazgo", idEstadoHallazgo);

                var result = await sqlConnection.QueryAsync<DtoEstadoHallazgo>(obtenerEstadoHallazgoPorIDQuery, queryParameters, commandType: System.Data.CommandType.StoredProcedure);
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
            return (DtoEstadoHallazgo)Convert.ChangeType(value, typeof(DtoEstadoHallazgo));
        }
    }
}