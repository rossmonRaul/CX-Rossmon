using System;
using System.Collections.Generic;
using System.Text;

namespace Dominio.Dto
{
    public class DtoTipoPerspectivas: DatosAuditoria
    {
        public int idTipoPerspectiva { get; set; }
        public string tipoPerspectiva { get; set; }
    }
}
