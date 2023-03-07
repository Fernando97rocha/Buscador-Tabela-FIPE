//arquivo responsável por preecher os campos dos inputs
const listaMarcas = document.querySelector('#marcas')
const listaModelos = document.querySelector('#modelos')
const listAno = document.querySelector('#ano')

const inputMarca = document.querySelector('#marca').value
const inputModelo = document.querySelector('#modelo').value
const inputAno = document.querySelector('#ano').value



const formRequest = async () => {
  let marca = {}
  let codigoModelosMarca = 25
  let anosModelo = 0
  const urlMarca = 'https://parallelum.com.br/fipe/api/v1/carros/marcas'
  const urlModelo = `https://parallelum.com.br/fipe/api/v1/carros/marcas/${codigoModelosMarca}/modelos`
  const urlAno = `https://parallelum.com.br/fipe/api/v1/carros/marcas/${codigoModelosMarca}/modelos/${anosModelo}/anos`
  const arrayCodigos = []
  
  const obtemMarca = async (url) => {
    
    try{
      const response = await fetch(urlMarca)
      if (!response.ok) {
        throw new Error('Erro Request Marca')
      }
      const carros = await response.json()
      const mostraMarcasNoInput = async() => {
        carros.forEach(async carro => { 
          listaMarcas.innerHTML += `<option value="${carro.nome}"/>`
          arrayCodigos.push(carro.codigo)
        })
      }
      mostraMarcasNoInput()
      console.log(arrayCodigos)

      
      
      carros.forEach(async carro => {
        if(carro.nome === inputMarca){
          marca = carro
          console.log(marca)
          codigoModelosMarca = marca.codigo
          console.log(codigoModelosMarca)
        }
      })

    }catch (error) {
      alert(error)
    }

  }
  obtemMarca()


  const obtemModelo = async (url) => {
    console.log(codigoModelosMarca)
    try{
      const response = await fetch(urlModelo)
      if (!response.ok) {
        throw new Error('Erro Request Marca')
      }
      const modelos = await response.json()
      const mostraMarcasNoInput = async() => {
      modelos.forEach(async modelo => { 
        listaModelos.innerHTML += `<option value="${modelo.nome}"/>`
      })
      }
      mostraMarcasNoInput()
      console.log(modelos)
        
    }catch (error) {
      alert(error)
    }
    
      
  }
  obtemModelo()

}


formRequest()
