import './ItemDoEstoqueReceitaNew.css';
import { useFetchInventoryItems } from "../hooks/useFetchInventoryItems";
import { useFetchUnits } from "../hooks/useFetchUnits";
import { useState } from "react";

import { useNavigate } from "react-router-dom";

const ItemDoEstoqueReceitaEdit = () => {

    const navigate = useNavigate();

    const { inventoryItemsAdd } = useFetchInventoryItems();
    const { data: units, 
            error: errorUnits, 
            unitsGetAll } = useFetchUnits();    
    if (units === null) {unitsGetAll()};
    
    const [nome, setNome] = useState('');
    const [marca, setMarca] = useState('');
    const [conteudo, setConteudo] = useState(0);
    const [unidadeId, setUnidadeId] = useState(0);
    const [type, setType] = useState(0);
                
    const handleSubmit = async (e) => {
        e.preventDefault();
        var data = {
            name : nome,
            brand : marca,
            content : conteudo,
            unityId : unidadeId,
            type: type
        }
        //console.log(data)
        await inventoryItemsAdd(data);
        navigate("/itensdoestoquereceita");
    }

    const handleResetTextValidation = async (e) => {
        if (e.target.value !== '')
        {
            e.target.setCustomValidity("");
            e.target.reportValidity();
        }
    }

    return(
        <div>
            <h1>Item do estoque receita</h1>
            {errorUnits && 
                <p>{errorUnits}</p>
            } 
            <form onSubmit={handleSubmit}>
            
                <label htmlFor="nome">Nome</label>
                <br/>
                <input type="text"
                        name="nome"
                        placeholder="Nome"
                        value={nome}  
                        onChange={(e) => {
                                    setNome(e.target.value); 
                                    handleResetTextValidation(e);
                                }
                        }
                        maxLength={20}         
                        required  
                        onInvalid={(e) => e.target.setCustomValidity("Este campo precisa ser preenchido!")}        
                />
                <br/>

                <br/>
                <label htmlFor="marca">Marca</label>
                <br/>
                <input type="text"
                    placeholder="Marca"
                    value={marca}  
                    onChange={(e) => setMarca(e.target.value)} 
                />
                <br/>

                <br/>
                <label htmlFor="conteudo">Conteúdo</label>
                <br/>
                <input type="number"
                    placeholder="Conteúdo"
                    value={conteudo}  
                    onChange={(e) => setConteudo(e.target.value)} 
                    min={1}
                    max={1000}
                />
                <br/>

                <br/>
                <label htmlFor="unidade">Unidade</label>
                <br/>
                {units && 
                    <select value={unidadeId}  
                            onChange={(e) => setUnidadeId(e.target.value)}                
                    >
                        {units.map((unit) => (
                            <option key={unit.id} value={unit.id}>
                                {unit.name}
                            </option>                   
                        ))}
                    </select>
                }
                <br/>

                <br/>
                <label htmlFor="type">Tipo</label>
                <br/>
                <select value={type}  
                        onChange={(e) => setType(e.target.value)}                
                >
                        <option value="1">Receita</option>                   
                        <option value="2">Revenda</option>                   
                </select>                    
                <br/>

                <br/>
                <input type="submit" 
                       value="Enviar"
                />

            </form>
        </div>
    );

};

export default ItemDoEstoqueReceitaEdit;