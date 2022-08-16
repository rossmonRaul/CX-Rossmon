using DataAccess.StoredProcedures;
using Dominio.Dto;
using Dominio.Entiti;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace BussinesLogic.Servicios
{
    public class ServicioFaseServicios
    {
        public SPFaseServicios spFaseServicio = new SPFaseServicios();

        public async Task<List<DtoFaseServicio>> ObtenerFaseServicios()
        {
            return await this.spFaseServicio.ObtenerFaseServicios();
        }

        public async Task<DtoRespuestaSP> InsertarFaseServicio(EntitiFaseServicio entitiFaseServicio)
        {
            return await this.spFaseServicio.InsertarFaseServicio(entitiFaseServicio);
        }
        public async Task<DtoRespuestaSP> ActualizarFaseServicio(EntitiFaseServicio entitiFaseServicio)
        {
            return await this.spFaseServicio.ActualizarFaseServicio(entitiFaseServicio);
        }
        public async Task<DtoRespuestaSP> EliminarFaseServicio(int idFase)
        {
            return await this.spFaseServicio.EliminarFaseServicio(idFase);
        }
        public async Task<DtoFaseServicio> ObtenerFaseServicioPorID(int idFase)
        {
            return await this.spFaseServicio.ObtenerFaseServicioPorID(idFase);
        }
    }
}
