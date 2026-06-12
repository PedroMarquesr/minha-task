# Fluxo de Onboarding de Equipes (Companie)

Este plano define a estrutura para lidar com usuários que fazem login (via Google ou outro provedor) mas ainda não estão vinculados a nenhuma equipe no sistema. Em vez de irem direto para o Dashboard com a mensagem "Sem Equipe", eles passarão por um fluxo de decisão.

## User Review Required

> [!IMPORTANT]
> Como você pediu para ajudá-lo a fazer (e não apenas codar diretamente), estruturei este plano passo a passo. Por favor, revise as **Open Questions** abaixo para definirmos a melhor estratégia de negócio antes de iniciarmos o código.

## Open Questions

> [!WARNING]
> Precisamos definir como vai funcionar o processo de **"Se vincular a uma equipe já existente"**:
> 1. A equipe vai gerar um **Código de Convite** (ex: `AB12CD`) que o novo usuário deve digitar?
> 2. Ou o usuário vai digitar o **ID da Equipe**?
> 3. Entrar na equipe será automático ao digitar o código/ID, ou o Dono da equipe precisará **Aprovar** a entrada?

## Proposed Changes

Abaixo estão os passos que seguiremos para implementar essa funcionalidade. Quando você aprovar as regras de negócio, nós podemos começar a codificar parte por parte juntos.

### 1. Interceptação no Login
Atualmente, após o login, o sistema manda direto para o `/dashboard`.
- **Mudança:** Se `company` retornar nulo, redirecionaremos para uma nova página, por exemplo, `/onboarding`.

### 2. Nova Página: `/onboarding` (ou `/setup-equipe`)
Criaremos uma nova tela limpa e focada (apenas para usuários recém-cadastrados).
- **Interface:** Uma tela com duas opções principais:
  - Um botão/card para **"Criar nova equipe"**.
  - Um botão/card para **"Entrar em uma equipe existente"**.

### 3. Fluxo de "Criar Nova Equipe"
- O usuário clica e abre um input perguntando o "Nome da Equipe".
- Ao salvar, criamos um documento na coleção `companies` do Firestore.
- Inserimos o usuário no array `members` e na chave de `roles` como `owner`.
- Atualizamos o estado (Zustand) e redirecionamos para o `/dashboard`.

### 4. Fluxo de "Entrar em Equipe Existente"
- O usuário clica e abre um input pedindo o "Código de Convite" ou "ID da Equipe" (a definir nas Open Questions).
- O sistema busca a equipe no banco de dados. Se existir, adiciona o `uid` do usuário no array de `members` com a role `member`.
- Atualizamos o estado e redirecionamos para o `/dashboard`.

### 5. Proteção de Rota do Dashboard
- **Mudança:** Adicionar uma pequena verificação no Layout ou página do Dashboard. Se o usuário estiver logado mas o `companyId` for `null`, ele é forçado a voltar para o `/onboarding`, impedindo que acesse o painel sem ter equipe.

## Verification Plan

### Testes Manuais a serem feitos em conjunto:
- Fazer login com uma conta Google nova que não está em nenhuma equipe e verificar se vai para `/onboarding`.
- Criar uma equipe e garantir que o Firestore salvou o `uid` corretamente como owner.
- Testar o bloqueio de acessar `/dashboard` diretamente pela URL sem ter equipe.
