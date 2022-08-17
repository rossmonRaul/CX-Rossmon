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

    public class SPCanales
    {
        BdConexion bdConexion = new BdConexion();
        private SqlCommand sqlCommand;
        private SqlConnection sqlConnection;


        private readonly string obtenerCanalesQuery = "SPObtenerCanales";
        private readonly string insertarCanalesQuery = "SPInsertarCanales";
        private readonly string actualizarCanalesQuery = "SPActualizarCanales";
        private readonly string eliminarCanalesQuery = "SPEliminarCanales";
        private readonly string obtenerCanalesPorIDQuery = "SPObtenerCanalesPorID";
        public async Task<List<DtoCanales>> ObtenerCanales()
        {
            List<DtoCanales> lista = new List<DtoCanales>();
            try
            {

                using (var connection = new SqlConnection(bdConexion.connectionString))
                {
                    var result = await connection.QueryAsync<DtoCanales>(obtenerCanalesQuery, commandType: System.Data.CommandType.StoredProcedure);
                    lista = result.ToList();
                }

            }
            catch (Exception)
            {
                throw;
            }

            return lista;
        }

        public async Task<DtoRespuestaSP> InsertarCanales(EntitiCanales entitiCanales)
        {
            DtoRespuestaSP dtoRespuestaSP = new DtoRespuestaSP();
            try
            {
                sqlConnection = new SqlConnection(bdConexion.connectionString);
                sqlConnection.Open();
                sqlCommand = new SqlCommand(insertarCanalesQuery, sqlConnection); //cambiar SP 
                sqlCommand.CommandType = System.Data.CommandType.StoredProcedure;

                sqlCommand.Parameters.AddWithValue("@Canal", entitiCanales.canal); //colocar parametros correspondientes

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

        public async Task<DtoRespuestaSP> ActualizarCanales(EntitiCanales entitiCanales)
        {
            DtoRespuestaSP dtoRespuestaSP = new DtoRespuestaSP();
            try
            {
                sqlConnection = new SqlConnection(bdConexion.connectionString);
                sqlConnection.Open();
                sqlCommand = new SqlCommand(actualizarCanalesQuery, sqlConnection);
                sqlCommand.CommandType = System.Data.CommandType.StoredProcedure;

                sqlCommand.Parameters.AddWithValue("@IdCanal", entitiCanales.idCanal);
                sqlCommand.Parameters.AddWithValue("@Canal", entitiCanales.canal);

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

        public async Task<DtoRespuestaSP> EliminarCanales(int idCanal)
        {
            DtoRespuestaSP dtoRespuestaSP = new DtoRespuestaSP();
            try
            {
                sqlConnection = new SqlConnection(bdConexion.connectionString);
                sqlConnection.Open();
                sqlCommand = new SqlCommand(eliminarCanalesQuery, sqlConnection);
                sqlCommand.CommandType = System.Data.CommandType.StoredProcedure;

                sqlCommand.Parameters.AddWithValue("@IdCanal", idCanal);

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


        public async Task<DtoCanales> ObtenerCanalesPorID(int idCanal)
        {
            object value = new object();
            try
            {

                sqlConnection = new SqlConnection(bdConexion.connectionString);
                sqlConnection.Open();

                DynamicParameters queryParameters = new DynamicParameters();
                queryParameters.Add("@IdCanal", idCanal);

                var result = await sqlConnection.QueryAsync<DtoCanales>(obtenerCanalesPorIDQuery, queryParameters, commandType: System.Data.CommandType.StoredProcedure);
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
            return (DtoCanales)Convert.ChangeType(value, typeof(DtoCanales));
        }
    }
}