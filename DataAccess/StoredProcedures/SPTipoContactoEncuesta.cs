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
    public class SPTipoContactoEncuesta
    {
        BdConexion bdConexion = new BdConexion();
        private SqlCommand sqlCommand;
        private SqlConnection sqlConnection;


        private readonly string obtenerTipoContactoEncuestaQuery = "SPObtenerTipoContactoEncuesta";
        private readonly string insertarTipoContactoEncuestaQuery = "SPInsertarTipoContactoEncuesta";
        private readonly string actualizarTipoContactoEncuestaQuery = "SPActualizarTipoContactoEncuesta";
        private readonly string eliminarTipoContactoEncuestaQuery = "SPEliminarTipoContactoEncuesta";
        private readonly string obtenerTipoContactoEncuestaPorIDQuery = "SPObtenerTipoContactoEncuestaPorID";
        private readonly string obtenerTipoContactoEncuestaActivos = "SPObtenerTipoContactoEncuestaActivos";



        public async Task<DtoRespuestaSP> InsertarTipoContactoEncuesta(EntitiTipoContactoEncuesta entitiTipoContactoEncuesta)
        {
            DtoRespuestaSP dtoRespuestaSP = new DtoRespuestaSP();
            try
            {
                sqlConnection = new SqlConnection(bdConexion.connectionString);
                sqlConnection.Open();
                sqlCommand = new SqlCommand(insertarTipoContactoEncuestaQuery, sqlConnection); //cambiar SP 
                sqlCommand.CommandType = System.Data.CommandType.StoredProcedure;

                sqlCommand.Parameters.AddWithValue("@TipoContactoEncuesta", entitiTipoContactoEncuesta.tipoContactoEncuesta);


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


        public async Task<DtoRespuestaSP> ActualizarTipoContactoEncuesta(EntitiTipoContactoEncuesta entitiTipoContactoEncuesta)
        {
            DtoRespuestaSP dtoRespuestaSP = new DtoRespuestaSP();
            try
            {
                sqlConnection = new SqlConnection(bdConexion.connectionString);
                sqlConnection.Open();
                sqlCommand = new SqlCommand(actualizarTipoContactoEncuestaQuery, sqlConnection);
                sqlCommand.CommandType = System.Data.CommandType.StoredProcedure;

                sqlCommand.Parameters.AddWithValue("@IdTipoContactoEncuesta", entitiTipoContactoEncuesta.idTipoContactoEncuesta);
                sqlCommand.Parameters.AddWithValue("@TipoContactoEncuesta", entitiTipoContactoEncuesta.tipoContactoEncuesta);


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

        public async Task<DtoRespuestaSP> EliminarTipoContactoEncuesta(int idTipoContactoEncuesta)
        {
            DtoRespuestaSP dtoRespuestaSP = new DtoRespuestaSP();
            try
            {
                sqlConnection = new SqlConnection(bdConexion.connectionString);
                sqlConnection.Open();
                sqlCommand = new SqlCommand(eliminarTipoContactoEncuestaQuery, sqlConnection);
                sqlCommand.CommandType = System.Data.CommandType.StoredProcedure;

                sqlCommand.Parameters.AddWithValue("@IdTipoContactoEncuesta", idTipoContactoEncuesta);

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

        public async Task<DtoTipoContactoEncuesta> ObtenerTipoContactoEncuestaPorID(int idTipoContactoEncuesta)
        {
            object value = new object();
            try
            {

                sqlConnection = new SqlConnection(bdConexion.connectionString);
                sqlConnection.Open();

                DynamicParameters queryParameters = new DynamicParameters();
                queryParameters.Add("@IdTipoContactoEncuesta", idTipoContactoEncuesta);

                var result = await sqlConnection.QueryAsync<DtoTipoContactoEncuesta>(obtenerTipoContactoEncuestaPorIDQuery, queryParameters, commandType: System.Data.CommandType.StoredProcedure);
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
            return (DtoTipoContactoEncuesta)Convert.ChangeType(value, typeof(DtoTipoContactoEncuesta));
        }


        public async Task<List<DtoTipoContactoEncuesta>> ObtenerTipoContactoEncuesta()
        {
            List<DtoTipoContactoEncuesta> lista = new List<DtoTipoContactoEncuesta>();
            try
            {

                using (var connection = new SqlConnection(bdConexion.connectionString))
                {
                    var result = await connection.QueryAsync<DtoTipoContactoEncuesta>(obtenerTipoContactoEncuestaQuery, commandType: System.Data.CommandType.StoredProcedure);
                    lista = result.ToList();
                }

            }
            catch (Exception)
            {
                throw;
            }

            return lista;
        }

        public async Task<List<DtoTipoContactoEncuesta>> ObtenerTipoContactoEncuestaActivos()
        {
            List<DtoTipoContactoEncuesta> lista = new List<DtoTipoContactoEncuesta>();
            try
            {

                using (var connection = new SqlConnection(bdConexion.connectionString))
                {
                    var result = await connection.QueryAsync<DtoTipoContactoEncuesta>(obtenerTipoContactoEncuestaActivos, commandType: System.Data.CommandType.StoredProcedure);
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
    public class SPTipoContactoEncuesta : IRepositorioTipoContactoEncuesta
    {
        private readonly IContextoBD contextoBD;

        public SPTipoContactoEncuesta(IContextoBD contextoBD)
        {
            this.contextoBD = contextoBD;
        }

        public async Task<DtoRespuestaSP> InsertarTipoContactoEncuesta(EntitiTipoContactoEncuesta entitiTipoContactoEncuesta)
        {
            try
            {
                Dictionary<string, object> data = new Dictionary<string, object>();
                data.Add("TipoContactoEncuesta", entitiTipoContactoEncuesta.tipoContactoEncuesta);

                string query = "SPInsertarTipoContactoEncuesta";

                return await this.contextoBD.EjecutarSP(query, data);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<DtoRespuestaSP> ActualizarTipoContactoEncuesta(EntitiTipoContactoEncuesta entitiTipoContactoEncuesta)
        {

            try
            {
                Dictionary<string, object> data = new Dictionary<string, object>();

                data.Add("IdTipoContactoEncuesta", entitiTipoContactoEncuesta.idTipoContactoEncuesta);
                data.Add("TipoContactoEncuesta", entitiTipoContactoEncuesta.tipoContactoEncuesta);
                string query = "SPActualizarTipoContactoEncuesta";

                return await this.contextoBD.EjecutarSP(query, data);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<DtoRespuestaSP> EliminarTipoContactoEncuesta(int idTipoContactoEncuesta)

        {
            try
            {
                Dictionary<string, object> data = new Dictionary<string, object>();
                data.Add("IdTipoContactoEncuesta", idTipoContactoEncuesta);
                string query = "SPEliminarTipoContactoEncuesta";

                return await this.contextoBD.EjecutarSP(query, data);
            }
            catch (Exception)
            {
                throw;
            }
        }


        public async Task<DtoTipoContactoEncuesta> ObtenerTipoContactoEncuestaPorID(int idTipoContactoEncuesta)
        {
            try
            {
                Dictionary<string, object> data = new Dictionary<string, object>();
                data.Add("IdTipoContactoEncuesta", idTipoContactoEncuesta);
                string query = "SPObtenerTipoContactoEncuestaPorID";

                return await this.contextoBD.ObtenerDato<DtoTipoContactoEncuesta>(query, data);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<List<DtoTipoContactoEncuesta>> ObtenerTipoContactoEncuesta()
        {
            try
            {
                string query = "SPObtenerTipoContactoEncuesta";
                var result = await this.contextoBD.ObtenerListaDeDatos<DtoTipoContactoEncuesta>(query);

                return result;
            }
            catch (Exception)
            {
                throw;
            }
        }
        public async Task<List<DtoTipoContactoEncuesta>> ObtenerTipoContactoEncuestaActivos()
        {
            try
            {
                string query = "SPObtenerTipoContactoEncuestaActivos";
                var result = await this.contextoBD.ObtenerListaDeDatos<DtoTipoContactoEncuesta>(query);

                return result;
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}
