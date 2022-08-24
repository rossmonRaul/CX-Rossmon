using System;
using System.Collections.Generic;
using System.Text;

namespace Dominio.Dto
{

    public class DtoServicioLineaNegocio : DatosAuditoria
    {
        public int IdServicio { get; set; }
        public int IdLinea { get; set; }
        public string Servicio { get; set; }
        public string LineaNegocio { get; set; }



    }
}
