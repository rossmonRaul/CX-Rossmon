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
{

    /* public class SPDirecciones
     {
         BdConexion bdConexion = new BdConexion();
         private SqlCommand sqlCommand;
         private SqlConnection sqlConnection;
         private readonly string obtenerDireccionesQuery = "SPObtenerDirecciones";
         private readonly string insertarDireccionesQuery = "SPInsertarDirecciones";
         private readonly string actualizarDireccionQuery = "SPActualizarDireccion";
         private readonly string obtenerDireccionPorIDQuery = "SPObtenerDireccionPorID";
         private readonly string obtenerDireccionesActivasQuery = "SPObtenerDireccionesActivas";
         private readonly string eliminarDireccionQuery = "SPEliminarDireccion";
         public async Task<List<DtoDirecciones>> ObtenerDirecciones()
         {
             List<DtoDirecciones> lista = new List<DtoDirecciones>();
             try
             {

                 using (var connection = new SqlConnection(bdConexion.connectionString))
                 {
                     var result = await connection.QueryAsync<DtoDirecciones>(obtenerDireccionesQuery, commandType: System.Data.CommandType.StoredProcedure);
                     lista = result.ToList();
                 }

             }
             catch (Exception)
             {
                 throw;
             }

             return lista;
         }

         public async Task<List<DtoDirecciones>> ObtenerDireccionesActivas()
         {
             List<DtoDirecciones> lista = new List<DtoDirecciones>();
             try
             {

                 using (var connection = new SqlConnection(bdConexion.connectionString))
                 {
                     var result = await connection.QueryAsync<DtoDirecciones>(obtenerDireccionesActivasQuery, commandType: System.Data.CommandType.StoredProcedure);
                     lista = result.ToList();
                 }

             }
             catch (Exception)
             {
                 throw;
             }

             return lista;
         }

         public async Task<DtoRespuestaSP> InsertarDirecciones(EntitiDirecciones entitiDirecciones)
         {
             DtoRespuestaSP rest = new DtoRespuestaSP();
             try
             {

                 using (var connection = new SqlConnection(bdConexion.connectionString))
                 {
                     connection.Open();
                     sqlCommand = new SqlCommand(insertarDireccionesQuery, connection);
                     sqlCommand.CommandType = System.Data.CommandType.StoredProcedure;

                     sqlCommand.Parameters.AddWithValue("@Codigo", entitiDirecciones.Codigo);
                     sqlCommand.Parameters.AddWithValue("@Direccion", entitiDirecciones.Direccion);
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


         public async Task<DtoRespuestaSP> ActualizarDireccion(EntitiDirecciones entitiDirecciones)
         {
             DtoRespuestaSP rest = new DtoRespuestaSP();
             try
             {

                 using (var connection = new SqlConnection(bdConexion.connectionString))
                 {
                     connection.Open();
                     sqlCommand = new SqlCommand(actualizarDireccionQuery, connection);
                     sqlCommand.CommandType = System.Data.CommandType.StoredProcedure;

                     sqlCommand.Parameters.AddWithValue("@IdDireccion", entitiDirecciones.IdDireccion);
                     sqlCommand.Parameters.AddWithValue("@Codigo", entitiDirecciones.Codigo);
                     sqlCommand.Parameters.AddWithValue("@Direccion", entitiDirecciones.Direccion);

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


         public async Task<DtoDirecciones> ObtenerDireccionPorID(int idDireccion)
         {
             object value = new object();
             try
             {

                 sqlConnection = new SqlConnection(bdConexion.connectionString);
                 sqlConnection.Open();

                 DynamicParameters queryParameters = new DynamicParameters();
                 queryParameters.Add("@IdDireccion", idDireccion);

                 var result = await sqlConnection.QueryAsync<DtoDirecciones>(obtenerDireccionPorIDQuery, queryParameters, commandType: System.Data.CommandType.StoredProcedure);
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
             return (DtoDirecciones)Convert.ChangeType(value, typeof(DtoDirecciones));
         }

         public async Task<DtoRespuestaSP> EliminarDireccion(int idDireccion)
         {
             DtoRespuestaSP dtoRespuestaSP = new DtoRespuestaSP();
             try
             {
                 sqlConnection = new SqlConnection(bdConexion.connectionString);
                 sqlConnection.Open();
                 sqlCommand = new SqlCommand(eliminarDireccionQuery, sqlConnection);
                 sqlCommand.CommandType = System.Data.CommandType.StoredProcedure;

                 sqlCommand.Parameters.AddWithValue("@IdDireccion", idDireccion);

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

    public class SPDirecciones : IRepositorioDirecciones
    {
        private readonly IContextoBD contextoBD;

        public SPDirecciones(IContextoBD contextoBD)
        {
            this.contextoBD = contextoBD;
        }

        public async Task<DtoRespuestaSP> InsertarDirecciones(EntitiDirecciones entitiDirecciones)
        {
            try
            {
                Dictionary<string, object> data = new Dictionary<string, object>();
                data.Add("Codigo", entitiDirecciones.Codigo);
                data.Add("Direccion", entitiDirecciones.Direccion);

                string query = "SPInsertarDirecciones";

                return await this.contextoBD.EjecutarSP(query, data);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<DtoRespuestaSP> ActualizarDireccion(EntitiDirecciones entitiDirecciones)
        {

            try
            {
                Dictionary<string, object> data = new Dictionary<string, object>();

                data.Add("Codigo", entitiDirecciones.Codigo);
                data.Add("Direccion", entitiDirecciones.Direccion);
                string query = "SPActualizarDireccion";

                return await this.contextoBD.EjecutarSP(query, data);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<DtoRespuestaSP> EliminarDireccion(int idDireccion)

        {
            try
            {
                Dictionary<string, object> data = new Dictionary<string, object>();
                data.Add("IdDireccion", idDireccion);
                string query = "SPEliminarDireccion";

                return await this.contextoBD.EjecutarSP(query, data);
            }
            catch (Exception)
            {
                throw;
            }
        }


        public async Task<DtoDirecciones> ObtenerDireccionPorID(int idDireccion)
        {
            try
            {
                Dictionary<string, object> data = new Dictionary<string, object>();
                data.Add("IdDireccion", idDireccion);
                string query = "SPObtenerDireccionPorID";

                return await this.contextoBD.ObtenerDato<DtoDirecciones>(query, data);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<List<DtoDirecciones>> ObtenerDirecciones()
        {
            try
            {
                string query = "SPObtenerDirecciones";
                var result = await this.contextoBD.ObtenerListaDeDatos<DtoDirecciones>(query);

                return result;
            }
            catch (Exception)
            {
                throw;
            }
        }
        public async Task<List<DtoDirecciones>> ObtenerDireccionesActivas()
        {
            try
            {
                string query = "SPObtenerDireccionesActivas";
                var result = await this.contextoBD.ObtenerListaDeDatos<DtoDirecciones>(query);

                return result;
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
    
}
 