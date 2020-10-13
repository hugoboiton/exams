CREATE DEFINER=`root`@`%` PROCEDURE `set_usuario`(
in in_nombre varchar(50),
in in_apellido varchar (50),
in in_usuario varchar (50),
in in_clave varchar (10)
)
BEGIN
declare resultado text;
declare exit handler for sqlexception
    begin
		set resultado='error';
		select resultado;
	end;
#commit;
start transaction;
insert into Usuario (Nombre,Apellido,Usuario,Clave)
values(in_nombre,in_apellido,in_usuario,in_clave);
set resultado= 'ok';
select resultado;
commit;
END