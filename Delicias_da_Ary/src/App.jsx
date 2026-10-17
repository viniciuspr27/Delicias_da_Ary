import { useState, useRef, useCallback, useEffect } from 'react';
import { emptyCake } from './data';
import CakeBuilder, { OrderGuidelines } from './CakeBuilder';
import { Icon } from './Icons';
import { Header, Logo } from './UI';
import { Hero, Ribbon, Catalog, Essence, Contact, Questions, ProductDetail } from './Sections';
import { useMotion } from './useMotion';
import Wishlist from './Wishlist.jsx';
import { addWish, cakeWish, productWish, quantityValue, whatsappUrl, wishLabel } from './wishlist';

const emptyIdea = () => ({
  interestId: 'suggestions',
  occasion: 'Ainda estou pensando',
  date: '',
  name: '',
  notes: '',
  people: '',
  payment: '',
  cake: emptyCake(),
});

function Footer({ motionOff, onMotion, onOpenList }) {
  return (
    <footer className="footer">
      <div className="footer-main container">
        <div>
          <Logo />
          <p>Um carinho em forma de doce.</p>
          <span className="footer-signature">
            Com carinho, Ary <Icon name="heart" size={18} />
          </span>
        </div>
        <nav className="footer-links" aria-label="Navegação no rodapé">
          <a href="#catalogo">Explore os doces</a>
          <a href="#monte-seu-bolo">Monte seu bolo</a>
          <a href="#encomenda">Como encomendar</a>
          <button onClick={onOpenList}>Meu carrinho</button>
        </nav>
        <div className="footer-contact">
          <span>
            <Icon name="pin" size={18} /> São Paulo, SP
          </span>
          <span>
            <Icon name="instagram" size={18} /> @ary.delicias
          </span>
          <a
            href={whatsappUrl('Olá, Ary! Gostaria de conhecer os doces que você prepara.')}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icon name="whatsapp" size={18} /> (11) 98621-6744
          </a>
        </div>
      </div>
      <div className="footer-bottom container">
        <span>Delícias da Ary · POC para apresentação · 2026</span>
        <button aria-pressed={motionOff} onClick={onMotion}>
          {motionOff ? 'Ativar animações' : 'Reduzir animações'}
        </button>
        <span>Fotos da Ary tratadas digitalmente e imagens ilustrativas.</span>
      </div>
    </footer>
  );
}

export default function App() {
  const root = useRef(null);
  const [motionOff, setMotionOff] = useState(
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  );
  const [modal, setModal] = useState(null);
  const [idea, setIdea] = useState(emptyIdea);
  const [items, setItems] = useState([]);
  const [toast, setToast] = useState(null);
  useMotion(root, motionOff);
  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const change = (event) => setMotionOff(event.matches);
    preference.addEventListener('change', change);
    return () => preference.removeEventListener('change', change);
  }, []);
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(null), 4000);
    return () => clearTimeout(timer);
  }, [toast]);
  const closeModal = useCallback(() => setModal(null), []);
  const openList = () => {
    setToast(null);
    setModal({ type: 'wishlist' });
  };
  const chooseProduct = (product, options) => {
    if (product.id === 'brigadeiro' && !options?.sprinkles) {
      setToast(null);
      setModal({ type: 'product', product });
      return;
    }
    const item = productWish(product, options);
    setItems((previous) => addWish(previous, item));
    setModal(null);
    setToast({ name: wishLabel(item) });
  };
  const addCake = () => {
    setItems((previous) => addWish(previous, cakeWish(idea.cake)));
    if (
      idea.occasion === 'Ainda estou pensando' &&
      idea.cake.celebration === 'Aniversário infantil'
    ) {
      setIdea((previous) => ({ ...previous, occasion: 'Aniversário infantil' }));
    }
    openList();
  };
  const startInfantCake = () => {
    setIdea((previous) => ({
      ...previous,
      interestId: 'custom-cake',
      cake: { ...previous.cake, celebration: 'Aniversário infantil' },
    }));
  };
  const count = items.reduce((sum, item) => sum + item.quantity, 0);
  const productCounts = items.reduce((counts, item) => {
    if (item.kind === 'product')
      counts[item.productId] = (counts[item.productId] || 0) + item.quantity;
    return counts;
  }, {});
  return (
    <div ref={root} className={`app ary-v8 ${motionOff ? 'motion-off' : ''}`}>
      <a className="skip-link" href="#conteudo">
        Pular para o conteúdo
      </a>
      <Header onOpenList={openList} itemCount={count} />
      <main id="conteudo">
        <Hero />
        <Ribbon />
        <Catalog
          motionOff={motionOff}
          counts={productCounts}
          onProduct={(product) => setModal({ type: 'product', product })}
          onChoose={chooseProduct}
          onInfantCake={startInfantCake}
        />
        <Essence />
        <CakeBuilder
          cake={idea.cake}
          onChange={(cake) =>
            setIdea((previous) => ({ ...previous, interestId: 'custom-cake', cake }))
          }
          onContinue={addCake}
        />
        <Contact count={count} onOpenList={openList} />
        <OrderGuidelines />
        <Questions />
      </main>
      <Footer
        motionOff={motionOff}
        onMotion={() => setMotionOff((previous) => !previous)}
        onOpenList={openList}
      />
      <button
        className="whatsapp-float wishlist-float"
        aria-label={`Abrir carrinho, ${count} itens`}
        onClick={openList}
      >
        <Icon name="bag" size={23} />
        <span>Carrinho</span>
        <b>{count > 99 ? '99+' : count}</b>
        <Icon name="whatsapp" size={21} />
      </button>
      {toast && (
        <div className="wish-toast" role="status">
          <span className="wish-toast-check">
            <Icon name="check" size={17} />
          </span>
          <span>
            <strong>{toast.name}</strong> adicionado.
          </span>
          <button type="button" onClick={openList}>
            Ver carrinho <Icon name="arrow" size={15} />
          </button>
          <button className="toast-close" aria-label="Fechar aviso" onClick={() => setToast(null)}>
            <Icon name="close" size={15} />
          </button>
        </div>
      )}
      {modal?.type === 'product' && (
        <ProductDetail product={modal.product} onChoose={chooseProduct} onClose={closeModal} />
      )}
      {modal?.type === 'wishlist' && (
        <Wishlist
          items={items}
          idea={idea}
          setIdea={setIdea}
          onQuantity={(id, quantity) =>
            setItems((previous) =>
              previous.map((item) =>
                item.id === id ? { ...item, quantity: quantityValue(quantity) } : item,
              ),
            )
          }
          onRemove={(id) => setItems((previous) => previous.filter((item) => item.id !== id))}
          onClose={closeModal}
          onExplore={() => {
            setModal(null);
            requestAnimationFrame(() =>
              document
                .getElementById('catalogo')
                ?.scrollIntoView({ behavior: motionOff ? 'instant' : 'smooth' }),
            );
          }}
        />
      )}
    </div>
  );
}
