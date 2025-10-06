import { Logger } from '@nestjs/common';
import {requestContext} from "./middlewares/request-logger.middleware";

export class AppLogger extends Logger {
    constructor(private readonly contextName: string) {
        super(contextName);
    }

    private getRequestId() {
        return requestContext.getStore()?.requestId ?? 'no-req';
    }

    private formatMessage(message: string) {
        const timestamp = new Date().toISOString();
        const reqId = this.getRequestId();
        return `[${timestamp}] [req:${reqId}]  ${message}`;
    }

    log(message: string): void {
        super.log(this.formatMessage(message));
    }

    error(message: string, trace?: string): void {
        super.error(this.formatMessage(message), trace);
    }

    warn(message: string): void {
        super.warn(this.formatMessage(message));
    }

    debug(message: string): void {
        super.debug(this.formatMessage(message));
    }

    verbose(message: string): void {
        super.verbose(this.formatMessage(message));
    }
}
