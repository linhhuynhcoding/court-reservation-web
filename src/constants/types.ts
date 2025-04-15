export const Role = {
     Player: 'PLAYER',
     Coach: 'COACH',
     Manager: 'COURT_MANAGER',
     Admin: 'ADMIN',
     Guest: 'Guest'
} as const

export const RoleValues = [
     Role.Player,
     Role.Coach,
     Role.Manager,
     Role.Admin,
     Role.Guest
] as const

export const TokenType = {
     AccessToken: 'accessToken',
     RefreshToken: 'refreshToken'
} as const;


export interface TokenPayload {
     sub: string;
     role: RoleType;
     tokenType: TokenTypeValue;
     exp: number;
     iat: number;
}

export type RoleType = (typeof Role)[keyof typeof Role];
export type TokenTypeValue = (typeof TokenType)[keyof typeof TokenType];
