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
    // eslint-disable-next-line no-useless-catch
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );
      if (userAccount) {
        //call login method
        this.login({ email, password });
        return userAccount;
      } else {
        return userAccount;
      }
    } catch (error) {
      throw error;
    }
  }
  async login({ email, password }) {
    // eslint-disable-next-line no-useless-catch
    try {
      return await this.account.createEmailSession(email, password);
    } catch (error) {
      throw error;
    }
  }

  async getUser() {
    return await this.account.get();
  }

  async logout() {
    try {
      await this.account.deleteSessions();
    } catch (error) {
      console.log("Appwrite serive :: logout :: error", error);
    }
  }
}

const authService = new AuthService();
export default authService;
