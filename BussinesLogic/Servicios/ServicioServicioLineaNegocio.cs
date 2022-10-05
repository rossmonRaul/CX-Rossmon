using DataAccess.StoredProcedures;
using Dominio.Dto;
using Dominio.Entiti;
using Dominio.Interfaces.Aplicacion.ServicioLineaNegocio;
using Dominio.Interfaces.Infraestructura.BaseDatos;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace BussinesLogic.Servicios
{
    public class ServicioServicioLineaNegocio : IServicioServicioLineaNegocio
    {
        public readonly IRepositorioServicioLineaNegocio repositorioServicioLineaNegocio;

        public ServicioServicioLineaNegocio(IRepositorioServicioLineaNegocio repositorioServicioLineaNegocio)
        {
            this.repositorioServicioLineaNegocio = repositorioServicioLineaNegocio;
        }
        public async Task<List<DtoServicioLineaNegocio>> ObtenerServicioLineaNegocio()
        {
            return await this.repositorioServicioLineaNegocio.ObtenerServicioLineaNegocio();
        }

        public async Task<DtoRespuestaSP> InsertarServicioLineaNegocio(EntitiServicioLineaNegocio entitiServicioLineaNegocio)
        {
            return await this.repositorioServicioLineaNegocio.InsertarServicioLineaNegocio(entitiServicioLineaNegocio);
        }

        public async Task<DtoRespuestaSP> ActualizarServicioLineaNegocio(EntitiServicioLineaNegocio entitiServicioLineaNegocio)
        {
            return await this.repositorioServicioLineaNegocio.ActualizarServicioLineaNegocio(entitiServicioLineaNegocio);
        }

        public async Task<DtoServicioLineaNegocio> ObtenerServicioLineaNegocioPorID(int idServicio)
        {
            return await this.repositorioServicioLineaNegocio.ObtenerServicioLineaNegocioPorID(idServicio);
        }
        public async Task<DtoRespuestaSP> EliminarServicioLineaNegocio(int idServicio)
        {
            return await this.repositorioServicioLineaNegocio.EliminarServicioLineaNegocio(idServicio);
        }
        public async Task<List<DtoLineaNegocio>> ObtenerLineaNegocioActivos()
        {
            return await this.repositorioServicioLineaNegocio.ObtenerLineasNegocioActivos();
        }
    }
}
