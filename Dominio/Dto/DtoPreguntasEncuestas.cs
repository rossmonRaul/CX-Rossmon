﻿using System;
using System.Collections.Generic;
using System.Text;

namespace Dominio.Dto
{
    public class DtoPreguntasEncuestas: DatosAuditoria
    {
        public int idPreguntaEncuesta { get; set; }
        public string pregunta { get; set; }
        public string tipo { get; set; }
        public string sigla { get; set; }
        public string descripcion { get; set; }
        public string metrica { get; set; }
        public string tipoEncuesta { get; set; }
        public int idTipoEncuesta { get; set; }
        public int idTipoPregunta { get; set; }
        public int idFase { get; set; }
        public int idTipoMetrica { get; set; }
        public int idTipoPerspectiva { get; set; }
        public int idTipoIndicador { get; set; }
        public int idTipoContactoEncuesta { get; set; }
        public int idTipoInteraccion { get; set; }
        public int idFaseCJ { get; set; }
        public string faseCustomerJourney { get; set; }


    }
}
