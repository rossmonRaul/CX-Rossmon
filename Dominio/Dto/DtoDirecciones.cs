using System;
using System.Collections.Generic;
using System.Text;

namespace Dominio.Dto
{
   
    public class DtoDirecciones : DatosAuditoria
    {
        public int IdDireccion { get; set; }
        public string Direccion { get; set; }

        public string Codigo { get; set; }


    }
}
