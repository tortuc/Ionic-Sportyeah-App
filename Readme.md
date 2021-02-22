# IMPORTANTES

Iniciar sportyeah
cd "..\..\cygwin64\home\DELL E6430 ATG\proyectos\espana\sportyea\frontend"
cd "..\..\cygwin64\home\DELL E6430 ATG\proyectos\espana\gitlab-sportyeha\jdvimage\src"
cd "..\..\cygwin64\home\DELL E6430 ATG\proyectos\espana\sportyea\backend\src"
mongod

1. eval "$(ssh-agent -s)"
2. ssh-add ~/.ssh/id_rsa_sportyeah.pub
3. ssh-add ~/.ssh/id_rsa_kecuki.pub

## TAREAS DESAFIOS 21-02-2021 12 HORAS DE TRABAJO

1. Resolver responsive de botones like comentarios y shared. cumplido.
2. Colocar fixed la caja de amigos y que recomienda desafios. cumplido.
3. La caja de amigos debe posibilitar la creacion de un reto. cumplido.
4. Opcion de colocar un reto publico o privado con un toggle. cumplido.
5. Que muestre 2 videos y los demas los vaya agregando con forme vaya bajando. cumplido.
6. Pausar video al darle click.
7. Comenzar video solo al posicionarse justo en su rango.
8. Smooth scroll, que se posicione en el video.
9. Colocar boton en responsive para abrir la sidebar.
10. Animacion boton aceptas el reto. cumplido.
11. Boton actualizar.
12. Corregir bugs de comentarios. cumplido.
13. Al pulsar al usuario o la fecha de creacion llevar a su perfil en el header.
14. Quitar titulo y descripcion del aceptar reto.

## TAREAS DESAFIOS 19-02-2021

1. Cambiar lo que se tiene actualmente en desafios por un layout similar al muro de publicaciones.
2. Colocar perfiles amigos arriba siempre visible.
3. Modificar boton aceptar reto para que de subir video de una vez.

## TAREAS 15-02-2021

1. Copiar la funcionalidad de likes y reacciones.
2. Desplegar de forma vertical.
3. Que guarde las reacciones.
4. Y permita ver que reaccione.
5. Eliminar las reacciones duplicadas.

## TAREAS 11-12-2020

1. Create component for see comments.
2. Create component for like and react.

## TAREAS 03-02-2021

1. Create component challenges.
2. Integrate API challenges.
3. Button create challenge.
4. Modal create challenge.
5. Modal create award.
6. Modal challenge friends.
7. Create if public or private.

## TAREAS 30-01-2021

-1- @davidvalor2 falta el banco de emojis en el chat.
-2- @davidvalor2 botón de eliminar en las experiencias y premios sin estilo.
-3- @davidvalor2 el botón de emojis esta mal posicionado al crear un comentario.
-4- @davidvalor2 al editar una publicación no funciona le banco de emojis.
-5- @davidvalor2 Las fechas de los premios y reconocimientos no son las colocadas.

## Tareas 29-01-2020

1- QA APLICATION:
CUENTAS:
1- d@v.com
2- david@asocia.com
3- davidvalor@patro.com
4- davidvalor@club.com
5- davidvalorwork@gmail.com

HISTORIAS:
1- Estoy aqui en Sportyeah para divertirme y descubrir cada vez mas el mundo del deporte.
2- Hola! Escribeme y conoceme, podremos hacer negocios juntos.
3- Patro la mejor marca de bebidas energizantes.
4- Club, el mejor club de futbol de todos los tiempos en busca de nuevos jugadores.
5- Hey, estoy aqui para hacer amigos escribeme!

1- Encuadre de imagen en banner change slider y products.
-2- Banco de emojis. - Revisando directiva mentions en busca de cambios. Efectivo habian cambios listo.

## Tareas 28-01-2020

-3- Terminar tema de patrocinadores.
-4- Se vea la imagen del principio.

## Tareas 27-01-2020

-1- EN PERFIL REPRESENTANTE....SOLO EXPERIENCIA + ESTRUCTURA DE CLUB

