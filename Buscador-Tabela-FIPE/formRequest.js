//arquivo responsável por preecher os campos dos inputs
let listaMarcas = document.querySelector('#marcas')
const listaModelos = document.querySelector('#modelos')
const listaAno = document.querySelector('#anos')

const inputBuscar = document.querySelector('#buscar')
const inputModelo = document.querySelector('#modelo')
const inputAno = document.querySelector('#ano')


const urlMarca = 'https://parallelum.com.br/fipe/api/v1/carros/marcas'

const urlModelo = codigoModelosMarca => 
  `https://parallelum.com.br/fipe/api/v1/carros/marcas/${codigoModelosMarca}/modelos`

const urlAno = anosModelo => 
  `https://parallelum.com.br/fipe/api/v1/carros/marcas/${urlModelo()}/modelos/${anosModelo}/anos`
  
const obtemMarca = async (url, callback) => {
    
  try{
    const response = await fetch(urlMarca)
    if (!response.ok) {
      throw new Error('Erro Request Marca')
    }
    const carros = await response.json()
    const mostraMarcasNoInput = async() => {
      carros.forEach(async carro => { 
        listaMarcas.innerHTML += `<option value="${carro.nome}">${carro.nome}</option>`
      })
    }
    mostraMarcasNoInput()

    if(listaMarcas.value) {
      
      inputBuscar.addEventListener('click', () => {

        if (listaModelos.value || listaAno.value) {
          listaModelos.innerHTML = ''
          listaAno.innerHTML = ''
          //if que reseta os campos caso o usuário queira trocar a marca do carro
        }
        
        carros.filter(async carro => {
          //filter para capturar somente o valor escolhido pelo usuário
          if(listaMarcas.value === carro.nome) {
            
            const codigoModelosMarca = carro.codigo
              
            const obtemModelo = async () => {
              
              try { 
                const response = await fetch(urlModelo(codigoModelosMarca))

                if(!response.ok) {
                  throw new Error('Não foi possível obter os dados')
                }

                const anoModelo = await response.json()
                const mostraModelos = () => {
                  //função que disponibiliza as opções dos modelos de cada marca
                  anoModelo.modelos.forEach((modelo) => {
                  listaModelos.innerHTML += `<option value="${modelo.nome}">${modelo.nome}</option>`
                  })
                }
                mostraModelos()
  
                const mostraAnos = () => {
                  //função que disponibiliza as opções dos modelos de cada marca
                  anoModelo.anos.forEach(ano => {
                    listaAno.innerHTML += `<option value="${ano.nome}">${ano.nome}</option>`
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

  }catch (error) {
    alert(error)
  }
    
}
obtemMarca()

//vou criar uma função que faz um novo request de acordo com o valor do input