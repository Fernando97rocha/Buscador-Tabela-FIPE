btnConsultar.addEventListener('click', (event, marca, valorModelo, valorAnos) => {

  if (listaModelos.value !== 'default-modelo' && listaAnos.value !== 'default-ano') {
    divResultado.setAttribute('class', 'mostra')
    ul.setAttribute('class', 'mostra')
    if (event.target === btnConsultar) {
      spanMarca.innerText = ''
      spanModelo.innerText = ''
      spanAnoModelo.innerText = ''
      spanValor.innerText = 'Buscando...'
    }
  }

  const urlModeloAno = (codigoMarca) =>
    `https://parallelum.com.br/fipe/api/v1/carros/marcas/${codigoMarca}/modelos`

  const urlValores = (codigoMarca, codigoModelo, codigoAno) =>
    `https://parallelum.com.br/fipe/api/v1/carros/marcas/${codigoMarca}/modelos/${codigoModelo}/anos/${codigoAno}`

  const FuncMarca = async (url) => {
    marca = listaMarcas.value
    valorModelo = listaModelos.value
    valorAnos = listaAnos.value
    try {

      const response = await fetch(urlMarca(url))
      if (!response.ok) {
        throw new Error('Não foi possível obter os dados')
      }

      const carros = await response.json()
      carros.filter(carro => {
        if (marca === carro.nome) {
          funcModelos = async () => {
            const codigoMarca = carro.codigo

            try {
              const response = await fetch(urlModeloAno(codigoMarca))
              if (!response.ok) {
                throw new Error('Não foi possível obter os dados da API')
              }

              const anosModelos = await response.json()

              anosModelos.modelos.filter((modelo) => {
                if (valorModelo === modelo.nome) {
                  const codigoModelo = modelo.codigo

                  const funcAnos = () => {
                    anosModelos.anos.filter(ano => {
                      if (valorAnos === ano.nome) {
                        const codigoAno = ano.codigo

                        const obtemValores = async () => {

                          try {
                            const response = await fetch(urlValores(codigoMarca,
                              codigoModelo,
                              codigoAno))

                            if (!response.ok) {
                              throw new Error('Não foi possível obter os valores')
                            }

                            const objValores = await response.json()

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