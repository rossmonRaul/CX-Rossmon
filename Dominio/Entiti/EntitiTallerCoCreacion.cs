using System;
using System.Collections.Generic;
using System.Text;

namespace Dominio.Entiti
{
    public class EntitiTallerCoCreacion
    {
        public int IdTallerCoCreacion { get; set; }
        public string OficioAutoriza { get; set; }
        public int IdTipoTaller { get; set; }
        public int IdServicio { get; set; }
        public string FechaTaller { get; set; }
        public string DescripcionGeneral { get; set; }
    }
}
