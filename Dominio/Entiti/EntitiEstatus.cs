using System;
using System.Collections.Generic;
using System.Text;

namespace Dominio.Entiti
{
    public class EntitiEstatus
    {
        public int IdEncuesta { get; set; }
        public int IdClienteEncuesta { get; set; }
        public int IdUsuario { get; set; }
        public string Token { get; set; }
        public bool Estatus { get; set; }


    }
}
