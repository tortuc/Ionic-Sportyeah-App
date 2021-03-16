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

35.180.14.40

git remote set-url origin git+ssh://ubuntu@35.180.196.119/var/git/backend
git remote set-url origin git+ssh://ubuntu@35.180.14.40/var/git/backend
git remote set-url origin git+ssh://ubuntu@35.180.14.40/var/git/frontend

## Importante

1. Siempre al finalizar la jornada hacer ionic build y ver los errores solucionarlos y merge master.
2. Trabajar por pomodoros de 25 minutos, cada vez que finalice uno anotar el tiempo dedicado a la tarea.

## MARTES 16-03-2021

1. Poder borrar desafios.
slider tiene un bug.
open img debe tener todas las imagenes.

## LUNES 15-03-2021

1. Estructura Club. en pausa
  1.1. Mejorar nombres en club.
  1.2. Cambiar imagen principal club.
  1.3. Mejorar usabilidad de usuario.
  1.4. Boton de volver.

  1.1.1 Comenzar en boton editar cuando sea la primera vez.
  1.1.2 Cambiar imagen principal.

  1.3.1 Cambiar breadcrumb por estilo de la pagina del madrid, al hacer hover salen hijos nodos.

  Niveles

  1. Cantera Masculina y Femenina:
    Juvenil/Cadete
    Infantiles
    Alevines
    Benjamines
    Prebenjamines
    Pruebas de Acceso
  2. Primer Equipo.
  3. Equipo Femenino.
  4. Otros Equipos.

### Detalles QA

1. slider-change estilo.
2. modal abarque toda la pantalla.

## VIERNES 12-03-2021

1. Mejorar slider. 3h-50m. listo
   1.1. Que las imagenes puedan ser abiertas al hacer click.
   1.2. Cuadro para agregar imagenes slider.

2. Mejorar estructura club.

## JUEVES 11-03-2021

1. Premios de retos: Manejar los premios de los desafios y darlos por fecha, default 1 mes - backend logica.6h.
2. Testear lo faltante en desafios y dar a jogeiker luz verde para QA.

## MIERCOLES 10-03-2021

1. Premios de retos: Poder agregar emojis a los premios.3h-30m.
2. Componente Crear Desafios: Poder agregar emojis al titulo y a la descripcion.3h-1h25m.
3. Reacciones retos: Al clickear la reaccion debe de eliminarse. 30m-10m.
4. Retos generales: Buscador de retos. 1h-45m
5. Componente Crear Desafios: Guardar en api la persona que te ha retado.1h.

## MARTES 09-03-2021

1. Componente desafio individual - Logica boton seguir: no debe permitir seguir si el usuario soy yo, si ya lo sigo debe salir marcado y si no esta marcado poder marcarlo y seguir a la persona.2h-1h15m
2. Premios de retos: Dar condiciones para entrega del premio select.1h-50m.
3. Modal imagenes gratis: Buscador de imagenes gratis y mejorar visual.1h-25m.

### Bugs encontrados

1. klass.trim en componente desafio individual.
2. Devtools failed.
3. Encontrado error en el muro no se puede obtener photo de undefined. tuve que crear dos cuentas de nuevo.
4. Error modal-created : 24 ts. property id of undefined.
5. Error challenge-content unsubscribe of undefined.
6. Bug error while trying to use the following icon from the Manifest: http://localhost:8100/assets/icons/icon-144x144.png (Download error or resource isn't a valid image)
7. Console log banner-profile-logic.service.ts:106
8. Console .log banner-profile-logic.service.ts:109
9. console log banner-profile-logic.service.ts:110

## CAMBIOS

### Faltante en Desafios (Tareas definidas) 18 horas y media estimadas

1. Componente desafio individual - Logica boton seguir: no debe permitir seguir si el usuario soy yo, si ya lo sigo debe salir marcado y si no esta marcado poder marcarlo y seguir a la persona.2h.
2. Premios de retos: Dar condiciones para entrega del premio select.1h.
3. Premios de retos: Manejar los premios de los desafios y darlos por fecha, default 1 mes - backend logica.6h.
4. Premios de retos: Poder agregar emojis a los premios.3h.
5. Retos generales: Buscador de retos.1h.
6. Modal imagenes gratis: Buscador de imagenes gratis y mejorar visual.1h.
7. Componente Crear Desafios: Poder agregar emojis al titulo y a la descripcion.3h.
8. Componente Crear Desafios: Guardar en api la persona que te ha retado.1h.
9. Reacciones retos: Al clickear la reaccion debe de eliminarse.30m.

