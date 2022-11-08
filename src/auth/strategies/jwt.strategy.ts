import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt } from "passport-jwt";
import { Strategy } from "passport-jwt";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: 'YXNkY2RrZnVlYmFzamJkYXNsa2ZmZHNoZ3BvamFzZGZqaWhhb2RpamZpYWJzZGZpam5zYWRrbA==',
        });
    }

    async validate(payload: any) {
        return { id: payload.sub, email: payload.email, roles: payload.roles, realEstate: payload.realEstate };
    }
}