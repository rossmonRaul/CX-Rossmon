using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Dapper;
using DataAccess.Conexion;
using Dominio.Dto;
using Dominio.Entiti;
using Microsoft.Data.SqlClient;

namespace DataAccess.StoredProcedures
{
    public class SPSegmentos
    {
        BdConexion bdConexion = new BdConexion();
        private SqlConnection sqlConnection;

        private readonly string obtenerSegmentosQuery = "SPObtenerSegmentos";
        private readonly string insertarSegmentosQuery = "SPInsertarSegmentos";
        private readonly string actualizarSegmentoQuery = "SPActualizarSegmento";
        private readonly string obtenerSegmentoPorIDQuery = "SPObtenerSegmentoPorID";
        private readonly string eliminarSegmentoQuery = "SPEliminarSegmento";

        private SqlCommand sqlCommand;

        public async Task<List<DtoSegmentos>> ObtenerSegmentos()
        {
            List<DtoSegmentos> lista = new List<DtoSegmentos>();
            try
            {

                using (var connection = new SqlConnection(bdConexion.connectionString))
                {
                    var result = await connection.QueryAsync<DtoSegmentos>(obtenerSegmentosQuery, commandType: System.Data.CommandType.StoredProcedure);
                    lista = result.ToList();
                }

            }
            catch (Exception)
            {
                throw;
            }

            return lista;
        }

        public async Task<DtoRespuestaSP> InsertarSegmentos(EntitiSegmentos entitiSegmentos)
        {
            DtoRespuestaSP rest = new DtoRespuestaSP();
            try
            {

                using (var connection = new SqlConnection(bdConexion.connectionString))
                {
                    connection.Open();
                    sqlCommand = new SqlCommand(insertarSegmentosQuery, connection);
                    sqlCommand.CommandType = System.Data.CommandType.StoredProcedure;

                    sqlCommand.Parameters.AddWithValue("@Segmento", entitiSegmentos.Segmento);
                    sqlCommand.Parameters.AddWithValue("@IdSector", entitiSegmentos.IdSector);
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

        public async Task<DtoRespuestaSP> ActualizarSegmentos(EntitiSegmentos entitiSegmento)
        {
            DtoRespuestaSP rest = new DtoRespuestaSP();
            try
            {

                using (var connection = new SqlConnection(bdConexion.connectionString))
                {
                    connection.Open();
                    sqlCommand = new SqlCommand(actualizarSegmentoQuery, connection);
                    sqlCommand.CommandType = System.Data.CommandType.StoredProcedure;

                    sqlCommand.Parameters.AddWithValue("@IdSegmento", entitiSegmento.IdSegmento);
                    sqlCommand.Parameters.AddWithValue("@Segmento", entitiSegmento.Segmento);
                    sqlCommand.Parameters.AddWithValue("@IdSector", entitiSegmento.IdSector);
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


        public async Task<DtoSegmentos> ObtenerSegmentosPorID(int idSegmento)
        {
            object value = new object();
            try
            {

                sqlConnection = new SqlConnection(bdConexion.connectionString);
                sqlConnection.Open();

                DynamicParameters queryParameters = new DynamicParameters();
                queryParameters.Add("@IdSegmento", idSegmento);

                var result = await sqlConnection.QueryAsync<DtoSegmentos>(obtenerSegmentoPorIDQuery, queryParameters, commandType: System.Data.CommandType.StoredProcedure);
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
            return (DtoSegmentos)Convert.ChangeType(value, typeof(DtoSegmentos));
        }

        public async Task<DtoRespuestaSP> EliminarSegmento(int idSegmento)
        {
            DtoRespuestaSP dtoRespuestaSP = new DtoRespuestaSP();
            try
            {
                sqlConnection = new SqlConnection(bdConexion.connectionString);
                sqlConnection.Open();
                sqlCommand = new SqlCommand(eliminarSegmentoQuery, sqlConnection);
                sqlCommand.CommandType = System.Data.CommandType.StoredProcedure;

                sqlCommand.Parameters.AddWithValue("@IdSegmento", idSegmento);

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
