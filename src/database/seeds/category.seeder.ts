import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { Category } from '../../entity/Category';

export default class CategorySeeder implements Seeder {
  public async run(
    dataSource: DataSource,
  ): Promise<any> {
    const repository = dataSource.getRepository(Category);

    const categoriesData = [
      { name: 'restaurants' },
      { name: 'drinks' },
      { name: 'activities' },
      { name: 'other' }
    ];

    // Check if categories already exist, insert only if not.
    for (const categoryData of categoriesData) {
      const category = await repository.findOne({ where: { name: categoryData.name } });
      if (!category) {
        await repository.insert(categoryData);
      }
    }
  }
}
