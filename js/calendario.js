let fechaSeleccionada = null;

// Fechas de reuniones de ejemplo (formato: 'YYYY-MM-DD')
const reunionesEjemplo = [
    '2025-07-08',
    '2025-07-10',
    '2025-07-15'
];

document.addEventListener('DOMContentLoaded', function () {
    // --- CONFIGURACIÓN ---
    const eventDates = [
        "2025-11-12", "2025-11-19", "2025-11-23", "2025-11-25", "2025-11-27", "2025-11-29"
    ]; // Agrega aquí tus fechas de reuniones en formato YYYY-MM-DD

    // --- ELEMENTOS ---
    const monthNames = [
        "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
        "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ];
    const monthSelect = document.getElementById('calendar-month');
    const yearSelect = document.getElementById('calendar-year');
    const calendarBody = document.getElementById('calendar-body');
    const prevBtn = document.getElementById('prev-month');
    const nextBtn = document.getElementById('next-month');

    // --- FECHA ACTUAL ---
    let today = new Date();
    let currentMonth = today.getMonth();
    let currentYear = today.getFullYear();

    // --- RELLENAR SELECTS ---
    for (let m = 0; m < 12; m++) {
        let opt = document.createElement('option');
        opt.value = m;
        opt.textContent = monthNames[m];
        monthSelect.appendChild(opt);
    }
    for (let y = currentYear - 5; y <= currentYear + 5; y++) {
        let opt = document.createElement('option');
        opt.value = y;
        opt.textContent = y;
        yearSelect.appendChild(opt);
    }

    // --- EVENTOS DE SELECT Y BOTONES ---
    monthSelect.addEventListener('change', () => {
        currentMonth = parseInt(monthSelect.value);
        renderCalendar();
    });
    yearSelect.addEventListener('change', () => {
        currentYear = parseInt(yearSelect.value);
        renderCalendar();
    });
    prevBtn.addEventListener('click', () => {
        if (currentMonth === 0) {
            currentMonth = 11;
            currentYear--;
        } else {
            currentMonth--;
        }
        updateSelects();
        renderCalendar();
    });
    nextBtn.addEventListener('click', () => {
        if (currentMonth === 11) {
            currentMonth = 0;
            currentYear++;
        } else {
            currentMonth++;
        }
        updateSelects();
        renderCalendar();
    });

    function updateSelects() {
        monthSelect.value = currentMonth;
        yearSelect.value = currentYear;
    }

    // --- RENDERIZAR CALENDARIO ---
    function renderCalendar() {
        calendarBody.innerHTML = "";

        // Primer día del mes actual
        let firstDay = new Date(currentYear, currentMonth, 1);
        // Día de la semana (lunes=0, domingo=6)
        let startDay = (firstDay.getDay() + 6) % 7;

        // Días en el mes actual
        let daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
        // Días en el mes anterior
        let daysInPrevMonth = new Date(currentYear, currentMonth, 0).getDate();

        let date = 1;
        let nextMonthDate = 1;
        let finished = false;

        while (!finished) {
            let row = document.createElement('tr');
            for (let j = 0; j < 7; j++) {
                let cell = document.createElement('td');
                let cellDay;

                // Primera fila: días del mes anterior
                if (calendarBody.children.length === 0 && j < startDay) {
                    cellDay = daysInPrevMonth - startDay + j + 1;
                    cell.textContent = cellDay;
                    cell.classList.add('calendar-other');
                }
                // Días del mes actual
                else if (date <= daysInMonth) {
                    cellDay = date;
                    cell.textContent = cellDay;
                    cell.classList.add('calendar-event');
                    let dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(date).padStart(2, '0')}`;
                    cell.setAttribute('data-date', dateStr);

                    // Marca las celdas que están en las fechas de reuniones de ejemplo
                    if (reunionesEjemplo.includes(dateStr)) {
                        cell.classList.add('calendar-marked');
                    }

                    date++;
                }
                // Últimas filas: días del mes siguiente
                else {
                    cellDay = nextMonthDate;
                    cell.textContent = cellDay;
                    cell.classList.add('calendar-other');
                    nextMonthDate++;
                }
                row.appendChild(cell);
            }
            calendarBody.appendChild(row);

            // Termina si ya se mostraron todos los días del mes actual y la última fila tiene al menos un día del mes actual
            if (date > daysInMonth) {
                // Verifica si la fila actual solo tiene días del mes siguiente
                let onlyNextMonth = true;
                for (let k = 0; k < 7; k++) {
                    if (row.children[k].classList.contains('calendar-event')) {
                        onlyNextMonth = false;
                        break;
                    }
                }
                if (onlyNextMonth) {
                    calendarBody.removeChild(row); // Elimina la fila extra si solo tiene días del mes siguiente
                }
                finished = true;
            }
        }
        // Vuelve a enlazar los eventos de animación si los usas
        if (typeof window.calendarEventAnimation === "function") window.calendarEventAnimation();
    }

    // --- INICIALIZAR ---
    updateSelects();
    renderCalendar();

    // --- (Opcional) Vuelve a enlazar animaciones entre calendario y eventos ---
    window.calendarEventAnimation = function () {
        document.querySelectorAll('.calendar-event').forEach(td => {
            td.addEventListener('click', function (e) {
                e.stopPropagation();
                document.querySelectorAll('.calendar-event').forEach(d => d.classList.remove('selected'));
                td.classList.add('selected');
                fechaSeleccionada = td.getAttribute('data-date');
                // Mostrar el botón de agregar reunión
                const addBtn = document.getElementById('add-event-btn');
                if (addBtn) addBtn.style.display = 'flex';
            });
        });
    };
    window.calendarEventAnimation();

    // Mostrar/ocultar picker al hacer clic en el ícono de calendario
    const pickerBtn = document.getElementById('calendar-picker-btn');
    const picker = document.getElementById('calendar-picker');
    pickerBtn.addEventListener('click', function (e) {
        picker.classList.toggle('calendar-picker-hidden');
        e.stopPropagation();
    });

    // Ocultar picker si se hace clic fuera
    document.addEventListener('click', function (e) {
        if (!picker.contains(e.target) && e.target !== pickerBtn) {
            picker.classList.add('calendar-picker-hidden');
        }
    });

    document.addEventListener('click', function (e) {
        const addBtn = document.getElementById('add-event-btn');
        if (addBtn && !e.target.classList.contains('calendar-event')) {
            addBtn.style.display = 'none';
        }
    });

    // Mostrar el modal al presionar el botón
    document.getElementById('add-event-btn').addEventListener('click', function(e) {
        document.getElementById('modal-reunion').classList.remove('modal-reunion-hidden');
        this.style.display = 'none'; // Oculta el botón hasta que se seleccione otra fecha
        e.stopPropagation();
    });

    // Cerrar el modal al presionar "Cancelar"
    document.getElementById('cerrar-modal-reunion').addEventListener('click', function() {
        document.getElementById('modal-reunion').classList.add('modal-reunion-hidden');
    });

    // Opcional: cerrar modal al hacer click fuera del contenido
    document.getElementById('modal-reunion').addEventListener('click', function(e) {
        if (e.target === this) {
            this.classList.add('modal-reunion-hidden');
        }
    });

    // Guardar reunión y mostrarla en la lista
    document.getElementById('guardar-reunion').addEventListener('click', function() {
        const titulo = document.getElementById('reunion-titulo').value.trim();
        const desc = document.getElementById('reunion-desc').value.trim();
        if (!titulo) {
            alert('Por favor ingresa un título.');
            return;
        }
        if (!fechaSeleccionada) {
            alert('Selecciona una fecha en el calendario.');
            return;
        }

        // Formatea la fecha
        const fechaObj = new Date(fechaSeleccionada);
        const opciones = { day: 'numeric', month: 'short', year: 'numeric' };
        const fechaFormateada = fechaObj.toLocaleDateString('es-ES', opciones);

        // Crear tarjeta de reunión
        const eventList = document.getElementById('event-list');
        const card = document.createElement('div');
        card.className = 'event-card';
        card.setAttribute('data-date', fechaSeleccionada); // <-- Aquí
        card.innerHTML = `
            <div class="event-date">
                <span class="event-day">${fechaObj.getDate()}</span>
                <span class="event-month">${fechaObj.toLocaleString('es-ES', { month: 'short' }).toUpperCase()}</span>
            </div>
            <div class="event-info">
                <span class="event-title">${titulo}</span>
                <span class="event-desc">${desc}</span>
            </div>
            <button class="delete-event-btn" title="Eliminar reunión">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="3 6 5 6 21 6"/>
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2"/>
                    <line x1="10" y1="11" x2="10" y2="17"/>
                    <line x1="14" y1="11" x2="14" y2="17"/>
                </svg>
            </button>
        `;
        eventList.appendChild(card);
        card.querySelector('.delete-event-btn').addEventListener('click', function(e) {
            e.stopPropagation();
            // Mostrar modal de confirmación
            const modalConfirm = document.getElementById('modal-confirmar-eliminar');
            modalConfirm.classList.remove('modal-reunion-hidden');

            // Al confirmar, elimina la tarjeta
            const confirmarBtn = document.getElementById('confirmar-eliminar-btn');
            const cancelarBtn = document.getElementById('cancelar-eliminar-btn');

            // Limpia listeners anteriores para evitar duplicados
            confirmarBtn.onclick = function() {
                card.remove();
                modalConfirm.classList.add('modal-reunion-hidden');
            };
            cancelarBtn.onclick = function() {
                modalConfirm.classList.add('modal-reunion-hidden');
            };
        });

        // Evento para seleccionar la fecha en el calendario al hacer clic en la tarjeta
        card.addEventListener('click', function(e) {
            e.stopPropagation();
            document.querySelectorAll('.calendar-event').forEach(td => td.classList.remove('selected'));
            const fecha = card.getAttribute('data-date');
            const celda = document.querySelector(`.calendar-event[data-date="${fecha}"]`);
            if (celda) {
                celda.classList.add('selected');
                fechaSeleccionada = fecha;
                const addBtn = document.getElementById('add-event-btn');
                if (addBtn) addBtn.style.display = 'flex';
                celda.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        });

        // Limpiar y cerrar modal
        document.getElementById('reunion-titulo').value = '';
        document.getElementById('reunion-desc').value = '';
        document.getElementById('modal-reunion').classList.add('modal-reunion-hidden');
    });

    document.addEventListener('click', function(e) {
        // Si el click NO es sobre una celda de fecha
        if (!e.target.classList.contains('calendar-event')) {
            document.querySelectorAll('.calendar-event.selected').forEach(td => {
                td.classList.remove('selected');
            });
            // Opcional: también puedes ocultar el botón de agregar reunión
            const addBtn = document.getElementById('add-event-btn');
            if (addBtn) addBtn.style.display = 'none';
        }
    });

    document.getElementById('calendar-current-title').textContent =
        `${monthNames[currentMonth]} ${currentYear}`;
});