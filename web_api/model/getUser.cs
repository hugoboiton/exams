using System;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;
using System.Data.Common;
using MySqlConnector;

namespace exampleAPP
{
    public class getUser
    {
        public string user { get; set; }
        public string pass { get; set; }
       
	    public string[] respuesta {get;set;}
        internal AppDb Db { get; set; }

        public getUser()
        {
        }

        internal getUser(AppDb db)
        {
            Db = db;
        }

        public async Task GetUserAsync()
        {
            var cmd = GetUserCmd();
            ReadAll(await cmd.ExecuteReaderAsync());
        }

        private MySqlCommand GetUserCmd()
        {
            var cmd = Db.Connection.CreateCommand() as MySqlCommand;
            // ReSharper disable once PossibleNullReferenceException
            cmd.CommandText = @"call get_usuario(@Usuer,@pass);";
            GetUserParams(cmd);
            return cmd;
        }

        private void ReadAll(DbDataReader reader)
        {
           
            using (reader)
            {
				 while (reader.Read())
                {
                   respuesta = new string[] { "respuesta", reader.GetFieldValue<String>(0) };
                }
                
				
            }
        }
        private void GetUserParams(MySqlCommand cmd)
        {
            cmd.Parameters.Add(new MySqlParameter
            {
                ParameterName = "@Usuer",
                DbType = DbType.String,
                Value = user,
            });
            cmd.Parameters.Add(new MySqlParameter
            {
                ParameterName = "@pass",
                DbType = DbType.String,
                Value = pass,
            });
        }
    }
}