using Google.Analytics.Data.V1Beta;
using Microsoft.Extensions.Configuration;
using MiYou.API.Models.Admin.Analytics;
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

        public async Task<AnalyticsResponse> GetAnalytics()
        {
            string propertyId = "496562096";

            var credentialsJson = _configuration["GoogleAnalytics:Credentials"];
            if (string.IsNullOrEmpty(credentialsJson))
                throw new InvalidOperationException("Google Analytics credentials not configured.");

            var credentialStream = new MemoryStream(Encoding.UTF8.GetBytes(credentialsJson));

            var client = new BetaAnalyticsDataClientBuilder
            {
                Credential = Google.Apis.Auth.OAuth2.GoogleCredential.FromStream(credentialStream)
            }.Build();

            var reportRequest = new RunReportRequest
            {
                Property = $"properties/{propertyId}",
                Dimensions =
                {
                    new Dimension { Name = "country" },
                    new Dimension { Name = "browser" },
                    new Dimension { Name = "pagePath" }
                },
                Metrics =
                {
                    new Metric { Name = "totalUsers" },
                    new Metric { Name = "sessions" },
                    new Metric { Name = "screenPageViews" },
                    new Metric { Name = "bounceRate" },
                    new Metric { Name = "activeUsers" }
                },
                DateRanges = { new DateRange { StartDate = "2025-07-01", EndDate = "today" } },
            };

            var reportResponse = await client.RunReportAsync(reportRequest);

            var reportResult = new List<Dictionary<string, string>>();
            foreach (var row in reportResponse.Rows)
            {
                var rowDict = new Dictionary<string, string>();

                for (int i = 0; i < reportResponse.DimensionHeaders.Count; i++)
                    rowDict[reportResponse.DimensionHeaders[i].Name] = row.DimensionValues[i].Value;

                for (int i = 0; i < reportResponse.MetricHeaders.Count; i++)
                {
                    string metricName = reportResponse.MetricHeaders[i].Name;
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

                reportResult.Add(rowDict);
            }

            var realtimeRequest = new RunRealtimeReportRequest
            {
                Property = $"properties/{propertyId}",
                Metrics =
                {
                    new Metric { Name = "activeUsers" }
                }
            };

            var realtimeResponse = await client.RunRealtimeReportAsync(realtimeRequest);
            int realtimeActiveUsers = 0;
            if (realtimeResponse.Rows.Count > 0 && realtimeResponse.Rows[0].MetricValues.Count > 0)
            {
                int.TryParse(realtimeResponse.Rows[0].MetricValues[0].Value, out realtimeActiveUsers);
            }

            // ja ik heb nagedacht over een mapper maar ik zou echt geen idee hebben
            // wat mijn ModelIn dan wordt haha
            // Als je ideeën lmk :)

            return new AnalyticsResponse
            {
                ReportData = reportResult,
                RealtimeActiveUsers = realtimeActiveUsers
            };
        }
    }
}