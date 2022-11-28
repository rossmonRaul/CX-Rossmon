using System;
using System.Collections.Generic;
using System.Text;

namespace Dominio.Entiti
{
    public class EntitiMantenimientoTallerCoCreacion
    {
        public int idMantenimientoTalleresCoCreacion { get; set; }
        public int idTipoTaller { get; set; }
        public int idSolucionAsociadaHallazgo { get; set; }
        public int idServicioAsociadoHallazgo { get; set; }  
        public int numOficioEnvio { get; set; }
        public string fechaNumOficio { get; set; }
        public string descripcionGeneral { get; set; }


    }
}
