using System;
using System.Collections.Generic;
using System.Text;

namespace Dominio.Dto
{
    public class DtoTipoEncuesta : DatosAuditoria
    {
        public int idTipoEncuesta { get; set; }

        public string tipoEncuesta { get; set; }
    }
}
