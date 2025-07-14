export function getErrorMessage(error: any): string {
    if (!error?.error?.message) {
        return "Er ging iets niet helemaal goed bij ons. Probeer het a.u.b later opnieuw";
    }

    if (error.error.message === "Failed to fetch") {
        return "Op dit moment kan er helaas geen verbinding gemaakt worden met ons systeem. Probeer het a.u.b later opnieuw";
    }
    
    return error.error.message;
}