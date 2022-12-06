using System;
using System.Collections.Generic;
using System.Text;

namespace Dominio.Dto
{

    public class DtoMantenimientoTallerCoCreacion : DatosAuditoria
    {
        public int idMantenimientoTalleresCoCreacion { get; set; }
        public string tipoTaller { get; set; }
        public string lineaNegocio { get; set; }
        public string servicio { get; set; }
        public string orbe { get; set; }
        public string fechaNumOficio { get; set; }
        public string descripcionGeneral { get; set; }
        public int idTipoTaller { get; set; }
        public int idSolucionAsociadaHallazgo { get; set; }
        public int idServicioAsociadoHallazgo { get; set; }
        public int numOficioEnvio { get; set; }
        public string fechaIngreso { get; set; }
        public string ingresadoPor { get; set; }
        public string fechaModificacion { get; set; }
        public string modificadoPor { get; set; }

    }
}
