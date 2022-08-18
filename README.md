# TermFrequencyChallenge
Challenge de desarrollo - Se requiere un sistema que permita obtener la frecuencia de términos de un una colección de documentos a través de una API Rest

# DEPLOY
La solución se desplega mediante docker-compose:

$ docker compose up

Se despliegan los dos contenedores y se ejecutan dos scripts una vez que el servidor de mysql está escuchando (implementado con https://github.com/ufoscout/docker-compose-wait). 
El primer script creará la base de datos y las tablas, el segundo hará el seeding procesando los *.txt.
Terminado el proceso la API quedará desplegada y escuchando en el puerto 3000. Suponiendo que se despliegue de manera local, los endpoints serán de la siguiente forma:

FREQUENCIA DE UNA PALABRA EN EL REPOSITORIO COMPLETO
- http://localhost:3000/repo_word_freq?term=perro
Respuesta: {"frequency":4}

FREQUENCIA DE UNA PALABRA EN UN ARCHIVO ESPECÍFICO
- http://localhost:3000/file_word_freq?term=perro&doc_name=5985-8.txt
Respuesta: {"frequency":397}

* El archivo deberá especificarse con su extensión 
* En ambos casos no se tendrán en cuenta los acentos en el término
