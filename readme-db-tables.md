Таблица users:
    id: INT
    name: string

Таблица segments
    id: INT
    name: string

Таблица user_segments:
    user_id: INT, FOREIGN KEY users
    segment_id: INT,FOREIGN KEY segments

