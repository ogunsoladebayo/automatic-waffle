import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CinemaSystem1663877813247 implements MigrationInterface {
  /**
   # ToDo: Create a migration that creates all tables for the following user stories

   For an example on how a UI for an api using this might look like, please try to book a show at https://in.bookmyshow.com/.
   To not introduce additional complexity, please consider only one cinema.

   Please list the tables that you would create including keys, foreign keys and attributes that are required by the user stories.

   ## User Stories

   **Movie exploration**
   * As a user I want to see which films can be watched and at what times
   * As a user I want to only see the shows which are not booked out

   **Show administration**
   * As a cinema owner I want to run different films at different times
   * As a cinema owner I want to run multiple films at the same time in different showrooms

   **Pricing**
   * As a cinema owner I want to get paid differently per show
   * As a cinema owner I want to give different seat types a percentage premium, for example 50 % more for vip seat

   **Seating**
   * As a user I want to book a seat
   * As a user I want to book a vip seat/couple seat/super vip/whatever
   * As a user I want to see which seats are still available
   * As a user I want to know where I'm sitting on my ticket
   * As a cinema owner I don't want to configure the seating for every show
   */
  name = "CinemaSystem1663877813247";
  public async up(queryRunner: QueryRunner): Promise<void> {
    /*    
    Movies
      id (Primary Key, Integer)
      title (String)
      description (String)
      duration (Integer)

    Shows
      id (Primary Key, Integer)
      movie_id (Foreign Key -> Movies.id)
      showroom_id (Foreign Key -> Showrooms.id)
      start_time (Datetime)
      end_time (Datetime)

    Showrooms
      id (Primary Key, Integer)
      name (String)

    Seat_Types
      id (Primary Key, Integer)
      name (String)
      premium_percentage (Float)

    Seats
      id (Primary Key, Integer)
      showroom_id (Foreign Key -> Showrooms.id)
      seat_type_id (Foreign Key -> Seat_Types.id)
      row_number (Integer)
      seat_number (Integer)

    Bookings
      id (Primary Key, Integer)
      show_id (Foreign Key -> Shows.id)
      seat_id (Foreign Key -> Seats.id)
      booking_time (Datetime)

    Prices
      id (Primary Key, Integer)
      show_id (Foreign Key -> Shows.id)
      seat_type_id (Foreign Key -> Seat_Types.id)
      price (Float)
    */

    await queryRunner.createTable(
      new Table({
        name: "movies",
        columns: [
          {
            name: "id",
            type: "integer",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          { name: "title", type: "varchar", length: "255" },
          { name: "description", type: "text" },
        ],
      })
    );

    await queryRunner.createTable(
      new Table({
        name: "showrooms",
        columns: [
          {
            name: "id",
            type: "integer",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          { name: "name", type: "varchar", length: "255" },
          { name: "capacity", type: "integer" },
        ],
      })
    );

    await queryRunner.createTable(
      new Table({
        name: "shows",
        columns: [
          {
            name: "id",
            type: "integer",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          { name: "movie_id", type: "integer" },
          { name: "showroom_id", type: "integer" },
          { name: "start_time", type: "datetime" },
          { name: "end_time", type: "datetime" },
          { name: "price", type: "integer" },
        ],
        foreignKeys: [
          {
            columnNames: ["movie_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "movies",
            onDelete: "CASCADE",
          },
          {
            columnNames: ["showroom_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "showrooms",
            onDelete: "CASCADE",
          },
        ],
      })
    );

    await queryRunner.createTable(
      new Table({
        name: "seats",
        columns: [
          {
            name: "id",
            type: "integer",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          { name: "show_id", type: "integer" },
          { name: "type", type: "varchar", length: "255" },
          { name: "row", type: "integer" },
          { name: "number", type: "integer" },
          { name: "is_booked", type: "boolean", default: false },
        ],
        foreignKeys: [
          {
            columnNames: ["show_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "shows",
            onDelete: "CASCADE",
          },
        ],
      })
    );

    await queryRunner.createTable(
      new Table({
        name: "seat_prices",
        columns: [
          {
            name: "id",
            type: "integer",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          { name: "show_id", type: "integer" },
          { name: "type", type: "varchar", length: "255" },
          { name: "percentage_premium", type: "integer" },
        ],
        foreignKeys: [
          {
            columnNames: ["show_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "shows",
            onDelete: "CASCADE",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
