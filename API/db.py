import pymysql

# MYSQL_DATABASE_USER= 'lms_db_user'

# MYSQL_DATABASE_PASSWORD= 'lms_db_password'

MYSQL_DATABASE_USER= 'root'
# MYSQL_DATABASE_PASSWORD= ''
MYSQL_DATABASE_PASSWORD= 'password'

MYSQL_DATABASE_DB= 'lms'
MYSQL_DATABASE_HOST= 'localhost'
# Database connection config
def connect_mysql():
    return pymysql.connect(
        host=MYSQL_DATABASE_HOST, user = MYSQL_DATABASE_USER, passwd = MYSQL_DATABASE_PASSWORD, database = MYSQL_DATABASE_DB,
        autocommit = True, charset = 'utf8mb4', port= 3306,
        cursorclass = pymysql.cursors.DictCursor)
