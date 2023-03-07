

const fetchMarcas = async marca => {  
  try{ 
    const response = await fetch(`https://parallelum.com.br/fipe/api/v1/carros/marcas`)

    if(!response.ok) {
      throw new Error('Não foi possível obter os dados')
    }

  } catch (error) {
    alert(error)
  }
}
