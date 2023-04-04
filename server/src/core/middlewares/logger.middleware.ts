import { NestMiddleware } from "@nestjs/common";


export default class LoggerMiddleware implements NestMiddleware {
    use(req: any, res: any, next: (error?: any) => void) {
        console.log("Start");
        next();
    }
}
