using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MiYou.API.Models.Admin.Dashboard;
using MiYou.API.Services;

namespace MiYou.API.Controllers.Admin
{
    [Authorize]
    [ApiController]
    [Route("api/admin")]
    public class AdminController : BaseController
    {
        private readonly AnalyticsService _analyticsService;

        public AdminController(IServiceProvider serviceProvider, AnalyticsService analyticsService) : base(serviceProvider) 
        {
            _analyticsService = analyticsService;
        }

        [HttpGet("getAccountInfo")]
        public async Task<AccountInfoResponse> GetAccountInfo()
        {
            return await LoadAsync<AccountInfoResponse>();
        }

        [HttpGet("analytics")]
        public async Task<IActionResult> GetAnalytics()
        {
            var analyticsData = await _analyticsService.GetAnalytics();
            return Ok(analyticsData);
        }
    }
}