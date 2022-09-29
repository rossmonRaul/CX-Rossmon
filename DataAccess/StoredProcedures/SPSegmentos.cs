using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using Dapper;
using Dominio.Dto;
using Dominio.Entiti;
using Dominio.Interfaces.Infraestructura.BaseDatos;

namespace DataAccess.StoredProcedures
{
    /*
    public class SPSegmentos
    {
        BdConexion bdConexion = new BdConexion();
        private SqlConnection sqlConnection;

        private readonly string obtenerSegmentosQuery = "SPObtenerSegmentos";
        private readonly string insertarSegmentosQuery = "SPInsertarSegmentos";
        private readonly string actualizarSegmentoQuery = "SPActualizarSegmento";
        private readonly string obtenerSegmentoPorIDQuery = "SPObtenerSegmentoPorID";
        private readonly string eliminarSegmentoQuery = "SPEliminarSegmento";

        private SqlCommand sqlCommand;

        public async Task<List<DtoSegmentos>> ObtenerSegmentos()
        {
            List<DtoSegmentos> lista = new List<DtoSegmentos>();
            try
            {

                using (var connection = new SqlConnection(bdConexion.connectionString))
                {
                    var result = await connection.QueryAsync<DtoSegmentos>(obtenerSegmentosQuery, commandType: System.Data.CommandType.StoredProcedure);
                    lista = result.ToList();
                }

            }
            catch (Exception)
            {
                throw;
            }

            return lista;
        }

        public async Task<DtoRespuestaSP> InsertarSegmentos(EntitiSegmentos entitiSegmentos)
        {
            DtoRespuestaSP rest = new DtoRespuestaSP();
            try
            {

                using (var connection = new SqlConnection(bdConexion.connectionString))
                {
                    connection.Open();
                    sqlCommand = new SqlCommand(insertarSegmentosQuery, connection);
                    sqlCommand.CommandType = System.Data.CommandType.StoredProcedure;

                    sqlCommand.Parameters.AddWithValue("@Segmento", entitiSegmentos.Segmento);
                    sqlCommand.Parameters.AddWithValue("@IdSector", entitiSegmentos.IdSector);
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

        public async Task<DtoRespuestaSP> ActualizarSegmentos(EntitiSegmentos entitiSegmento)
        {
            DtoRespuestaSP rest = new DtoRespuestaSP();
            try
            {

                using (var connection = new SqlConnection(bdConexion.connectionString))
                {
                    connection.Open();
                    sqlCommand = new SqlCommand(actualizarSegmentoQuery, connection);
                    sqlCommand.CommandType = System.Data.CommandType.StoredProcedure;

                    sqlCommand.Parameters.AddWithValue("@IdSegmento", entitiSegmento.IdSegmento);
                    sqlCommand.Parameters.AddWithValue("@Segmento", entitiSegmento.Segmento);
                    sqlCommand.Parameters.AddWithValue("@IdSector", entitiSegmento.IdSector);
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


        public async Task<DtoSegmentos> ObtenerSegmentosPorID(int idSegmento)
        {
            object value = new object();
            try
            {

                sqlConnection = new SqlConnection(bdConexion.connectionString);
                sqlConnection.Open();

                DynamicParameters queryParameters = new DynamicParameters();
                queryParameters.Add("@IdSegmento", idSegmento);

                var result = await sqlConnection.QueryAsync<DtoSegmentos>(obtenerSegmentoPorIDQuery, queryParameters, commandType: System.Data.CommandType.StoredProcedure);
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
            return (DtoSegmentos)Convert.ChangeType(value, typeof(DtoSegmentos));
        }

        public async Task<DtoRespuestaSP> EliminarSegmento(int idSegmento)
        {
            DtoRespuestaSP dtoRespuestaSP = new DtoRespuestaSP();
            try
            {
                sqlConnection = new SqlConnection(bdConexion.connectionString);
                sqlConnection.Open();
                sqlCommand = new SqlCommand(eliminarSegmentoQuery, sqlConnection);
                sqlCommand.CommandType = System.Data.CommandType.StoredProcedure;

                sqlCommand.Parameters.AddWithValue("@IdSegmento", idSegmento);

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
    public class SPSegmentos : IRepositorioSegmentos
    {
        private readonly IContextoBD contextoBD;

        public SPSegmentos(IContextoBD contextoBD)
        {
            this.contextoBD = contextoBD;
        }

        public async Task<DtoRespuestaSP> InsertarSegmentos(EntitiSegmentos entitiSegmentos)
        {
            try
            {
                Dictionary<string, object> data = new Dictionary<string, object>();
                data.Add("Segmento", entitiSegmentos.Segmento);
                data.Add("IdSector", entitiSegmentos.IdSector);

                string query = "SPInsertarSegmentos";

                return await this.contextoBD.EjecutarSP(query, data);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<DtoRespuestaSP> ActualizarSegmentos(EntitiSegmentos entitiSegmento)
        {

            try
            {
                Dictionary<string, object> data = new Dictionary<string, object>();

                data.Add("IdSegmento", entitiSegmento.IdSegmento);
                data.Add("Segmento", entitiSegmento.Segmento);
                data.Add("IdSector", entitiSegmento.IdSector);
                string query = "SPActualizarSegmento";

                return await this.contextoBD.EjecutarSP(query, data);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<DtoRespuestaSP> EliminarSegmento(int idSegmento)

        {
            try
            {
                Dictionary<string, object> data = new Dictionary<string, object>();
                data.Add("IdSegmento", idSegmento);
                string query = "SPEliminarSegmento";

                return await this.contextoBD.EjecutarSP(query, data);
            }
            catch (Exception)
            {
                throw;
            }
        }


        public async Task<DtoSegmentos> ObtenerSegmentosPorID(int idSegmento)
        {
            try
            {
                Dictionary<string, object> data = new Dictionary<string, object>();
                data.Add("IdSegmento", idSegmento);
                string query = "SPObtenerSegmentoPorID";

                return await this.contextoBD.ObtenerDato<DtoSegmentos>(query, data);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<List<DtoSegmentos>> ObtenerSegmentos()
        {
            try
            {
                string query = "SPObtenerSegmentos";
                var result = await this.contextoBD.ObtenerListaDeDatos<DtoSegmentos>(query);

                return result;
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}
