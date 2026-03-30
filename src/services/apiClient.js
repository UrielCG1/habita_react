import { mockTechnicalDocs } from '../data/mockTechnicalDocs';

function wait(ms = 700) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const apiClient = {
  async get(path) {
    await wait();

    if (path === '/technical-docs') {
      return {
        success: true,
        message: 'OK',
        data: mockTechnicalDocs,
      };
    }

    throw new Error(`Ruta mock no implementada: ${path}`);
  },
};