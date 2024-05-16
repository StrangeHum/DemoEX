import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModule } from './users/user.module';
import { AuthModule } from './auth/auth.module';

import { OrdersModule } from './orders/orders.module';
import { ImageModule } from './image/image.module';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'StrangeHoney',
      database: 'violationsnodev', //violationsno
      autoLoadModels: true,
      synchronize: true,
      define: {
        timestamps: false,
      },

      // models: [UserAuthData, User],
    }),
    UsersModule,
    OrdersModule,
    AuthModule,
    ImageModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
