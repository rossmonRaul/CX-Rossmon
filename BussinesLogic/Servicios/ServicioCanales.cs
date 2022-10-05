using DataAccess.StoredProcedures;
using Dominio.Dto;
using Dominio.Entiti;
using System;
using System.Collections.Generic;
using System.Text;
using Dominio.Interfaces.Aplicacion.Canales;
using Dominio.Interfaces.Infraestructura.BaseDatos;
using System.Threading.Tasks;

namespace BussinesLogic.Servicios
{
    public class ServicioCanales : IServicioCanales
    {
        private readonly IRepositorioCanales repositorioCanales;

        public ServicioCanales(IRepositorioCanales repositorioCanales)
        {
            this.repositorioCanales = repositorioCanales;
        }

        public async Task<List<DtoCanales>> ObtenerCanales()
        {
            return await this.repositorioCanales.ObtenerCanales();
        }

        public async Task<DtoRespuestaSP> InsertarCanales(EntitiCanales entitiCanales)
        {
            return await this.repositorioCanales.InsertarCanales(entitiCanales);
        }
        public async Task<DtoRespuestaSP> ActualizarCanales(EntitiCanales entitiCanales)
        {
            return await this.repositorioCanales.ActualizarCanales(entitiCanales);
        }
        public async Task<DtoRespuestaSP> EliminarCanales(int idCanal)
        {
            return await this.repositorioCanales.EliminarCanales(idCanal);
        }
        public async Task<DtoCanales> ObtenerCanalesPorID(int idCanal)
        {
            return await this.repositorioCanales.ObtenerCanalesPorID(idCanal);
        }
    }
}

