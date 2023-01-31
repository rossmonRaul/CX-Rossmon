using System;
using System.Collections.Generic;
using System.Text;

namespace Dominio.Entiti
{
    public class EntitiCliente
    {
        public int IdCliente { get; set; }
        public string Nombre { get; set; }
        public string Telefono { get; set; }
        public string CorreoElectronico { get; set; }
        public int IdCanal { get; set; }
        public int IdSector { get; set; }
        public int IdSegmento { get; set; }
        public int IdCategoria { get; set; }
        public int IdLinea { get; set; }
        public int IdFaseCJ { get; set; }
        public int IdServicio { get; set; }
        public int IdSocio { get; set; }

    }
}
