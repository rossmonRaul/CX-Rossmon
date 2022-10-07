using Dapper;
using Dominio.Dto;
using Dominio.Entiti;
using Dominio.Interfaces.Infraestructura.BaseDatos;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.StoredProcedures
{
    public class ContextoBD : IContextoBD
    {
        private SqlConnection sqlConnection;
        private SqlCommand sqlCommand;
        private readonly IConfiguration Configuration;

        public ContextoBD(IConfiguration configuration)
        {
            this.sqlConnection = new SqlConnection();
            this.sqlCommand = new SqlCommand();
            Configuration = configuration;
        }

        private string ObtenerConnectionString()
        {
            return Configuration[$"ConnectionStrings:BD"];
        }

        public async Task<DtoRespuestaSP> EjecutarSP(string query, Dictionary<string, object> data)
        {
            DtoRespuestaSP dtoDatosSP = new DtoRespuestaSP();
            try
            {
                this.sqlConnection.ConnectionString = this.ObtenerConnectionString();
                this.sqlConnection.Open();
                this.sqlCommand = new SqlCommand(query, this.sqlConnection);
                this.sqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                foreach (var item in data)
                {
                    sqlCommand.Parameters.AddWithValue(item.Key, item.Value);
                }

                sqlCommand.Parameters.Add("@INDICADOR", SqlDbType.Int);
                sqlCommand.Parameters.Add("@MENSAJE", SqlDbType.VarChar, 50);
                sqlCommand.Parameters["@INDICADOR"].Direction = ParameterDirection.Output;
                sqlCommand.Parameters["@MENSAJE"].Direction = ParameterDirection.Output;

                await sqlCommand.ExecuteNonQueryAsync();
                dtoDatosSP = new DtoRespuestaSP
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
            return dtoDatosSP;
        }

        public async Task<T> ObtenerDato<T>(string sqlQuery, Dictionary<string, object> data = null)
        {
            object value = new object();
            try
            {
                this.sqlConnection.ConnectionString = this.ObtenerConnectionString();
                this.sqlConnection.Open();
                DynamicParameters queryParameters = new DynamicParameters();
                if (data != null)
                    this.PrepararConsultaDapper(ref queryParameters, data);

                var result = await this.sqlConnection.QueryAsync<T>(sqlQuery, queryParameters, commandType: System.Data.CommandType.StoredProcedure);
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
            return (T)Convert.ChangeType(value, typeof(T));
        }

        public async Task<List<T>> ObtenerListaDeDatos<T>(string sqlQuery, Dictionary<string, object> data = null)
        {
            List<T> lista = new List<T>();
            try
            {
                this.sqlConnection.ConnectionString = this.ObtenerConnectionString();
                this.sqlConnection.Open();
                DynamicParameters queryParameters = new DynamicParameters();
                if (data != null)
                    this.PrepararConsultaDapper(ref queryParameters, data);
                var result = await this.sqlConnection.QueryAsync<T>(sqlQuery, queryParameters, commandType: System.Data.CommandType.StoredProcedure);
                lista = result.ToList();
            }
            catch (Exception)
            {
                throw;
            }
            finally
            {
                this.sqlConnection.Close();
            }
            return lista;
        }


        private void PrepararConsultaDapper(ref DynamicParameters parameters, Dictionary<string, object> Parametros)
        {
            int numeroParametros = 0;
            StringBuilder stringBuilder = new StringBuilder();
            foreach (var item in Parametros)
            {
                parameters.Add("@" + item.Key, item.Value);
                numeroParametros++;
            }
        }

    }
}


