function handleCredentialResponse(response) {
     // decodeJwtResponse() is a custom function defined by you
     // to decode the credential response.
     //const responsePayload = decodeJwtResponse(response.credential);
     //Google token : ID_TOKEN
     //console.log('id_token',response.credential);
            const body = { id_token: response.credential };
     //enviamos los datos al servidor mediante fetch
     fetch('http://localhost:3000/auth/google', { // para realizar esta operacion requerimos transformar el fetch de GET  a POST
        method:'POST',
        headers:{ // enviamos los headers para especificar el tipo de contenido que estamos enviando el cual es JSON
            'Content-type':'application/json'
        },
        body : JSON.stringify(body) // el body debe estar serializado como un JSON
     })
     .then( resp => resp.json())
     .then( resp => {
        console.log(resp);
        location.reload();
        //con este metodo podemos guardar informacion en el local storage y nombrarla como nosotros deseemos en el primer argumento
        //localstorage.setItem('nombre que le queremos dar', variable que vamos a guardar)
        localStorage.setItem('email', resp.user.email);
     })
     .catch(console.warn);
  }
  //llamamos al boton
  const signOut = document.getElementById('google_signout');
  //anadimos el listener
  signOut.onclick = () =>{
    console.log(google.accounts.id);
    //con este metodo deshabilitamos la autoseleccion
    google.accounts.id.disableAutoSelect();
    //con este metodo revocamos el acceso al usuario para que pueda desloguear
    google.accounts.id.revoke( localStorage.getItem('email'), done => { // aqui podemos llamar la informacion guardada en el localstorage usando getItem(parametro que nombramos)
        localStorage.clear();
        location.reload();
    });
  }