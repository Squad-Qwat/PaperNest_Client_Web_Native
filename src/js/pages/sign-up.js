document.addEventListener('DOMContentLoaded', function () {
    const signUpData = {
        email: '',
        password: '',
        confirmPassword: '',
        firstName: '',
        lastName: '',
        username: '',
        workspaceIcon: '',
        workspaceName: '',
        workspaceDescription: '',
        role: 'Student',
        workspaceIdToJoin: '',
    };

    const signUpSteps = ['Account', 'Password', 'Credentials', 'Workspace'];

    const signUpStepsTitle = [
        'Create your PaperNest account',
        'Create a new password',
        'Your credentials',
        'Create or join a workspace',
    ];

    let currentStep = 0;
    const workspaceIcons = ['🚀', '💼', '🏢', '⚡', '🎯', '🔥', '💡', '🌟', '🎨', '🔧'];

    const signUpWrapper = document.getElementById('sign-up-wrapper');

    function renderStep() {
        switch (currentStep) {
            case 0:
                renderEmailStep();
                break;
            case 1:
                renderPasswordStep();
                break;
            case 2:
                renderCredentialsStep();
                break;
            case 3:
                renderWorkspaceStep();
                break;
            default:
                break;
        }
    }

    function renderEmailStep() {
        signUpWrapper.innerHTML = `
            <div class="auth-title-wrapper">
                <h1 id="sign-up-title">${signUpStepsTitle[currentStep]}</h1>
                <p id="sign-up-step">Step ${currentStep + 1} of ${signUpSteps.length} - ${signUpSteps[currentStep]}</p>
            </div>

            <div class="social-button">
                <button class="btn btn-secondary btn-md" id="google-login">
                    <i class="bxl bx-google"></i>
                    <span>Login using Google</span>
                </button>
                <button class="btn btn-secondary btn-md" id="github-login">
                    <i class="bxl bx-github"></i>
                    <span>Login using GitHub</span>
                </button>
            </div>

            <div class="divider">
                <span>or continue with your credentials</span>
            </div>

            <form id="email-form" class="auth-form" autocomplete="off">
                <div class="field">
                    <label for="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        autocomplete="off"
                        placeholder="Enter your email"
                        class="input"
                    />
                </div>

                <button type="submit" class="btn btn-md btn-primary" id="email-submit">
                    Continue
                </button>
            </form>

            <div class="auth-footer">
                <p>Have an account?</p>
                <a href="./index.html">Log in</a>
            </div>
        `;

        const emailForm = document.getElementById('email-form');
        emailForm.addEventListener('submit', function (e) {
            e.preventDefault();
            // const emailValue = document.getElementById('email').value.trim();
            // if (!emailValue) {
            //     alert('Please enter your email.');
            //     return;
            // }
            // signUpData.email = emailValue;
            currentStep = 1;
            renderStep();
        });
    }

    function renderPasswordStep() {
        signUpWrapper.innerHTML = `
            <div class="auth-title-wrapper">
                <h1 id="sign-up-title">${signUpStepsTitle[currentStep]}</h1>
                <p id="sign-up-step">Step ${currentStep + 1} of ${signUpSteps.length} - ${signUpSteps[currentStep]}</p>
            </div>
            <form id="password-form" class="auth-form" autocomplete="off">
                <div class="checking-field">
                    <div class="field">
                        <label for="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            autocomplete="off"
                            placeholder="Password"
                            class="input"
                        />
                    </div>

                    <ul class="password-term-list" id="password-term-list">
                        <li>
                            <i class="bx bxs-check-circle"></i>
                            <span>At least 8 characters</span>
                        </li>
                    </ul>
                </div>

                <div class="field">
                    <label for="confirmPassword">Confirm Password</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        autocomplete="off"
                        placeholder="Confirm your password"
                        class="input"
                    />
                </div>

                <div class="auth-form-action">
                    <button type="button" class="btn btn-md btn-secondary" id="password-back">
                        <i class="bx bxs-arrow-left-stroke"></i>
                        <span>Back</span>
                    </button>
                    <button type="submit" class="btn btn-md btn-primary" id="password-submit">
                        <span>Continue</span>
                        <i class="bx bxs-arrow-right-stroke"></i>
                    </button>
                </div>
            </form>
        `;

        document.getElementById('password-back').addEventListener('click', function (e) {
            e.preventDefault();
            currentStep = 0;
            renderStep();
        });

        document.getElementById('password-form').addEventListener('submit', function (e) {
            e.preventDefault();
            // const pwd = document.getElementById('password').value;
            // const confirm = document.getElementById('confirmPassword').value;
            // if (pwd.length < 8) {
            //     alert('Password must be at least 8 characters.');
            //     return;
            // }
            // if (pwd !== confirm) {
            //     alert('Password and confirmation do not match.');
            //     return;
            // }
            // signUpData.password = pwd;
            // signUpData.confirmPassword = confirm;
            currentStep = 2;
            renderStep();
        });
    }

    function renderCredentialsStep() {
        signUpWrapper.innerHTML = `
            <div class="auth-title-wrapper">
                <h1 id="sign-up-title">${signUpStepsTitle[currentStep]}</h1>
                <p id="sign-up-step">Step ${currentStep + 1} of ${signUpSteps.length} - ${signUpSteps[currentStep]}</p>
            </div>
            <form id="credentials-form" class="auth-form" autocomplete="off">
                <div class="two-fields">
                    <div class="field">
                        <label for="firstName">First name</label>
                        <input
                            type="text"
                            id="firstName"
                            name="firstName"
                            autocomplete="off"
                            placeholder="John"
                            class="input"
                        />
                    </div>

                    <div class="field">
                        <label for="lastName">Last name</label>
                        <input
                            type="text"
                            id="lastName"
                            name="lastName"
                            autocomplete="off"
                            placeholder="Doe"
                            class="input"
                        />
                    </div>
                </div>

                <div class="field">
                    <label for="username">Username</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        autocomplete="off"
                        placeholder="Create your username"
                        class="input"
                    />
                </div>

                <div class="field">
                    <label for="role">Select role</label>
                    <select name="role" id="role" class="select-control">
                        <option value="Student">Student</option>
                        <option value="Lecturer">Lecturer</option>
                    </select>
                </div>

                <div class="auth-form-action">
                    <button type="button" class="btn btn-md btn-secondary" id="credentials-back">
                        <i class="bx bxs-arrow-left-stroke"></i>
                        <span>Back</span>
                    </button>
                    <button type="submit" class="btn btn-md btn-primary" id="credentials-submit">
                        <span>Continue</span>
                        <i class="bx bxs-arrow-right-stroke"></i>
                    </button>
                </div>
            </form>
        `;

        document.getElementById('credentials-back').addEventListener('click', function (e) {
            e.preventDefault();
            currentStep = 1;
            renderStep();
        });

        document.getElementById('credentials-form').addEventListener('submit', function (e) {
            e.preventDefault();
            // const firstName = document.getElementById('firstName').value.trim();
            // const lastName = document.getElementById('lastName').value.trim();
            // const usernameValue = document.getElementById('username').value.trim();
            // const roleValue = document.getElementById('role').value;

            // if (!firstName || !lastName || !usernameValue) {
            //     alert('Please fill out first name, last name, and username.');
            //     return;
            // }

            // signUpData.firstName = firstName;
            // signUpData.lastName = lastName;
            // signUpData.username = usernameValue;
            // signUpData.role = roleValue;

            currentStep = 3;
            renderStep();
        });
    }

    function renderWorkspaceStep() {
        const iconButtons = workspaceIcons
            .map((ic, idx) => `
                <button type="button" class="icon-btn ${idx === 0 ? 'active' : ''}" data-icon="${ic}">
                    ${ic}
                </button>
            `)
            .join('');

        signUpWrapper.innerHTML = `
            <div class="auth-title-wrapper">
                <h1 id="sign-up-title">${signUpStepsTitle[currentStep]}</h1>
                <p id="sign-up-step">Step ${currentStep + 1} of ${signUpSteps.length} - ${signUpSteps[currentStep]}</p>
            </div>
            <form id="workspace-form" class="auth-form" autocomplete="off">
                <div class="field">
                    <label>Workspace Icon</label>
                    <div class="icon-selector">
                        ${iconButtons}
                    </div>
                    <input type="hidden" id="workspaceIcon" name="workspaceIcon" value="${workspaceIcons[0]}" />
                </div>

                <div class="field">
                    <label for="workspaceName">Workspace Name</label>
                    <input
                        type="text"
                        id="workspaceName"
                        name="workspaceName"
                        autocomplete="off"
                        placeholder="My Workspace"
                        class="input"
                    />
                </div>

                <div class="field">
                    <label for="workspaceDescription">Workspace Description</label>
                    <input
                        type="text"
                        id="workspaceDescription"
                        name="workspaceDescription"
                        autocomplete="off"
                        placeholder="Short description"
                        class="input"
                    />
                </div>

                <div class="auth-form-action">
                    <button type="button" class="btn btn-md btn-secondary" id="workspace-back">
                        <i class="bx bx-arrow-back"></i>
                        <span>Back</span>
                    </button>
                    <button type="submit" class="btn btn-md btn-primary" id="workspace-submit">
                        <span>Finish</span>
                        <i class="bx bx-check"></i>
                    </button>
                </div>
            </form>
        `;

        const iconBtns = document.querySelectorAll('.icon-btn');
        const hiddenInput = document.getElementById('workspaceIcon');
        
        iconBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                iconBtns.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                hiddenInput.value = this.getAttribute('data-icon');
            });
        });

        document.getElementById('workspace-back').addEventListener('click', function (e) {
            e.preventDefault();
            currentStep = 2;
            renderStep();
        });

        document.getElementById('workspace-form').addEventListener('submit', function (e) {
            e.preventDefault();
            signUpData.workspaceIcon = document.getElementById('workspaceIcon').value;
            signUpData.workspaceName = document.getElementById('workspaceName').value.trim();
            signUpData.workspaceDescription = document
                .getElementById('workspaceDescription')
                .value.trim();

            console.log('Final signUpData:', signUpData);
            alert('Pendaftaran selesai! Data telah disimpan (lihat console untuk detail)');
        });
    }

    renderStep();
});
