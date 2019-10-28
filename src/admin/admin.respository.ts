import { EntityRepository, Repository } from "typeorm";
import { Admin } from "./admin.entity";

@EntityRepository(Admin)
export class AdminRespository extends Repository<Admin> {

    // async findOne() {

    // }
}