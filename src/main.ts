import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

/**
 * Bootstrap function that initializes and configures the NestJS application
 * Sets up Swagger documentation, CORS, validation pipes, and starts the server
 */
async function bootstrap() {
  // Create the NestJS application instance
  const app = await NestFactory.create(AppModule);

  // Get the configuration service to access environment variables
  const config = app.get(ConfigService);

  // Set global API prefix from environment configuration (e.g., 'api/v1')
  const prefix = config.get('API_PREFIX') || '';

  if (prefix) {
    app.setGlobalPrefix(prefix);
  }

  // Configure Swagger/OpenAPI documentation
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Booking System API')
    .setDescription('Booking System API')
    .setVersion('1.0')
    .addOAuth2({
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      in: 'header'
    },
      'token'
    )
    .build();

  // Generate and setup Swagger documentation at /docs endpoint
  const document = SwaggerModule.createDocument(app, swaggerConfig);

  SwaggerModule.setup('docs', app, document);  // <-- UI ONLY (no JSON URL override)

  // ---- GLOBAL PREFIX ----
  const apiPrefix = config.get('API_PREFIX') ?? '';
  if (apiPrefix) app.setGlobalPrefix(apiPrefix);

  // ---- CORS FIX ----
  // app.enableCors({
  //   origin: [
  //     "http://127.0.0.1:5500",
  //     "http://localhost:3000",
  //     "http://localhost:4200",
  //     /\.vercel\.app$/,     // <-- Allows ALL your Vercel frontend domains
  //   ],
  //   methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  //   credentials: true,
  // });


  // Enable CORS for specified origin(s)
  app.enableCors({
    origin: [
      "http://127.0.0.1:5500",
      "http://localhost:3000",
      "http://localhost:4200",
      /\.vercel\.app$/,     // <-- Allows ALL your Vercel frontend domains
    ],
    credentials: true,   // allow Authorization header
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type, Accept, Authorization, X-Requested-With',
  });

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,              // Strip properties that don't have decorators
    forbidNonWhitelisted: true,   // Throw error if non-whitelisted properties are present
    transform: true,              // Automatically transform payloads to DTO instances
    forbidUnknownValues: true     // Throw error on unknown values
  }));

  // Start the server on the configured port or default to 3000
  await app.listen(config.get('PORT') ?? 3001);
}

bootstrap();
