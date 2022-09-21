using System;
using System.Collections.Generic;
using System.Text;

namespace Dominio.Dto
{
    public class DtoTipoIdentificacion: DatosAuditoria
    {
        public int idTipoIdentificacion { get; set; }
        public string tipoIdentificacion { get; set; }
    }
}
