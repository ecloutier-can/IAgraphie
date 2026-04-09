import './style.css'

interface IATool {
  id: string;
  name: string;
  contribution: string;
  details: string;
}

let tools: IATool[] = [];
let hasIA = false;

// DOM Elements
const nameInput = document.getElementById('name') as HTMLInputElement;
const cegepInput = document.getElementById('cegep') as HTMLInputElement;
const courseInput = document.getElementById('course') as HTMLInputElement;
const groupInput = document.getElementById('group') as HTMLInputElement;
const btnNoIa = document.getElementById('btn-no-ia') as HTMLButtonElement;
const btnYesIa = document.getElementById('btn-yes-ia') as HTMLButtonElement;
const iaDetailsSection = document.getElementById('ia-details') as HTMLDivElement;
const toolsListContainer = document.getElementById('tools-list') as HTMLDivElement;
const addToolBtn = document.getElementById('add-tool') as HTMLButtonElement;

const previewName = document.getElementById('preview-name') as HTMLSpanElement;
const previewNameInline = document.getElementById('preview-name-inline') as HTMLElement;
const previewCegep = document.getElementById('preview-cegep') as HTMLParagraphElement;
const previewCourse = document.getElementById('preview-course') as HTMLSpanElement;
const previewCourseInline = document.getElementById('preview-course-inline') as HTMLElement;
const previewGroup = document.getElementById('preview-group') as HTMLSpanElement;

const checkNoIa = document.getElementById('check-no-ia') as HTMLElement;
const checkYesIa = document.getElementById('check-yes-ia') as HTMLElement;

const previewYesIa = document.getElementById('preview-yes-ia') as HTMLDivElement;
const previewToolsBody = document.getElementById('preview-tools-body') as HTMLTableSectionElement;
const currentDateSpan = document.getElementById('current-date') as HTMLSpanElement;
const copyWordBtn = document.getElementById('copy-word') as HTMLButtonElement;

// Constants
const TOOL_OPTIONS = [
  'ChatGPT', 'Gemini', 'Claude', 'Copilot', 'Perplexity', 'Antidote (IA)', 'Autre'
];

const CONTRIBUTION_OPTIONS = [
  'Idéation / Tempête d\'idées',
  'Planification du travail',
  'Recherche d\'informations',
  'Rédaction de segments de texte',
  'Correction linguistique / Reformulation',
  'Traduction',
  'Génération d\'images / médias',
  'Autre'
];

