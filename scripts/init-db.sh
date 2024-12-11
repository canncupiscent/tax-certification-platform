#!/bin/sh

DB_PATH="/app/data/certifications.db"

# Check if database exists
if [ ! -f "$DB_PATH" ]; then
    echo "Initializing database..."
    
    # Create database and tables
    sqlite3 "$DB_PATH" << 'END_SQL'
    -- Create certifications table
    CREATE TABLE IF NOT EXISTS certifications (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id TEXT NOT NULL,
        certification_type TEXT NOT NULL,
        status TEXT NOT NULL,
        submission_date TEXT,
        expiration_date TEXT,
        form_data JSON,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    -- Create versions table for update checking
    CREATE TABLE IF NOT EXISTS versions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        version TEXT NOT NULL,
        installed_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    -- Create user_settings table
    CREATE TABLE IF NOT EXISTS user_settings (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id TEXT NOT NULL,
        settings JSON,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    -- Create audit_log table
    CREATE TABLE IF NOT EXISTS audit_log (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id TEXT NOT NULL,
        action TEXT NOT NULL,
        details JSON,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
    
    -- Insert initial version
    INSERT INTO versions (version) VALUES ('1.0.0');
END_SQL

    echo "Database initialized successfully"
else
    echo "Database already exists"
fi
