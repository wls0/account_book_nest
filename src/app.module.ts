import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoginModule } from './login/login.module';
import { AccountsModule } from './accounts/accounts.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [LoginModule, AccountsModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
