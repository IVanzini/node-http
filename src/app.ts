import { createServer, IncomingMessage, ServerResponse } from "node:http";
import url from "node:url";
import { readFileSync } from "node:fs";
// nodemon è la libreria che consente al server di prendere subito le modifiche senza doverlo stoppare e startare

const port = 3000;
const host = "localhost";

const reqList = (req: IncomingMessage, res: ServerResponse) => {
    const u = url.parse(req.url!, true);
    //console.log(u);

    let nome = u.query.nome as string; // /welcome?nome=

    // res.write("Richiesta ricevuta all'url: " + req.method + " " + req.url);
    // res.end();

    try {
        switch (u.pathname) {
            case "/":
                res.writeHead(200, {"Content-type": "text/html"});
                res.write("<html><head><title>Ciao!</title></head><body><h1>Ciao!</h1></body></html>");
                res.end();
                break;
            case "/welcome":
                res.writeHead(200, {"Content-type": "text/html"});
                let html = readFileSync("./templates/welcome.html", { encoding: "utf8"} );
                res.write(html.replace("{{name}}", nome ?? "pippo"));
                res.end();
                break;
            default:
                res.writeHead(404);
                res.end("Pagina non trovata");
                break;
        }  
    } catch (error) {
        console.error(error); 
        res.writeHead(500);
        res.end("Errore del server. Contatta l'amministratore di sistema"); 
    }

}

const server = createServer(reqList);

server.listen(port, host, () => console.log(`Server in ascolto su http://${host}:${port}`))