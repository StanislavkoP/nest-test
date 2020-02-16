import { Factory, Seeder } from 'typeorm-seeding'
import { Connection } from 'typeorm'
import { Admin } from '../src/admin/admin.entity';
 
export default class CreateUsers implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await connection
      .createQueryBuilder()
      .insert()
      .into(Admin)
      .values([{ firstName: 'Stanislav', lastName: 'Pastushenko', email: 'admin@gmail.com', password: 'admin', role: 'superadmin' }])
      .execute()
  }
}