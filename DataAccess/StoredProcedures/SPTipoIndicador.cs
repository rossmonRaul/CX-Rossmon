using Dapper;
using DataAccess.Conexion;
using Dominio.Dto;
using Dominio.Entiti;
using Microsoft.Data.SqlClient;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.StoredProcedures
{
    public class SPTipoIndicador
    {
        BdConexion bdConexion = new BdConexion();
        private SqlCommand sqlCommand;
        private SqlConnection sqlConnection;

        private readonly string obtenerTipoIndicadorQuery = "SPObtenerTiposIndicadores";
        private readonly string insertarTipoIndicadorQuery = "SPInsertarTipoIndicador";
        private readonly string actualizarTipoIndicadorQuery = "SPActualizarTipoIndicador";
        private readonly string eliminarTipoIndicadorQuery = "SPEliminarTipoIndicador";
        private readonly string obtenerTipoIndicadorPorIDQuery = "SPObtenerTipoIndicadorPorID";
        private readonly string obtenerTipoIndicadorActivos = "SPObtenerIndicadoresActivas";
        private readonly string obtenerValoresIndicadorQuery = "SPObtenerValoresIndicadorPorId";
        private readonly string actualizarValorIndicadorQuery = "SPActualizarClasificacionIndicador";
        public async Task<DtoRespuestaSP> InsertarTipoIndicador(EntitiTipoIndicador entitiTipoIndicador)
        {
            DtoRespuestaSP dtoRespuestaSP = new DtoRespuestaSP();
            try
            {
                sqlConnection = new SqlConnection(bdConexion.connectionString);
                sqlConnection.Open();
                sqlCommand = new SqlCommand(insertarTipoIndicadorQuery, sqlConnection); //cambiar SP 
                sqlCommand.CommandType = System.Data.CommandType.StoredProcedure;

                sqlCommand.Parameters.AddWithValue("@TipoIndicador", entitiTipoIndicador.TipoIndicador);
                sqlCommand.Parameters.AddWithValue("@Sigla", entitiTipoIndicador.Sigla);
                sqlCommand.Parameters.AddWithValue("@Minimo", entitiTipoIndicador.Minimo);
                sqlCommand.Parameters.AddWithValue("@Maximo", entitiTipoIndicador.Maximo);


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


        public async Task<DtoRespuestaSP> ActualizarTipoIndicador(EntitiTipoIndicador entitiTipoIndicador)
        {
            DtoRespuestaSP dtoRespuestaSP = new DtoRespuestaSP();
            try
            {
                sqlConnection = new SqlConnection(bdConexion.connectionString);
                sqlConnection.Open();
                sqlCommand = new SqlCommand(actualizarTipoIndicadorQuery, sqlConnection);
                sqlCommand.CommandType = System.Data.CommandType.StoredProcedure;

                sqlCommand.Parameters.AddWithValue("@IdTipoIndicador", entitiTipoIndicador.IdTipoIndicador);
                sqlCommand.Parameters.AddWithValue("@TipoIndicador", entitiTipoIndicador.TipoIndicador);
                sqlCommand.Parameters.AddWithValue("@Sigla", entitiTipoIndicador.Sigla);
                sqlCommand.Parameters.AddWithValue("@Minimo", entitiTipoIndicador.Minimo);
                sqlCommand.Parameters.AddWithValue("@Maximo", entitiTipoIndicador.Maximo);

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
        public async Task<DtoRespuestaSP> ActualizarValorIndicador(EntitiValorIndicador entitiValorIndicador)
        {
            DtoRespuestaSP dtoRespuestaSP = new DtoRespuestaSP();
            try
            {
                sqlConnection = new SqlConnection(bdConexion.connectionString);
                sqlConnection.Open();
                sqlCommand = new SqlCommand(actualizarValorIndicadorQuery, sqlConnection);
                sqlCommand.CommandType = System.Data.CommandType.StoredProcedure;

                sqlCommand.Parameters.AddWithValue("@IdClasificacion", entitiValorIndicador.IdClasificacion);
                sqlCommand.Parameters.AddWithValue("@Clasificacion", entitiValorIndicador.Clasificacion);
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

        public async Task<DtoRespuestaSP> EliminarTipoIndicador(int idTipoIndicador)
        {
            DtoRespuestaSP dtoRespuestaSP = new DtoRespuestaSP();
            try
            {
                sqlConnection = new SqlConnection(bdConexion.connectionString);
                sqlConnection.Open();
                sqlCommand = new SqlCommand(eliminarTipoIndicadorQuery, sqlConnection);
                sqlCommand.CommandType = System.Data.CommandType.StoredProcedure;

                sqlCommand.Parameters.AddWithValue("@IdTipoIndicador", idTipoIndicador);

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

        public async Task<DtoTipoIndicador> ObtenerTipoIndicadorPorID(int idTipoIndicador)
        {
            object value = new object();
            try
            {

                sqlConnection = new SqlConnection(bdConexion.connectionString);
                sqlConnection.Open();

                DynamicParameters queryParameters = new DynamicParameters();
                queryParameters.Add("@IdTipoIndicador", idTipoIndicador);

                var result = await sqlConnection.QueryAsync<DtoTipoIndicador>(obtenerTipoIndicadorPorIDQuery, queryParameters, commandType: System.Data.CommandType.StoredProcedure);
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
            return (DtoTipoIndicador)Convert.ChangeType(value, typeof(DtoTipoIndicador));
        }
        public async Task<List<DtoValorIndicador>> ObtenerValoresIndicadorPorID(int idTipoIndicador)
        {
            List<DtoValorIndicador> lista = new List<DtoValorIndicador>();
            try
            {

                sqlConnection = new SqlConnection(bdConexion.connectionString);
                sqlConnection.Open();

                DynamicParameters queryParameters = new DynamicParameters();
                queryParameters.Add("@IdTipoIndicador", idTipoIndicador);


                using (var connection = new SqlConnection(bdConexion.connectionString))
                {
                    var result = await connection.QueryAsync<DtoValorIndicador>(obtenerValoresIndicadorQuery, queryParameters, commandType: System.Data.CommandType.StoredProcedure);
                    lista = result.ToList();
                }

            }
            catch (Exception)
            {
                throw;
            }

            return lista;
        }

        public async Task<List<DtoTipoIndicador>> ObtenerTiposIndicadores()
        {
            List<DtoTipoIndicador> lista = new List<DtoTipoIndicador>();
            try
            {

                using (var connection = new SqlConnection(bdConexion.connectionString))
                {
                    var result = await connection.QueryAsync<DtoTipoIndicador>(obtenerTipoIndicadorQuery, commandType: System.Data.CommandType.StoredProcedure);
                    lista = result.ToList();
                }

            }
            catch (Exception)
            {
                throw;
            }

            return lista;
        }

        public async Task<List<DtoTipoIndicador>> ObtenerTiposIndicadoresActivos()
        {
            List<DtoTipoIndicador> lista = new List<DtoTipoIndicador>();
            try
            {

                using (var connection = new SqlConnection(bdConexion.connectionString))
                {
                    var result = await connection.QueryAsync<DtoTipoIndicador>(obtenerTipoIndicadorActivos, commandType: System.Data.CommandType.StoredProcedure);
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
