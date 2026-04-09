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

const TRANSLATIONS: Record<string, any> = {
  fr: {
    'main-title': "Générateur D'IAgraphie",
    'main-subtitle': "Outil de déclaration d'intégrité intellectuelle",
    'id-title': "Identification",
    'id-name': "Nom complet",
    'id-cegep': "Établissement",
    'id-course': "Cours",
    'id-group': "Groupe",
    'placeholder-name': "Prénom Nom",
    'placeholder-cegep': "ex: Votre établissement",
    'placeholder-course': "Nom du cours",
    'placeholder-group': "ex: 0001",
    'ia-usage-title': "Utilisation de l'intelligence artificielle",
    'ia-usage-desc': "Avez-vous utilisé un outil d'IA générative pour ce travail ?",
    'btn-no-ia': "Non, aucune IA",
    'btn-yes-ia': "Oui, j'ai utilisé l'IA",
    'advisory-text': "La transparence ne pénalise pas votre travail. Elle valorise votre démarche intellectuelle et permet à votre professeur d’évaluer votre contribution de façon juste et éclairée.",
    'ia-details-title': "Détails de l'IAgraphie",
    'ia-details-info': "Décrivez comment vous avez utilisé l'IA. Soyez transparent et précis sur les invites (prompts).",
    'btn-add-tool': "Ajouter un outil",
    'btn-copy-word': "Copier pour Word",
    'btn-export-pdf': "Télécharger PDF",
    'doc-title': "Déclaration d'intégrité intellectuelle",
    'doc-student': "Étudiant(e) :",
    'doc-course': "Cours :",
    'doc-group': "Groupe :",
    'doc-commitment-title': "Engagement",
    'doc-engagement-1': "Je, soussigné(e) ",
    'doc-engagement-2': ", atteste que le travail remis dans le cadre du cours ",
    'doc-engagement-3': " est le fruit de ma propre réflexion, rédaction et qu'il respecte les règles de l'intégrité intellectuelle de mon institution.",
    'doc-rules-1': "J'ai identifié et cité toutes les sources documentaires utilisées dans la Bibliographie.",
    'doc-rules-2': "J'ai fait preuve de transparence quant à l'usage d'outils numériques (voir section IAgraphie ci-dessous).",
    'doc-confirm-no': "Je confirme que je n’ai utilisé aucune intelligence artificielle générative pour la réalisation de ce travail.",
    'doc-confirm-yes': "Je confirme avoir utilisé des outils d'intelligence artificielle générative selon les modalités précisées ci-dessous :",
    'th-tool': "Outil utilisé",
    'th-nature': "Nature de la contribution",
    'th-details': "Détails / Prompts utilisés",
    'doc-date': "Date : ",
    'doc-signature': "Signature : ",
    'tool-label': "Outil utilisé",
    'nature-label': "Nature de la contribution",
    'details-label': "Détails / Prompts utilisés",
    'details-placeholder': "Ex: J'ai demandé à ChatGPT de structurer mon plan avec l'invite suivante : [...]",
    'no-details': "<i>Aucun détail fourni</i>",
    'copy-success': "Copié !",
    'pdf-filename': "IAgraphie_Declaration.pdf",
    'reset-confirm': "Effacer toutes les données et recommencer ?",
    'reset-tooltip': "Remise à zéro",
    'tool-options': ['ChatGPT', 'Gemini', 'Claude', 'Copilot', 'Perplexity', 'Antidote (IA)', 'Autre'],
    'contribution-options': [
      'Idéation / Tempête d\'idées',
      'Planification du travail',
      'Recherche d\'informations',
      'Rédaction de segments de texte',
      'Correction linguistique / Reformulation',
      'Traduction',
      'Génération d\'images / médias',
      'Autre'
    ]
  },
  en: {
    'main-title': "AIgraphy Generator",
    'main-subtitle': "Intellectual Integrity Declaration Tool",
    'id-title': "Identification",
    'id-name': "Full Name",
    'id-cegep': "Institution",
    'id-course': "Course",
    'id-group': "Group",
    'placeholder-name': "First Last Name",
    'placeholder-cegep': "ex: Your Institution",
    'placeholder-course': "Course Name",
    'placeholder-group': "ex: 0001",
    'ia-usage-title': "Use of Artificial Intelligence",
    'ia-usage-desc': "Did you use generative AI for this assignment?",
    'btn-no-ia': "No, no AI used",
    'btn-yes-ia': "Yes, I used AI",
    'advisory-text': "Transparency does not penalize your work. It enhances your intellectual process and allows your professor to evaluate your contribution fairly and accurately.",
    'ia-details-title': "AIgraphy Details",
    'ia-details-info': "Describe how you used AI. Be transparent and specific about the prompts used.",
    'btn-add-tool': "Add a tool",
    'btn-copy-word': "Copy for Word",
    'btn-export-pdf': "Download PDF",
    'doc-title': "Declaration of Intellectual Integrity",
    'doc-student': "Student:",
    'doc-course': "Course:",
    'doc-group': "Group:",
    'doc-commitment-title': "Commitment",
    'doc-engagement-1': "I, the undersigned ",
    'doc-engagement-2': ", certify that the work submitted for the course ",
    'doc-engagement-3': " is the result of my own reflection and writing, and that it respects the intellectual integrity rules of my institution.",
    'doc-rules-1': "I have identified and cited all documentary sources used in the Bibliography.",
    'doc-rules-2': "I have been transparent about the use of digital tools (see AIgraphy section below).",
    'doc-confirm-no': "I confirm that I did not use any generative artificial intelligence to complete this work.",
    'doc-confirm-yes': "I confirm that I used generative artificial intelligence tools according to the procedures specified below:",
    'th-tool': "Tool used",
    'th-nature': "Nature of contribution",
    'th-details': "Details / Prompts used",
    'doc-date': "Date: ",
    'doc-signature': "Signature: ",
    'tool-label': "Tool used",
    'nature-label': "Nature of contribution",
    'details-label': "Details / Prompts used",
    'details-placeholder': "Ex: I asked ChatGPT to structure my plan with the following prompt: [...]",
    'no-details': "<i>No details provided</i>",
    'copy-success': "Copied!",
    'pdf-filename': "AIgraphy_Declaration.pdf",
    'reset-confirm': "Clear all data and start over?",
    'reset-tooltip': "Reset",
    'tool-options': ['ChatGPT', 'Gemini', 'Claude', 'Copilot', 'Perplexity', 'Antidote (AI)', 'Other'],
    'contribution-options': [
      'Ideation / Brainstorming',
      'Work planning',
      'Information research',
      'Writing text segments',
      'Linguistic correction / Reformulation',
      'Translation',
      'Image / Media generation',
      'Other'
    ]
  }
};

