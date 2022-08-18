using System;
using System.Collections.Generic;
using System.Text;

namespace Dominio.Dto
{
    public class DtoPeriodicidad  : DatosAuditoria
    {

        public int idPeriodicidad { get; set; }

        public string periodicidad { get; set; }
    }
}
