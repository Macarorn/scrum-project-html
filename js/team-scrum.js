document.addEventListener('DOMContentLoaded', () => {
    // --- SELECTORES DEL DOM ---
    // Almacena referencias a los elementos del DOM para un acceso más rápido y organizado.
    const skillsGrid = document.querySelector('.skills-grid');
    const addSkillCard = document.querySelector('.add-skill-card');
    const selectedSkillsList = document.getElementById('selected-skills-list');
    const skillCount = document.getElementById('skill-count');
    const noSkillsPlaceholder = document.querySelector('.no-skills-placeholder');
    const clearAllBtn = document.getElementById('clear-all-btn');
    const continueBtn = document.querySelector('.continue-btn');

    // Profile Strength
    const strengthCircle = document.getElementById('profile-strength-circle');
    const strengthStatus = document.getElementById('profile-strength-status');
    const radius = strengthCircle.r.baseVal.value;
    const circumference = 2 * Math.PI * radius;
    strengthCircle.style.strokeDasharray = `${circumference} ${circumference}`;
    strengthCircle.style.strokeDashoffset = circumference;

    // Modals
    const addSkillModal = document.getElementById('add-skill-modal');
    const confirmClearModal = document.getElementById('confirm-clear-modal');
    const summaryModal = document.getElementById('summary-modal');

    // --- FUNCIONES AUXILIARES ---

    /**
     * Abre un modal cambiando su estilo a 'flex'.
     * @param {HTMLElement} modal - El elemento del modal a mostrar.
     */
    const openModal = (modal) => modal.style.display = 'flex';

    /**
     * Cierra un modal cambiando su estilo a 'none'.
     * @param {HTMLElement} modal - El elemento del modal a ocultar.
     */
    const closeModal = (modal) => modal.style.display = 'none';

    /**
     * Actualiza el círculo de progreso y el texto de estado.
     * @param {number} percent - El porcentaje de progreso (0-100).
     */
    function setProgress(percent) {
        const offset = circumference - percent / 100 * circumference;
        strengthCircle.style.strokeDashoffset = offset;

        if (percent === 0) strengthStatus.textContent = 'Vacío';
        else if (percent < 30) strengthStatus.textContent = 'Básico';
        else if (percent < 70) strengthStatus.textContent = 'Intermedio';
        else if (percent < 100) strengthStatus.textContent = 'Avanzado';
        else strengthStatus.textContent = 'Experto';
    }

    /**
     * Actualiza el panel de resumen de habilidades seleccionadas.
     * Agrupa las habilidades por categoría y las ordena.
     */
    function updateSelectedSkills() {
        const starredSkills = JSON.parse(localStorage.getItem('starredSkills')) || [];
        selectedSkillsList.innerHTML = '';
        const selectedByCategory = {};
        let count = 0;
        const totalCheckboxes = document.querySelectorAll('.skills-form input[type="checkbox"]').length;

        document.querySelectorAll('.skills-form input[type="checkbox"]:checked').forEach(checkbox => {
            count++;
            const categoryElement = checkbox.closest('.skill-category');
            if (categoryElement) {
                const categoryHeader = categoryElement.querySelector('h3');
                const categoryIconHTML = categoryHeader.querySelector('i')?.outerHTML || '';
                const categoryNameNode = categoryHeader.cloneNode(true);
                categoryNameNode.querySelector('i')?.remove();
                const categoryName = categoryNameNode.textContent.trim();
                
                const skill = {
                    id: checkbox.id,
                    name: checkbox.nextElementSibling.textContent,
                    category: categoryName,
                    categoryIconHTML: categoryIconHTML,
                    isStarred: starredSkills.includes(checkbox.id)
                };
                if (!selectedByCategory[skill.category]) selectedByCategory[skill.category] = [];
                selectedByCategory[skill.category].push(skill);
            }
        });

        Object.keys(selectedByCategory).sort().forEach(category => {
            const header = document.createElement('div');
            header.className = 'summary-category-header';
            const categoryIcon = selectedByCategory[category][0].categoryIconHTML;
            header.innerHTML = `${categoryIcon} ${category}`;
            selectedSkillsList.appendChild(header);

            const sortedSkills = selectedByCategory[category].sort((a, b) => b.isStarred - a.isStarred);
            sortedSkills.forEach(skill => {
                const listItem = document.createElement('li');
                listItem.className = skill.isStarred ? 'starred' : '';
                listItem.dataset.skillId = skill.id;
                const starIconClass = skill.isStarred ? 'bxs-star' : 'bx-star';
                listItem.innerHTML = `
                    <span class="skill-name-with-icon">${skill.categoryIconHTML} ${skill.name}</span>
                    <div class="skill-actions">
                        <button class="star-skill-btn ${skill.isStarred ? 'starred' : ''}" title="Priorizar"><i class='bx ${starIconClass}'></i></button>
                        <button class="remove-skill-btn" title="Eliminar">&times;</button>
                    </div>
                `;
                selectedSkillsList.appendChild(listItem);
            });
        });

        skillCount.textContent = count;
        clearAllBtn.disabled = count === 0;
        continueBtn.disabled = count === 0;
        if (count === 0) {
            selectedSkillsList.appendChild(noSkillsPlaceholder);
        }

        const progress = totalCheckboxes > 0 ? (count / totalCheckboxes) * 100 : 0;
        setProgress(Math.min(progress, 100)); // Cap at 100%
        saveState();
    }

    // --- GESTIÓN DE ESTADO (LocalStorage) ---

    /**
     * Guarda las habilidades seleccionadas en localStorage.
     */
    function saveState() {
        const selectedIds = Array.from(document.querySelectorAll('.skills-form input[type="checkbox"]:checked')).map(cb => cb.id);
        localStorage.setItem('selectedSkills', JSON.stringify(selectedIds));
    }

    /**
     * Carga el estado de las habilidades seleccionadas desde localStorage.
     */
    function loadState() {
        const selectedIds = JSON.parse(localStorage.getItem('selectedSkills')) || [];
        selectedIds.forEach(id => {
            const checkbox = document.getElementById(id);
            if (checkbox) checkbox.checked = true;
        });
        updateSelectedSkills();
    }

    /**
     * Añade o quita una habilidad de la lista de prioritarias (estrelladas).
     * @param {string} skillId - El ID de la habilidad a marcar/desmarcar.
     */
    function toggleStar(skillId) {
        let starredSkills = JSON.parse(localStorage.getItem('starredSkills')) || [];
        if (starredSkills.includes(skillId)) {
            starredSkills = starredSkills.filter(id => id !== skillId);
        } else {
            starredSkills.push(skillId);
        }
        localStorage.setItem('starredSkills', JSON.stringify(starredSkills));
        updateSelectedSkills();
    }

    // --- MANEJADORES DE EVENTOS ---

    // Escucha cambios en los checkboxes del formulario de habilidades.
    document.querySelector('.skills-form').addEventListener('change', e => {
        if (e.target.type === 'checkbox') {
            updateSelectedSkills();
        }
    });

    // Escucha clics en la lista de habilidades seleccionadas (para eliminar o priorizar).
    selectedSkillsList.addEventListener('click', e => {
        const removeBtn = e.target.closest('.remove-skill-btn');
        const starBtn = e.target.closest('.star-skill-btn');
        if (removeBtn) {
            const skillId = removeBtn.closest('li').dataset.skillId;
            const checkbox = document.getElementById(skillId);
            if (checkbox) {
                checkbox.checked = false;
                updateSelectedSkills();
            }
        } else if (starBtn) {
            const skillId = starBtn.closest('li').dataset.skillId;
            toggleStar(skillId);
        }
    });

    // --- GESTIÓN DE MODALES ---

    // Cierra cualquier modal al hacer clic fuera de él o en el botón de cerrar.
    [addSkillModal, confirmClearModal, summaryModal].forEach(modal => {
        modal.addEventListener('click', e => {
            if (e.target === modal || e.target.classList.contains('modal-close') || e.target.id === 'cancel-clear-btn' || e.target.id === 'close-summary-modal-btn') {
                closeModal(modal);
            }
        });
    });

    // Abre el modal para añadir una nueva habilidad.
    addSkillCard.addEventListener('click', () => openModal(addSkillModal));

    // Gestiona el envío del formulario para añadir una nueva habilidad.
    document.getElementById('add-skill-form').addEventListener('submit', e => {
        e.preventDefault();
        const skillNameInput = document.getElementById('new-skill-name');
        const categoryNameInput = document.getElementById('new-skill-category');
        const skillName = skillNameInput.value.trim();
        const categoryName = categoryNameInput.value.trim();
        if (!skillName || !categoryName) return;

        const normalizedSkillName = skillName.toLowerCase().replace(/\s+/g, '-');
        let categoryDiv = Array.from(skillsGrid.querySelectorAll('h3')).find(h3 => {
            const h3Clone = h3.cloneNode(true);
            h3Clone.querySelector('i')?.remove();
            return h3Clone.textContent.trim().toLowerCase() === categoryName.toLowerCase();
        })?.parentElement;

        if (categoryDiv && Array.from(categoryDiv.querySelectorAll('label')).some(l => l.textContent.trim().toLowerCase() === skillName.toLowerCase())) {
            alert('Esta habilidad ya existe en esta categoría.');
            return;
        }

        if (!categoryDiv) {
            categoryDiv = document.createElement('div');
            categoryDiv.className = 'skill-category dynamic';
            categoryDiv.innerHTML = `<h3><i class='bx bx-purchase-tag-alt'></i>${categoryName}</h3>`;
            skillsGrid.insertBefore(categoryDiv, addSkillCard);
        }
        
        const newSkillDiv = document.createElement('div');
        newSkillDiv.className = 'checkbox-group new-skill-animation';
        newSkillDiv.innerHTML = `<input type="checkbox" id="${normalizedSkillName}" checked><label for="${normalizedSkillName}">${skillName}</label><button class="delete-skill-btn" title="Eliminar habilidad">&times;</button>`;
        categoryDiv.appendChild(newSkillDiv);
        setTimeout(() => newSkillDiv.classList.remove('new-skill-animation'), 1500);
        
        document.getElementById('add-skill-form').reset();
        closeModal(addSkillModal);
        updateSelectedSkills();
        saveSkills();
    });

    // Gestiona la eliminación de una habilidad desde la grilla principal.
    skillsGrid.addEventListener('click', e => {
        if (e.target.classList.contains('delete-skill-btn')) {
            const skillDiv = e.target.parentElement;
            const categoryDiv = skillDiv.parentElement;
            skillDiv.remove();
            if (categoryDiv.querySelectorAll('.checkbox-group').length === 0) {
                categoryDiv.remove();
            }
            saveSkills();
            updateSelectedSkills();
        }
    });

    // Abre el modal de confirmación para limpiar todas las habilidades.
    clearAllBtn.addEventListener('click', () => openModal(confirmClearModal));

    // Confirma y ejecuta la limpieza de todas las habilidades.
    document.getElementById('confirm-clear-btn').addEventListener('click', () => {
        document.querySelectorAll('.skills-form input[type="checkbox"]:checked').forEach(cb => cb.checked = false);
        localStorage.setItem('starredSkills', JSON.stringify([]));
        updateSelectedSkills();
        closeModal(confirmClearModal);
    });

    // Muestra el resumen final en un modal al hacer clic en "Continuar".
    continueBtn.addEventListener('click', () => {
        const finalSummaryList = document.getElementById('final-summary-list');
        const list = selectedSkillsList.cloneNode(true);
        list.querySelectorAll('.skill-actions').forEach(el => el.remove());
        list.querySelectorAll('li').forEach(li => li.style.padding = '8px 0');
        finalSummaryList.innerHTML = '';
        finalSummaryList.appendChild(list);
        openModal(summaryModal);
    });

    // --- INICIALIZACIÓN Y PERSISTENCIA DE HABILIDADES DINÁMICAS ---

    /**
     * Guarda la estructura actual de habilidades (incluyendo las añadidas dinámicamente) en localStorage.
     */
    const saveSkills = () => {
        const skillsData = [];
        skillsGrid.querySelectorAll('.skill-category').forEach(categoryDiv => {
            const categoryH3 = categoryDiv.querySelector('h3');
            const categoryNameNode = categoryH3.cloneNode(true);
            const iconHTML = categoryNameNode.querySelector('i')?.outerHTML || '';
            categoryNameNode.querySelector('i')?.remove();
            const categoryName = categoryNameNode.textContent.trim();
            const skills = [];
            categoryDiv.querySelectorAll('.checkbox-group').forEach(skillDiv => {
                const label = skillDiv.querySelector('label');
                if (label) skills.push({ id: label.getAttribute('for'), name: label.textContent });
            });
            if (skills.length > 0) skillsData.push({ categoryName, iconHTML, skills });
        });
        localStorage.setItem('userSkills', JSON.stringify(skillsData));
    };

    /**
     * Carga las habilidades añadidas por el usuario desde localStorage y las renderiza.
     */
    const loadSkills = () => {
        const skillsData = JSON.parse(localStorage.getItem('userSkills')) || [];
        const staticCategories = new Set();
        skillsGrid.querySelectorAll('.skill-category:not(.dynamic) h3').forEach(h3 => {
             const categoryNameNode = h3.cloneNode(true);
             categoryNameNode.querySelector('i')?.remove();
             staticCategories.add(categoryNameNode.textContent.trim().toLowerCase());
        });
        skillsData.forEach(cat => {
            if (!staticCategories.has(cat.categoryName.toLowerCase())) {
                const categoryDiv = document.createElement('div');
                categoryDiv.className = 'skill-category dynamic';
                categoryDiv.innerHTML = `<h3>${cat.iconHTML}${cat.categoryName}</h3>`;
                cat.skills.forEach(skill => {
                    const newSkillDiv = document.createElement('div');
                    newSkillDiv.className = 'checkbox-group';
                    newSkillDiv.innerHTML = `<input type="checkbox" id="${skill.id}"><label for="${skill.id}">${skill.name}</label><button class="delete-skill-btn" title="Eliminar habilidad">&times;</button>`;
                    categoryDiv.appendChild(newSkillDiv);
                });
                skillsGrid.insertBefore(categoryDiv, addSkillCard);
            }
        });
    };

    // --- CARGA INICIAL ---
    // Carga las habilidades y el estado al iniciar la página.
    loadSkills();
    loadState();

    // Redirige a funciones.html al cerrar el modal de resumen
    document.getElementById('close-summary-modal-btn').addEventListener('click', function() {
        window.location.href = 'funciones.html';
    });

    
   [addSkillModal, confirmClearModal, summaryModal].forEach(modal => {
    modal.addEventListener('click', e => {
        if (e.target === modal || e.target.classList.contains('modal-close') || e.target.id === 'cancel-clear-btn' || e.target.id === 'close-summary-modal-btn') {
            closeModal(modal);
        }
    });
});
});