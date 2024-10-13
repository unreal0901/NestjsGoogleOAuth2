
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

### 1. Set Up Passport

Before using the `GoogleAuthModule`, you need to install and configure Passport with the required strategies. First, install the necessary dependencies:

```bash
npm install @nestjs/passport passport passport-google-oauth20
```

### 2. Main Application Setup

In your `main.ts` file, you need to instantiate the Nest application and initialize Passport. Here’s how you can do that:

```typescript
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';
import * as passport from 'passport';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  
  // Enable global validation pipe if needed
  app.useGlobalPipes(new ValidationPipe());

  // Initialize Passport
  app.use(passport.initialize()); // Add this line to initialize Passport
  app.enableCors(); // Enable CORS if needed for your application
  // Additional middleware can be added here
  
  await app.listen(3000);
}
bootstrap();
```

### 3. Register the Module

Import the module and register it in your application:

```typescript
import { Module } from '@nestjs/common';
import { GoogleAuthModule } from 'nestauthgoogle';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'google' }), // Initialize Passport
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

### 4. Implement the Callback Route

Create a controller to handle the callback route and retrieve user data:

```typescript
import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
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
