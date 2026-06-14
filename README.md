# QuizMaster

QuizMaster is a full-stack quiz management platform where users can register, log in, create quizzes, add questions, attempt quizzes, and track their quiz history.

## Tech Stack

### Frontend

* React
* Axios

### Backend

* Flask
* Flask-CORS
* bcrypt

### Database

* MySQL

---


## Installation

### Clone Repository

```bash
git clone <repository-url>
cd Quiz_maker
```

---

## Backend Setup

### Create Virtual Environment

```bash
python -m venv venv
```

### Activate Virtual Environment

Windows:

```bash
venv\Scripts\activate
```

Linux/Mac:

```bash
source venv/bin/activate
```

### Install Dependencies

```bash
pip install -r requirements.txt
```

---

## MySQL Database Setup

Create a database:

```sql
CREATE DATABASE quizz;
```

Create required tables:

### Users Table

```sql
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
);
```

### Quizzes Table

```sql
CREATE TABLE quizzes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    created_by INT,
    total_questions INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (created_by) REFERENCES users(id)
);
```

### Questions Table

```sql
CREATE TABLE questions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    quiz_id INT,
    question TEXT,
    option_a VARCHAR(255),
    option_b VARCHAR(255),
    option_c VARCHAR(255),
    option_d VARCHAR(255),
    correct_answer VARCHAR(10),
    FOREIGN KEY (quiz_id) REFERENCES quizzes(id)
);
```

### Attempts Table

```sql
CREATE TABLE attempts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    quiz_id INT,
    score INT,
    attempted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (quiz_id) REFERENCES quizzes(id)
);
```

---

## Environment Variables

Create a `.env` file inside the backend folder:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=quizz
DB_PORT=3306

SECRET_KEY=quizmaster-secret-key
JWT_SECRET_KEY=jwt-secret-key
```

---

## Run Backend

```bash
python app.py
```

---

## Run Frontend

Navigate to frontend:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start React:

```bash
npm start
```

---

