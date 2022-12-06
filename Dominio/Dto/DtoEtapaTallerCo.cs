using System;
using System.Collections.Generic;
using System.Text;

namespace Dominio.Dto
{

    public class DtoEtapaTallerCo : DatosAuditoria
    {
        public int idTallerCoCreacion { get; set; }
        public int idEtapaTallerCo { get; set; }
        public int idTipoTaller { get; set; }
        public string idMacro { get; set; }
        public string macroActividad { get; set; }
        public string observacion { get; set; }

    }
}
