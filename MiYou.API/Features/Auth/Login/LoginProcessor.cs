using MiYou.API.Models.Auth.Login;
using MiYou.API.Services.Auth;
using MiYou.DAL;
using MiYou.DAL.ContextFactory;
using MiYou.DAL.Entities.Users;
using MiYou.Shared.Exceptions;
using MiYou.Shared.Interfaces;
using MiYou.Shared.Resources;

using LoginRequest = MiYou.API.Models.Auth.Login.LoginRequest;

namespace MiYou.API.Features.Auth.Login
{
    public class LoginProcessor : IProcessor<LoginRequest, LoginResponse>
    {
        private readonly IContextFactory _contextFactory;
        private readonly IMapper<User, LoginResponse> _loginMapper;
        private readonly AuthService _authService;

        public LoginProcessor(IContextFactory contextFactory,
            IMapper<User, LoginResponse> loginMapper,
            AuthService authService)
        {
            _contextFactory = contextFactory;
            _loginMapper = loginMapper;
            _authService = authService;
        }

        public async Task<LoginResponse> ProcessAsync(LoginRequest request)
        {
            DatabaseContext context = _contextFactory.Create();

            User user = await _authService.ValidateAccountAsync(request);

            if (user == null)
            {
                throw new WrongCredentials(Resources.Error_Login_WrongCredentials);
            }

            await _authService.AddJwtAndCookies(user);

            return _loginMapper.Map(user);
        }
    }
}
