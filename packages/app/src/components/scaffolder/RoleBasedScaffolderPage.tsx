import React, { useMemo } from 'react';
import { ScaffolderPage, ScaffolderPageProps } from '@backstage/plugin-scaffolder';
import { useApi, identityApiRef } from '@backstage/core-plugin-api';
import { useAsync } from 'react-use';

/**
 * Role-based template configuration
 * Define which templates each role can see
 */
const ROLE_TEMPLATE_ACCESS: Record<string, string[]> = {
  admin: ['*'], // All templates
  'infrastructure-team': [
    'create-aws-s3-bucket',
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
  guest: [], // No templates
};

// Map users to roles (GitHub username in lowercase)
const USER_ROLES: Record<string, string> = {
  'user:default/guest': 'guest',
  'user:default/shrinet82': 'admin',
  'user:default/mad82-ops': 'developer',
};

const DEFAULT_ROLE = 'developer';

/**
 * Custom ScaffolderPage that filters templates based on user role
 */
export const RoleBasedScaffolderPage = (props: ScaffolderPageProps) => {
  const identityApi = useApi(identityApiRef);
  
  const { value: identity } = useAsync(async () => {
    return await identityApi.getBackstageIdentity();
  }, [identityApi]);

  const userRef = identity?.userEntityRef || 'user:default/guest';
  const role = USER_ROLES[userRef] || DEFAULT_ROLE;
  const allowedTemplates = ROLE_TEMPLATE_ACCESS[role] || [];
  
  // Log for debugging
  console.log(`[ScaffolderRBAC] User: ${userRef}, Role: ${role}`);
  console.log(`[ScaffolderRBAC] Allowed templates:`, allowedTemplates);

  // Create template groups filter based on role
  const templateGroups = useMemo(() => {
    // If admin, show all templates
    if (allowedTemplates.includes('*')) {
      return undefined; // No filter, show all
    }

    // If no templates allowed, return empty array
    if (allowedTemplates.length === 0) {
      return [
        {
          title: 'No Access',
          filter: () => false,
        },
      ];
    }

    // Filter templates based on role
    return [
      {
        title: 'Available Templates',
        filter: (entity: { metadata: { name: string } }) => {
          const templateName = entity.metadata.name;
          const isAllowed = allowedTemplates.some(
            allowed => templateName === allowed || templateName.includes(allowed)
          );
          console.log(`[ScaffolderRBAC] Template "${templateName}" allowed: ${isAllowed}`);
          return isAllowed;
        },
      },
    ];
  }, [allowedTemplates]);

  return (
    <ScaffolderPage
      {...props}
      groups={templateGroups}
    />
  );
};
