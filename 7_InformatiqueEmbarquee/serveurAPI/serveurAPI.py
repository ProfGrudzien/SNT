from bottle import get, post, put, delete, request, response, run, auth_basic

utilisateurs = {"admin":"vivaSNT"}
secrets = []

def authentificationAdmin(user, password):
    return user == "admin" and password == "vivaSNT"

def authentificationUser(user, password):
    return password == utilisateurs.get(user, None)

@get('/test')
@auth_basic(authentificationUser)
def test():
    return { "utilisateur":request.auth[0], "message":"connexion réussie"}

@put('/creerUtilisateur')
@auth_basic(authentificationAdmin)
def creerUtilisateur():
    data = request.json
    if data is None :
        response.status = 403
        return { "utilisateur":request.auth[0], "message":"Données manquantes." }
    try :
        if data["user"] in utilisateurs :
            response.status = 403
            return { "utilisateur":request.auth[0], "message":"Le nom d'utilisateur {} est déjà utilisé.".format(data["user"]) }
        utilisateurs[data["user"]] = data["password"]
        response.status = 201
        return { "utilisateur":request.auth[0], "message":"L'utilisateur {} a bien été créé.".format(data["user"]) }
    except :
        response.status = 403
        return { "utilisateur":request.auth[0], "message":"Données erronées." }

@post('/secret')
@auth_basic(authentificationUser)
def ajouterSecret():
    data = request.json
    if data is None :
        response.status = 403
        return { "utilisateur":request.auth[0], "message":"Données manquantes." }
    try :
        num = len(secrets)
        secrets.append((request.auth[0], data["secret"]))
        response.status = 201
        return { "utilisateur":request.auth[0], "num_secret":num, "message":"Le secret est enregistré sous le numéro {}.".format(num) }
    except :
        response.status = 403
        return { "utilisateur":request.auth[0], "message":"Données erronées." }

@get('/secret/<num>')
@auth_basic(authentificationUser)
def relireSecret(num):
    if int(num) >= len(secrets) :
        response.status = 403
        return { "utilisateur":request.auth[0], "message":"Le secret n°{} n'existe pas.".format(num) }
    secret = secrets[int(num)]
    if secret[0] is None :
        response.status = 403
        return { "utilisateur":request.auth[0], "message":"Le secret n°{} a été supprimé.".format(num) }
    if secret[0] != request.auth[0] :
        response.status = 403
        return { "utilisateur":request.auth[0], "message":"Le secret n°{} ne vous appartient pas.".format(num) }
    response.status = 200
    return { "utilisateur":request.auth[0], "secret":secret[1]}

@delete('/secret/<num>')
@auth_basic(authentificationUser)
def effacerSecret(num):
    if int(num) >= len(secrets) :
        response.status = 403
        return { "utilisateur":request.auth[0], "message":"Le secret n°{} n'existe pas.".format(num) }
    secret = secrets[int(num)]
    if secret[0] is None :
        response.status = 403
        return { "utilisateur":request.auth[0], "message":"Le secret n°{} a déjà été supprimé.".format(num) }
    if secret[0] != request.auth[0] :
        response.status = 403
        return { "utilisateur":request.auth[0], "message":"Le secret n°{} ne vous appartient pas.".format(num) }
    secrets[int(num)] = (None, "")
    response.status = 202
    return { "utilisateur":request.auth[0], "message":"Le secret n°{} a bien été effacé.".format(num)}

run(host='localhost', port=3000, debug=True)

