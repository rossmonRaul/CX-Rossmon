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
{
    /*
    public class SPFasesCJ
    {
        BdConexion bdConexion = new BdConexion();
        private SqlCommand sqlCommand;
        private SqlConnection sqlConnection;


        private readonly string obtenerFasesCJQuery = "SPObtenerFasesCJ";
        private readonly string insertarFasesCJQuery = "SPInsertarFasesCJ";
        private readonly string actualizarFasesCJQuery = "SPActualizarFasesCJ";
        private readonly string eliminarFasesCJQuery = "SPEliminarFasesCJ";
        private readonly string obtenerFasesCJPorIDQuery = "SPObtenerFasesCJPorID";


        public async Task<DtoRespuestaSP> InsertarFasesCJ(EntitiFaseCJ entitiFaseCJ)
        {
            DtoRespuestaSP dtoRespuestaSP = new DtoRespuestaSP();
            try
            {
                sqlConnection = new SqlConnection(bdConexion.connectionString);
                sqlConnection.Open();
                sqlCommand = new SqlCommand(insertarFasesCJQuery, sqlConnection); //cambiar SP 
                sqlCommand.CommandType = System.Data.CommandType.StoredProcedure;

                sqlCommand.Parameters.AddWithValue("@FaseCustomerJourney", entitiFaseCJ.faseCustomerJourney);


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


        public async Task<DtoRespuestaSP> ActualizarFasesCJ(EntitiFaseCJ entitiFaseCJ)
        {
            DtoRespuestaSP dtoRespuestaSP = new DtoRespuestaSP();
            try
            {
                sqlConnection = new SqlConnection(bdConexion.connectionString);
                sqlConnection.Open();
                sqlCommand = new SqlCommand(actualizarFasesCJQuery, sqlConnection);
                sqlCommand.CommandType = System.Data.CommandType.StoredProcedure;

                sqlCommand.Parameters.AddWithValue("@IdFaseCJ", entitiFaseCJ.idFaseCJ);
                sqlCommand.Parameters.AddWithValue("@FaseCustomerJourney", entitiFaseCJ.faseCustomerJourney);


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

        public async Task<DtoRespuestaSP> EliminarFasesCJ(int idFaseCJ)
        {
            DtoRespuestaSP dtoRespuestaSP = new DtoRespuestaSP();
            try
            {
                sqlConnection = new SqlConnection(bdConexion.connectionString);
                sqlConnection.Open();
                sqlCommand = new SqlCommand(eliminarFasesCJQuery, sqlConnection);
                sqlCommand.CommandType = System.Data.CommandType.StoredProcedure;

                sqlCommand.Parameters.AddWithValue("@IdFaseCJ", idFaseCJ);

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

        public async Task<DtoFaseCJ> ObtenerFasesCJPorID(int idFaseCJ)
        {
            object value = new object();
            try
            {

                sqlConnection = new SqlConnection(bdConexion.connectionString);
                sqlConnection.Open();

                DynamicParameters queryParameters = new DynamicParameters();
                queryParameters.Add("@IdFaseCJ", idFaseCJ);

                var result = await sqlConnection.QueryAsync<DtoFaseCJ>(obtenerFasesCJPorIDQuery, queryParameters, commandType: System.Data.CommandType.StoredProcedure);
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
            return (DtoFaseCJ)Convert.ChangeType(value, typeof(DtoFaseCJ));
        }


        public async Task<List<DtoFaseCJ>> ObtenerFasesCJ()
        {
            List<DtoFaseCJ> lista = new List<DtoFaseCJ>();
            try
            {

                using (var connection = new SqlConnection(bdConexion.connectionString))
                {
                    var result = await connection.QueryAsync<DtoFaseCJ>(obtenerFasesCJQuery, commandType: System.Data.CommandType.StoredProcedure);
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
    public class SPFasesCJ : IRepositorioFasesCJ
    {
        private readonly IContextoBD contextoBD;

        public SPFasesCJ(IContextoBD contextoBD)
        {
            this.contextoBD = contextoBD;
        }

        public async Task<DtoRespuestaSP> InsertarFasesCJ(EntitiFaseCJ entitiFaseCJ)
        {
            try
            {
                Dictionary<string, object> data = new Dictionary<string, object>();
                data.Add("FaseCustomerJourney", entitiFaseCJ.faseCustomerJourney);
                

                string query = "SPInsertarFasesCJ";

                return await this.contextoBD.EjecutarSP(query, data);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<DtoRespuestaSP> ActualizarFasesCJ(EntitiFaseCJ entitiFaseCJ)
        {

            try
            {
                Dictionary<string, object> data = new Dictionary<string, object>();

                data.Add("IdFaseCJ", entitiFaseCJ.idFaseCJ);
                data.Add("FaseCustomerJourney", entitiFaseCJ.faseCustomerJourney);
                string query = "SPActualizarFasesCJ";

                return await this.contextoBD.EjecutarSP(query, data);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<DtoRespuestaSP> EliminarFasesCJ(int idFaseCJ)

        {
            try
            {
                Dictionary<string, object> data = new Dictionary<string, object>();
                data.Add("IdFaseCJ", idFaseCJ);
                string query = "SPEliminarFasesCJ";

                return await this.contextoBD.EjecutarSP(query, data);
            }
            catch (Exception)
            {
                throw;
            }
        }


        public async Task<DtoFaseCJ> ObtenerFasesCJPorID(int idFaseCJ)
        {
            try
            {
                Dictionary<string, object> data = new Dictionary<string, object>();
                data.Add("IdFaseCJ", idFaseCJ);
                string query = "SPObtenerFasesCJPorID";

                return await this.contextoBD.ObtenerDato<DtoFaseCJ>(query, data);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<List<DtoFaseCJ>> ObtenerFasesCJ()
        {
            try
            {
                string query = "SPObtenerFasesCJ";
                var result = await this.contextoBD.ObtenerListaDeDatos<DtoFaseCJ>(query);

                return result;
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
    
}
