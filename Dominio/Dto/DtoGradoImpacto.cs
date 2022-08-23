using System;
using System.Collections.Generic;
using System.Text;

namespace Dominio.Dto
{
    public class DtoGradoImpacto : DatosAuditoria
    {
        public int idGradoImpacto { get; set; }
        public string gradoImpacto { get; set; }
    }
}
