using System;
using System.Collections.Generic;
using System.Text;

namespace Dominio.Entiti
{
    public class EntitiEncuesta
    {
        public int IdEncuesta { get; set; }
        public string Nombre { get; set; }
        public string Descripcion { get; set; }
        public int IdTipoEncuesta { get; set; }
        public int IdFaseCJ { get; set; }
        public int IdTipoContactoEncuesta { get; set; }

    }
}
