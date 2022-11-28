using System;
using System.Collections.Generic;
using System.Text;

namespace Dominio.Dto
{

    public class DtoEtapaTallerCo : DatosAuditoria
    {
        public int idEtapaTallerCo { get; set; }
        public int idTipoTaller { get; set; }
        public string idMacro { get; set; }
        public string macroActividad { get; set; }
        public string observacion { get; set; }
       /* public string fechaIngreso { get; set; }
        public string ingresadoPor { get; set; }
        public string fechaModificacion { get; set; }
        public string modificadoPor { get; set; }*/

    }
}
