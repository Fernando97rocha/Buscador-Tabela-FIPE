const spanValor = document.querySelector('.span-valor')
const spanMarca = document.querySelector('.span-marca')
const spanModelo = document.querySelector('.span-modelo')
const spanAnoModelo = document.querySelector('.span-ano-modelo')


btnConsultar.addEventListener('click', (marca, valorModelo, valorAnos) => {
  const urlModeloAno = (codigoMarca) => 
    `https://parallelum.com.br/fipe/api/v1/carros/marcas/${codigoMarca}/modelos`
  
  const urlValores = (codigoMarca, codigoModelo, codigoAno) => 
    `https://parallelum.com.br/fipe/api/v1/carros/marcas/${codigoMarca}/modelos/${codigoModelo}/anos/${codigoAno}`
  
  const FuncMarca = async (url) => {
      try { 

        marca = await listaMarcas.value
        valorModelo = await listaModelos.value
        valorAnos = await listaAnos.value

        const response = await fetch(urlMarca(url))
        if(!response.ok) {
          throw new Error('Não foi possível obter os dados')
        }

        const carros = await response.json()
        console.log(marca)
        carros.filter(carro => {
          if (marca === carro.nome) {
            funcModelos = async () => {
              console.log(await carro)
              const codigoMarca = carro.codigo
              
              try {
                console.log(codigoMarca)
                const response = await fetch(urlModeloAno(codigoMarca))
                if (!response.ok) {
                  throw new Error('Não foi possível obter os dados da API')
                }
                
                const anosModelos = await response.json()
                console.log(anosModelos)
                
                anosModelos.modelos.filter((modelo) => {
                  if (valorModelo === modelo.nome) {
                    console.log(modelo.nome)
                    const codigoModelo = modelo.codigo

                    const funcAnos = () => {
                      anosModelos.anos.filter(ano => {
                        if (valorAnos === ano.nome) {
                          console.log(ano.nome)
                          const codigoAno = ano.codigo

                          const obtemValores = async () => {
                            console.log(codigoMarca, codigoModelo, codigoAno)
                            
                            try {
                              const response = await fetch(urlValores(codigoMarca, 
                                codigoModelo, 
                                codigoAno))
                              
                              if (!response.ok) {
                                throw new Error('Não foi possível obter os valores')
                              }

                              const objValores = await response.json()
                              console.log(objValores)
                              
                              spanMarca.innerText = `${objValores.Marca}`
                              spanModelo.innerText = `Modelo: ${objValores.Modelo}`
                              if (objValores.AnoModelo === 32000) {
                                spanAnoModelo.innerText = `0 km`
                              } else {
                                spanAnoModelo.innerText = `Ano: ${objValores.AnoModelo}`
                              }
                              spanValor.innerText = `${objValores.Valor}`

                            } catch (error) {
                              alert(error)
                            }
                          }
                          obtemValores()

                        }
                      })
                    }
                    funcAnos()

                  }
                })

              } catch (error) {
                alert(error)
              }
            }
            funcModelos()
            
          }
        })

      } catch (error) {
        alert(error)
      }
  }

  FuncMarca()

  
})