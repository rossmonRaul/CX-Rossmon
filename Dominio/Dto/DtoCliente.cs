using System;
using System.Collections.Generic;
using System.Text;

namespace Dominio.Dto
{
    public class DtoCliente : DatosAuditoria
    {
        public int IdClienteEncuesta { get; set; }
        public string Nombre { get; set; }
        public int Telefono { get; set; }
        public string CorreoElectronico { get; set; }
        public int IdCanal { get; set; }
        public string Canal { get; set; }
        public int IdSector { get; set; }
        public string Sector { get; set; }
        public int IdSegmento { get; set; }
        public string Segmento { get; set; }
        public int IdCategoria { get; set; }
        public string Categoria { get; set; }
        public int IdLinea { get; set; }
        public string LineaNegocio { get; set; }
        public int IdFaseCJ { get; set; } 
        public string FaseCustomerJourney { get; set; }
        public int IdServicio   { get; set; }
        public string Servicio { get; set; }
        public int IdSocio { get; set; }
        public string Socio { get; set; }
    }
}
