namespace MiYou.Shared.Utilities
{
    public static class EmailTemplates
    {
        public static string ContactConfirmationTemplate(string name)
        {
            int beginYear = 2025;
            string currentYear = DateTime.Now.Year.ToString();

            string title = Resources.Resources.Email_ContactConfirmation_Title;
            string greeting = string.Format(Resources.Resources.Email_ContactConfirmation_Greeting, name);
            string body = Resources.Resources.Email_ContactConfirmation_Body;
            string signoff = Resources.Resources.Email_ContactConfirmation_Signoff;
            string footer = string.Format(Resources.Resources.Email_ContactConfirmation_Footer, beginYear);

            return $@"
            <!DOCTYPE html>
            <html lang=""en"">
            <head>
                <meta charset=""UTF-8"">
                <meta name=""viewport"" content=""width=device-width, initial-scale=1"">
                <title>{title}</title>
                <style>
                    body {{
                        font-family: system-ui, sans-serif;
                        background-color: #f9f9f9;
                        color: #333;
                        padding: 30px;
                        margin: 0;
                    }}

                    .email-container {{
                        background-image: url('https://i.imgur.com/Q1gVLZb.png');
                        background-repeat: no-repeat;
                        background-size: cover;
                        background-attachment: fixed;
                        margin: 40px auto;
                        padding: 40px;
                        border: 1px solid #dddddd;
                        border-radius: 24px;
                        box-shadow: 0px 4px 20px rgba(0,0,0,0.1);
                        text-align: center;
                    }}

                    .logo {{
                        text-align: center;
                        margin-bottom: 30px;
                    }}

                    .logo img {{
                        max-height: 40px;
                    }}

                    h1 {{
                        color: white;
                        font-size: 22px;
                    }}

                    p {{
                        font-size: 16px;
                        line-height: 1.6;
                        color: white;
                    }}

                    .footer {{
                        margin-top: 30px;
                        font-size: 13px;
                        color: #ccc;
                        text-align: center;
                    }}
                </style>
            </head>
            <body>
                <div class=""email-container"">
                    <h1>{title}</h1>
                    <p>{greeting}</p>
                    <p>{body}</p>
                    <p>{signoff}</p>
                    <p>MiYou</p>

                    <div class=""footer"">
                        {footer}
                    </div>
                </div>
            </body>
            </html>";
        }

        public static string GenerateContactEmailHtml(string name, string companyName, string email, string idea, string? additionalInfo = null)
        {
            var html = $@"
<!DOCTYPE html>
<html lang='nl'>
<head>
    <meta charset='UTF-8'>
    <style>
        body {{
            font-family: Arial, sans-serif;
            background-color: #f9f9f9;
            color: #333;
            padding: 20px;
        }}
        .container {{
            background-color: #ffffff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
            max-width: 600px;
            margin: 0 auto;
        }}
        h2 {{
            color: #0066cc;
        }}
        .label {{
            font-weight: bold;
            margin-top: 15px;
        }}
        .value {{
            margin-bottom: 15px;
        }}
        .footer {{
            margin-top: 30px;
            font-size: 0.9em;
            color: #888;
        }}
    </style>
</head>
<body>
    <div class='container'>
        <h2>Nieuw contactverzoek</h2>
        <p><span class='label'>Naam:</span><br /><span class='value'>{name}</span></p>
        <p><span class='label'>Bedrijf:</span><br /><span class='value'>{companyName}</span></p>
        <p><span class='label'>E-mailadres:</span><br /><span class='value'>{email}</span></p>
        <p><span class='label'>Idee:</span><br /><span class='value'>{idea}</span></p>";

            if (!string.IsNullOrWhiteSpace(additionalInfo))
            {
                html += $@"<p><span class='label'>Extra toelichting:</span><br /><span class='value'>{additionalInfo}</span></p>";
            }

            html += @"<div class='footer'>Dit bericht is automatisch gegenereerd vanuit het contactformulier op miyou.nl</div>
    </div>
</body>
</html>";

            return html;
        }
    }
}