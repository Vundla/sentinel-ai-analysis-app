# Sentinel AI Moderation Platform Architecture

```
+-------------------+         +-------------------+         +-------------------+
|   Frontend (SPA)  | <-----> |   API Gateway     | <-----> |  Auth Service     |
|  (React/Vite)     |  REST   | (Express/REST)    |  REST   |  (JWT/OAuth)      |
+-------------------+         +-------------------+         +-------------------+
         |                            |                              |
         |                            v                              v
         |                  +-------------------+         +-------------------+
         |                  | Moderation Svc    | <-----> |  User Service     |
         |                  | (AI/NLP/ML)       |  REST   |  (Profile, Risk)  |
         |                  +-------------------+         +-------------------+
         |                            |
         |                            v
         |                  +-------------------+
         |                  | Event Bus         |  <--- Kafka/RabbitMQ/Pulsar
         |                  +-------------------+
         |                            |
         |                            v
         |                  +-------------------+
         |                  | Notification Svc  |
         |                  +-------------------+
         |                            |
         |                            v
         |                  +-------------------+
         |                  | Admin Dashboard   |
         |                  +-------------------+
         |                            |
         |                            v
         |                  +-------------------+
         |                  | Audit/Blockchain  |
         |                  +-------------------+
         |                            |
         |                            v
         |                  +-------------------+
         |                  | Database (MySQL)  |
         |                  +-------------------+
```

## Key Components
- **Frontend (React/Vite):** User, moderator, and admin interfaces. Connects to API Gateway.
- **API Gateway:** Central entry for all REST/gRPC calls. Handles routing, auth, rate limiting.
- **Auth Service:** JWT/OAuth for secure access.
- **Moderation Service:** AI/ML for NLP, sentiment, image, voice, and risk scoring.
- **User Service:** User profiles, risk scores, escalation.
- **Event Bus:** Kafka/RabbitMQ for real-time event streaming (alerts, moderation, etc).
- **Notification Service:** Sends alerts, emails, push notifications.
- **Admin Dashboard:** Real-time heatmaps, escalation, analytics.
- **Audit/Blockchain:** Immutable logs for compliance and trust.
- **Database:** MySQL for structured data, scalable for microservices.

## Data Flow
1. User submits report (frontend → API Gateway → Moderation Svc → DB/Event Bus).
2. AI/ML analyzes content, triggers alerts, updates risk scores.
3. Moderators/admins act via dashboard; actions logged immutably.
4. Notifications sent to users/moderators as needed.

---

**Next:** I will scaffold the backend and frontend folders/files and start wiring up the code and APIs.
