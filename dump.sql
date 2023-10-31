-- Criando as tabelas

-- Tabela de professores

create table professores(
id serial primary key,
  primeiroNome text not null,
  segundoNome text not null,
  turmas text not null,
  materia text not null,
  email text unique, 
  senha text not null
  
);

-- Tabela de alunos

create table alunos(
id serial primary key,
  primeiroNome text not null,
  segundoNome text not null,
  turma text not null,
  email text unique, 
  senha text not null
  
);

-- Tabela sobre o comportamento do aluno

create table caderneta(
id serial primary key,
  comportamento text not null,
  media1 integer,
  media2 integer,
  media3 integer,
  media4 integer,
  materia text,
  observacao text,
  id_professor integer references professores(id),
  id_aluno integer references alunos(id)
  
);