using DataAccess.StoredProcedures;
using Dominio.Dto;
using Dominio.Entiti;
using Dominio.Interfaces.Infraestructura.BaseDatos;
using Dominio.Interfaces.Aplicacion.Jefatura;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Dominio.Interfaces.Aplicacion.PreguntasAsignadas;

namespace BussinesLogic.Servicios
{
    public class ServicioPreguntasAsignadas: IServicioPreguntasAsignadas
    {
        public readonly IRepositorioPreguntasAsignadas repositorioPreguntasAsignadas;

        public ServicioPreguntasAsignadas(IRepositorioPreguntasAsignadas repositorioPreguntasAsignadass)
        {
            this.repositorioPreguntasAsignadas = repositorioPreguntasAsignadass;
        }
        public async Task<DtoRespuestaSP> AsignarPregunta(EntitiPreguntaAsignada entitiPreguntaAsignada)
        {
            return await this.repositorioPreguntasAsignadas.AsignarPregunta(entitiPreguntaAsignada);
        }
        public async Task<DtoRespuestaSP> DesasignarPregunta(int idPreguntaEncuesta)
        {
            return await this.repositorioPreguntasAsignadas.DesasignarPregunta(idPreguntaEncuesta);
        }
        public async Task<List<DtoPreguntaAsignada>> ObtenerPreguntasPorIdEncuesta(int idEncuesta)
        {
            return await this.repositorioPreguntasAsignadas.ObtenerPreguntasPorIdEncuesta(idEncuesta);
        }
        public async Task<List<DtoPreguntasEncuestas>> ObtenerPreguntasNoAsignadasPorIdEncuesta(int idEncuesta)
        {
            return await this.repositorioPreguntasAsignadas.ObtenerPreguntasNoAsignadasPorIdEncuesta(idEncuesta);
        }
    }
}
