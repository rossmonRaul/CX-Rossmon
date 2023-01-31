using Dapper;
using Dominio.Dto;
using Dominio.Entiti;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Dominio.Interfaces.Infraestructura.BaseDatos;

namespace DataAccess.StoredProcedures
{
    public class RepositorioEncuestas : IRepositorioEncuestas
    {
        private readonly IContextoBD contextoBD;

        public RepositorioEncuestas(IContextoBD contextoBD)
        {
            this.contextoBD = contextoBD;
        }

        public async Task<DtoRespuestaSP> InsertarEncuestas(EntitiEncuesta entitiEncuesta)
        {
            try
            {
                Dictionary<string, object> data = new Dictionary<string, object>();
                data.Add("IdTipoEncuesta", entitiEncuesta.IdTipoEncuesta);
                data.Add("Nombre", entitiEncuesta.Nombre);
                data.Add("Descripcion", entitiEncuesta.Descripcion);
                data.Add("IdFaseCJ", entitiEncuesta.IdFaseCJ);
                data.Add("IdTipoContactoEncuesta", entitiEncuesta.IdTipoContactoEncuesta);
                string query = "SPInsertarEncuestas";

                return await this.contextoBD.EjecutarSP(query, data);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<DtoRespuestaSP> ActualizarEncuesta(EntitiEncuesta entitiEncuesta)
        {

            try
            {
                Dictionary<string, object> data = new Dictionary<string, object>();

                data.Add("IdEncuesta", entitiEncuesta.IdEncuesta);
                data.Add("IdTipoEncuesta", entitiEncuesta.IdTipoEncuesta);
                data.Add("Nombre", entitiEncuesta.Nombre);
                data.Add("Descripcion", entitiEncuesta.Descripcion);
                data.Add("IdFaseCJ", entitiEncuesta.IdFaseCJ);
                data.Add("IdTipoContactoEncuesta", entitiEncuesta.IdTipoContactoEncuesta);
                string query = "SPActualizarEncuesta";

                return await this.contextoBD.EjecutarSP(query, data);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<DtoRespuestaSP> EliminarEncuesta(int idEncuesta)

        {
            try
            {
                Dictionary<string, object> data = new Dictionary<string, object>();
                data.Add("IdEncuesta", idEncuesta);
                string query = "SPEliminarEncuesta";

                return await this.contextoBD.EjecutarSP(query, data);
            }
            catch (Exception)
            {
                throw;
            }
        }


        public async Task<DtoEncuesta> ObtenerEncuestaPorId(int idEncuesta)
        {
            try
            {
                Dictionary<string, object> data = new Dictionary<string, object>();
                data.Add("IdEncuesta", idEncuesta);
                string query = "SPObtenerEncuestaPorID";

                return await this.contextoBD.ObtenerDato<DtoEncuesta>(query, data);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<List<DtoEncuesta>> ObtenerEncuestas()
        {
            try
            {
                string query = "SPObtenerEncuestas";
                var result = await this.contextoBD.ObtenerListaDeDatos<DtoEncuesta>(query);

                return result;
            }
            catch (Exception)
            {
                throw;
            }
        }
        public async Task<List<DtoEncuesta>> ObtenerEncuestasActivas()
        {
            try
            {
                string query = "SPObtenerEncuestasActivas";
                var result = await this.contextoBD.ObtenerListaDeDatos<DtoEncuesta>(query);

                return result;
            }
            catch (Exception)
            {
                throw;
            }
        }
    }

}

/* Método para crear tokens, encriptarlo, y desencriptarlo
 //crear token
                byte[] time = BitConverter.GetBytes(DateTime.UtcNow.ToBinary());
                byte[] key = Guid.NewGuid().ToByteArray();
                string token = Convert.ToBase64String(time.Concat(key).ToArray());
                System.Diagnostics.Debug.WriteLine(token);

                


                //encrypt
                string EncryptionKey = "proyectocxitrossmon2023";
                byte[] clearBytes = Encoding.Unicode.GetBytes(token);
                using (Aes encryptor = Aes.Create())
                {
                    Rfc2898DeriveBytes pdb = new Rfc2898DeriveBytes(EncryptionKey, new byte[] { 0x49, 0x76, 0x61, 0x6e, 0x20, 0x4d, 0x65, 0x64, 0x76, 0x65, 0x64, 0x65, 0x76 });
                    encryptor.Key = pdb.GetBytes(32);
                    encryptor.IV = pdb.GetBytes(16);
                    using (MemoryStream ms = new MemoryStream())
                    {
                        using (CryptoStream cs = new CryptoStream(ms, encryptor.CreateEncryptor(), CryptoStreamMode.Write))
                        {
                            cs.Write(clearBytes, 0, clearBytes.Length);
                            cs.Close();
                        }
                        token = Convert.ToBase64String(ms.ToArray());
                    }
                }
                token=token.Replace('+', '!');
                System.Diagnostics.Debug.WriteLine(token);

                //decrypt
                token = token.Replace('!', '+');
                byte[] cipherBytes = Convert.FromBase64String(token);
                using (Aes encryptor = Aes.Create())
                {
                    Rfc2898DeriveBytes pdb = new Rfc2898DeriveBytes(EncryptionKey, new byte[] { 0x49, 0x76, 0x61, 0x6e, 0x20, 0x4d, 0x65, 0x64, 0x76, 0x65, 0x64, 0x65, 0x76 });
                    encryptor.Key = pdb.GetBytes(32);
                    encryptor.IV = pdb.GetBytes(16);
                    using (MemoryStream ms = new MemoryStream())
                    {
                        using (CryptoStream cs = new CryptoStream(ms, encryptor.CreateDecryptor(), CryptoStreamMode.Write))
                        {
                            cs.Write(cipherBytes, 0, cipherBytes.Length);
                            cs.Close();
                        }
                        token = Encoding.Unicode.GetString(ms.ToArray());
                    }
                }
                
                System.Diagnostics.Debug.WriteLine(token);
                //convertir token a datos
                byte[] data = Convert.FromBase64String(token);

                DateTime when = DateTime.FromBinary(BitConverter.ToInt64(data, 0));
                if (when < DateTime.UtcNow.AddHours(-24))
                {
                    System.Diagnostics.Debug.WriteLine("Too Old");
                    System.Diagnostics.Debug.WriteLine(when);
                }
                else
                {
                    System.Diagnostics.Debug.WriteLine("Okay");
                    System.Diagnostics.Debug.WriteLine(when);
                }

 */