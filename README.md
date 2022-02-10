# Boas vindas ao repositório do projeto de Aggregations!


# Sumário

- [Habilidades](#habilidades)
- [Entregáveis](#entregáveis)
  - [O que deverá ser desenvolvido](#o-que-deverá-ser-desenvolvido)
  - [Desenvolvimento](#desenvolvimento)
  - [Data de entrega](#data-de-entrega)
- [Instruções para entregar seu projeto](#instruções-para-entregar-seu-projeto)
  - [Antes de começar a desenvolver](#antes-de-começar-a-desenvolver)
  - [Durante o desenvolvimento](#durante-o-desenvolvimento)
  - [Depois de terminar o desenvolvimento (opcional)](#depois-de-terminar-o-desenvolvimento-opcional)
- [Como desenvolver](#como-desenvolver)
  - [Linter](#linter)
  - [Instrução para estrutura dos arquivos](#Instrução-para-estrutura-dos-arquivos)
  - [Instruções para restaurar o banco de dados `aggregations`](#Instruções-para-restaurar-o-banco-de-dados-aggregations)
  - [Execução de testes unitários](#execução-de-testes-unitários)
- [Requisitos do projeto](#requisitos-do-projeto)
  - [Lista de requisitos](#lista-de-requisitos)
    - [Desafio 1](#Desafio-1)
    - [Desafio 2](#Desafio-2)
    - [Desafio 3](#Desafio-3)
    - [Desafio 4](#Desafio-4)
    - [Desafio 5](#Desafio-5)
    - [Desafio 6](#Desafio-6)
    - [Desafio 7](#Desafio-7)
    - [Desafio 8](#Desafio-8)
    - [Desafio 9](#Desafio-9)
    - [Desafio 10](#Desafio-10)
    - [Desafio 11](#Desafio-11)
    - [Desafio 12](#Desafio-12)
    - [Desafio 13](#Desafio-13)
    - [Desafio 14](#Desafio-14)
- [Avisos Finais](#avisos-finais)

---

# Habilidades
Neste projeto você será capaz de:
- Executar buscas complexas no banco mongoDB
- Usar os operadores de aggregation para fazer uma pipeline  



# Requisitos do projeto
## Lista de requisitos

Monte queries para encontrar as informações dos desafios a seguir.

---
### Desafio 1

Ajude a Trybe a escolher um filme para a próxima noite! Baseado em uma pesquisa, decidimos que os filmes em potencial devem atender alguns critérios, vejamos:

#### Retorne todos os filmes que satisfaça, através de uma  _pipeline_, as condições abaixo

* `imdb.rating` deve ser maior ou igual a `7`;
* `genres` não deve conter `Crime` ou `Horror`;
* `rated` deve ser igual a `PG` ou `G`;
* `languages` contém `English` e `Spanish`.
* Utilize a coleção `movies`.

Sua query deve retornar `41` documentos.

### Desafio 2

A escolha do filme da noite foi um sucesso, mas infelizmente ficamos com nossa banda de internet quase esgotada, e ainda precisamos de uma nova recomendação de filme. Para diminuir o volume de dados trafegados:

#### Utilizando o mesmo _pipeline_ anterior, retorne apenas os campos `title`, `rated`, `imdb.rating`, `imdb.votes` e `year`, modificando seus nomes para `titulo`, `avaliado`, `notaIMDB`, `votosIMDB` e `ano`, respectivamente.


O resultado da sua query deve ter exatamente o seguinte formato (incluindo a ordem dos campos):

```javascript
{ "titulo" : "A Streetcar Named Desire", "avaliado" : "PG", "notaIMDB" : 8.1, "votosIMDB" : 72364, "ano" : 1951 }
// Demais documentos
```

### Desafio 3

Agora que você tem os campos essenciais, aplique mais um estágio na pipeline do desafio anterior que atenda a seguinte demanda:

#### Retorne esses filmes ordenados por ano e nota IMDB de forma decrescente e título por ordem alfabética.

O resultado da sua query deve ter exatamente o seguinte formato (incluindo a ordem dos campos):

```javascript
{ "titulo" : "McFarland, USA", "avaliado" : "PG", "notaIMDB" : 7.5, "votosIMDB" : 14091, "ano" : 2015 }
// Demais documentos
```

### Desafio 4

Nossa coleção de filmes tem muitos documentos diferentes, alguns com títulos "mais complexos" do que outros. Se quisermos analisar nossa coleção para encontrar títulos de filmes que têm uma só palavra no título, poderíamos buscar todos os filmes da coleção e processar isso na aplicação, mas o `Aggregation Framework` nos permite fazer isso diretamente no lado do banco de dados.

#### Crie uma _pipeline_ que retorna documentos  com o novo campo `title_split`, ela deve seguir as seguintes condições:

- `title_split` deve conter uma lista de palavras presentes em `title`.
- A pipeline deve retornar apenas filmes com o título composto apenas de uma palavra.
- A pipeline deve ser ordenada por `title` em ordem alfabética.

Por exemplo, `"Cinderela"` e `"3-25"` devem entrar nessa contagem, mas `"Cast Away"` não.

**Dica:** utilize os operadores `$split`, `$size` e `$sort` para te auxiliar.
[Documentação do $split](https://docs.mongodb.com/manual/reference/operator/aggregation/split/)

Sua query deve retornar `8068` documentos.

### Desafio 5

Temos outra noite de filme aqui na Trybe e, desta vez, nós perguntamos à equipe quais são suas pessoas preferidas como atores e/ou atrizes. Aqui está o resultado:

* Sandra Bullock
* Tom Hanks
* Julia Roberts
* Kevin Spacey
* George Clooney

#### Considerando esta lista, crie uma _pipeline_ que retorne o `title` do vigésimo quinto filme da agregação que satisfaz as seguintes condições:

- `countries` é Estados unidos no banco estará classificado como USA
- `tomatoes.viewer.rating` maior ou igual a `3`
-  Crie um novo campo chamado `num_favs`, que represente quantos atores ou atrizes da nossa lista de favoritos aparecem no elenco (informação do campo `cast` no banco) do filme, caso ele possua favoritos.
- Ordene os resultados por `num_favs`, `tomatoes.viewer.rating` e `title`, todos em ordem decrescente.

**Dica:** coloque a lista de atores e atrizes favoritos em uma variável e explore operadores como `$size` e [`$setIntersection`](https://docs.mongodb.com/manual/reference/operator/aggregation/setIntersection/index.html).

O resultado da sua query deve ter exatamente o seguinte formato (incluindo a ordem dos campos):

```javascript
{ "title" : <nome_do_filme> }
```

### Desafio 6

Vamos explorar mais operadores aritméticos!

#### Considerando todos os filmes que ganharam o Oscar pelo menos uma vez, calcule o **maior valor**, **menor valor**, **média** e o **desvio padrão** das avaliações (informação do campo `imdb.rating` no banco)

- Para a média e o desvio padrão arredonde os valores para uma casa decimal utilizando o [`$round`](https://docs.mongodb.com/manual/reference/operator/aggregation/round/index.html).

**Dica:** todos os filmes na coleção, que já ganharam um Oscar (informação do campo `awards` no banco), começam com uma sequência de string parecida com essas abaixo, portanto `$regex` é um operador bem-vindo:

```
Won 10 Oscars
Won 1 Oscar
```

Utilizem o [`$stdDevSamp`](https://docs.mongodb.com/manual/reference/operator/aggregation/stdDevSamp/index.html) para calcular o desvio padrão.

O resultado da sua query deve ter exatamente o seguinte formato (incluindo a ordem dos campos):

```javascript
{
  "maior_rating" : <maior_rating>,
  "menor_rating" : <menor_rating>,
  "media_rating" : <media_rating>,
  "desvio_padrao" : <desvio_padrao>
}
```

### Desafio 7

Vamos nos aprofundar um pouco mais em nossa coleção de filmes. 

#### Conte quantos filmes cada um dos atores e atrizes do elenco (`cast` no banco) já participou e obtenha uma média do campo `imdb.rating` para cada um desses atores e atrizes.

- Traga o nome do ator ou atriz;
- Número de filmes em que participou
- Média do imdb desses filmes arredondada para uma casa decimal usando o operador [`$round`](https://docs.mongodb.com/manual/reference/operator/aggregation/round/index.html).
- Considere somente os membros do elenco de filmes com o idioma inglês (`English`). 
- Exiba a lista em ordem decrescente de documentos pelo número de filmes e nome do ator ou atriz.

Sua query deve retornar `47055` documentos. Cada documento no resultado deve ter exatamente o seguinte formato (incluindo a ordem dos campos):

```javascript
{ "_id" : "John Wayne", "numeroFilmes" : 107, "mediaIMDB" : 6.4 }
```

### Desafio 8

Trocando de contexto, vamos utilizar nossa outra coleção que contém dados de empresas aéreas, suas rotas, seus voos e parcerias.

#### Liste todas as parcerias da coleção `air_alliances`, que voam rotas com um Boing 747 ou um Airbus A380 , para descobrir qual delas tem o maior número de rotas com esses aviões.

No campo `airplane`, na coleção `air_routes`: 
- Boing 747 está abreviado para `747`
- Airbus A380 está abreviado para `380`

O resultado da sua query deve ter exatamente o seguinte formato (incluindo a ordem dos campos):

```javascript
{ "_id" : <nome_da_alianca>, "totalRotas" : <total_de_rotas> }
```