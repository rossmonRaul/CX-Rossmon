using System;
using System.Collections.Generic;
using System.Text;

namespace Dominio.Dto
{
    public class DtoEtapasTaller : DatosAuditoria
    {
        public int idEtapaTaller { get; set; }

        public string etapaTaller { get; set; }

        public int? idTipoTaller { get; set; }

        public string? TipoTaller { get; set; }

    }
}