### Slider 3 horas estimadas

1. Colocar boton mas entendible, como un cuadrado con simbolo + para agregar imagenes.1h.
2. poder abrir imagenes.2h.

### Estructura 10 horas estimadas

1. Definir palabras clave y la estructura que debe tener cada rol (Ejemplo: club - categorias - equipos - plantilla).4h.
2. Cambiar palabras clave para cada nivel de la herramienta estructura dependiendo de su rol en el perfil.4h.
3. Poder subir patrocinadores por equipo o lo que requiera.2h.

### Faltante en Desafios (Por definir tiempos y dificultad)

1. Componente retos en cascada definir actividades.
2. Muro ranking definir actividades.
3. Tiempo de grabacion para finalizar el reto definir actividades.
4. Funcionalidad grabar camara en Android y IOS definir actividades.
5. Reacciones de las tomas falsas definir actividades.
6. Componente Desafio Individual para Mobile (Responsive) definir actividades.

### Cambios BUGS 41 horas estimadas

1. Quitar mariquita.
2. Bug buscar se quita cuando no hay coincidencias. 30m.
3. Modal de desafios: Manejo de errores en "crea tu premio" - cuando un campo no este completado y sea obligatorio se muestre el error. 30m
4. Modal de desafios: Ver tiempo del video en crear desafio. 4h.
5. Modal de desafios: Boton de volver tiene que volver en el paso. 30m.
6. Modal de desafios: Botones de modal crear en linea grandes. 1h.
7. Modal de desafios: Cambiar texto de siguiente por lo que corresponda en ese momento. 15m
8. Modal de desafios: Meter cabecera este es el video bueno, estas son tus tomas falsas titulo en cada video que no se entiende. 15m.
9. Modal de desafios: Cambiar texto "Intentar de nuevo" a "Este video no te gusta crea otro en vez de intentar de nuevo". 15m.
10. Modal de desafios: No permitir posicion negativa. 15m.
11. Modal de desafios: No obligar a colocar imagen en causa opcional.15m.
12. Modal de desafios: Todo en un solo paso toda la info.2h.
13. Modal de desafios: Limitar el tope de grabaciones a 3 tomas falsas no dejar subir mas.30m.
14. Modal de desafios: Una persona que ha aceptado el reto no tiene que decirle si es solidario o no.15m.
15. Modal de Desafios: una sola modal para aceptar reto.30m.
16. Modal de Compartir: Falta la posibilidad de compartir video en muro.4h.
17. Modal de Compartir: Falta la posibilidad de compartir el reto en redes sociales.8h.
18. Modal de Compartir: Link de comparticion visualizacion previa. 8h.
19. Modal de Compartir: Boton de cerrar.15m.
20. Retos Visual General: No actualiza el numero de comentarios cuando comentamos.15m.
21. Retos Visual General: Boton de cadenas de retos cambiar mejor.1h.
22. Retos Visual General:Cambiar boton ver intentos por los intentos pequenos con titulo arriba.4h.
23. Retos Visual General: Numero de visualizaciones mas grande.15m.
24. Componente Desafio Individual: bug video se destruye despues de aceptar reto.30m.
25. Componente Desafio Individual: Falta visualizar retos similares abajo de reto individual.3h.

## MOSTRAR 05-03-2021

1. Nueva visualizacion de retos.
2. Nueva visualizacion de retos individuales.
3. Nuevas reacciones.
4. Nueva modal de retar.
5. Nueva vista para crear desafio.
6. Nueva vista para aceptar desafio.
7. Nueva grabacion pantalla para desafio, pausar y stop.
8. Intentos de desafios.
9. Nueva visual premios y subida de premios.
10. Reto solidario check.
11. Reto publico o privado check.

