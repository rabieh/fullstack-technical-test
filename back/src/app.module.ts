import { Module } from '@nestjs/common';
import { CartModule } from './cart/cart.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [CartModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