let currentLang = 'fr';

// Initialize
function init() {
  const now = new Date();
  currentDateSpan.textContent = now.toLocaleDateString(currentLang === 'fr' ? 'fr-CA' : 'en-CA', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  // Sync basic info
  nameInput.addEventListener('input', () => { updatePreview(); saveState(); });
  courseInput.addEventListener('input', () => { updatePreview(); saveState(); });
  cegepInput.addEventListener('input', () => { updatePreview(); saveState(); });
  groupInput.addEventListener('input', () => { updatePreview(); saveState(); });

  // Toggle IA
  btnNoIa.addEventListener('click', () => { setIAStatus(false); saveState(); });
  btnYesIa.addEventListener('click', () => { setIAStatus(true); saveState(); });

  // Add tool
  addToolBtn.addEventListener('click', () => { addTool(); saveState(); });

  // Copy button
  copyWordBtn.addEventListener('click', copyToClipboard);

  // PDF Export
  document.getElementById('export-pdf')?.addEventListener('click', exportToPDF);

  // Language Switcher
  document.getElementById('lang-fr')?.addEventListener('click', () => setLanguage('fr'));
  document.getElementById('lang-en')?.addEventListener('click', () => setLanguage('en'));

  // Reset button
  document.getElementById('reset-btn')?.addEventListener('click', () => {
    if (confirm(TRANSLATIONS[currentLang]['reset-confirm'])) {
      localStorage.removeItem('iagraphie_state');
      location.reload();
    }
  });

  // Load state
  loadState();

  // Initial render
  updatePreview();
}

function setLanguage(lang: string) {
  currentLang = lang;
  
  // Update buttons state
  document.getElementById('lang-fr')?.classList.toggle('active', lang === 'fr');
  document.getElementById('lang-en')?.classList.toggle('active', lang === 'en');

  // Update static text
  const elements = document.querySelectorAll('[data-i18n]');
  elements.forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (key && TRANSLATIONS[lang][key]) {
      el.innerHTML = TRANSLATIONS[lang][key];
    }
  });

  // Update tooltips
  const tooltips = document.querySelectorAll('[data-i18n-title]');
  tooltips.forEach(el => {
    const key = el.getAttribute('data-i18n-title');
    if (key && TRANSLATIONS[lang][key]) {
      (el as HTMLElement).title = TRANSLATIONS[lang][key];
    }
  });

  // Update placeholders
  const placeholders = document.querySelectorAll('[data-i18n-placeholder]');
  placeholders.forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (key && TRANSLATIONS[lang][key]) {
      (el as HTMLInputElement).placeholder = TRANSLATIONS[lang][key];
    }
  });

  // Update date format
  const now = new Date();
  currentDateSpan.textContent = now.toLocaleDateString(lang === 'fr' ? 'fr-CA' : 'en-CA', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  renderTools();
  updatePreview();
  saveState();
}