## Tareas Desafios 05-03-2021

## TAREAS DESAFIOS 04-03-2021

1. Modal de comparticion: Mejorar link para compartir visual/funcional.cumplido.
2. Boton de compartir: Cambiar texto a "retar" y "retados".cumplido.
3. Modal de comparticion: Botones para compartir redes sociales.cumplido.
4. Componente desafio individual: colocar video justo en medio de la parte izquierda.cumplido.
5. Componente desafio individual: colocar video de fondo con blur para la parte sobrante.cumplido.
6. Componente desafio individual: recibir parametro userName.cumplido.
7. Componente desafio individual: Colocar en tab quien te esta retando.cumplido.
8. Componente desafio individual: Colocar boton de aceptar reto.cumplido.
9. Componente desafio individual: Colocar boton tipo tiktok en video para poder ver otro desafio del mismo tipo.cumplido.
10. Componente desafio individual: quitar titulo de tab y colocar justo debajo del usuario para mejorar la visual.cumplido.

## TAREAS DESAFIOS 03-03-2021

0. componente desafio individual:
   colocar nombre del desafio en la tab del componente.
   colocar estilo descripcion del desafio debajo del nombre. cumplido.
   crear visual para reto individual tipo tiktok. 50%
   colocar imagen con blur en fondo div de parte izquierda.cumplido.
   colocar video en medio de la imagen con padding.cumplido.
   al pausar el video colocar icono de pause.
   que solo rellene el espacio deseable en la pantalla challenges ajustar.
   corregir bug con reaccion en vista individual referenceId undefined.
   Un desafio component y abajo una lista de retos de la misma familia.
   La lista de desafios de abajo debe tener scroll infinite.
   El link debe aparecer clickeable y copiable en la modal de reto creado.
   Debe abrir la modal de reto creado el boton de shared.
   Colocar iconos de redes sociales en modal de comparticion.
1. Al subir un desafio abrir una modal de comparticion y mostrar link para compartir y en esa modal le saldra la opcion de retar a sus seguidores.
2. Logica para compartir reto a amigos.
3. Permitir enviar mensaje privado con el reto por whatsapp.
4. Poder ver las reacciones dejadas al darle click a las reacciones.
5. Buscador de retos.
6. Buscador de imagenes gratis.
7. Logo a la izquierda del numero por posicion.
8. Quitar console.logs de toda la parte de desafios.
9. Colocar max height al tamano de los videos.
10. Crear componente para ver el reto y abajo sus demas retos relacionados por orden de mas likes.
11. Para entrar en la pantalla de reto individual colocar boton de "cadena" de retos.
12. Cron function para manejar los premios de los desafios y darlos por fecha.
13. Boton de compartir debe abrir la misma modal que se abre al crear un desafio.

## NOTAS QA JOGEIKER LIZARRAGA 02-03-2021

1. No se puede reproducir el video al subirlo en intento.cumplido.
   colocar un loading despues de pedir la data.cumplido.
   colocar otro video de donde extraer la duracion sin afectar al video principal.cumplido.
2. Boton de usuario que subio el reto redirige a mi perfil no al usuario que subio el desafio.cumplido.
3. Al moverme al perfil de otra persona me desaparece los videos al volver.cumplido.
   Ionwillenter recargue los videos.cumplido.
4. Slider de intentos.cumplido.
   Agregar un ion slider con los intentos.cumplido.
5. Los premios deben llevar condicion.
   Crear campo condicion en la api con un enum.
   Crear select para las condiciones.
   Las condiciones son: Mas likes de tal, mas vistas, mas compartido, mas comentarios.
   Calendario para seleccionar la fecha en la que se dara el premio, dar un mes por defecto.
