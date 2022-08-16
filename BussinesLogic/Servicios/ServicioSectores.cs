using DataAccess.StoredProcedures;
using Dominio.Dto;
using Dominio.Entiti;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace BussinesLogic.Servicios
{
    public class ServicioSectores
    {
        public SPSectores spSectores = new SPSectores();

        public async Task<List<DtoSectores>> ObtenerSectores()
        {
            return await this.spSectores.ObtenerSectores();
        }
        public async Task<List<DtoSectores>> ObtenerSectoresActivos()
        {
            return await this.spSectores.ObtenerSectoresActivos();
        }

        public async Task<DtoRespuestaSP> InsertarSectores(EntitiSectores entitiSectores)
        {
            return await this.spSectores.InsertarSectores(entitiSectores);
        }

        public async Task<DtoRespuestaSP> ActualizarSectores(EntitiSectores entitiSectores)
        {
            return await this.spSectores.ActualizarSectores(entitiSectores);
        }

        public async Task<DtoSectores> ObtenerSectoresPorID(int idSector)
        {
            return await this.spSectores.ObtenerSectoresPorID(idSector);
        }

        public async Task<DtoRespuestaSP> EliminarSector(int idSector)
        {
            return await this.spSectores.EliminarSector(idSector);
        }
    }
}
