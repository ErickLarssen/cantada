/**
 * Confirmação temática via SweetAlert2 antes de abrir o WhatsApp.
 * Se a biblioteca não carregar, o link funciona normalmente (progressive enhancement).
 */
(function () {
  const cta = document.getElementById('whatsappCta');
  if (!cta || typeof window.Swal === 'undefined') return;

  cta.addEventListener('click', function (e) {
    e.preventDefault();
    const destination = cta.getAttribute('href');

    Swal.fire({
      icon: 'warning',
      title: 'Confirmar autuação nº 00225-SP',
      html: 'Você está prestes a negociar o pagamento das duas multas diretamente com a autuante.',
      showCancelButton: true,
      confirmButtonText: 'Pagar agora',
      cancelButtonText: 'Recorrer',
      reverseButtons: true,
      background: 'transparent',
      customClass: {
        popup: 'swal-theme',
      },
    }).then((result) => {
      if (result.isConfirmed) {
        window.open(destination, '_blank', 'noopener,noreferrer');
      }
    });
  });
})();
