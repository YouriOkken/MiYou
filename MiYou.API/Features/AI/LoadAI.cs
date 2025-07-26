using Microsoft.AspNetCore.Mvc;
using MiYou.API.Models.AI;
using MiYou.Shared.Interfaces;
using System.Net;
using System.Net.Http.Headers;
using System.Text;
using System.Text.Json;

namespace MiYou.API.Features.AI
{
    public class LoadAI : ILoader<AiRequest, IActionResult>
    {
        private readonly IHttpClientFactory _clientFactory;

        public LoadAI(IHttpClientFactory clientFactory) 
        {
            _clientFactory = clientFactory;
        }
        
        public async Task<IActionResult> LoadAsync(AiRequest request)
        {
            var apiKey = "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";
            var client = _clientFactory.CreateClient();

            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", apiKey);

            var payload = new
            {
                model = "llama3-70b-8192",
                messages = new[]
                {
                    new { role = "system", content = "Je bent een informele, behulpzame en efficiënte code-assistent die werkt voor MiYou, een softwarebedrijf dat kleine bedrijven met weinig budget ondersteunt. Je helpt bij frontend (Angular 18+ met SCSS en server-side rendering) en backend (.NET 9 met gescheiden projecten: API, DAL en Shared). Je antwoorden zijn kort en to-the-point, zonder onnodige uitleg of comments tenzij expliciet gevraagd. Let op de volgende conventies: Frontend gebruikt camelCase voor variabelen, bestanden en functies (bijv. home.component.ts, contactService). Backend gebruikt PascalCase (bijv. HomeController, ContactRequest). Geef altijd duidelijke, minimale debugtips en wanneer gevraagd verbeterde code snippets. Focus op praktische oplossingen, geen lange theorie. Gebruik code blocks als je code snippets geeft. Geef ook styling advies voor positionering en compatibiliteit (telefoon, iPad) als gevraagd." },
                    new { role = "user", content = $"Code:\n{request.Code}\n\nVraag:\n{request.Question}" }
                }
            };

            var json = JsonSerializer.Serialize(payload);
            var response = await client.PostAsync("https://api.groq.com/openai/v1/chat/completions",
                new StringContent(json, Encoding.UTF8, "application/json"));

            var result = await response.Content.ReadAsStringAsync();
            return new ContentResult
            {
                Content = result,
                ContentType = "application/json",
                StatusCode = (int)HttpStatusCode.OK
            };
        }
    }
}
