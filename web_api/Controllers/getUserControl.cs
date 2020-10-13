using System;
using System.Collections.Generic;
using System.Text.Json;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace exampleAPP.Controllers
{
	[Authorize(AuthenticationSchemes = CookieAuthenticationDefaults.AuthenticationScheme)]
    [ApiController]
    [Route("/api/getUser")]
    public class getUserControl : ControllerBase
    {       
        
      // POST api/async
	    [AllowAnonymous]
		[HttpPost]
		public async Task<IActionResult> Post([FromBody] getUser body)
		{
			using (var db = new AppDb())
			{
				await db.Connection.OpenAsync();
				body.Db = db;
				await body.GetUserAsync();
				return new OkObjectResult(body.respuesta);
			}
		}
      
    }
}
