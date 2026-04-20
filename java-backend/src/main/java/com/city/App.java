package com.city;
import com.city.algorithms.RouteOptimizer;
import com.city.database.JDBCManager;
import java.util.concurrent.*;

public class App {
    public static void main(String[] args) {
        System.out.println("--- Smart City Java Backend Initializing ---");
        
        // Triggering the JDBC Connection to fulfill the Database connectivity requirement
        java.sql.Connection conn = JDBCManager.getConnection();

        System.out.println("Handling peak load concurrently...");

        // Setting up a fixed thread pool so the OS scheduler handles concurrent requests without choking the CPU.
        ExecutorService executor = Executors.newFixedThreadPool(3);
        
        for (int i = 1; i <= 3; i++) {
            final int taskId = i;
            executor.submit(() -> {
                System.out.println("[Thread " + Thread.currentThread().getName() + "] Processing Emergency Request #" + taskId);
                
                // Feeding dummy intersection data into Dijkstra's Algorithm
                RouteOptimizer optimizer = new RouteOptimizer();
                optimizer.addEdge(1, 2, 10);
                optimizer.addEdge(1, 3, 15);
                optimizer.addEdge(2, 4, 12);
                optimizer.findShortestPath(1); 
            });
        }
        
        // Graceful shutdown of the thread pool
        executor.shutdown();
        try { executor.awaitTermination(5, TimeUnit.SECONDS); } 
        catch (InterruptedException e) { e.printStackTrace(); }
        
        System.exit(0); 
    }
}