6. Al no dar permisos de camara debe mostrar un mejor error.
7. La descripcion de los premios no se muestra correctamente.cumplido.
8. Debe mostrar pantalla de carga una vez pida la data en videos-c.cumplido.
9. Modal al crear reto no deberia abrirse si no hay data como el link.cumplido.
10. Reto solidario descripcion y toggle mas imagen tipo banner.
    Crear input de la causa.cumplido.
    Crear imagen de la causa.cumplido.
    Crear objeto de la causa.cumplido.
    Crear campo solidary en api.cumplido.
    Crear validacion para el campo causa.cumplido.
    Crear validacion para el campo src.cumplido.
    Que la validacion solo se active cuando se active causa solidaria.cumplido.
    Subida de imagenes en cause.cumplido.
    Mostrar boton causa solidaria y mostrar la causa en una modal dentro del desafio.
    Preguntar opciones para mejorar el diseno de este apartado por el grupo.

## TAREAS DESAFIOS 26-02-2021

1. Colocar limite de intentos a 3. cumplido.
2. Visualizacion del numero de visualizaciones del reto. cumplido.
3. Mostrar los intentos. cumplido.

## TAREAS DESAFIOS 25-02-2021

1. Si el size es 0 no permitir subir a jdv. cumplido.
2. Deshabilitar el sonido del video replicado. cumplido.
3. Boton mejorar visual colocarle circulo rojo cuando este grabando. cumplido.
4. Cuando se detenga agregar video a media y mostrarlo. cumplido
5. Funcionalidad de pausar un video y seguir grabando despues. cumplido.
6. En boton nuevo intento guardar media en un array llamado intentos. cumplido.
7. Mostrar intentos en fila. cumplido.
8. Toggle subir intentos o no. cumplido.
9. Habilitar siguiente solo cuando se tenga media. cumplido.
10. Guardar los intentos en la API. cumplido.
11. Bug en media cuando aceptas el reto se ve el anterior. Cumplido.
12. Pausar video de fondo cuando abra la modal. Cumplido
13. Que no se sobrecargue el sistema cuando este en apartado retos, refactorizar codigo y optimizar funciones. Cumplido.
14. Al refactorizar el codigo dano la funcionalidad de destruir los videos, hay que reacerla. cumplido.
15. Ejecutar view scroll cuando vea el video. cumplido
16. El video no deberia iniciarse de una vez. cumplido.
17. Reparar error arrojado en reacciones 73. cumplido.
18. Colocar los premios en el siguiente desafio a crear. Cumplido.
19. Debe dar la opcion de subir otro intento del reto guardandose los intentos. Cumplido.
20. Deben mostrarse los intentos mas abajo y un toggle que indique si mostrar los intentos o no. Cumplido.
21. Buscador por nick. Cumplido
22. Boton de retar personas. Cumplido

Faltante:

1. Premio solidario descripcion y toggle.
2. Al subir un desafio abrir una modal de comparticion y mostrar link para compartir y en esa modal le saldra la opcion de retar a sus seguidores. Cumplido.
   Logica para compartir reto a amigos.
3. Permitir enviar mensaje privado con el reto por whatsapp.
4. Visualizacion del numero de visualizaciones del reto.
5. Poder ver las reacciones dejadas al darle click a las reacciones.
6. Buscador de retos.
7. Buscador de imagenes gratis.
8. Logo a la izquierda del numero por posicion.
9. Quitar console.logs de toda la parte de desafios.
10. Colocar limite de intentos a 3.

Dudas:

1. Como se desea visualizar los intentos? en las publicaciones para no danar la visual.

## TAREAS DESAFIOS 24-02-2021

1. Mostrar stepper cuando se acepte el reto mostrando la descripcion de como hacer el reto y darle a un boton de estoy listo. cumplido.
2. Grabadora de pantalla PWA IONIC.
   2.1. Habilitar "Media Camara" para telefonos moviles IONIC. cumplido.
   2.2. INVESTIGAR SOBRE WEBRTC. cumplido
   2.3. Habilitar una camara web que grabe y guarde el video. El video ya se guarda falta mejorar la interfaz.
3. Premio solidario descripcion y toggle.
4. Debe dar la opcion de subir otro intento del reto guardandose los intentos.
5. Deben mostrarse los intentos mas abajo y un toggle que indique si mostrar los intentos o no.
6. Al subir un desafio abrir una modal de comparticion y mostrar link para compartir y en esa modal le saldra la opcion de retar a sus seguidores.
7. Permitir enviar mensaje privado con el reto por whatsapp.
8. Buscador por nick.
9. Boton de retar personas.
10. Visualizacion del numero de visualizaciones del reto.
11. Poder ver las reacciones dejadas al darle click a las reacciones.
12. Buscador de retos.
13. Buscador de imagenes gratis.
14. Colocar los premios en el siguiente desafio a crear.
15. Logo a la izquierda del numero por posicion.
16. Ejecutar view scroll cuando vea el video.
17. El video no deberia iniciarse de una vez.

