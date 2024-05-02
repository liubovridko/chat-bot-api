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
      email: 'admin@gmail.com',
      password: await hash('111111', 10),
      role: UserRole.ADMIN
    };

    const user = await repository.findOneBy({ email: data.email });

    // Insert only one record with this username.
    if (!user) {
      await repository.insert([data]);
    }


  }
}