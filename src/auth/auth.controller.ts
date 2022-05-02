import { Body, Param, Controller, Get, Post, Put, Delete, Injectable, ExecutionContext, NestInterceptor, CallHandler, NotFoundException, UseInterceptors, Res, HttpStatus, Redirect, Req } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('/user')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Get('/login')
    async getLoginPage(@Res() res) {
        res.redirect("/login");
    }

    @Get('/profile')
    async getProfilePage(@Req() request, @Res() res) {
        await this.authService.profile(request.cookies).then((userRecord) => {
            res.render('profile.html', {
                title: 'Профиль',
                userRecord: userRecord,
            });
        }).catch((err) => {
            res.redirect("/login");
        });
    }

    @Post('/login')
    async createBook(@Body() body: { name: string, email: string, password: string }, @Res() res) {
        await this.authService.login(body)
            .then(
                (sessionCookie) => {
                    res.cookie('session', sessionCookie);
                    res.json({status: 'success'});
                },
                (error) => {
                    console.error('error', error);
                    res.status(401).redirect('/login');
                }
            );
    }

    @Post('/signup')
    async updateBook(@Body() body: { name: string, email: string, password: string }, @Res() res) {
        const signup = await this.authService.signup(body);

        signup.then((userRecord) => {
            console.log('Successfully created new user:', userRecord.uid);
            res.redirect('/login');
        }).catch((error) => {
            console.log('Error creating new user:', error);
            res.redirect('/signup');
        });
    }

    @Post('/logout')
    async logout(@Param() id: string, @Res() res) {
        res.clearCookie("session");
        res.redirect("/login");
    }
}
