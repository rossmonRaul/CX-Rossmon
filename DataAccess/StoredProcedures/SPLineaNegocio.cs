using Dapper;
using DataAccess.Conexion;
using Dominio.Dto;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace DataAccess.StoredProcedures
{
    public class SPLineaNegocio
    {
        BdConexion bdConexion = new BdConexion();

        private readonly string obtenerLineaNegocioQuery = "SPObtenerLineaNegocio";

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
}
