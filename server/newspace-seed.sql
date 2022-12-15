-- both test users have the password "password"

INSERT INTO users (username, password, first_name, last_name, email, is_admin)
VALUES ('testuser',
        '$2b$12$AZH7virni5jlTTiGgEg4zu3lSvAw68qVEfSIOjJ3RqtbJbdW/Oi5q',
        'Test',
        'User',
        'joel@joelburton.com',
        FALSE),
        ('changster',
        '$2b$12$8J3dTF7TpkLqzsZJWzTe3uU/mI8xs.GxMGV/hgD8pvVngAwN8bJjW',
        'Amber',
        'Woo',
        'amber@email.com',
        TRUE),
       ('testadmin',
        '$2b$12$AZH7virni5jlTTiGgEg4zu3lSvAw68qVEfSIOjJ3RqtbJbdW/Oi5q',
        'Test',
        'Admin!',
        'joel@joelburton.com',
        TRUE);

INSERT INTO posts (image_url, body, posted_at, posted_by)
VALUES ('https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/cute-cat-photos-1593441022.jpg?crop=0.670xw:1.00xh;0.167xw,0&resize=640:*',
        'Saw this really cute cat OMG',
        '11-26-2022',
        'testuser'),
        ('https://hips.hearstapps.com/wdy.h-cdn.co/assets/17/39/1506709524-cola-0247.jpg?crop=1.00xw:0.750xh;0,0.226xh&resize=480:*',
        'I love dogs so so much',
        '11-26-2022',
        'testadmin'),
        ('https://images.unsplash.com/photo-1444464666168-49d633b86797?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8YmlyZHxlbnwwfHwwfHw%3D&w=1000&q=80',
        'birds are cool too!!',
        '11-29-2022',
        'changster');

INSERT INTO usersfavoriteposts (username, post_id)
VALUES ('changster', 
        1),
        ('testuser', 
        1),
        ('testuser', 
        2),
        ('changster', 
        2);



        

        