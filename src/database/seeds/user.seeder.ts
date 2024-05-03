import { hash } from 'bcrypt';
import { User, UserRole } from '../../entity/User';
import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';

export default class UserSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
  ): Promise<any> {
    const repository = dataSource.getRepository(User);

    const data = {
      firstName: 'admin',
      lastName: 'admin',
      email: process.env.ADMIN_LOGIN,
      password: await hash(process.env.ADMIN_PASS, JSON.parse(process.env.SALT)),
      role: UserRole.ADMIN
    };

    const user = await repository.findOneBy({ email: data.email });

    // Insert only one record with this username.
    if (!user) {
      await repository.insert([data]);
    }


  }
}