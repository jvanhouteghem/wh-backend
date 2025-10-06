import { v4 as uuidv4 } from 'uuid';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { AsyncLocalStorage } from 'async_hooks';

export const requestContext = new AsyncLocalStorage<{ requestId: string }>();

@Injectable()
export class RequestIdMiddleware implements NestMiddleware {
    use(req: any, res: any, next: () => void) {
        const requestId = uuidv4().split('-')[0];
        requestContext.run({ requestId }, () => next());
    }
}
