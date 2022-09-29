using DataAccess.StoredProcedures;
using Dominio.Dto;
using Dominio.Entiti;
using Dominio.Interfaces.Aplicacion.Sectores;
using Dominio.Interfaces.Infraestructura.BaseDatos;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace BussinesLogic.Servicios
{
    public class ServicioSectores: IServicioSectores
    {
        public readonly IRepositorioSectores spSectores;

        public ServicioSectores(IRepositorioSectores spSectores)
        {
            this.spSectores = spSectores;
        }

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
