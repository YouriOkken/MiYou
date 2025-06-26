namespace MiYou.Shared.Interfaces
{
    public interface ILoader<in TRequest, TResponse>
            where TRequest : class
            where TResponse : class
    {
        Task<TResponse> LoadAsync(TRequest request);
    }
    public interface ILoader<TResponse>
    where TResponse : class
    {
        Task<TResponse> LoadAsync();
    }
}