using System;
using System.Collections.Generic;
using System.Text;

namespace Dominio.Entiti
{
    public class EntitiEtapaTallerCo
    {
        public int idTallerCoCreacion { get; set; }
        public int idEtapaTallerCo { get; set; }
        public int idTipoTaller { get; set; }
        public int idMacro { get; set; }
        public string observacion { get; set; }

    }
}
