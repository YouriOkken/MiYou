using Microsoft.AspNetCore.Mvc;
using MiYou.Shared.Interfaces;

namespace MiYou.API.Controllers
{
    public class BaseController : ControllerBase
    {
        private readonly IServiceProvider _serviceProvider;

        protected BaseController(IServiceProvider serviceProvider)
        {
            _serviceProvider = serviceProvider;
        }

        protected async Task<TResponse> LoadAsync<TRequest, TResponse>(TRequest request)
            where TRequest : class
            where TResponse : class
        {
            var loader = _serviceProvider.GetService<ILoader<TRequest, TResponse>>();
            return await loader.LoadAsync(request);
        }

        protected async Task<TResponse> LoadAsync<TResponse>()
                 where TResponse : class
        {
            var loader = _serviceProvider.GetService<ILoader<TResponse>>();

            return await loader.LoadAsync();
        }

        protected async Task<TResponse> ProcessAsync<TRequest, TResponse>(TRequest request)
            where TRequest : class
            where TResponse : class
        {
            var processor = _serviceProvider.GetService<IProcessor<TRequest, TResponse>>();
            return await processor.ProcessAsync(request);
        }

        protected async Task ProcessAsync<TRequest>(TRequest request)
            where TRequest : class
        {
            var processor = _serviceProvider.GetService<IProcessor<TRequest>>();
            await processor.ProcessAsync(request);
        }
    }
}

