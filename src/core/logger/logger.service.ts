import { ConsoleLogger, Injectable, LogLevel } from '@nestjs/common';

@Injectable()
export class LoggerService extends ConsoleLogger {
    constructor() {
        super('Application', {
            logLevels: ['log', 'error', 'warn', 'debug', 'verbose'],
        });
    }

    // Просто превращает аргументы в одну красивую строку JSON
    private format(level: LogLevel, message: unknown, context?: string) {
        return JSON.stringify({
            timestamp: new Date().toISOString(),
            level: level.toUpperCase(),
            context: context || this.context,
            message: message,
        });
    }

    log(message: unknown, context?: string) {
        console.log(this.format('log', message, context));
    }

    error(message: unknown, trace?: string, context?: string) {
        console.error(
            JSON.stringify({
                timestamp: new Date().toISOString(),
                level: 'ERROR',
                context: context || this.context,
                message: message,
                trace: trace,
            }),
        );
    }
    warn(message: any, context?: string) {
        console.warn(this.format('warn', message, context));
    }

    debug(message: any, context?: string) {
        console.debug(this.format('debug', message, context));
    }
}
