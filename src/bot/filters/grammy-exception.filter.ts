import { Catch, ExceptionFilter, Logger } from '@nestjs/common';

@Catch()
export class GrammyExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(GrammyExceptionFilter.name);

  async catch(exception: Error): Promise<void> {
    this.logger.error(exception.message);
  }
}
