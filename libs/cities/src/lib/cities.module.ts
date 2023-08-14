import { Module } from '@nestjs/common';
import { CitiesService } from './cities.service';

@Module({
  providers: [CitiesService],
  exports: [CitiesService],
})
export class CitiesModule {}
