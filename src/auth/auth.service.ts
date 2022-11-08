import { Injectable } from '@nestjs/common';
import { compareSync } from 'bcrypt';
import { UserService } from 'src/modules/user/user.service';
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private readonly jwtService: JwtService
    ) { }

  async signIn(user: any) {
    const payload = {
      sub: user.id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
    };

    return {
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        avatar: user.avatar
      },
      token: this.jwtService.sign(payload),
    };
  }

  async validate(email: string, password: string) {
    try {
      const user = await this.userService.findByEmail(email);
      if (!user) return null;
      
      const passwordsMatch = compareSync(password, user.password);

      if (!passwordsMatch) return null;

      return user;
    } catch (error) {
      return null
    }
  }
}
