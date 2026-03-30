import { useEffect, useMemo, useState } from 'react';
import {
  getTechnicalDocuments,
  getTechnicalDocumentDownloadUrl,
} from '../services/technicalDocsService';
import '../styles/technical-docs.css';

export default function TechnicalDocsPage() {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');

  useEffect(() => {
    async function loadDocuments() {
      try {
        const response = await getTechnicalDocuments();
        setDocuments(response.data || []);
      } catch (err) {
        setError('No fue posible cargar la documentación técnica.');
      } finally {
        setLoading(false);
      }
    }

    loadDocuments();
  }, []);

  const filteredDocuments = useMemo(() => {
    const term = search.trim().toLowerCase();

    if (!term) return documents;

    return documents.filter((doc) => {
      return (
        doc.title.toLowerCase().includes(term) ||
        doc.description.toLowerCase().includes(term) ||
        doc.category.toLowerCase().includes(term)
      );
    });
  }, [documents, search]);

  return (
    <main className="docs-page">
      <section className="docs-hero">
        <div className="docs-hero__content">
          <span className="docs-badge">HABITA · WEB 2</span>
          <h1>Documentación técnica</h1>
          <p>
            Consulta y descarga archivos técnicos de apoyo relacionados con la
            plataforma HABITA.
          </p>
        </div>
      </section>

      <section className="docs-toolbar">
        <input
          type="text"
          placeholder="Buscar documento..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="docs-search"
        />
      </section>

      {loading && (
        <section className="docs-state">
          <p>Cargando documentación...</p>
        </section>
      )}

      {!loading && error && (
        <section className="docs-state docs-state--error">
          <p>{error}</p>
        </section>
      )}

      {!loading && !error && filteredDocuments.length === 0 && (
        <section className="docs-state">
          <p>No se encontraron documentos.</p>
        </section>
      )}

      {!loading && !error && filteredDocuments.length > 0 && (
        <section className="docs-grid">
          {filteredDocuments.map((doc) => (
            <article className="doc-card" key={doc.id}>
              <div className="doc-card__top">
                <span className="doc-card__category">{doc.category}</span>
                <span className="doc-card__size">{doc.size}</span>
              </div>

              <h2>{doc.title}</h2>
              <p>{doc.description}</p>

              <div className="doc-card__meta">
                <span>Archivo: {doc.fileName}</span>
                <span>Fecha: {doc.uploadedAt}</span>
              </div>

              <div className="doc-card__actions">
                <a
                  href={getTechnicalDocumentDownloadUrl(doc)}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-primary"
                >
                  Ver PDF
                </a>

                <a
                  href={getTechnicalDocumentDownloadUrl(doc)}
                  download={doc.fileName}
                  className="btn btn-secondary"
                >
                  Descargar
                </a>
              </div>
            </article>
          ))}
        </section>
      )}
    </main>
  );
}