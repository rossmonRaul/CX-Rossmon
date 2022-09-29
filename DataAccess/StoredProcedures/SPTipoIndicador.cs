using Dapper;
using Dominio.Dto;
using Dominio.Entiti;
using Dominio.Interfaces.Infraestructura.BaseDatos;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.StoredProcedures
{/*
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
    }*/
    public class SPTipoIndicador : IRepositorioTipoIndicador
    {
        private readonly IContextoBD contextoBD;

        public SPTipoIndicador(IContextoBD contextoBD)
        {
            this.contextoBD = contextoBD;
        }

        public async Task<DtoRespuestaSP> InsertarTipoIndicador(EntitiTipoIndicador entitiTipoIndicador)
        {
            try
            {
                Dictionary<string, object> data = new Dictionary<string, object>();
                data.Add("TipoIndicador", entitiTipoIndicador.TipoIndicador);
                data.Add("Sigla", entitiTipoIndicador.Sigla);
                data.Add("Minimo", entitiTipoIndicador.Minimo);
                data.Add("Maximo", entitiTipoIndicador.Maximo);

                string query = "SPInsertarTipoIndicador";

                return await this.contextoBD.EjecutarSP(query, data);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<DtoRespuestaSP> ActualizarTipoIndicador(EntitiTipoIndicador entitiTipoIndicador)
        {

            try
            {
                Dictionary<string, object> data = new Dictionary<string, object>();

                data.Add("IdTipoIndicador", entitiTipoIndicador.IdTipoIndicador);
                data.Add("TipoIndicador", entitiTipoIndicador.TipoIndicador);
                data.Add("Sigla", entitiTipoIndicador.Sigla);
                data.Add("Minimo", entitiTipoIndicador.Minimo);
                data.Add("Maximo", entitiTipoIndicador.Maximo);
                string query = "SPActualizarTipoIndicador";

                return await this.contextoBD.EjecutarSP(query, data);
            }
            catch (Exception)
            {
                throw;
            }
        }
        public async Task<DtoRespuestaSP> ActualizarValorIndicador(EntitiValorIndicador entitiValorIndicador)
        {

            try
            {
                Dictionary<string, object> data = new Dictionary<string, object>();

                data.Add("IdClasificacion", entitiValorIndicador.IdClasificacion);
                data.Add("Clasificacion", entitiValorIndicador.Clasificacion);
               
                string query = "SPActualizarClasificacionIndicador";

                return await this.contextoBD.EjecutarSP(query, data);
            }
            catch (Exception)
            {
                throw;
            }
        }
        public async Task<DtoRespuestaSP> EliminarTipoIndicador(int idTipoIndicador)

        {
            try
            {
                Dictionary<string, object> data = new Dictionary<string, object>();
                data.Add("IdTipoIndicador", idTipoIndicador);
                string query = "SPEliminarTipoIndicador";

                return await this.contextoBD.EjecutarSP(query, data);
            }
            catch (Exception)
            {
                throw;
            }
        }


        public async Task<DtoTipoIndicador> ObtenerTipoIndicadorPorID(int idTipoIndicador)
        {
            try
            {
                Dictionary<string, object> data = new Dictionary<string, object>();
                data.Add("IdTipoIndicador", idTipoIndicador);
                string query = "SPObtenerTipoIndicadorPorID";

                return await this.contextoBD.ObtenerDato<DtoTipoIndicador>(query, data);
            }
            catch (Exception)
            {
                throw;
            }
        }
        public async Task<List<DtoValorIndicador>>ObtenerValoresIndicadorPorID(int idTipoIndicador)
        {
            try
            {
                Dictionary<string, object> data = new Dictionary<string, object>();
                data.Add("IdTipoIndicador", idTipoIndicador);
                string query = "SPObtenerValoresIndicadorPorId";

                return await this.contextoBD.ObtenerListaDeDatos<DtoValorIndicador>(query, data);
            }
            catch (Exception)
            {
                throw;
            }
        }
        public async Task<List<DtoTipoIndicador>> ObtenerTiposIndicadores()
        {
            try
            {
                string query = "SPObtenerTiposIndicadores";
                var result = await this.contextoBD.ObtenerListaDeDatos<DtoTipoIndicador>(query);

                return result;
            }
            catch (Exception)
            {
                throw;
            }
        }
        public async Task<List<DtoTipoIndicador>> ObtenerTiposIndicadoresActivos()
        {
            try
            {
                string query = "SPObtenerIndicadoresActivas";
                var result = await this.contextoBD.ObtenerListaDeDatos<DtoTipoIndicador>(query);

                return result;
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}
