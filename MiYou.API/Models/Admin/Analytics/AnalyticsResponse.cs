namespace MiYou.API.Models.Admin.Analytics
{
    public class AnalyticsResponse
    {
        public List<Dictionary<string, string>> ReportData { get; set; }
        public int RealtimeActiveUsers { get; set; }
    }
}
