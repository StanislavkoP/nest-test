import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AdminRespository } from "./admin.respository";
import { createAdminDto, adminAuthCredentialDto } from "./admin.dto";
import { Admin } from "./admin.entity";

@Injectable()
export class AdminService {
    constructor(
        @InjectRepository(AdminRespository)
        private readonly adminRepository: AdminRespository
    ) {}

    async findOne(id: number) {
        const admin = await this.adminRepository.findOne(id);

        return admin;
    }

    async logIn(adminAuthCredentialDto: adminAuthCredentialDto) {
        const { email, password } = adminAuthCredentialDto;

        const admin = this.adminRepository.findOne({ where : {email, password}})

        return admin;
    }
}