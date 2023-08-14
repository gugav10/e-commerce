import { Module } from '@nestjs/common';
import { LocationsService } from './locations.service';

@Module({
  providers: [LocationsService],
  exports: [LocationsService],
})
export class LocationsModule {}
