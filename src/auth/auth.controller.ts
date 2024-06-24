import { Controller, Get, HttpCode, HttpStatus, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthRequest } from './models/AuthRequest';
import { IsPublic } from './decorators/is-public.decorator';
import { ApiBody, ApiOperation } from '@nestjs/swagger';
import { LoginRequestBody } from './models/LoginRequestBody';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller()
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @ApiOperation({ summary: 'Login into the system' })
    @ApiBody({ type: LoginRequestBody })
    @IsPublic()
    @Post('login')
    @HttpCode(HttpStatus.OK)
    @UseGuards(LocalAuthGuard)
    login(@Request() req: AuthRequest) {
        return this.authService.login(req.user)
    }

    @Get('me')
    @UseGuards(JwtAuthGuard)
    getMe(@Request() req: AuthRequest) {
        return req.user;
  }
}
