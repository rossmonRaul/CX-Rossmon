using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Dapper;
using Dominio.Dto;
using Dominio.Entiti;
using Dominio.Interfaces.Infraestructura.BaseDatos;

namespace DataAccess.StoredProcedures
{
    public class RepositorioSectores : IRepositorioSectores
    {
        private readonly IContextoBD contextoBD;

        public RepositorioSectores(IContextoBD contextoBD)
        {
            this.contextoBD = contextoBD;
        }

        public async Task<DtoRespuestaSP> InsertarSectores(EntitiSectores entitiSectores)
        {
            try
            {
                Dictionary<string, object> data = new Dictionary<string, object>();
                data.Add("Sector", entitiSectores.Sector);

                string query = "SPInsertarSectores";

                return await this.contextoBD.EjecutarSP(query, data);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<DtoRespuestaSP> ActualizarSectores(EntitiSectores entitiSectores)
        {

            try
            {
                Dictionary<string, object> data = new Dictionary<string, object>();

                data.Add("Sector", entitiSectores.Sector);
                data.Add("IdSector", entitiSectores.IdSector);
                string query = "SPActualizarSector";

                return await this.contextoBD.EjecutarSP(query, data);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<DtoRespuestaSP> EliminarSector(int idSector)

        {
            try
            {
                Dictionary<string, object> data = new Dictionary<string, object>();
                data.Add("IdSector", idSector);
                string query = "SPEliminarSector";

                return await this.contextoBD.EjecutarSP(query, data);
            }
            catch (Exception)
            {
                throw;
            }
        }


        public async Task<DtoSectores> ObtenerSectoresPorID(int idSector)
        {
            try
            {
                Dictionary<string, object> data = new Dictionary<string, object>();
                data.Add("IdSector", idSector);
                string query = "SPObtenerSectorPorID";

                return await this.contextoBD.ObtenerDato<DtoSectores>(query, data);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<List<DtoSectores>> ObtenerSectores()
        {
            try
            {
                string query = "SPObtenerSectores";
                var result = await this.contextoBD.ObtenerListaDeDatos<DtoSectores>(query);

                return result;
            }
            catch (Exception)
            {
                throw;
            }
        }
        public async Task<List<DtoSectores>> ObtenerSectoresActivos()
        {
            try
            {
                string query = "SPObtenerSectoresActivos";
                var result = await this.contextoBD.ObtenerListaDeDatos<DtoSectores>(query);

                return result;
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}