import { createLogger, transports, format, Logger } from "winston";
import { DateTime } from 'luxon';

const logger: Logger =  createLogger({
	transports: [
		new transports.Console({
			format: format.combine(
				format.colorize(),
				format.timestamp({ format: 'YYYY-MM-DD hh:mm:ss.SS' }),
				//@ts-expect-error The input is a destructured
				format.printf(createLoggerFormat)
			),
		}),
		new transports.File({
			filename: `./logs/${DateTime.now().toFormat("yyyy-MM-dd-HH")}-log.log`,
			format: format.combine(
				format.timestamp({ format: 'YYYY-MM-DD hh:mm:ss.SS' }),
				//@ts-expect-error The input is a destructured
				format.printf(createLoggerFormat)
			)
		}),
	],
	defaultMeta: {
		service: 'GPT'
	}
});

function createLoggerFormat({ timestamp, level, message, service, data = null, errors = null }: LoggerFields) {
	let logMessage = `[${timestamp}] ${service} [${level}]: ${message}`;

	if(data) {
		logMessage += `
						data: ${typeof data === 'object' ? JSON.stringify(data) : data}`;
	}

	if(errors) {
		logMessage += `
						errors: ${typeof errors === 'object' ? JSON.stringify(errors) : errors}`;
	}

	return logMessage;
}
type LoggerFields = {
	timestamp: string;
	level: string;
	message: string;
	service: string;
	data: any;
	errors: any;
}
export default logger;
