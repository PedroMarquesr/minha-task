# Entendendo o Fluxo de Login, Equipes e Convites

Este guia foi feito especialmente para você entender, passo a passo, tudo o que acontece no sistema de autenticação do seu aplicativo. Vamos explicar desde quando o usuário clica em "Entrar com Google" até a parte de ele criar uma nova equipe ou aceitar o convite para entrar em uma equipe que já existe.

---

## 1. O Guarda-Costas Global (`ActivityTracker`)

Antes de o usuário sequer ver a página de login, existe um código que fica de olho em tudo. Ele fica no arquivo `src/app/layout.js`. Como o `layout.js` envolve todas as páginas do site, esse "guarda-costas" sempre é executado.

### O que ele faz?
Ele verifica se o usuário está logado. Se não estiver, ele chuta o usuário para a página `/login`.

### A Sintaxe Importante:
```javascript
  const pathname = usePathname() // Diz qual a página atual (ex: "/login" ou "/invite/ABCD")

  useEffect(() => {
    // A exclamação (!) significa "NÃO".
    // Então: Se o usuário NÃO existe E a página NÃO é o login E a página NÃO começa com /invite...
    if (!user && pathname !== "/login" && !pathname.startsWith("/invite")) {
      router.push("/login") // Manda para o login!
    }
  }, [user, pathname])
```
**Por que isso é importante?** Porque rotas como `/login` e `/invite` são **rotas públicas**. Uma pessoa precisa conseguir acessar o link do convite (`/invite/ABCD`) mesmo estando deslogada. Se não colocássemos essa regra, o guarda-costas expulsaria o visitante da página do convite antes mesmo dele conseguir ler!

---

## 2. A Página do Convite (`/invite/[id]/page.jsx`)

Quando o Dono da equipe cria um link, ele tem este formato: `http://localhost:3000/invite/12345ABCD`.
O Next.js entende que esse código estranho (`12345ABCD`) é um parâmetro dinâmico chamado `id` (por isso o nome da pasta tem os colchetes `[id]`).

### O que a página faz?
Ela pega esse `id` da URL, vai até o Firebase e pergunta: *"Ei, existe algum convite com esse ID?"*. Se existir e for válido, ela mostra uma mensagem bonitinha: "Você foi convidado!".

### A Sintaxe Importante:
```javascript
  const { id } = useParams() // Pega o "12345ABCD" da URL
```

Quando o visitante clica no botão **"Entrar para Aceitar"**, a mágica acontece aqui:
```javascript
  const handleGoToLogin = () => {
    router.push(`/login?invite=${id}`) 
  }
```
**O que é esse ponto de interrogação `?` ?**
Isso se chama **Query Parameter** (parâmetro de busca). Nós estamos mandando o visitante para a página de `/login`, mas estamos "pendurando" uma bagagem na URL dele. O Next.js não muda a página por causa do `?invite=...`, mas ele permite que a página de login leia essa bagagem!

---

## 3. A Página de Login (`/login/page.jsx`)

A página de login é a porta de entrada. Nela, o visitante vê o botão do Google. 

### O famoso `<Drawer>` (A gaveta)
Na página de login nós temos um `Drawer`. Ele serve para coletar o **Nome da Equipe** e o **Telefone** caso o usuário seja totalmente novo (não tem equipe e não foi convidado por ninguém).
Ele fica escondido o tempo todo: `open={showDrawer}`. Ele só vai aparecer se o componente do Botão do Google mandar um sinal para a página avisando: "Opa, esse usuário é novo, abre a gaveta!".

Nós passamos uma função (callback) para o Botão do Google chamada `onNeedsSetup` (traduzindo: Ao Precisar de Configuração):
```javascript
  <GoogleButton onNeedsSetup={(loggedUser) => {
    setTempUser(loggedUser) // Guarda os dados do Google temporariamente
    setShowDrawer(true) // Abre a gaveta!
  }} />
```

---

## 4. O Cérebro da Operação (`GoogleButton.jsx`)

Esse é o arquivo que faz o trabalho pesado. Quando o usuário clica em "Iniciar ou Entrar com Google", o Firebase abre o pop-up e faz o login. Quando o pop-up fecha, temos os dados do usuário. E agora?

