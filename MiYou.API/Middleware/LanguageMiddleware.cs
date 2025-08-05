using System.Globalization;

namespace MiYou.API.Middleware
{
    public class LanguageMiddleware
    {
        private readonly RequestDelegate _next;

        public LanguageMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            // Haal de 'Accept-Language' header op
            var acceptLanguage = context.Request.Headers["Accept-Language"].ToString();

            if (!string.IsNullOrWhiteSpace(acceptLanguage))
            {
                try
                {
                    // Pak de eerste taal uit de header
                    var firstLang = acceptLanguage.Split(',')[0];

                    // Zet de cultuur en UI cultuur
                    var culture = new CultureInfo(firstLang);
                    CultureInfo.CurrentCulture = culture;
                    CultureInfo.CurrentUICulture = culture;
                }
                catch (CultureNotFoundException)
                {
                    // Fallback als cultuur niet gevonden wordt
                    // Optioneel: zet default taal hier, bv "nl-NL"
                    var defaultCulture = new CultureInfo("nl-NL");
                    CultureInfo.CurrentCulture = defaultCulture;
                    CultureInfo.CurrentUICulture = defaultCulture;
                }
            }
            else
            {
                // Geen taal header? Default taal instellen
                var defaultCulture = new CultureInfo("nl-NL");
                CultureInfo.CurrentCulture = defaultCulture;
                CultureInfo.CurrentUICulture = defaultCulture;
            }

            // Ga verder in de pipeline
            await _next(context);
        }
    }
}
