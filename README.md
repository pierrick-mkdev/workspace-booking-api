# Workspace Booking API (.NET 9 & Azure)

API REST for workspace reservation management, built with .NET 9, deployed to Azure with CI/CD pipeline.

[![Interactive API Docs](https://img.shields.io/badge/Interactive_API_Docs-blue?style=for-the-badge)](https://app-workspace-booking-prod-ayc5dffcgnhmh9dh.francecentral-01.azurewebsites.net/scalar/v1)

---

## Architecture & Tools

* **Backend**: .NET 9, C#, ASP.NET Core Web API
* **Database**: PostgreSQL, Entity Framework Core
* **API Documentation**: OpenAPI, Scalar UI
* **DevOps & CI/CD**: Docker, GitHub Actions, GitHub Container Registry
* **Cloud Infrastructure**: Azure App Service, Azure Database for PostgreSQL Flexible Server

---

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
   
3. Access the application:
    * Scalar Interactive Documentation: http://localhost:8080/scalar/v1
    * Database: PostgreSQL listening on localhost:5432 (User: postgres, Password: postgrespassword)

