CREATE DEFINER=`root`@`%` PROCEDURE `get_documentos`(
in in_usuario varchar(50)
)
BEGIN
declare resultado text;
declare id int;
declare exit handler for sqlexception
    begin
		set resultado='error';
		select resultado;
	end;
start transaction;
commit;
select  id_usuario into id from Usuario as us where us.Usuario =in_usuario;
if id is not null then 
	select nombre_docume,contenido 
    from Documento as doc
    where doc.fK_id_usuario=id and doc.fk_id_estado=1;
else 
	set resultado="error no hay nada";
    select resultado;
end if;
rollback;
END