create schema game

-- USERS
-- secuence
CREATE SEQUENCE game.users_id_seq
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 9223372036854775807
    CACHE 1;

-- auto-generated users
create table game.users
(
    user_id   bigint default nextval('game.users_id_seq'::regclass) not null
        constraint users_id_pkey
            primary key,
    name       text,        
    email       text,
    phone       text,
    password    text,
    role        smallint, -- 1: admin && 0: player 
    description varchar(500),
    status       smallint default 0,
    token_last_session text,
    created_at  timestamp default current_timestamp,
    updated_at  timestamp default current_timestamp
);


SELECT * FROM  game.users


-- CODE_SMS_SESSIONS
-- secuence
CREATE SEQUENCE game.code_sms_id_seq
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 9223372036854775807
    CACHE 1;

-- auto-generated users
create table game.code_sms_sessions
(
    code_sms_id   bigint default nextval('game.code_sms_id_seq'::regclass) not null
        constraint code_sms_id_pkey
            primary key,
    code       text,        
    user_id       bigint,
    expiration_time    timestamp,
    created_at  timestamp default current_timestamp
);


SELECT * FROM  game.users

SELECT * FROM  game.code_sms_sessions



game.activation_code (
        user_id,
        code,
        status,
        created_at,
        updated_at




-- ACTIVATION CODE
-- secuence
CREATE SEQUENCE game.activation_code_id_seq
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 9223372036854775807
    CACHE 1;

-- auto-generated users
create table game.activation_code
(
    activation_code_id   bigint default nextval('game.activation_code_id_seq'::regclass) not null
        constraint activation_code_id_pkey
            primary key,
    code       text,        
    user_id     bigint,
    status smallint,
    expiration_time    timestamp,
    created_at  timestamp default current_timestamp,
        updated_at  timestamp default current_timestamp
);
