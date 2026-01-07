# 🚀 OPSIE - Internal Developer Platform

A production-grade **Internal Developer Platform (IDP)** built with [Backstage](https://backstage.io/), enabling self-service multi-cloud infrastructure provisioning, GitOps deployments, Kubernetes workload visibility, and integrated observability.

![Backstage](https://img.shields.io/badge/Backstage-IDP-blueviolet?style=for-the-badge&logo=backstage)
![Terraform](https://img.shields.io/badge/Terraform-IaC-purple?style=for-the-badge&logo=terraform)
![AWS](https://img.shields.io/badge/AWS-Cloud-orange?style=for-the-badge&logo=amazon-aws)
![Kubernetes](https://img.shields.io/badge/Kubernetes-Orchestration-blue?style=for-the-badge&logo=kubernetes)
![ArgoCD](https://img.shields.io/badge/ArgoCD-GitOps-red?style=for-the-badge&logo=argo)

---

## 📋 Table of Contents

- [Features Overview](#-features-overview)
- [Platform Architecture](#-platform-architecture)
- [Multi-Cloud Infrastructure](#-multi-cloud-infrastructure)
- [Self-Service Templates](#-self-service-templates)
- [GitOps & ArgoCD](#-gitops--argocd)
- [Role-Based Access Control](#-role-based-access-control)
- [Observability Stack](#-observability-stack)
- [Getting Started](#-getting-started)
- [Configuration Reference](#-configuration-reference)

> 📚 **Full Technical Documentation**: See [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) for comprehensive implementation details.

---

## ✨ Features Overview

### Core Capabilities

| Feature                         | Description                                                   | Status    |
| ------------------------------- | ------------------------------------------------------------- | --------- |
| **Multi-Cloud Provisioning**    | Provision infrastructure across AWS, GCP, Azure via Terraform | ✅ Active |
| **Self-Service Infrastructure** | S3, VPC, RDS through a developer-friendly UI                  | ✅ Active |
| **Role-Based Access Control**   | GitHub OAuth + custom RBAC policy                             | ✅ Active |
| **GitOps Deployments**          | Deploy K8s apps via ArgoCD templates                          | ✅ Active |
| **Cost Estimation**             | Infracost shows monthly costs before provisioning             | ✅ Active |
| **Email Notifications**         | Automated Gmail alerts for all events                         | ✅ Active |
| **Resource Tagging**            | Governance tags (owner, cost center)                          | ✅ Active |
| **Grafana Observability**       | Embedded dashboards in entity pages                           | ✅ Active |
| **Kubernetes Integration**      | Pod/service visibility per component                          | ✅ Active |
| **Software Catalog**            | Centralized service registry                                  | ✅ Active |
| **TechDocs**                    | Integrated documentation                                      | ✅ Active |

### Why This Platform?

```mermaid
graph LR
    subgraph Before["❌ Without IDP"]
        D1[Developer] -->|Create Ticket| T1[Ops Team]
        T1 -->|Manual Process| I1[Infrastructure]
        T1 -->|Days/Weeks| D1
    end

    subgraph After["✅ With OPSIE IDP"]
        D2[Developer] -->|Self-Service| P1[OPSIE Platform]
        P1 -->|Automated| I2[Infrastructure]
        P1 -->|Minutes| D2
    end
```

| Metric                        | Without IDP     | With OPSIE            |
| ----------------------------- | --------------- | --------------------- |
| Time to provision S3          | 2-5 days        | **5 minutes**         |
| Infrastructure requests/month | ~50 tickets     | **Self-service**      |
| Cost visibility               | Post-deployment | **Pre-deployment**    |
| Governance compliance         | Manual audit    | **Automated tagging** |

---

## 🏗️ Platform Architecture

### High-Level Overview

```mermaid
graph TB
    subgraph Users["👥 Users"]
        ADMIN[Admin]
        DEV[Developers]
        GUEST[Guests]
    end

    subgraph IDP["🏗️ OPSIE Platform"]
        subgraph Frontend["Frontend Layer"]
            UI[React UI]
            CATALOG[Software Catalog]
            SCAFFOLDER[Scaffolder]
            TECHDOCS[TechDocs]
        end

        subgraph Backend["Backend Layer"]
            API[Node.js Backend]
            AUTH[GitHub OAuth]
            RBAC[RBAC Policy]
            PROXY[Proxy Layer]
        end
    end

    subgraph Automation["⚙️ Automation"]
        GH[GitHub Actions]
        TF[Terraform]
        ARGO[ArgoCD]
    end

    subgraph Cloud["☁️ Cloud Infrastructure"]
        AWS[AWS]
        GCP[GCP]
        AZURE[Azure]
        K8S[Kubernetes]
    end

    subgraph Observability["📊 Observability"]
        GRAF[Grafana]
        PROM[Prometheus]
    end

    Users --> UI
    UI --> API
    API --> RBAC
    API --> PROXY
    PROXY --> GH
    PROXY --> ARGO
    PROXY --> GRAF
    GH --> TF
    TF --> AWS
    TF --> GCP
    TF --> AZURE
    ARGO --> K8S
    K8S --> PROM
    PROM --> GRAF
```

### Component Stack

| Layer             | Component  | Technology           | Purpose                     |
| ----------------- | ---------- | -------------------- | --------------------------- |
| **Frontend**      | UI         | React + TypeScript   | User interface              |
| **Frontend**      | Catalog    | Backstage Catalog    | Service registry            |
| **Frontend**      | Scaffolder | Backstage Scaffolder | Template execution          |
| **Backend**       | API        | Node.js              | Business logic              |
| **Backend**       | Auth       | GitHub OAuth         | Authentication              |
| **Backend**       | RBAC       | Custom Policy        | Authorization               |
| **Automation**    | Workflows  | GitHub Actions       | CI/CD pipelines             |
| **Automation**    | IaC        | Terraform            | Infrastructure provisioning |
| **Automation**    | GitOps     | ArgoCD               | Kubernetes deployments      |
| **Observability** | Metrics    | Prometheus           | Data collection             |
| **Observability** | Dashboards | Grafana              | Visualization               |

---

## ☁️ Multi-Cloud Infrastructure

OPSIE enables provisioning across multiple cloud providers through a unified interface.

### Multi-Cloud Architecture

```mermaid
graph TB
    subgraph OPSIE["🏗️ OPSIE Platform"]
        TEMPLATE[Scaffolder Template]
        WORKFLOW[GitHub Actions]
    end

    subgraph Terraform["⚙️ Terraform Providers"]
        AWS_TF[AWS Provider]
        GCP_TF[GCP Provider]
        AZURE_TF[Azure Provider]
    end

    subgraph AWS["☁️ Amazon Web Services"]
        S3[(S3 Buckets)]
        VPC_AWS[VPC Networks]
        RDS[(RDS Databases)]
        EKS[EKS Clusters]
    end

    subgraph GCP["☁️ Google Cloud Platform"]
        GCS[(Cloud Storage)]
        VPC_GCP[VPC Networks]
        CLOUDSQL[(Cloud SQL)]
        GKE[GKE Clusters]
    end

    subgraph Azure["☁️ Microsoft Azure"]
        BLOB[(Blob Storage)]
        VNET[Virtual Networks]
        AZURESQL[(Azure SQL)]
        AKS[AKS Clusters]
    end

    TEMPLATE --> WORKFLOW
    WORKFLOW --> AWS_TF
    WORKFLOW --> GCP_TF
    WORKFLOW --> AZURE_TF
    AWS_TF --> AWS
    GCP_TF --> GCP
    AZURE_TF --> Azure
```

### Supported Resources by Cloud

| Resource Type      | AWS                     | GCP              | Azure           |
| ------------------ | ----------------------- | ---------------- | --------------- |
| **Object Storage** | S3 Buckets ✅           | Cloud Storage 🔄 | Blob Storage 🔄 |
| **Networking**     | VPC ✅                  | VPC 🔄           | VNet 🔄         |
| **Databases**      | RDS MySQL/PostgreSQL ✅ | Cloud SQL 🔄     | Azure SQL 🔄    |
| **Kubernetes**     | EKS 🔄                  | GKE 🔄           | AKS 🔄          |

> ✅ = Active | 🔄 = Extensible (template structure ready)

---

## 🛠️ Self-Service Templates

### How Templates Work

```mermaid
sequenceDiagram
    participant Dev as Developer
    participant BS as Backstage
    participant GH as GitHub Actions
    participant IC as Infracost
    participant TF as Terraform
    participant Cloud as Cloud Provider
    participant Email as Email Service

    Dev->>BS: 1. Select Template & Fill Form
    BS->>GH: 2. Trigger workflow_dispatch
    GH->>TF: 3. terraform init
    GH->>IC: 4. infracost breakdown
    IC-->>GH: 5. Cost estimate
    GH->>TF: 6. terraform plan
    GH->>TF: 7. terraform apply
    TF->>Cloud: 8. Create resources
    Cloud-->>TF: 9. Resources created
    GH->>Email: 10. Send notification
    Email-->>Dev: "Infrastructure provisioned!"
```

### Available Templates

#### AWS S3 Bucket Template

| Aspect                | Details                                           |
| --------------------- | ------------------------------------------------- |
| **Purpose**           | Create S3 buckets with versioning, encryption     |
| **Parameters**        | bucketName, region, versioning, owner, costCenter |
| **Resources Created** | S3 Bucket, Bucket Policy, Encryption Config       |
| **Cost Estimation**   | ✅ Enabled                                        |
| **Notifications**     | ✅ Email alerts                                   |

#### AWS VPC Template

| Aspect                | Details                                |
| --------------------- | -------------------------------------- |
| **Purpose**           | Create complete network infrastructure |
| **Parameters**        | vpcName, cidrBlock, subnets, region    |
| **Resources Created** | VPC, Subnets, Route Tables, IGW, NAT   |
| **Cost Estimation**   | ✅ Enabled                             |
| **Notifications**     | ✅ Email alerts                        |

#### AWS RDS Template

| Aspect                | Details                                         |
| --------------------- | ----------------------------------------------- |
| **Purpose**           | Deploy managed MySQL/PostgreSQL databases       |
| **Parameters**        | dbName, engine, instanceClass, storage, multiAz |
| **Resources Created** | RDS Instance, Parameter Groups, Security Groups |
| **Cost Estimation**   | ✅ Enabled                                      |
| **Notifications**     | ✅ Email alerts                                 |

#### ArgoCD Deployment Template

| Aspect                | Details                                       |
| --------------------- | --------------------------------------------- |
| **Purpose**           | Deploy applications to Kubernetes via GitOps  |
| **Parameters**        | appName, repoUrl, path, namespace, syncPolicy |
| **Resources Created** | ArgoCD Application, K8s Resources             |
| **Sync Policies**     | Manual or Automated                           |
| **Notifications**     | ✅ Email alerts                               |

---

## 🔄 GitOps & ArgoCD

### What is GitOps?

GitOps is a paradigm where **Git is the single source of truth** for infrastructure and applications.

```mermaid
graph LR
    subgraph Developer
        CODE[Write Code]
        COMMIT[Git Commit]
    end

    subgraph Git["Git Repository"]
        REPO[(GitHub)]
        MANIFESTS[K8s Manifests]
    end

    subgraph ArgoCD
        SYNC[Continuous Sync]
        HEALTH[Health Monitoring]
    end

    subgraph Kubernetes
        DEPLOY[Deployments]
        PODS[Pods]
        SVC[Services]
    end

    CODE --> COMMIT
    COMMIT --> REPO
    REPO --> MANIFESTS
    MANIFESTS --> SYNC
    SYNC --> DEPLOY
    DEPLOY --> PODS
    DEPLOY --> SVC
    HEALTH --> DEPLOY
```

### ArgoCD Deployment Flow

```mermaid
sequenceDiagram
    participant Dev as Developer
    participant BS as Backstage
    participant GH as GitHub Actions
    participant ARGO as ArgoCD
    participant K8S as Kubernetes

    Dev->>BS: Fill deployment form
    BS->>GH: Trigger workflow
    GH->>ARGO: argocd app create
    ARGO-->>GH: Application created
    GH->>ARGO: argocd app sync
    ARGO->>K8S: Apply manifests
    K8S-->>ARGO: Resources deployed
    ARGO-->>BS: Status visible in tab
    BS-->>Dev: Monitor in ArgoCD tab
```

### Backstage ArgoCD Tab

| Information            | Description                    |
| ---------------------- | ------------------------------ |
| **Application Name**   | ArgoCD app identifier          |
| **Sync Status**        | Synced, OutOfSync, Unknown     |
| **Health Status**      | Healthy, Degraded, Progressing |
| **Last Synced**        | Timestamp of last sync         |
| **Deployment History** | All previous deployments       |

---

## 🔐 Role-Based Access Control

### Authentication Flow

```mermaid
sequenceDiagram
    participant User as User
    participant BS as Backstage
    participant GH as GitHub OAuth
    participant RBAC as RBAC Policy

    User->>BS: Click "Sign in with GitHub"
    BS->>GH: Redirect to OAuth
    GH->>User: Request authorization
    User->>GH: Approve
    GH->>BS: Return access token
    BS->>RBAC: Check user role
    RBAC-->>BS: Role: admin/developer/guest
    BS-->>User: Access granted with role
```

### Role Definitions

| Role                    | Templates Access      | Catalog Access  | Description              |
| ----------------------- | --------------------- | --------------- | ------------------------ |
| **admin**               | All templates         | Full read/write | Platform administrators  |
| **infrastructure-team** | AWS, ArgoCD templates | Full read/write | Infrastructure engineers |
| **developer**           | App templates only    | Full read/write | Application developers   |
| **guest**               | No templates          | Read only       | Unauthenticated viewers  |

### Permission Decision Flow

```mermaid
flowchart TD
    REQ[Permission Request] --> AUTH{Authenticated?}
    AUTH -->|No| GUEST[Guest Role]
    AUTH -->|Yes| ROLE[Get User Role]

    GUEST --> READ{Read Permission?}
    READ -->|Yes| ALLOW[✅ ALLOW]
    READ -->|No| DENY[❌ DENY]

    ROLE --> ADMIN{Is Admin?}
    ADMIN -->|Yes| ALLOW
    ADMIN -->|No| CHECK[Check Role Permissions]
    CHECK -->|Has Permission| ALLOW
    CHECK -->|No Permission| DENY
```

### User-Role Configuration

```typescript
// packages/backend/src/plugins/rbacPolicy.ts
const USER_ROLES: Record<string, string> = {
  'user:default/guest': 'guest',
  'user:default/shrinet82': 'admin',
  'user:default/mad82-ops': 'developer',
};
```

---

## 📊 Observability Stack

### Observability Architecture

```mermaid
graph TB
    subgraph Kubernetes["☸️ Kubernetes Cluster"]
        subgraph Applications
            POD1[Pod 1]
            POD2[Pod 2]
            POD3[Pod 3]
        end

        subgraph Monitoring
            PROM[(Prometheus)]
            ALERT[Alertmanager]
        end
    end

    subgraph Visualization
        GRAF[Grafana]
        DASH[Dashboards]
    end

    subgraph Backstage["🏗️ OPSIE"]
        ENTITY[Entity Page]
        GRAF_TAB[Grafana Tab]
        K8S_TAB[Kubernetes Tab]
        ARGO_TAB[ArgoCD Tab]
    end

    POD1 -->|Metrics| PROM
    POD2 -->|Metrics| PROM
    POD3 -->|Metrics| PROM
    PROM --> ALERT
    PROM --> GRAF
    GRAF --> DASH
    DASH --> GRAF_TAB
    GRAF_TAB --> ENTITY
    POD1 --> K8S_TAB
    K8S_TAB --> ENTITY
    ARGO_TAB --> ENTITY
```

### Entity Page Tabs

| Tab            | Source         | Information                 |
| -------------- | -------------- | --------------------------- |
| **Overview**   | Catalog        | Entity details, ownership   |
| **CI/CD**      | GitHub Actions | Build and deployment status |
| **Kubernetes** | K8s API        | Pods, deployments, services |
| **Grafana**    | Grafana API    | Embedded dashboards         |
| **ArgoCD**     | ArgoCD API     | Sync status, health         |
| **Docs**       | TechDocs       | Generated documentation     |

### Grafana Configuration

```yaml
# Entity annotation for Grafana
metadata:
  annotations:
    grafana/dashboard-selector: "tags @> 'kubernetes'"
    grafana/overview-dashboard: 'http://grafana/d/xxxxx?kiosk'
```

---

## 🚀 Getting Started

### Prerequisites

| Requirement | Version | Purpose             |
| ----------- | ------- | ------------------- |
| Node.js     | 18+     | Runtime             |
| Yarn        | 1.x     | Package manager     |
| Docker      | Latest  | TechDocs generation |
| kubectl     | Latest  | Kubernetes CLI      |

### Quick Start

```bash
# Clone repository
git clone https://github.com/Shrinet82/backstage.git
cd backstage

# Install dependencies
yarn install

# Configure environment
cp .env.example .env
# Edit .env with your credentials

# Start development server
export $(cat .env | xargs) && yarn start
```

### Environment Variables

| Variable               | Description               | Required |
| ---------------------- | ------------------------- | -------- |
| `BACKEND_SECRET`       | Backend auth secret       | ✅       |
| `GITHUB_TOKEN`         | GitHub PAT                | ✅       |
| `GITHUB_CLIENT_ID`     | OAuth App ID              | ✅       |
| `GITHUB_CLIENT_SECRET` | OAuth App Secret          | ✅       |
| `K8S_URL`              | Kubernetes API URL        | ✅       |
| `K8S_TOKEN`            | K8s service account token | ✅       |
| `GRAFANA_AUTH`         | Grafana auth (base64)     | ✅       |
| `ARGOCD_PASSWORD`      | ArgoCD admin password     | ✅       |

---

## ⚙️ Configuration Reference

### Project Structure

```
backstage/
├── app-config.yaml              # Main configuration
├── packages/
│   ├── app/                     # Frontend (React)
│   │   └── src/
│   │       ├── App.tsx          # Main app
│   │       └── components/
│   │           └── catalog/
│   │               └── EntityPage.tsx  # Entity tabs
│   └── backend/                 # Backend (Node.js)
│       └── src/
│           ├── index.ts         # Plugin registration
│           └── plugins/
│               └── rbacPolicy.ts  # RBAC implementation
├── examples/
│   └── templates/               # Scaffolder templates
│       ├── aws-s3/
│       ├── aws-vpc/
│       ├── aws-rds/
│       └── argocd-deploy/
├── catalog/                     # Catalog entities
│   ├── services/
│   ├── systems/
│   └── org/                     # Users & Groups
└── docs/                        # Documentation
    └── ARCHITECTURE.md          # Full technical docs
```

### Resource Tagging Policy

| Tag           | Description        | Example         |
| ------------- | ------------------ | --------------- |
| `Project`     | Project identifier | `backstage-idp` |
| `Environment` | Deploy environment | `production`    |
| `Owner`       | Resource owner     | `platform-team` |
| `ManagedBy`   | Provisioning tool  | `terraform`     |
| `CostCenter`  | Billing allocation | `engineering`   |

---

## 📄 License

This project is for portfolio demonstration purposes.

---

## 👤 Author

**Shrinet82** - Platform Engineering

- GitHub: [@Shrinet82](https://github.com/Shrinet82)

---

_Built with ❤️ using Backstage, Terraform, ArgoCD, and Kubernetes_
