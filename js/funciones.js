// Espera a que el contenido del DOM esté completamente cargado para ejecutar el script.
document.addEventListener('DOMContentLoaded', () => {
    // --- Data ---
    // Objeto que almacena la información detallada de cada rol.
    const rolesData = {
        'scrum-master': { name: 'Scrum Master', functions: [
            '<strong>Facilitación de ceremonias Scrum:</strong> Lidera y organiza las reuniones de Sprint Planning, Daily Stand-ups, Sprint Review y Retrospectivas.',
            '<strong>Eliminación de impedimentos:</strong> Identifica y resuelve cualquier obstáculo que impida el progreso del equipo de desarrollo.',
            '<strong>Coaching en Agile:</strong> Enseña y guía al equipo y a la organización sobre los principios y prácticas de Scrum y Agile.'
        ], skills: ['Comunicación', 'Resolución de Problemas', 'Liderazgo Servicial', 'Metodologías Ágiles', 'Coaching'], metrics: ['Velocidad del equipo (Velocity)', 'Cumplimiento de Sprints', 'Felicidad del Equipo', 'Tiempo de resolución de impedimentos'] },
        'product-owner': { name: 'Product Owner', functions: [
            '<strong>Gestión del Product Backlog:</strong> Define, prioriza y mantiene actualizado el listado de requisitos del producto.',
            '<strong>Toma de decisiones estratégicas:</strong> Decide qué características incluir en cada Sprint y asegura alineación con los objetivos del negocio.',
            '<strong>Comunicación con stakeholders:</strong> Representa las necesidades del cliente y la organización ante el equipo. Tiene autoridad para opinar sobre prioridades del producto, definición de requisitos y aceptación de entregas. Su voz es decisiva en la planificación del Product Backlog.'
        ], skills: ['Visión de Producto', 'Priorización', 'Análisis de Negocio', 'Comunicación con Stakeholders', 'User Story Mapping'], metrics: ['Retorno de Inversión (ROI)', 'Satisfacción del Cliente', 'Adopción de Características', 'Valor de Negocio entregado'] },
        'product-manager': { name: 'Product Manager', functions: [
            '<strong>Visión y estrategia del producto:</strong> Define la visión a largo plazo del producto y crea la hoja de ruta (roadmap) para alcanzarla.',
            '<strong>Investigación de mercado:</strong> Analiza el mercado, la competencia y las necesidades de los usuarios para identificar oportunidades.',
            '<strong>Coordinación interdepartamental:</strong> Trabaja con marketing, ventas y otros equipos para asegurar un lanzamiento y ciclo de vida exitoso del producto.'
        ], skills: ['Estrategia de Producto', 'Roadmapping', 'Análisis de Mercado', 'Gestión de Stakeholders', 'Data-Driven Decisions'], metrics: ['Cuota de Mercado (Market Share)', 'Ingresos del Producto', 'Tasa de Retención de Usuarios', 'Product-Market Fit'] },
        'developer': { name: 'Developer', functions: [
            '<strong>Desarrollo de incrementos de producto:</strong> Escribe código de alta calidad para construir las funcionalidades definidas en el Sprint Backlog.',
            '<strong>Estimación de tareas:</strong> Participa en la estimación del esfuerzo necesario para completar los ítems del Product Backlog.',
            '<strong>Garantía de calidad:</strong> Realiza pruebas unitarias y de integración para asegurar que el software cumple con los criterios de aceptación.'
        ], skills: ['Lenguajes de Programación', 'Algoritmos', 'Control de Versiones (Git)', 'Bases de Datos', 'Pruebas Unitarias'], metrics: ['Calidad del Código (Bugs)', 'Tiempo de Ciclo (Cycle Time)', 'Cobertura de Pruebas', 'Merge Request Rate'] },
        'qa-tester': { name: 'QA Tester', functions: [
            '<strong>Diseño y ejecución de pruebas:</strong> Crea planes de prueba y ejecuta casos de prueba para encontrar defectos en el producto.',
            '<strong>Reporte de incidencias:</strong> Documenta y comunica los errores encontrados al equipo de desarrollo de manera clara y precisa.',
            '<strong>Validación de requisitos:</strong> Asegura que el producto final cumple con los requisitos funcionales y no funcionales definidos.'
        ], skills: ['Pruebas Manuales y Automatizadas', 'Atención al Detalle', 'Herramientas de Bug Tracking', 'SQL', 'API Testing'], metrics: ['Bugs encontrados por severidad', 'Cobertura de Pruebas Automatizadas', 'Tasa de escape de defectos', 'Tiempo de ejecución de pruebas'] },
       
        'ux-designer': {
            title: 'UX Designer',
            functions: [
                'Investigar y analizar las necesidades del usuario',
                'Crear personas y journey maps de usuarios',
                'Diseñar wireframes y prototipos de baja fidelidad',
                'Realizar pruebas de usabilidad',
                'Colaborar con el equipo de desarrollo en la implementación',
                'Optimizar la experiencia del usuario basada en feedback'
            ],
            skills: ['Investigación UX', 'Prototipado', 'Análisis de Usuario', 'Wireframing', 'Testing de Usabilidad'],
            metrics: [
                'Tiempo promedio de completación de tareas',
                'Tasa de satisfacción del usuario',
                'Número de iteraciones de diseño necesarias',
                'Reducción de errores de usuario'
            ]
        },
        
        'ui-designer': {
            title: 'UI Designer',
            functions: [
                'Crear interfaces visuales atractivas y funcionales',
                'Desarrollar sistemas de diseño y guías de estilo',
                'Diseñar prototipos de alta fidelidad',
                'Colaborar con desarrolladores para implementación pixel-perfect',
                'Optimizar diseños para diferentes dispositivos',
                'Mantener consistencia visual en toda la aplicación'
            ],
            skills: ['Diseño Visual', 'Sistemas de Diseño', 'Prototipado', 'Figma/Sketch', 'CSS/HTML Básico'],
            metrics: [
                'Consistencia visual del producto',
                'Tiempo de implementación de diseños',
                'Adherencia a guías de marca',
                'Feedback positivo sobre interfaz'
            ]
        },
        
        'business-analyst': {
            title: 'Business Analyst',
            functions: [
                'Analizar procesos de negocio y identificar mejoras',
                'Recopilar y documentar requisitos funcionales',
                'Crear documentación técnica y de usuario',
                'Facilitar comunicación entre stakeholders y equipo técnico',
                'Realizar análisis de impacto de cambios',
                'Validar que las soluciones cumplan objetivos de negocio'
            ],
            skills: ['Análisis de Procesos', 'Documentación', 'Comunicación', 'Modelado de Procesos', 'Gestión de Requisitos'],
            metrics: [
                'Precisión en la captura de requisitos',
                'Reducción de retrabajo por malentendidos',
                'Satisfacción de stakeholders',
                'Tiempo de análisis de procesos'
            ]
        },
        
        'devops-engineer': {
            title: 'DevOps Engineer',
            functions: [
                'Automatizar procesos de CI/CD',
                'Gestionar infraestructura cloud y on-premise',
                'Monitorear sistemas y aplicaciones',
                'Optimizar rendimiento y escalabilidad',
                'Implementar medidas de seguridad',
                'Colaborar en estrategias de deployment'
            ],
            skills: ['Docker', 'Kubernetes', 'AWS/Azure', 'Jenkins', 'Terraform', 'Monitoring'],
            metrics: [
                'Tiempo de deployment',
                'Uptime de sistemas',
                'Frecuencia de releases',
                'Tiempo de recuperación ante fallos'
            ]
        },
        
        'data-analyst': {
            title: 'Data Analyst',
            functions: [
                'Analizar datos para extraer insights de negocio',
                'Crear dashboards y reportes ejecutivos',
                'Identificar patrones y tendencias en los datos',
                'Colaborar en definición de KPIs',
                'Realizar análisis estadísticos',
                'Presentar hallazgos a stakeholders'
            ],
            skills: ['SQL', 'Python/R', 'Power BI/Tableau', 'Estadística', 'Excel Avanzado'],
            metrics: [
                'Precisión de predicciones',
                'Tiempo de generación de reportes',
                'Calidad de insights proporcionados',
                'Adopción de recomendaciones'
            ]
        },
        
        'tech-lead': {
            title: 'Tech Lead',
            functions: [
                'Liderar técnicamente al equipo de desarrollo',
                'Tomar decisiones arquitectónicas clave',
                'Mentorear desarrolladores junior',
                'Revisar código y establecer estándares',
                'Coordinar con otros equipos técnicos',
                'Balancear deuda técnica con nuevas funcionalidades'
            ],
            skills: ['Liderazgo Técnico', 'Arquitectura', 'Mentoring', 'Code Review', 'Gestión de Equipos'],
            metrics: [
                'Calidad del código del equipo',
                'Velocidad de desarrollo',
                'Crecimiento del equipo',
                'Reducción de bugs en producción'
            ]
        },
        
        'architect': {
            title: 'Software Architect',
            functions: [
                'Diseñar arquitectura de software escalable',
                'Definir estándares y patrones de desarrollo',
                'Evaluar y seleccionar tecnologías',
                'Crear documentación arquitectónica',
                'Revisar diseños técnicos complejos',
                'Planificar evolución técnica del producto'
            ],
            skills: ['Arquitectura de Software', 'Patrones de Diseño', 'Microservicios', 'APIs', 'Documentación Técnica'],
            metrics: [
                'Escalabilidad del sistema',
                'Mantenibilidad del código',
                'Performance de la aplicación',
                'Adherencia a estándares arquitectónicos'
            ]
        }
    };

    // Array que contiene los miembros del equipo.
    const teamMembers = [
        { id: 1, name: 'Sofia Bonilla', email: 'sofia.b@example.com', avatar: null, role: null },
        { id: 2, name: 'Carlos Vega', email: 'carlos.v@example.com', avatar: 'https://i.pravatar.cc/150?img=11', role: 'developer' },
        { id: 3, name: 'Ana Torres', email: 'ana.t@example.com', avatar: 'https://i.pravatar.cc/150?img=5', role: 'product-owner' },
        { id: 4, name: 'Luis Rojas', email: 'luis.r@example.com', avatar: 'https://i.pravatar.cc/150?img=8', role: 'developer' },
        { id: 5, name: 'Elena Mendoza', email: 'elena.m@example.com', avatar: 'https://i.pravatar.cc/150?img=20', role: null },
    ];

    // --- State ---
    let selectedUser = null;
    let selectedRoleKey = 'scrum-master';
    let currentIndex = 0;

    // --- Selectors ---
    const selectors = {
        track: document.querySelector('.roles-track'),
        roles: Array.from(document.querySelectorAll('.role-btn')),
        nextButton: document.getElementById('next-role'),
        prevButton: document.getElementById('prev-role'),
        functionsList: document.getElementById('functions-list'),
        skillsList: document.getElementById('skills-list'),
        metricsList: document.getElementById('metrics-list'),
        infoTabs: document.querySelector('.info-tabs'),
        tabContents: document.querySelectorAll('.tab-content'),
        changeUserBtn: document.getElementById('change-user-btn'),
        userSelectionModal: document.getElementById('user-selection-modal'),
        userListContainer: document.getElementById('user-list'),
        userSearchInput: document.getElementById('user-search-input'),
        userNameEl: document.getElementById('user-name'),
        userAvatarEl: document.getElementById('user-avatar'),
        assignRoleBtn: document.getElementById('assign-role-btn'),
        removeRoleBtn: document.getElementById('remove-role-btn'),
        confirmModal: document.getElementById('confirm-assignment-modal'),
        confirmTextEl: document.getElementById('confirm-text'),
        confirmAssignmentBtn: document.getElementById('confirm-assignment-btn'),
        currentRoleContainer: document.getElementById('current-role-container'),
        currentRoleText: document.getElementById('current-role-text'),
        clearUserBtn: document.getElementById('clear-user-btn'),
        membersWithRoleContainer: document.getElementById('members-with-role-container'),
        membersList: document.getElementById('members-list'),
    };

    // --- Functions ---

    const openModal = (modal) => modal.classList.add('visible');
    const closeModal = (modal) => modal.classList.remove('visible');

    const showToast = (message, type = 'success') => {
        const toastContainer = document.getElementById('toast-container');
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        const icon = type === 'success' ? 'bx-check-circle' : 'bx-x-circle';
        toast.innerHTML = `<i class='bx ${icon}'></i> ${message}`;
        toastContainer.appendChild(toast);
        setTimeout(() => { toast.style.opacity = '0'; toast.addEventListener('transitionend', () => toast.remove()); }, 4000);
    };

    const renderUserList = (users = teamMembers) => {
        selectors.userListContainer.innerHTML = users.map(user => {
            const avatarContent = user.avatar ? `<img src="${user.avatar}" alt="${user.name}">` : `<i class='bx bx-user'></i>`;
            const roleTag = user.role ? `<span class="role-tag">${rolesData[user.role].name}</span>` : '';
            return `
                <li class="user-list-item" data-user-id="${user.id}">
                    <div class="avatar">${avatarContent}</div>
                    <div class="user-info">
                        <p class="name">${user.name}</p>
                        <p class="email">${user.email}</p>
                    </div>
                    ${roleTag}
                </li>`;
        }).join('');
    };

    const updateUserInfo = () => {
        if (selectedUser) {
            selectors.userNameEl.textContent = selectedUser.name;
            selectors.userAvatarEl.innerHTML = selectedUser.avatar ? `<img src="${selectedUser.avatar}" alt="${selectedUser.name}">` : `<i class='bx bx-user-circle'></i>`;
            document.querySelector('.user-selection-prompt').style.display = 'none';
            document.querySelector('.user-details').style.display = 'flex';
            selectors.assignRoleBtn.disabled = false;
            selectors.removeRoleBtn.disabled = !selectedUser.role;
            if (selectedUser.role) {
                selectors.currentRoleText.textContent = rolesData[selectedUser.role].name;
                selectors.currentRoleContainer.style.display = 'block';
            } else {
                selectors.currentRoleContainer.style.display = 'none';
            }
        } else {
            document.querySelector('.user-selection-prompt').style.display = 'flex';
            document.querySelector('.user-details').style.display = 'none';
            selectors.assignRoleBtn.disabled = true;
            selectors.removeRoleBtn.disabled = true;
            selectors.currentRoleContainer.style.display = 'none';
        }
    };

    const updateRoleInfo = (roleKey) => {
        const role = rolesData[roleKey];
        if (!role) return;

        // CORRECCIÓN: Usar los IDs correctos de las listas UL dentro de cada panel de pestaña.
        const functionsList = document.querySelector('#tab-funciones ul');
        const skillsList = document.querySelector('#tab-habilidades ul');
        const metricsList = document.querySelector('#tab-metricas ul');

        if (functionsList) {
            functionsList.innerHTML = role.functions.map(item => `<li>${item}</li>`).join('');
        }
        if (skillsList) {
            skillsList.innerHTML = role.skills.map(item => `<li><i class='bx bx-check-shield'></i> ${item}</li>`).join('');
        }
        if (metricsList) {
            metricsList.innerHTML = role.metrics.map(item => `<li><i class='bx bx-chart'></i> ${item}</li>`).join('');
        }
    };

    const updateMembersWithRoleList = () => {
        const membersWithRole = teamMembers.filter(member => member.role === selectedRoleKey);
        selectors.membersList.innerHTML = '';
        if (membersWithRole.length > 0) {
            membersWithRole.forEach(member => {
                const avatarContent = member.avatar ? `<img src="${member.avatar}" alt="${member.name}">` : `<i class='bx bx-user'></i>`;
                const memberElement = document.createElement('div');
                memberElement.className = 'team-member-item';
                memberElement.innerHTML = `<div class="avatar">${avatarContent}</div><span>${member.name}</span>`;
                selectors.membersList.appendChild(memberElement);
            });
            selectors.membersWithRoleContainer.style.display = 'block';
        } else {
            selectors.membersWithRoleContainer.style.display = 'none';
        }
    };
    
    const moveToIndex = (index) => {
        const roleElement = selectors.roles[0];
        if (!roleElement) return;
        const roleWidth = roleElement.offsetWidth + parseInt(getComputedStyle(roleElement).marginRight);
        selectors.track.style.transform = `translateX(${-index * roleWidth}px)`;
        selectors.roles.forEach((r, i) => r.classList.toggle('active', i === index));
        selectors.prevButton.disabled = index === 0;
        selectors.nextButton.disabled = index >= selectors.roles.length - 1;
    };

    const updateAllInfoForNewRole = (newRoleKey, newIndex) => {
        currentIndex = newIndex;
        selectedRoleKey = newRoleKey;
        moveToIndex(newIndex);
        updateRoleInfo(newRoleKey);
        updateMembersWithRoleList();
    };

    // --- Event Listeners ---

    selectors.nextButton.addEventListener('click', () => {
        if (currentIndex < selectors.roles.length - 1) {
            const newIndex = currentIndex + 1;
            const newRoleKey = selectors.roles[newIndex].dataset.role;
            updateAllInfoForNewRole(newRoleKey, newIndex);
        }
    });

    selectors.prevButton.addEventListener('click', () => {
        if (currentIndex > 0) {
            const newIndex = currentIndex - 1;
            const newRoleKey = selectors.roles[newIndex].dataset.role;
            updateAllInfoForNewRole(newRoleKey, newIndex);
        }
    });

    selectors.roles.forEach((roleBtn, index) => {
        roleBtn.addEventListener('click', () => {
            const newRoleKey = roleBtn.dataset.role;
            updateAllInfoForNewRole(newRoleKey, index);
        });
    });

    selectors.infoTabs.addEventListener('click', (e) => {
        const tabButton = e.target.closest('.tab-link');
        if (!tabButton) return;
        const targetContentId = tabButton.dataset.tab;
        if (!targetContentId) return;
        selectors.infoTabs.querySelectorAll('.tab-link').forEach(btn => btn.classList.remove('active'));
        tabButton.classList.add('active');
        selectors.tabContents.forEach(content => {
            content.classList.toggle('active', content.id === targetContentId);
        });
    });

    selectors.changeUserBtn.addEventListener('click', () => {
        renderUserList();
        openModal(selectors.userSelectionModal);
    });

    document.querySelectorAll('.user-list-item').forEach(item => {
        item.addEventListener('click', () => {
            const userId = parseInt(item.dataset.userId, 10);
            selectedUser = teamMembers.find(u => u.id === userId);
            updateUserInfo();
            closeModal(selectors.userSelectionModal);
            selectors.userSearchInput.value = '';
        });
    });

    selectors.userListContainer.addEventListener('click', (e) => {
        const listItem = e.target.closest('.user-list-item');
        if (listItem) {
            const userId = parseInt(listItem.dataset.userId, 10);
            selectedUser = teamMembers.find(u => u.id === userId);
            updateUserInfo();
            closeModal(selectors.userSelectionModal);
            selectors.userSearchInput.value = '';
        }
    });

    selectors.userSearchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const filteredUsers = teamMembers.filter(user => user.name.toLowerCase().includes(searchTerm));
        renderUserList(filteredUsers);
    });

    selectors.clearUserBtn.addEventListener('click', () => {
        selectedUser = null;
        updateUserInfo();
        showToast('Selección de usuario limpiada.', 'error');
    });

    selectors.assignRoleBtn.addEventListener('click', () => {
        if (!selectedUser) return;
        if (selectedUser.role === selectedRoleKey) {
            showToast(`${selectedUser.name} ya tiene el rol de ${rolesData[selectedRoleKey].name}.`, 'error');
            return;
        }
        let confirmationMessage = `¿Confirmas que quieres asignar el rol de <strong>${rolesData[selectedRoleKey].name}</strong> a <strong>${selectedUser.name}</strong>?`;
        if (selectedUser.role) {
            confirmationMessage += `<br><small>Esto reemplazará su rol actual de <strong>${rolesData[selectedUser.role].name}</strong>.</small>`;
        }
        selectors.confirmTextEl.innerHTML = confirmationMessage;
        openModal(selectors.confirmModal);
    });

    selectors.confirmAssignmentBtn.addEventListener('click', () => {
        if (selectedUser && selectedRoleKey) {
            selectedUser.role = selectedRoleKey;
            showToast(`Rol "${rolesData[selectedRoleKey].name}" asignado a ${selectedUser.name}.`);
            updateUserInfo();
            renderUserList();
            updateMembersWithRoleList();
            closeModal(selectors.confirmModal);
        }
    });

    selectors.removeRoleBtn.addEventListener('click', () => {
        if (selectedUser && selectedUser.role) {
            const removedRoleName = rolesData[selectedUser.role].name;
            selectedUser.role = null;
            showToast(`Rol "${removedRoleName}" eliminado de ${selectedUser.name}.`, 'error');
            updateUserInfo();
            renderUserList();
            updateMembersWithRoleList();
        }
    });

    // --- Initial Setup ---
    const initialize = () => {
        updateAllInfoForNewRole(selectedRoleKey, currentIndex);
        updateUserInfo();
        selectors.infoTabs.querySelectorAll('.tab-link').forEach(btn => btn.classList.remove('active'));
        selectors.tabContents.forEach(content => content.classList.remove('active'));
        const firstTabButton = selectors.infoTabs.querySelector('.tab-link');
        if (firstTabButton) firstTabButton.classList.add('active');
        const firstTabContent = document.getElementById('tab-funciones');
        if (firstTabContent) firstTabContent.classList.add('active');
    };

    initialize();
});