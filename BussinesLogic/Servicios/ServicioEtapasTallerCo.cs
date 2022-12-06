using DataAccess.StoredProcedures;
using Dominio.Dto;
using Dominio.Entiti;
using Dominio.Interfaces.Aplicacion.EtapaTallerCo;
using Dominio.Interfaces.Infraestructura.BaseDatos;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace BussinesLogic.Servicios
{
    public class ServicioEtapasTallerCo : IServicioEtapaTallerCo
    {

        private readonly IRepositorioEtapaTallerCo repositorioEtapaTallerCo;
        public ServicioEtapasTallerCo(IRepositorioEtapaTallerCo repositorioEtapaTallerCo)
        {
            this.repositorioEtapaTallerCo = repositorioEtapaTallerCo;
        }

        public async Task<DtoRespuestaSP> AgregarEtapaTallerCo(EntitiEtapaTallerCo entitiEtapaTallerCo)
        {
            return await this.repositorioEtapaTallerCo.AgregarEtapaTallerCo(entitiEtapaTallerCo);
        }
        public async Task<DtoRespuestaSP> ActualizarEtapaTallerCo(EntitiEtapaTallerCo entitiEtapaTallerCo)
        {
            return await this.repositorioEtapaTallerCo.ActualizarEtapaTallerCo(entitiEtapaTallerCo);
        }

        public async Task<DtoEtapaTallerCo> ObtenerEtapaTallerCoPorID(int idEtapaTallerCo)
        {
            return await this.repositorioEtapaTallerCo.ObtenerEtapaTallerCoPorID(idEtapaTallerCo);
        }

        public async Task<List<DtoEtapaTallerCo>> ObtenerEtapasTallerCo(int idTipoTaller, int idTallerCoCreacion)
        {
            return await this.repositorioEtapaTallerCo.ObtenerEtapasTallerCo(idTipoTaller, idTallerCoCreacion);
        }
        public async Task<DtoEtapaTallerCo> ObtenerFechasTallerCo(int idTipoTaller, int idTallerCoCreacion)
        {
            return await this.repositorioEtapaTallerCo.ObtenerFechasTallerCo(idTipoTaller, idTallerCoCreacion);
        }

        public async Task<DtoCantidadDatos> ObtenerCantidadEtapasTallerCo()
        {
            return await this.repositorioEtapaTallerCo.ObtenerCantidadEtapasTallerCo();
        }
    }
}