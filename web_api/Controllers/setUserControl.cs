using System;
using System.Collections.Generic;
using System.Text.Json;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace exampleAPP.Controllers
{
    [ApiController]
    [Route("/api/setUser")]
    public class setUserControl : ControllerBase
    {       
        
      // POST api/async
		[HttpPost]
		public async Task<IActionResult> Post([FromBody]setUser body)
		{
			using (var db = new AppDb())
			{
				await db.Connection.OpenAsync();
				body.Db = db;
				await body.setUserAsync();
				return new OkObjectResult(body.respuesta);
			}
		}
      
    }
}
