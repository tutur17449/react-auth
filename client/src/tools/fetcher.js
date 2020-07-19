export default function fetcher(...args) {
    return new Promise((resolve, reject) => {
        fetch(...args)
        .then(apiResponse => {
            if (apiResponse.ok) {
                return apiResponse.json();
            }
            else {
                if(apiResponse.status === 401 || apiResponse.status === 403){
                    reject({
                        ok: false,
                        status: apiResponse.status, 
                        message: 'Non authorisé'
                    })
                } else {
                    return apiResponse.json()
                        .then(error => reject(error))                            
                }
            };
        })
        .then(jsonData => {
            resolve(jsonData)
        })
        .catch(apiError => reject(apiError));
    })
}