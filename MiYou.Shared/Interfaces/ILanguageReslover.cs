using Microsoft.AspNetCore.Http;

namespace MiYou.Shared.Interfaces
{
    public interface ILanguageResolver
    {
        string GetCurrentLanguage();
    }

    public class LanguageResolver : ILanguageResolver
    {
        private readonly IHttpContextAccessor _accessor;
        private readonly string[] _supported = { "en", "nl" };
        private const string _default = "nl";

        public LanguageResolver(IHttpContextAccessor accessor)
        {
            _accessor = accessor;
        }

        public string GetCurrentLanguage()
        {
            var langHeader = _accessor.HttpContext?.Request?.Headers["Accept-Language"].ToString();

            if (string.IsNullOrWhiteSpace(langHeader))
                return _default;

            var langCode = langHeader.Split(',').FirstOrDefault()?.Split('-').FirstOrDefault();

            return _supported.Contains(langCode) ? langCode : _default;
        }
    }
}

