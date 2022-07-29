using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Conexion
{
    public class BdConexion
    {
        public string connectionString;
        public BdConexion()
        {
            var configuration = GetConfiguration();
            connectionString = new SqlConnection(configuration.GetSection("ConnectionStrings").GetSection("BD").Value).ConnectionString;
        }

        public IConfigurationRoot GetConfiguration()
        {
            var builder = new ConfigurationBuilder().SetBasePath(Directory.GetCurrentDirectory()).AddJsonFile("appsettings.json", optional: true, reloadOnChange: true);
            return builder.Build();
        }

    }
}