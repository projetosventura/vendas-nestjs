import { MigrationInterface, QueryRunner } from 'typeorm';

export class createTableUser1675388649812 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
   await queryRunner.query(`
            CREATE TABLE public.users (
                id integer NOT NULL,
                name character varying NOT NULL,
                email  character varying NOT NULL,
                cpf  character varying NOT NULL,
                type_user int NOT NULL,
                phone  character varying NOT NULL,
                password  character varying NOT NULL,
                created_at timestamp without time zone DEFAULT now() NOT NULL,
                updated_at timestamp without time zone DEFAULT now() NOT NULL,
                primary key (id)
            );
            
            CREATE SEQUENCE public.users_id_seq
                AS integer
                START WITH 1
                INCREMENT BY 1
                NO MINVALUE
                NO MAXVALUE
                CACHE 1;
                
            ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;
            
            ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            drop table public.users;
        `);
  }
}