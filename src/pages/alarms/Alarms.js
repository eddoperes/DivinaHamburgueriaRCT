//react hooks
import { useState, useEffect } from "react";

//data hooks
import { useFetchInventoryItems } from "../../hooks/useFetchInventoryItems";
import { useFetchUnits } from "../../hooks/useFetchUnits";

//icons
import { BsHourglassSplit } from 'react-icons/bs';

const Alarms = ({handlePersistence, item, configure}) => {

  //state
  const [eatableId, setEatableId] = useState(1);
  const [unitId, setUnitId] = useState(1);
  const [minimumQuantity, setMinimumQuantity] = useState(0);  
  const [validityInDays, setValidityInDays] = useState(0);

  //data
  const { data: units, 
          error: errorUnits, 
          waiting: showWaitingUnits,
          unitsGetAll } = useFetchUnits();  

  const { data: eatables, 
          error: errorEatables, 
          waiting: showWaitingEatables,
          inventoryItemsGetDistinctNames} = useFetchInventoryItems();    

  useEffect(() => {      

    unitsGetAll();
    inventoryItemsGetDistinctNames();

    setEatableId(item.eatableId);
    setUnitId(item.unityId);
    setMinimumQuantity(item.minimumQuantity);                
    setValidityInDays(item.validityInDays);        
 
  }, [item.id]); // eslint-disable-line react-hooks/exhaustive-deps

  //func
  const handleResetTextValidation = async (e) => {
    if (e.target.value !== '')
    {
        e.target.setCustomValidity("");
        e.target.reportValidity();        
    }
  } 

  const handleSubmit = async (e) => {
    e.preventDefault();
    var data = {
        eatableId : eatableId,
        unityId : unitId,
        minimumQuantity : minimumQuantity,
        validityInDays : validityInDays,
    } 
    handlePersistence(data)
  }

  return (
    <div>
        
        {showWaitingUnits && 
            <p className='waiting-icon-edit'><BsHourglassSplit/></p>
        }  
        {errorUnits && !showWaitingUnits && 
            <p className='error-message-edit'>{errorUnits}</p>
        } 

        {showWaitingEatables && 
            <p className='waiting-icon-edit'><BsHourglassSplit/></p>
        }  
        {errorEatables && !showWaitingEatables && 
            <p className='error-message-edit'>{errorEatables}</p>
        } 

        {units && eatables && !showWaitingUnits && !showWaitingEatables && 
            <form onSubmit={handleSubmit} className="form-edit">
        
                <label>Comestível          
                    <select value={eatableId}  
                            className="select-edit"
                            disabled={configure.disableInputs}
                            onChange={(e) => setEatableId(e.target.value)}                
                    >
                        {eatables.map((eatable) => (
                            <option key={eatable.id} value={eatable.id}>
                                {eatable.name}
                            </option>                   
                        ))}
                    </select>          
                </label>

                <label>Quantidade mínima
                    <input type="number"
                           className='input-edit input-edit-number'
                           value={minimumQuantity}  
                           disabled={configure.disableInputs}
                           onChange={(e) => {
                            setMinimumQuantity(e.target.value);
                            handleResetTextValidation(e);
                           }} 
                           min={1}
                           max={1000}
                    />
                </label>

                <label>Unidade          
                    <select value={unitId}  
                            className="select-edit"
                            disabled={configure.disableInputs}
                            onChange={(e) => setUnitId(e.target.value)}          
                    >
                        {units.map((unit) => (
                            <option key={unit.id} value={unit.id}>
                                {unit.name}
                            </option>                   
                        ))}
                    </select>          
                </label>

                <label>Validade em dias
                    <input type="number"
                           className='input-edit input-edit-number'
                           value={validityInDays}  
                           disabled={configure.disableInputs}
                           onChange={(e) => {
                            setValidityInDays(e.target.value)
                            handleResetTextValidation(e);
                           }}
                           min={1}
                           max={1000}
                    />
                </label>

                {!configure.disableInputs && 
                    <div>
                    <input type="submit" 
                            value="Enviar"
                            className="input-edit-submit"
                    />
                    <div className="clear-both">
                    </div>
                    </div>
                }

                {configure.disableInputs && 
                    <div>
                    <div className="warning-edit">
                        Atenção! Esta ação não pode ser desfeita
                    </div>
                    <div className="clear-both">
                    </div>
                    <div>
                        <input type="submit" 
                                value="Remover" 
                                className="input-edit-submit-remove"
                        />
                    </div>
                    <div className="clear-both">
                    </div>
                    </div>
                }

            </form>
        }
    </div>
  )
}

export default Alarms