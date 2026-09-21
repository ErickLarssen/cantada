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
      title: 'Confirmar conversa no WhatsApp',
      html: 'Caso você queira resolver a "pendência", clique em "Falar no WhatsApp".',
      showCancelButton: true,
      confirmButtonText: 'Falar no WhatsApp!',
      cancelButtonText: 'Não, obrigado.',
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
