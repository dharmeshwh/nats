import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(
    @Inject('USER_SERVICE') private readonly client: ClientProxy,
    @Inject('EXAMPLE_QUEUE') private readonly exampleQueue: ClientProxy,
  ) {}

  @Post('create-user') // PUB/SUB mechanism example
  postData(@Body() body: any): string {
    this.client.emit('create_user', body);
    return 'user created';
  }

  @Post('sum') // Request - Response example
  getSum() {
    return this.client.send({ cmd: 'sum' }, [1, 2, 3, 5, 6]);
  }

  @Post('push-to-queue') // queue groups function example -> load balancing feature called distributed queues
  pushToQueue() {
    return this.exampleQueue.emit('notifications', [1, 2, 3, 5, 6]);
  }
}
