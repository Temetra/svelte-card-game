Object.defineProperty(window, "AudioContext", {
	writable: true,
	value: jest.fn().mockImplementation(() => {
		return {}
	})
});

export {}