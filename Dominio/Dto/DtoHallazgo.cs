using System;
using System.Collections.Generic;
using System.Text;

namespace Dominio.Dto
{

    public class DtoHallazgo : DatosAuditoria
    {
        public int idMantenimientoHallazgo { get; set; }
        public int idSolucionAsociadaHallazgo { get; set; }
        public int idGradoImpacto { get; set; }
        public int idEstadoHallazgo { get; set; }
        public int idPeriodicidadEntregaAvances { get; set; }
        public int idFaseCJ { get; set; }
        public int idServicioAsociadoHallazgo { get; set; }
        public int idGradoEsfuerzo { get; set; }
        public int numOficioEnvio { get; set; }
        public int idTallerCoCreacion { get; set; }
        public int idMacroActividadAsociadaHallazgo { get; set; }
        public int idEstadoAceptacion { get; set; }
        public int porcentajeGeneral { get; set; }
        public string detalleGeneralHallazgo { get; set; }
        public string detalleEspecificoHallazgo { get; set; }
        public string anotacion { get; set; }
        public string finalizadoPor { get; set; }
        public string fechaFinalizacion { get; set; }
    }
}