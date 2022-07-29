using System;
using System.Collections.Generic;
using System.Text;

namespace Dominio.Entiti
{
    //MODELO DE SEGMENTOS
    public class EntitiSegmentos
    {
        public int IdSegmento { get; set; }
        public string Tipo { get; set; }
        public string Descripcion { get; set; }
        public string Ingresado_por { get; set; }
        public string Fecha_ingreso { get; set; }
        public string Modificado_por { get; set; }
        public string Fecha_Modificacion { get; set; }

    }
}
