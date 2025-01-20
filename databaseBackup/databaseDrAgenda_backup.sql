--
-- Arquivo gerado com SQLiteStudio v3.4.13 em qui. jan. 16 16:45:46 2025
--
-- Codificação de texto usada: UTF-8
--
PRAGMA foreign_keys = off;
BEGIN TRANSACTION;

-- Tabela: admins
CREATE TABLE IF NOT EXISTS admins (
    id_admin INTEGER       PRIMARY KEY AUTOINCREMENT,
    name     VARCHAR (50),
    email    VARCHAR (100),
    password VARCHAR (100) 
);

INSERT INTO admins (
                       id_admin,
                       name,
                       email,
                       password
                   )
                   VALUES (
                       1,
                       'Mateus Campos',
                       'mateus.campos@gmail.com',
                       '123456'
                   );

INSERT INTO admins (
                       id_admin,
                       name,
                       email,
                       password
                   )
                   VALUES (
                       2,
                       'Camila Rodrigues',
                       'camila@gmail.com',
                       '$2b$10$q4ToIWW3CbLMsDBQvkLdpe6eC0hlTa.w2lbvRztHzV4pbvUPt3yty'
                   );

INSERT INTO admins (
                       id_admin,
                       name,
                       email,
                       password
                   )
                   VALUES (
                       3,
                       'Camila Rodrigues',
                       'camila@gmail.com',
                       '$2b$10$h7ZQXmAKTiGLEZK6zfA52unhvbf5gyo6mdKgRS6WwC6Y3qgkM5pOS'
                   );

INSERT INTO admins (
                       id_admin,
                       name,
                       email,
                       password
                   )
                   VALUES (
                       4,
                       'Mario Silveira',
                       'marioadmin@gmail.com',
                       '$2b$10$ZCLzrZq6h5XOoPfLQgHn7eRBaDfcBKdLWSrfJF8jUfZ8G5dwkyKZa'
                   );

INSERT INTO admins (
                       id_admin,
                       name,
                       email,
                       password
                   )
                   VALUES (
                       5,
                       'Roberto Mafra',
                       'robertomafra@admin.com.br',
                       '$2b$10$kdGJ6w9i/Bsab8S5oOTvHuxRSBT0JS0LsiN5pfpvNaP3ohctCIBAa'
                   );


-- Tabela: appointments
CREATE TABLE IF NOT EXISTS appointments (
    id_appointment INTEGER     PRIMARY KEY AUTOINCREMENT,
    id_doctor      INTEGER,
    id_service     INTEGER,
    id_user        INTEGER,
    booking_date   DATE,
    booking_hour   VARCHAR (5),
    FOREIGN KEY (
        id_doctor
    )
    REFERENCES doctors (id_doctor),
    FOREIGN KEY (
        id_service
    )
    REFERENCES services (id_service),
    FOREIGN KEY (
        id_user
    )
    REFERENCES users (id_user) 
);

INSERT INTO appointments (
                             id_appointment,
                             id_doctor,
                             id_service,
                             id_user,
                             booking_date,
                             booking_hour
                         )
                         VALUES (
                             1,
                             9,
                             3,
                             4,
                             '2024-11-10',
                             '08:30'
                         );

INSERT INTO appointments (
                             id_appointment,
                             id_doctor,
                             id_service,
                             id_user,
                             booking_date,
                             booking_hour
                         )
                         VALUES (
                             3,
                             4,
                             1,
                             3,
                             '2024-11-09',
                             '13:00'
                         );

INSERT INTO appointments (
                             id_appointment,
                             id_doctor,
                             id_service,
                             id_user,
                             booking_date,
                             booking_hour
                         )
                         VALUES (
                             4,
                             1,
                             3,
                             4,
                             '2024-12-03',
                             '14:30'
                         );

INSERT INTO appointments (
                             id_appointment,
                             id_doctor,
                             id_service,
                             id_user,
                             booking_date,
                             booking_hour
                         )
                         VALUES (
                             5,
                             7,
                             1,
                             1,
                             '2024-12-03',
                             '09:30'
                         );

