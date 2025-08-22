const button = document.querySelector('.button-task')
const input =document.querySelector('.input-task')
const Lista = document.querySelector('.list-task')

let ListaItem = []

function AddTarefa() {
    if (input.value.trim() === ''){
        return

    }

    ListaItem.push({
        tarefa: input.value.trim(),
        concluida: false
    })
    
    input.value = ''
    mostrarTarefas()

}

function mostrarTarefas() {
    let novali = ''

    ListaItem.forEach((task, position)=> {
        novali = novali + `
         <li class="task ${task.concluida && "done"}">
                    <img src="./img/check.png" alt="check-na-tarefa" onclick="concluir(${position})">
                    <p>${task.tarefa}</p>
                    <img src="./img/lixo.png" alt="tarefa-para-o-lixo" onclick="deleta(${position})">
                </li>`
    }
    )

Lista.innerHTML = novali   

localStorage.setItem('lista', JSON.stringify(ListaItem))
}

function concluir(position){
    ListaItem[position].concluida = !ListaItem[position].concluida
    mostrarTarefas()

}

function deleta(position){
    ListaItem.splice(position,1)
    console.log("deletar")

    mostrarTarefas()

}

function recarregar(){
    const tarefaslocal = localStorage.getItem('lista')
    
    if(tarefaslocal){
    ListaItem = JSON.parse(tarefaslocal)
    }

    mostrarTarefas()
}

recarregar()
button.addEventListener('click', AddTarefa)

input.addEventListener('keypress', function(event) {
    if(event.key === 'Enter'){
        AddTarefa();
    }
});

function salvarNota() {
    const texto = document.getElementById('anotacoes').value
    localStorage.setItem('blocoNotas', texto)
}

function limparNota() {
    document.getElementById('anotacoes').value = ''
    localStorage.removeItem('blocoNotas')
}

function carregarNota() {
    const textoSalvo = localStorage.getItem('blocoNotas')
    if (textoSalvo) {
        document.getElementById('anotacoes').value = textoSalvo
    }
}

carregarNota()

function salvarNota() {
    const campo = document.getElementById('anotacao');
    const texto = campo.value.trim();

    if (texto === '') return;

    let notas = JSON.parse(localStorage.getItem('notas')) || [];
    notas.push(texto);
    localStorage.setItem('notas', JSON.stringify(notas));
    campo.value = '';
    mostrarNotas();
}

function deletarNota(index) {
    let notas = JSON.parse(localStorage.getItem('notas')) || [];
    notas.splice(index, 1);
    localStorage.setItem('notas', JSON.stringify(notas));
    mostrarNotas();
}

function mostrarNotas() {
    const lista = document.getElementById('notasSalvas');
    let notas = JSON.parse(localStorage.getItem('notas')) || [];

    if (notas.length === 0) {
        lista.innerHTML = `<li>Não há nada aqui</li>`;
        return;
    }

    lista.innerHTML = notas
        .map((nota, i) => `<li>${nota} <button onclick="deletarNota(${i})">x</button></li>`)
        .join('');
}

const campoAnotacao = document.getElementById('anotacao');

campoAnotacao.addEventListener('keydown', function(event) {
  if (event.key === 'Enter' && !event.shiftKey) {
    event.preventDefault(); 
    salvarNota();           
  }
});

mostrarNotas();

const header = document.querySelector('header');
const links = header.querySelectorAll('nav ul li');

links.forEach(link => {
  const linkText = link.textContent.toLowerCase();

  if (linkText === 'modo escuro') return;

  const anchor = link.querySelector('a');

  if (anchor) {
    anchor.addEventListener('click', e => {
      e.preventDefault();

      let section;

      if (linkText === 'contato') {
        section = document.querySelector('footer.contato');
      } else if (linkText === 'notas') {
        section = document.querySelector('.bloco-notas');
      } else if (linkText === 'to-do list') {
        section = document.querySelector('.section-todo');
      }

      if (section) {
        const offset = 300;
        const sectionTop = section.getBoundingClientRect().top + window.pageYOffset - offset;

        window.scrollTo({
          top: sectionTop,
          behavior: 'smooth'
        });
      }
    });
  }
});

const modoEscuroLi = document.querySelector('header nav ul li:last-child');

modoEscuroLi.style.cursor = 'pointer';

modoEscuroLi.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
});