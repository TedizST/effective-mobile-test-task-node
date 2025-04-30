export class HttpException extends Error {
	public readonly code: number;
	constructor(code: number, message: string) {
		super(message);
		this.code = code;
	}

	public static NotFound(msg: string): HttpException {
		return new HttpException(400, msg);
	}

	public static BadRequest(msg: string): HttpException {
		return new HttpException(404, msg);
	}
}
