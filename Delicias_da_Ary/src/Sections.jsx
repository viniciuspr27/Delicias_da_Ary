import { useState, useRef } from 'react';
import { photos, products, sprinkleOptions } from './data';
import { Icon, Bow } from './Icons';
import { Modal } from './UI';
import { refreshMotion, useCardMotion } from './useMotion';

const productById = (id) => products.find((product) => product.id === id);
const cutout = (product) => product.cutout || product.category === 'Docinhos';
const categoryOrder = { 'Bolos de festa': 0, Docinhos: 1, 'Bolos caseiros': 2 };

export function Hero() {
  return (
    <section className="hero" id="inicio" aria-labelledby="hero-heading">
      <div className="hero-inner container">
        <div className="hero-copy">
          <p className="eyebrow hero-eyebrow">
            <span className="little-line" /> DELÍCIAS DA ARY · CONFEITARIA ARTESANAL
          </p>
          <h1 className="hero-title" id="hero-heading">
            <span className="line-mask">
              <span className="line">Um carinho</span>
            </span>
            <span className="line-mask">
              <span className="line">em forma</span>
            </span>
            <span className="line-mask">
              <em className="line">de doce.</em>
            </span>
          </h1>
          <p className="hero-description">
            Bolos para celebrar. Docinhos para compartilhar.
            <br />
            Inspire-se, escolha seus favoritos e combine cada detalhe com a Ary.
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href="#catalogo">
              Escolher minhas delícias <Icon name="arrow" size={18} />
            </a>
            <a className="text-link" href="#monte-seu-bolo">
              Monte seu bolo <Icon name="cake" size={19} />
            </a>
          </div>
          <div className="hero-bottom">
            <span>
              <Icon name="pin" size={17} /> São Paulo
            </span>
            <span className="hero-separator" />
            <span>Feito de afeto, do seu jeito.</span>
          </div>
        </div>
        <div className="hero-art hero-real-cake">
          <span className="hero-orbit orbit-gold" aria-hidden="true" />
          <span className="hero-orbit orbit-silver" aria-hidden="true" />
          <div className="hero-photo-frame">
            <img
              className="hero-image"
              src={photos.floralAry}
              alt={productById('floral-rosa-ary').alt}
              width="1222"
              height="1287"
              fetchPriority="high"
            />
          </div>
          <div className="hero-seal">
            <Icon name="heart" size={21} />
            <span>
              Um dia
              <br />
              <em>para lembrar.</em>
            </span>
          </div>
          <div className="hero-floating-sweet" aria-hidden="true">
            <img src={photos.brigadeiro} alt="" width="220" height="220" />
            <span>Só mais um…</span>
          </div>
          <span className="hero-spark" aria-hidden="true">
            <Icon name="spark" size={40} />
          </span>
          <p className="hero-photo-caption">
            Floral rosa, feito pela Ary.<small>FOTO TRATADA DIGITALMENTE</small>
          </p>
        </div>
      </div>
      <a className="scroll-cue" href="#catalogo">
        <Icon name="down" size={17} /> Tem mais carinho logo abaixo
      </a>
    </section>
  );
}

export function Ribbon() {
  return (
    <div className="ribbon">
      <div className="container ribbon-inner">
        <span>
          <Icon name="heart" size={20} /> Escolha seus favoritos
        </span>
        <i aria-hidden="true" />
        <span>
          <Icon name="bag" size={20} /> Monte seu carrinho
        </span>
        <i aria-hidden="true" />
        <span>
          <Icon name="whatsapp" size={20} /> Combine com a Ary
        </span>
      </div>
    </div>
  );
}

