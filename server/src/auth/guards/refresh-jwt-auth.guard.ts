import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
/**
 * Стратегия, проверяет соответствие токена.
 *
 * Встраивает в запрос данные, из токена
 *
 * Gредоставляет доступ по токену
 */
@Injectable()
export class RefreshJwtAuthGuard extends AuthGuard('jwt-refresh') {}
