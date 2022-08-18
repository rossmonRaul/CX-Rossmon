using System;
using System.Collections.Generic;
using System.Text;

namespace Dominio.Entiti
{
    public class EntitiJefaturas:DatosAuditoria
    {
        public int IdJefatura { get; set; }
        public int IdDireccion { get; set; }
        public string Codigo { get; set; }
        public string Jefatura { get; set; }
    }
}
