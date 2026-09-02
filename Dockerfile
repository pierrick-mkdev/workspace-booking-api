FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /src

COPY ["WorkSpace.Api/WorkSpace.Api.csproj", "WorkSpace.Api/"]
COPY ["WorkSpace.Api.Tests/WorkSpace.Api.Tests.csproj", "WorkSpace.Api.Tests/"]
RUN dotnet restore "WorkSpace.Api/WorkSpace.Api.csproj"

COPY . .
WORKDIR "/src/WorkSpace.Api"
RUN dotnet publish "WorkSpace.Api.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM mcr.microsoft.com/dotnet/aspnet:9.0-bookworm-slim AS final
WORKDIR /app
EXPOSE 8080
ENV ASPNETCORE_URLS=http://+:8080

COPY --from=build /app/publish .
ENTRYPOINT ["dotnet", "WorkSpace.Api.dll"]