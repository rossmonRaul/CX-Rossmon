using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Dapper;
using Dominio.Dto;
using Dominio.Entiti;
using Dominio.Interfaces.Infraestructura.BaseDatos;

namespace DataAccess.StoredProcedures
{/*
    public class SPServicioLineaNegocio
    {
        BdConexion bdConexion = new BdConexion();
        private SqlConnection sqlConnection;

        private readonly string obtenerServicioLineaNegocioQuery = "SPObtenerServicioLineaNegocio";
        private readonly string insertarServicioLineaNegocioQuery = "SPInsertarServicioLineaNegocio";
        private readonly string actualizarServicioLineaNegocioQuery = "SPActualizarServicioLineaNegocio";
        private readonly string obtenerServicioLineaNegocioPorIDQuery = "SPObtenerServicioLineaNegocioPorID";
        private readonly string eliminarServicioLineaNegocioQuery = "SPEliminarServicioLineaNegocio";
        private readonly string obtenerLineasNegocioActivosQuery = "SPObtenerLineasNegocioActivos";

        private SqlCommand sqlCommand;

        public async Task<List<DtoServicioLineaNegocio>> ObtenerServicioLineaNegocio()
        {
            List<DtoServicioLineaNegocio> lista = new List<DtoServicioLineaNegocio>();
            try
            {

                using (var connection = new SqlConnection(bdConexion.connectionString))
                {
                    var result = await connection.QueryAsync<DtoServicioLineaNegocio>(obtenerServicioLineaNegocioQuery, commandType: System.Data.CommandType.StoredProcedure);
                    lista = result.ToList();
                }

            }
            catch (Exception)
            {
                throw;
            }

            return lista;
        }

        public async Task<DtoRespuestaSP> InsertarServicioLineaNegocio(EntitiServicioLineaNegocio entitiServicioLineaNegocio)
        {
            DtoRespuestaSP rest = new DtoRespuestaSP();
            try
            {

                using (var connection = new SqlConnection(bdConexion.connectionString))
                {
                    connection.Open();
                    sqlCommand = new SqlCommand(insertarServicioLineaNegocioQuery, connection);
                    sqlCommand.CommandType = System.Data.CommandType.StoredProcedure;

                    sqlCommand.Parameters.AddWithValue("@Servicio", entitiServicioLineaNegocio.Servicio);
                    sqlCommand.Parameters.AddWithValue("@IdLinea", entitiServicioLineaNegocio.IdLinea);
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

        public async Task<DtoRespuestaSP> ActualizarServicioLineaNegocio(EntitiServicioLineaNegocio entitiServicioLineaNegocio)
        {
            DtoRespuestaSP rest = new DtoRespuestaSP();
            try
            {

                using (var connection = new SqlConnection(bdConexion.connectionString))
                {
                    connection.Open();
                    sqlCommand = new SqlCommand(actualizarServicioLineaNegocioQuery, connection);
                    sqlCommand.CommandType = System.Data.CommandType.StoredProcedure;

                    sqlCommand.Parameters.AddWithValue("@IdServicio", entitiServicioLineaNegocio.IdServicio);
                    sqlCommand.Parameters.AddWithValue("@Servicio", entitiServicioLineaNegocio.Servicio);
                    sqlCommand.Parameters.AddWithValue("@IdLinea", entitiServicioLineaNegocio.IdLinea);
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


        public async Task<DtoServicioLineaNegocio> ObtenerServicioLineaNegocioPorID(int idServicio)
        {
            object value = new object();
            try
            {

                sqlConnection = new SqlConnection(bdConexion.connectionString);
                sqlConnection.Open();

                DynamicParameters queryParameters = new DynamicParameters();
                queryParameters.Add("@IdServicio", idServicio);

                var result = await sqlConnection.QueryAsync<DtoServicioLineaNegocio>(obtenerServicioLineaNegocioPorIDQuery, queryParameters, commandType: System.Data.CommandType.StoredProcedure);
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
            return (DtoServicioLineaNegocio)Convert.ChangeType(value, typeof(DtoServicioLineaNegocio));
        }

        public async Task<DtoRespuestaSP> EliminarServicioLineaNegocio(int idServicio)
        {
            DtoRespuestaSP dtoRespuestaSP = new DtoRespuestaSP();
            try
            {
                sqlConnection = new SqlConnection(bdConexion.connectionString);
                sqlConnection.Open();
                sqlCommand = new SqlCommand(eliminarServicioLineaNegocioQuery, sqlConnection);
                sqlCommand.CommandType = System.Data.CommandType.StoredProcedure;

                sqlCommand.Parameters.AddWithValue("@IdServicio", idServicio);

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
        public async Task<List<DtoLineaNegocio>> ObtenerLineasNegocioActivos()
        {
            List<DtoLineaNegocio> lista = new List<DtoLineaNegocio>();
            try
            {

                using (var connection = new SqlConnection(bdConexion.connectionString))
                {
                    var result = await connection.QueryAsync<DtoLineaNegocio>(obtenerLineasNegocioActivosQuery, commandType: System.Data.CommandType.StoredProcedure);
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
    public class SPServicioLineaNegocio : IRepositorioServicioLineaNegocio
    {
        private readonly IContextoBD contextoBD;

        public SPServicioLineaNegocio(IContextoBD contextoBD)
        {
            this.contextoBD = contextoBD;
        }

        public async Task<DtoRespuestaSP> InsertarServicioLineaNegocio(EntitiServicioLineaNegocio entitiServicioLineaNegocio)
        {
            try
            {
                Dictionary<string, object> data = new Dictionary<string, object>();
                data.Add("Servicio", entitiServicioLineaNegocio.Servicio);
                data.Add("IdLinea", entitiServicioLineaNegocio.IdLinea);

                string query = "SPInsertarServicioLineaNegocio";

                return await this.contextoBD.EjecutarSP(query, data);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<DtoRespuestaSP> ActualizarServicioLineaNegocio(EntitiServicioLineaNegocio entitiServicioLineaNegocio)
        {

            try
            {
                Dictionary<string, object> data = new Dictionary<string, object>();

                data.Add("IdServicio", entitiServicioLineaNegocio.IdServicio);
                data.Add("Servicio", entitiServicioLineaNegocio.Servicio);
                data.Add("IdLinea", entitiServicioLineaNegocio.IdLinea);
                string query = "SPActualizarServicioLineaNegocio";

                return await this.contextoBD.EjecutarSP(query, data);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<DtoRespuestaSP> EliminarServicioLineaNegocio(int idServicio)

        {
            try
            {
                Dictionary<string, object> data = new Dictionary<string, object>();
                data.Add("IdServicio", idServicio);
                string query = "SPEliminarServicioLineaNegocio";

                return await this.contextoBD.EjecutarSP(query, data);
            }
            catch (Exception)
            {
                throw;
            }
        }


        public async Task<DtoServicioLineaNegocio> ObtenerServicioLineaNegocioPorID(int idServicio)
        {
            try
            {
                Dictionary<string, object> data = new Dictionary<string, object>();
                data.Add("IdServicio", idServicio);
                string query = "SPObtenerServicioLineaNegocioPorID";

                return await this.contextoBD.ObtenerDato<DtoServicioLineaNegocio>(query, data);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<List<DtoServicioLineaNegocio>> ObtenerServicioLineaNegocio()
        {
            try
            {
                string query = "SPObtenerServicioLineaNegocio";
                var result = await this.contextoBD.ObtenerListaDeDatos<DtoServicioLineaNegocio>(query);

                return result;
            }
            catch (Exception)
            {
                throw;
            }
        }
        public async Task<List<DtoLineaNegocio>> ObtenerLineasNegocioActivos()
        {
            try
            {
                string query = "SPObtenerLineasNegocioActivos";
                var result = await this.contextoBD.ObtenerListaDeDatos<DtoLineaNegocio>(query);

                return result;
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}
