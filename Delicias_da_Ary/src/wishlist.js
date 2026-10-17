import { cakeSizes, displayDate, emptyCake, sprinkleOptions } from './data';

export const WHATSAPP_NUMBER = '5511986216744';
export const MAX_QUANTITY = 999;
export function quantityValue(value) {
  const parsed = Math.floor(Number(value));
  return Number.isFinite(parsed) ? Math.min(MAX_QUANTITY, Math.max(1, parsed)) : 1;
}
export function productWish(product, options = {}) {
  const sprinkles =
    product.id === 'brigadeiro'
      ? sprinkleOptions.find((option) => option.value === options.sprinkles)?.value || 'Preto'
      : '';
  return {
    id: `sweet:${product.id}${sprinkles ? `:${sprinkles.toLowerCase()}` : ''}`,
    kind: 'product',
    productId: product.id,
    name: product.name,
    image: product.image,
    cutout: product.cutout || product.category === 'Docinhos',
    source: product.source,
    sprinkles,
    unit: product.category.startsWith('Bolos') ? 'bolo' : 'unidade',
    quantity: 1,
  };
}
export function cakeWish(value) {
  const cake = { ...emptyCake(), ...value, fillings: [...(value?.fillings || [])] };
  cake.theme = cake.celebration ? (cake.theme || '').trim().replace(/\s+/g, ' ').slice(0, 80) : '';
  const signature = JSON.stringify([
    cake.mass,
    [...cake.fillings].sort(),
    cake.size,
    cake.celebration,
    cake.theme.toLocaleLowerCase('pt-BR'),
  ]);
  return {
    id: `cake:${signature}`,
    kind: 'cake',
    name:
      cake.celebration === 'Aniversário infantil'
        ? 'Bolo de aniversário infantil'
        : 'Bolo personalizado',
    cake,
    quantity: 1,
  };
}
export function wishLabel(item) {
  return item.sprinkles ? `${item.name} com granulado ${item.sprinkles.toLowerCase()}` : item.name;
}
export function addWish(items, item, ensureOnly = false) {
  const existing = items.find((entry) => entry.id === item.id);
  if (!existing) return [...items, item];
  if (ensureOnly) return items;
  return items.map((entry) =>
    entry.id === item.id ? { ...entry, quantity: quantityValue(entry.quantity + 1) } : entry,
  );
}
export function wishUnit(item) {
  if (item.kind === 'cake' || item.unit === 'bolo') return item.quantity === 1 ? 'bolo' : 'bolos';
  return item.quantity === 1 ? 'unidade' : 'unidades';
}
export function cakeDescription(cake) {
  const size = cakeSizes.find((item) => item.id === cake?.size);
  return [
    cake?.mass || 'Massa a combinar',
    cake?.fillings?.join(' + ') || 'Recheios a combinar',
    size ? `${size.id} · ${size.diameter} cm · ${size.yield}` : 'Tamanho a combinar',
  ];
}
export function wishlistMessage(items, idea) {
  const lines = [
    `Olá, Ary!${idea.name?.trim() ? ` Sou ${idea.name.trim()}.` : ''} Montei uma ideia de encomenda no seu site e gostaria de conversar.`,
    '',
    items.length
      ? 'MEU CARRINHO DE DELÍCIAS'
      : 'Gostaria de conhecer suas opções e receber sugestões.',
  ];
  items.forEach((item, index) => {
    lines.push(`${index + 1}. ${item.name} — ${item.quantity} ${wishUnit(item)}`);
    if (item.sprinkles) lines.push(`   Granulado: ${item.sprinkles}`);
    if (item.source === 'ary') {
      lines.push('   Modelo já feito pela Ary. Sabores, tamanho e acabamento a combinar.');
    }
    if (item.kind === 'cake') {
      const [, , size] = cakeDescription(item.cake);
      lines.push(
        `   Massa: ${item.cake.mass || 'A combinar'}`,
        `   Recheios: ${item.cake.fillings.join(' + ') || 'A combinar'}`,
        `   Tamanho: ${size}`,
      );
      if (item.cake.celebration) {
        lines.push(
          `   Comemoração: ${item.cake.celebration}`,
          `   Tema ou personagem: ${item.cake.theme || 'A combinar com a Ary'}`,
        );
      }
    }
  });
  lines.push(
    '',
    `Ocasião: ${idea.occasion || 'A combinar'}`,
    `Data desejada: ${displayDate(idea.date)}`,
    idea.people ? `Pessoas (aproximadamente): ${idea.people}` : 'Pessoas: a combinar',
    `Preferência de pagamento: ${idea.payment || 'A combinar'}`,
  );
  if (idea.notes?.trim()) lines.push(`Observações: ${idea.notes.trim()}`);
  lines.push(
    '',
    'Pode me confirmar as opções que você prepara, a disponibilidade para a data e o orçamento? Escolhi as fotos como referência; os sabores, tamanhos e acabamentos serão combinados com você. Obrigado(a)!',
  );
  return lines.join('\n');
}
export function whatsappUrl(message) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
