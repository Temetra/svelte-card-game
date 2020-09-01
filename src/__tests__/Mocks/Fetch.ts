import fs from "fs"; 
import path from "path"; 

global.fetch = jest.fn((input: RequestInfo, init?: RequestInit) =>
	Promise.resolve({
		ok: true, 
		blob: () => Promise.resolve(getBlob(input)), 
		json: null,
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

function getBlob(input: RequestInfo) {
	let filename = path.resolve(process.cwd(), "public", input.toString());
	let data = fs.readFileSync(filename);
	let buffer = Buffer.from(data);
	let arraybuffer = Uint8Array.from(buffer).buffer;
	return new Blob([arraybuffer], { type:getMimeType(filename) });
}

function getMimeType(path: string) {
	let type = "application/octet-stream";
	if (path.endsWith(".svg")) type = "image/svg+xml";
	else if (path.endsWith(".mp3")) type = "audio/mpeg";
	return type;
}

export {}