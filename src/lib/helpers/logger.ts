import { createLogger, transports, format, Logger } from "winston";
import { DateTime } from 'luxon';

const logger: Logger =  createLogger({
	transports: [
		new transports.Console({
			format: format.combine(
				format.colorize(),
				format.timestamp({ format: 'YYYY-MM-DD hh:mm:ss.SS' }),
				format.printf(({ timestamp, level, message, service, data = {}, errors = {} }) => {
					let logMessage = `[${timestamp}] ${service} [${level}]: ${message}`;

					if(data) {
						logMessage += `
						data: ${JSON.stringify(data)}`;
					}

					if(errors) {
						logMessage += `
						errors: ${typeof errors === 'object' ? JSON.stringify(errors) : errors}`;
					}

					return logMessage;
				})
			),
		}),
		new transports.File({
			filename: `./logs/${DateTime.now().toFormat("yyyy-MM-dd-HH")}-log.log`,
			format: format.combine(
				format.timestamp({ format: 'YYYY-MM-DD hh:mm:ss.SS' }),
				format.printf(({ timestamp, level, message, service, data = {}, errors = {} }) => {
					let logMessage = `[${timestamp}] ${service} [${level}]: ${message}`;

					if(data) {
						logMessage += `
						data: ${JSON.stringify(data)}`;
					}

					if(errors) {
						logMessage += `
						errors: ${typeof errors === 'object' ? JSON.stringify(errors) : errors}`;
					}

					return logMessage;
				})
			)
		}),
	],
	defaultMeta: {
		service: 'GPT'
	}
});

export default logger;
