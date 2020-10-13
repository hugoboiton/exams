using System;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;
using System.Data.Common;
using MySqlConnector;

namespace exampleAPP
{
    public class setUser
    {
        //call set_usuario('hugo','boiton','hboiton2350','1234',@result);

        public string nombre {get; set;}
        public string apellido {get; set;}
        public string user { get; set; }
        public string pass { get; set; }

         public string[] respuesta {get;set;}
       
        public List<setUser> userlist { get; set; }
        internal AppDb Db { get; set; }

        public setUser()
        {
        }

        internal setUser(AppDb db)
        {
            Db = db;
           
        }

        public async Task setUserAsync()
        {
            var cmd = setUserCmd();
            ReadAll(await cmd.ExecuteReaderAsync());
            //await cmd.ExecuteReaderAsync();
          
        }

        private MySqlCommand setUserCmd()
        {
            var cmd = Db.Connection.CreateCommand() as MySqlCommand;
            // ReSharper disable once PossibleNullReferenceException  
            cmd.CommandText = @"call set_usuario(@nombre,@apellido,@user,@pass);";
            setUserParams(cmd);
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
       /* private List<setUser> ReadAll(DbDataReader reader)
        {
            var posts = new List<setUser>();
            using (reader)
            {
                while (reader.Read())
                {
                    var post = new setUser(Db)
                    {
                        result = reader.GetFieldValue<String>(0),

                    };
                    posts.Add(post);
                }
            }
            return posts;
        }*/
        private void setUserParams(MySqlCommand cmd)
        {
            cmd.Parameters.Add(new MySqlParameter
            {
                ParameterName = "@nombre",
                DbType = DbType.String,
                Value = nombre,
            });
            cmd.Parameters.Add(new MySqlParameter
            {
                ParameterName = "@apellido",
                DbType = DbType.String,
                Value = apellido,
            });
            cmd.Parameters.Add(new MySqlParameter
            {
                ParameterName = "@user",
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