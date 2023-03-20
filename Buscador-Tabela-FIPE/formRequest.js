//arquivo responsável por preecher os campos dos inputs
const listaMarcas = document.querySelector('#marcas')
const listaModelos = document.querySelector('#modelos')
const listaAnos = document.querySelector('#anos')
const btnBuscar = document.querySelector('#buscar')
const btnConsultar = document.querySelector('#consultar')
const divResultado = document.querySelector('#resultadoBusca')
const ul = document.querySelector('ul')


const urlMarca = url => url = 'https://parallelum.com.br/fipe/api/v1/carros/marcas'

const urlModelo = codigoMarca =>
  `https://parallelum.com.br/fipe/api/v1/carros/marcas/${codigoMarca}/modelos`

const urlModeloAno = (codigoMarca, codigoModelo) =>
  `https://parallelum.com.br/fipe/api/v1/carros/marcas/${codigoMarca}/modelos/${codigoModelo}/anos`

const urlValorVeiculo = codigoAno => `https://parallelum.com.br/fipe/api/v1/carros/marcas/${urlModelo()}/modelos/${urlAno()}/anos/${codigoAno}`

const obtemMarca = async (url) => {

  const stringInicialMarcas = '- Selecione uma marca -'
  try {
    const response = await fetch(urlMarca(url))
    if (!response.ok) {
      throw new Error('Erro Request Marca')
    }
    const carros = await response.json()
    const mostraMarcasNoInput = async () => {

      listaMarcas.innerHTML += `<option value="default-marca">${stringInicialMarcas}</option>`
      carros.forEach(async carro => {
        listaMarcas.innerHTML += `<option value="${carro.nome}">${carro.nome}</option>`
      })
    }
    mostraMarcasNoInput()
 
    if (listaMarcas.value) {
      btnBuscar.addEventListener('click', event => {
        if (listaMarcas.value === 'default-marca') {
        } else {
          listaModelos.setAttribute('class', 'mostra')
          listaAnos.setAttribute('class', 'mostra')
          btnConsultar.setAttribute('class', 'mostra')
        }
        
        if (event.target === btnBuscar) {
          
          divResultado.setAttribute('class', 'ocultado')
          ul.setAttribute('class', 'ocultado')
          
          console.log(event.target)
        }

        if (listaModelos.value && listaAnos.value) {
          listaModelos.innerHTML = ''
          listaAnos.innerHTML = ''
          //if que reseta os campos caso o usuário queira trocar a marca do carro
        }

        carros.filter(async carro => {
          //filter para capturar somente o valor escolhido pelo usuário
          if (listaMarcas.value === carro.nome) {

            const codigoMarca = carro.codigo

            const obtemModelo = async () => {

              try {
                const response = await fetch(urlModelo(codigoMarca))

                if (!response.ok) {
                  throw new Error('Não foi possível obter os dados')
                }

                const anoModelo = await response.json()
                const mostraModelos = () => {
                  //função que disponibiliza as opções dos modelos de cada marca
                  listaModelos.innerHTML += `<option value="default-modelo">- Selecione um modelo -</option>`
                  anoModelo.modelos.forEach((modelo) => {
                    listaModelos.innerHTML += `<option value="${modelo.nome}">${modelo.nome}</option>`
                  })
                }
                mostraModelos()

                const mostraAnos = () => {
                  //função que disponibiliza as opções dos modelos de cada marca
                  listaAnos.innerHTML += `<option value="default-ano">- Selecione um ano -</option>`
                  anoModelo.anos.forEach(ano => {
                    listaAnos.innerHTML += `<option value="${ano.nome}">${ano.nome}</option>`
                  })
                }
                mostraAnos()

              } catch (error) {
                alert(error)
              }
            }
            obtemModelo()

          }
        })
      })
    }

  } catch (error) {
    alert(error)
  }

}
obtemMarca()



//vou criar uma função que faz um novo request de acordo com o valor do input