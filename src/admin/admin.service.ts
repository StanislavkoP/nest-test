import { Injectable } from "@nestjs/common";
import { Not } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { AdminRespository } from "./admin.respository";
import { createAdminDto, adminAuthCredentialDto, deleteAdminDto } from "./admin.dto";
import { Admin } from "./admin.entity";
import { plainToClass } from "class-transformer";

@Injectable()
export class AdminService {
    constructor(
        @InjectRepository(AdminRespository)
        private readonly adminRepository: AdminRespository
    ) {}

    async createUser(userData: createAdminDto) {
        const createdUser = plainToClass(Admin, userData);

        return await createdUser.save();
    }

    async updateUser(id: number, newData: createAdminDto | deleteAdminDto) {
        return await this.adminRepository.update(id, newData)
    }

    async deleteUser(id: number) {
        const user = await this.adminRepository.findOne(id);

        if (!user) return;

        if (user.deleted) {
            return await this.adminRepository.delete(id);

        } else {
            return await this.adminRepository.update(id, { deleted: true });
        }

    }

    async findOne(id: number) {
        const admin = await this.adminRepository.findOne(id);

        return admin;
    }

    async findAll(currentUserId) {
        const admins = await this.adminRepository.find({where: { id: Not(currentUserId) }});

        return admins;
    }

    async logIn(adminAuthCredentialDto: adminAuthCredentialDto) {
        const { email, password } = adminAuthCredentialDto;

        console.log(adminAuthCredentialDto)

        const admin = this.adminRepository.findOne({ where : { email, password }})

        return admin;
    }
}