import { Processor, WorkerHost, OnWorkerEvent } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { Logger } from '@common/logger/logger.service';
import { EmailJobData } from './queue.service';

@Processor('email')
export class EmailProcessor extends WorkerHost {
  constructor(private readonly logger: Logger) {
    super();
  }

  async process(job: Job<EmailJobData>): Promise<void> {
    this.logger.log(
      `Processing email job ${job.id}: ${job.data.subject}`,
      'EmailProcessor',
    );

    const { to, subject, template, data } = job.data;

    this.logger.log(
      `Sending email to ${to} with template ${template}`,
      'EmailProcessor',
    );

    await this.simulateEmailSending();

    this.logger.log(`Email sent successfully to ${to}`, 'EmailProcessor');
  }

  private async simulateEmailSending(): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, 100));
  }

  @OnWorkerEvent('completed')
  onCompleted(job: Job<EmailJobData>) {
    this.logger.log(`Email job ${job.id} completed`, 'EmailProcessor');
  }

  @OnWorkerEvent('failed')
  onFailed(job: Job<EmailJobData>, error: Error) {
    this.logger.error(
      `Email job ${job.id} failed: ${error.message}`,
      error.stack,
      'EmailProcessor',
    );
  }
}
