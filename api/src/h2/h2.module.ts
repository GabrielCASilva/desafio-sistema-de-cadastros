import { Module } from '@nestjs/common';
import { H2Service } from './h2.service';

@Module({
  providers: [H2Service],
  exports: [H2Service],
})
export class H2Module {}