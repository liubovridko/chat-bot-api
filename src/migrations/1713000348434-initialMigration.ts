import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class InitialMigration1713000348434 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Create table User
        await queryRunner.createTable(new Table({
            name: "user",
            columns: [
                {
                    name: "id",
                    type: "int",
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: "increment",
                },
                {
                    name: "firstName",
                    type: "varchar",
                    isNullable: true,
                },
                {
                    name: "lastName",
                    type: "varchar",
                    isNullable: true,
                },
                {
                    name: "email",
                    type: "varchar",
                },
                {
                    name: "password",
                    type: "varchar",
                },
                {
                    name: "role",
                    type: "varchar",
                    default: "'ghost'",
                },
            ],
        }), true);

        // Create table Hotel
        await queryRunner.createTable(new Table({
            name: "hotel",
            columns: [
                {
                    name: "id",
                    type: "int",
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: "increment",
                },
                {
                    name: "title",
                    type: "varchar",
                },
                {
                    name: "url",
                    type: "varchar",
                    isNullable: true,
                },
                {
                    name: "description",
                    type: "varchar",
                    isNullable: true,
                },
                {
                    name: "keywords",
                    type: "varchar",
                    isArray: true,
                    isNullable: true,
                },
                {
                    name: "price",
                    type: "int",
                    isNullable: true,
                },
                {
                    name: "chatBot_key",
                    type: "varchar",
                },
            ],
        }), true);

        // Create table Category
        await queryRunner.createTable(new Table({
            name: "category",
            columns: [
                {
                    name: "id",
                    type: "int",
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: "increment",
                },
                {
                    name: "name",
                    type: "varchar",
                },
            ],
        }), true);

        // Create table Business
        await queryRunner.createTable(new Table({
            name: "business",
            columns: [
                {
                    name: "id",
                    type: "int",
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: "increment",
                },
                {
                    name: "title",
                    type: "varchar",
                    isNullable: true,
                },
                {
                    name: "url",
                    type: "varchar",
                    isNullable: true,
                },
                {
                    name: "image",
                    type: "varchar",
                    isNullable: true,
                },
                {
                    name: "description",
                    type: "varchar",
                    isNullable: true,
                },
                {
                    name: "keywords",
                    type: "varchar",
                    isArray: true,
                    isNullable: true,
                },
                {
                    name: "price",
                    type: "int",
                    isNullable: true,
                },
                {
                    name: "categoryId",
                    type: "int",
                },
                {
                    name: "hotelId",
                    type: "int",
                },
            ],
        }), true);

        // Create table SearchQuery
        await queryRunner.createTable(new Table({
            name: "search_query",
            columns: [
                {
                    name: "id",
                    type: "int",
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: "increment",
                },
                {
                    name: "text",
                    type: "varchar",
                },
                {
                    name: "createdAt",
                    type: "timestamp",
                    default: "CURRENT_TIMESTAMP",
                },
                {
                    name: "hotelId",
                    type: "int",
                },
            ],
        }), true);

        // Add foreign keys
        await queryRunner.createForeignKey("business", new TableForeignKey({
            columnNames: ["categoryId"],
            referencedColumnNames: ["id"],
            referencedTableName: "category",
            onDelete: "CASCADE",
        }));

        await queryRunner.createForeignKey("business", new TableForeignKey({
            columnNames: ["hotelId"],
            referencedColumnNames: ["id"],
            referencedTableName: "hotel",
            onDelete: "CASCADE",
        }));

        await queryRunner.createForeignKey("search_query", new TableForeignKey({
            columnNames: ["hotelId"],
            referencedColumnNames: ["id"],
            referencedTableName: "hotel",
            onDelete: "CASCADE",
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Delete foreign keys
        const businessTable = await queryRunner.getTable("business");
        const businessCategoryForeignKey = businessTable.foreignKeys.find(fk => fk.columnNames.indexOf("categoryId") !== -1);
        const businessHotelForeignKey = businessTable.foreignKeys.find(fk => fk.columnNames.indexOf("hotelId") !== -1);
        
        const searchQueryTable = await queryRunner.getTable("search_query");
        const searchQueryHotelForeignKey = searchQueryTable.foreignKeys.find(fk => fk.columnNames.indexOf("hotelId") !== -1);

        if (businessCategoryForeignKey) {
            await queryRunner.dropForeignKey("business", businessCategoryForeignKey);
        }

        if (businessHotelForeignKey) {
            await queryRunner.dropForeignKey("business", businessHotelForeignKey);
        }

        if (searchQueryHotelForeignKey) {
            await queryRunner.dropForeignKey("search_query", searchQueryHotelForeignKey);
        }

        // Delete tables
        await queryRunner.dropTable("user");
        await queryRunner.dropTable("hotel");
        await queryRunner.dropTable("category");
        await queryRunner.dropTable("business");
        await queryRunner.dropTable("search_query");
    }
}
