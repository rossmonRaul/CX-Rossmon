using System;
using System.Collections.Generic;
using System.Text;

namespace Dominio.Dto
{
    public class DtoEstadoAceptacion : DatosAuditoria
    {
        public int idEstadoAceptacion { get; set; }
        public string codigo { get; set; }
        public string estadoAceptacion { get; set; }


    }
}
