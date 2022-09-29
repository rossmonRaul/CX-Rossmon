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
        public readonly IRepositorioSegmentos spSegmentos;

        public ServicioSegmentos(IRepositorioSegmentos spSegmentos)
        {
            this.spSegmentos = spSegmentos;
        }
        public async Task<List<DtoSegmentos>> ObtenerSegmentos()
        {
            return await this.spSegmentos.ObtenerSegmentos();
        }

        public async Task<DtoRespuestaSP> InsertarSegmentos(EntitiSegmentos entitiSegmentos)
        {
            return await this.spSegmentos.InsertarSegmentos(entitiSegmentos);
        }

        public async Task<DtoRespuestaSP> ActualizarSegmentos(EntitiSegmentos entitiSegmentos)
        {
            return await this.spSegmentos.ActualizarSegmentos(entitiSegmentos);
        }

        public async Task<DtoSegmentos> ObtenerSegmentoPorID(int idSegmento)
        {
            return await this.spSegmentos.ObtenerSegmentosPorID(idSegmento);
        }
        public async Task<DtoRespuestaSP> EliminarSegmento(int idSegmento)
        {
            return await this.spSegmentos.EliminarSegmento(idSegmento);
        }
    }
}
