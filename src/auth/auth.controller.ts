import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/signIn.dto';
import { Public } from './public.decorator';
import { ApiTags, ApiBody, ApiOkResponse } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  @ApiBody({ type: SignInDto })
  @ApiOkResponse({ description: 'Usuario autenticado correctamente' })
  signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto.mail, signInDto.password);
  }
}
