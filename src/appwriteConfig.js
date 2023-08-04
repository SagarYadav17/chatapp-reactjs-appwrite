import { Client, Databases, Account } from "appwrite";

const client = new Client();

export const PROJECT_ID = ""
export const DATABASE_ID = ""
export const COLLECTION_ID_MESSAGES = ""

client
    .setEndpoint("https://cloud.appwrite.io/v1")
    .setProject("");

export const databases = new Databases(client);
export const account = new Account(client);

export default client;
