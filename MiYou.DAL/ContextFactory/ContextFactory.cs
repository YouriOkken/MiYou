using Microsoft.Extensions.DependencyInjection;

namespace MiYou.DAL.ContextFactory
{
    public sealed class ContextFactory : IContextFactory
    {
        private readonly IServiceProvider _serviceProvider;

        public ContextFactory(IServiceProvider serviceProvider)
        {
            _serviceProvider = serviceProvider;
        }

        public DatabaseContext Create()
        {
            return _serviceProvider.GetService<DatabaseContext>();
        }
    }
}