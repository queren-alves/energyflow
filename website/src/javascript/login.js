document.addEventListener('DOMContentLoaded', function() {
const loginForm = document.getElementById('loginForm');
      const emailInput = document.getElementById('email');
      const passwordInput = document.getElementById('password');
      const emailError = document.getElementById('emailError');
      const passwordError = document.getElementById('passwordError');
      const alertBox = document.getElementById('alert');

      function showAlert(message, type) {
        alertBox.textContent = message;
        alertBox.className = `alert alert-${type} show`;
        setTimeout(() => {
          alertBox.classList.remove('show');
        }, 5000);
      }

      function showError(input, errorElement, message) {
        input.classList.add('input-error');
        errorElement.textContent = message;
        errorElement.classList.add('show');
      }

      function clearError(input, errorElement) {
        input.classList.remove('input-error');
        errorElement.textContent = '';
        errorElement.classList.remove('show');
      }

      function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
      }

      function validateForm() {
        let isValid = true;

        clearError(emailInput, emailError);
        clearError(passwordInput, passwordError);

        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();

        if (!email) {
          showError(emailInput, emailError, 'E-mail é obrigatório');
          isValid = false;
        } else if (!validateEmail(email)) {
          showError(emailInput, emailError, 'Digite um e-mail válido');
          isValid = false;
        }

        if (!password) {
          showError(passwordInput, passwordError, 'Senha é obrigatória');
          isValid = false;
        }

        return isValid;
      }

      emailInput.addEventListener('input', () => clearError(emailInput, emailError));
      passwordInput.addEventListener('input', () => clearError(passwordInput, passwordError));

      loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        if (!validateForm()) {
          return;
        }

        const formData = new FormData(loginForm);
        
        try {
          const response = await fetch('src/php/login.php', {
            method: 'POST',
            body: formData
          });

          const result = await response.json();

          if (result.success) {
            showAlert(result.message, 'success');
            setTimeout(() => {
              window.location.href = result.redirect || 'dashboard.html';
            }, 1000);
          } else {
            showAlert(result.message, 'error');
          }
        } catch (error) {
          showAlert('Ocorreu um erro. Por favor, tente novamente.', 'error');
        }
      });
      });