INSERT INTO appointments (
                             id_appointment,
                             id_doctor,
                             id_service,
                             id_user,
                             booking_date,
                             booking_hour
                         )
                         VALUES (
                             7,
                             1,
                             3,
                             2,
                             '2024-11-10',
                             '09:30'
                         );

INSERT INTO appointments (
                             id_appointment,
                             id_doctor,
                             id_service,
                             id_user,
                             booking_date,
                             booking_hour
                         )
                         VALUES (
                             8,
                             3,
                             2,
                             3,
                             '2024-12-14',
                             '08:30'
                         );

INSERT INTO appointments (
                             id_appointment,
                             id_doctor,
                             id_service,
                             id_user,
                             booking_date,
                             booking_hour
                         )
                         VALUES (
                             39,
                             3,
                             3,
                             4,
                             '2025-01-20',
                             '09:30'
                         );

INSERT INTO appointments (
                             id_appointment,
                             id_doctor,
                             id_service,
                             id_user,
                             booking_date,
                             booking_hour
                         )
                         VALUES (
                             41,
                             1,
                             3,
                             4,
                             '2025-02-07',
                             '10:00'
                         );

INSERT INTO appointments (
                             id_appointment,
                             id_doctor,
                             id_service,
                             id_user,
                             booking_date,
                             booking_hour
                         )
                         VALUES (
                             49,
                             1,
                             3,
                             5,
                             '2025-02-17',
                             '09:30'
                         );

INSERT INTO appointments (
                             id_appointment,
                             id_doctor,
                             id_service,
                             id_user,
                             booking_date,
                             booking_hour
                         )
                         VALUES (
                             53,
                             5,
                             3,
                             5,
                             '2025-02-11',
                             '09:00'
                         );

INSERT INTO appointments (
                             id_appointment,
                             id_doctor,
                             id_service,
                             id_user,
                             booking_date,
                             booking_hour
                         )
                         VALUES (
                             54,
                             7,
                             1,
                             5,
                             '2025-02-12',
                             '09:00'
                         );

INSERT INTO appointments (
                             id_appointment,
                             id_doctor,
                             id_service,
                             id_user,
                             booking_date,
                             booking_hour
                         )
                         VALUES (
                             56,
                             1,
                             3,
                             4,
                             '2025-03-10',
                             '09:30'
                         );

INSERT INTO appointments (
                             id_appointment,
                             id_doctor,
                             id_service,
                             id_user,
                             booking_date,
                             booking_hour
                         )
                         VALUES (
                             57,
                             2,
                             3,
                             14,
                             '2025-02-18',
                             '09:30'
                         );

INSERT INTO appointments (
                             id_appointment,
                             id_doctor,
                             id_service,
                             id_user,
                             booking_date,
                             booking_hour
                         )
                         VALUES (
                             58,
                             7,
                             1,
                             5,
                             '2025-02-26',
                             '10:00'
                         );


-- Tabela: doctors
CREATE TABLE IF NOT EXISTS doctors (
    id_doctor INTEGER      PRIMARY KEY AUTOINCREMENT,
    name      VARCHAR (50),
    specialty VARCHAR (50),
    icon      VARCHAR (10) 
);

INSERT INTO doctors (
                        id_doctor,
                        name,
                        specialty,
                        icon
                    )
                    VALUES (
                        1,
                        'Dr.  Amando Matheus',
                        'Ginecologia e obstetrícia',
                        'M'
                    );

INSERT INTO doctors (
                        id_doctor,
                        name,
                        specialty,
                        icon
                    )
                    VALUES (
                        2,
                        'Dra.  Ana Beatriz Rutini',
                        'Cardiologista',
                        'F'
                    );

INSERT INTO doctors (
                        id_doctor,
                        name,
                        specialty,
                        icon
                    )
                    VALUES (
                        3,
                        'Dr.  Antônio Almeida Souza',
                        'Pediatra',
                        'M'
                    );

