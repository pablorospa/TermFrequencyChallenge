# TermFrequencyChallenge
Challenge de desarrollo - Se requiere un sistema que permita obtener la frecuencia de términos de un una colección de documentos a través de una API Rest

# DEPLOY
La solución se desplega mediante docker-compose:

$ docker compose up

Se despliegan los dos contenedores y se ejecutarán dos scripts. El primero creará la base de datos y las tablas, el segundo hará el seeding procesando los *.txt
Terminado el proceso la API quedará desplegada y escuchando en el puerto 3000. Suponiendo que se despliegue de manera local, los endpoints serán de la siguiente forma:

- http://localhost:3000/repo_word_freq?term=perro
{"frequency":4}

- http://localhost:3000/file_word_freq?term=perro&doc_name=5985-8.txt
{"frequency":397}

