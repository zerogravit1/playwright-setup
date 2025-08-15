import { Page } from "@playwright/test";

export class LoginPage {
  constructor(private readonly page: Page) {
    this.page = page;
  }

  async login(username, password) {
    console.log(username, password);
  }

  async mfaLogin(username, password) {
    console.log(username, password);
  }
}