export function Catalog({ onProduct, onChoose, onInfantCake, motionOff, counts }) {
  const cards = useRef(null);
  const [category, setCategory] = useState('Todas as delícias');
  const ordered = [...products].sort(
    (a, b) => categoryOrder[a.category] - categoryOrder[b.category],
  );
  const visible =
    category === 'Todas as delícias'
      ? ordered
      : ordered.filter((product) => product.category === category);
  useCardMotion(cards, category, motionOff);
  return (
    <section
      ref={cards}
      className="catalog section-space container"
      id="catalogo"
      aria-labelledby="catalog-heading"
    >
      <div className="section-heading" data-reveal>
        <div>
          <p className="eyebrow">PEQUENAS ESCOLHAS. MOMENTOS GOSTOSOS.</p>
          <h2 id="catalog-heading">
            Qual vai ser
            <br />
            <em>o seu favorito?</em>
          </h2>
        </div>
        <p>
          Docinhos para compartilhar.
          <br />
          Bolos para reunir.
          <br />
          Carinho em cada escolha.
        </p>
      </div>
      <div className="catalog-toolbar">
        <div className="category-list" role="group" aria-label="Filtrar doces por categoria">
          {['Todas as delícias', 'Bolos de festa', 'Docinhos', 'Bolos caseiros'].map((value) => (
            <button
              key={value}
              className={`category-chip ${category === value ? 'active' : ''}`}
              aria-pressed={category === value}
              onClick={() => setCategory(value)}
            >
              {value}
            </button>
          ))}
        </div>
        <span className="catalog-count" role="status">
          {visible.length} opções para explorar
        </span>
      </div>
      <div className="infant-cake-banner" data-reveal>
        <span className="infant-cake-icon" aria-hidden="true">
          <Icon name="cake" size={32} />
        </span>
        <div className="infant-cake-copy">
          <p className="eyebrow">ANIVERSÁRIO INFANTIL</p>
          <h3>O tema favorito deles. Um bolo cheio de carinho.</h3>
          <p>Conte o personagem ou tema da festa e monte sua combinação.</p>
        </div>
        <a className="button button-outline" href="#monte-seu-bolo" onClick={onInfantCake}>
          Montar bolo infantil <Icon name="arrow" size={17} />
        </a>
      </div>
      <div className="catalog-grid" key={category}>
        {visible.map((product, index) => (
          <article
            className={`product-card ${cutout(product) ? 'has-cutout' : ''} ${product.source === 'ary' ? 'is-ary-cake' : ''}`}
            key={product.id}
          >
            <div className="product-motion">
              <button
                className="product-image-button"
                onClick={() => onProduct(product)}
                aria-label={`Explorar ${product.name}`}
              >
                <img
                  src={product.image}
                  alt={product.alt}
                  width="600"
                  height="600"
                  loading={index < 3 ? 'eager' : 'lazy'}
                />
                <span className="product-badge">{product.badge}</span>
                <span className="product-zoom">
                  <Icon name="zoom" size={19} />
                </span>
              </button>
              <div className="product-copy">
                <div className="product-meta">
                  <span>{product.category}</span>
                  {counts[product.id] ? (
                    <span className="product-added">
                      <Icon name="check" size={12} /> {counts[product.id]} no carrinho
                    </span>
                  ) : (
                    <span>{product.source === 'ary' ? 'Foto tratada' : 'Inspiração'}</span>
                  )}
                </div>
                <h3>{product.name}</h3>
                <p>{product.short}</p>
                <button
                  className="product-choose"
                  aria-label={
                    product.id === 'brigadeiro'
                      ? 'Escolher granulado do Brigadeiro'
                      : `Adicionar ${product.name} ao carrinho`
                  }
                  onClick={() => onChoose(product)}
                >
                  {product.id === 'brigadeiro' ? 'Escolher granulado' : 'Adicionar ao carrinho'}{' '}
                  <Icon name="plus" size={19} />
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
      <div className="inspiration-notice">
        <Icon name="flower" size={22} />
        <p>
          <strong>As fotos abrem a conversa.</strong> Os bolos de festa mostram trabalhos da Ary,
          com fotos tratadas digitalmente. Os demais doces são inspirações. Sabores, disponibilidade
          e apresentação são confirmados na conversa.
        </p>
        <a href="#encomenda">
          Tenho outra ideia <Icon name="arrow" size={16} />
        </a>
      </div>
    </section>
  );
}

export function Essence() {
  return (
    <section className="celebrate home-essence" id="essencia" aria-labelledby="essence-heading">
      <div className="celebrate-inner container">
        <div className="cake-stack">
          <div className="cake-stack-main">
            <img
              src={photos.chocolate}
              alt={productById('chocolate').alt}
              width="1122"
              height="1402"
              loading="lazy"
            />
          </div>
          <figure className="cake-stack-left">
            <img
              src={photos.fuba}
              alt={productById('fuba').alt}
              width="400"
              height="400"
              loading="lazy"
            />
            <figcaption>um café, uma boa conversa</figcaption>
          </figure>
          <figure className="cake-stack-right">
            <img
              src={photos.cenoura}
              alt={productById('cenoura').alt}
              width="400"
              height="400"
              loading="lazy"
            />
            <figcaption>uma fatia de carinho</figcaption>
          </figure>
          <span className="cake-stack-note">
            <Icon name="spark" size={32} /> Doce é estar junto.
          </span>
        </div>
        <div className="celebrate-copy">
          <p className="eyebrow">O MELHOR INGREDIENTE É O MOMENTO.</p>
          <h2 id="essence-heading">
            Para celebrar.
            <br />
            Para dividir.
            <br />
            <em>Para o seu dia.</em>
          </h2>
          <p>
            Um aniversário em casa, uma visita especial ou aquele café sem pressa. Sempre cabe um
            doce nos encontros que a gente quer guardar.
          </p>
          <p>
            Conte sua ideia. A Ary combina com você os sabores, o tamanho e a apresentação que pode
            preparar.
          </p>
          <a className="text-link" href="#monte-seu-bolo">
            Vamos imaginar seu bolo? <Icon name="arrow" size={18} />
          </a>
          <Bow className="essence-bow" />
        </div>
      </div>
    </section>
  );
}

export function Contact({ count, onOpenList }) {
  return (
    <section
      className="contact-section section-space container"
      id="encomenda"
      aria-labelledby="order-heading"
    >
      <div className="contact-heading" data-reveal>
        <p className="eyebrow">DO PRIMEIRO DESEJO AO ÚLTIMO DETALHE.</p>
        <h2 id="order-heading">
          Uma vontade doce.
          <br />
          <em>Três passos para combinar.</em>
        </h2>
      </div>
      <div className="contact-layout">
        <aside className="contact-photo">
          <img
            src={photos.cenoura}
            alt={productById('cenoura').alt}
            width="900"
            height="900"
            loading="lazy"
          />
          <div>
            <Icon name="heart" size={24} />
            <span>
              Você traz a ideia.
              <br />
              <em>A gente cuida da conversa.</em>
            </span>
          </div>
        </aside>
        <div className="order-guide">
          <p className="order-guide-lead">
            Do café da tarde à festa em família, tudo começa com o que você gosta.
          </p>
          <ol className="order-steps" aria-label="Como encomendar">
            <li data-reveal>
              <span className="order-step-number" aria-hidden="true">
                01
              </span>
              <div>
                <h3>Encontre seus favoritos</h3>
                <p>Escolha os doces da vitrine ou monte uma combinação de massa e recheios.</p>
                <div className="order-step-links">
                  <a href="#catalogo">
                    Explorar doces <Icon name="arrow" size={15} />
                  </a>
                  <a href="#monte-seu-bolo">
                    Montar um bolo <Icon name="arrow" size={15} />
                  </a>
                </div>
              </div>
            </li>
            <li data-reveal>
              <span className="order-step-number" aria-hidden="true">
                02
              </span>
              <div>
                <h3>Dê seu toque pessoal</h3>
                <p>No carrinho, ajuste as quantidades e conte a data, a ocasião e sua ideia.</p>
              </div>
            </li>
            <li data-reveal>
              <span className="order-step-number" aria-hidden="true">
                03
              </span>
              <div>
                <h3>Combine com a Ary</h3>
                <p>
                  A mensagem vai pronta para o WhatsApp. Sabores, acabamento e disponibilidade são
                  confirmados na conversa.
                </p>
              </div>
            </li>
          </ol>
          <div className="order-guide-action" data-reveal>
            <div className="order-guide-status">
              <span className="order-guide-bag" aria-hidden="true">
                <Icon name="bag" size={24} />
              </span>
              <div>
                <strong>
                  {count ? 'Suas escolhas já estão aqui.' : 'Ainda pensando no que escolher?'}
                </strong>
                <p aria-live="polite" aria-atomic="true">
                  {count
                    ? `${count} ${count === 1 ? 'item no carrinho' : 'itens no carrinho'} · tudo reunido para conversar.`
                    : 'Pode pedir sugestões e deixar os detalhes em aberto.'}
                </p>
              </div>
            </div>
            <button className="button button-primary" type="button" onClick={onOpenList}>
              {count ? 'Revisar minha encomenda' : 'Começar uma conversa'}
              <Icon name="arrow" size={18} />
            </button>
            <span className="order-guide-note">
              A encomenda é confirmada diretamente com a Ary.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Questions() {
  return (
    <section className="faq container" aria-labelledby="faq-heading">
      <div>
        <p className="eyebrow">ANTES DE DIZER “EU QUERO”.</p>
        <h2 id="faq-heading">
          Só mais
          <br />
          <em>uma coisinha.</em>
        </h2>
      </div>
      <div className="faq-items">
        {[
          [
            'Os doces ficam iguais aos das fotos?',
            'Os bolos de festa mostram modelos já feitos pela Ary, em fotos recortadas e tratadas digitalmente. Os doces e bolos caseiros usam imagens ilustrativas. Para toda encomenda, confirme os sabores, o tamanho, as decorações e a apresentação final diretamente com ela.',
          ],
          [
            'Como funciona o carrinho?',
            'Adicione os doces, ajuste as quantidades e escolha os detalhes do bolo. No carrinho, revise a mensagem e toque em “Continuar no WhatsApp”. Ela abre pronta no WhatsApp da Ary; você decide quando enviar.',
          ],
          [
            'Ainda não sei a quantidade ou a data. Posso conversar?',
            'Sim! Deixe os campos em aberto e peça sugestões. Para fazer a encomenda, considere pelo menos 5 dias de antecedência e confirme a disponibilidade com a Ary.',
          ],
          [
            'Como combino entrega, retirada e ingredientes?',
            'Converse diretamente com a Ary, informe sua região em São Paulo e tire suas dúvidas sobre ingredientes ou restrições alimentares antes de confirmar a encomenda.',
          ],
        ].map(([question, answer]) => (
          <details key={question} onToggle={refreshMotion}>
            <summary>
              {question}
              <Icon name="plus" size={19} />
            </summary>
            <p>{answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

export function ProductDetail({ product, onChoose, onClose }) {
  const [sprinkles, setSprinkles] = useState('Preto');
  const isBrigadeiro = product.id === 'brigadeiro';
  return (
    <Modal
      title={`${product.source === 'ary' ? 'Bolo da Ary' : 'Inspiração'}: ${product.name}`}
      onClose={onClose}
      className={`product-modal ${cutout(product) ? 'detail-cutout' : ''} ${product.source === 'ary' ? 'ary-cake-detail' : ''}`}
    >
      <div className="product-modal-grid">
        <div className="detail-photo">
          <img src={product.image} alt={product.alt} width="900" height="900" />
          <span>
            {product.source === 'ary' ? 'FOTO DA ARY · TRATADA DIGITALMENTE' : 'FOTO ILUSTRATIVA'}
          </span>
        </div>
        <div className="product-modal-copy">
          <p className="eyebrow">
            {product.category} · {product.source === 'ary' ? 'JÁ FEITO PELA ARY' : 'INSPIRAÇÃO'}
          </p>
          <h2>{product.name}</h2>
          <p>{product.description}</p>
          {isBrigadeiro && (
            <fieldset className="sprinkle-picker">
              <legend>Qual vai ser a cor do granulado?</legend>
              <div className="sprinkle-options">
                {sprinkleOptions.map((option) => (
                  <label
                    key={option.value}
                    className={`sprinkle-option ${sprinkles === option.value ? 'is-selected' : ''}`}
                  >
                    <input
                      type="radio"
                      name="brigadeiro-sprinkles"
                      value={option.value}
                      checked={sprinkles === option.value}
                      onChange={() => setSprinkles(option.value)}
                    />
                    <span className={`sprinkle-swatch ${option.className}`} aria-hidden="true" />
                    <span>{option.value}</span>
                    <Icon name={sprinkles === option.value ? 'check' : 'plus'} size={14} />
                  </label>
                ))}
              </div>
              <p className="sprinkle-selection" role="status">
                Granulado {sprinkles.toLowerCase()} escolhido. Você pode adicionar outras cores
                separadamente.
              </p>
            </fieldset>
          )}
          <div className="detail-inspiration">
            <Icon name="flower" size={23} />
            <p>O seu pedido começa com uma ideia. Confirme as possibilidades com a Ary.</p>
          </div>
          <button
            className="button button-primary"
            onClick={() => onChoose(product, isBrigadeiro ? { sprinkles } : undefined)}
          >
            Adicionar ao carrinho <Icon name="plus" size={18} />
          </button>
        </div>
      </div>
    </Modal>
  );
}
