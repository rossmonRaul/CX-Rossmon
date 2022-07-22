using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BussinesLogic.Models;
using Dapper;
using DataAccess.Conexion;
using Microsoft.Data.SqlClient;

namespace BussinesLogic.ServicesSp
{
    public class ProcedimientosAlmacenados
    {
        //Procedimiento Almacenado
        #region
        public string sp = "sp_Segmentos";
        #endregion
        //Objetos 
        #region
        BdConexion obj = new BdConexion();
        ProcedimientosAlmacenados obj1 = new ProcedimientosAlmacenados();
        #endregion
        
        //Metodos
        #region
        
        public void  Obtener()
        {
            //LLAMADO PARA REALIZAR EL CONSUMO DEL PROCEDIMIENTO ALMACENADO
            using (var connection = new SqlConnection(obj.connectionString))
            {
                var segmentos = connection.Query<Segmentos>(obj1.sp, commandType: CommandType.StoredProcedure);
                foreach (var element in segmentos)
                {


                }
            }
        }
        #endregion
    }
}