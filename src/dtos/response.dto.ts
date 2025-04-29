export class ResponseDTO {
	constructor(
		public readonly status: boolean,
		public readonly data?: unknown
	) {}
}
