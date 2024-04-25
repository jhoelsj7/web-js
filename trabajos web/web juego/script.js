function openModal() {
    var modal = document.getElementById("myModal");
    modal.style.display = "block";
}

function closeModal() {
    var modal = document.getElementById("myModal");
    modal.style.display = "none";
}

// Cierra el modal si el usuario hace clic fuera de él
window.onclick = function(event) {
    var modal = document.getElementById("myModal");
    if (event.target == modal) {
        closeModal();
    }
}

// Función para abrir la calculadora científica
function openCalculator() {
    // Redirecciona a la página de la calculadora científica
    window.location.href = 'calculadora.html';
}

