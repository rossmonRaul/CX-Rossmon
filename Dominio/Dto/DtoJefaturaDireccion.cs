using System;
using System.Collections.Generic;
using System.Text;

namespace Dominio.Dto
{
    public class DtoJefaturaDireccion
    {
        public int IdJefatura { get; set; }
        public int IdDireccion { get; set; }
        public string CodigoJefatura { get; set; }
        public string Jefatura { get; set; }
        public string CodigoDireccion { get; set; }
        public string Direccion { get; set; }
        public bool Estado { get; set; }
    }
}
