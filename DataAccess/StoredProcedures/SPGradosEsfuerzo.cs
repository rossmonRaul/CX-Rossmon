using System;
using System.Collections.Generic;
using System.Data;

using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Dapper;
using DataAccess.Conexion;
using Dominio.Dto;
using Dominio.Entiti;
using Microsoft.Data.SqlClient;

namespace DataAccess.StoredProcedures
{
    public class SPGradosEsfuerzo
    {
        BdConexion bdConexion = new BdConexion();
        private SqlCommand sqlCommand;
        private SqlConnection sqlConnection;
        private readonly string obtenerGradosEsfuerzoQuery = "SPObtenerGradosEsfuerzo";
        private readonly string insertarGradosEsfuerzoQuery = "SPInsertarGradosEsfuerzo";
       
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


      


       

      

    }
}