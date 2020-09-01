create schema game

-- CHAMPIONSHIP
-- secuence
CREATE SEQUENCE game.championship_id_seq
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 9223372036854775807
    CACHE 1;

-- auto-generated CHAMPIONSHIP
create table game.championships
(
    championship_id   bigint default nextval('game.championship_id_seq'::regclass) not null
        constraint championship_id_pkey
            primary key,
    user_id bigint,
    title       text,        
    teams_quantity      smallint,  
    award       text,              
    start_date       text,
    end_date       text,
    status       smallint default 0,
    created_at  timestamp default current_timestamp,
    updated_at  timestamp default current_timestamp
);


SELECT * FROM  game.championships