namespace MiYou.Shared.Interfaces
{
    public interface IProcessor<in TRequest, TResponse>
        where TRequest : class
        where TResponse : class
    {
        Task<TResponse> ProcessAsync(TRequest request);
    }

    public interface IProcessor<in TRequest>
        where TRequest : class
    {
        Task ProcessAsync(TRequest request);
    }
}
