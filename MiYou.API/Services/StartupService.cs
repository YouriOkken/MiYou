using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using MiYou.DAL;
using MiYou.DAL.ContextFactory;
using MiYou.DAL.Entities.Users;

namespace MiYou.API.Services
{
    public class StartupService
    {
        private readonly IContextFactory _contextFactory;

        public StartupService(IContextFactory contextFactory) 
        { 
            _contextFactory = contextFactory;
        }

        public async Task SetDevelopmentSettings()
        {
            using DatabaseContext context = _contextFactory.Create();
            var hasher = new PasswordHasher<object>();

            var adminEmail = "admin@admin.com";
            var adminPassword = "Password123!";

            var user = await context.Users.FirstOrDefaultAsync(u => u.Email == adminEmail);
            if (user == null)
            {
                var newUser = new User
                {
                    Email = adminEmail
                };

                newUser.Password = hasher.HashPassword(newUser, adminPassword);

                context.Users.Add(newUser);
                await context.SaveChangesAsync();
            }
        }
    }
}