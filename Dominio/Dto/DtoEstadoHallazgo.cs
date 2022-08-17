using System;
using System.Collections.Generic;
using System.Text;

namespace Dominio.Dto
{
    public class DtoEstadoHallazgo : DatosAuditoria
    {
        public int idEstadoHallazgo { get; set; }
        public string codigo { get; set; }
        public string estadoHallazgo { get; set; }


    }
}
