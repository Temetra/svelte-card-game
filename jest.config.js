module.exports = {
	roots: [
		"<rootDir>/src"
	],
	testMatch: [
		"**/__tests__/**/*.+(spec|test).+(ts|tsx|js)"
	],
	transform: {
		"^.+\\.svelte$": ["svelte-jester", { "preprocess": true }],
		"^.+\\.(ts|tsx)$": "ts-jest",
	},
	moduleNameMapper: {
		'^@/(.*)$': '<rootDir>/src/$1',
	},
	moduleFileExtensions: [
		"js",
		"ts",
		"svelte",
	],
}