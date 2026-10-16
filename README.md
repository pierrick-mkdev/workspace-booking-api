# Workspace Booking API (.NET 9 & Azure)

<a href="https://victorious-smoke-0f5e1a50f.5.azurestaticapps.net">
  <img src="https://img.shields.io/badge/LIVE_APP_DEMO-success?style=for-the-badge&logo=azure" width="300" alt="Live App">
</a>
<br>
<a href="https://app-workspace-booking-prod-ayc5dffcgnhmh9dh.francecentral-01.azurewebsites.net/scalar/v1">
  <img src="https://img.shields.io/badge/API_Docs-blue?style=for-the-badge" width="180" alt="Live App">
</a>
<br>
<br>

Full-stack workspace reservation management platform built with .NET 9 and Angular, containerized with Docker, and deployed on Azure.

<br>

## Architecture & Tech Stack

[![Tech Stack](https://skillicons.dev/icons?i=dotnet,angular,ts,postgres,docker,azure)](https://skillicons.dev)

* **Frontend**: Angular, TypeScript, Angular Material, SCSS
* **Backend**: .NET 9, C#, ASP.NET Core Web API, Entity Framework Core
* **Database**: PostgreSQL, Azure Database for PostgreSQL Flexible Server
* **API Documentation**: OpenAPI, Scalar UI
* **DevOps & CI/CD**: Docker, GitHub Actions, GitHub Container Registry
* **Cloud Infrastructure**: Azure App Service, Azure Static Web Apps

<br>

## Local Testing

### Prerequisites
Docker Desktop installed and running.

### Installation Steps
1. **Clone the repository**
    ```
    git clone https://github.com/obiwanak/workspace-booking-api.git
    cd workspace-booking-api
    ```
   
   
2. **Start the environment**
    ```
    docker compose up -d
    ```
   
3. **Access the application:**
    * Frontend: http://localhost:4200
    * API Docs: http://localhost:8080/scalar/v1
    * Database: PostgreSQL listening on localhost:5432 (User: postgres, Password: postgrespassword)

