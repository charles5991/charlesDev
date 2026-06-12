export type ProfileData = {
   name: string
   email: string
   phone: string
   github: string
   linkedin: string
   website: string
}

export function generateBookmarklet(profile: ProfileData): string {
   const cleanString = (val: string) => val.replace(/'/g, "\\'").replace(/"/g, '\\"')

   const code = `(function() {
      var data = {
         name: "${cleanString(profile.name)}",
         email: "${cleanString(profile.email)}",
         phone: "${cleanString(profile.phone)}",
         github: "${cleanString(profile.github)}",
         linkedin: "${cleanString(profile.linkedin)}",
         website: "${cleanString(profile.website)}"
      };
      
      var host = window.location.hostname;
      
      function fillInput(selector, value) {
         if (!value) return;
         var elements = document.querySelectorAll(selector);
         elements.forEach(function(el) {
            if (el.value === '') {
               el.value = value;
               el.dispatchEvent(new Event('input', { bubbles: true }));
               el.dispatchEvent(new Event('change', { bubbles: true }));
            }
         });
      }

      if (host.indexOf('lever.co') !== -1) {
         fillInput('input[name="name"]', data.name);
         fillInput('input[name="email"]', data.email);
         fillInput('input[name="phone"]', data.phone);
         fillInput('input[name="org"]', 'Self-employed / Freelance');
         fillInput('input[name="urls[LinkedIn]"]', data.linkedin);
         fillInput('input[name="urls[GitHub]"]', data.github);
         fillInput('input[name="urls[Portfolio]"]', data.website);
         
         var fileInput = document.querySelector('input[type="file"]');
         if (fileInput) {
            var parent = fileInput.closest('div') || fileInput.parentElement;
            if (parent) {
               parent.style.border = '3px dashed #10b981';
               parent.style.backgroundColor = '#ecfdf5';
            }
         }
      } 
      else if (host.indexOf('greenhouse.io') !== -1) {
         var names = data.name.split(' ');
         var firstName = names[0] || '';
         var lastName = names.slice(1).join(' ') || '';
         
         fillInput('input[id="first_name"]', firstName);
         fillInput('input[id="last_name"]', lastName);
         fillInput('input[id="email"]', data.email);
         fillInput('input[id="phone"]', data.phone);
         
         var labels = document.querySelectorAll('label');
         labels.forEach(function(label) {
            var text = label.textContent.toLowerCase();
            var input = document.getElementById(label.getAttribute('for')) || label.querySelector('input, textarea');
            if (!input) return;
            
            if (text.indexOf('linkedin') !== -1 && data.linkedin) {
               input.value = data.linkedin;
            } else if (text.indexOf('github') !== -1 && data.github) {
               input.value = data.github;
            } else if (text.indexOf('portfolio') !== -1 || text.indexOf('website') !== -1 && data.website) {
               input.value = data.website;
            }
            input.dispatchEvent(new Event('input', { bubbles: true }));
            input.dispatchEvent(new Event('change', { bubbles: true }));
         });

         var fileInput = document.querySelector('input[type="file"], .choose-file');
         if (fileInput) {
            var dropZone = fileInput.closest('.drop-zone') || fileInput.parentElement;
            if (dropZone) {
               dropZone.style.border = '3px dashed #10b981';
               dropZone.style.backgroundColor = '#ecfdf5';
            }
         }
      } 
      else {
         var inputs = document.querySelectorAll('input, textarea');
         inputs.forEach(function(input) {
            var name = (input.name || '').toLowerCase();
            var id = (input.id || '').toLowerCase();
            var placeholder = (input.placeholder || '').toLowerCase();
            var type = input.type;

            if (type === 'file') {
               var parent = input.parentElement;
               if (parent) {
                  parent.style.border = '3px dashed #10b981';
                  parent.style.backgroundColor = '#ecfdf5';
               }
               return;
            }

            var valueToFill = '';
            if (name.indexOf('name') !== -1 || id.indexOf('name') !== -1 || placeholder.indexOf('name') !== -1) {
               if (name.indexOf('first') !== -1 || id.indexOf('first') !== -1 || placeholder.indexOf('first') !== -1) {
                  valueToFill = data.name.split(' ')[0];
               } else if (name.indexOf('last') !== -1 || id.indexOf('last') !== -1 || placeholder.indexOf('last') !== -1) {
                  valueToFill = data.name.split(' ').slice(1).join(' ');
               } else {
                  valueToFill = data.name;
               }
            } else if (name.indexOf('email') !== -1 || id.indexOf('email') !== -1 || type === 'email') {
               valueToFill = data.email;
            } else if (name.indexOf('phone') !== -1 || id.indexOf('phone') !== -1 || name.indexOf('tel') !== -1 || type === 'tel') {
               valueToFill = data.phone;
            } else if (name.indexOf('github') !== -1 || id.indexOf('github') !== -1) {
               valueToFill = data.github;
            } else if (name.indexOf('linkedin') !== -1 || id.indexOf('linkedin') !== -1) {
               valueToFill = data.linkedin;
            } else if (name.indexOf('website') !== -1 || id.indexOf('website') !== -1 || name.indexOf('portfolio') !== -1 || id.indexOf('portfolio') !== -1) {
               valueToFill = data.website;
            }

            if (valueToFill && !input.value) {
               input.value = valueToFill;
               input.dispatchEvent(new Event('input', { bubbles: true }));
               input.dispatchEvent(new Event('change', { bubbles: true }));
            }
         });
      }

      var toast = document.createElement('div');
      toast.innerText = 'Autofill Completed!';
      toast.style.position = 'fixed';
      toast.style.bottom = '20px';
      toast.style.right = '20px';
      toast.style.backgroundColor = '#10b981';
      toast.style.color = 'white';
      toast.style.padding = '12px 24px';
      toast.style.borderRadius = '8px';
      toast.style.zIndex = '99999';
      toast.style.fontFamily = 'sans-serif';
      toast.style.fontSize = '14px';
      toast.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
      document.body.appendChild(toast);
      setTimeout(function() { toast.remove(); }, 3000);
   })();`

   // Minify simple whitespaces to make it single line URL compatible
   const minifiedCode = code
      .replace(/\s+/g, ' ')
      .replace(/\s*([{};,=+-\/*])\s*/g, '$1')
      .trim()

   return `javascript:${minifiedCode}`
}
