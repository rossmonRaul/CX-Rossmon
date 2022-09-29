using Dominio.Dto;
using Dominio.Entiti;
using Dominio.Interfaces.Infraestructura.BaseDatos;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.StoredProcedures
{
    /*public class SPCategorias
    {

        BdConexion bdConexion = new BdConexion();
        private SqlCommand sqlCommand;
        private SqlConnection sqlConnection;

        private readonly string obtenerCategoriasQuery = "SPObtenerCategorias";
        private readonly string insertarCategoriaQuery = "SPInsertarCategoria";
        private readonly string actualizarCategoriaQuery = "SPActualizarCategoria";
        private readonly string eliminarCategoriaQuery = "SPEliminarCategoria";
        private readonly string obtenerCategoriaPorIDQuery = "SPObtenerCategoriaPorID";


        public async Task<DtoRespuestaSP> InsertarCategoria(EntitiCategoria entitiCategoria)
        {
            DtoRespuestaSP dtoRespuestaSP = new DtoRespuestaSP();
            try
            {
                sqlConnection = new SqlConnection(bdConexion.connectionString);
                sqlConnection.Open();
                sqlCommand = new SqlCommand(insertarCategoriaQuery, sqlConnection); //cambiar SP 
                sqlCommand.CommandType = System.Data.CommandType.StoredProcedure;

                sqlCommand.Parameters.AddWithValue("@Categoria", entitiCategoria.Categoria); 
                sqlCommand.Parameters.AddWithValue("@Rango", entitiCategoria.Rango); 

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
        public async Task<DtoRespuestaSP> ActualizarCategoria(EntitiCategoria entitiCategoria)
        {
            DtoRespuestaSP dtoRespuestaSP = new DtoRespuestaSP();
            try
            {
                sqlConnection = new SqlConnection(bdConexion.connectionString);
                sqlConnection.Open();
                sqlCommand = new SqlCommand(actualizarCategoriaQuery, sqlConnection);
                sqlCommand.CommandType = System.Data.CommandType.StoredProcedure;

                sqlCommand.Parameters.AddWithValue("@IdCategoria", entitiCategoria.IdCategoria);
                sqlCommand.Parameters.AddWithValue("@Categoria", entitiCategoria.Categoria);
                sqlCommand.Parameters.AddWithValue("@Rango", entitiCategoria.Rango);

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
        public async Task<DtoRespuestaSP> EliminarCategoria(int idCategoria)
        {
            DtoRespuestaSP dtoRespuestaSP = new DtoRespuestaSP();
            try
            {
                sqlConnection = new SqlConnection(bdConexion.connectionString);
                sqlConnection.Open();
                sqlCommand = new SqlCommand(eliminarCategoriaQuery, sqlConnection);
                sqlCommand.CommandType = System.Data.CommandType.StoredProcedure;

                sqlCommand.Parameters.AddWithValue("@IdCategoria", idCategoria);

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
        public async Task<DtoCategorias> ObtenerCategoriasPorID(int idCategoria)
        {
            object value = new object();
            try
            {

                sqlConnection = new SqlConnection(bdConexion.connectionString);
                sqlConnection.Open();

                DynamicParameters queryParameters = new DynamicParameters();
                queryParameters.Add("@IdCategoria", idCategoria);

                var result = await sqlConnection.QueryAsync<DtoCategorias>(obtenerCategoriaPorIDQuery, queryParameters, commandType: System.Data.CommandType.StoredProcedure);
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
            return (DtoCategorias)Convert.ChangeType(value, typeof(DtoCategorias));
        }
        public async Task<List<DtoCategorias>> ObtenerCategorias()
        {
            List<DtoCategorias> lista = new List<DtoCategorias>();
            try
            {

                using (var connection = new SqlConnection(bdConexion.connectionString))
                {
                    var result = await connection.QueryAsync<DtoCategorias>(obtenerCategoriasQuery, commandType: System.Data.CommandType.StoredProcedure);
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
    public class SPCategorias : IRepositorioCategorias
    {
        private readonly IContextoBD contextoBD;

        public SPCategorias(IContextoBD contextoBD)
        {
            this.contextoBD = contextoBD;
        }

        public async Task<DtoRespuestaSP> InsertarCategoria(EntitiCategoria entitiCategorias)
        {
            try
            {
                Dictionary<string, object> data = new Dictionary<string, object>();
                data.Add("Categoria", entitiCategorias.Categoria);
                data.Add("Rango", entitiCategorias.Rango);

                string query = "SPInsertarCategoria";

                return await this.contextoBD.EjecutarSP(query, data);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<DtoRespuestaSP> ActualizarCategoria(EntitiCategoria entitiCategorias)
        {

            try
            {
                Dictionary<string, object> data = new Dictionary<string, object>();

                data.Add("Categoria", entitiCategorias.Categoria);
                data.Add("Rango", entitiCategorias.Rango);
                string query = "SPActualizarCategoria";

                return await this.contextoBD.EjecutarSP(query, data);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<DtoRespuestaSP> EliminarCategoria(int idCategoria)
        {
            try
            {
                Dictionary<string, object> data = new Dictionary<string, object>();
                data.Add("IdCategoria", idCategoria);
                string query = "SPEliminarCategoria";

                return await this.contextoBD.EjecutarSP(query, data);
            }
            catch (Exception)
            {
                throw;
            }
        }


        public async Task<DtoCategorias> ObtenerCategoriasPorID(int idCategoria)
        {
            try
            {
                Dictionary<string, object> data = new Dictionary<string, object>();
                data.Add("IdCategoria", idCategoria);
                string query = "SPObtenerCategoriaPorID";

                return await this.contextoBD.ObtenerDato<DtoCategorias>(query, data);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<List<DtoCategorias>> ObtenerCategorias()
        {
            try
            {
                string query = "SPObtenerCategorias";
                var result = await this.contextoBD.ObtenerListaDeDatos<DtoCategorias>(query);

                return result;
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}
