const config = {
  appWriteUrl: String(import.meta.env.VITE_APPRWRITE_URL),
  appWriteProjectId: String(import.meta.env.VITE_APPRWRITE_PROJECT_ID),
  appWriteDatabaseId: String(import.meta.env.VITE_APPRWRITE_DATABASE_ID),
  appWriteCollectionId: String(import.meta.env.VITE_APPRWRITE_COLLECTION_ID),
  appWriteBucketId: String(import.meta.env.VITE_APPRWRITE_BUCKET_ID),
};
export default config;
