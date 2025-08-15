import { Page } from "@playwright/test";
import { getDeploymentConfig, getSecret } from "./auth.secrets";
import { LoginPage } from "../pages/login.page";

export type loginFn = (page: Page, username: string, password?: string) => Promise<void>;

let loginPage;

/**
 * a login method for when a user is configured in AWS cognito
 */
export const cognitoLogin: loginFn = async (page, username) => {
  const stage = process.env.STAGE_NAME || 'main';
  const project = process.env.PROJECT || '';
  const deploymentConfig = await getDeploymentConfig(stage, project);
  const password = await getSecret(deploymentConfig.devPasswordArn);
  
  loginPage = new LoginPage(page);

  // application login process
  await loginPage.login(username, password);
}

/**
 * an alternative login method
 */
export const mfaLogin: loginFn = async (page, username, password) => {
  loginPage = new LoginPage(page);

  await loginPage.mfaLogin(username, password);
}

export const authStrategyMap: Record<string, Record<string, loginFn>> = {
  local: {
    userA: cognitoLogin
  },
  dev: {},
  qa: {},
  preProd: {},
  prod: {
    userB: mfaLogin
  }
}

