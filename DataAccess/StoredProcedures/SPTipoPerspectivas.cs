using Dapper;
using DataAccess.Conexion;
using Dominio.Dto;
using Dominio.Entiti;
using Microsoft.Data.SqlClient;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.StoredProcedures
{
    public class SPTipoPerspectivas
    {
        BdConexion bdConexion = new BdConexion();
        private SqlCommand sqlCommand;
        private SqlConnection sqlConnection;


        private readonly string obtenerTipoPerspectivasQuery = "SPObtenerTipoPerspectivas";
        private readonly string insertarTipoPerspectivasQuery = "SPInsertarTipoPerspectivas";
        private readonly string actualizarTipoPerspectivasQuery = "SPActualizarTipoPerspectivas";
        private readonly string eliminarTipoPerspectivasQuery = "SPEliminarTipoPerspectivas";
        private readonly string obtenerTipoPerspectivasPorIDQuery = "SPObtenerTipoPerspectivasPorID";
        private readonly string obtenerTipoPerspectivasActivos = "SPObtenerTipoPerspectivasActivos";



        public async Task<DtoRespuestaSP> InsertarTipoPerspectivas(EntitiTipoPerspectivas entitiTipoPerspectivas)
        {
            DtoRespuestaSP dtoRespuestaSP = new DtoRespuestaSP();
            try
            {
                sqlConnection = new SqlConnection(bdConexion.connectionString);
                sqlConnection.Open();
                sqlCommand = new SqlCommand(insertarTipoPerspectivasQuery, sqlConnection); //cambiar SP 
                sqlCommand.CommandType = System.Data.CommandType.StoredProcedure;

                sqlCommand.Parameters.AddWithValue("@TipoPerspectiva", entitiTipoPerspectivas.tipoPerspectiva);


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


        public async Task<DtoRespuestaSP> ActualizarTipoPerspectivas(EntitiTipoPerspectivas entitiTipoPerspectivas)
        {
            DtoRespuestaSP dtoRespuestaSP = new DtoRespuestaSP();
            try
            {
                sqlConnection = new SqlConnection(bdConexion.connectionString);
                sqlConnection.Open();
                sqlCommand = new SqlCommand(actualizarTipoPerspectivasQuery, sqlConnection);
                sqlCommand.CommandType = System.Data.CommandType.StoredProcedure;

                sqlCommand.Parameters.AddWithValue("@IdTipoPerspectiva", entitiTipoPerspectivas.idTipoPerspectiva);
                sqlCommand.Parameters.AddWithValue("@TipoPerspectiva", entitiTipoPerspectivas.tipoPerspectiva);


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

        public async Task<DtoRespuestaSP> EliminarTipoPerspectivas(int idTipoPerspectivas)
        {
            DtoRespuestaSP dtoRespuestaSP = new DtoRespuestaSP();
            try
            {
                sqlConnection = new SqlConnection(bdConexion.connectionString);
                sqlConnection.Open();
                sqlCommand = new SqlCommand(eliminarTipoPerspectivasQuery, sqlConnection);
                sqlCommand.CommandType = System.Data.CommandType.StoredProcedure;

                sqlCommand.Parameters.AddWithValue("@IdTipoPerspectiva", idTipoPerspectivas);

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

        public async Task<DtoTipoPerspectivas> ObtenerTipoPerspectivasPorID(int idTipoPerspectivas)
        {
            object value = new object();
            try
            {

                sqlConnection = new SqlConnection(bdConexion.connectionString);
                sqlConnection.Open();

                DynamicParameters queryParameters = new DynamicParameters();
                queryParameters.Add("@IdTipoPerspectiva", idTipoPerspectivas);

                var result = await sqlConnection.QueryAsync<DtoTipoPerspectivas>(obtenerTipoPerspectivasPorIDQuery, queryParameters, commandType: System.Data.CommandType.StoredProcedure);
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
            return (DtoTipoPerspectivas)Convert.ChangeType(value, typeof(DtoTipoPerspectivas));
        }


        public async Task<List<DtoTipoPerspectivas>> ObtenerTipoPerspectivas()
        {
            List<DtoTipoPerspectivas> lista = new List<DtoTipoPerspectivas>();
            try
            {

                using (var connection = new SqlConnection(bdConexion.connectionString))
                {
                    var result = await connection.QueryAsync<DtoTipoPerspectivas>(obtenerTipoPerspectivasQuery, commandType: System.Data.CommandType.StoredProcedure);
                    lista = result.ToList();
                }

            }
            catch (Exception)
            {
                throw;
            }

            return lista;
        }

        public async Task<List<DtoTipoPerspectivas>> ObtenerTipoPerspectivasActivos()
        {
            List<DtoTipoPerspectivas> lista = new List<DtoTipoPerspectivas>();
            try
            {

                using (var connection = new SqlConnection(bdConexion.connectionString))
                {
                    var result = await connection.QueryAsync<DtoTipoPerspectivas>(obtenerTipoPerspectivasActivos, commandType: System.Data.CommandType.StoredProcedure);
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
