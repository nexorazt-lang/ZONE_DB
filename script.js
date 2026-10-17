const WHATSAPP_NUMBER = "573144108326"; // Colombia: +57 314 410 8326
const formatCOP = value => new Intl.NumberFormat('es-CO',{style:'currency',currency:'COP',maximumFractionDigits:0}).format(value);
const form = document.querySelector('#order-form');
document.querySelectorAll('.buy').forEach(button=>button.addEventListener('click',()=>{
  document.querySelectorAll('.product,.membership').forEach(card=>card.classList.remove('chosen'));
  button.closest('.product,.membership')?.classList.add('chosen');
  const {kind,quantity,price}=button.dataset;
  document.querySelector('#kind').value=kind;
  document.querySelector('#quantity').value=quantity;
  document.querySelector('#price').value=price;
  const quantityLabel = kind==='Diamantes' ? `${Number(quantity).toLocaleString('es-CO')} diamantes` : kind;
  document.querySelector('#selected').textContent=`Seleccionado: ${quantityLabel} · ${formatCOP(Number(price))}`;
  document.querySelector('#pedido').scrollIntoView({behavior:'smooth',block:'start'});
}));
form.addEventListener('submit',event=>{
  event.preventDefault();
  const kind=document.querySelector('#kind').value;
  const quantity=document.querySelector('#quantity').value;
  const price=Number(document.querySelector('#price').value);
  if(!kind||!quantity||!price){alert('Primero selecciona un paquete de diamantes o una membresía.');return;}
  const name=document.querySelector('#player-name').value.trim();
  const id=document.querySelector('#player-id').value.trim();
  const phone=document.querySelector('#customer-phone').value.trim();
  const payment=document.querySelector('#payment').value;
  const notes=document.querySelector('#notes').value.trim();
  const item=kind==='Diamantes'?`${Number(quantity).toLocaleString('es-CO')} diamantes`:kind;
  const message=[ '¡Hola! Quiero realizar un pedido en Zona Diamante.', '', `Producto: ${item}`, `Precio: ${formatCOP(price)} COP`, `Nombre de jugador: ${name}`, `ID de Free Fire: ${id}`, `Mi contacto: ${phone||'No indicado'}`, `Método de pago preferido: ${payment}`, `Nota: ${notes||'Ninguna'}`, '', 'Por favor, confirma el pedido y los pasos de pago.'];
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message.join('\n'))}`,'_blank','noopener,noreferrer');
});
