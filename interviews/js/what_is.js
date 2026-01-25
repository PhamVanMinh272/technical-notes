// function exportToPDF() {
//   const element = document.body;
//   html2pdf().from(element).save('senior_python_developer_skills.pdf');
// }

function exportToPDF() {
  const element = document.body; // or a specific container ID
  
  const options = {
    margin: [10, 10], // top, left, bottom, right in mm
    filename: 'senior_python_developer_skills.pdf',
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { 
      scale: 2, // Increases clarity; use 1 if the document is extremely long
      useCORS: true, // Required for external images
      letterRendering: true,
      windowWidth: document.documentElement.scrollWidth
    },
    // jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
    // pagebreak: { 
    //   mode: ['avoid-all', 'css', 'legacy'], // Prevents cutting elements in half
    //   before: '.page-break' // Optional: manually trigger breaks with this class
    // }
  };

  // Run the conversion
  html2pdf().set(options).from(element).save();
}


// what_is.js
// Smooth UI touches and html2pdf export configuration

// document.addEventListener('DOMContentLoaded', () => {
//   // Wrap each content block in .section for hover effects
//   const headings = document.querySelectorAll('.container > h2');
//   headings.forEach(h => {
//     const next = h.nextElementSibling;
//     if (next && next.tagName.toLowerCase() === 'ul') {
//       const wrapper = document.createElement('div');
//       wrapper.className = 'section';
//       h.parentNode.insertBefore(wrapper, h);
//       wrapper.appendChild(h);
//       wrapper.appendChild(next);
//     }
//   });

//   // Add subtle entrance animation
//   const container = document.querySelector('.container');
//   container.style.opacity = 0;
//   container.style.transform = 'translateY(8px)';
//   setTimeout(() => {
//     container.style.transition = 'opacity .45s ease, transform .45s ease';
//     container.style.opacity = 1;
//     container.style.transform = 'translateY(0)';
//   }, 80);
// });

// /**
//  * Export visible container to PDF using html2pdf
//  * Keeps styling and uses print-friendly options
//  */
// function exportToPDF() {
//   const element = document.querySelector('.container');
//   if (!element) return;

//   // Temporarily hide interactive elements that shouldn't appear in PDF
//   const btns = document.querySelectorAll('.no-print, .btn-export');
//   btns.forEach(b => b.style.display = 'none');

//   // html2pdf options tuned for A4 portrait and crisp text
//   const opt = {
//     margin:       [12, 12, 12, 12], // top right bottom left in mm
//     filename:     'Senior-Python-Developer-Skills.pdf',
//     image:        { type: 'jpeg', quality: 0.98 },
//     html2canvas:  {
//       scale: 2,
//       useCORS: true,
//       logging: false,
//       allowTaint: true,
//       backgroundColor: null
//     },
//     jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
//   };

//   // Use a short delay to ensure styles applied
//   setTimeout(() => {
//     html2pdf().set(opt).from(element).save().then(() => {
//       // restore buttons after export
//       btns.forEach(b => b.style.display = '');
//     }).catch(err => {
//       console.error('PDF export failed', err);
//       btns.forEach(b => b.style.display = '');
//       alert('PDF export failed. Check console for details.');
//     });
//   }, 120);
// }

// // Expose function to global scope for inline onclick
// window.exportToPDF = exportToPDF;