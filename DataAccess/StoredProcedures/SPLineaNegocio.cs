using Dapper;
using Dominio.Interfaces.Infraestructura.BaseDatos;
using Dominio.Dto;
using Dominio.Entiti;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace DataAccess.StoredProcedures
{
    /*
    public class SPLineaNegocio
    {
        BdConexion bdConexion = new BdConexion();
        private SqlCommand sqlCommand;
        private SqlConnection sqlConnection;


        private readonly string obtenerLineaNegocioQuery = "SPObtenerLineaNegocio";
        private readonly string insertarLineaNegocioQuery = "SPInsertarLineaNegocio";
        private readonly string actualizarLineaNegocioQuery = "SPActualizarLineaNegocio";
        private readonly string eliminarLineaNegocioQuery = "SPEliminarLineaNegocio";
        private readonly string obtenerLineaNegocioPorIDQuery = "SPObtenerLineaNegocioPorID";
       

        public async Task<DtoRespuestaSP> InsertarLineaNegocio(EntitiLineaNegocio entitiLineaNegocio)
        {
            DtoRespuestaSP dtoRespuestaSP = new DtoRespuestaSP();
            try {
                    sqlConnection = new SqlConnection(bdConexion.connectionString);
                    sqlConnection.Open();
                    sqlCommand = new SqlCommand(insertarLineaNegocioQuery, sqlConnection); //cambiar SP 
                    sqlCommand.CommandType = System.Data.CommandType.StoredProcedure;

                    sqlCommand.Parameters.AddWithValue("@LineaNegocio", entitiLineaNegocio.lineaNegocio); //colocar parametros correspondientes

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


        public async Task<DtoRespuestaSP> ActualizarLineaNegocio(EntitiLineaNegocio entitiLineaNegocio)
        {
            DtoRespuestaSP dtoRespuestaSP = new DtoRespuestaSP();
            try
            {
                    sqlConnection = new SqlConnection(bdConexion.connectionString);
                    sqlConnection.Open();
                    sqlCommand = new SqlCommand(actualizarLineaNegocioQuery, sqlConnection);
                    sqlCommand.CommandType = System.Data.CommandType.StoredProcedure;

                    sqlCommand.Parameters.AddWithValue("@IdLinea", entitiLineaNegocio.idLinea);
                    sqlCommand.Parameters.AddWithValue("@LineaNegocio", entitiLineaNegocio.lineaNegocio);

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

        public async Task<DtoRespuestaSP> EliminarLineaNegocio(int idLinea)
        {
            DtoRespuestaSP dtoRespuestaSP = new DtoRespuestaSP();
            try
            {
                sqlConnection = new SqlConnection(bdConexion.connectionString);
                sqlConnection.Open();
                sqlCommand = new SqlCommand(eliminarLineaNegocioQuery, sqlConnection);
                sqlCommand.CommandType = System.Data.CommandType.StoredProcedure;

                sqlCommand.Parameters.AddWithValue("@IdLinea", idLinea);

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

        public async Task<DtoLineaNegocio> ObtenerLineaNegocioPorID(int idLinea)
        {
            object value = new object();
            try
            {
                    sqlConnection = new SqlConnection(bdConexion.connectionString);
                    sqlConnection.Open();

                    DynamicParameters queryParameters = new DynamicParameters();
                    queryParameters.Add("@IdLinea", idLinea);
 
                    var result = await sqlConnection.QueryAsync<DtoLineaNegocio>(obtenerLineaNegocioPorIDQuery, queryParameters, commandType: System.Data.CommandType.StoredProcedure);
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
            return (DtoLineaNegocio)Convert.ChangeType(value, typeof(DtoLineaNegocio));
        }


        public async Task<List<DtoLineaNegocio>> ObtenerLineaNegocio()
        {
            List<DtoLineaNegocio> lista = new List<DtoLineaNegocio>();
            try
            {
                
                using (var connection = new SqlConnection(bdConexion.connectionString))
                {
                     var result = await connection.QueryAsync<DtoLineaNegocio>(obtenerLineaNegocioQuery, commandType: System.Data.CommandType.StoredProcedure);
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
    */
    public class SPLineaNegocio : IRepositorioLineaNegocio
    {
        private readonly IContextoBD contextoBD;

        public SPLineaNegocio(IContextoBD contextoBD)
        {
            this.contextoBD = contextoBD;
        }

        public async Task<DtoRespuestaSP> InsertarLineaNegocio(EntitiLineaNegocio entitiLineaNegocio)
        {
            try
            {
                Dictionary<string, object> data = new Dictionary<string, object>();
                data.Add("LineaNegocio", entitiLineaNegocio.lineaNegocio);

                string query = "SPInsertarLineaNegocio";

                return await this.contextoBD.EjecutarSP(query, data);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<DtoRespuestaSP> ActualizarLineaNegocio(EntitiLineaNegocio entitiLineaNegocio)
        {

            try
            {
                Dictionary<string, object> data = new Dictionary<string, object>();

                data.Add("IdLinea", entitiLineaNegocio.idLinea);
                data.Add("LineaNegocio", entitiLineaNegocio.lineaNegocio);
                string query = "SPActualizarLineaNegocio";

                return await this.contextoBD.EjecutarSP(query, data);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<DtoRespuestaSP> EliminarLineaNegocio(int idLinea)

        {
            try
            {
                Dictionary<string, object> data = new Dictionary<string, object>();
                data.Add("IdLinea", idLinea);
                string query = "SPEliminarLineaNegocio";

                return await this.contextoBD.EjecutarSP(query, data);
            }
            catch (Exception)
            {
                throw;
            }
        }


        public async Task<DtoLineaNegocio> ObtenerLineaNegocioPorID(int idLinea)
        {
            try
            {
                Dictionary<string, object> data = new Dictionary<string, object>();
                data.Add("IdLinea", idLinea);
                string query = "SPObtenerLineaNegocioPorID";

                return await this.contextoBD.ObtenerDato<DtoLineaNegocio>(query, data);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<List<DtoLineaNegocio>> ObtenerLineaNegocio()
        {
            try
            {
                string query = "SPObtenerLineaNegocio";
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
