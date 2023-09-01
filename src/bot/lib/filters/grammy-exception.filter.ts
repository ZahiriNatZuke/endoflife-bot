import { ArgumentsHost, Catch, ExceptionFilter, Logger } from '@nestjs/common';

@Catch()
export class GrammyExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(GrammyExceptionFilter.name);

  async catch(exception: Error, host: ArgumentsHost): Promise<void> {
    // const grammyHost = GrammyArgumentsHost.create(host);
    // const ctx = grammyHost.getContext<Context>();
    this.logger.error(exception.message);
  }
}
