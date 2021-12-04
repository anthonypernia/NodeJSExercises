
import RelationalDatabase from "./RelationalDatabase";


class MariaDB extends RelationalDatabase {
    static connection;
    static connect() {
        const firebaseConfig = {
            apiKey: "AIzaSyDRJVtvi79wHWVwJttoAXEJAJFFse3KJK8",
            authDomain: "anthonystoreproject.firebaseapp.com",
            projectId: "anthonystoreproject",
            storageBucket: "anthonystoreproject.appspot.com",
            messagingSenderId: "973311422477",
            appId: "1:973311422477:web:19ce6b6834e0fbf9756544"
          };
          
        
    }

}


export default MariaDB;