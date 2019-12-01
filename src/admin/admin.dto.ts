import { IsEmail, IsString, IsBoolean } from "class-validator";

export class deleteAdminDto {
    @IsBoolean()
    deleted: boolean;

}

export class createAdminDto extends deleteAdminDto {
    @IsEmail()
    firstName: string;

    @IsEmail()
    lastName: string;

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