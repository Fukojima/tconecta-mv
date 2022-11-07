function cpfIsValid(strCPF) {
    cpfWithoutSpecialCharacters = strCPF.replace(/[.-]/g, '')

    let sum
    let module
    sum = 0
    if (cpfWithoutSpecialCharacters === '00000000000') return false
    if (cpfWithoutSpecialCharacters === '11111111111') return false
    if (cpfWithoutSpecialCharacters === '22222222222') return false
    if (cpfWithoutSpecialCharacters === '33333333333') return false
    if (cpfWithoutSpecialCharacters === '44444444444') return false
    if (cpfWithoutSpecialCharacters === '55555555555') return false
    if (cpfWithoutSpecialCharacters === '66666666666') return false
    if (cpfWithoutSpecialCharacters === '77777777777') return false
    if (cpfWithoutSpecialCharacters === '88888888888') return false
    if (cpfWithoutSpecialCharacters === '99999999999') return false

    for (let i = 1; i <= 9; i++) sum = sum + parseInt(cpfWithoutSpecialCharacters.substring(i - 1, i)) * (11 - i)
    module = (sum * 10) % 11

    if (module === 10 || module === 11) module = 0
    if (module !== parseInt(cpfWithoutSpecialCharacters.substring(9, 10))) return false

    sum = 0
    for (let i = 1; i <= 10; i++) sum = sum + parseInt(cpfWithoutSpecialCharacters.substring(i - 1, i)) * (12 - i)
    module = (sum * 10) % 11

    if (module === 10 || module === 11) module = 0
    if (module !== parseInt(cpfWithoutSpecialCharacters.substring(10, 11))) return false

    return true
}

function FormataCnpj(campo, teclapres) {
    const tecla = teclapres.keyCode
    const vr = new String(campo.value)
    vr = vr.replace('.', '')
    vr = vr.replace('/', '')
    vr = vr.replace('-', '')
    tam = vr.length + 1
    if (tecla != 14) {
        if (tam == 3) campo.value = vr.substr(0, 2) + '.'
        if (tam == 6) campo.value = vr.substr(0, 2) + '.' + vr.substr(2, 5) + '.'
        if (tam == 10) campo.value = vr.substr(0, 2) + '.' + vr.substr(2, 3) + '.' + vr.substr(6, 3) + '/'
        if (tam == 15)
            campo.value =
                vr.substr(0, 2) +
                '.' +
                vr.substr(2, 3) +
                '.' +
                vr.substr(6, 3) +
                '/' +
                vr.substr(9, 4) +
                '-' +
                vr.substr(13, 2)
    }
}

function validateCNPJ(cnpj) {
    cnpj = cnpj.replace(/[^\d]+/g, '')

    if (cnpj == '') return false

    if (cnpj.length != 14) return false

    if (
        cnpj == '00000000000000' ||
        cnpj == '11111111111111' ||
        cnpj == '22222222222222' ||
        cnpj == '33333333333333' ||
        cnpj == '44444444444444' ||
        cnpj == '55555555555555' ||
        cnpj == '66666666666666' ||
        cnpj == '77777777777777' ||
        cnpj == '88888888888888' ||
        cnpj == '99999999999999'
    )
        return false

    size = cnpj.length - 2
    numbers = cnpj.substring(0, size)
    digits = cnpj.substring(size)
    sum = 0
    pos = size - 7
    for (i = size; i >= 1; i--) {
        sum += numbers.charAt(size - i) * pos--
        if (pos < 2) pos = 9
    }
    result = sum % 11 < 2 ? 0 : 11 - (sum % 11)
    if (result != digits.charAt(0)) return false

    size = size + 1
    numbers = cnpj.substring(0, size)
    sum = 0
    pos = size - 7
    for (i = size; i >= 1; i--) {
        sum += numbers.charAt(size - i) * pos--
        if (pos < 2) pos = 9
    }
    result = sum % 11 < 2 ? 0 : 11 - (sum % 11)
    if (result != digits.charAt(1)) return false

    return true
}

module.exports = {cpfIsValid, FormataCnpj, validateCNPJ}
