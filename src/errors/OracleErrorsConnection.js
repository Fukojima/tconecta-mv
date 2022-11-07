const oracleErrorsConnection = function (error) {
    if (error.message.includes('DIA-24302')) {
        return {success: false, error: 'Conexão do host em uso por outra thread.'}
    }
    if (error.message.includes('EXP-00105')) {
        return {success: false, error: `Parâmetro 'string' não é compatível com este usuário.`}
    }
    if (error.message.includes('ORA-01012')) {
        return {success: false, error: 'Não conectado.'}
    }
    if (error.message.includes('ORA-01017')) {
        return {success: false, error: 'Usuário/Senha incorreto.'}
    }
    if (error.message.includes('ORA-03113')) {
        return {success: false, error: 'Problemas de conexão de rede. Verifique a conexão.'}
    }
    if (error.message.includes('ORA-12154')) {
        return {success: false, error: 'Não há conexões para o host informado.'}
    }
    if (error.message.includes('ORA-12170')) {
        return {success: false, error: 'TNS: Tempo limite excedido.'}
    }
    if (error.message.includes('ORA-12505')) {
        return {success: false, error: 'TNS: o listener não recebeu o SERVICE_NAME em CONNECT_DATA.'}
    }
    if (error.message.includes('ORA-12514')) {
        return {success: false, error: 'Não há conexões para o SID informado.'}
    }
    if (error.message.includes('ORA-12541')) {
        return {success: false, error: 'Não há conexões para porta informada.'}
    }
    if (error.message.includes('ORA-12545')) {
        return {success: false, error: 'Não foi possível conectar porque o host ou o objeto não existe.'}
    }
    if (error.message.includes('ORA-12560')) {
        return {success: false, error: 'TNS: erro no adaptador de protocolo.'}
    }
    if (error.message.includes('TNS-00517')) {
        return {success: false, error: 'Perdeu contato.'}
    }
    if (error.message.includes('TNS-01061')) {
        return {success: false, error: 'A senha não foi inserida.'}
    }
    if (error.message.includes('TNS-12227')) {
        return {success: false, error: 'TNS: Erro na sintaxe.'}
    }
    if (error.message.includes('TNS-12687')) {
        return {success: false, error: 'Credenciais expiradas.'}
    }
}

module.exports = oracleErrorsConnection
