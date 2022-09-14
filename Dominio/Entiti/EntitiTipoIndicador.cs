using System;
using System.Collections.Generic;
using System.Text;

namespace Dominio.Entiti
{
    public class EntitiTipoIndicador
    {
        public string TipoIndicador { get; set; }
        public int IdTipoIndicador { get; set; }
        public string Sigla { get; set; }
        public int Minimo { get; set; }
        public int Maximo { get; set; }
    }
}
