export enum CardState {
	Hidden = 1 << 0,
	Focused = 1 << 1,
	Flipped = 1 << 2,
	Dealing = 1 << 3,
	Spinning = 1 << 4,
	Discarding = 1 << 5,
}