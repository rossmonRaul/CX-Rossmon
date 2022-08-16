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
    public class SPSectores
    {
        BdConexion bdConexion = new BdConexion();
        private SqlCommand sqlCommand;
        private SqlConnection sqlConnection;
        private readonly string obtenerSectoresQuery = "SPObtenerSectores";
        private readonly string insertarSectoresQuery = "SPInsertarSectores";
        private readonly string actualizarSectoresQuery = "SPActualizarSector";
        private readonly string obtenerSectoresPorIDQuery = "SPObtenerSectorPorID";
        private readonly string eliminarSectorQuery = "SPEliminarSector";
        private readonly string obtenerSectoresActivosQuery = "SPObtenerSectoresActivos";
        public async Task<List<DtoSectores>> ObtenerSectores()
        {
            List<DtoSectores> lista = new List<DtoSectores>();
            try
            {

                using (var connection = new SqlConnection(bdConexion.connectionString))
                {
                    var result = await connection.QueryAsync<DtoSectores>(obtenerSectoresQuery, commandType: System.Data.CommandType.StoredProcedure);
                    lista = result.ToList();
                }

            }
            catch (Exception)
            {
                throw;
            }

            return lista;
        }

        public async Task<List<DtoSectores>> ObtenerSectoresActivos()
        {
            List<DtoSectores> lista = new List<DtoSectores>();
            try
            {

                using (var connection = new SqlConnection(bdConexion.connectionString))
                {
                    var result = await connection.QueryAsync<DtoSectores>(obtenerSectoresActivosQuery, commandType: System.Data.CommandType.StoredProcedure);
                    lista = result.ToList();
                }

            }
            catch (Exception)
            {
                throw;
            }

            return lista;
        }

        public async Task<DtoRespuestaSP> InsertarSectores(EntitiSectores entitiSectores)
        {
            DtoRespuestaSP rest = new DtoRespuestaSP();
            try
            {

                using (var connection = new SqlConnection(bdConexion.connectionString))
                {
                    connection.Open();
                    sqlCommand = new SqlCommand(insertarSectoresQuery, connection);
                    sqlCommand.CommandType = System.Data.CommandType.StoredProcedure;

                    sqlCommand.Parameters.AddWithValue("@Sector", entitiSectores.Sector);
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


        public async Task<DtoRespuestaSP> ActualizarSectores(EntitiSectores entitiSectores)
        {
            DtoRespuestaSP rest = new DtoRespuestaSP();
            try
            {

                using (var connection = new SqlConnection(bdConexion.connectionString))
                {
                    connection.Open();
                    sqlCommand = new SqlCommand(actualizarSectoresQuery, connection);
                    sqlCommand.CommandType = System.Data.CommandType.StoredProcedure;

                    sqlCommand.Parameters.AddWithValue("@Sector", entitiSectores.Sector);
                    sqlCommand.Parameters.AddWithValue("@IdSector", entitiSectores.IdSector);
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


        public async Task<DtoSectores> ObtenerSectoresPorID(int idSector)
        {
            object value = new object();
            try
            {

                sqlConnection = new SqlConnection(bdConexion.connectionString);
                sqlConnection.Open();

                DynamicParameters queryParameters = new DynamicParameters();
                queryParameters.Add("@IdSector", idSector);

                var result = await sqlConnection.QueryAsync<DtoSectores>(obtenerSectoresPorIDQuery, queryParameters, commandType: System.Data.CommandType.StoredProcedure);
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
            return (DtoSectores)Convert.ChangeType(value, typeof(DtoSectores));
        }

        public async Task<DtoRespuestaSP> EliminarSector(int idSector)
        {
            DtoRespuestaSP dtoRespuestaSP = new DtoRespuestaSP();
            try
            {
                sqlConnection = new SqlConnection(bdConexion.connectionString);
                sqlConnection.Open();
                sqlCommand = new SqlCommand(eliminarSectorQuery, sqlConnection);
                sqlCommand.CommandType = System.Data.CommandType.StoredProcedure;

                sqlCommand.Parameters.AddWithValue("@IdSector", idSector);

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