INSERT INTO doctors (
                        id_doctor,
                        name,
                        specialty,
                        icon
                    )
                    VALUES (
                        4,
                        'Dra.  Roberta Martins',
                        'Clínica Geral',
                        'F'
                    );

INSERT INTO doctors (
                        id_doctor,
                        name,
                        specialty,
                        icon
                    )
                    VALUES (
                        5,
                        'Dr.  Antônio Almeida Souza',
                        'Clínico Geral',
                        'M'
                    );

INSERT INTO doctors (
                        id_doctor,
                        name,
                        specialty,
                        icon
                    )
                    VALUES (
                        6,
                        'Dra.  Marcia Assis',
                        'Endocrinologista',
                        'F'
                    );

INSERT INTO doctors (
                        id_doctor,
                        name,
                        specialty,
                        icon
                    )
                    VALUES (
                        7,
                        'Dr. João Costa Filho',
                        'Clínico Geral ',
                        'M'
                    );

INSERT INTO doctors (
                        id_doctor,
                        name,
                        specialty,
                        icon
                    )
                    VALUES (
                        9,
                        'Dra.  Nise da Silveira',
                        'Cirurgia Plástica',
                        'F'
                    );


-- Tabela: doctors_services
CREATE TABLE IF NOT EXISTS doctors_services (
    id_doctor_service INTEGER        PRIMARY KEY AUTOINCREMENT,
    id_doctor         INTEGER,
    id_service        INTEGER,
    price             DECIMAL (9, 2),
    FOREIGN KEY (
        id_doctor
    )
    REFERENCES doctors (id_doctor),
    FOREIGN KEY (
        id_service
    )
    REFERENCES services (id_service) 
);

INSERT INTO doctors_services (
                                 id_doctor_service,
                                 id_doctor,
                                 id_service,
                                 price
                             )
                             VALUES (
                                 1,
                                 1,
                                 3,
                                 500
                             );

INSERT INTO doctors_services (
                                 id_doctor_service,
                                 id_doctor,
                                 id_service,
                                 price
                             )
                             VALUES (
                                 2,
                                 1,
                                 1,
                                 800
                             );

INSERT INTO doctors_services (
                                 id_doctor_service,
                                 id_doctor,
                                 id_service,
                                 price
                             )
                             VALUES (
                                 3,
                                 2,
                                 2,
                                 600
                             );

INSERT INTO doctors_services (
                                 id_doctor_service,
                                 id_doctor,
                                 id_service,
                                 price
                             )
                             VALUES (
                                 4,
                                 2,
                                 3,
                                 200
                             );

INSERT INTO doctors_services (
                                 id_doctor_service,
                                 id_doctor,
                                 id_service,
                                 price
                             )
                             VALUES (
                                 5,
                                 3,
                                 3,
                                 540
                             );

INSERT INTO doctors_services (
                                 id_doctor_service,
                                 id_doctor,
                                 id_service,
                                 price
                             )
                             VALUES (
                                 6,
                                 5,
                                 3,
                                 450
                             );

INSERT INTO doctors_services (
                                 id_doctor_service,
                                 id_doctor,
                                 id_service,
                                 price
                             )
                             VALUES (
                                 7,
                                 3,
                                 2,
                                 700
                             );

INSERT INTO doctors_services (
                                 id_doctor_service,
                                 id_doctor,
                                 id_service,
                                 price
                             )
                             VALUES (
                                 8,
                                 7,
                                 1,
                                 800
                             );


-- Tabela: services
CREATE TABLE IF NOT EXISTS services (
    id_service  INTEGER      PRIMARY KEY AUTOINCREMENT,
    description VARCHAR (50) 
);

INSERT INTO services (
                         id_service,
                         description
                     )
                     VALUES (
                         1,
                         'Mamografia'
                     );

INSERT INTO services (
                         id_service,
                         description
                     )
                     VALUES (
                         2,
                         'Endoscopia'
                     );

