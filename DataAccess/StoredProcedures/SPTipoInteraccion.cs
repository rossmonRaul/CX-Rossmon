using Dapper;
using Dominio.Dto;
using Dominio.Entiti;
using Dominio.Interfaces.Infraestructura.BaseDatos;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.StoredProcedures
{/*
    public class SPTipoInteraccion
    {
        BdConexion bdConexion = new BdConexion();
        private SqlCommand sqlCommand;
        private SqlConnection sqlConnection;


        private readonly string obtenerTipoInteraccionQuery = "SPObtenerTipoInteraccion";
        private readonly string insertarTipoInteraccionQuery = "SPInsertarTipoInteraccion";
        private readonly string actualizarTipoInteraccionQuery = "SPActualizarTipoInteraccion";
        private readonly string eliminarTipoInteraccionQuery = "SPEliminarTipoInteraccion";
        private readonly string obtenerTipoInteraccionPorIDQuery = "SPObtenerTipoInteraccionPorID";
        private readonly string obtenerTipoInteraccionActivos = "SPObtenerTipoInteraccionActivos";



        public async Task<DtoRespuestaSP> InsertarTipoInteraccion(EntitiTipoInteraccion entitiTipoInteraccion)
        {
            DtoRespuestaSP dtoRespuestaSP = new DtoRespuestaSP();
            try
            {
                sqlConnection = new SqlConnection(bdConexion.connectionString);
                sqlConnection.Open();
                sqlCommand = new SqlCommand(insertarTipoInteraccionQuery, sqlConnection); //cambiar SP 
                sqlCommand.CommandType = System.Data.CommandType.StoredProcedure;

                sqlCommand.Parameters.AddWithValue("@TipoInteraccion", entitiTipoInteraccion.tipoInteraccion);


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


        public async Task<DtoRespuestaSP> ActualizarTipoInteraccion(EntitiTipoInteraccion entitiTipoInteraccion)
        {
            DtoRespuestaSP dtoRespuestaSP = new DtoRespuestaSP();
            try
            {
                sqlConnection = new SqlConnection(bdConexion.connectionString);
                sqlConnection.Open();
                sqlCommand = new SqlCommand(actualizarTipoInteraccionQuery, sqlConnection);
                sqlCommand.CommandType = System.Data.CommandType.StoredProcedure;

                sqlCommand.Parameters.AddWithValue("@IdTipoInteraccion", entitiTipoInteraccion.idTipoInteraccion);
                sqlCommand.Parameters.AddWithValue("@TipoInteraccion", entitiTipoInteraccion.tipoInteraccion);


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

        public async Task<DtoRespuestaSP> EliminarTipoInteraccion(int idTipoInteraccion)
        {
            DtoRespuestaSP dtoRespuestaSP = new DtoRespuestaSP();
            try
            {
                sqlConnection = new SqlConnection(bdConexion.connectionString);
                sqlConnection.Open();
                sqlCommand = new SqlCommand(eliminarTipoInteraccionQuery, sqlConnection);
                sqlCommand.CommandType = System.Data.CommandType.StoredProcedure;

                sqlCommand.Parameters.AddWithValue("@IdTipoInteraccion", idTipoInteraccion);

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

        public async Task<DtoTipoInteraccion> ObtenerTipoInteraccionPorID(int idTipoInteraccion)
        {
            object value = new object();
            try
            {

                sqlConnection = new SqlConnection(bdConexion.connectionString);
                sqlConnection.Open();

                DynamicParameters queryParameters = new DynamicParameters();
                queryParameters.Add("@IdTipoInteraccion", idTipoInteraccion);

                var result = await sqlConnection.QueryAsync<DtoTipoInteraccion>(obtenerTipoInteraccionPorIDQuery, queryParameters, commandType: System.Data.CommandType.StoredProcedure);
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
            return (DtoTipoInteraccion)Convert.ChangeType(value, typeof(DtoTipoInteraccion));
        }


        public async Task<List<DtoTipoInteraccion>> ObtenerTipoInteraccion()
        {
            List<DtoTipoInteraccion> lista = new List<DtoTipoInteraccion>();
            try
            {

                using (var connection = new SqlConnection(bdConexion.connectionString))
                {
                    var result = await connection.QueryAsync<DtoTipoInteraccion>(obtenerTipoInteraccionQuery, commandType: System.Data.CommandType.StoredProcedure);
                    lista = result.ToList();
                }

            }
            catch (Exception)
            {
                throw;
            }

            return lista;
        }

        public async Task<List<DtoTipoInteraccion>> ObtenerTipoInteraccionActivos()
        {
            List<DtoTipoInteraccion> lista = new List<DtoTipoInteraccion>();
            try
            {

                using (var connection = new SqlConnection(bdConexion.connectionString))
                {
                    var result = await connection.QueryAsync<DtoTipoInteraccion>(obtenerTipoInteraccionActivos, commandType: System.Data.CommandType.StoredProcedure);
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
    public class SPTipoInteraccion : IRepositorioTipoInteraccion
    {
        private readonly IContextoBD contextoBD;

        public SPTipoInteraccion(IContextoBD contextoBD)
        {
            this.contextoBD = contextoBD;
        }

        public async Task<DtoRespuestaSP> InsertarTipoInteraccion(EntitiTipoInteraccion entitiTipoInteraccion)
        {
            try
            {
                Dictionary<string, object> data = new Dictionary<string, object>();
                data.Add("TipoInteraccion", entitiTipoInteraccion.tipoInteraccion);

                string query = "SPInsertarTipoInteraccion";

                return await this.contextoBD.EjecutarSP(query, data);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<DtoRespuestaSP> ActualizarTipoInteraccion(EntitiTipoInteraccion entitiTipoInteraccion)
        {

            try
            {
                Dictionary<string, object> data = new Dictionary<string, object>();

                data.Add("IdTipoInteraccion", entitiTipoInteraccion.idTipoInteraccion);
                data.Add("TipoInteraccion", entitiTipoInteraccion.tipoInteraccion);
                string query = "SPActualizarTipoInteraccion";

                return await this.contextoBD.EjecutarSP(query, data);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<DtoRespuestaSP> EliminarTipoInteraccion(int idTipoInteraccion)

        {
            try
            {
                Dictionary<string, object> data = new Dictionary<string, object>();
                data.Add("IdTipoInteraccion", idTipoInteraccion);
                string query = "SPEliminarTipoInteraccion";

                return await this.contextoBD.EjecutarSP(query, data);
            }
            catch (Exception)
            {
                throw;
            }
        }


        public async Task<DtoTipoInteraccion> ObtenerTipoInteraccionPorID(int idTipoInteraccion)
        {
            try
            {
                Dictionary<string, object> data = new Dictionary<string, object>();
                data.Add("IdTipoInteraccion", idTipoInteraccion);
                string query = "SPObtenerTipoInteraccionPorID";

                return await this.contextoBD.ObtenerDato<DtoTipoInteraccion>(query, data);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<List<DtoTipoInteraccion>> ObtenerTipoInteraccion()
        {
            try
            {
                string query = "SPObtenerTipoInteraccion";
                var result = await this.contextoBD.ObtenerListaDeDatos<DtoTipoInteraccion>(query);

                return result;
            }
            catch (Exception)
            {
                throw;
            }
        }
        public async Task<List<DtoTipoInteraccion>> ObtenerTipoInteraccionActivos()
        {
            try
            {
                string query = "SPObtenerTipoInteraccionActivos";
                var result = await this.contextoBD.ObtenerListaDeDatos<DtoTipoInteraccion>(query);

                return result;
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}
