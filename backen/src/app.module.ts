import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    // 🔥 KẾT NỐI MYSQL
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',     // XAMPP mặc định
      password: '',         // XAMPP thường để trống
      database: 'auth_db',  // 👈 nhớ tạo trong phpMyAdmin
      autoLoadEntities: true,
      synchronize: true,    // 👈 tự tạo bảng (dev OK)
    }),

    AuthModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}