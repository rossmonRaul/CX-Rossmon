using DataAccess.StoredProcedures;
using Dominio.Dto;
using Dominio.Entiti;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace BussinesLogic.Servicios
{
    public class ServicioServicioLineaNegocio
    {
        public SPServicioLineaNegocio spServicioLineaNegocio = new SPServicioLineaNegocio();

        public async Task<List<DtoServicioLineaNegocio>> ObtenerServicioLineaNegocio()
        {
            return await this.spServicioLineaNegocio.ObtenerServicioLineaNegocio();
        }

        public async Task<DtoRespuestaSP> InsertarServicioLineaNegocio(EntitiServicioLineaNegocio entitiServicioLineaNegocio)
        {
            return await this.spServicioLineaNegocio.InsertarServicioLineaNegocio(entitiServicioLineaNegocio);
        }

        public async Task<DtoRespuestaSP> ActualizarServicioLineaNegocio(EntitiServicioLineaNegocio entitiServicioLineaNegocio)
        {
            return await this.spServicioLineaNegocio.ActualizarServicioLineaNegocio(entitiServicioLineaNegocio);
        }

        public async Task<DtoServicioLineaNegocio> ObtenerServicioLineaNegocioPorID(int idServicio)
        {
            return await this.spServicioLineaNegocio.ObtenerServicioLineaNegocioPorID(idServicio);
        }
        public async Task<DtoRespuestaSP> EliminarServicioLineaNegocio(int idServicio)
        {
            return await this.spServicioLineaNegocio.EliminarServicioLineaNegocio(idServicio);
        }
        public async Task<List<DtoLineaNegocio>> ObtenerLineaNegocioActivos()
        {
            return await this.spServicioLineaNegocio.ObtenerLineasNegocioActivos();
        }
    }
}
