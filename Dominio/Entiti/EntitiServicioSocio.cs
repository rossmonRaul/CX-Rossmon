using System;
using System.Collections.Generic;
using System.Text;

namespace Dominio.Entiti
{
    public class EntitiServicioSocio
    {
        public int idServicioSocio { get; set; }
        public int Nombre { get; set; }
        //cedula,nombre,info del servicio(nombre y linea de negocio)
        public int LineaNegocio { get; set; }

        //public string informacionServicio { get; set; }

        public int Servicio { get; set; }


    }
}
