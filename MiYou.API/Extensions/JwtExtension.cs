using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using MiYou.Shared.Utilities;
using System.IdentityModel.Tokens.Jwt;
using System.Text;

namespace MiYou.API.Extensions
{
    public static class JwtExtension
    {
        public static void AddJwtAuthentication(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
                .AddJwtBearer(options =>
                {
                    options.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuer = true,
                        ValidateAudience = true,
                        ValidateLifetime = true,
                        ValidateIssuerSigningKey = true,
                        ValidIssuer = configuration["JwtSettings:Issuer"],
                        ValidAudience = configuration["JwtSettings:Audience"],
                        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["JwtSettings:Key"])),
                        ClockSkew = TimeSpan.FromMinutes(2),
                        NameClaimType = "name"
                    };

                    options.Events = new JwtBearerEvents
                    {
                        OnMessageReceived = context =>
                        {
                            var rawCookie = context.Request.Cookies.ContainsKey("jwt") ? context.Request.Cookies["jwt"] : null;
                            var rawAuth = context.Request.Headers["Authorization"].FirstOrDefault();

                            var logger = context.HttpContext.RequestServices
                                .GetRequiredService<ILoggerFactory>()
                                .CreateLogger("JwtAuth");

                            logger.LogInformation("Raw cookie jwt: '{cookie}'", rawCookie);
                            logger.LogInformation("Raw Authorization header: '{auth}'", rawAuth);

                            var cookieToken = context.Request.Cookies["jwt"]?.Trim('"');
                            var bearerToken = context.Request.Headers["Authorization"].FirstOrDefault();

                            var token = !string.IsNullOrWhiteSpace(cookieToken)
                                ? cookieToken
                                : bearerToken?.StartsWith("Bearer ") == true
                                    ? bearerToken["Bearer ".Length..]
                                    : null;

                            if (string.IsNullOrWhiteSpace(token))
                            {
                                return Task.CompletedTask;
                            }

                            var handler = new JwtSecurityTokenHandler();
                            if (!handler.CanReadToken(token))
                            {
                                return Task.CompletedTask;
                            }

                            context.Token = token;

                            return Task.CompletedTask;
                        },
                        OnTokenValidated = _ => Task.CompletedTask,
                        OnAuthenticationFailed = context =>
                        {
                            var logger = context.HttpContext.RequestServices
                                .GetRequiredService<ILoggerFactory>()
                                .CreateLogger("JwtAuth");
                            logger.LogError(context.Exception, "JWT authentication failed");
                            return Task.CompletedTask;
                        }
                    };
                });
        }
    }
}
