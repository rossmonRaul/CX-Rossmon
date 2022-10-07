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
        public readonly IRepositorioSectores repositorioSectores;

        public ServicioSectores(IRepositorioSectores repositorioSectores)
        {
            this.repositorioSectores = repositorioSectores;
        }

        public async Task<List<DtoSectores>> ObtenerSectores()
        {
            return await this.repositorioSectores.ObtenerSectores();
        }
        public async Task<List<DtoSectores>> ObtenerSectoresActivos()
        {
            return await this.repositorioSectores.ObtenerSectoresActivos();
        }

        public async Task<DtoRespuestaSP> InsertarSectores(EntitiSectores entitiSectores)
        {
            return await this.repositorioSectores.InsertarSectores(entitiSectores);
        }

        public async Task<DtoRespuestaSP> ActualizarSectores(EntitiSectores entitiSectores)
        {
            return await this.repositorioSectores.ActualizarSectores(entitiSectores);
        }

        public async Task<DtoSectores> ObtenerSectoresPorID(int idSector)
        {
            return await this.repositorioSectores.ObtenerSectoresPorID(idSector);
        }

        public async Task<DtoRespuestaSP> EliminarSector(int idSector)
        {
            return await this.repositorioSectores.EliminarSector(idSector);
        }
    }
}
