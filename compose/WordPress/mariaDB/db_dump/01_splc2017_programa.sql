use `splc2017`;

drop table if exists wp_talk;
drop table if exists wp_talk_group;
drop table if exists wp_slot;
drop table if exists wp_day;
drop table if exists wp_program;





create table if not exists wp_program(
id int not null auto_increment,
version int not null,
selected_version int not null,
state enum('draft','final') not null,
primary key(id)
);


create table if not exists wp_day(
id int not null auto_increment,
dayDetails varchar(50) not null,
isPre bool not null,
programRef int not null,
primary key(id),
foreign key(programRef) references wp_program(id) on update no action on delete cascade
);

create table if not exists wp_slot(
id int not null auto_increment,
time_start date not null,
time_end date not null,
dayRef int not null,
primary key(id),
foreign key(dayRef) references wp_day(id) on update no action on delete cascade
);

create table if not exists wp_talk_group(
id int not null auto_increment,
title varchar(50) not null,
chair varchar(50) not null,
url varchar(150),
room varchar(50),
slotReference int not null,
primary key(id),
foreign key(slotReference) references wp_slot(id) on update no action on delete cascade
);

create table if not exists wp_talk(
id int not null auto_increment,
timeEnd date not null,
title varchar(50) not null,
eventt varchar(150) not null,
code varchar(50) not null,
authors varchar(200) not null,
talkGReference int not null,
primary key(id),
foreign key(talkGReference) references wp_talk_group(id) on update no action on delete cascade
);