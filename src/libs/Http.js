
class Http {
    static instance = new Http();

    get = async (url) => {

        try {
            let resp = await fetch(url);
            let json = await resp.json();
    
            return json;
            
        } catch (error) {
            console.log("Error",error)
        }

    }

    post = async (url, body) => {

        try {
            let resp = await fetch(url,{
                method: "POST",
                body
            });
            let json = await resp.json();
    
            return json;
            
        } catch (error) {
            console.log("Error",error);

            throw Error(error);
        }

    }



}

export default Http;