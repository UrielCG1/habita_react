import { useEffect, useState } from 'react';
import { getTechnicalDocuments, getDocumentDownloadUrl } from '../api/documents';

export default function TechnicalDocsPage() {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadDocuments() {
      try {
        const payload = await getTechnicalDocuments();
        setDocuments(payload.data || []);
      } catch (err) {
        setError('No fue posible cargar la documentación.');
      } finally {
        setLoading(false);
      }
    }

    loadDocuments();
  }, []);

  if (loading) return <p>Cargando documentos...</p>;
  if (error) return <p>{error}</p>;

  return (
    <section>
      <h1>Documentación técnica</h1>
      <p>Consulta y descarga los archivos técnicos del sistema.</p>

      {documents.length === 0 ? (
        <p>No hay documentos disponibles.</p>
      ) : (
        <div>
          {documents.map((doc) => (
            <article key={doc.id}>
              <h2>{doc.title}</h2>
              <p>{doc.description}</p>
              <p>{doc.file_name}</p>
              <a href={getDocumentDownloadUrl(doc.id)} target="_blank" rel="noreferrer">
                Descargar PDF
              </a>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}