CREATE DEFINER=`root`@`%` PROCEDURE `set_documento`(
in in_nombre varchar(45),
in in_contenido varchar(5000),
in in_estado int,
in in_usuario varchar(50)
)
BEGIN
declare id int;
declare resultado text;
declare exit handler for sqlexception
    begin
		set resultado='error';
		select resultado;
	end;
start transaction;
commit;
select  id_usuario into id from Usuario as us where us.Usuario =in_usuario;
if id IS NOT NULL then 
	insert into Documento (nombre_docume,contenido,fk_id_usuario,fk_id_estado)
	values (in_nombre,in_contenido,id,in_estado);
    set resultado="ok";
    select resultado;
else 
	 set resultado="error no existe";
     select resultado;
end if;

rollback;
END