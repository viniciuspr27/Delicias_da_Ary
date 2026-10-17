import { cakeSizes } from './data';
import { Icon } from './Icons';

export const massColors = {
  Baunilha: { base: '#e4bd80', top: '#f4d49d' },
  Chocolate: { base: '#714333', top: '#91604a' },
  'Red Velvet': { base: '#994244', top: '#b55a59' },
};

const fillingColors = {
  '4 Leites': '#fff3dd',
  Brigadeiro: '#754330',
  Prestígio: '#f5f0e4',
  '2 Amores': '#b67b59',
  Ninho: '#fff0d7',
  'Doce de Leite': '#cb945f',
  'Mousse de Chocolate': '#a76f51',
  'Mousse de Limão': '#e8edc1',
  'Mousse de Maracujá': '#f3d988',
};

export default function CakeIllustration({ cake, compact = false }) {
  const size = cakeSizes.find((item) => item.id === cake.size);
  const colors = massColors[cake.mass] || { base: '#d7c7bd', top: '#e7dbd3' };
  return (
    <div
      className={`cake-illustration ${compact ? 'cake-illustration-compact' : ''}`}
      role="img"
      aria-label={`Ilustração da combinação: massa ${cake.mass || 'a combinar'}, recheios ${cake.fillings.join(' e ') || 'a combinar'}, tamanho ${cake.size || 'a combinar'}`}
      style={{
        '--sponge': colors.base,
        '--sponge-top': colors.top,
        '--filling-one': fillingColors[cake.fillings[0]] || '#f7e5d2',
        '--filling-two': fillingColors[cake.fillings[1] || cake.fillings[0]] || '#f7e5d2',
        '--cake-scale': size?.scale || 1,
      }}
    >
      {!compact && (
        <span className="cake-doodle-spark" aria-hidden="true">
          <Icon name="spark" size={28} />
        </span>
      )}
      {compact && size && (
        <span className="cake-thumbnail-size" aria-hidden="true">
          {size.id}
        </span>
      )}
      <div className="cake-drawing" aria-hidden="true">
        <div className="cake-plate" />
        <div className="cake-layer layer-bottom" />
        <div className="cake-filling filling-bottom" />
        <div className="cake-layer layer-middle" />
        <div className="cake-filling filling-top" />
        <div className="cake-layer layer-top" />
        <div className="cake-cap" />
      </div>
      <span className="cake-illustration-label" aria-hidden="true">
        {compact ? 'Ilustração' : 'Ilustração da combinação'}
      </span>
    </div>
  );
}
