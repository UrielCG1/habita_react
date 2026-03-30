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

  const totalDocs = documents.length;

  return (
    <main className="docs-page">
      <div className="docs-shell">
        <section className="docs-hero">
          <div className="docs-hero__text">
            <span className="docs-badge">HABITA · WEB 2</span>
            <h1>Centro de documentación técnica</h1>
            <p>
              Consulta y descarga archivos técnicos relacionados con la
              plataforma HABITA.
            </p>
          </div>

          <div className="docs-hero__panel">
            <div className="hero-stat">
              <strong>{totalDocs}</strong>
              <span>Documentos</span>
            </div>
            <div className="hero-stat">
              <strong>PDF</strong>
              <span>Formato</span>
            </div>
          </div>
        </section>

        <section className="docs-toolbar">
          <div className="docs-toolbar__title">
            <h2>Repositorio técnico</h2>
            <p>Explora la documentación disponible del sistema HABITA.</p>
          </div>

          <div className="docs-search-wrap">
            <input
              type="text"
              placeholder="Buscar por título, categoría o descripción..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="docs-search"
            />
          </div>
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
                <div className="doc-card__header">
                  <div className="doc-icon">PDF</div>

                  <div className="doc-card__header-text">
                    <span className="doc-card__category">{doc.category}</span>
                    <span className="doc-card__size">{doc.size}</span>
                  </div>
                </div>

                <h3>{doc.title}</h3>
                <p className="doc-card__description">{doc.description}</p>

                <div className="doc-card__meta">
                  <div>
                    <small>Archivo</small>
                    <strong>{doc.fileName}</strong>
                  </div>
                  <div>
                    <small>Fecha</small>
                    <strong>{doc.uploadedAt}</strong>
                  </div>
                </div>

                <div className="doc-card__actions">
                  <a
                    href={getTechnicalDocumentDownloadUrl(doc)}
                    download={doc.fileName}
                    className="btn btn-primary"
                  >
                    Descargar PDF
                  </a>
                </div>
              </article>
            ))}
          </section>
        )}
      </div>
    </main>
  );
}