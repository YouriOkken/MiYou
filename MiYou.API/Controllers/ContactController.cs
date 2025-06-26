using Microsoft.AspNetCore.Mvc;
using MiYou.API.Models.Contact.Add;

namespace MiYou.API.Controllers
{
    [ApiController]
    [Route("contact")]
    public class ContactController : BaseController
    {
        public ContactController(IServiceProvider serviceProvider) : base(serviceProvider) { }

        [HttpPost("add")]
        public async Task<IActionResult> AddContact([FromBody] AddContactRequest request)
        {
            await ProcessAsync<AddContactRequest>(request);
            return Ok();
        }
    }
}
