namespace MiYou.Shared.Utilities
{
    public static class StringUtilities
    {
        public static string GetFullName(string firstName, string? middleName, string lastName)
        {
            if (!string.IsNullOrEmpty(middleName))
            {
                return $"{firstName} {middleName} {lastName}";
            }
            else
            {
                return $"{firstName} {lastName}";
            }
        }
    }
}
