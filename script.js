// Lista de tus preguntas
const preguntas = [
    "¿Te sientes cómodo trabajando en tu equipo actual?",
    "¿Consideras que hay buena comunicación entre los compañeros?",
    "¿Tu jefe o líder escucha tus opiniones?",
    "¿Sientes que tu trabajo es valorado?",
    "¿En tu entorno laboral se respetan las ideas de todos?",
    "¿Te sientes motivado al realizar tus tareas?",
    "¿Hay un ambiente de respeto entre los trabajadores?",
    "¿Crees que sabes trabajar bien en equipo?",
    "¿Te consideras una persona responsable con tus tareas?",
    "¿Sabes manejar conflictos sin generar problemas mayores?",
    "¿Te adaptas fácilmente a cambios en el trabajo?",
    "¿Sientes que tienes buena comunicación con tus superiores?",
    "¿En tu trabajo se promueve el compañerismo?",
    "¿Te sientes capaz de liderar un grupo cuando es necesario?",
    "¿Crees que el ambiente laboral influye en tu rendimiento?"
];

const contenedorPreguntas = document.getElementById('contenedor-preguntas');
const formulario = document.getElementById('encuestaForm');

// 1. Generar las preguntas dinámicamente
preguntas.forEach((pregunta, index) => {
    // Creamos un bloque para cada pregunta
    const div = document.createElement('div');
    div.className = 'form-group';

    // Creamos el texto de la pregunta
    const label = document.createElement('label');
    label.textContent = `${index + 1}. ${pregunta}`;
    div.appendChild(label);

    // Creamos las opciones de respuesta
    const divOpciones = document.createElement('div');
    divOpciones.className = 'opciones';

    const opciones = ['Sí', 'No', 'No lo sé'];
    
    opciones.forEach(opcion => {
        const labelOpcion = document.createElement('label');
        // El input tipo "radio" es el circulito seleccionable
        const input = document.createElement('input');
        input.type = 'radio';
        input.name = `pregunta_${index}`; // Mismo nombre agrupa las opciones
        input.value = opcion;
        input.required = true; // Hace que sea obligatorio responder

        labelOpcion.appendChild(input);
        labelOpcion.appendChild(document.createTextNode(` ${opcion}`));
        divOpciones.appendChild(labelOpcion);
    });

    div.appendChild(divOpciones);
    contenedorPreguntas.appendChild(div);
});

// 2. Guardar las respuestas al enviar el formulario
formulario.addEventListener('submit', function(evento) {
    // Evitamos que la página se recargue (comportamiento por defecto)
    evento.preventDefault();

    // Recolectamos los datos
    const datosEncuesta = {
        nombre: document.getElementById('nombre').value,
        respuestas: {},
        fecha: new Date().toLocaleString()
    };

    // Guardamos la respuesta de cada pregunta
    preguntas.forEach((pregunta, index) => {
        const respuestaSeleccionada = document.querySelector(`input[name="pregunta_${index}"]:checked`).value;
        datosEncuesta.respuestas[`Pregunta ${index + 1}`] = {
            pregunta: pregunta,
            respuesta: respuestaSeleccionada
        };
    });

    // Guardamos en el localStorage del navegador
    // Convertimos el objeto de JavaScript a texto (JSON) para poder guardarlo
    let encuestasGuardadas = JSON.parse(localStorage.getItem('encuestasClimaLaboral')) || [];
    encuestasGuardadas.push(datosEncuesta);
    localStorage.setItem('encuestasClimaLaboral', JSON.stringify(encuestasGuardadas));

    // Avisamos al usuario y limpiamos el formulario
    alert('¡Gracias por tu tiempo! Tus respuestas han sido guardadas.');
    formulario.reset();
    
    // Para que veas que sí se guardó, lo imprimimos en la consola de tu navegador
    console.log("Encuestas guardadas hasta ahora:", encuestasGuardadas);
});