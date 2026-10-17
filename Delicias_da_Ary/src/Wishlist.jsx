import { useRef, useState, useEffect } from 'react';
import { Modal } from './UI';
import { Icon } from './Icons';
import CakeIllustration from './CakeIllustration';
import { minimumOrderDate, validateDetails, paymentMethods, sprinkleOptions } from './data';
import {
  cakeDescription,
  quantityValue,
  wishUnit,
  wishlistMessage,
  whatsappUrl,
  wishLabel,
} from './wishlist';

export default function Wishlist({
  items,
  idea,
  setIdea,
  onQuantity,
  onRemove,
  onClose,
  onExplore,
}) {
  const [showMessage, setShowMessage] = useState(true);
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);
  const messageField = useRef(null);
  const error = validateDetails(idea);
  const message = wishlistMessage(items, idea);
  useEffect(() => {
    setCopied(false);
  }, [message]);
  const update = (values) => {
    setIdea((previous) => ({ ...previous, ...values }));
    setCopied(false);
  };
  const copy = async () => {
    setShowMessage(true);
    try {
      if (!navigator.clipboard?.writeText) throw new Error();
      await navigator.clipboard.writeText(message);
      setCopied(true);
      setCopyError(false);
    } catch {
      setCopyError(true);
      requestAnimationFrame(() => {
        messageField.current?.focus();
        messageField.current?.select();
      });
    }
  };
  return (
    <Modal title="Meu carrinho de delícias" onClose={onClose} className="wishlist-modal">
      <div className="wishlist-layout">
        <div className="wishlist-heading">
          <p className="eyebrow">UM POUQUINHO DE CADA VONTADE</p>
          <h2>
            Seu carrinho
            <br />
            <em>de delícias.</em>
          </h2>
          <p>
            {items.length
              ? `${items.length} ${items.length === 1 ? 'escolha para conversar' : 'escolhas para conversar'} com a Ary.`
              : 'Comece com uma vontade. Os detalhes a gente combina.'}
          </p>
        </div>
        <div className="wishlist-content">
          {items.length ? (
            <ul className="wishlist-items">
              {items.map((item) => (
                <li key={item.id} className="wishlist-item">
                  {item.kind === 'cake' ? (
                    <CakeIllustration cake={item.cake} compact />
                  ) : (
                    <img
                      src={item.image}
                      alt=""
                      width="100"
                      height="100"
                      className={item.cutout ? 'cutout' : ''}
                    />
                  )}
                  <div className="wishlist-item-body">
                    <h3>{item.name}</h3>
                    {item.kind === 'cake' ? (
                      <dl className="wishlist-cake-details">
                        {cakeDescription(item.cake).map((description, index) => (
                          <div key={index}>
                            <dt>{['Massa', 'Recheios', 'Tamanho'][index]}</dt>
                            <dd>{description}</dd>
                          </div>
                        ))}
                        {item.cake.celebration && (
                          <>
                            <div>
                              <dt>Festa</dt>
                              <dd>{item.cake.celebration}</dd>
                            </div>
                            <div>
                              <dt>Tema</dt>
                              <dd>{item.cake.theme || 'A combinar com a Ary'}</dd>
                            </div>
                          </>
                        )}
                      </dl>
                    ) : (
                      <p>
                        {item.source === 'ary'
                          ? 'Modelo da Ary · tamanho e acabamento a combinar'
                          : 'Referência de interesse · opções a confirmar'}
                      </p>
                    )}
                    {item.sprinkles && (
                      <span className="wishlist-sprinkle">
                        <span
                          className={`sprinkle-swatch ${sprinkleOptions.find((option) => option.value === item.sprinkles)?.className}`}
                          aria-hidden="true"
                        />
                        Granulado {item.sprinkles.toLowerCase()}
                      </span>
                    )}
                    <div className="wishlist-quantity">
                      <button
                        type="button"
                        className="quantity-button"
                        aria-label={`Diminuir quantidade de ${wishLabel(item)}`}
                        disabled={item.quantity === 1}
                        onClick={() => onQuantity(item.id, item.quantity - 1)}
                      >
                        <Icon name="minus" size={14} />
                      </button>
                      <input
                        type="number"
                        min="1"
                        max="999"
                        step="1"
                        inputMode="numeric"
                        aria-label={`Quantidade de ${wishLabel(item)}`}
                        value={item.quantity}
                        onChange={(event) => onQuantity(item.id, quantityValue(event.target.value))}
                      />
                      <button
                        type="button"
                        className="quantity-button"
                        aria-label={`Aumentar quantidade de ${wishLabel(item)}`}
                        disabled={item.quantity >= 999}
                        onClick={() => onQuantity(item.id, item.quantity + 1)}
                      >
                        <Icon name="plus" size={14} />
                      </button>
                      <span>{wishUnit(item)}</span>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="remove-wish"
                    aria-label={`Remover ${wishLabel(item)} do carrinho`}
                    onClick={() => onRemove(item.id)}
                  >
                    <Icon name="close" size={16} />
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <div className="wishlist-empty">
              <Icon name="bag" size={44} />
              <h3>O que vai adoçar seu dia?</h3>
              <p>
                Adicione doces e bolos enquanto explora a página. Se preferir, converse com a Ary
                para receber sugestões.
              </p>
              <button className="button button-outline" onClick={onExplore}>
                Explorar os doces <Icon name="arrow" size={17} />
              </button>
            </div>
          )}
          <button type="button" className="wishlist-continue text-link" onClick={onExplore}>
            {items.length ? 'Continuar escolhendo' : 'Tenho outra ideia'}{' '}
            <Icon name="arrow" size={17} />
          </button>
          <details className="wishlist-details">
            <summary>
              Detalhes da encomenda <Icon name="plus" size={17} />
            </summary>
            <p className="wishlist-details-intro">
              Conte quando será e o que você imaginou. Pode deixar os detalhes a combinar.
            </p>
            <label className="field-label" htmlFor="list-name">
              Seu nome <small>(opcional)</small>
            </label>
            <input
              id="list-name"
              value={idea.name}
              maxLength={60}
              placeholder="Como podemos te chamar?"
              onChange={(event) => update({ name: event.target.value })}
            />
            <label className="field-label" htmlFor="list-occasion">
              Ocasião
            </label>
            <select
              id="list-occasion"
              value={idea.occasion}
              onChange={(event) => update({ occasion: event.target.value })}
            >
              {[
                'Ainda estou pensando',
                'Café da tarde',
                'Para comemorar',
                'Aniversário infantil',
                'Para presentear',
                'Só porque deu vontade',
                'Outra ocasião',
              ].map((value) => (
                <option key={value}>{value}</option>
              ))}
            </select>
            <label className="field-label" htmlFor="list-date">
              Data desejada <small>(opcional)</small>
            </label>
            <input
              id="list-date"
              type="date"
              min={minimumOrderDate()}
              value={idea.date}
              aria-describedby="list-date-help"
              onChange={(event) => update({ date: event.target.value })}
            />
            <small id="list-date-help" className="field-help">
              Antecedência mínima de 5 dias. A disponibilidade é confirmada pela Ary.
            </small>
            <label className="field-label" htmlFor="list-people">
              Pessoas (aproximadamente) <small>(opcional)</small>
            </label>
            <input
              id="list-people"
              type="number"
              min="1"
              max="10000"
              step="1"
              inputMode="numeric"
              value={idea.people}
              onChange={(event) => update({ people: event.target.value })}
              placeholder="A combinar"
            />
            <label className="field-label" htmlFor="list-payment">
              Preferência de pagamento
            </label>
            <select
              id="list-payment"
              value={idea.payment}
              onChange={(event) => update({ payment: event.target.value })}
            >
              <option value="">A combinar</option>
              {paymentMethods.map((value) => (
                <option key={value}>{value}</option>
              ))}
            </select>
            <label className="field-label" htmlFor="list-notes">
              Sua ideia <small>(opcional)</small>
            </label>
            <textarea
              id="list-notes"
              rows={3}
              maxLength={600}
              placeholder="Conte mais sobre os doces que você imaginou…"
              value={idea.notes}
              onChange={(event) => update({ notes: event.target.value })}
            />
          </details>
          {error && (
            <p className="wishlist-error" role="alert">
              {error} Abra os detalhes acima para ajustar.
            </p>
          )}
          <div className="wishlist-message-tools">
            <button
              type="button"
              className="text-link"
              aria-expanded={showMessage}
              onClick={() => setShowMessage(!showMessage)}
            >
              {showMessage ? 'Ocultar mensagem' : 'Conferir mensagem'}{' '}
              <Icon name="down" size={14} />
            </button>
            <button type="button" className="text-link" onClick={copy}>
              <Icon name={copied ? 'check' : 'copy'} size={14} />
              {copied ? 'Copiado' : 'Copiar mensagem'}
            </button>
          </div>
          {showMessage && (
            <>
              <label className="sr-only" htmlFor="wishlist-message">
                Mensagem do carrinho para a Ary
              </label>
              <textarea
                ref={messageField}
                id="wishlist-message"
                className="wishlist-message"
                readOnly
                value={message}
                rows={10}
              />
            </>
          )}
          {copyError && (
            <p className="field-help" role="status">
              Use Copiar no seu dispositivo; o texto foi selecionado.
            </p>
          )}
        </div>
        <div className="wishlist-bottom">
          <p>
            <Icon name="heart" size={17} /> Seus itens organizados. Os detalhes, combinados com a
            Ary.
          </p>
          <a
            className={`button whatsapp-send ${error ? 'is-disabled' : ''}`}
            href={error ? undefined : whatsappUrl(message)}
            aria-disabled={!!error}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(event) => {
              if (error) {
                event.preventDefault();
                const field = document.getElementById(
                  error.includes('pessoas') ? 'list-people' : 'list-date',
                );
                field?.closest('details')?.setAttribute('open', '');
                field?.focus();
              }
            }}
          >
            Continuar no WhatsApp <Icon name="whatsapp" size={22} />
          </a>
          <small>
            O WhatsApp abre com a mensagem pronta. Você revisa e toca em Enviar.
            <br />
            (11) 98621-6744
          </small>
        </div>
      </div>
    </Modal>
  );
}