O código vai verificar **duas possibilidades**:

### Possibilidade 1: A Bagagem (O Convite)
O botão primeiro "vasculha" a URL para ver se a pessoa veio de um link de convite:
```javascript
  // useSearchParams lê os parâmetros que estão depois do "?" na URL
  const searchParams = useSearchParams() 
  const inviteId = searchParams.get("invite") // Pega o código do convite, se existir
```

Se o `inviteId` existir, ele entra na lógica de convite:
```javascript
  if (inviteId) {
    // Tenta aceitar o convite lá no banco de dados
    const company = await acceptInviteForUser(inviteId, loggedUser.uid, ...)
    
    // Deu certo! Salva os dados no Zustand (useStore)
    setUser({ ... })
    
    // Manda pro Dashboard
    router.push("/dashboard")
    return // O 'return' encerra a função aqui! Ele NÃO executa o resto do código.
  }
```

### Possibilidade 2: Usuário Comum
Se não tem convite na URL, ele segue a vida normal:
```javascript
  // Vai no banco de dados ver se o usuário já pertence a uma empresa
  const company = await findUserCompany(loggedUser.uid)

  if (company) {
    // Se a empresa existir, salva no estado e vai pro Dashboard.
    setUser({ ... })
    router.push("/dashboard")
  } else {
    // Se a empresa NÃO existir (é um usuário totalmente novo)
    if (onNeedsSetup) {
      onNeedsSetup(loggedUser) // Avisa a página mãe (page.jsx) para ABRIR O DRAWER!
    }
  }
```

---

## 5. O Banco de Dados (`utils/company.js`)

Aqui ficam as funções que conversam diretamente com o Firebase. Pense nelas como os "carteiros".

### Como ele acha a empresa do usuário? (`findUserCompany`)
Sua estrutura de dados salva os membros de uma empresa dentro de um Mapa (objeto) chamado `members`. Para saber se o usuário "Pedro" pertence à empresa "X", o código pergunta:
```javascript
  const q = query(
    collection(db, "companies"),
    where(`members.${uid}`, "!=", null) 
    // Traduzindo: Procure empresas onde o campo 'members' tem uma propriedade com o UID do usuário e ela não seja Nula.
  )
```

### Como o convite é aceito? (`acceptInviteForUser`)
Esta função faz as seguintes verificações de segurança:
1. Puxa os dados do convite.
2. Checa se o status dele ainda é `"pending"` (pendente). Se for "accepted" (aceito), ele bloqueia.
3. Checa se a data de expiração (`expiresAt`) já passou do dia de hoje. Se passou, bloqueia.

Se tudo estiver OK, ele faz duas coisas no Firebase ao mesmo tempo:
```javascript
  // 1. Atualiza a empresa: Insere o novo usuário dentro do objeto 'members'
  await updateDoc(companyRef, {
    [`members.${uid}`]: {
      role: role, // 'member' ou 'owner'
      joinedAt: serverTimestamp(), // Data e hora do servidor
      // ...outros dados
    }
  })

  // 2. Atualiza o convite: "Queima" o convite para não ser usado de novo
  await updateDoc(inviteRef, {
    status: "accepted", // Muda de pendente para aceito
    acceptedBy: uid, // Salva quem foi que aceitou
  })
```

---

## Resumo Visual do Fluxo

1. **Acesso ao Link**: Visitante clica em `/invite/123`.
2. **Página de Convite**: Firebase diz "O convite é válido!". Visitante clica em "Entrar".
3. **Página de Login**: Visitante cai em `/login?invite=123`. Clica no Botão do Google.
4. **GoogleButton**: Identifica o `?invite=123`. Processa a entrada e envia pro painel. **Nenhum Drawer é aberto.**

Ou, se for usuário normal:

1. **Acesso Direto**: Visitante digita `/login`. Clica no Botão do Google.
2. **GoogleButton**: Cadê o convite? "Não tem". Então vasculha o Firebase.
3. **GoogleButton**: Cadê a empresa dele? "Não tem". Aciona o `onNeedsSetup`.
4. **Página de Login**: Abre o `Drawer` pedindo nome da Equipe e telefone! 

É assim que as duas situações conseguem coexistir em paz no seu sistema! 🚀
