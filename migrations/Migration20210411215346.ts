import { Migration } from '@mikro-orm/migrations';

export class Migration20210411215346 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "vote" drop constraint if exists "vote_sub_game_id_check";');
    this.addSql('alter table "vote" alter column "sub_game_id" type int4 using ("sub_game_id"::int4);');
    this.addSql('alter table "vote" alter column "sub_game_id" drop not null;');
  }

}
