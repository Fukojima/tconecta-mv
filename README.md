# Tasconecta - Backend

![Arquitetura](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Banco de dados](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)


> Repositório do módulo backend da aplicação Tasconecta 


### Documentação

> [SwaggerUI - Tasconecta](https://tascom-connectivity.herokuapp.com/api/aps-connectivity-docs/)

> [Bibliotecas de desenvolvimento - Tasconecta](https://www.notion.so/japuadev/Mapeamento-Libs-Tasconecta-5bc620fed272486983e47ecfd4880810)

### 🔥 Patch Notes - 08/09
## Atualizações do Projeto TASCONECTA 

1. **Tests:**
    - Adicionados os testes que criam usuários, empresas, integrações e fazem validações de login com e-mail e usuário.
    - Testes desenvolvidos em Jest para prevenir erros dentro da API;
     
2. **Validations:** 
    - Desenvolvidos métodos de validações para todos os services e controllers;
    - As validações são funções especificas que ficarão separadas dos services e dos controllers e serão chamadas apenas para fazer validações de usuário existentes, empresas, integrações, corpos de requisições vazios ou se os dados foram preenchidos pelo o usuário de forma correta;
    
3. **Services:** 
    - Implementando método de service para todos os controllers (users, company, auth, integration, integrationConfig) que serão responsáveis por chamar os métodos de validação e por gerenciar as respostas de validação e intermediar o controle entre as requisições do usuário e o banco. 


Histórico de atualizações:

- [Patch Notes 08/09](https://www.notion.so/japuadev/Patch-Notes-Tasconecta-6d329e238d9b45ada80052f5d63997e7)


## 📝 Usando o Tasconecta

Após instalação das dependecias, siga estas etapas:

```
npm run dev
```

Para acesso ao banco crie o arquive .env conforme o arquivo .env.example e solicite acesso à url do banco de desenvolvimento.

## 📝 Fluxo de desenvolvimento

Para contribuir com <nome_do_projeto>, siga estas etapas:

1. Acesse a branch develop.
2. Crie um branch: `git checkout -b <nome_branch>`. Obs: O nome da branch é definido pela issue, para dúvidas na padronização solicite apoio.
3. Faça suas alterações e confirme-as: `git commit -m '<mensagem_commit>'`
4. Suba a branch com as modificações: `git push origin <nome_branch>`
5. Crie a solicitação de merge.

Como alternativa, consulte a documentação do GitHub em [como criar um merge request](https://help.github.com/en/github/collaborating-with-issues-and-pull-requests/creating-a-pull-request).

## 💻Equipe



<table>
  <tr>
    <td align="center">
      <a href="#">
        <img src="https://gitlab.com/uploads/-/system/user/avatar/9761629/avatar.png?width=400" width="100px;" /><br>
        <sub>
          <b>João Apuã</b>
        </sub>
      </a>
    </td>
    <td align="center">
      <a href="#">
        <img src="https://gitlab.com/uploads/-/system/user/avatar/8663499/avatar.png?width=400" width="100px;" /><br>
        <sub>
          <b>Leonardo Fenix</b>
        </sub>
      </a>
    </td>
    <td align="center">
      <a href="#">
        <img src="https://secure.gravatar.com/avatar/bcd0a97c8a211cd47532b0df19da62ba?s=800&d=identicon" width="100px;" /><br>
        <sub>
          <b>Lucas Antônio</b>
        </sub>
      </a>
    </td>
    <td align="center">
      <a href="#">
        <img src="https://gitlab.com/uploads/-/system/user/avatar/9242537/avatar.png?width=400" width="100px;" /><br>
        <sub>
          <b>Jhonatas Barros</b>
        </sub>
      </a>
    </td>
    <td align="center">
      <a href="#">
        <img src="https://gitlab.com/uploads/-/system/user/avatar/9519901/avatar.png?width=400" width="100px;" /><br>
        <sub>
          <b>Filipe Izidorio</b>
        </sub>
      </a>
    </td>
  </tr>
</table>


