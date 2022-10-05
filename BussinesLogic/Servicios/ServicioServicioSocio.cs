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

        public readonly IRepositorioServicioSocio repositorioServicioSocio;

        public ServicioServicioSocio(IRepositorioServicioSocio repositorioServicioSocio)
        {
            this.repositorioServicioSocio = repositorioServicioSocio;
        }

        public async Task<List<DtoServicioSocio>> ObtenerServicioSocio()
        {
            return await this.repositorioServicioSocio.ObtenerServicioSocio();
        }
        public async Task<List<DtoServicioSocio>> ObtenerServicioSocioActivos()
        {
            return await this.repositorioServicioSocio.ObtenerServicioSocioActivos();
        }

        public async Task<DtoRespuestaSP> InsertarServicioSocio(EntitiServicioSocio entitiServicioSocio)
        {
            return await this.repositorioServicioSocio.InsertarServicioSocio(entitiServicioSocio);
        }

        public async Task<DtoRespuestaSP> ActualizarServicioSocio(EntitiServicioSocio entitiServicioSocio)
        {
            return await this.repositorioServicioSocio.ActualizarServicioSocio(entitiServicioSocio);
        }

       public async Task<DtoServicioSocio> ObtenerServicioSocioPorID(int entitiServicioSocio)
        {
            return await this.repositorioServicioSocio.ObtenerServicioSocioPorID(entitiServicioSocio);
        }
        public async Task<DtoRespuestaSP> EliminarServicioSocio(int entitiServicioSocio)
        {
            return await this.repositorioServicioSocio.EliminarServicioSocio(entitiServicioSocio);
        }
    }
}
