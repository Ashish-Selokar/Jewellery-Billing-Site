        // Password visibility toggle
        document.getElementById('toggleSignupPassword').addEventListener('click', function () {
            const passwordField = document.getElementById('signup-password');
            const icon = this.querySelector('i');
            if (passwordField.type === 'password') {
                passwordField.type = 'text';
                icon.classList.replace('fa-eye', 'fa-eye-slash');
            } else {
                passwordField.type = 'password';
                icon.classList.replace('fa-eye-slash', 'fa-eye');
            }
        });

        // Password strength checker
        const passwordField = document.getElementById('signup-password');
        const passwordStrength = document.getElementById('passwordStrength');

        passwordField.addEventListener('input', function () {
            const value = passwordField.value;
            let strength = '';
            let strengthClass = '';

            if (value.length > 0) {
                if (value.length < 6) {
                    strength = 'Weak';
                    strengthClass = 'weak';
                } else if (value.length < 10) {
                    strength = 'Medium';
                    strengthClass = 'medium';
                } else {
                    strength = 'Strong';
                    strengthClass = 'strong';
                }
            } else {
                strength = '';
                strengthClass = '';
            }

            passwordStrength.textContent = `Password Strength: ${strength}`;
            passwordStrength.className = `password-strength ${strengthClass}`;
        });

        // Form validation and error handling
        const form = document.getElementById('signupForm');
        form.addEventListener('submit', function (event) {
            event.preventDefault();
            let isValid = true;

            // Check all inputs
            const inputs = form.querySelectorAll('input');
            inputs.forEach(input => {
                if (!input.checkValidity()) {
                    input.classList.add('is-invalid');
                    isValid = false;
                } else {
                    input.classList.remove('is-invalid');
                }
            });

            // Check password match
            const password = document.getElementById('signup-password').value;
            const confirmPassword = document.getElementById('signup-confirm-password').value;
            if (password !== confirmPassword) {
                document.getElementById('signup-confirm-password').classList.add('is-invalid');
                isValid = false;
            } else {
                document.getElementById('signup-confirm-password').classList.remove('is-invalid');
            }

            // Check terms and conditions checkbox
            const termsCheckbox = document.getElementById('terms');
            if (!termsCheckbox.checked) {
                termsCheckbox.classList.add('is-invalid');
                isValid = false;
            } else {
                termsCheckbox.classList.remove('is-invalid');
            }

            if (isValid) {
                alert('Form submitted successfully!');
                form.reset();
            }
        });