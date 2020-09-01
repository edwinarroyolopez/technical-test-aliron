import os;

# WEB
print('**** DEPLOY WEB FASE ****');
path_web = '/var/www/html/secret-friend/web'
os.chdir( path_web );
os.system('sudo npm install'); # install dependences web
# os.system('pm2 start npm --name "secret-friend-Web-Test" -- run start:test');


# SERVER

path_server = '/var/www/html/secret-friend/server';
os.chdir( path_server );
os.system('sudo npm install'); # install dependences server
print('server deployed...');