// Initialize
function init() {
  const now = new Date();
  currentDateSpan.textContent = now.toLocaleDateString('fr-CA', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  // Sync basic info
  nameInput.addEventListener('input', updatePreview);
  courseInput.addEventListener('input', updatePreview);
  cegepInput.addEventListener('input', updatePreview);
  groupInput.addEventListener('input', updatePreview);

  // Toggle IA
  btnNoIa.addEventListener('click', () => setIAStatus(false));
  btnYesIa.addEventListener('click', () => setIAStatus(true));

  // Add tool
  addToolBtn.addEventListener('click', addTool);

  // Copy button
  copyWordBtn.addEventListener('click', copyToClipboard);

  // Initial render
  updatePreview();
}

function setIAStatus(status: boolean) {
  hasIA = status;
  if (hasIA) {
    btnYesIa.classList.add('active');
    btnNoIa.classList.remove('active');
    iaDetailsSection.classList.remove('hide');
    previewYesIa.classList.remove('hide');
    checkYesIa.textContent = 'X';
    checkNoIa.textContent = '';
    if (tools.length === 0) addTool();
  } else {
    btnNoIa.classList.add('active');
    btnYesIa.classList.remove('active');
    iaDetailsSection.classList.add('hide');
    previewYesIa.classList.add('hide');
    checkYesIa.textContent = '';
    checkNoIa.textContent = 'X';
  }
  updatePreview();
}

function addTool() {
  const newTool: IATool = {
    id: Math.random().toString(36).substr(2, 9),
    name: TOOL_OPTIONS[0],
    contribution: CONTRIBUTION_OPTIONS[0],
    details: ''
  };
  tools.push(newTool);
  renderTools();
  updatePreview();
}

function removeTool(id: string) {
  tools = tools.filter(t => t.id !== id);
  renderTools();
  updatePreview();
}

function updateTool(id: string, field: keyof IATool, value: string) {
  const tool = tools.find(t => t.id === id);
  if (tool) {
    (tool as any)[field] = value;
    updatePreview();
  }
}

function renderTools() {
  toolsListContainer.innerHTML = '';
  tools.forEach(tool => {
    const row = document.createElement('div');
    row.className = 'tool-row';
    row.innerHTML = `
      <button class="remove-tool" data-id="${tool.id}"><i class="fa-solid fa-trash"></i></button>
      <div class="form-group">
        <label>Outil utilisé</label>
        <select class="tool-name" data-id="${tool.id}">
          ${TOOL_OPTIONS.map(opt => `<option value="${opt}" ${opt === tool.name ? 'selected' : ''}>${opt}</option>`).join('')}
        </select>
      </div>
      <div class="form-group">
        <label>Nature de la contribution</label>
        <select class="tool-contribution" data-id="${tool.id}">
          ${CONTRIBUTION_OPTIONS.map(opt => `<option value="${opt}" ${opt === tool.contribution ? 'selected' : ''}>${opt}</option>`).join('')}
        </select>
      </div>
      <div class="form-group">
        <label>Détails / Prompts utilisés</label>
        <textarea class="tool-details" data-id="${tool.id}" rows="2" placeholder="Ex: J'ai demandé à ChatGPT de structurer mon plan avec l'invite suivante : [...]">${tool.details}</textarea>
      </div>
    `;

    // Events
    row.querySelector('.remove-tool')?.addEventListener('click', () => removeTool(tool.id));
    row.querySelector('.tool-name')?.addEventListener('change', (e) => updateTool(tool.id, 'name', (e.target as HTMLSelectElement).value));
    row.querySelector('.tool-contribution')?.addEventListener('change', (e) => updateTool(tool.id, 'contribution', (e.target as HTMLSelectElement).value));
    row.querySelector('.tool-details')?.addEventListener('input', (e) => updateTool(tool.id, 'details', (e.target as HTMLTextAreaElement).value));

    toolsListContainer.appendChild(row);
  });
}

function updatePreview() {
  const nameVal = nameInput.value || '...';
  const cegepVal = cegepInput.value || '...';
  const courseVal = courseInput.value || '...';
  
  previewName.textContent = nameVal;
  previewNameInline.textContent = nameVal;
  previewCegep.textContent = cegepVal;
  previewCourse.textContent = courseVal;
  previewCourseInline.textContent = courseVal;
  previewGroup.textContent = groupInput.value || '...';

  if (hasIA) {
    previewToolsBody.innerHTML = tools.map(tool => `
      <tr>
        <td>${tool.name}</td>
        <td>${tool.contribution}</td>
        <td>${tool.details ? linkify(tool.details) : '<i>Aucun détail fourni</i>'}</td>
      </tr>
    `).join('');
  }
}

function linkify(text: string): string {
  const urlPattern = /(https?:\/\/[^\s]+)/g;
  return text.replace(urlPattern, (url) => {
    return `<a href="${url}" target="_blank" rel="noopener noreferrer" style="color: #F9A41A; text-decoration: underline;">${url}</a>`;
  });
}

async function copyToClipboard() {
  const doc = document.getElementById('printable-doc')!;
  const clone = doc.cloneNode(true) as HTMLElement;
  
  // Style forcing for Word compatibility
  const tables = clone.querySelectorAll('table');
  tables.forEach(t => {
    t.setAttribute('border', '1');
    t.setAttribute('cellpadding', '5');
    t.style.borderCollapse = 'collapse';
    t.style.width = '100%';
    t.style.marginTop = '1rem';
  });

  const cells = clone.querySelectorAll('th, td');
  cells.forEach(c => {
    (c as HTMLElement).style.border = '1px solid #ccc';
    (c as HTMLElement).style.padding = '8px';
    (c as HTMLElement).style.textAlign = 'left';
  });

  const checkboxes = clone.querySelectorAll('.preview-checkbox');
  checkboxes.forEach(cb => {
    (cb as HTMLElement).style.display = 'inline-block';
    (cb as HTMLElement).style.width = '20px';
    (cb as HTMLElement).style.height = '20px';
    (cb as HTMLElement).style.border = '2px solid #000';
    (cb as HTMLElement).style.textAlign = 'center';
    (cb as HTMLElement).style.lineHeight = '20px';
    (cb as HTMLElement).style.fontWeight = 'bold';
    (cb as HTMLElement).style.marginRight = '5px';
    (cb as HTMLElement).style.fontFamily = 'Arial, sans-serif';
  });

  const html = `
    <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
    <head><meta charset='utf-8'></head>
    <body style="font-family: 'Times New Roman', serif; color: #000; padding: 20px;">
      <style>
        h2, h3 { font-family: 'Times New Roman', serif; margin-bottom: 5px; }
        p { margin-bottom: 10px; }
      </style>
      ${clone.innerHTML}
    </body>
    </html>
  `;

  try {
    const blob = new Blob([html], { type: 'text/html' });
    const data = [new ClipboardItem({ 'text/html': blob })];
    await navigator.clipboard.write(data);
    
    const originalText = copyWordBtn.innerHTML;
    copyWordBtn.innerHTML = '<i class="fa-solid fa-check"></i> Copié !';
    copyWordBtn.classList.add('btn-secondary');
    
    setTimeout(() => {
      copyWordBtn.innerHTML = originalText;
      copyWordBtn.classList.remove('btn-secondary');
    }, 2000);
  } catch (err) {
    console.error('Erreur lors de la copie :', err);
    alert('Désolé, la copie directe a échoué. Veuillez sélectionner le texte manuellement.');
  }
}

// Start the engine
init();
