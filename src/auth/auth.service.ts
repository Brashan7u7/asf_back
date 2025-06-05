import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  private readonly secretKey = 'Clavemuuuysecreta';

  constructor(
    private jwtService: JwtService,
    private readonly usuarioService: UserService,
  ) {}

  async signIn(
    mail: string,
    password: string,
  ): Promise<{ access_token: string }> {
    const usuario = await this.usuarioService.findOneEmail(mail);
    if (!usuario) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const isPasswordValid = await bcrypt.compare(password, usuario.contrasena);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const payload = {
      sub: usuario.id,
      email: usuario.correo,
      role: usuario.rol ? 'admin' : 'user',
    };

    const access_token = await this.jwtService.signAsync(payload); // Aquí ya no usas secret

    return { access_token };
  }
}
