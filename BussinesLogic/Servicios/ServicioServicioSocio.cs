using DataAccess.StoredProcedures;
using Dominio.Dto;
using Dominio.Entiti;
using Dominio.Interfaces.Aplicacion.ServicioSocio;
using Dominio.Interfaces.Infraestructura.BaseDatos;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace BussinesLogic.Servicios
{
    public class ServicioServicioSocio: IServicioServicioSocio
    {

        public readonly IRepositorioServicioSocio spServicioSocio;

        public ServicioServicioSocio(IRepositorioServicioSocio spServicioSocio)
        {
            this.spServicioSocio = spServicioSocio;
        }

        public async Task<List<DtoServicioSocio>> ObtenerServicioSocio()
        {
            return await this.spServicioSocio.ObtenerServicioSocio();
        }
        public async Task<List<DtoServicioSocio>> ObtenerServicioSocioActivos()
        {
            return await this.spServicioSocio.ObtenerServicioSocioActivos();
        }

        public async Task<DtoRespuestaSP> InsertarServicioSocio(EntitiServicioSocio entitiServicioSocio)
        {
            return await this.spServicioSocio.InsertarServicioSocio(entitiServicioSocio);
        }

        public async Task<DtoRespuestaSP> ActualizarServicioSocio(EntitiServicioSocio entitiServicioSocio)
        {
            return await this.spServicioSocio.ActualizarServicioSocio(entitiServicioSocio);
        }

       public async Task<DtoServicioSocio> ObtenerServicioSocioPorID(int entitiServicioSocio)
        {
            return await this.spServicioSocio.ObtenerServicioSocioPorID(entitiServicioSocio);
        }
        public async Task<DtoRespuestaSP> EliminarServicioSocio(int entitiServicioSocio)
        {
            return await this.spServicioSocio.EliminarServicioSocio(entitiServicioSocio);
        }
    }
}
