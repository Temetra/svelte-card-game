interface ObjectComparer<T> {
	(first:T, second:T): boolean
}

export function compareArrays<T>(first: T[], second: T[], fn: ObjectComparer<T> = compareObjects) {
	return first.length == second.length 
		&& first.every((value, index) => fn(value, second[index]));
}

function compareObjects(first: any, second: any): boolean {
	return first === second;
}