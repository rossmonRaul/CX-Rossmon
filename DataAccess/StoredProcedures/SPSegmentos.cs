using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Dapper;
using DataAccess.Conexion;
using Dominio.Dto;
using Microsoft.Data.SqlClient;

namespace DataAccess.StoredProcedures
{
    public class SPSegmentos
    {
        /*
        //Procedimiento Almacenado
        #region
        public string sp = "sp_Segmentos";
        #endregion
        //Objetos 
        #region
        BdConexion obj = new BdConexion();
        SPSegmentos obj1 = new SPSegmentos();
        #endregion
        
        //Metodos
        #region
        
        public void  Obtener()
        {
            //LLAMADO PARA REALIZAR EL CONSUMO DEL PROCEDIMIENTO ALMACENADO
            using (var connection = new SqlConnection(obj.connectionString))
            {
                var segmentos = connection.Query<DtoSegmentos>(obj1.sp, commandType: CommandType.StoredProcedure);
                foreach (var element in segmentos)
                {


                }
            }
        }
        #endregion
        */
    }
}