import { Module, DynamicModule, Global } from '@nestjs/common';
import { GoogleStrategy } from './google.strategy';
import { GoogleAuthOptions } from 'src/google-auth/google-auth.constants';

@Global()
@Module({})
export class GoogleAuthModule {
  static register(options: GoogleAuthOptions): DynamicModule {
    return {
      module: GoogleAuthModule,
      providers: [
        {
          provide: 'GOOGLE_AUTH_OPTIONS',
          useValue: options,
        },
        GoogleStrategy,
      ],
      exports: [GoogleStrategy],
    };
  }
}
