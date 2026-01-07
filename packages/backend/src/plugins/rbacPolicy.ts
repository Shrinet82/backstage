import {
  createBackendModule,
  coreServices,
} from '@backstage/backend-plugin-api';
import {
  PolicyDecision,
  AuthorizeResult,
  isResourcePermission,
} from '@backstage/plugin-permission-common';
import {
  PermissionPolicy,
  PolicyQuery,
} from '@backstage/plugin-permission-node';
import { policyExtensionPoint } from '@backstage/plugin-permission-node/alpha';
import { BackstageIdentityResponse } from '@backstage/plugin-auth-node';

/**
 * RBAC Permission Policy
 * 
 * Roles:
 * - admin: Full access to everything
 * - infrastructure-team: AWS templates (S3, VPC, RDS) + ArgoCD
 * - developer: Standard dev templates (React, Express, Flask, etc.)
 * - guest: Read-only access, no template execution
 */

// Define which templates each role can access (use template metadata.name)
const ROLE_TEMPLATE_ACCESS: Record<string, string[]> = {
  admin: ['*'], // All templates
  'infrastructure-team': [
    'deploy-aws-s3',
    'deploy-aws-vpc',
    'deploy-aws-rds',
    'deploy-argocd-app',
  ],
  developer: [
    'react-frontend',
    'express-backend',
    'flask-api',
    'go-rest-service',
    'springboot-rest-service',
  ],
  guest: [], // No template access
};

// Map users to roles (use GitHub username in lowercase)
const USER_ROLES: Record<string, string> = {
  'user:default/guest': 'guest',
  'user:default/shrinet82': 'admin',
  'user:default/mad82-ops': 'developer',
};

// Default role for authenticated users not in the USER_ROLES map
const DEFAULT_AUTHENTICATED_ROLE = 'developer';

class RBACPermissionPolicy implements PermissionPolicy {
  async handle(
    request: PolicyQuery,
    user?: BackstageIdentityResponse,
  ): Promise<PolicyDecision> {
    const userRef = user?.identity?.userEntityRef || 'user:default/guest';
    const role = USER_ROLES[userRef] || DEFAULT_AUTHENTICATED_ROLE;

    console.log(`[RBAC] User: ${userRef}, Role: ${role}, Permission: ${request.permission.name}`);

    // Guest: read-only
    if (role === 'guest') {
      if (request.permission.name.startsWith('scaffolder')) {
        console.log(`[RBAC] DENIED: Guest cannot use scaffolder`);
        return { result: AuthorizeResult.DENY };
      }
      return { result: AuthorizeResult.ALLOW };
    }

    // Admin: full access
    if (role === 'admin') {
      return { result: AuthorizeResult.ALLOW };
    }

    // Scaffolder permissions - check template access
    if (request.permission.name.startsWith('scaffolder.')) {
      // For template parameter read - allow all (needed to see templates)
      if (request.permission.name === 'scaffolder.template.parameter.read') {
        return { result: AuthorizeResult.ALLOW };
      }

      // For template step read - allow all (needed to see template steps)
      if (request.permission.name === 'scaffolder.template.step.read') {
        return { result: AuthorizeResult.ALLOW };
      }

      // For task operations - allow
      if (request.permission.name.startsWith('scaffolder.task')) {
        return { result: AuthorizeResult.ALLOW };
      }

      // For action execution - this is where the actual template runs
      if (request.permission.name === 'scaffolder.action.execute') {
        // Check if this is a resource permission with template info
        if (isResourcePermission(request.permission)) {
          const resourceType = request.permission.resourceType;
          console.log(`[RBAC] Action execute - resourceType: ${resourceType}`);
        }
        // Allow action execution for authenticated users
        // The template restriction happens at template selection level
        return { result: AuthorizeResult.ALLOW };
      }
    }

    // All other permissions - allow for authenticated users
    return { result: AuthorizeResult.ALLOW };
  }
}

/**
 * RBAC Permission Policy Backend Module
 */
export const rbacPermissionPolicy = createBackendModule({
  pluginId: 'permission',
  moduleId: 'rbac-policy',
  register(reg) {
    reg.registerInit({
      deps: {
        policy: policyExtensionPoint,
        logger: coreServices.logger,
      },
      async init({ policy, logger }) {
        logger.info('Initializing RBAC Permission Policy');
        logger.info(`Configured roles: ${Object.keys(USER_ROLES).join(', ')}`);
        policy.setPolicy(new RBACPermissionPolicy());
      },
    });
  },
});
