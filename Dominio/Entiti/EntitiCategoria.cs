using System;
using System.Collections.Generic;
using System.Text;

namespace Dominio.Entiti
{
    public class EntitiCategoria : DatosAuditoria
    {
        public int IdCategoria { get; set; }
        public string Categoria { get; set; }
        public string Rango { get; set; }
    }
}
