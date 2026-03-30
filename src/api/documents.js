const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function getTechnicalDocuments() {
  const response = await fetch(`${API_BASE_URL}/technical-docs`);
  if (!response.ok) {
    throw new Error('No se pudieron obtener los documentos');
  }
  return await response.json();
}

export function getDocumentDownloadUrl(documentId) {
  return `${API_BASE_URL}/technical-docs/${documentId}/download`;
}