INSERT INTO services (
                         id_service,
                         description
                     )
                     VALUES (
                         3,
                         'Consulta'
                     );


-- Tabela: users
CREATE TABLE IF NOT EXISTS users (
    id_user  INTEGER       PRIMARY KEY AUTOINCREMENT,
    name     VARCHAR (50),
    email    VARCHAR (100),
    password VARCHAR (100) 
);

INSERT INTO users (
                      id_user,
                      name,
                      email,
                      password
                  )
                  VALUES (
                      1,
                      'Raquel Azevedo',
                      'rachel@hotmail.com',
                      '123456'
                  );

INSERT INTO users (
                      id_user,
                      name,
                      email,
                      password
                  )
                  VALUES (
                      2,
                      'Antônio Eugênio Azevedo',
                      'antonio@gmail.com',
                      '987654'
                  );

INSERT INTO users (
                      id_user,
                      name,
                      email,
                      password
                  )
                  VALUES (
                      3,
                      'Mateus Ribeiro de Campos',
                      'mateus@gmail.com',
                      '$2b$10$Rms7CTg4JZuZPuS6jpedKuuwnwn9gL6qtnRLSq.JG3xi3XXeQ2E2W'
                  );

INSERT INTO users (
                      id_user,
                      name,
                      email,
                      password
                  )
                  VALUES (
                      4,
                      'Laura Campos',
                      'laura@gmail.com',
                      '$2b$10$YIum9AxEAfrBa2yEuA2rz.5B0fftztNDzckqC4LRS4FoS13SwOto2'
                  );

INSERT INTO users (
                      id_user,
                      name,
                      email,
                      password
                  )
                  VALUES (
                      5,
                      'Hellen Campos',
                      'hellen@gmail.com',
                      '$2b$10$gv7M2lXrNCZY4Q4OWpP1I.qWYfZPfudLZP9BT4RQ0Hg15/jpTCPVW'
                  );

INSERT INTO users (
                      id_user,
                      name,
                      email,
                      password
                  )
                  VALUES (
                      6,
                      '',
                      'mario ',
                      '$2b$10$aVaIJVllJAyKcPnLMgizLeR4JGIMXfdoPPYh/fa1zSVvvP93VMK.u'
                  );

INSERT INTO users (
                      id_user,
                      name,
                      email,
                      password
                  )
                  VALUES (
                      7,
                      'Celina',
                      'celina@gmail.com',
                      '$2b$10$s2cxku785lYq3G/vA9J3pOzceKYDChlEgqqemUjaPaQsSsvpDcwZ2'
                  );

INSERT INTO users (
                      id_user,
                      name,
                      email,
                      password
                  )
                  VALUES (
                      8,
                      'heloisa Campos',
                      'heloisacampos@gmail.com',
                      '$2b$10$Mq8FQN1J4c8hla7yDlpILenuQzzTiGgjdJFJVFDquvHosmvtB7pHK'
                  );

INSERT INTO users (
                      id_user,
                      name,
                      email,
                      password
                  )
                  VALUES (
                      9,
                      'Cecilia Campos',
                      'cecilia@gmail.com',
                      '$2b$10$YOlScCcZKF2lDQOHxj27hu5odq/DtMU4M0qGBhGUfw5uXsLUsvbS2'
                  );

INSERT INTO users (
                      id_user,
                      name,
                      email,
                      password
                  )
                  VALUES (
                      10,
                      'everton',
                      'everton@gmail.com',
                      '$2b$10$yTOHkAquH3HetkU0UUJAMeXjspv1pgjbUMZsppBVMY0.8/B9OCb2m'
                  );

INSERT INTO users (
                      id_user,
                      name,
                      email,
                      password
                  )
                  VALUES (
                      11,
                      'everton',
                      'everton@gmail.com',
                      '$2b$10$w7LuL0g1XWHBKSsVp.NtveaMUWRJrP4TEyuECvgoqXQGsn/Tz23di'
                  );

