const btnConsultar = document.querySelector('#consultar')

const obtemValores = async (marca, modelos,anos) => {
  marca = await listaMarcas.value
  modelos = await listaModelos.value
  anos = await listaAnos.value
  console.log(marca, modelos, anos)
}


btnConsultar.addEventListener('click', (marca, modelos, anos) => {
  obtemValores(marca, modelos, anos)
  
  const FuncMarca = async (url) => {
      try { 

        const response = await fetch(urlMarca(url))
        if(!response.ok) {
          throw new Error('Não foi possível obter os dados')
        }

        console.log(await response.json())
      } catch (error) {
        alert(error)
      }
  }

  FuncMarca()

  
})