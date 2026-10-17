import { useEffect, useState } from 'react';
import {
  cakeMasses,
  cakeFillings,
  cakeSizes,
  paymentMethods,
  cakeCelebrations,
  themeSuggestions,
} from './data';
import { Icon, Bow } from './Icons';
import { refreshMotion } from './useMotion';
import CakeIllustration, { massColors } from './CakeIllustration';

export default function CakeBuilder({ cake, onChange, onContinue }) {
  const [notice, setNotice] = useState('');
  const size = cakeSizes.find((item) => item.id === cake.size);
  useEffect(() => {
    refreshMotion();
  }, [notice, cake.mass, cake.size, cake.fillings, cake.celebration]);
  const toggleFilling = (filling) => {
    if (cake.fillings.includes(filling)) {
      onChange({ ...cake, fillings: cake.fillings.filter((item) => item !== filling) });
      setNotice('');
    } else if (cake.fillings.length < 2) {
      onChange({ ...cake, fillings: [...cake.fillings, filling] });
      setNotice('');
    } else {
      setNotice(
        'Você já escolheu duas preferências. Desmarque uma para experimentar outra combinação.',
      );
    }
  };
  const changeSize = (value) => {
    onChange({ ...cake, size: value });
    setNotice('');
  };
  return (
    <section
      className="cake-builder-section section-space"
      id="monte-seu-bolo"
      aria-labelledby="cake-builder-heading"
    >
      <div className="container">
        <div className="section-heading" data-reveal>
          <div>
            <p className="eyebrow">SEU SABOR. SUA COMBINAÇÃO. SEU MOMENTO.</p>
            <h2 id="cake-builder-heading">
              Monte seu bolo.
              <br />
              <em>Sua combinação favorita.</em>
            </h2>
          </div>
          <p>
            Escolha massa, recheios e tamanho.
            <br />
            Para uma festa temática, conte também o tema ou personagem.
          </p>
        </div>
        <div className="cake-builder-layout">
          <div className="cake-builder-controls">
            <fieldset className="cake-fieldset">
              <legend>
                <span>01</span> Qual massa combina com você?
              </legend>
              <div className="mass-options">
                {cakeMasses.map((mass) => (
                  <label
                    className={`mass-option ${cake.mass === mass ? 'is-selected' : ''}`}
                    key={mass}
                  >
                    <input
                      type="radio"
                      name="cake-mass"
                      value={mass}
                      checked={cake.mass === mass}
                      onChange={() => onChange({ ...cake, mass })}
                    />
                    <span className="mass-dot" style={{ background: massColors[mass].base }} />
                    <span>{mass}</span>
                    {cake.mass === mass && <Icon name="check" size={15} />}
                  </label>
                ))}
              </div>
              <button
                type="button"
                className="builder-reset"
                onClick={() => onChange({ ...cake, mass: '' })}
              >
                Prefiro combinar a massa depois
              </button>
            </fieldset>
            <fieldset className="cake-fieldset">
              <legend>
                <span>02</span> E as preferências de recheio?
              </legend>
              <p className="cake-field-help" id="fillings-help">
                Você pode combinar até 2 recheios tradicionais. Confirme com a Ary quais opções são
                tradicionais ou especiais.
              </p>
              <div className="filling-options">
                {cakeFillings.map((filling) => {
                  const checked = cake.fillings.includes(filling);
                  return (
                    <label
                      className={`filling-option ${checked ? 'is-selected' : ''}`}
                      key={filling}
                    >
                      <input
                        type="checkbox"
                        name="cake-fillings"
                        value={filling}
                        checked={checked}
                        onChange={() => toggleFilling(filling)}
                        aria-describedby="fillings-help filling-counter"
                      />
                      <span className="filling-check">
                        <Icon name={checked ? 'check' : 'plus'} size={13} />
                      </span>
                      <span>{filling}</span>
                    </label>
                  );
                })}
              </div>
              <p id="filling-counter" className="filling-counter" role="status">
                {cake.fillings.length} de 2 preferências escolhidas
                {cake.fillings.length === 0 ? ' · pode deixar a combinar' : ''}
              </p>
              {notice && (
                <p className="builder-notice" role="alert">
                  {notice}
                </p>
              )}
            </fieldset>
            <fieldset className="cake-fieldset">
              <legend>
                <span>03</span> Para quantos sorrisos?
              </legend>
              <div className="cake-size-options">
                {cakeSizes.map((item) => (
                  <label
                    key={item.id}
                    className={`cake-size-option ${cake.size === item.id ? 'is-selected' : ''}`}
                  >
                    <input
                      type="radio"
                      name="cake-size"
                      value={item.id}
                      checked={cake.size === item.id}
                      onChange={() => changeSize(item.id)}
                    />
                    <span className="size-name">{item.id}</span>
                    <span className="size-diameter">{item.diameter} cm</span>
                    <span className="size-yield">{item.yield}</span>
                    {cake.size === item.id && <Icon name="check" size={15} />}
                  </label>
                ))}
              </div>
              <p className="cake-field-help">
                O rendimento pode variar conforme a espessura do corte.
              </p>
              <button type="button" className="builder-reset" onClick={() => changeSize('')}>
                Quero ajuda para escolher o tamanho
              </button>
            </fieldset>
            <fieldset className="cake-fieldset cake-theme-fieldset">
              <legend>
                <span>04</span> Uma festa com a sua cara
              </legend>
              <div className="cake-celebration-options">
                {['', ...cakeCelebrations].map((value) => (
                  <label
                    key={value || 'a-combinar'}
                    className={`celebration-option ${cake.celebration === value ? 'is-selected' : ''}`}
                  >
                    <input
                      type="radio"
                      name="cake-celebration"
                      value={value}
                      checked={cake.celebration === value}
                      onChange={() =>
                        onChange({ ...cake, celebration: value, theme: value ? cake.theme : '' })
                      }
                    />
                    <Icon
                      name={value === 'Aniversário infantil' ? 'star' : value ? 'spark' : 'cake'}
                      size={20}
                    />
                    <span>{value || 'Decoração a combinar'}</span>
                    {cake.celebration === value && <Icon name="check" size={15} />}
                  </label>
                ))}
              </div>
              {cake.celebration && (
                <div className="cake-theme-input">
                  <label className="field-label" htmlFor="cake-theme">
                    Tema ou personagem <small>(opcional)</small>
                  </label>
                  <input
                    id="cake-theme"
                    type="text"
                    maxLength={80}
                    value={cake.theme}
                    placeholder={
                      cake.celebration === 'Aniversário infantil'
                        ? 'Ex.: dinossauros, um desenho ou personagem favorito'
                        : 'Ex.: Paris, futebol, flores…'
                    }
                    aria-describedby="cake-theme-help"
                    onChange={(event) => onChange({ ...cake, theme: event.target.value })}
                  />
                  {cake.celebration === 'Aniversário infantil' && (
                    <div
                      className="cake-theme-suggestions"
                      role="group"
                      aria-label="Ideias de tema infantil"
                    >
                      {themeSuggestions.map((theme) => (
                        <button
                          key={theme}
                          type="button"
                          aria-pressed={cake.theme === theme}
                          onClick={() => onChange({ ...cake, theme })}
                        >
                          {theme}
                        </button>
                      ))}
                    </div>
                  )}
                  <p className="cake-field-help" id="cake-theme-help">
                    Pode escrever qualquer ideia. As cores, os personagens e a decoração final são
                    combinados com a Ary.
                  </p>
                </div>
              )}
            </fieldset>
          </div>
          <aside className="cake-builder-visual" aria-label="Resumo da sua combinação">
            <div className="cake-visual-header">
              <p className="eyebrow">UMA IDEIA GANHANDO FORMA</p>
              <Icon name="heart" size={23} />
            </div>
            <CakeIllustration cake={cake} />
            <div className="cake-combination" aria-live="polite" aria-atomic="true">
              <h3>Seu bolo, do seu jeitinho.</h3>
              <dl>
                <div>
                  <dt>Massa</dt>
                  <dd>{cake.mass || 'A combinar'}</dd>
                </div>
                <div>
                  <dt>Recheios</dt>
                  <dd>{cake.fillings.length ? cake.fillings.join(' + ') : 'A combinar'}</dd>
                </div>
                <div>
                  <dt>Tamanho</dt>
                  <dd>
                    {size ? `${size.id} · ${size.diameter} cm · ${size.yield}` : 'A combinar'}
                  </dd>
                </div>
                {cake.celebration && (
                  <>
                    <div>
                      <dt>Festa</dt>
                      <dd>{cake.celebration}</dd>
                    </div>
                    <div>
                      <dt>Tema</dt>
                      <dd>{cake.theme || 'A combinar com a Ary'}</dd>
                    </div>
                  </>
                )}
              </dl>
            </div>
            <p className="cake-visual-note">
              A ilustração ajuda a imaginar os sabores. A aparência final, os recheios e a montagem
              são combinados com a Ary.
            </p>
            <button
              className="button button-primary cake-continue"
              type="button"
              onClick={onContinue}
            >
              Adicionar bolo ao carrinho <Icon name="arrow" size={18} />
            </button>
            <p className="cake-small-note">Pode continuar com escolhas em aberto.</p>
            <Bow className="cake-builder-bow" />
          </aside>
        </div>
      </div>
    </section>
  );
}

