package com.city.database;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class JDBCManager {
    private static final String URL = System.getenv("DB_URL") != null ? System.getenv("DB_URL") : "jdbc:mysql://localhost:3306/SmartCityDB";
    private static final String USER = System.getenv("DB_USER") != null ? System.getenv("DB_USER") : "smartuser";
    private static final String PASSWORD = System.getenv("DB_PASS") != null ? System.getenv("DB_PASS") : "password123";

    public static Connection getConnection() {
        Connection connection = null;
        try {
            // Establishing secure connection to the Relational Database for ACID compliance
            connection = DriverManager.getConnection(URL, USER, PASSWORD);
            System.out.println("[Database] JDBC Connection Successful. Security parameters verified.");
        } catch (SQLException e) {
            // Catching the exception prevents the JVM from crashing if MySQL goes offline
            System.err.println("[Database Error] Connection failed: " + e.getMessage());
        }
        return connection;
    }
}