INSERT INTO users (
                      id_user,
                      name,
                      email,
                      password
                  )
                  VALUES (
                      12,
                      'everton',
                      'everton@gmail.com',
                      '$2b$10$37a.Z6G8NCKHQqpEWYR37eMybUVOiwjrC0G0q6/vqf1ASfY224fxO'
                  );

INSERT INTO users (
                      id_user,
                      name,
                      email,
                      password
                  )
                  VALUES (
                      13,
                      'benedito',
                      'benedito@gmail.com',
                      '$2b$10$Svq7/qsBqSQ5PY/qBB4qEeJNMPdzVIwvBrWyqQCuJENKWZMpqrn.G'
                  );

INSERT INTO users (
                      id_user,
                      name,
                      email,
                      password
                  )
                  VALUES (
                      14,
                      'Rogério Silva',
                      'rogerio@gmail.com',
                      '$2b$10$lCoxzb4vTXJZfATc1J2pTOVrOBtHcoSyCho8UTP8NBUqEL7G3mIsK'
                  );

INSERT INTO users (
                      id_user,
                      name,
                      email,
                      password
                  )
                  VALUES (
                      15,
                      'Rodrigo Silas',
                      'rodrigo@gmail.com',
                      '$2b$10$tNHYGgdS7SSncw/CfbabYOtt7HlV3FpyK/k3rOf7kktUpqhUkVceG'
                  );

INSERT INTO users (
                      id_user,
                      name,
                      email,
                      password
                  )
                  VALUES (
                      16,
                      'Isadora Campos',
                      'isadoracampos@gmail.com',
                      '$2b$10$91uE4FW5JmUsmf8p4jy5uOv7Hqfd0nRVDlvAsN.Ie42jrAYe557pq'
                  );

INSERT INTO users (
                      id_user,
                      name,
                      email,
                      password
                  )
                  VALUES (
                      17,
                      'Rodrigo Azevedo',
                      'rodrigo.azevedo@gmail.com',
                      '$2b$10$7T5mfxGmex2ohRkRAgFlNOnuiT9WbB1GTZAUfk0Me3/Bd7BlOXWn2'
                  );

INSERT INTO users (
                      id_user,
                      name,
                      email,
                      password
                  )
                  VALUES (
                      18,
                      'Luciano Azevedo',
                      'luciano.azevedo@gmail.com',
                      '$2b$10$XbmcfZDVEWeAugLT9vYnFOWvRUeRKiu0dfSzebNJDu7lK8VrMx3uq'
                  );

INSERT INTO users (
                      id_user,
                      name,
                      email,
                      password
                  )
                  VALUES (
                      19,
                      'Luciano Azevedo',
                      'luciano.azevedo@gmail.com',
                      '$2b$10$wZjXnOLKvw3zOXlOuwLHg.FMb7uEvYSdf3ByAR/CkLQbkG1bFMcdK'
                  );

INSERT INTO users (
                      id_user,
                      name,
                      email,
                      password
                  )
                  VALUES (
                      20,
                      'Juliano Silva',
                      'juliano@gmail.com',
                      '$2b$10$6B7TrAr6wfSGbc/t3WQCv.A0orfSgM/BSFoNrvLHMwDDdIuPdH0eG'
                  );

INSERT INTO users (
                      id_user,
                      name,
                      email,
                      password
                  )
                  VALUES (
                      21,
                      'Roberto Irineu',
                      'roberto@gmail.com',
                      '$2b$10$Ud4sPBQdNX08NvRdsarQPuDpD8BfEF7QqktrfMg3HLb2gJVnKDHRe'
                  );

INSERT INTO users (
                      id_user,
                      name,
                      email,
                      password
                  )
                  VALUES (
                      22,
                      'Carolina Silva',
                      'carolina@gmail.com',
                      '$2b$10$PEzWNjzrh0v7wwRidXoDdelE8Qr3NXgUPG1oiKruRghmP0fEsG/Ey'
                  );


COMMIT TRANSACTION;
PRAGMA foreign_keys = on;
