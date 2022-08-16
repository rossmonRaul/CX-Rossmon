using System;
using System.Collections.Generic;
using System.Text;

namespace Dominio
{
    public class DatosAuditoria
    {
        public string ingresadoPor { get; set; }
        public DateTime fechaIngreso { get; set; }
        public string? modificadoPor { get; set; }
        public DateTime? fechaModificacion { get; set; }
        public bool estado { get; set; } // 1 Y 0
        public char? accion { get; set; } // I , A , E
    }
}
