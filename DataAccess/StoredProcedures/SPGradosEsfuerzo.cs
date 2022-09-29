using System;
using System.Collections.Generic;
using System.Data;

using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Dapper;
using Dominio.Interfaces.Infraestructura.BaseDatos;
using Dominio.Dto;
using Dominio.Entiti;

namespace DataAccess.StoredProcedures
{
    /*
    public class SPGradosEsfuerzo
    {
        BdConexion bdConexion = new BdConexion();
        private SqlCommand sqlCommand;
        private SqlConnection sqlConnection;
        private readonly string obtenerGradosEsfuerzoQuery = "SPObtenerGradosEsfuerzo";
        private readonly string insertarGradosEsfuerzoQuery = "SPInsertarGradosEsfuerzo";
        private readonly string actualizarGradoEsfuerzoQuery = "SPActualizarGradoEsfuerzo";
        private readonly string obtenerGradoEsfuerzoPorIDQuery = "SPObtenerGradoEsfuerzoPorID";
        private readonly string eliminarGradoEsfuerzoQuery = "SPEliminarGradoEsfuerzo";

        public async Task<List<DtoGradosEsfuerzo>> ObtenerGradosEsfuerzo()
        {
            List<DtoGradosEsfuerzo> lista = new List<DtoGradosEsfuerzo>();
            try
            {

                using (var connection = new SqlConnection(bdConexion.connectionString))
                {
                    var result = await connection.QueryAsync<DtoGradosEsfuerzo>(obtenerGradosEsfuerzoQuery, commandType: System.Data.CommandType.StoredProcedure);
                    lista = result.ToList();
                }

            }
            catch (Exception)
            {
                throw;
            }

            return lista;
        }

        public async Task<DtoRespuestaSP> InsertarGradosEsfuerzo(EntitiGradosEsfuerzo entitiGradosEsfuerzo)
        {
            DtoRespuestaSP rest = new DtoRespuestaSP();
            try
            {

                using (var connection = new SqlConnection(bdConexion.connectionString))
                {
                    connection.Open();
                    sqlCommand = new SqlCommand(insertarGradosEsfuerzoQuery, connection);
                    sqlCommand.CommandType = System.Data.CommandType.StoredProcedure;

                    sqlCommand.Parameters.AddWithValue("@Codigo", entitiGradosEsfuerzo.Codigo);
                    sqlCommand.Parameters.AddWithValue("@GradoEsfuerzo", entitiGradosEsfuerzo.GradoEsfuerzo);
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

        public async Task<DtoRespuestaSP> ActualizarGradoEsfuerzo(EntitiGradosEsfuerzo entitiGradosEsfuerzo)
        {
            DtoRespuestaSP rest = new DtoRespuestaSP();
            try
            {

                using (var connection = new SqlConnection(bdConexion.connectionString))
                {
                    connection.Open();
                    sqlCommand = new SqlCommand(actualizarGradoEsfuerzoQuery, connection);
                    sqlCommand.CommandType = System.Data.CommandType.StoredProcedure;

                    sqlCommand.Parameters.AddWithValue("@IdGradoEsfuerzo", entitiGradosEsfuerzo.IdGradoEsfuerzo);
                    sqlCommand.Parameters.AddWithValue("@Codigo", entitiGradosEsfuerzo.Codigo);
                    sqlCommand.Parameters.AddWithValue("@GradoEsfuerzo", entitiGradosEsfuerzo.GradoEsfuerzo);

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


        public async Task<DtoGradosEsfuerzo> ObtenerGradoEsfuerzoPorID(int idGradoEsfuerzo)
        {
            object value = new object();
            try
            {

                sqlConnection = new SqlConnection(bdConexion.connectionString);
                sqlConnection.Open();

                DynamicParameters queryParameters = new DynamicParameters();
                queryParameters.Add("@IdGradoEsfuerzo", idGradoEsfuerzo);

                var result = await sqlConnection.QueryAsync<DtoGradosEsfuerzo>(obtenerGradoEsfuerzoPorIDQuery, queryParameters, commandType: System.Data.CommandType.StoredProcedure);
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
            return (DtoGradosEsfuerzo)Convert.ChangeType(value, typeof(DtoGradosEsfuerzo));
        }

        public async Task<DtoRespuestaSP> EliminarGradoEsfuerzo(int idGradoEsfuerzo)
        {
            DtoRespuestaSP dtoRespuestaSP = new DtoRespuestaSP();
            try
            {
                sqlConnection = new SqlConnection(bdConexion.connectionString);
                sqlConnection.Open();
                sqlCommand = new SqlCommand(eliminarGradoEsfuerzoQuery, sqlConnection);
                sqlCommand.CommandType = System.Data.CommandType.StoredProcedure;

                sqlCommand.Parameters.AddWithValue("@IdGradoEsfuerzo", idGradoEsfuerzo);

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
    }*/
    public class SPGradosEsfuerzo : IRepositorioGradosEsfuerzo
    {
        private readonly IContextoBD contextoBD;

        public SPGradosEsfuerzo(IContextoBD contextoBD)
        {
            this.contextoBD = contextoBD;
        }

        public async Task<DtoRespuestaSP> InsertarGradosEsfuerzo(EntitiGradosEsfuerzo entitiGradosEsfuerzo)
        {
            try
            {
                Dictionary<string, object> data = new Dictionary<string, object>();
                data.Add("Codigo", entitiGradosEsfuerzo.Codigo);
                data.Add("GradoEsfuerzo", entitiGradosEsfuerzo.GradoEsfuerzo);

                string query = "SPInsertarGradosEsfuerzo";

                return await this.contextoBD.EjecutarSP(query, data);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<DtoRespuestaSP> ActualizarGradoEsfuerzo(EntitiGradosEsfuerzo entitiGradosEsfuerzo)
        {

            try
            {
                Dictionary<string, object> data = new Dictionary<string, object>();

                data.Add("IdGradoEsfuerzo", entitiGradosEsfuerzo.IdGradoEsfuerzo);
                data.Add("Codigo", entitiGradosEsfuerzo.Codigo);
                data.Add("GradoEsfuerzo", entitiGradosEsfuerzo.GradoEsfuerzo);
                string query = "SPActualizarGradoEsfuerzo";

                return await this.contextoBD.EjecutarSP(query, data);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<DtoRespuestaSP> EliminarGradoEsfuerzo(int idGradoEsfuerzo)

        {
            try
            {
                Dictionary<string, object> data = new Dictionary<string, object>();
                data.Add("IdGradoEsfuerzo", idGradoEsfuerzo);
                string query = "SPEliminarGradoEsfuerzo";

                return await this.contextoBD.EjecutarSP(query, data);
            }
            catch (Exception)
            {
                throw;
            }
        }


        public async Task<DtoGradosEsfuerzo> ObtenerGradoEsfuerzoPorID(int idGradoEsfuerzo)
        {
            try
            {
                Dictionary<string, object> data = new Dictionary<string, object>();
                data.Add("IdGradoEsfuerzo", idGradoEsfuerzo);
                string query = "SPObtenerGradoEsfuerzoPorID";

                return await this.contextoBD.ObtenerDato<DtoGradosEsfuerzo>(query, data);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<List<DtoGradosEsfuerzo>> ObtenerGradosEsfuerzo()
        {
            try
            {
                string query = "SPObtenerGradosEsfuerzo";
                var result = await this.contextoBD.ObtenerListaDeDatos<DtoGradosEsfuerzo>(query);

                return result;
            }
            catch (Exception)
            {
                throw;
            }
        }
    }

}