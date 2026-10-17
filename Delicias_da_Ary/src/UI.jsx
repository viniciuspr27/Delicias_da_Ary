import { useState, useEffect, useRef } from 'react';
import { Icon } from './Icons';

export function Logo({ light = false }) {
  return (
    <a
      className={`brand ${light ? 'brand-light' : ''}`}
      href="#inicio"
      aria-label="Delícias da Ary, início"
    >
      <span className="brand-symbol">
        <Icon name="flower" size={37} />
      </span>
      <span className="brand-wordmark">
        delícias da <em>Ary</em>
        <small>CONFEITARIA ARTESANAL</small>
      </span>
    </a>
  );
}

export function Header({ onOpenList, itemCount }) {
  const [open, setOpen] = useState(false);
  const panel = useRef(null);
  useEffect(() => {
    const escape = (event) => {
      if (event.key === 'Escape') {
        setOpen(false);
        panel.current?.querySelector('.mobile-toggle')?.focus();
      }
    };
    const outside = (event) => {
      if (!panel.current?.contains(event.target)) setOpen(false);
    };
    if (open) {
      document.addEventListener('keydown', escape);
      document.addEventListener('pointerdown', outside);
    }
    return () => {
      document.removeEventListener('keydown', escape);
      document.removeEventListener('pointerdown', outside);
    };
  }, [open]);
  return (
    <>
      <div className="demo-strip">
        <span className="demo-dot" /> FEITO COM CARINHO{' '}
        <span className="demo-strip-divider">/</span>
        <span>Confeitaria artesanal em São Paulo.</span>
      </div>
      <header className="header" ref={panel}>
        <div className="header-inner container">
          <Logo />
          <nav className="desktop-nav" aria-label="Navegação principal">
            <a href="#monte-seu-bolo">Monte seu bolo</a>
            <a href="#catalogo">Explore os doces</a>
            <a href="#essencia">Nossa essência</a>
            <a href="#encomenda">Como encomendar</a>
          </nav>
          <button
            className="button button-outline header-order header-wishlist"
            onClick={onOpenList}
            aria-label={`Abrir carrinho, ${itemCount} itens`}
          >
            <Icon name="bag" size={17} /> Carrinho <span>{itemCount > 99 ? '99+' : itemCount}</span>
          </button>
          <button
            className="icon-button mobile-toggle"
            aria-label={open ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={open}
            aria-controls="mobile-navigation"
            onClick={() => setOpen(!open)}
          >
            <Icon name={open ? 'close' : 'menu'} />
          </button>
        </div>
        {open && (
          <nav id="mobile-navigation" className="mobile-nav" aria-label="Navegação no celular">
            {[
              ['monte-seu-bolo', 'Monte seu bolo'],
              ['catalogo', 'Explore os doces'],
              ['essencia', 'Nossa essência'],

              ['encomenda', 'Conte sua ideia'],
            ].map(([target, label]) => (
              <a key={target} href={`#${target}`} onClick={() => setOpen(false)}>
                {label}
                <Icon name="diagonal" size={18} />
              </a>
            ))}
          </nav>
        )}
        <div className="scroll-progress" aria-hidden="true" />
      </header>
    </>
  );
}

export function Modal({ title, children, onClose, className = '', onKeyDown }) {
  const dialog = useRef(null);
  useEffect(() => {
    const element = dialog.current;
    const previous = document.activeElement;
    const oldOverflow = document.body.style.overflow;
    element.showModal();
    document.body.style.overflow = 'hidden';
    return () => {
      element.close();
      document.body.style.overflow = oldOverflow;
      if (previous?.isConnected) previous.focus({ preventScroll: true });
    };
  }, []);
  return (
    <dialog
      ref={dialog}
      className={`modal ${className}`}
      aria-label={title}
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onClick={(event) => {
        if (event.target === dialog.current) onClose();
      }}
      onKeyDown={onKeyDown}
    >
      <div className="modal-inner">
        <button
          autoFocus
          className="icon-button modal-close"
          onClick={onClose}
          aria-label="Fechar janela"
        >
          <Icon name="close" />
        </button>
        {children}
      </div>
    </dialog>
  );
}
