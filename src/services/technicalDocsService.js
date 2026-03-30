import { apiClient } from './apiClient';

export async function getTechnicalDocuments() {
  return apiClient.get('/technical-docs');
}

export function getTechnicalDocumentDownloadUrl(documentItem) {
  return documentItem.downloadUrl;
}