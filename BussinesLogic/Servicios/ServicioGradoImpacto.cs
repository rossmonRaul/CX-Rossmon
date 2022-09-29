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
        private readonly IRepositorioGradoImpacto spGradoImpacto;

        public ServicioGradoImpacto(IRepositorioGradoImpacto repositorioGradoImpacto)
        {
            this.spGradoImpacto = repositorioGradoImpacto;
        }
        public async Task<DtoRespuestaSP> InsertarGradoImpacto(EntitiGradoImpacto entitiGradoImpacto)
        {
            return await this.spGradoImpacto.InsertarGradoImpacto(entitiGradoImpacto);
        }
        public async Task<DtoRespuestaSP> ActualizarGradoImpacto(EntitiGradoImpacto entitiGradoImpacto)
        {
            return await this.spGradoImpacto.ActualizarGradoImpacto(entitiGradoImpacto);
        }
        public async Task<DtoRespuestaSP> EliminarGradoImpacto(int idGradoImpacto)
        {
            return await this.spGradoImpacto.EliminarGradoImpacto(idGradoImpacto);
        }
        public async Task<DtoGradoImpacto> ObtenerGradoImpactoPorID(int idGradoImpacto)
        {
            return await this.spGradoImpacto.ObtenerGradoImpactoPorID(idGradoImpacto);
        }

        public async Task<List<DtoGradoImpacto>> ObtenerGradoImpacto()
        {
            return await this.spGradoImpacto.ObtenerGradoImpacto();
        }
    }
}
