import React, {useState, useEffect} from 'react'
import axios from 'axios'


const Category =({categories})=>{

    const [input, setInput] = useState({
        id: null,
        name: "",
        description: "",
    });

    const [catSearch,setCatSearch] = useState({
        id: null
    })

  const handleSearch = async(e) => {
    const {data} = await axios.get(`http://localhost:3001/category/${e.target.value}`);
    setCatSearch(data) 
  }


    const handleInputChange = function(e) {
        setInput({
          ...input,
          [e.target.name]: e.target.value
        });
      }

      const handleSubmit = (e) => {
        e.preventDefault();
      }


      const handleUpdate = async() => {
        const urlApi = `http://localhost:3001/category/${catSearch.id}`;
        const dataPost = {
          name: input.category,
          description: input.description
        };
        console.log(dataPost);
        const {data} = await axios.put(urlApi , dataPost);

        if (!data) {
          console.log('Se rompio')
        };
      }

     const handleCreate= async()=>{
        const urlApi = 'http://localhost:3001/category/create';
        const dataPost = {
          name: input.name,
          description: input.description
        };

        const {data} = await axios.post(urlApi , dataPost);
        alert('Agregado correctamente')

        if (!data) {
          console.log('Se rompio')
        };
     }

     const handleDelete = async  (e) => {
        setInput(e.target.value);
        await axios.delete (`http://localhost:3001/category/${catSearch.id}`);
        alert('Se ha eliminado correctamente')
      }
      

     return(
        <div>

        <div>
          {categories && categories.map(function(c){
            return <a onClick={(e) => handleSearch(e)} value={c.id}>{c.name}</a>
          })}
        </div>


        <form onSubmit = {(e) => handleSubmit(e)} className='Form' >
            <div >

            <div>
                <label>Categoria:</label><br/>
                <input type = "text" autoComplete = "off" name = "name" onChange={(e) =>handleInputChange(e)} value = {input["name"]} />
            </div>
            <div>
                <label>Descripción:</label><br/>
                <input type = "text" autoComplete = "off" name = "description" onChange={(e) =>handleInputChange(e)} value = {input["description"]} />
            </div>
            <button type = "submit" className='buttonAdd' onClick={()=>handleCreate()} >Agregar categoria</button>
            <button type = "submit" className='buttonAdd' onClick={()=> handleUpdate()} >Modificar Categoria</button>
            <button type = "submit" className='buttonAdd' onClick={(e)=> handleDelete(e)} >Eliminar Categoria</button>
            
            </div>
    
        </form>
        </div>
    )
}

export default Category