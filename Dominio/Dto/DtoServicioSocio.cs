using System;
using System.Collections.Generic;
using System.Text;

namespace Dominio.Dto
{
    public class DtoServicioSocio : DatosAuditoria
    {
        public int idServicioSocio { get; set; }
        public string Cedula { get; set; }
        public string Nombre { get; set; }
        //cedula,nombre,info del servicio(nombre y linea de negocio)
        public string LineaNegocio { get; set; }

        //public string informacionServicio { get; set; }
        public string Servicio { get; set; }

        public int idSocio { get; set; }
        public int idServicio { get; set; }
        public int idLinea { get; set; }

    }
}
