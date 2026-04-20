# Smart City Microservices Architecture 🏙️

A full-stack, polyglot microservices portal built to handle citizen registrations, real-time traffic rasterization, and emergency route optimization. This project was developed as a comprehensive exercise in web architecture, multithreading, and algorithmic efficiency.

## 🚀 Tech Stack
* **Frontend:** Angular (TypeScript, HTML5 Canvas)
* **API Gateway:** Node.js, Express.js
* **Database:** MongoDB, MySQL
* **Compute Engine:** Java (Multithreaded ExecutorService)
* **OS Environment:** Ubuntu Linux

## ⚙️ Core Features & Architecture
1.  **Web API Gateway:** A RESTful Node.js service that securely handles citizen registrations and writes to a MongoDB database.
2.  **Live Traffic Rasterization:** A dynamic HTML5 Canvas engine in Angular that fetches live data and graphically renders fluctuating vehicle traffic in real-time.
3.  **Algorithmic Route Optimization:** A Java-based compute engine implementing Dijkstra's Greedy Algorithm to calculate the absolute shortest paths for emergency vehicles.
4.  **OS-Level Concurrency:** The Java backend utilizes thread pools to process multiple intensive requests simultaneously without blocking the main execution thread.
5.  **ACID Compliant Transactions:** Secure JDBC integration for robust data handling.

## 💻 How to Run the Services

**1. Start the API Gateway & Database (Terminal 1)**
\`\`\`bash
cd api-gateway
node server.js
\`\`\`

**2. Start the Angular UI (Terminal 2)**
\`\`\`bash
cd smart-ui
ng serve
\`\`\`
*Access the dashboard at `http://localhost:4200`*

**3. Run the Route Optimization Engine (Terminal 3)**
\`\`\`bash
cd java-backend
mvn clean compile && mvn exec:java -Dexec.mainClass="com.city.App"
\`\`\`
