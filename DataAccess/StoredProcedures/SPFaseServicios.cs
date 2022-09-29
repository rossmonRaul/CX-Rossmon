using Dapper;
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
    /*
       public class SPFaseServicios
      {
          BdConexion bdConexion = new BdConexion();
          private SqlCommand sqlCommand;
          private SqlConnection sqlConnection;


          private readonly string obtenerFaseServiciosQuery = "SPObtenerFaseServicios";
          private readonly string insertarFaseServicioQuery = "SPInsertarFaseDeServicio";
          private readonly string actualizarFaseServicioQuery = "SPActualizarFaseServicio";
          private readonly string eliminarFaseServicioQuery = "SPEliminarFaseServicio";
          private readonly string obtenerFaseServicioPorIDQuery = "SPObtenerFaseServicioPorID";
          public async Task<List<DtoFaseServicio>> ObtenerFaseServicios()
          {
              List<DtoFaseServicio> lista = new List<DtoFaseServicio>();
              try
              {

                  using (var connection = new SqlConnection(bdConexion.connectionString))
                  {
                      var result = await connection.QueryAsync<DtoFaseServicio>(obtenerFaseServiciosQuery, commandType: System.Data.CommandType.StoredProcedure);
                      lista = result.ToList();
                  }

              }
              catch (Exception)
              {
                  throw;
              }

              return lista;
          }

          public async Task<DtoRespuestaSP> InsertarFaseServicio(EntitiFaseServicio entitiFaseServicio)
          {
              DtoRespuestaSP dtoRespuestaSP = new DtoRespuestaSP();
              try
              {
                  sqlConnection = new SqlConnection(bdConexion.connectionString);
                  sqlConnection.Open();
                  sqlCommand = new SqlCommand(insertarFaseServicioQuery, sqlConnection); //cambiar SP 
                  sqlCommand.CommandType = System.Data.CommandType.StoredProcedure;

                  sqlCommand.Parameters.AddWithValue("@FaseServicio", entitiFaseServicio.faseServicio); //colocar parametros correspondientes

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

          public async Task<DtoRespuestaSP> ActualizarFaseServicio(EntitiFaseServicio entitiFaseServicio)
          {
              DtoRespuestaSP dtoRespuestaSP = new DtoRespuestaSP();
              try
              {
                  sqlConnection = new SqlConnection(bdConexion.connectionString);
                  sqlConnection.Open();
                  sqlCommand = new SqlCommand(actualizarFaseServicioQuery, sqlConnection);
                  sqlCommand.CommandType = System.Data.CommandType.StoredProcedure;

                  sqlCommand.Parameters.AddWithValue("@IdFase", entitiFaseServicio.idFase);
                  sqlCommand.Parameters.AddWithValue("@Fase", entitiFaseServicio.faseServicio);

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

          public async Task<DtoRespuestaSP> EliminarFaseServicio(int idFase)
          {
              DtoRespuestaSP dtoRespuestaSP = new DtoRespuestaSP();
              try
              {
                  sqlConnection = new SqlConnection(bdConexion.connectionString);
                  sqlConnection.Open();
                  sqlCommand = new SqlCommand(eliminarFaseServicioQuery, sqlConnection);
                  sqlCommand.CommandType = System.Data.CommandType.StoredProcedure;

                  sqlCommand.Parameters.AddWithValue("@IdFase", idFase);

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


          public async Task<DtoFaseServicio> ObtenerFaseServicioPorID(int idFase)
          {
              object value = new object();
              try
              {

                  sqlConnection = new SqlConnection(bdConexion.connectionString);
                  sqlConnection.Open();

                  DynamicParameters queryParameters = new DynamicParameters();
                  queryParameters.Add("@IdFase", idFase);

                  var result = await sqlConnection.QueryAsync<DtoFaseServicio>(obtenerFaseServicioPorIDQuery, queryParameters, commandType: System.Data.CommandType.StoredProcedure);
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
              return (DtoFaseServicio)Convert.ChangeType(value, typeof(DtoFaseServicio));
          }
      }
    */
    public class SPFaseServicios : IRepositorioFaseServicios
    {
        private readonly IContextoBD contextoBD;

        public SPFaseServicios(IContextoBD contextoBD)
        {
            this.contextoBD = contextoBD;
        }

        public async Task<DtoRespuestaSP> InsertarFaseServicio(EntitiFaseServicio entitiFaseServicio)
        {
            try
            {
                Dictionary<string, object> data = new Dictionary<string, object>();
                data.Add("FaseServicio", entitiFaseServicio.faseServicio);


                string query = "SPInsertarFaseDeServicio";

                return await this.contextoBD.EjecutarSP(query, data);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<DtoRespuestaSP> ActualizarFaseServicio(EntitiFaseServicio entitiFaseServicio)
        {

            try
            {
                Dictionary<string, object> data = new Dictionary<string, object>();

                data.Add("IdFase", entitiFaseServicio.idFase);
                data.Add("Fase", entitiFaseServicio.faseServicio);
                string query = "SPActualizarFaseServicio";

                return await this.contextoBD.EjecutarSP(query, data);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<DtoRespuestaSP> EliminarFaseServicio(int idFase)

        {
            try
            {
                Dictionary<string, object> data = new Dictionary<string, object>();
                data.Add("IdFase", idFase);
                string query = "SPEliminarFaseServicio";

                return await this.contextoBD.EjecutarSP(query, data);
            }
            catch (Exception)
            {
                throw;
            }
        }


        public async Task<DtoFaseServicio> ObtenerFaseServicioPorID(int idFase)
        {
            try
            {
                Dictionary<string, object> data = new Dictionary<string, object>();
                data.Add("IdFase", idFase);
                string query = "SPObtenerFaseServicioPorID";

                return await this.contextoBD.ObtenerDato<DtoFaseServicio>(query, data);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<List<DtoFaseServicio>> ObtenerFaseServicios()
        {
            try
            {
                string query = "SPObtenerFaseServicios";
                var result = await this.contextoBD.ObtenerListaDeDatos<DtoFaseServicio>(query);

                return result;
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
    
}
