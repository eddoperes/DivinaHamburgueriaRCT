import React, { createContext, version } from 'react' //, useState

export const MainContext = createContext();

const MainContextProvider = (props) => {

    var url;
    if (process.env.NODE_ENV === 'development'){
        url = "https://localhost:7024/api";
        version = "v1";
    }
    else{
        url = "https://localhost:7024/api/prod";
        version = "v1";
    }

    //const [variableOne, setVariableOne] = useState('somethingRandom');
    
    return (
         <MainContext.Provider 
            value={{
                //variableOne,
                url,
                version
             }}>
            {props.children}
         </MainContext.Provider>
    )
}
export default MainContextProvider