import { InquiryDatabase } from "./inquiry-database";

let storage: { filename: string; database: InquiryDatabase } | undefined;
let storageWarningShown = false;

function getDatabase() {
  const filename = process.env.INQUIRY_DB_PATH?.trim();
  if (!filename) return undefined;
  if (storage?.filename === filename) return storage.database;
  try {
    const database = new InquiryDatabase(filename);
    storage?.database.close();
    storage = { filename, database };
    return database;
  } catch {
    if (!storageWarningShown) {
      console.error("Inquiry storage unavailable. Check INQUIRY_DB_PATH and its permissions; the email-draft option remains available.");
      storageWarningShown = true;
    }
    return undefined;
  }
}

// Secrets are read only by server routes, never passed to client components.
export const env = {
  get RESEND_API_KEY() { return process.env.RESEND_API_KEY; },
  get INQUIRY_FROM_EMAIL() { return process.env.INQUIRY_FROM_EMAIL; },
  get RESEND_WEBHOOK_SECRET() { return process.env.RESEND_WEBHOOK_SECRET; },
  get DB() { return getDatabase(); },
};
