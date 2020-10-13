CREATE DEFINER=`root`@`%` PROCEDURE `del_documento`(
	in in_nombre_docume varchar(50),
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
if id is not null then 
	UPDATE Documento as doc
	SET fk_id_estado = 2 
    where doc.nombre_docume = in_nombre_docume and doc.fk_id_usuario= id;
	set resultado='ok';
    select resultado;
	else 
	set resultado='error no hay';
    select resultado;
end if;
rollback;
END