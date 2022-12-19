
using Dapper;
//using DataAccess.Conexion;
using Dominio.Dto;
using Dominio.Entiti;
using Dominio.Interfaces.Infraestructura.BaseDatos;
//using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.StoredProcedures
{

   
    public class RepositorioMantenimientoHallazgo : IRepositorioMantenimientoHallazgo
    {
        private readonly IContextoBD contextoBD;

        public RepositorioMantenimientoHallazgo(IContextoBD contextoBD)
        {
            this.contextoBD = contextoBD;
        }
        public async Task<List<DtoOrbe>> ObtenerDatosOrbe()
        {
            try
            {
                string query = "SPObtenerOrbe";
                var result = await this.contextoBD.ObtenerListaDeDatos<DtoOrbe>(query);

                return result;
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<DtoCantidadDatos> ObtenerCantidadMantenimientoHallazgo()
        {
            try
            {
                string query = "SPObtenerCantidadMantenimientoHallazgo";
                var result = await this.contextoBD.ObtenerDato<DtoCantidadDatos>(query);

                return result;
            }
            catch (Exception)
            {
                throw;
            }
        }
    }

        

}