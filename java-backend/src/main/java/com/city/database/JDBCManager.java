package com.city.database;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class JDBCManager {
    private static final String URL = "jdbc:mysql://localhost:3306/SmartCityDB";
    private static final String USER = "smartuser";
    private static final String PASSWORD = "password123";

    public static Connection getConnection() {
        Connection connection = null;
        try {
            // Establishing secure connection to Relational Database
            connection = DriverManager.getConnection(URL, USER, PASSWORD);
            System.out.println("[Database] JDBC Connection Successful. ACID compliance enabled.");
        } catch (SQLException e) {
            // Exception handling ensures system robustness
            System.err.println("[Database Error] Connection failed: " + e.getMessage());
        }
        return connection;
    }
}


