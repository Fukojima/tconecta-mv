module.exports = {
    //sucess
    _SUCCESS_CREATE: 'Registrado com sucesso.',
    _SUCCESS_UPDATE: 'Registro atualizado com sucesso.',
    _SUCCESS_DELETE: 'Registro excluído com sucesso.',
    _SUCCESS_LOGIN: 'Login efetuado com sucesso.',
    _SUCCESS_CREATE_REPORT: 'Relatório gerado com sucesso.',
    _SUCCESS_CREATE_HASH: 'Hash de integração manual criado com sucesso.',

    //generic errors
    _ERROR_EMPTY_ID: 'Ausência do campo Id.',
    _ERROR_NOT_FOUND: 'Registro não encontrado no banco de dados.',
    _ERROR_COMPANY_NOT_FOUND: 'Empresa não encontrada no banco de dados.',
    _ERROR_UPDATE: 'Houve um erro na atualização do registro.',
    _ERROR_DELETE: 'Houve um erro na exclusão do registro.',
    _ERROR_DUPLICATE_DESCRIBE: 'Já existe uma descrição com esse valor.',
    _ERROR_LOGIN_NOT_FOUND: 'Senha ou usuário incorreto.',
    _ERROR_INCOMPLETE_BODY: 'Corpo da requisição incompleto.',
    _ERROR_CREATE: 'Ocorreu um erro ao tentar registrar.',
    _ERROR_FETCH: 'Ocorreu um erro ao requisitar os dados do servidor.',
    _ERROR_UNAUTHORIZED_TOKEN: 'Token inválido.',
    _ERROR_INVALID_EMAIL: 'E-mail inválido.',
    _ERROR_CREATE_REPORT: 'Não foi possível gerar o documento.',
    _ERROR_REFRESH_TOKEN: 'Falha na autenticação do refresh token.',
    _ERROR_UNEXPECTED: 'Ocorreu um erro inesperado.',
    _ERROR_USER_PERMISSION: 'Usuário não tem permissão para consultar informações.',
    _ERROR_EXPIRATION_DATE: 'Data de expiração deve ser maior que data atual.',
    _ERROR_INVALID_CNPJ: 'Número de CNPJ inválido.',
    _ERROR_CONNECTION_SETTINGS: 'Dados de conexão não enviados',
    _ERROR_EMPTY_HOST: 'Campo host não enviado.',
    _ERROR_EMPTY_USER: 'Campo usuário não enviado.',
    _ERROR_EMPTY_PASS: 'Campo senha não enviado',
    _ERROR_EMPTY_PORT: 'Campo porta não enviado',
    _ERROR_EMPTY_SID: 'Campo sid não enviado',
    _ERROR_EMPTY_DB: 'Campo Banco de Dados vazio.',
    _ERROR_EMPTY_URI: 'Campo uri não enviado.',
    _ERROR_DYNAMIC_TOKEN: 'Erro ao gerar token da integração dinâmica.',
    _ERROR_GENERATE_SECRET: 'Erro ao gerar para usuário.',
    _ERROR_GENERIC_CREDENTIALS: 'Erro nas credenciais informadas. Verifique url ou secret.',
    _ERROR_NOT_FOUND_INT_CONFIG: 'Não é possível inicializar uma integração que ainda não foi configurada.',

    //postgres
    _SUCCESS_POSTGRES_CONNECTION: 'Conexão com Postgres estabelecida.',
    _ERROR_POSTGRES_CONNECTION: 'Erro ao tentar conexão com Postgres.',

    //mongodb
    _SUCCESS_API_CONNECTION: 'Banco de dados da aplicação conectado ✓',
    _SUCCESS_MONGO_CONNECTION: 'Conexão com MongoDB estabelecida.',
    _ERROR_QUERY_COLLECTION: 'Não foi possível consultar coleções',
    _ERROR_QUERY_FIELDS: 'Não foi possível consultar os campos da coleção',
    _ERROR_API_CONNECTION: 'Erro ao conectar com banco de dados.',
    _ERROR_MONGO_CONNECTION: 'Erro ao tentar conexão com MongoDB.',

    //oracle
    _ESTABLISHING_ORACLE_CONNECTION: 'Estabelecendo conexão com Oracle...',
    _SUCCESS_ORACLE_CONNECTION: 'Conexão com OracleDB estabelecida.',
    _ERROR_ORACLE_CONNECTION: 'Erro ao tentar conexão com OracleDB.',

    //database generic messages
    _SUCCESS_QUERY_EXECUTE: 'Sucesso ao executar a query.',
    _QUERY_EXECUTING: 'Executando query: ',
    _DATA_TRANSLATED: 'Dados traduzidos: ',
    _TRY_REESTANLISH_CONNECTION: 'Tentando reestabelecer conexão...',
    _ERROR_TABLE_NOT_FOUND: 'Não foram encontradas tabelas disponíveis.',
    _ERROR_TABLE_NFOUND_OWNER: 'Não foram encontradas tabelas disponíveis para esse owner.',
    _ERROR_ACCESS_DATABASE: 'Erro ao acessar banco de dados.',
    _ERROR_FILTER_TABLES: 'Erro ao filtrar tabelas.',
    _ERROR_ASSOCIATIONS_COLUMNS: 'Não foram encontradas colunas associadas às tabelas selecionadas.',
    _ERROR_REQUEST_MANAGER: 'Falha na conexão com o servidor.',
    _ERROR_SEND_MESSAGE: 'Serviço de envio de mensagem fora do ar.',
    _TRY_RESEND_REQUEST_MANAGER: 'Tetando enviar os dados da integração novamente.',

    //integrations
    _RUNNING_INTEGRATION: 'Executando integração...',
    _SUCCESS_INTEGRATION: 'Integração realizada com sucesso.',
    _ERROR_INTEGRATION: 'Erro ao realizar integração.',
    _SUCCESS_INTEGRATION_CONFIG: 'Configuração da integração realizada com sucesso.',
    _ERROR_INTEGRATION_CONFIG: 'Erro ao realizar configuração da integração.',
    _RETURN_INTEGRATION_: 'Retorno da integração.',
    _INTEGRATION_NOT_FOUND: 'Não há integrações registradas/ativas.',
    _SUCCESS_CREATE_TEMP_FILE: 'Arquivo temporário da integração criado.',
    _ERROR_CREATE_TEMP_FILE: 'Erro ao criar arquivo temporário da integração.',
    _SUCCESS_DELETE_TEMP_FILE: 'Arquivo temporário da integração deletado.',
    _ERROR_DELETE_TEMP_FILE: 'Erro ao deletar arquivo temporário da integração.',
    _UNRECOGNIZED_DYNAMIC_INTEGRATION: 'Url com dados da Integração não reconhecidos.',
}
