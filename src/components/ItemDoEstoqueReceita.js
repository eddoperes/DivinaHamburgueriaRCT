import { useFetchInventoryItems } from "../hooks/useFetchInventoryItems";
import {Link} from 'react-router-dom';

const ItemDoEstoqueReceita = () => {

    const {data: items, error, inventoryItemsGetAll} = useFetchInventoryItems();

    if (items === null)
        inventoryItemsGetAll();

    return(
        <div>
            <h1>Itens do estoque</h1>
            {error && <p>{error}</p>}
            { items && <ul>
               {items.map((item) => (
                    <li key={item.id}>
                        {item.id}
                         - 
                        {item.name}
                        <Link to={`/ItensDoEstoqueReceita/Edit/${item.id}`}>Editar</Link>
                    </li>
               ))}
            </ul>}
        </div>
    );

};

export default ItemDoEstoqueReceita;