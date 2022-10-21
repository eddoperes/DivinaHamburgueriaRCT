import React, { createContext } from 'react' //, useState

export const MainContext = createContext();

const MainContextProvider = (props) => {

    var url;
    if (process.env.NODE_ENV === 'development'){
        url = "https://localhost:7024/api";
    }
    else{
        url = "https://localhost:7024/api/prod";
    }

    //const [variableOne, setVariableOne] = useState('somethingRandom');
    
    return (
         <MainContext.Provider 
            value={{
                //variableOne,
                url
             }}>
            {props.children}
         </MainContext.Provider>
    )
}
export default MainContextProvider