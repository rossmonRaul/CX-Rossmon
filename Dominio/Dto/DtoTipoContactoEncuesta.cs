using System;
using System.Collections.Generic;
using System.Text;

namespace Dominio.Dto
{
    public class DtoTipoContactoEncuesta : DatosAuditoria
    {
        public int idTipoContactoEncuesta { get; set; }
        public string tipoContactoEncuesta { get; set; }
    }
}
