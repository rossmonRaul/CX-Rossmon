﻿using System;
using System.Collections.Generic;
using System.Text;

namespace Dominio.Dto
{
    public class DtoRespuestasPreguntasEncuesta
    {
        public int IdRespuesta { get; set; }
        public string Respuesta { get; set; }
        public int IdPreguntaEncuesta { get; set; }

       
        public int IdTipoIndicador { get; set; }
        public string Pregunta { get; set; }

        public int IdTipoPregunta { get; set; }
        public int IdEncuesta { get; set; }
    }
}
