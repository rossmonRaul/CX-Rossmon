using System;
using System.Collections.Generic;
using System.Text;

namespace Dominio.Dto
{
    public class DtoTipoInteraccion : DatosAuditoria
    {
        public int idTipoInteraccion { get; set; }
        public string tipoInteraccion { get; set; }
    }
}
