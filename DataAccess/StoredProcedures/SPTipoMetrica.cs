using Dapper;
using Dominio.Dto;
using Dominio.Entiti;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Dominio.Interfaces.Infraestructura.BaseDatos;

namespace DataAccess.StoredProcedures
{/*
    public class SPTipoMetrica
    {
        BdConexion bdConexion = new BdConexion();
        private SqlCommand sqlCommand;
        private SqlConnection sqlConnection;

        private readonly string obtenerTipoMetricaQuery = "SPObtenerTiposMetricas";
        private readonly string insertarTipoMetricaQuery = "SPInsertarTipoMetrica";
        private readonly string actualizarTipoMetricaQuery = "SPActualizarTipoMetrica";
        private readonly string eliminarTipoMetricaQuery = "SPEliminarTipoMetrica";
        private readonly string obtenerTipoMetricaPorIDQuery = "SPObtenerTipoMetricaPorID";
        private readonly string obtenerTipoMetricaActivos = "SPObtenerMetricasActivas";
        public async Task<DtoRespuestaSP> InsertarTipoMetrica(EntitiTipoMetrica entitiTipoMetrica)
        {
            DtoRespuestaSP dtoRespuestaSP = new DtoRespuestaSP();
            try
            {
                sqlConnection = new SqlConnection(bdConexion.connectionString);
                sqlConnection.Open();
                sqlCommand = new SqlCommand(insertarTipoMetricaQuery, sqlConnection); //cambiar SP 
                sqlCommand.CommandType = System.Data.CommandType.StoredProcedure;

                sqlCommand.Parameters.AddWithValue("@Descripcion", entitiTipoMetrica.Descripcion);
                sqlCommand.Parameters.AddWithValue("@Tipo", entitiTipoMetrica.Tipo);



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


        public async Task<DtoRespuestaSP> ActualizarTipoMetrica(EntitiTipoMetrica entitiTipoMetrica)
        {
            DtoRespuestaSP dtoRespuestaSP = new DtoRespuestaSP();
            try
            {
                sqlConnection = new SqlConnection(bdConexion.connectionString);
                sqlConnection.Open();
                sqlCommand = new SqlCommand(actualizarTipoMetricaQuery, sqlConnection);
                sqlCommand.CommandType = System.Data.CommandType.StoredProcedure;

                sqlCommand.Parameters.AddWithValue("@IdTipoMetrica", entitiTipoMetrica.IdTipoMetrica);
                sqlCommand.Parameters.AddWithValue("@Descripcion", entitiTipoMetrica.Descripcion);
                sqlCommand.Parameters.AddWithValue("@Tipo", entitiTipoMetrica.Tipo);

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
        

        public async Task<DtoRespuestaSP> EliminarTipoMetrica(int idTipoMetrica)
        {
            DtoRespuestaSP dtoRespuestaSP = new DtoRespuestaSP();
            try
            {
                sqlConnection = new SqlConnection(bdConexion.connectionString);
                sqlConnection.Open();
                sqlCommand = new SqlCommand(eliminarTipoMetricaQuery, sqlConnection);
                sqlCommand.CommandType = System.Data.CommandType.StoredProcedure;

                sqlCommand.Parameters.AddWithValue("@IdTipoMetrica", idTipoMetrica);

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

        public async Task<DtoTipoMetrica> ObtenerTipoMetricaPorID(int idTipoMetrica)
        {
            object value = new object();
            try
            {

                sqlConnection = new SqlConnection(bdConexion.connectionString);
                sqlConnection.Open();

                DynamicParameters queryParameters = new DynamicParameters();
                queryParameters.Add("@IdTipoMetrica", idTipoMetrica);

                var result = await sqlConnection.QueryAsync<DtoTipoMetrica>(obtenerTipoMetricaPorIDQuery, queryParameters, commandType: System.Data.CommandType.StoredProcedure);
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
            return (DtoTipoMetrica)Convert.ChangeType(value, typeof(DtoTipoMetrica));
        }
      

        public async Task<List<DtoTipoMetrica>> ObtenerTiposMetricas()
        {
            List<DtoTipoMetrica> lista = new List<DtoTipoMetrica>();
            try
            {

                using (var connection = new SqlConnection(bdConexion.connectionString))
                {
                    var result = await connection.QueryAsync<DtoTipoMetrica>(obtenerTipoMetricaQuery, commandType: System.Data.CommandType.StoredProcedure);
                    lista = result.ToList();
                }

            }
            catch (Exception)
            {
                throw;
            }

            return lista;
        }

        public async Task<List<DtoTipoMetrica>> ObtenerTiposMetricasActivos()
        {
            List<DtoTipoMetrica> lista = new List<DtoTipoMetrica>();
            try
            {

                using (var connection = new SqlConnection(bdConexion.connectionString))
                {
                    var result = await connection.QueryAsync<DtoTipoMetrica>(obtenerTipoMetricaActivos, commandType: System.Data.CommandType.StoredProcedure);
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
    public class SPTipoMetrica : IRepositorioTipoMetrica
    {
        private readonly IContextoBD contextoBD;

        public SPTipoMetrica(IContextoBD contextoBD)
        {
            this.contextoBD = contextoBD;
        }

        public async Task<DtoRespuestaSP> InsertarTipoMetrica(EntitiTipoMetrica entitiTipoMetrica)
        {
            try
            {
                Dictionary<string, object> data = new Dictionary<string, object>();
                data.Add("Descripcion", entitiTipoMetrica.Descripcion);
                data.Add("Tipo", entitiTipoMetrica.Tipo);

                string query = "SPInsertarTipoMetrica";

                return await this.contextoBD.EjecutarSP(query, data);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<DtoRespuestaSP> ActualizarTipoMetrica(EntitiTipoMetrica entitiTipoMetrica)
        {

            try
            {
                Dictionary<string, object> data = new Dictionary<string, object>();

                data.Add("IdTipoMetrica", entitiTipoMetrica.IdTipoMetrica);
                data.Add("Descripcion", entitiTipoMetrica.Descripcion);
                data.Add("Tipo", entitiTipoMetrica.Tipo);
                string query = "SPActualizarTipoMetrica";

                return await this.contextoBD.EjecutarSP(query, data);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<DtoRespuestaSP> EliminarTipoMetrica(int idTipoMetrica)

        {
            try
            {
                Dictionary<string, object> data = new Dictionary<string, object>();
                data.Add("IdTipoMetrica", idTipoMetrica);
                string query = "SPEliminarTipoMetrica";

                return await this.contextoBD.EjecutarSP(query, data);
            }
            catch (Exception)
            {
                throw;
            }
        }


        public async Task<DtoTipoMetrica> ObtenerTipoMetricaPorID(int idTipoMetrica)
        {
            try
            {
                Dictionary<string, object> data = new Dictionary<string, object>();
                data.Add("IdTipoMetrica", idTipoMetrica);
                string query = "SPObtenerTipoMetricaPorID";

                return await this.contextoBD.ObtenerDato<DtoTipoMetrica>(query, data);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<List<DtoTipoMetrica>> ObtenerTiposMetricas()
        {
            try
            {
                string query = "SPObtenerTiposMetricas";
                var result = await this.contextoBD.ObtenerListaDeDatos<DtoTipoMetrica>(query);

                return result;
            }
            catch (Exception)
            {
                throw;
            }
        }
        public async Task<List<DtoTipoMetrica>> ObtenerTiposMetricasActivos()
        {
            try
            {
                string query = "SPObtenerMetricasActivas";
                var result = await this.contextoBD.ObtenerListaDeDatos<DtoTipoMetrica>(query);

                return result;
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}
