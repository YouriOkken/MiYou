using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MiYou.API.Models.Auth;
using MiYou.API.Models.Auth.Login;
using MiYou.API.Models.Auth.Refresh;
using MiYou.API.Services.Auth;
using MiYou.Shared.Interfaces;

namespace MiYou.API.Controllers
{
    [ApiController]
    [Route("api/auth")]
    public class AuthController : BaseController
    {
        private readonly AuthService _authService;

        public AuthController(IServiceProvider serviceProvider, AuthService authService) : base(serviceProvider) 
        { 
            _authService = authService;
        }

        [Authorize]
        [HttpGet("getCurrentUser")]
        public async Task<LoginResponse> GetCurrentUser()
        {
            return await LoadAsync<LoginResponse>();
        }

        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<LoginResponse> Login([FromBody] LoginRequest request)
        {
            return await ProcessAsync<LoginRequest, LoginResponse>(request);
        }

        [HttpPost("refresh")]
        public async Task<LoginResponse> Refresh()
        {
            var refreshTokenFromCookies = Request.Cookies["refreshToken"];
            RefreshRequest request = new RefreshRequest
            {
                refreshToken = refreshTokenFromCookies
            };

            return await ProcessAsync<RefreshRequest, LoginResponse>(request);
        }
    }
}