## TAREAS DESAFIOS 23-02-2021 12 HORAS DE TRABAJO

1. Se escuchan todos los videos a la vez cuando sales del componente BUG. cumplido.
2. Mostrar stepper cuando se acepte el reto mostrando la descripcion de como hacer el reto y darle a un boton de estoy listo.
3. Grabadora de pantalla PWA IONIC.
4. Premio solidario descripcion y toggle.
5. Debe dar la opcion de subir otro intento del reto guardandose los intentos.
6. Deben mostrarse los intentos mas abajo y un toggle que indique si mostrar los intentos o no.
7. Al subir un desafio abrir una modal de comparticion y mostrar link para compartir y en esa modal le saldra la opcion de retar a sus seguidores.
8. Permitir enviar mensaje privado con el reto por whatsapp.
9. Buscador por nick.
10. Boton de retar personas.
11. Visualizacion del numero de visualizaciones del reto.

Poder ver las reacciones dejadas al darle click a las reacciones.
Buscador de retos.
Buscador de imagenes gratis.
Colocar los premios en el siguiente desafio a crear.
Logo a la izquierda del numero por posicion.
Ejecutar view scroll cuando vea el video.

## TAREAS DESAFIOS 22-02-2021 12 HORAS DE TRABAJO

1. Mostrar premios en los videos. cumplido.
2. Hay que asegurarse que los videos que sean dobles se inicien al mismo tiempo.
3. Mostrar stepper cuando se acepte el reto mostrando la descripcion de como hacer el reto y darle a un boton de estoy listo.
4. Grabadora de pantalla PWA IONIC.
5. Premio solidario descripcion y toggle.
6. Debe dar la opcion de subir otro intento del reto guardandose los intentos.
7. Deben mostrarse los intentos mas abajo y un toggle que indique si mostrar los intentos o no.
8. Al subir un desafio abrir una modal de comparticion y mostrar link para compartir y en esa modal le saldra la opcion de retar a sus seguidores.
9. Permitir enviar mensaje privado con el reto por whatsapp.
10. Permitir retar por facebook.
11. Permitir retar por whatsapp.
12. Permitir retar por Linkedin.
13. Permitir retar por Instagram.
14. Permitir retar por twitter.
15. Buscador por nick.
16. Boton de retar personas.
17. Visualizacion del numero de visualizaciones del reto.
18. Solventar intervals que buguean la App. cumplido.
19. Se escuchan todos los videos a la vez cuando sales del componente BUG.

## TAREAS DESAFIOS 21-02-2021 12 HORAS DE TRABAJO

1. Resolver responsive de botones like comentarios y shared. cumplido.
2. Colocar fixed la caja de amigos y que recomienda desafios. cumplido.
3. La caja de amigos debe posibilitar la creacion de un reto. cumplido.
4. Opcion de colocar un reto publico o privado con un toggle. cumplido.
5. Que muestre 2 videos y los demas los vaya agregando con forme vaya bajando. cumplido.
6. Pausar video al darle click. cumplido.
7. Comenzar video solo al posicionarse justo en su rango. cumplido.
8. Smooth scroll, que se posicione en el video. cumplido.
9. Colocar boton en responsive para abrir la sidebar. cumplido
10. Animacion boton aceptas el reto. cumplido.
11. Boton actualizar. cumplido.
12. Corregir bugs de comentarios. cumplido.
13. Al pulsar al usuario o la fecha de creacion llevar a su perfil en el header. cumplido.
14. Quitar titulo y descripcion del aceptar reto. cumplido.
15. Agregar funcionalidad a reaccionar. cumplido.
16. Al volver a reaccionar eliminar la reaccion anterior y cambiarla por la nueva reaccion. cumplido.

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
