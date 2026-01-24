document.getElementById("btn-cadastro").addEventListener('click', () => {
    const container = document.getElementById('container')
    const inputs = container.querySelectorAll('input')
    inputs.forEach(element => {
        if (element.value && element.value.trim() !== " ") {
            document.getElementById("cadastro").innerText = "Cadastro realizado!"
        }
    })
})

