using DataAccess.StoredProcedures;
using Dominio.Dto;
using Dominio.Entiti;
using Dominio.Interfaces.Aplicacion.GradoImpacto;
using Dominio.Interfaces.Infraestructura.BaseDatos;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;


namespace BussinesLogic.Servicios
{
    public class ServicioGradoImpacto : IServicioGradoImpacto
    {
        private readonly IRepositorioGradoImpacto repositorioGradoImpacto;

        public ServicioGradoImpacto(IRepositorioGradoImpacto repositorioGradoImpacto)
        {
            this.repositorioGradoImpacto = repositorioGradoImpacto;
        }
        public async Task<DtoRespuestaSP> InsertarGradoImpacto(EntitiGradoImpacto entitiGradoImpacto)
        {
            return await this.repositorioGradoImpacto.InsertarGradoImpacto(entitiGradoImpacto);
        }
        public async Task<DtoRespuestaSP> ActualizarGradoImpacto(EntitiGradoImpacto entitiGradoImpacto)
        {
            return await this.repositorioGradoImpacto.ActualizarGradoImpacto(entitiGradoImpacto);
        }
        public async Task<DtoRespuestaSP> EliminarGradoImpacto(int idGradoImpacto)
        {
            return await this.repositorioGradoImpacto.EliminarGradoImpacto(idGradoImpacto);
        }
        public async Task<DtoGradoImpacto> ObtenerGradoImpactoPorID(int idGradoImpacto)
        {
            return await this.repositorioGradoImpacto.ObtenerGradoImpactoPorID(idGradoImpacto);
        }

        public async Task<List<DtoGradoImpacto>> ObtenerGradoImpacto()
        {
            return await this.repositorioGradoImpacto.ObtenerGradoImpacto();
        }
    }
}
