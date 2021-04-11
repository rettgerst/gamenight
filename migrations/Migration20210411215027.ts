import { Migration } from '@mikro-orm/migrations';

export class Migration20210411215027 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "vote" ("id" serial primary key, "game_id" int4 not null, "sub_game_id" int4 not null, "user_id" varchar(255) not null, "time" varchar(255) not null);');
  }

}
