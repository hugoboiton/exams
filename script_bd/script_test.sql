use documentos;
/*creacion de catalogo*/
#insert into Estado(descripcion) values ('activo');
#insert into Estado(descripcion) values ('eliminado'); 
select * from Estado;

/*
*	proc manejo de usuario 
*
*
*/
# proc de crear usuario
call set_usuario('hugo','boiton','hb1oitsssssssson2355s5045','1234');
# proc de get usuario
call get_usuario('hboiton','1234'); 
select * from Usuario;
DELETE FROM Usuario as us
where us.usuario != 'hboiton';
/*
* proc manejo de documentos
*
*/
# proc create document
set @user1 ="hboi2ton";
call set_documento("archivo_22","dasfadsfsadafsd",1,@user1);
# proc get documents user 
set @user1 ="hboiton";
call get_documentos(@user1);
# proc delete document user 
call del_documento("archivo_2","hboiton");
select * from Documento;
delete from Documento
where id_docu != 0;