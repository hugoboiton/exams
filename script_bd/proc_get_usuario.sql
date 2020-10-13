CREATE DEFINER=`root`@`%` PROCEDURE `get_usuario`(
in in_usuario varchar(50),
in in_clave varchar(10)
)
BEGIN
declare resultado text;
declare userr varchar(50);
declare exit handler for sqlexception
    begin
		set resultado='error';
		select resultado;
	end;
 #commit;
 start transaction;
  select usu.Usuario into userr 
  from Usuario as usu 
  where usu.Usuario= in_usuario and usu.Clave=in_Clave;
  if userr != '' then
	set resultado=userr;
  else
	set resultado='error';
    
  end if;
  select resultado;
 rollback;
END