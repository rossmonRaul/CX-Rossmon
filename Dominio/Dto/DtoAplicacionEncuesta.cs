using System;
using System.Collections.Generic;
using System.Text;

namespace Dominio.Dto
{
    public class DtoAplicacionEncuesta : DatosAuditoria
    {
        public int IdUsuarioEncuesta { get; set; }
        public string Nombre { get; set; }
        public string Apellido { get; set; }
        public string Telefono { get; set; }
        public string CorreoElectronico { get; set; }
    }

}

