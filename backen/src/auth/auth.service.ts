import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  // 🔥 ĐĂNG KÝ
  async register(username: string, password: string) {
    console.log("REGISTER:", username, password); // debug

    return this.usersService.create({
      username,
      password,
    });
  }

  // 🔥 ĐĂNG NHẬP
  async signIn(
    username: string,
    pass: string,
  ): Promise<{ access_token: string }> {
    const user = await this.usersService.findOne(username);

    if (!user) {
      throw new UnauthorizedException("Không tìm thấy user");
    }

    if (user.password !== pass) {
      throw new UnauthorizedException("Sai mật khẩu");
    }

    const payload = {
      sub: user.userId,
      username: user.username,
    };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}