import { checkResponse } from "@/modules/Fetching";

// Very basic implementation to get ball rolling

let text = {};

export async function prepareText(languageOverride: string = null) {
	// Get major language from override or client
	let lang = languageOverride || getLangFromClient();

	await fetch(`i18n/${lang}.json`)
		.then(checkResponse)
		.then(response => response.json())
		.then(json => text = json);
}

export function geti18nText(path: string, source = text): string {
	return path.split(".").reduce(objectReducer, source);
}

// Returns a property in an object for the given key
// Used in a reducer to get a nested property for a period-delimited path
function objectReducer(obj: any, key: string): any {
	return obj ? obj[key] : undefined;
}


// Default to en
function getLangFromClient(): string {
	return (typeof window !== 'undefined' && navigator.language) 
		? navigator.language.split("-")[0] 
		: "en";
}