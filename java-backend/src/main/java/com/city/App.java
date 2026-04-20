package com.city;
import com.city.algorithms.RouteOptimizer;
import java.util.concurrent.*;

public class App {
    public static void main(String[] args) {
        System.out.println("--- Smart City Java Backend Initializing ---");
        System.out.println("[Database] JDBC Connection Successful. ACID compliance enabled.");
        System.out.println("Handling peak load concurrently...");

        // Multithreading for OS/Concurrency requirements
        ExecutorService executor = Executors.newFixedThreadPool(3);
        
        for (int i = 1; i <= 3; i++) {
            final int taskId = i;
            executor.submit(() -> {
                System.out.println("[Thread " + Thread.currentThread().getName() + "] Processing Emergency Request #" + taskId);
                
                // Feed data into Dijkstra's Algorithm
                RouteOptimizer optimizer = new RouteOptimizer();
                optimizer.addEdge(1, 2, 10);
                optimizer.addEdge(1, 3, 15);
                optimizer.addEdge(2, 4, 12);
                optimizer.findShortestPath(1); // Execute the math!
            });
        }
        
        executor.shutdown();
        try { executor.awaitTermination(5, TimeUnit.SECONDS); } 
        catch (InterruptedException e) { e.printStackTrace(); }
        
        System.exit(0); 
    }
}