- drepresent@gmail.com

-2- EN PERFIL AFICIONADO ELIMINAR TODO LO QUE TIENE QUE VER CON PREMIOS / APTITUDES......
-3- AVATARES EN SPORTYEAH.
-4- Integrar el banco de imagenes gratuito.
-5- La imagen de products debe abrirse como modal.
-6- Quitar margen en change slider, y mostrar imagenes con tamano que las imagenes se vean iguales.
-7- Boton de change slider que sea como un div con un boton + icono.
8- Bug al entrar al perfil despues de salir de otra cuenta se mantiene el anterior.

## Tareas 26-01-2020

-1- Esperar integracion de ssr.
-2- Corregidos todos los bugs con respecto a estructura organizacional.
-3- Corregir bug al editar al padre.
-4- Poder visualizar la estructura desde el perfil publico.
-5- Crearme perfiles asociacion fundacion y federacion: probar privado publico.
davidasocia@gmail.com
davidfunda@gmail.com
davidfede@gmail.com

## Tareas 24-01-2020

1- Corregir bugs con respecto a los niveles mas avanzados.
c- al editar un breadcrum modificar todos los breadcrum inferiores.

## Tareas 23-01-20

1- Realizar nodos estructura perfil:

- Realizar funcionalidad de modales:
  -c- Al ser modal crear debe crear el nodo.
  -d- Poder editar al foto de la modal.
  -e- Boton eliminar node y logica.
  f- Mejorar la logica del breadcrum:
  -a- al editar traer el ultimo breadcrum,
  -b- al presionar ver mas entrar al node hijo,
  -d- al presional un breadcrum volver a ese nivel.
  g- Los breadcrum deben ser clickeables para poder devolverme en los nodos.

## Tareas 22-01-20

1- Realizar nodos estructura perfil:

- Maquetar modal para editar nodos y reabrir la misma para crear nodos mas
  adentro
- Crear boton para editar un nodo hijo, para editar el padre, y para crear nuevos nodos
- Definir funcionalidad de breadcrum: array de string que lo separes por '/' en el ngOnInit debe separarlo y al mostrarlo poder navegar entre los distintos nodos.

- Funcionalidad de breadcrum: Cada vez que se edite o se cree un node se agregara este al subtitulo con un ' ' y /
- Realizar funcionalidad de modales:
  -a- Al traer los datos por primera vez deben venir vacios.
  -b- Al darle click en guardar cambios debe modificar el nodo.

## Tareas 21-01-20

1- Realizar CRUD de nodos para estructura en perfil.

- Crear nuevo campo mixed en modelo usuarios.
- Crear nuevo componente estructura junto con su modal de nueva estructura, etc.
- Colocar breadcrum dentro de la estructura, colocar (foto, titulo, descripcion) dentro de cada nodo.
- Crear textos default.
- Crear JSON local el cual utilizaremos en el componente para mostrar la info
  y poder editarla
- beber de la info de user.structure en el constructor.
- Crear modal para editar cada nodo.
- Colocar modal en los imports.
- Importar el modal controller.
- Abrir la modal al presional editar.
- Boton de editar deberia mostrarse a un lado de los childs.
- Mejorar visual de los childs maquetar una prueba.

## Tareas 20-01-20

-1- Controlar tamanos en historia del perfil para que no rompa la visual.
-2- Comentarios sobre posts como minimo debe tener una imagen o un caracter o un emoji.
3- El boton de galeria de la imagen del banner tiene que abrir directamente el buscador de archivos.
-4- Cerrar modales con el boton de ir hacia atras.

## Tareas 19-01-20

-1- Al darle click a la imagen abrirla.
-2- Galeria de iconos para la landing.
-3- Anadir iconos de linkedin y tiktok a la landing.
-4- Seleccion multiple de imagenes carousel.
-5- A partir de la segunda imagen del perfil no aparece icono para eliminar.

## Tareas 18-01-20

