using System.Text.Json;

namespace MiYou.API.Extensions
{
    public static class JsonSerializationExtensions
    {
        public static void AddCamelCaseJsonSerialization(this IServiceCollection services)
        {
            services.ConfigureHttpJsonOptions(options =>
            {
                options.SerializerOptions.PropertyNamingPolicy = JsonNamingPolicy.CamelCase;
            });
        }
    }
}
