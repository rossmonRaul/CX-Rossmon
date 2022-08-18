using System;
using System.Collections.Generic;
using System.Text;

namespace Dominio.Dto
{
    public class DtoTipoTaller : DatosAuditoria
    {
        public int idTipoTaller { get; set; }

        public string tipoTaller { get; set; }
    }
}
