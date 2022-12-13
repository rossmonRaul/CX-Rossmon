using System;
using System.Collections.Generic;
using System.Text;

namespace Dominio.Entiti
{
    public class EntitiRespuestasPreguntasEncuesta
    {
        public int IdRespuesta { get; set; }
        public string Respuesta { get; set; }
        public int IdPreguntaEncuesta { get; set; }

        public IEnumerable<string> Respuestas { get; set; }
    }
}
