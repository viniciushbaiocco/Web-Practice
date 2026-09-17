const formulario = document.querySelector("#form-reserva");
const campoNome = document.querySelector("#nome");
const campoEmail = document.querySelector("#email");
const campoTelefone = document.querySelector("#telefone");
const campoNascimento = document.querySelector("#nascimento");
const campoCheckin = document.querySelector("#checkin");
const campoCheckout = document.querySelector("#checkout");
const campoHospedes = document.querySelector("#hospedes");
const campoQuarto = document.querySelector("#quarto");
const campoSenha = document.querySelector("#senha");
const campoConfirmaSenha = document.querySelector("#confirma-senha");
const campoAceite = document.querySelector("#aceite");
const rotuloAceite = document.querySelector("#rotulo-aceite");
const erroNome = document.querySelector("#erro-nome");
const erroEmail = document.querySelector("#erro-email");
const erroTelefone = document.querySelector("#erro-telefone");
const erroNascimento = document.querySelector("#erro-nascimento");
const erroCheckin = document.querySelector("#erro-checkin");
const erroCheckout = document.querySelector("#erro-checkout");
const erroHospedes = document.querySelector("#erro-hospedes");
const erroQuarto = document.querySelector("#erro-quarto");
const erroSenha = document.querySelector("#erro-senha");
const erroConfirmaSenha = document.querySelector("#erro-confirma-senha");
const erroAceite = document.querySelector("#erro-aceite");
const resultado = document.querySelector("#resultado");
const textoDiarias = document.querySelector("#texto-diarias");
const dadosReserva = document.querySelector("#dados-reserva");
function mostrarErro(campo, elementoErro, mensagem) {
    campo.classList.add("campo-invalido");
    elementoErro.innerText = mensagem;
}
function limparErros() {
    campoNome.classList.remove("campo-invalido");
    campoEmail.classList.remove("campo-invalido");
    campoTelefone.classList.remove("campo-invalido");
    campoNascimento.classList.remove("campo-invalido");
    campoCheckin.classList.remove("campo-invalido");
    campoCheckout.classList.remove("campo-invalido");
    campoHospedes.classList.remove("campo-invalido");
    campoQuarto.classList.remove("campo-invalido");
    campoSenha.classList.remove("campo-invalido");
    campoConfirmaSenha.classList.remove("campo-invalido");
    rotuloAceite.classList.remove("campo-invalido");
    erroNome.innerText = "";
    erroEmail.innerText = "";
    erroTelefone.innerText = "";
    erroNascimento.innerText = "";
    erroCheckin.innerText = "";
    erroCheckout.innerText = "";
    erroHospedes.innerText = "";
    erroQuarto.innerText = "";
    erroSenha.innerText = "";
    erroConfirmaSenha.innerText = "";
    erroAceite.innerText = "";
}
formulario.addEventListener("submit",function(event){
    event.preventDefault();
    limparErros();
    resultado.classList.add("escondido");
    let formularioValido = true;
    const nome = campoNome.value;
    const possuiDuasPalavras = /[a-zA-ZÀ-ú] [a-zA-ZÀ-ú]/.test(nome);
    if (campoNome.validity.valueMissing) {
        mostrarErro(campoNome, erroNome, "Informe o nome completo.");
        formularioValido = false;
    }
    else if (campoNome.validity.tooShort) {
        mostrarErro(campoNome, erroNome, "O nome deve ter pelo menos 5 caracteres.");
        formularioValido = false;
    }
    else if (!possuiDuasPalavras) {
        mostrarErro(campoNome, erroNome, "Digite o nome e o sobrenome.");
        formularioValido = false;
    }
    if (campoEmail.validity.valueMissing) {
        mostrarErro(campoEmail, erroEmail, "Informe o seu e-mail.");
        formularioValido = false;
    }
    else if (campoEmail.validity.typeMismatch) {
        mostrarErro(campoEmail, erroEmail, "Digite um e-mail válido, como maria@gmail.com.");
        formularioValido = false;
    }
    const telefoneValido = /^[0-9]{11}$/.test(campoTelefone.value);
    if (campoTelefone.validity.valueMissing) {
        mostrarErro(campoTelefone, erroTelefone, "Informe o telefone.");
        formularioValido = false;
    }
    else if (!telefoneValido) {
        mostrarErro(campoTelefone, erroTelefone, "O telefone deve possuir exatamente 11 números.");
        formularioValido = false;
    }
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);
    const nascimento = new Date(campoNascimento.value + "T00:00");
    const checkin = new Date(campoCheckin.value + "T00:00");
    const checkout = new Date(campoCheckout.value + "T00:00");
    let idade = hoje.getFullYear() - nascimento.getFullYear();
    const mesAtual = hoje.getMonth();
    const mesNascimento = nascimento.getMonth();
    if (mesAtual < mesNascimento || (mesAtual === mesNascimento && hoje.getDate() < nascimento.getDate())) {
        idade = idade - 1;
    }
    if (campoNascimento.validity.valueMissing) {
        mostrarErro(campoNascimento, erroNascimento, "Informe a data de nascimento.");
        formularioValido = false;
    }
    else if (idade < 18) {
        mostrarErro(campoNascimento, erroNascimento, "O responsável pela reserva deve ter 18 anos ou mais.");
        formularioValido = false;
    }
    if (campoCheckin.validity.valueMissing) {
        mostrarErro(campoCheckin, erroCheckin, "Informe a data de check-in.");
        formularioValido = false;
    }
    else if (checkin < hoje) {
        mostrarErro(campoCheckin, erroCheckin, "O check-in não pode ser antes da data de hoje.");
        formularioValido = false;
    }
    if (campoCheckout.validity.valueMissing) {
        mostrarErro(campoCheckout, erroCheckout, "Informe a data de check-out.");
        formularioValido = false;
    }
    else if (checkout <= checkin) {
        mostrarErro(campoCheckout, erroCheckout, "O check-out deve ser depois do check-in.");
        formularioValido = false;
    }
    const hospedes = Number(campoHospedes.value);
    if (campoHospedes.validity.valueMissing) {
        mostrarErro(campoHospedes, erroHospedes, "Informe a quantidade de hóspedes.");
        formularioValido = false;
    }
    else if (!campoHospedes.validity.valid) {
        mostrarErro(campoHospedes, erroHospedes, "A quantidade de hóspedes deve ser um número inteiro de 1 a 5.");
        formularioValido = false;
    }
    const quarto = campoQuarto.value;
    let capacidade = 5;
    if (quarto === "Individual") {
        capacidade = 1;
    }
    else if (quarto === "Duplo") {
        capacidade = 2;
    }
    if (campoQuarto.validity.valueMissing) {
        mostrarErro(campoQuarto, erroQuarto, "Selecione o tipo de quarto.");
        formularioValido = false;
    }
    else if (campoHospedes.validity.valid && hospedes > capacidade) {
        mostrarErro(campoQuarto, erroQuarto, "O quarto " + quarto + " não comporta " + hospedes + " hóspedes (máximo: " + capacidade + ").");
        formularioValido = false;
    }
    const senha = campoSenha.value;
    const possuiMaiuscula = /[A-Z]/.test(senha);
    const possuiNumero = /[0-9]/.test(senha);
    let faltaNaSenha = "";
    if (campoSenha.validity.tooShort) {
        faltaNaSenha += "\n• pelo menos 8 caracteres";
    }
    if (!possuiMaiuscula) {
        faltaNaSenha += "\n• uma letra maiúscula";
    }
    if (!possuiNumero) {
        faltaNaSenha += "\n• um número";
    }
    if (campoSenha.validity.valueMissing) {
        mostrarErro(campoSenha, erroSenha, "Informe uma senha.");
        formularioValido = false;
    }
    else if (faltaNaSenha !== "") {
        mostrarErro(campoSenha, erroSenha, "A senha precisa ter:" + faltaNaSenha);
        formularioValido = false;
    }
    if (campoConfirmaSenha.validity.valueMissing) {
        mostrarErro(campoConfirmaSenha, erroConfirmaSenha, "Confirme a senha.");
        formularioValido = false;
    }
    else if (campoConfirmaSenha.value !== senha) {
        mostrarErro(campoConfirmaSenha, erroConfirmaSenha, "As senhas não são iguais.");
        formularioValido = false;
    }
    if (campoAceite.validity.valueMissing) {
        mostrarErro(rotuloAceite, erroAceite, "É preciso aceitar as condições da reserva.");
        formularioValido = false;
    }
    if (formularioValido) {
        const umDia = 1000 * 60 * 60 * 24;
        const diarias = (checkout - checkin) / umDia;
        if (diarias === 1) {
            textoDiarias.innerText = "Total: 1 diária";
        }
        else {
            textoDiarias.innerText = "Total: " + diarias + " diárias";
        }
        const reserva = {
            nome: nome,
            email: campoEmail.value,
            telefone: campoTelefone.value,
            checkin: campoCheckin.value,
            checkout: campoCheckout.value,
            diarias: diarias,
            hospedes: hospedes,
            quarto: quarto
        };
        dadosReserva.innerText = JSON.stringify(reserva, null, 2);
        resultado.classList.remove("escondido");
    }
});
