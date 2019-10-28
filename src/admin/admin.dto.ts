import { IsEmail, IsString } from "class-validator";

export class createAdminDto {
    @IsEmail()
    email: string;

    @IsString()
    password: string;

    @IsString()
    role: string;
}

export class adminAuthCredentialDto {
    @IsEmail()
    email: string;

    @IsString()
    password: string;
}