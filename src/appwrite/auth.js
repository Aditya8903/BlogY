/* eslint-disable no-useless-catch */
import { Account, Client, ID } from "appwrite";
import config from "../config/config";

export class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(config.appWriteUrl)
      .setProject(config.appWriteProjectId);
    this.account = new Account(this.client);
  }

  async createAccount({ email, password, name }) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );
      if (userAccount) {
        // Successfully created account, call login (optional)
        await this.login({ email, password }); // Call login if needed
        return userAccount;
      } else {
        throw new Error("Account creation failed"); // Handle creation failure
      }
    } catch (error) {
      throw error; // Re-throw for proper error handling
    }
  }

  async login({ email, password }) {
    try {
      const session = await this.account.createEmailSession(email, password);
      return session; // Return the session object
    } catch (error) {
      throw error; // Re-throw for proper error handling
    }
  }

  async getCurrentUser() {
    try {
      const session = await this.account.getSessions(); // Get active sessions
      if (session.length > 0) {
        // User is logged in, return account details
        const user = await this.account.get();
        return user;
      } else {
        return null; // User is not logged in
      }
    } catch (error) {
      console.error("Error getting current user:", error);
      return null; // Handle errors gracefully
    }
  }

  async logout() {
    try {
      await this.account.deleteSessions();
    } catch (error) {
      console.error("Error logging out:", error);
    }
  }
}

const authService = new AuthService();
export default authService;