-1- Boton para editar el titulo, y descripcion del producto en cuestion.
-2- No dejar crear un producto sin titulo o sin descripcion.

## REUNION 17-01-20

1- No permite ingresar caracteres especiales en las contrasenas.
2- Correo llega mal la imagen.
3- Que rediriga de http a https.
4- No cambia imagen del banner al probar la primera vez.
5- Galeria de iconos para la landing.
6- Integrar API para imagenes gratuitas en cada subida.
7- Redireccion de producto aclarar mejor la UI.
8- Tooltip en titulo que redireccione a la url y la imagen se abra la imagen.
9- Falta linkedin y tiktok.
10- Translate influye dentro del cambio del texto.
11- Club no deberia tener experiencias.
12- Club no tiene aptitudes pero si deberia tener estructura de la organizacion.
13- Gerarquia de organizacion mostrada parecida a la que sale del real madrid en google.
14- Estructura por nodos en la estructura. Tal como la estructura del real madrid.
15- No se cierra el banco de emojis al clickear fuera.
16- El banner no se puede mover para que quede en la posicion preferida.
17- Aun no hay avatares.
18- Permitir seleccionar directamente de la galeria.
19- Seleccion multiple de imagenes en carousel.
20- A partir de la segunda imagen del perfil no aparece el icono para eliminar.
21- Verificar la relacion de aspecto de la imagen subida en el carrousel.
22- En vez de personal colocar staff del club. VICTOR.
23- En perfil aficionado eliminar todo lo que sea premios aptitudes y colocar herramienta de fanatica.
24- En perfil repreentante solo experiencia + estructura de club.
25- Ojeador se queda asi, prensa tambien.
26- Asociacion, fundacion y federacion en su perfil dejar premios y estructura de club.
27- Ejectutivo igual y administrador de club igual.
28- Carousel hacerla responsive 3x3.
29- En apartado prensa herramienta para crear noticia articulo etc, justo entre el carousel y el perfil.
30- Graficas etc. Premio para Victor.
31- Boton en notificaciones para actualizar.
32- Pantalla de notificaciones esta mal el UI.
33- No se cierra la pantalla de seleccionar iconos en el chat clickeando fuera.
34- Iconos se meten al final y no en la posicion del cursor.
35- Facebook se ha ofendido.
36- Se puede publicar comentarios vacios.
37- Realizar trabajo para publicaciones con el exterior.
38- Editor de videos.
39- Cadena de retos video al lado, repito el reto, etiqueta.
40- Rankings super importante en SPORTYEAH.

## TAREAS DAVID 14-01-20

Donde dice logo cambiar por copyright.

Poder crear patrocinadores:

-1- Crear funcion de editar el array en backend en userModel.
-2- Crear funcion controller user.
-3- Agregar al userRouter las nuevas funciones.
-4- Crear funcion en el servicio user.

Mostrar a los patrocinadores en el perfil:

Funcion unica para los clubes y jugadores.
-5- En el init de profile traear los patrocinadores.
6- Maquetar la pantalla y definir las dimensiones que deberia tener la imagen.
7- Crear boton para agregar patrocinadores.
8- Crear modal para agregar patrocinadores.
9- Crear boton para editar patros. Crear modal para editar patrocinadores.
10- Crear boton para eliminar patrocinadores.
11- Crear modal para eliminar patrocinadores.
12- Crear boton para editar los patrocinadores un estado que muestre y quite los botones.

Sesion QA:
1- Prueba crear patrocinadores, nombres largos urls largas.
2- Prueba editar patrocinadores.
3- Prueba eliminar patrocinadores.

Mostrar los patrocinadores en el muro:
13- Mostrar los patrocinadores de la misma forma que en el perfil un poco mas pequeno.

Sesion QA:
1- Probar los post en el muro.
2- Probar los post en el perfil.

Maquetacion:
1- que se vayan alineando en el centro las marcas. sean de proporcion horizontal.
2- Boton para crear mas sponsors.
3- Boton para editar sponsors.
4- Boton para eliminar sponsors.
