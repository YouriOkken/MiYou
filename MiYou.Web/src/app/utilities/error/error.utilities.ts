export function getErrorMessage(error: any): string {
    debugger;
    
    if (!error?.error?.message) {
        return "Er ging iets fout!";
    }

    if (error.error.message === "Failed to fetch") {
        return "Op dit moment kan er geen verbinding gemaakt worden met ons systeem.";
    }
    
    return error.error.message;
}