using DataAccess.StoredProcedures;
using Dominio.Dto;
using Dominio.Entiti;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace BussinesLogic.Servicios
{
    public class ServicioCanales
    {
        public SPCanales spCanales = new SPCanales();

        public async Task<List<DtoCanales>> ObtenerCanales()
        {
            return await this.spCanales.ObtenerCanales();
        }

        public async Task<DtoRespuestaSP> InsertarCanales(EntitiCanales entitiCanales)
        {
            return await this.spCanales.InsertarCanales(entitiCanales);
        }
        public async Task<DtoRespuestaSP> ActualizarCanales(EntitiCanales entitiCanales)
        {
            return await this.spCanales.ActualizarCanales(entitiCanales);
        }
        public async Task<DtoRespuestaSP> EliminarCanales(int idCanal)
        {
            return await this.spCanales.EliminarCanales(idCanal);
        }
        public async Task<DtoCanales> ObtenerCanalesPorID(int idCanal)
        {
            return await this.spCanales.ObtenerCanalesPorID(idCanal);
        }
    }
}

