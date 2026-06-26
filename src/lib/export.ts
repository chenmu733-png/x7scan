interface ExportOptions {
  filename?: string;
  format?: 'csv' | 'json';
}

function flattenObject(obj: Record<string, unknown>, prefix = ''): Record<string, unknown> {
  const result: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(obj)) {
    const newKey = prefix ? `${prefix}.${key}` : key;
    if (value && typeof value === 'object' && !Array.isArray(value)) {
      Object.assign(result, flattenObject(value as Record<string, unknown>, newKey));
    } else if (Array.isArray(value)) {
      result[newKey] = JSON.stringify(value);
    } else {
      result[newKey] = value;
    }
  }
  return result;
}

export function exportToCSV<T extends Record<string, any>>(
  data: T[],
  options: ExportOptions = {}
): void {
  const { filename = 'export', format = 'csv' } = options;

  if (!data.length) return;

  const flatData = data.map((item) => flattenObject(item));
  const headers = Object.keys(flatData[0]);
  const csvRows: string[] = [headers.join(',')];

  for (const row of flatData) {
    const values = headers.map((header) => {
      const value = row[header];
      const str = value === null || value === undefined ? '' : String(value);
      return `"${str.replace(/"/g, '""')}"`;
    });
    csvRows.push(values.join(','));
  }

  const csvContent = csvRows.join('\n');
  downloadFile(csvContent, `${filename}.csv`, 'text/csv');
}

export function exportToJSON<T>(
  data: T[],
  options: ExportOptions = {}
): void {
  const { filename = 'export' } = options;
  const jsonContent = JSON.stringify(data, null, 2);
  downloadFile(jsonContent, `${filename}.json`, 'application/json');
}

export function exportData<T extends Record<string, any>>(
  data: T[],
  format: 'csv' | 'json' = 'csv',
  options: ExportOptions = {}
): void {
  if (format === 'json') {
    exportToJSON(data, options);
  } else {
    exportToCSV(data, options);
  }
}

function downloadFile(content: string, filename: string, mimeType: string): void {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