export function OrderGuidelines() {
  return (
    <section className="order-guidelines container" aria-labelledby="guidelines-heading">
      <div className="guidelines-heading" data-reveal>
        <p className="eyebrow">PARA COMBINAR TUDO COM CARINHO</p>
        <h2 id="guidelines-heading">
          Antes de encomendar,
          <br />
          <em>vale saber.</em>
        </h2>
      </div>
      <div className="guidelines-grid">
        <article className="guideline-card" data-reveal>
          <span className="guideline-number">
            5 <small>dias</small>
          </span>
          <h3>Um tempinho para preparar.</h3>
          <p>
            Faça sua encomenda com no mínimo <strong>5 dias de antecedência</strong>. A
            disponibilidade da data é confirmada pela Ary.
          </p>
        </article>
        <article className="guideline-card" data-reveal>
          <span className="guideline-number">
            50<small>%</small>
          </span>
          <h3>Um começo bem combinado.</h3>
          <p>
            <strong>50% de entrada</strong> no ato da encomenda e o restante na entrega do bolo. O
            pagamento é combinado diretamente no atendimento.
          </p>
        </article>
        <article className="guideline-card guideline-payment" data-reveal>
          <span className="guideline-symbol">
            <Icon name="heart" size={32} />
          </span>
          <h3>Escolha como fica melhor.</h3>
          <p>Formas de pagamento informadas pela confeitaria:</p>
          <div className="payment-pills">
            {paymentMethods.map((method) => (
              <span key={method}>{method}</span>
            ))}
          </div>
        </article>
      </div>
      <div className="guideline-details">
        <details onToggle={refreshMotion}>
          <summary>
            Cuidados depois da entrega <Icon name="plus" size={18} />
          </summary>
          <p>
            Após a entrega, a confeitaria informa que não se responsabiliza por acidentes com o
            bolo. Tenha atenção ao transporte, à conservação e ao manuseio.
          </p>
        </details>
        <details onToggle={refreshMotion}>
          <summary>
            Desistência da encomenda <Icon name="plus" size={18} />
          </summary>
          <p>
            Em caso de desistência da encomenda 24 horas antes da entrega, o sinal de 50% pago não é
            devolvido, conforme a condição informada pela confeitaria.
          </p>
        </details>
      </div>
    </section>
  );
}
