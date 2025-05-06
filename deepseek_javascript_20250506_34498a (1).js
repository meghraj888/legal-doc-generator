// Enhanced Templates Database
const templates = {
  rental: {
    title: "Rental Agreement",
    description: "Compliant with Indian Rent Control Act. Includes clauses for security deposit, maintenance, and termination.",
    category: "Property",
    fields: [
      { label: "Landlord Full Name", type: "text", placeholder: "As per Aadhaar" },
      { label: "Tenant Full Name", type: "text", placeholder: "As per Aadhaar" },
      { label: "Property Address", type: "text", placeholder: "Full address with PIN code" },
      { label: "Monthly Rent (₹)", type: "number", placeholder: "e.g., 15000" },
      { label: "Security Deposit (₹)", type: "number", placeholder: "e.g., 45000" },
      { label: "Agreement Start Date", type: "date" },
      { label: "Duration (Months)", type: "number", placeholder: "e.g., 11" }
    ],
    isPremium: false
  },
  nda: {
    title: "Non-Disclosure Agreement (NDA)",
    description: "Protect trade secrets, client lists, and proprietary information. Valid in Indian courts.",
    category: "Business",
    fields: [
      { label: "Disclosing Party Name", type: "text", placeholder: "Company/Individual" },
      { label: "Receiving Party Name", type: "text", placeholder: "Company/Individual" },
      { label: "Effective Date", type: "date" },
      { label: "Confidentiality Period (Months)", type: "number", placeholder: "e.g., 24" },
      { label: "Governing State", type: "text", placeholder: "e.g., Maharashtra" }
    ],
    isPremium: true
  }
};

// User State
let currentUser = {
  plan: "free",
  docsUsed: 1,
  maxDocs: 3
};

// Load Template Function (Enhanced)
function loadTemplate(templateKey) {
  const template = templates[templateKey];
  
  // Check if PRO template for free user
  if (template.isPremium && currentUser.plan === "free") {
    showPricing();
    alert("Upgrade to PRO to access premium templates!");
    return;
  }

  // Update UI
  document.getElementById('templateTitle').textContent = template.title;
  const formFields = document.getElementById('formFields');
  formFields.innerHTML = '';

  // Add fields with better UI
  template.fields.forEach(field => {
    const fieldId = field.label.toLowerCase().replace(/ /g, '-');
    formFields.innerHTML += `
      <div class="field-group">
        <label for="${fieldId}" class="block text-sm font-medium text-gray-700 mb-1">${field.label}</label>
        <input
          type="${field.type}"
          id="${fieldId}"
          oninput="updatePreview()"
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          placeholder="${field.placeholder || ''}"
        >
      </div>
    `;
  });

  // Show generator, hide others
  document.getElementById('templates').classList.add('hidden');
  document.getElementById('pricing').classList.add('hidden');
  document.getElementById('dashboard').classList.add('hidden');
  document.getElementById('generator').classList.remove('hidden');
  
  updatePreview();
}

// Generate PDF (Mock)
function generatePDF() {
  if (currentUser.plan === "free" && currentUser.docsUsed >= currentUser.maxDocs) {
    alert(`Free limit reached! Upgrade to PRO for unlimited documents.`);
    showPricing();
    return;
  }

  // Show loader
  const btn = event.target;
  btn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i> Generating...';
  btn.disabled = true;

  // Simulate PDF generation delay
  setTimeout(() => {
    btn.innerHTML = '<i class="fas fa-file-pdf mr-2"></i> Download PDF';
    btn.disabled = false;
    
    // Update user stats
    currentUser.docsUsed++;
    alert(`Document generated! (${currentUser.docsUsed}/${currentUser.maxDocs} used this month)`);
    
    // In a real app, use pdf-lib to create actual PDF
    // const pdfBytes = await PDFDocument.create()...;
    // download(pdfBytes, "document.pdf");
  }, 2000);
}

// Navigation Functions
function showTemplates() {
  document.getElementById('templates').classList.remove('hidden');
  document.getElementById('pricing').classList.add('hidden');
  document.getElementById('dashboard').classList.add('hidden');
  document.getElementById('generator').classList.add('hidden');
}

function showPricing() {
  document.getElementById('templates').classList.add('hidden');
  document.getElementById('pricing').classList.remove('hidden');
  document.getElementById('dashboard').classList.add('hidden');
  document.getElementById('generator').classList.add('hidden');
}

function showDashboard() {
  document.getElementById('templates').classList.add('hidden');
  document.getElementById('pricing').classList.add('hidden');
  document.getElementById('dashboard').classList.remove('hidden');
  document.getElementById('generator').classList.add('hidden');
}

// Initialize
document.getElementById('loginBtn').addEventListener('click', showDashboard);
showTemplates(); // Start on templates page