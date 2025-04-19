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

export enum  PaymentMethod {
     COD = "COD",
     VNPAY = "VNPAY"
}

export enum PaymentFor {
     ORDER= "ORDER",
     BOOKING= "BOOKING"
};


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
// export type PaymentMethodType = (typeof PaymentMethod)[keyof typeof PaymentMethod];
// export type PaymentForType = (typeof PaymentFor)[keyof typeof PaymentFor];
export type TokenTypeValue = (typeof TokenType)[keyof typeof TokenType];
