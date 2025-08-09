using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using MiYou.DAL;
using MiYou.DAL.ContextFactory;
using MiYou.DAL.Entities.Users;
using MiYou.Shared.Exceptions;
using MiYou.Shared.Resources;

using LoginRequest = MiYou.API.Models.Auth.Login.LoginRequest;

namespace MiYou.API.Services.Auth
{
    public class AuthService
    {
        private readonly IContextFactory _contextFactory;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly JwtTokenService _jwtTokenService;

        public AuthService(IContextFactory contextFactory, IHttpContextAccessor httpContextAccessor, JwtTokenService jwtTokenService)
        {
            _contextFactory = contextFactory;
            _httpContextAccessor = httpContextAccessor;
            _jwtTokenService = jwtTokenService;
        }

        public async Task AddJwtAndCookies(User user)
        {
            using DatabaseContext context = _contextFactory.Create();

            var accessToken = await _jwtTokenService.GenerateAccessToken(user);
            var refreshToken = _jwtTokenService.GenerateRefreshToken();
            var refreshTokenExpiry = DateTimeOffset.UtcNow.AddDays(30);

            user.RefreshToken = refreshToken;
            user.RefreshTokenExpiryTime = refreshTokenExpiry;

            await UpdateAccountAsync(user, jwtOnly: true);

            var response = _httpContextAccessor.HttpContext?.Response;

            response?.Cookies.Delete("jwt");
            response?.Cookies.Delete("refreshToken");

            response?.Cookies.Append("jwt", accessToken, new CookieOptions
            {
                HttpOnly = true,
                Secure = true,
                SameSite = SameSiteMode.None,
                Expires = DateTimeOffset.UtcNow.AddHours(1),
                Path = "/",
                IsEssential = true,
            });

            response?.Cookies.Append("refreshToken", refreshToken, new CookieOptions
            {
                HttpOnly = true,
                Secure = true,
                SameSite = SameSiteMode.None,
                Expires = refreshTokenExpiry,
                Path = "/",
                IsEssential = true,
            });
        }

        public async Task<User> UpdateAccountAsync(User updatedUser, bool jwtOnly)
        {
            using DatabaseContext context = _contextFactory.Create();

            var user = await context.Users.FirstOrDefaultAsync(u => u.Id == updatedUser.Id);

            if (user == null)
            {
                return null;
            }

            user.RefreshToken = updatedUser.RefreshToken;
            user.RefreshTokenExpiryTime = updatedUser.RefreshTokenExpiryTime;

            if (!jwtOnly)
            {
                user.Email = updatedUser.Email;
            }

            var result = await context.SaveChangesAsync();
            if (result > 0)
            {
                return user;
            }

            return null;
        }

        /// <summary>
        /// Validates whether an account exists that matches the provided login credentials.
        /// </summary>
        /// <param name="request">The login request containing the user's input credentials.</param>
        /// <returns>Returns a <see cref="User"/> object if a matching account is found; otherwise, <see langword="null" /></returns>
        public async Task<User> ValidateAccountAsync(LoginRequest request)
        {
            //using DatabaseContext context = _contextFactory.Create();
            DatabaseContext context = _contextFactory.Create();

            var hasher = new PasswordHasher<object>();

            var user = await context.Users
                .AsNoTracking()
                .FirstOrDefaultAsync(u => u.Email == request.Email);

            if (user == null || string.IsNullOrEmpty(user.Password))
            {
                throw new WrongCredentials(Resources.Error_Login_WrongCredentials);
            }

            var result = hasher.VerifyHashedPassword(user, user.Password, request.Password);
            if (result == PasswordVerificationResult.Success)
            {
                return user;
            }
            else
            {
                throw new WrongCredentials(Resources.Error_Login_WrongCredentials);
            }
        }
    }
}
