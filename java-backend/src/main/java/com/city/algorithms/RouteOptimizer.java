package com.city.algorithms;
import java.util.*;

public class RouteOptimizer {
    private Map<Integer, List<Node>> graph = new HashMap<>();

    static class Node implements Comparable<Node> {
        int vertex, weight;
        Node(int v, int w) { this.vertex = v; this.weight = w; }
        public int compareTo(Node other) { return Integer.compare(this.weight, other.weight); }
    }

    public void addEdge(int src, int dest, int weight) {
        graph.computeIfAbsent(src, k -> new ArrayList<>()).add(new Node(dest, weight));
    }

    // Greedy Method Implementation (Dijkstra)
    public void findShortestPath(int startNode) {
        PriorityQueue<Node> pq = new PriorityQueue<>();
        Map<Integer, Integer> distances = new HashMap<>();
        
        pq.add(new Node(startNode, 0));
        distances.put(startNode, 0);

        while (!pq.isEmpty()) {
            Node current = pq.poll();
            for (Node neighbor : graph.getOrDefault(current.vertex, new ArrayList<>())) {
                int newDist = distances.get(current.vertex) + neighbor.weight;
                if (newDist < distances.getOrDefault(neighbor.vertex, Integer.MAX_VALUE)) {
                    distances.put(neighbor.vertex, newDist);
                    pq.add(new Node(neighbor.vertex, newDist));
                }
            }
        }
        
        // Outputting the calculated data to verify the algorithm's efficiency
        System.out.println("   -> [Dijkstra] Optimized paths from Intersection " + startNode + ":");
        for (Map.Entry<Integer, Integer> entry : distances.entrySet()) {
            if (entry.getKey() != startNode) { 
                System.out.println("      * Fastest route to Intersection " + entry.getKey() + " is " + entry.getValue() + " minutes.");
            }
        }
    }
}
