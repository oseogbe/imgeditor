# ImgEditor Setup Guide

Follow these steps to set up this project built with Laravel 12, React 19 and Inertia.js:

## 1. Install Dependencies

Ensure all necessary dependencies are installed:

```bash
composer install
npm install
```

## 2. Configure Environment

Update your `.env` file with the correct database and application settings:

```env
APP_NAME="ImgEditor"
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=your_database
DB_USERNAME=your_username
DB_PASSWORD=your_password
```

## 3. Set Up Frontend

Build the frontend assets:

```bash
npm run dev
```

## 4. Run Migrations

Run database migrations to set up the database schema:

```bash
php artisan migrate
```

## 5. Link Storage

Create a symbolic link for the storage directory:

```bash
php artisan storage:link
```

## 6. Start Development Server

Start the Laravel development server:

```bash
php artisan serve
```

## 7. Access the Application

Visit your application in the browser at `http://localhost:8000`.

## 8. Additional Commands

- To watch for frontend changes:
    ```bash
    npm run watch
    ```
- To build assets for production:
    ```bash
    npm run build
    ```

You're all set!
