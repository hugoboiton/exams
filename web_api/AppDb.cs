using System;
using MySqlConnector;
namespace exampleAPP
{
    public class AppDb : IDisposable
    {
        public MySqlConnection Connection { get; }

        public AppDb()
        {
            //server=192.168.1.29;user=root;password=secret;database=documentos"
            MySqlConnectionStringBuilder conn_string = new MySqlConnectionStringBuilder();
            conn_string.Server = "192.168.1.24";
            conn_string.Port = 33060;
            conn_string.UserID = "root";
            conn_string.Password = "secret";
            conn_string.Database = "documentos";
            Connection = new MySqlConnection(conn_string.ToString());
        }

        public void Dispose() => Connection.Dispose();
    }
}