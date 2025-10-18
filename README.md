# 📝 LAMP Stack To-Do List Application

A simple yet powerful **To-Do list web application** built on the classic **LAMP stack** (Linux, Apache, MySQL, Python).  
This project uses **Python’s Flask micro-framework** for the backend, showcasing a complete full-stack web development setup.

---

## ✨ Features

- ✅ **Create:** Add new tasks to your to-do list.  
- 📋 **Read:** View all existing tasks, sorted by creation date.  
- 🔄 **Update:** Mark tasks as **Done** or **Undo** to toggle their completion status.  
- ❌ **Delete:** Permanently remove tasks from the list.  

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-------------|
| **Operating System** | Linux (Debian / Ubuntu) |
| **Web Server** | Apache2 |
| **Database** | MySQL |
| **Backend Language** | Python |
| **Framework** | Flask |
| **Deployment** | WSGI (Web Server Gateway Interface) |

---

## 🚀 Setup and Installation

Follow these steps to set up and run the application on your server.

---

### 1️⃣ Prerequisites

Make sure you have the required packages installed:

```bash
sudo apt update
sudo apt install apache2 mysql-server python3 python3-pip libapache2-mod-wsgi-py3 python3.12-venv -y
````

---

### 2️⃣ Clone the Repository

```bash
# Clone the project into the /var/www directory
sudo git clone https://github.com/rayhq/lamp-todo-app.git /var/www/lamp-todo-app

# Navigate into the project directory
cd /var/www/lamp-todo-app
```

---

### 3️⃣ Database Setup

#### Log in to MySQL:

```bash
sudo mysql -u root
```

#### Run the following SQL commands (replace `your_password` with a strong password):

```sql
CREATE DATABASE todo_db;
CREATE USER 'todo_user'@'localhost' IDENTIFIED BY 'your_password';
GRANT ALL PRIVILEGES ON todo_db.* TO 'todo_user'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

#### Create the tasks table:

```bash
mysql -u todo_user -p todo_db
```

Then execute:

```sql
CREATE TABLE tasks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    completed BOOLEAN NOT NULL DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
EXIT;
```

---

### 4️⃣ Application Configuration

Create a `config.py` file to securely store your database credentials:

```bash
sudo nano config.py
```

Add this content:

```python
# File: config.py
db_config = {
    'host': 'localhost',
    'user': 'todo_user',
    'password': 'your_password',  # Use the password from above
    'database': 'todo_db'
}
```

---

### 5️⃣ Python Virtual Environment

Create and set up a virtual environment:

```bash
sudo python3 -m venv venv
source venv/bin/activate
sudo venv/bin/pip install Flask mysql-connector-python
deactivate
```

---

### 6️⃣ Apache Configuration

Create a new Virtual Host file:

```bash
sudo nano /etc/apache2/sites-available/todoapp.conf
```

Paste the configuration (replace `your_server_ip` with your server’s actual IP or domain):

```apache
<VirtualHost *:80>
    ServerName your_server_ip

    WSGIDaemonProcess todoapp user=www-data group=www-data threads=5 python-path=/var/www/lamp-todo-app/venv/lib/python3.12/site-packages
    WSGIScriptAlias / /var/www/lamp-todo-app/todo.wsgi

    <Directory /var/www/lamp-todo-app>
        WSGIProcessGroup todoapp
        WSGIApplicationGroup %{GLOBAL}
        Require all granted
    </Directory>

    ErrorLog ${APACHE_LOG_DIR}/error.log
    CustomLog ${APACHE_LOG_DIR}/access.log combined
</VirtualHost>
```

---

### 7️⃣ Final Steps & Launch

Set correct file permissions and enable your site:

```bash
sudo chown -R www-data:www-data /var/www/lamp-todo-app
sudo a2ensite todoapp.conf
sudo a2dissite 000-default.conf
sudo systemctl restart apache2
```

---

## 🖥️ Usage

Visit your server’s IP or domain in your browser:

```
http://your_server_ip
```

You’ll see the To-Do List web app running — ready to **add**, **complete**, and **delete** tasks!

---

## 📂 Project Structure

```
lamp-todo-app/
├── app.py
├── config.py
├── todo.wsgi
├── templates/
│   ├── index.html
├── static/
│   └── style.css
|   └── script.js
└── venv/
```



