namespace MiYou.Shared.Utilities
{
    public static class EmailTemplates
    {
        public static string BillTemplate(string customerName, string invoiceNumber, DateTime invoiceDate, decimal amountExclVat, decimal vatRate)
        {
            decimal vatAmount = amountExclVat * vatRate / 100;
            decimal totalAmount = amountExclVat + vatAmount;

            return $@"
        <html>
        <body>
            <p>Beste {customerName},</p>
            <p>Hierbij ontvangt u de factuur <strong>{invoiceNumber}</strong> van <strong>Bedrijfsnaam</strong> gedateerd op {invoiceDate:dd-MM-yyyy}.</p>

            <table border='1' cellpadding='5' cellspacing='0' style='border-collapse:collapse;'>
                <tr>
                    <th>Omschrijving</th><th>Aantal</th><th>Prijs per stuk</th><th>Totaal excl. btw</th>
                </tr>
                <tr>
                    <td>Softwarelicentie XYZ</td><td>1</td><td>€ {amountExclVat:F2}</td><td>€ {amountExclVat:F2}</td>
                </tr>
            </table>

            <p><strong>Totaal excl. btw:</strong> € {amountExclVat:F2}<br/>
               <strong>Btw ({vatRate}%):</strong> € {vatAmount:F2}<br/>
               <strong>Totaal incl. btw:</strong> € {totalAmount:F2}</p>

            <p>Betalingsvoorwaarden: binnen 30 dagen na factuurdatum.</p>

            <p>Met vriendelijke groet,<br/>
            Bedrijfsnaam</p>
        </body>
        </html>";
        }
        public static string ContractTemplate(string firstName, string lastName)
        {
            return @"
            Softwareleveringsovereenkomst
            
            Partijen
            
            - MiYou, gevestigd te {LeverancierAdres}, ingeschreven bij de Kamer van Koophandel onder nummer {KvKNummer}, hierna te noemen ""Leverancier"".
            
            - {KlantNaam}, gevestigd te {KlantAdres}, hierna te noemen ""Klant"".
            
            1. Dienstverlening
            
            Leverancier zal op maat gemaakte software ontwikkelen voor Klant zoals overeengekomen in deze overeenkomst. De exacte specificaties worden in overleg nader vastgesteld.
            
            2. Prijs en betaling
            
            De prijs is gebaseerd op {Manuren} manuren tegen €{Uurtarief} per uur, totaal €{TotaalExclBtw} exclusief btw. Het totaalbedrag inclusief 21% btw bedraagt €{TotaalInclBtw}.
            
            Daarnaast worden administratiekosten van €{AdministratiekostenExclBtw} in rekening gebracht, exclusief btw. Inclusief btw bedraagt dit €{AdministratiekostenInclBtw}.
            
            Het totale factuurbedrag is dus €{TotaalInclBtw} + €{AdministratiekostenInclBtw} = €{TotaalFactuurbedrag}.
            
            Betaling dient te geschieden binnen 30 dagen na factuurdatum op rekeningnummer {IBAN}.
            
            3. Levering
            
            De Leverancier zal starten met de werkzaamheden na ondertekening van deze overeenkomst. Een exacte leveringsdatum wordt in gezamenlijk overleg vastgesteld.
            
            4. Intellectuele eigendomsrechten
            
            De Leverancier behoudt alle rechten op de software gedurende de ontwikkeling. Na volledige betaling van de factuur draagt Leverancier alle intellectuele eigendomsrechten over aan Klant. Klant wordt vanaf dat moment de volledige eigenaar van de software.
            
            5. Geheimhouding
            
            Partijen komen overeen dat er geen geheimhouding van toepassing is; alle informatie mag gedeeld worden.
            
            6. Aansprakelijkheid
            
            De aansprakelijkheid van Leverancier is beperkt tot het bedrag van de factuur.
            
            7. Duur en beëindiging
            
            Deze overeenkomst gaat in op de datum van ondertekening en blijft van kracht tot alle verplichtingen zijn nagekomen.
            
            8. Toepasselijk recht en geschillen
            
            Op deze overeenkomst is Nederlands recht van toepassing. Geschillen worden voorgelegd aan de bevoegde rechter in het arrondissement waar Leverancier is gevestigd.
            
            9. Ondertekening
            
            Plaats: {Plaats}  
            Datum: {Datum}
            
            _________________________  
            {LeverancierNaam}  
            MiYou
            
            _________________________  
            {KlantNaam}  
            Handtekening
            ";
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

        public static string ContactConfirmationTemplate(string name)
        {
            string currentYear = DateTime.Now.Year.ToString();

            return $@"
<!DOCTYPE html>
<html lang=""nl"">
<head>
  <meta charset=""UTF-8"">
  <meta name=""viewport"" content=""width=device-width, initial-scale=1"">
  <title>Bedankt voor uw bericht</title>
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
    <h1>We hebben uw bericht ontvangen</h1>
    <p>Hallo {name},</p>
    <p>Bedankt voor uw bericht via ons contactformulier. Wij nemen zo snel mogelijk contact met u op.</p>
    <p>Tot aan de rand van het universum - of gewoon uw inbox 😉!</p>
    <p>MiYou</p>

    <div class=""footer"">
      &copy; {currentYear} MiYou - Alle rechten voorbehouden.
    </div>
  </div>
</body>
</html>";
        }
    }
}