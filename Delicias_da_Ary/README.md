# Delícias da Ary — POC V8

Landing page local em React, Tailwind CSS e GSAP/ScrollTrigger, refinada a partir das fotos e capturas fornecidas. Rosa e branco conduzem a identidade; prata e dourado aparecem em contornos e detalhes.

## Abrir a apresentação

Abra `dist/POC_Delicias_da_Ary.html` no navegador e use **Desktop / Celular** na barra superior. O arquivo inclui as fontes, o JavaScript, os estilos e as dezesseis fotos; o site abre offline. O WhatsApp exige internet. `dist/index.html` abre a página sem a barra de apresentação.

A POC não foi publicada. Nenhuma mensagem foi enviada nos testes.

## Ajustes desta versão

- Quatro modelos novos, em fotos individuais tratadas: **Chocolate e bombons**, **Rosetas cor-de-rosa**, **Naked cake de frutas** e **Paris em rosa**. A vitrine passa a ter 16 opções, incluindo 7 bolos já feitos pela Ary.
- Destaque para **Aniversário infantil** com atalho que seleciona essa opção no configurador sem apagar massa, recheios ou tamanho já escolhidos.
- Etapa de decoração com **Aniversário infantil**, **Outra festa temática** ou **Decoração a combinar**. Campo livre **Tema ou personagem**, até 80 caracteres, e sugestões rápidas de temas infantis.
- O tema pertence a cada bolo. Bolos com sabores iguais e temas diferentes ficam separados no carrinho; a mesma combinação repetida soma a quantidade. Mudar o configurador não altera os itens anteriores.
- Ao selecionar **Brigadeiro**, tanto pelo card quanto pela foto ampliada, o visitante escolhe granulado **Preto**, **Branco** ou **Colorido** antes de adicionar. Preto aparece pré-selecionado e pode ser alterado.
- Cada cor fica em uma linha própria do carrinho, com quantidade independente e identificação textual e visual. O contador da vitrine soma todas as cores.
- A mensagem de WhatsApp inclui o granulado por item, a comemoração e o tema ou personagem de cada bolo.

## Experiência preservada

- Abertura com o bolo floral rosa da imagem 3 enviada, recortado sobre a composição rosa, com entrada suave e parallax. O enquadramento usa a imagem inteira, preservando as flores.
- Sete fotos tratadas de bolos já feitos pela Ary, incluindo os três modelos da versão anterior e os quatro novos. Os bolos estão na categoria **Bolos de festa**, na mesma vitrine, com ampliação e carrinho.
- Recuperação da foto de chocolate que estava vazia. Todos os arquivos e todas as imagens incorporadas no HTML foram decodificados e conferidos.
- Uma única vitrine em grade com filtros, ampliação das fotos e adição ao carrinho.
- Remoção do carrossel horizontal, do brownie e da galeria repetida “Uma pausa”.
- Seis docinhos: brigadeiro, beijinho, bicho de pé, leite em pó, cajuzinho e dois amores.
- Três bolos caseiros: chocolate, cenoura e fubá.
- Cards que aparecem com o scroll e uma composição com bolos entrando pelas laterais, sem prender a rolagem.
- Configurador de bolo com massas, recheios e tamanhos das referências fornecidas.
- Carrinho lateral com quantidades, remoção, detalhes opcionais e mensagem pronta, já visível para revisão.

A página não tem preços. As sete fotos de bolos de festa partiram dos registros fornecidos e foram recortadas e tratadas com IA; a interface as identifica como fotos tratadas de modelos já feitos pela Ary. As outras nove fotos continuam ilustrativas, geradas por IA. Todas as escolhas são referências para conversar sobre sabores, tamanho, acabamento e disponibilidade. Não há avaliações inventadas.

## Direção visual

| Uso                  | Cor                                |
| -------------------- | ---------------------------------- |
| Base                 | Branco `#ffffff`                   |
| Botões e destaques   | Rosa `#ae466a`                     |
| Superfícies suaves   | Rosa claro `#fbeef2`               |
| Texto e contraste    | Vinho rosado `#492d39` / `#75334c` |
| Ornamentos dourados  | `#a78345`                          |
| Ornamentos prateados | `#b3b3bf`                          |

Os tons metálicos são discretos; não substituem as cores de leitura. Tipografia: Cormorant Garamond e DM Sans, com arquivos locais incluídos.

## Carrinho e WhatsApp

Destino autorizado: **(11) 98621-6744**, configurado como `5511986216744` em `src/wishlist.js`.

1. Adicione doces na vitrine ou uma combinação de bolo. No brigadeiro, escolha primeiro a cor do granulado; no bolo infantil, informe o tema ou personagem se desejar.
2. Abra **Carrinho** no cabeçalho ou no botão flutuante.
3. Ajuste quantidades, remova itens e abra **Detalhes da encomenda** para preencher o que desejar.
4. Confira a mensagem pronta. A cópia de texto tem alternativa manual quando a API de clipboard não estiver disponível.
5. **Continuar no WhatsApp** abre `wa.me` com o número e o texto preenchidos. O visitante revisa e toca em Enviar no próprio WhatsApp.

