document.addEventListener('DOMContentLoaded', () => {
  const selRecurso   = document.getElementById('recurso');      
  const precioc   = document.getElementById('campoprecios'); 
  const inputPrecio  = document.getElementById('Precios');    

  function actualizarPrecioSegunTipo() {
    const tipo = selRecurso.value;

    const debeMostrar = (tipo === 'Libro' || tipo === 'Clases particulares');

    if (debeMostrar) {
      precioc.style.display = ''; 
      inputPrecio.required = true;
      inputPrecio.setCustomValidity('');
    } else {
      precioc.style.display = 'none';
      inputPrecio.required = false;
      inputPrecio.value = '';

      inputPrecio.setCustomValidity('');
    }
  }
  selRecurso.addEventListener('change', actualizarPrecioSegunTipo);
  actualizarPrecioSegunTipo();
}); 


