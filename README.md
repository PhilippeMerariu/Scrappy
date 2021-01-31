# container
Official repository for the container web application!

### Detailled installation for container application (with laragon!)

1. Install newest Laragon
2. Enable Postgresql (Right Click on Laragon -> Tools -> Quick Add -> PostgreSql X 
3. Download PHP 7.4 [Thread-safe] and PostgreSql 13 from their website
4. Add php 7.4 to php folder inside laragon (C:\laragon\bin\php)
5. Add Pgsql 13 to pgsql folder (C:\laragon\bin\postgresql)
6. Switch PHP & Pgsql version (Right click on Laragon -> PHP -> version -> select required.)
7. Go into pgAdmin 4 (Right click on Laragon -> postgresql -> pgAdmin 4) and create server [add name + host (second tab, host=localhost) ] 
8. Create database (name can be application), and check user & password required to connect to it.
9. Click on application to check if connection is good.
10. Enable required php extensions (Right click on Laragon -> PHP -> extensions-> select all pdo_extensions)
11. Edit php.ini file  (Right click on Laragon -> PHP -> php.ini) to increase memory_limit (search memory_limit and set to -1.)
12. Clone project inside www folder of laragon (C:\laragon\www)
13. Create .env file and add database connection information
14. Click on terminal inside Laragon window and cd into the project
15. write command ```composer config --global process-timeout 6000```
16. ```composer install``` to install backend dependencies
17. ```npm install``` to install frontend dependencies
18. ```php artisan migrate:fresh --seed``` to seed the db
19. ```npm run dev``` or ```npm run watch``` to compile frontend code.
Right click on laragon -> www -> application and it should work ! 

NB:

- If path in searchbar doesn't follow {name}.test, click on laragon->preferences and enable it !
- You can add nginx instead of apache if you want via the quick add menu
- If you have a 419 error after login, add SESSION_SECURE_COOKIE=falseto you .env file
- If you have trouble with loading your php extension, make sure php.ini file isn't the one loaded locally inside your computer ! It must be the one inside laragon. 
- If you still have trouble loading your php extension, make sure mbstring is loaded first inside your php.ini file
