using DataAccess.StoredProcedures;
using Dominio.Dto;
using Dominio.Entiti;
using Dominio.Interfaces.Aplicacion.Segmentos;
using Dominio.Interfaces.Infraestructura.BaseDatos;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace BussinesLogic.Servicios
{
    public class ServicioSegmentos : IServicioSegmentos
    {
        public readonly IRepositorioSegmentos repositorioSegmentos;

        public ServicioSegmentos(IRepositorioSegmentos repositorioSegmentos)
        {
            this.repositorioSegmentos = repositorioSegmentos;
        }
        public async Task<List<DtoSegmentos>> ObtenerSegmentos()
        {
            return await this.repositorioSegmentos.ObtenerSegmentos();
        }

        public async Task<DtoRespuestaSP> InsertarSegmentos(EntitiSegmentos entitiSegmentos)
        {
            return await this.repositorioSegmentos.InsertarSegmentos(entitiSegmentos);
        }

        public async Task<DtoRespuestaSP> ActualizarSegmentos(EntitiSegmentos entitiSegmentos)
        {
            return await this.repositorioSegmentos.ActualizarSegmentos(entitiSegmentos);
        }

        public async Task<DtoSegmentos> ObtenerSegmentoPorID(int idSegmento)
        {
            return await this.repositorioSegmentos.ObtenerSegmentosPorID(idSegmento);
        }
        public async Task<DtoRespuestaSP> EliminarSegmento(int idSegmento)
        {
            return await this.repositorioSegmentos.EliminarSegmento(idSegmento);
        }
    }
}
