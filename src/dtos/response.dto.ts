export class ResponseDTO<T> {
	constructor(
		public readonly status: boolean,
		public readonly data?: T
	) {}
}
