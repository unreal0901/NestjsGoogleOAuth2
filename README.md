
---

# Nest Auth Google

A NestJS module for integrating Google OAuth2 authentication into your applications. This library provides a customizable and reusable solution for handling user authentication via Google.

## Features

- Easy integration with NestJS applications.
- Configurable options for Google OAuth2.
- User profile retrieval upon successful authentication.

## Installation

```bash
npm install nestauthgoogle
```

## Usage

### 1. Register the Module

Import the module and register it in your application:

```typescript
import { Module } from '@nestjs/common';
import { GoogleAuthModule } from 'nestauthgoogle';
import { AuthController } from './auth.controller';

@Module({
  imports: [
    GoogleAuthModule.register({
      clientID: 'YOUR_CLIENT_ID',
      clientSecret: 'YOUR_CLIENT_SECRET',
      callbackURL: 'http://localhost:3000/auth/google/callback', // Ensure this matches the callback route
    }),
  ],
  controllers: [AuthController],
})
export class AppModule {}
```

### 2. Implement the Callback Route

Create a controller to handle the callback route and retrieve user data:

```typescript
import { Controller, Get, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req: Request) {
    // Initiates the Google authentication process
  }

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  googleAuthRedirect(@Req() req: Request, @Res() res: Response) {
    // User data is now available in req.user
    const userData = req.user; // Retrieved user profile data
    // Redirect or send user data back
    res.redirect('/'); // Redirect to your desired route after login
    // Or send user data as JSON
    // res.json(userData);
  }
}
```

### Callback URL

Make sure the `callbackURL` specified during module registration matches the route defined in your controller (`http://localhost:3000/auth/google/callback` in this example). This is where Google will redirect users after authentication, and where you can access their data.

## License

This project is licensed under the MIT License.

---
