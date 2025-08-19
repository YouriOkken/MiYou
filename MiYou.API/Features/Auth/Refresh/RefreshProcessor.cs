using Microsoft.AspNetCore.Identity.Data;
using MiYou.API.Models.Auth.Login;
using MiYou.API.Services.Auth;
using MiYou.DAL.Entities.Users;
using MiYou.Shared.Interfaces;

namespace MiYou.API.Features.Auth.Refresh
{
    public class RefreshProcessor : IProcessor<RefreshRequest, LoginResponse>
    {
        private readonly AuthService _authService;
        private readonly IMapper<User, LoginResponse> _loginMapper;

        public RefreshProcessor(AuthService authService, IMapper<User, LoginResponse> loginMapper)
        {
            _authService = authService;
            _loginMapper = loginMapper;
        }

        public async Task<LoginResponse> ProcessAsync(RefreshRequest request)
        {
            var user = await _authService.GetUserOnRefreshToken(request.RefreshToken);
            if (user != null)
            {
                await _authService.AddJwtAndCookies(user);
                return _loginMapper.Map(user);
            }
            return null;
        }
    }
}
