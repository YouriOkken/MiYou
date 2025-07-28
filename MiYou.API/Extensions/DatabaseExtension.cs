using Microsoft.EntityFrameworkCore;
using MiYou.DAL;
using MiYou.DAL.ContextFactory;

namespace MiYou.API.Extensions
{
    public static class DatabaseExtension
    {
        public static void AddDatabaseContextFactoryConfiguration(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddDbContextFactory<DatabaseContext>(options =>
                options.UseSqlServer(configuration.GetConnectionString("DefaultConnection")));

            services.AddTransient<IContextFactory, ContextFactory>();
        }
    }
}