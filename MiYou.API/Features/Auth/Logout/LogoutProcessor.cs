using MiYou.API.Models.Auth;
using MiYou.API.Services.Auth;
using MiYou.DAL;
using MiYou.DAL.ContextFactory;
using MiYou.Shared.Interfaces;

namespace MiYou.API.Features.Auth.Logout
{
    public class LogoutProcessor : IProcessor<LogoutRequest>
    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly IContextFactory _contextFactory;
        private readonly AuthService _authService;

        public LogoutProcessor(IHttpContextAccessor httpContextAccessor, IContextFactory contextFactory, AuthService authService)
        {
            _httpContextAccessor = httpContextAccessor;
            _contextFactory = contextFactory;
            _authService = authService;
        }

        public async Task ProcessAsync(LogoutRequest request)
        {
            using DatabaseContext context = _contextFactory.Create();

            var userFromCookies = _httpContextAccessor.HttpContext?.User;
            var userId = userFromCookies.FindFirst("UserId")?.Value;

            var user = context.Users.FirstOrDefault(x => x.Id == int.Parse(userId));

            var response = _httpContextAccessor.HttpContext?.Response;

            response?.Cookies.Delete("jwt");
            response?.Cookies.Delete("refreshToken");
            _httpContextAccessor.HttpContext?.Response.Cookies.Delete("jwt");
            _httpContextAccessor.HttpContext?.Response.Cookies.Delete("refreshToken");
            //_httpContextAccessor.HttpContext?.Response.Cookies.Delete("jwt", new CookieOptions
            //{
            //    HttpOnly = true,
            //    Secure = true,
            //    SameSite = SameSiteMode.None,
            //    Path = "/",
            //    IsEssential = true
            //});

            //_httpContextAccessor.HttpContext?.Response.Cookies.Delete("refreshToken", new CookieOptions
            //{
            //    HttpOnly = true,
            //    Secure = true,
            //    SameSite = SameSiteMode.None,
            //    Path = "/",
            //    IsEssential = true
            //});

            user.RefreshToken = null;
            user.RefreshTokenExpiryTime = null;
            await _authService.UpdateAccountAsync(user, true);
        }
    }
}