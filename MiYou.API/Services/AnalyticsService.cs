using Google.Analytics.Data.V1Beta;
using Microsoft.Extensions.Configuration;
using System.Globalization;
using System.Text;

namespace MiYou.API.Services
{
    public class AnalyticsService
    {
        private readonly IConfiguration _configuration;

        public AnalyticsService(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public async Task<List<Dictionary<string, string>>> GetAnalytics()
        {
            string propertyId = "496562096";

            // Haal credentials JSON op uit user secrets
            var credentialsJson = _configuration["GoogleAnalytics:Credentials"];
            if (string.IsNullOrEmpty(credentialsJson))
                throw new InvalidOperationException("Google Analytics credentials not configured.");

            var credentialStream = new MemoryStream(Encoding.UTF8.GetBytes(credentialsJson));

            var client = new BetaAnalyticsDataClientBuilder
            {
                Credential = Google.Apis.Auth.OAuth2.GoogleCredential.FromStream(credentialStream)
            }.Build();

            var request = new RunReportRequest
            {
                Property = $"properties/{propertyId}",
                Dimensions =
                {
                    new Dimension { Name = "country" },
                    new Dimension { Name = "city" },
                    new Dimension { Name = "browser" },
                    new Dimension { Name = "deviceCategory" },
                    new Dimension { Name = "language" },
                    new Dimension { Name = "pagePath" },
                    new Dimension { Name = "sessionSource" },
                    new Dimension { Name = "date" },
                    new Dimension { Name = "operatingSystem" }
                },
                Metrics =
                {
                    new Metric { Name = "totalUsers" },
                    new Metric { Name = "activeUsers" },
                    new Metric { Name = "newUsers" },
                    new Metric { Name = "sessions" },
                    new Metric { Name = "screenPageViews" },
                    new Metric { Name = "bounceRate" },
                    new Metric { Name = "averageSessionDuration" },
                    new Metric { Name = "engagedSessions" },
                    new Metric { Name = "engagementRate" },
                    new Metric { Name = "eventCount" }
                },
                DateRanges = { new DateRange { StartDate = "2025-07-01", EndDate = "today" } },
            };

            var response = await client.RunReportAsync(request);
            var result = new List<Dictionary<string, string>>();

            foreach (var row in response.Rows)
            {
                var rowDict = new Dictionary<string, string>();

                for (int i = 0; i < response.DimensionHeaders.Count; i++)
                    rowDict[response.DimensionHeaders[i].Name] = row.DimensionValues[i].Value;

                for (int i = 0; i < response.MetricHeaders.Count; i++)
                {
                    string metricName = response.MetricHeaders[i].Name;
                    string metricValue = row.MetricValues[i].Value;

                    if (metricName == "averageSessionDuration" &&
                        double.TryParse(metricValue, NumberStyles.Any, CultureInfo.InvariantCulture, out double seconds))
                    {
                        TimeSpan duration = TimeSpan.FromSeconds(seconds);
                        rowDict[metricName] = $"{(int)duration.TotalMinutes}m {duration.Seconds}s";
                    }
                    else
                    {
                        rowDict[metricName] = metricValue;
                    }
                }

                result.Add(rowDict);
            }

            return result;
        }
    }
}