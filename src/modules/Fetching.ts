export function waitFor<TParam>(ms: number, param?: TParam) : Promise<TParam> {
	return new Promise(resolve => setTimeout(() => resolve(param), ms));
}

export function checkResponse(response: Response) {
	if (!response.ok) throw { message:response.statusText, status:response.status };
	else return response;
}

interface FileSourceMap {
	[key: string]: string;
}

interface FileResultMap<T> {
	[key: string]: T;
}

interface ProcessResponseFunc<T> {
	(response: Response): PromiseLike<T>;
}

interface UpdateProgressFunc {
	(progress: number, total: number): void;
}

export function fetchFiles<TData>(
	files: FileSourceMap, 
	processResponse: ProcessResponseFunc<TData>, 
	updateProgress: UpdateProgressFunc = () => {}
): Promise<FileResultMap<TData>> {
	// Convert files to array of key/values
	let filesArr = Object.entries<string>(files);

	// Reset progress
	updateProgress(0, filesArr.length);
	let count = 0;

	// Create output dictionary
	let result: FileResultMap<TData> = {};

	// Create array of fetch requests
	const promises: PromiseLike<any>[] = [];

	// Iterate over files
	for (let [name, source] of filesArr) {
		// Request and process data, add to result
		let request = fetch(source)
			.then(checkResponse)
			.then(processResponse)
			.then(data => result[name] = data)
			.then(() => updateProgress(++count, filesArr.length));

		// Add to array of promises
		promises.push(request);
	}

	// Wait for loading to complete then return result
	return Promise.all(promises).then(() => result);
}