function saveState() {
  const state = {
    name: nameInput.value,
    cegep: cegepInput.value,
    course: courseInput.value,
    group: groupInput.value,
    hasIA,
    tools,
    lang: currentLang
  };
  localStorage.setItem('iagraphie_state', JSON.stringify(state));
}

function loadState() {
  const saved = localStorage.getItem('iagraphie_state');
  if (saved) {
    try {
      const state = JSON.parse(saved);
      nameInput.value = state.name || '';
      cegepInput.value = state.cegep || '';
      courseInput.value = state.course || '';
      groupInput.value = state.group || '';
      hasIA = state.hasIA ?? false;
      tools = state.tools || [];
      
      if (state.lang) {
        setLanguage(state.lang);
      }
      
      setIAStatus(hasIA);
    } catch (e) {
      console.error('Error loading state', e);
    }
  }
}

async function exportToPDF() {
  const element = document.getElementById('printable-doc');
  if (!element) return;

  const opt = {
    margin: 10,
    filename: TRANSLATIONS[currentLang]['pdf-filename'],
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2, useCORS: true },
    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
  };

  // @ts-ignore
  html2pdf().set(opt).from(element).save();
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
  saveState();
}

function addTool() {
  const toolOptions = TRANSLATIONS[currentLang]['tool-options'];
  const contributionOptions = TRANSLATIONS[currentLang]['contribution-options'];
  
  const newTool: IATool = {
    id: Math.random().toString(36).substr(2, 9),
    name: toolOptions[0],
    contribution: contributionOptions[0],
    details: ''
  };
  tools.push(newTool);
  renderTools();
  updatePreview();
  saveState();
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
  const toolOptions = TRANSLATIONS[currentLang]['tool-options'];
  const contributionOptions = TRANSLATIONS[currentLang]['contribution-options'];

  tools.forEach(tool => {
    const row = document.createElement('div');
    row.className = 'tool-row';
    row.innerHTML = `
      <button class="remove-tool" data-id="${tool.id}"><i class="fa-solid fa-trash"></i></button>
      <div class="form-group">
        <div class="step-badge"></div>
        <label>${TRANSLATIONS[currentLang]['tool-label']}</label>
        <select class="tool-name" data-id="${tool.id}">
          ${toolOptions.map((opt: string) => `<option value="${opt}" ${opt === tool.name ? 'selected' : ''}>${opt}</option>`).join('')}
        </select>
      </div>
      <div class="form-group">
        <div class="step-badge"></div>
        <label>${TRANSLATIONS[currentLang]['nature-label']}</label>
        <select class="tool-contribution" data-id="${tool.id}">
          ${contributionOptions.map((opt: string) => `<option value="${opt}" ${opt === tool.contribution ? 'selected' : ''}>${opt}</option>`).join('')}
        </select>
      </div>
      <div class="form-group">
        <div class="step-badge"></div>
        <label>${TRANSLATIONS[currentLang]['details-label']}</label>
        <textarea class="tool-details" data-id="${tool.id}" rows="2" placeholder="${TRANSLATIONS[currentLang]['details-placeholder']}">${tool.details}</textarea>
      </div>
    `;

    // Events
    row.querySelector('.remove-tool')?.addEventListener('click', () => { removeTool(tool.id); saveState(); });
    row.querySelector('.tool-name')?.addEventListener('change', (e) => { updateTool(tool.id, 'name', (e.target as HTMLSelectElement).value); saveState(); });
    row.querySelector('.tool-contribution')?.addEventListener('change', (e) => { updateTool(tool.id, 'contribution', (e.target as HTMLSelectElement).value); saveState(); });
    row.querySelector('.tool-details')?.addEventListener('input', (e) => { updateTool(tool.id, 'details', (e.target as HTMLTextAreaElement).value); saveState(); });

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
        <td>${tool.details ? linkify(tool.details) : TRANSLATIONS[currentLang]['no-details']}</td>
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
    copyWordBtn.innerHTML = `<i class="fa-solid fa-check"></i> ${TRANSLATIONS[currentLang]['copy-success']}`;
    copyWordBtn.classList.add('btn-secondary');
    
    setTimeout(() => {
      copyWordBtn.innerHTML = originalText;
      copyWordBtn.classList.remove('btn-secondary');
    }, 2000);
  } catch (err) {
    console.error('Erreur lors de la copie :', err);
    alert(currentLang === 'fr' ? 'Désolé, la copie directe a échoué. Veuillez sélectionner le texte manuellement.' : 'Sorry, direct copy failed. Please select the text manually.');
  }
}

// Start the engine
init();
