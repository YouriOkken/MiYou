using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MiYou.API.Models.Admin.Dashboard;

namespace MiYou.API.Controllers.Admin
{
    [Authorize]
    [ApiController]
    [Route("api/admin")]
    public class AdminController : BaseController
    {
        public AdminController(IServiceProvider serviceProvider) : base(serviceProvider) { }

        [HttpGet("getAccountInfo")]
        public async Task<AccountInfoResponse> GetAccountInfo()
        {
            return await LoadAsync<AccountInfoResponse>();
        }
    }
}