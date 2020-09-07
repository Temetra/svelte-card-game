interface ObjectComparer<T> {
	(first:T, second:T): number
}

export function compareArrays<T>(first: T[], second: T[], fn: ObjectComparer<T> = compareObjects) {
	return first.length == second.length 
		&& first.every((value, index) => fn(value, second[index]) == 0);
}

function compareObjects(first: any, second: any): number {
	return first === second 
		? 0 
		: first > second
			? 1
			: -1;
}