# 🚀 Backstage Internal Developer Portal (IDP)

A fully-featured Internal Developer Portal built with [Backstage](https://backstage.io/), enabling self-service infrastructure provisioning, Kubernetes workload visibility, and integrated observability.

![Backstage](https://img.shields.io/badge/Backstage-IDP-blueviolet?style=for-the-badge&logo=backstage)
![Terraform](https://img.shields.io/badge/Terraform-IaC-purple?style=for-the-badge&logo=terraform)
![AWS](https://img.shields.io/badge/AWS-Cloud-orange?style=for-the-badge&logo=amazon-aws)
![Kubernetes](https://img.shields.io/badge/Kubernetes-Orchestration-blue?style=for-the-badge&logo=kubernetes)

---

## 📋 Table of Contents

- [Features](#-features)
- [Architecture](#-architecture)
- [Self-Service Templates](#-self-service-templates)
- [Observability](#-observability)
- [Getting Started](#-getting-started)
- [Project Structure](#-project-structure)

---

## ✨ Features

| Feature                         | Description                                          |
| ------------------------------- | ---------------------------------------------------- |
| **Self-Service Infrastructure** | Provision AWS resources (S3, VPC, RDS) through a UI  |
| **GitOps Workflow**             | Templates trigger GitHub Actions → Terraform → AWS   |
| **ArgoCD Integration**          | View deployment status, history, and sync apps       |
| **Kubernetes Integration**      | View and manage K8s workloads directly in Backstage  |
| **Grafana Observability**       | Embedded dashboards for real-time metrics            |
| **Software Catalog**            | Centralized service registry with ownership tracking |
| **TechDocs**                    | Integrated documentation for all services            |

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        DEVELOPER                                │
│                           │                                     │
│                           ▼                                     │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                   BACKSTAGE IDP                          │   │
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐   │   │
│  │  │   Catalog    │  │  Scaffolder  │  │   TechDocs   │   │   │
│  │  │   (Services) │  │  (Templates) │  │    (Docs)    │   │   │
│  │  └──────────────┘  └──────────────┘  └──────────────┘   │   │
│  │  ┌──────────────┐  ┌──────────────┐                     │   │
│  │  │  Kubernetes  │  │   Grafana    │                     │   │
│  │  │   Plugin     │  │   Plugin     │                     │   │
│  │  └──────────────┘  └──────────────┘                     │   │
│  └─────────────────────────────────────────────────────────┘   │
│                           │                                     │
│          ┌────────────────┼────────────────┐                   │
│          ▼                ▼                ▼                   │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐         │
│  │ GitHub Actions│  │  Kubernetes  │  │   Grafana    │         │
│  │  (Terraform)  │  │   Cluster    │  │  Dashboards  │         │
│  └──────────────┘  └──────────────┘  └──────────────┘         │
│          │                                                      │
│          ▼                                                      │
│  ┌──────────────────────────────────────────┐                  │
│  │              AWS CLOUD                    │                  │
│  │  ┌────────┐  ┌────────┐  ┌────────┐     │                  │
│  │  │   S3   │  │  VPC   │  │  RDS   │     │                  │
│  │  │ Bucket │  │Network │  │ MySQL  │     │                  │
│  │  └────────┘  └────────┘  └────────┘     │                  │
│  └──────────────────────────────────────────┘                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🛠️ Self-Service Templates

Developers can provision AWS infrastructure through the Backstage UI without AWS console access.

### Available Templates

| Template          | Description                    | Resources Created               |
| ----------------- | ------------------------------ | ------------------------------- |
| **AWS S3 Bucket** | Object storage with versioning | S3 Bucket, Bucket Policy        |
| **AWS VPC**       | Network infrastructure         | VPC, Subnets, Route Tables, IGW |
| **AWS RDS MySQL** | Managed database               | RDS Instance, Parameter Groups  |

### How It Works

```
1. Developer selects template in Backstage
2. Fills in parameters (bucket name, region, etc.)
3. Scaffolder triggers GitHub Actions workflow
4. GitHub Actions runs Terraform (plan/apply/destroy)
5. AWS resources are provisioned
6. Catalog entity is created automatically
```

### GitOps Repository

Infrastructure code: [github.com/Shrinet82/backstage-infra](https://github.com/Shrinet82/backstage-infra)

---

## �️ Enterprise Features

### Cost Estimation (Infracost)

Every template includes optional cost estimation powered by Infracost:

- Estimates monthly AWS costs before `apply`
- Helps prevent cost surprises
- Integrates with GitHub Actions workflow

### Destroy Safety

All templates include a **mandatory confirmation checkbox** for `destroy` actions:

- Prevents accidental infrastructure deletion
- Conditional step execution blocks destroy without confirmation
- Extra warning for database resources

### Email Notifications

Optional email notifications via Gmail:

- Get notified when infrastructure is provisioned
- Track who provisioned what resources
- Email validation ensures valid addresses

---

## �📊 Observability

### Grafana Integration

- **Embedded Dashboards**: View Kubernetes metrics directly in entity pages
- **Dashboard Selector**: Auto-discover dashboards by tags
- **Real-time Metrics**: CPU, Memory, Network usage

### Configuration

Entities are annotated with Grafana selectors:

```yaml
annotations:
  grafana/dashboard-selector: "tags @> 'example'"
  grafana/overview-dashboard: 'http://grafana-url/d/dashboard-id?kiosk'
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- Yarn 1.x
- Docker (for TechDocs generation)
- kubectl configured for your cluster

### Installation

```bash
# Clone the repository
git clone https://github.com/Shrinet82/backstage.git
cd backstage

# Install dependencies
yarn install

# Set up environment variables
cp .env.example .env
# Edit .env with your credentials

# Start the development server
yarn dev
```

### Environment Variables

| Variable       | Description                        |
| -------------- | ---------------------------------- |
| `GRAFANA_AUTH` | Base64 encoded Grafana credentials |
| `GITHUB_TOKEN` | GitHub personal access token       |

---

## 📁 Project Structure

```
backstage/
├── app-config.yaml          # Main configuration
├── packages/
│   ├── app/                  # Frontend application
│   │   └── src/components/
│   │       └── catalog/
│   │           └── EntityPage.tsx  # Entity page layouts
│   └── backend/              # Backend application
├── examples/
│   └── templates/            # Scaffolder templates
│       ├── aws-s3/           # S3 bucket provisioning
│       ├── aws-vpc/          # VPC network provisioning
│       ├── aws-rds/          # RDS database provisioning
│       └── ...               # Application templates
└── catalog/
    └── services/             # Service entity definitions
```

---

## 🏷️ Resource Tagging Policy

All provisioned AWS resources follow a standardized tagging policy:

| Tag           | Description              | Example                     |
| ------------- | ------------------------ | --------------------------- |
| `Project`     | Project identifier       | `backstage-idp`             |
| `Environment` | Deployment environment   | `development`, `production` |
| `Owner`       | Team or individual owner | `platform-team`             |
| `ManagedBy`   | Provisioning tool        | `terraform`                 |
| `CostCenter`  | Billing allocation       | `engineering`               |

---

## 📄 License

This project is for portfolio demonstration purposes.

---

## 👤 Author

**Shrinet82**

- GitHub: [@Shrinet82](https://github.com/Shrinet82)
