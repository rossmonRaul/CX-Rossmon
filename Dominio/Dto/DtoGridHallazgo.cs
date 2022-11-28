using System;
using System.Collections.Generic;
using System.Text;

namespace Dominio.Dto
{

    public class DtoGridHallazgo : DatosAuditoria
    {
        public int idMantenimientoHallazgo { get; set; }
        public string detalleEspecificoHallazgo { get; set; }
        public string lineaNegocio { get; set; }

        public string servicio { get; set; }
    }
}