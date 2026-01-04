# GitHub Workflow Updates Guide

This guide explains how to update your `backstage-infra` GitHub workflows to support the new Backstage template features.

---

## New Inputs to Add

Add these inputs to **all your Terraform workflows** (`terraform-aws-deploy.yml`, `terraform-aws-vpc.yml`, `terraform-aws-rds.yml`):

```yaml
on:
  workflow_dispatch:
    inputs:
      # ... your existing inputs ...

      # NEW: Resource Tagging
      owner:
        description: 'Resource owner for tagging'
        required: false
        default: 'platform-team'
      cost_center:
        description: 'Cost center for billing'
        required: false
        default: 'engineering'

      # NEW: Cost Estimation
      enable_cost_estimation:
        description: 'Run Infracost cost estimation'
        required: false
        default: 'true'

      # NEW: Email Notification
      notify_email:
        description: 'Email address to notify on completion'
        required: false
        default: ''
```

---

## GitHub Secrets Required

Add these secrets in **Settings → Secrets and variables → Actions**:

| Secret                  | Description                               |
| ----------------------- | ----------------------------------------- |
| `AWS_ACCESS_KEY_ID`     | AWS credentials (you likely have this)    |
| `AWS_SECRET_ACCESS_KEY` | AWS credentials (you likely have this)    |
| `INFRACOST_API_KEY`     | Get free at https://www.infracost.io/     |
| `GMAIL_USERNAME`        | Your Gmail address                        |
| `GMAIL_APP_PASSWORD`    | Gmail App Password (not regular password) |

### Getting Gmail App Password:

1. Go to https://myaccount.google.com/apppasswords
2. Create new app password for "Mail"
3. Copy the 16-character password

---

## Complete Workflow Example

Here's a complete example for `terraform-aws-deploy.yml`:

```yaml
name: Terraform AWS S3 Deploy

on:
  workflow_dispatch:
    inputs:
      bucket_name:
        description: 'S3 Bucket Name'
        required: true
      aws_region:
        description: 'AWS Region'
        required: true
        default: 'us-east-1'
      environment:
        description: 'Environment'
        required: true
        default: 'development'
      owner:
        description: 'Resource owner'
        required: false
        default: 'platform-team'
      cost_center:
        description: 'Cost center'
        required: false
        default: 'engineering'
      action:
        description: 'Terraform action (plan/apply/destroy)'
        required: true
        default: 'plan'
      enable_cost_estimation:
        description: 'Run Infracost'
        required: false
        default: 'true'
      notify_email:
        description: 'Notification email'
        required: false
        default: ''

env:
  TF_VAR_bucket_name: ${{ inputs.bucket_name }}
  TF_VAR_aws_region: ${{ inputs.aws_region }}
  TF_VAR_environment: ${{ inputs.environment }}
  TF_VAR_owner: ${{ inputs.owner }}
  TF_VAR_cost_center: ${{ inputs.cost_center }}

jobs:
  terraform:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Configure AWS Credentials
        uses: aws-actions/configure-aws-credentials@v4
        with:
          aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
          aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          aws-region: ${{ inputs.aws_region }}

      - name: Setup Terraform
        uses: hashicorp/setup-terraform@v3
        with:
          terraform_version: 1.6.0

      - name: Terraform Init
        run: terraform init
        working-directory: ./s3

      - name: Terraform Plan
        if: ${{ inputs.action == 'plan' || inputs.action == 'apply' }}
        run: terraform plan -out=tfplan
        working-directory: ./s3

      # ============================================
      # NEW: INFRACOST COST ESTIMATION
      # ============================================
      - name: Setup Infracost
        if: ${{ inputs.enable_cost_estimation == 'true' && inputs.action != 'destroy' }}
        uses: infracost/actions/setup@v3
        with:
          api-key: ${{ secrets.INFRACOST_API_KEY }}

      - name: Run Infracost
        if: ${{ inputs.enable_cost_estimation == 'true' && inputs.action != 'destroy' }}
        run: |
          infracost breakdown --path ./s3 --format table
        continue-on-error: true

      # ============================================
      # TERRAFORM APPLY
      # ============================================
      - name: Terraform Apply
        if: ${{ inputs.action == 'apply' }}
        run: terraform apply -auto-approve tfplan
        working-directory: ./s3

      # ============================================
      # TERRAFORM DESTROY
      # ============================================
      - name: Terraform Destroy
        if: ${{ inputs.action == 'destroy' }}
        run: terraform destroy -auto-approve
        working-directory: ./s3

      # ============================================
      # NEW: EMAIL NOTIFICATION
      # ============================================
      - name: Send Email Notification
        if: ${{ inputs.notify_email != '' && (inputs.action == 'apply' || inputs.action == 'destroy') }}
        uses: dawidd6/action-send-mail@v3
        with:
          server_address: smtp.gmail.com
          server_port: 465
          secure: true
          username: ${{ secrets.GMAIL_USERNAME }}
          password: ${{ secrets.GMAIL_APP_PASSWORD }}
          subject: '✅ Backstage: ${{ inputs.bucket_name }} - ${{ inputs.action }} completed'
          to: ${{ inputs.notify_email }}
          from: 'Backstage IDP <${{ secrets.GMAIL_USERNAME }}>'
          body: |
            Hello,

            Your infrastructure request has been completed successfully!

            📦 Resource: ${{ inputs.bucket_name }}
            🌍 Region: ${{ inputs.aws_region }}
            🏷️ Environment: ${{ inputs.environment }}
            👤 Owner: ${{ inputs.owner }}
            💰 Cost Center: ${{ inputs.cost_center }}
            ⚡ Action: ${{ inputs.action }}

            View details: ${{ github.server_url }}/${{ github.repository }}/actions/runs/${{ github.run_id }}

            - Backstage IDP
```

---

## Terraform Variables Update

Update your `variables.tf` to include the new tagging variables:

```hcl
variable "owner" {
  description = "Resource owner for tagging"
  type        = string
  default     = "platform-team"
}

variable "cost_center" {
  description = "Cost center for billing"
  type        = string
  default     = "engineering"
}
```

Add tags to your resources:

```hcl
resource "aws_s3_bucket" "this" {
  bucket = var.bucket_name

  tags = {
    Name        = var.bucket_name
    Environment = var.environment
    Owner       = var.owner
    CostCenter  = var.cost_center
    ManagedBy   = "terraform"
    Project     = "backstage-idp"
  }
}
```

---

## Quick Checklist

- [ ] Add new inputs to all workflows
- [ ] Create `INFRACOST_API_KEY` secret
- [ ] Create `GMAIL_USERNAME` secret
- [ ] Create `GMAIL_APP_PASSWORD` secret
- [ ] Add Infracost step to workflows
- [ ] Add email notification step to workflows
- [ ] Update Terraform variables.tf
- [ ] Add tags to all resources

---

## Testing

1. Trigger a template from Backstage with `plan` action
2. Check GitHub Actions for Infracost output
3. Trigger with `apply` and your email
4. Verify you receive the notification email
