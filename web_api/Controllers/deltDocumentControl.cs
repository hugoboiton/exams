using System;
using System.Collections.Generic;
using System.Text.Json;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace exampleAPP.Controllers
{
    [ApiController]
    [Route("/api/deltDocument")]
    public class deltDocumentControl : ControllerBase
    {       
        
      // POST api/async
		[HttpPost]
		public async Task<IActionResult> Post([FromBody]deltDocument body)
		{
			using (var db = new AppDb())
			{
				await db.Connection.OpenAsync();
				body.Db = db;
				await body.deltDocumentAsync();
				return new OkObjectResult(body.respuesta);
			}
		}
      
    }
}
