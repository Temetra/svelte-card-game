import fs from "fs"; 
import path from "path"; 

global.fetch = jest.fn((input: RequestInfo, init?: RequestInit) =>
	Promise.resolve({
		ok: true, 
		blob: () => Promise.resolve(getBlob(input)), 
		json: () => Promise.resolve(getJson(input)),
		headers: null, 
		redirected: null, 
		status: null,
		statusText: null, 
		trailer: null, 
		type: null,
		url: null,
		clone: null, 
		body: null, 
		bodyUsed: null, 
		arrayBuffer: null,
		formData: null, 
		text: null,
	})
);

declare global {
	interface JSON {
		parse(text: Buffer, reviver?: (key: any, value: any) => any): any;
	}
}

function getBlob(input: RequestInfo) {
	let filename = path.resolve(process.cwd(), "public", input.toString());
	let data = fs.readFileSync(filename);
	let buffer = Buffer.from(data);
	let arraybuffer = Uint8Array.from(buffer).buffer;
	return new Blob([arraybuffer], { type:getMimeType(filename) });
}

function getJson(input: RequestInfo) {
	let filename = path.resolve(process.cwd(), "public", input.toString());
	return JSON.parse(fs.readFileSync(filename));
}

function getMimeType(uri: string) {
	let type: string;

	switch (path.extname(uri)) {
		case ".svg":
			type = "image/svg+xml";
			break;
		case ".mp3":
			type = "audio/mpeg";
			break;
		case ".json":
			type = "application/json";
			break;
		default:
			type = "application/octet-stream"
			break;
	}

	return type;
}

export {}