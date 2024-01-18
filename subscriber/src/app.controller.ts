import { Controller, Inject } from '@nestjs/common';
import {
  ClientProxy,
  Ctx,
  EventPattern,
  MessagePattern,
  NatsContext,
  Payload,
} from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(@Inject('microservice') private readonly client: ClientProxy) {}

  @EventPattern('create_user')
  handleCreateUser(@Payload() data: any, @Ctx() ctx: NatsContext) {
    console.log({ status: 'creating user!', data, ctx });
  }

  @MessagePattern({ cmd: 'sum' })
  accumulate(data: number[]): number {
    return (data || []).reduce((a, b) => a + b);
  }
}
