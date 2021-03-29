# IMPORTANTES

Iniciar sportyeah

## EN CMDS

1. mongod
2. cd "..\..\cygwin64\home\DELL E6430 ATG\proyectos\espana\sportyea\frontend"
   ionic serve
3. cd "..\..\cygwin64\home\DELL E6430 ATG\proyectos\espana\sportyea\jdvimage\src"
   nodemon app.ts
4. cd "..\..\cygwin64\home\DELL E6430 ATG\proyectos\espana\sportyea\backend\src"
   nodemon sportyeah.ts
5. cd "..\..\cygwin64\home\DELL E6430 ATG\proyectos\espana\sportyea\api-retos\src"
   nodemon challenge.ts

## EN CMD PARA GIT PULL PUSH ETC

1. eval "$(ssh-agent -s)"
2. ssh-add ~/.ssh/id_rsa_sportyeah.pub
3. ssh-add ~/.ssh/id_rsa_kecuki.pub
4. Conexión mongo 
`
mongo --host mongo-db.clidhjqvcjng.eu-west-3.docdb.amazonaws.com:27017 --username adminmongo --password <Insertesucontraseña>
`
5. Conexión server 
`
ssh ubuntu@35.180.14.40
`

## Importante

1. Siempre al finalizar la jornada hacer ionic build y ver los errores solucionarlos y merge master.
2. Consejo: cuando comiences no te distraigas con nada, convencete de seguir
   siempre y nunca detenerte, no quit, no pares cuando duela, para cuando
   termines.

## NOTAS DAVID ELIMINAR

1. Boton que permita volver en la estructura de club.
2. Agregar modal y crear que la imagen al principio sea un slider, recuerda que
   el slider tiene que crearse en el ionViewDidEnter
3. Mejorar modal de crear nodo.
4. Cambiar textos en placeholders en modal crear nodo.
5. Colocar validacion mensajes en modal crear y editar nodo.
6. Colocar 3 puntos suspensivos en substring de text.
7. Boton de crear patrocinadores y poder crear varios de estos en cada nodo de
   la estructura.
8. Opcion para vincular un perfil de sportyeah a un nodo.
9. Al vincular un nodo traer su trayectoria (premios y reconocimientos,
   experiencias y aptitudes)
10. Optimizar codigo de estructura.
