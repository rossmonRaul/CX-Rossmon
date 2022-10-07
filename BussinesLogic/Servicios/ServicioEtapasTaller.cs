using DataAccess.StoredProcedures;
using Dominio.Dto;
using Dominio.Entiti;
using Dominio.Interfaces.Aplicacion.EtapasTaller;
using Dominio.Interfaces.Infraestructura.BaseDatos;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace BussinesLogic.Servicios
{
    public class ServicioEtapasTaller : IServicioEtapasTaller
    {
        private readonly IRepositorioEtapasTaller repositorioEtapasTaller;

        public ServicioEtapasTaller(IRepositorioEtapasTaller repositorioEtapasTaller)
        {
            this.repositorioEtapasTaller = repositorioEtapasTaller;
        }
        public async Task<DtoRespuestaSP> InsertarEtapasTaller(EntitiEtapasTaller entitiEtapasTaller)
        {
            return await this.repositorioEtapasTaller.InsertarEtapasTaller(entitiEtapasTaller);
        }
        public async Task<DtoRespuestaSP> ActualizarEtapasTaller(EntitiEtapasTaller entitiEtapasTaller)
        {
            return await this.repositorioEtapasTaller.ActualizarEtapasTaller(entitiEtapasTaller);
        }
        public async Task<DtoRespuestaSP> EliminarEtapasTaller(int idEtapaTaller)
        {
            return await this.repositorioEtapasTaller.EliminarEtapasTaller(idEtapaTaller);
        }
        public async Task<DtoEtapasTaller> ObtenerEtapasTallerPorID(int idEtapaTaller)
        {
            return await this.repositorioEtapasTaller.ObtenerEtapasTallerPorID(idEtapaTaller);
        }

        public async Task<List<DtoEtapasTaller>> ObtenerEtapasTaller()
        {
            return await this.repositorioEtapasTaller.ObtenerEtapasTaller();
        }
    }
}
