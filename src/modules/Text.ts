import en from "@/i18n/en.json";

// Very basic implementation to get ball rolling

const text = en;

export function geti18nText(path: string, source = text): string {
	return path.split(".").reduce(objectReducer, source);
}

// Returns a property in an object for the given key
// Used in a reducer to get a nested property for a period-delimited path
function objectReducer(obj: any, key: string): any {
	return obj ? obj[key] : undefined;
}