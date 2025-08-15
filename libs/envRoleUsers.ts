export interface RoleUser {
  username: string;
  password?: string;
  capabilities: string[];
}

export const envRoleUsers: Record<string, Record<string, RoleUser>> = {
  local: {},
  dev: {},
  qa: {},
  preProd: {},
  prod: {}
}