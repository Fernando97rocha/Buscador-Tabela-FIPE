
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

  const yearModelUrl = (brandCode) =>
    `https://parallelum.com.br/fipe/api/v1/carros/marcas/${brandCode}/modelos`

  const pricesUrl = (brandCode, modelCode, yearCode) =>
    `https://parallelum.com.br/fipe/api/v1/carros/marcas/${brandCode}/modelos/${modelCode}/anos/${yearCode}`

  const getBrand = async (url) => {
    marca = listaMarcas.value
    valorModelo = listaModelos.value
    valorAnos = listaAnos.value
    try {

      const response = await fetch(urlMarca(url))
      if (!response.ok) {
        throw new Error('Não foi possível obter os dados')
      }

      const carros = await response.json()
      carros.filter(car => {
        if (marca === car.nome) {

          getCarModels(car)

        }
      })

    } catch (error) {
      alert(error)
    }
  }
  getBrand()


  getCarModels = async (carsObj) => {
    const brandCode = carsObj.codigo
    try {
      const response = await fetch(yearModelUrl(brandCode))
      if (!response.ok) {
        throw new Error('Não foi possível obter os dados da API')
      }

      const yearModels = await response.json()

      yearModels.modelos.filter((model) => {
        if (valorModelo === model.nome) {
          const modelCode = model.codigo

          getYear(yearModels, brandCode, modelCode)

        }
      })

    } catch (error) {
      alert(error)
      console.log(error)
    }
  }

  const getYear = (yearModels, brandCode, modelCode) => {
    yearModels.anos.filter(ano => {
      if (valorAnos === ano.nome) {
        const yearCode = ano.codigo

        getPrices(brandCode, modelCode, yearCode)

      }
    })
  }


  const getPrices = async (brandCode, modelCode, yearCode) => {
    try {
      const response = await fetch(pricesUrl(brandCode,
        modelCode,
        yearCode))

      if (!response.ok) {
        throw new Error('Não foi possível obter os valores')
      }

      const pricesObj = await response.json()

      spanMarca.innerText = `${pricesObj.Marca}`
      spanModelo.innerText = `Modelo: ${pricesObj.Modelo}`
      if (pricesObj.AnoModelo === 32000) {
        spanAnoModelo.innerText = `0 km`
      } else {
        spanAnoModelo.innerText = `Ano: ${pricesObj.AnoModelo}`
      }
      spanValor.innerText = `${pricesObj.Valor}`

    } catch (error) {
      alert(error)
    }
  }

})