O carrinho soma escolhas idênticas e guarda cada combinação de bolo independentemente. Cores de granulado diferentes ficam separadas, assim como temas diferentes. A foto do brigadeiro é uma referência ilustrativa; a cor escolhida é indicada pelos seletores e pelo texto do item. Alterar o configurador depois não muda os bolos já adicionados. Remover um item também o remove da mensagem. Quantidades de 1 a 999 por item; pessoas de 1 a 10.000 ou em aberto. Uma data preenchida precisa respeitar os cinco dias de antecedência.

O contato é uma solicitação de disponibilidade e orçamento. Não há reserva automática, checkout, pagamento, robô, API de atendimento ou acesso à conta da cliente. As escolhas e os campos ficam na memória da página e são descartados ao recarregar. O texto só é copiado ou encaminhado por ação do visitante.

## Montagem do bolo

Massas: Baunilha, Chocolate e Red Velvet. Nove preferências de recheio, até duas escolhidas, e quatro tamanhos. As classificações de recheios tradicionais e especiais precisam ser confirmadas com a Ary. O bolo em camadas usa o mesmo componente no configurador e nas miniaturas do carrinho. As cores da massa e dos recheios acompanham a seleção; o tamanho altera a escala da ilustração. Escolhas em aberto têm aparência neutra e o texto “a combinar”. É uma representação esquemática, não uma promessa de decoração, cor real ou escala exata.

As informações de tamanhos, rendimento, antecedência, sinal e pagamento foram transcritas das cinco referências originais. Consulte `REFERENCIAS_V3.md`.

## Desenvolvimento

Use uma versão atual do Node compatível com o Vite instalado. Na pasta do projeto:

```bash
npm ci
npm run dev
```

Abra o endereço Local informado pelo Vite. Para testar em um celular real na mesma rede Wi-Fi, use o endereço Network indicado. Isso serve apenas a prévia na rede local. Alguns visualizadores de arquivos de celular não executam JavaScript; nesse caso, use essa prévia local.

```bash
npm run build
```

O build verifica primeiro se os WebP estão vazios, truncados ou com assinatura inválida, evitando repetir a falha da foto de chocolate. Depois gera os dois HTMLs autocontidos.

## Arquivos principais

| Arquivo                      | Conteúdo                                                                |
| ---------------------------- | ----------------------------------------------------------------------- |
| `src/App.jsx`                | Estado do carrinho, notificações, composição da página                  |
| `src/Sections.jsx`           | Hero, vitrine, bolos animados, guia de encomenda, FAQ e fotos ampliadas |
| `src/UI.jsx`                 | Marca, cabeçalho, menu e diálogo acessível                              |
| `src/Wishlist.jsx`           | Carrinho lateral e revisão da mensagem                                  |
| `src/wishlist.js`            | Quantidades, combinações, mensagem e link de WhatsApp                   |
| `src/CakeBuilder.jsx`        | Configurador e condições de encomenda                                   |
| `src/CakeIllustration.jsx`   | Ilustração dinâmica compartilhada entre configurador e carrinho         |
| `src/data.js`                | Referências de doces, opções de bolo e regras de validação              |
| `src/useMotion.js`           | GSAP e ScrollTrigger com limpeza e movimento reduzido                   |
| `src/styles.css`             | Layout V8, paleta, componentes e adaptação por largura                  |
| `src/CakeBuilder.css`        | Estrutura visual do configurador                                        |
| `src/assets/`                | Dezesseis fotos individuais WebP                                        |
| `scripts/verify-assets.mjs`  | Verificação dos arquivos de imagem antes do build                       |
| `scripts/create-preview.mjs` | Apresentação com botões Desktop / Celular                               |

## Verificações realizadas

- Build de produção concluído.
- As dezesseis imagens dentro do HTML foram decodificadas e seus bytes comparados com os arquivos de origem, incluindo as sete fotos tratadas com transparência preservada.
- Testes em DOM simulado: filtros, fotos dos bolos da Ary ampliadas, inclusão/remoção, quantidades, combinações independentes, limite de recheios, campos únicos no carrinho, data, pessoas e mensagem.
- Miniaturas verificadas com diferentes massas, recheios e tamanhos, incluindo a mesma massa com recheios diferentes. Os bolos personalizados não carregam a foto genérica de chocolate. As fotos dos produtos da vitrine permanecem no carrinho.
- O novo guia reflete os itens escolhidos e abre o carrinho preservando a encomenda.
- As quatro novas fotos ampliam e entram individualmente no carrinho. Granulados separados, quantidades por cor, cancelamento da seleção, temas distintos, repetição da mesma combinação e preservação dos itens anteriores foram verificados.
- Os bolos entram no carrinho com unidades de bolo e mensagem de referência do modelo, sem inferir sabores internos ou tamanho pela foto.
- Link e conteúdo codificado conferidos para `5511986216744`, sem abrir ou enviar mensagens.
- Inicialização das animações sob condições de mídia de 390 e 1280 pixels. Movimento reduzido e menu mobile verificados.
- Alternância Desktop/Celular da apresentação e correspondência com o build verificadas.

Não houve navegador visual disponível neste ambiente. A renderização final, o foco nativo do diálogo, a fluidez do scroll e os gestos em aparelho real ainda precisam de revisão visual/manual. O botão no rodapé permite reduzir as animações, e a página respeita inicialmente a preferência do sistema.

Veja `IMAGENS_ARY_V8.md`, `IMAGENS_ARY_V6.md`, `IMAGENS_BASE.md` e `IMAGENS_V5.md` para os prompts e a origem das imagens, e `licencas/` para os avisos das dependências.
