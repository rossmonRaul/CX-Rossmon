using Dapper;
using Dominio.Dto;
using Dominio.Entiti;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Dominio.Interfaces.Infraestructura.BaseDatos;

namespace DataAccess.StoredProcedures
{
    /*
    public class SPEstadoAceptacion
    {
        BdConexion bdConexion = new BdConexion();
        private SqlCommand sqlCommand;
        private SqlConnection sqlConnection;


        private readonly string obtenerEstadoAceptacionQuery = "SPObtenerEstadoAceptacion";
        private readonly string insertarEstadoAceptacionQuery = "SPInsertarEstadoAceptacion";
        private readonly string actualizarEstadoAceptacionQuery = "SPActualizarEstadoAceptacion";
        private readonly string eliminarEstadoAceptacionQuery = "SPEliminarEstadoAceptacion";
        private readonly string obtenerEstadoAceptacionPorIDQuery = "SPObtenerEstadoAceptacionPorID";
        public async Task<List<DtoEstadoAceptacion>> ObtenerEstadoAceptacion()
        {
            List<DtoEstadoAceptacion> lista = new List<DtoEstadoAceptacion>();
            try
            {

                using (var connection = new SqlConnection(bdConexion.connectionString))
                {
                    var result = await connection.QueryAsync<DtoEstadoAceptacion>(obtenerEstadoAceptacionQuery, commandType: System.Data.CommandType.StoredProcedure);
                    lista = result.ToList();
                }

            }
            catch (Exception)
            {
                throw;
            }

            return lista;
        }

        public async Task<DtoRespuestaSP> InsertarEstadoAceptacion(EntitiEstadoAceptacion entitiEstadoAceptacion)
        {
            DtoRespuestaSP dtoRespuestaSP = new DtoRespuestaSP();
            try
            {
                sqlConnection = new SqlConnection(bdConexion.connectionString);
                sqlConnection.Open();
                sqlCommand = new SqlCommand(insertarEstadoAceptacionQuery, sqlConnection); //cambiar SP 
                sqlCommand.CommandType = System.Data.CommandType.StoredProcedure;

                sqlCommand.Parameters.AddWithValue("@Codigo", entitiEstadoAceptacion.codigo);
                sqlCommand.Parameters.AddWithValue("@EstadoAceptacion", entitiEstadoAceptacion.estadoAceptacion); //colocar parametros correspondientes

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

        public async Task<DtoRespuestaSP> ActualizarEstadoAceptacion(EntitiEstadoAceptacion entitiEstadoAceptacion)
        {
            DtoRespuestaSP dtoRespuestaSP = new DtoRespuestaSP();
            try
            {
                sqlConnection = new SqlConnection(bdConexion.connectionString);
                sqlConnection.Open();
                sqlCommand = new SqlCommand(actualizarEstadoAceptacionQuery, sqlConnection);
                sqlCommand.CommandType = System.Data.CommandType.StoredProcedure;

                sqlCommand.Parameters.AddWithValue("@IdEstadoAceptacion", entitiEstadoAceptacion.idEstadoAceptacion);
                sqlCommand.Parameters.AddWithValue("@EstadoAceptacion", entitiEstadoAceptacion.estadoAceptacion);

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

        public async Task<DtoRespuestaSP> EliminarEstadoAceptacion(int idEstadoAceptacion)
        {
            DtoRespuestaSP dtoRespuestaSP = new DtoRespuestaSP();
            try
            {
                sqlConnection = new SqlConnection(bdConexion.connectionString);
                sqlConnection.Open();
                sqlCommand = new SqlCommand(eliminarEstadoAceptacionQuery, sqlConnection);
                sqlCommand.CommandType = System.Data.CommandType.StoredProcedure;

                sqlCommand.Parameters.AddWithValue("@IdEstadoAceptacion", idEstadoAceptacion);

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


        public async Task<DtoEstadoAceptacion> ObtenerEstadoAceptacionPorID(int idEstadoAceptacion)
        {
            object value = new object();
            try
            {

                sqlConnection = new SqlConnection(bdConexion.connectionString);
                sqlConnection.Open();

                DynamicParameters queryParameters = new DynamicParameters();
                queryParameters.Add("@IdEstadoAceptacion", idEstadoAceptacion);

                var result = await sqlConnection.QueryAsync<DtoEstadoAceptacion>(obtenerEstadoAceptacionPorIDQuery, queryParameters, commandType: System.Data.CommandType.StoredProcedure);
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
            return (DtoEstadoAceptacion)Convert.ChangeType(value, typeof(DtoEstadoAceptacion));
        }
    }
    */
    public class SPEstadoAceptacion : IRepositorioEstadoAceptacion
    {
        private readonly IContextoBD contextoBD;

        public SPEstadoAceptacion(IContextoBD contextoBD)
        {
            this.contextoBD = contextoBD;
        }

        public async Task<DtoRespuestaSP> InsertarEstadoAceptacion(EntitiEstadoAceptacion entitiEstadoAceptacion)
        {
            try
            {
                Dictionary<string, object> data = new Dictionary<string, object>();
                data.Add("Codigo", entitiEstadoAceptacion.codigo);
                data.Add("EstadoAceptacion", entitiEstadoAceptacion.estadoAceptacion);

                string query = "SPInsertarEstadoAceptacion";

                return await this.contextoBD.EjecutarSP(query, data);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<DtoRespuestaSP> ActualizarEstadoAceptacion(EntitiEstadoAceptacion entitiEstadoAceptacion)
        {

            try
            {
                Dictionary<string, object> data = new Dictionary<string, object>();

                data.Add("IdEstadoAceptacion", entitiEstadoAceptacion.idEstadoAceptacion);
                data.Add("EstadoAceptacion", entitiEstadoAceptacion.estadoAceptacion);
                string query = "SPActualizarEstadoAceptacion";

                return await this.contextoBD.EjecutarSP(query, data);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<DtoRespuestaSP> EliminarEstadoAceptacion(int idEstadoAceptacion)

        {
            try
            {
                Dictionary<string, object> data = new Dictionary<string, object>();
                data.Add("IdEstadoAceptacion", idEstadoAceptacion);
                string query = "SPEliminarEstadoAceptacion";

                return await this.contextoBD.EjecutarSP(query, data);
            }
            catch (Exception)
            {
                throw;
            }
        }


        public async Task<DtoEstadoAceptacion> ObtenerEstadoAceptacionPorID(int idEstadoAceptacion)
        {
            try
            {
                Dictionary<string, object> data = new Dictionary<string, object>();
                data.Add("IdEstadoAceptacion", idEstadoAceptacion);
                string query = "SPObtenerEstadoAceptacionPorID";

                return await this.contextoBD.ObtenerDato<DtoEstadoAceptacion>(query, data);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<List<DtoEstadoAceptacion>> ObtenerEstadoAceptacion()
        {
            try
            {
                string query = "SPObtenerEstadoAceptacion";
                var result = await this.contextoBD.ObtenerListaDeDatos<DtoEstadoAceptacion>(query);

                return result;
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
    
}