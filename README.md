# LAMP Stack To-Do List Application

A simple yet powerful To-Do list web application built on the classic LAMP stack (Linux, Apache, MySQL, Python). This project uses Python's Flask micro-framework for the backend, showcasing a full-stack web development setup.

---

## ✨ Features

* **Create**: Add new tasks to your to-do list.
* **Read**: View all existing tasks, sorted by creation date.
* **Update**: Mark tasks as "Done" or "Undo" to toggle their completion status.
* **Delete**: Permanently remove tasks from the list.

---

## 🛠️ Tech Stack

* **Operating System**: Linux
* **Web Server**: Apache2
* **Database**: MySQL
* **Backend Language**: Python

  * **Framework**: Flask
* **Deployment**: WSGI (Web Server Gateway Interface)

---

## 🚀 Setup and Installation

Follow these steps to set up and run the application on your server.

### 1. Prerequisites

Ensure that you have the following installed on your system. This guide is tailored for Debian/Ubuntu-based systems.

```bash
sudo apt update
sudo apt install apache2 mysql-server python3 python3-pip libapache2-mod-wsgi-py3 python3.12-venv -y
```

### 2. Clone the Repository

Clone this repository to your server:

```bash
git clone https://github.com/rayhq/lamp-todo-app.git
cd lamp-todo-app
```

### 3. Database Setup

Create a new database and a dedicated user for the application.

1. Log in to MySQL as the root user:

```bash
sudo mysql -u root
```

2. Run the following SQL commands to create the database and user (replace `your_password` with a strong password):

```sql
CREATE DATABASE todo_db;
CREATE USER 'todo_user'@'localhost' IDENTIFIED BY 'your_password';
GRANT ALL PRIVILEGES ON todo_db.* TO 'todo_user'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

3. Log in as the new user and create the tasks table:

```bash
mysql -u todo_user -p todo_db
```

4. Create the tasks table with the following SQL:

```sql
CREATE TABLE tasks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    completed BOOLEAN NOT NULL DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
EXIT;
```

### 4. Application Configuration

The application requires a configuration file for database credentials. This file is intentionally ignored by Git for security reasons.

1. Create a file named `config.py` in the root of the project directory.

2. Add your database credentials as shown below:

```python
# File: config.py

db_config = {
    'host': 'localhost',
    'user': 'todo_user',
    'password': 'your_password',  # <-- Use the password you set above
    'database': 'todo_db'
}
```

### 5. Python Virtual Environment

Create a virtual environment and install the required dependencies.

```bash
# Create the environment
python3 -m venv venv

# Activate the environment
source venv/bin/activate

# Install dependencies
pip install Flask mysql-connector-python
```

### 6. Apache Configuration

To serve the application via Apache, you need to create a virtual host configuration file.

1. Create a new Apache configuration file (replace `your-project-name` with the name you choose for your project):

```bash
sudo nano /etc/apache2/sites-available/your-project-name.conf
```

2. Paste the following configuration (replace `your_username` and `your_server_ip`):

```apache
<VirtualHost *:80>
    ServerName your_server_ip

    WSGIDaemonProcess todoapp user=www-data group=www-data threads=5 python-path=/home/your_username/lamp-todo-app/venv/lib/python3.12/site-packages
    WSGIScriptAlias / /home/your_username/lamp-todo-app/todo.wsgi

    <Directory /home/your_username/lamp-todo-app>
        WSGIProcessGroup todoapp
        WSGIApplicationGroup %{GLOBAL}
        Require all granted
    </Directory>

    ErrorLog ${APACHE_LOG_DIR}/error.log
    CustomLog ${APACHE_LOG_DIR}/access.log combined
</VirtualHost>
```

### 7. Final Steps & Launch

Set the correct permissions and enable the site:

```bash
# Grant Apache access to your home and project directory (replace `your_username`)
sudo chmod 755 /home/your_username
sudo chown -R :www-data .
sudo chmod -R 775 .

# Enable the site (replace `your-project-name` with the filename)
sudo a2ensite your-project-name.conf
sudo a2dissite 000-default.conf

# Restart Apache
sudo systemctl restart apache2
```

---

## 🖥️ Usage

1. Open your web browser and navigate to your server’s IP address: `http://your_server_ip`
2. You should see the To-Do list application running.
3. From there, you can:

   * Add new tasks
   * Mark tasks as completed or undo their completion status
   * Delete tasks from your list

---

## 🔧 Troubleshooting

If you run into issues, here are some common problems and solutions:

1. **MySQL Connection Issues**: Make sure that your MySQL database is running, and your credentials in `config.py` are correct.

2. **Apache Configuration Errors**: Double-check your Apache virtual host configuration, especially the file paths and user permissions.

3. **Module Errors**: Ensure that all dependencies are installed in your virtual environment. Run `pip list` to verify.

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙋‍♂️ Contributing

Feel free to fork this repository and submit pull requests. If you find any bugs or have suggestions for improvements, open an issue and we’ll take a look!

---

This README should make it easy for anyone to set up and contribute to your To-Do list application. Let me know if you'd like me to refine it further!
