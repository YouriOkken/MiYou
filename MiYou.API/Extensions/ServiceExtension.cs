using MiYou.DAL.ContextFactory;
using System.Reflection;
using MiYou.Shared.Interfaces;
using MiYou.API.Services;
using MiYou.Shared.Utilities;
using System.Runtime.CompilerServices;

namespace MiYou.API.Extensions
{
    public static class ServiceExtension
    {
        public static void AddProcessorServices(this IServiceCollection services)
        {
            var assembly = Assembly.GetExecutingAssembly();
            var types = assembly.GetTypes()
                .Where(t => t.IsClass && !t.IsAbstract);

            var processorResponseTypes = types
                .SelectMany(t => t.GetInterfaces()
                .Where(i => i.IsGenericType && i.GetGenericTypeDefinition() == typeof(IProcessor<,>))
                .Select(i => new { Interface = i, Implementation = t }))
                .ToList();

            foreach (var type in processorResponseTypes)
            {
                services.AddTransient(type.Interface, type.Implementation);
            }

            var processorTypes = types
                .SelectMany(t => t.GetInterfaces()
                .Where(i => i.IsGenericType && i.GetGenericTypeDefinition() == typeof(IProcessor<>))
                .Select(i => new { Interface = i, Implementation = t }))
                .ToList();

            foreach (var type in processorTypes)
            {
                services.AddTransient(type.Interface, type.Implementation);
            }
        }

        public static void AddLoaderServices(this IServiceCollection services)
        {
            // Loaders zonder request
            var assembly = Assembly.GetExecutingAssembly();
            var types = assembly.GetTypes().Where(t => t.IsClass && !t.IsAbstract);

            var loaderTypes = types
                .SelectMany(t => t.GetInterfaces()
                    .Where(i => i.IsGenericType && i.GetGenericTypeDefinition() == typeof(ILoader<>))
                    .Select(i => new { Interface = i, Implementation = t }))
                .ToList();

            foreach (var type in loaderTypes)
            {
                services.AddTransient(type.Interface, type.Implementation);
            }

            // Loaders met request
            var loaderRequestTypes = types
                .SelectMany(t => t.GetInterfaces()
                    .Where(i => i.IsGenericType && i.GetGenericTypeDefinition() == typeof(ILoader<,>))
                    .Select(i => new { Interface = i, Implementation = t }))
                .ToList();

            foreach (var type in loaderRequestTypes)
            {
                services.AddTransient(type.Interface, type.Implementation);
            }
        }

        public static void AddMapperServices(this IServiceCollection services)
        {
            var assembly = Assembly.GetExecutingAssembly();

            var mapperTypes = assembly.GetTypes()
                .Where(t => t.IsClass && !t.IsAbstract)
                .SelectMany(t => t.GetInterfaces()
                    .Where(i => i.IsGenericType && i.GetGenericTypeDefinition() == typeof(IMapper<,>))
                    .Select(i => new { Interface = i, Implementation = t }))
                .ToList();

            foreach (var type in mapperTypes)
            {
                services.AddTransient(type.Interface, type.Implementation);
            }
        }

        public static void AddContextServices(this IServiceCollection services)
        {
            services.AddScoped<IContextFactory, ContextFactory>();
        }

        public static void AddCustomServices(this IServiceCollection services)
        {
        }
    }
}