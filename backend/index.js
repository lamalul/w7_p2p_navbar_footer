const http = require('http');
const url = require('url');
const fs = require('fs');

let obj;
fs.readFile('./api/data.json', handleFile);

function handleFile(err, data) {
    if (err) throw err;
    obj = JSON.parse(data);
    console.log(obj["products"]);
}

const getAllProducts = (res) => {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(obj["products"]));
}

const addProduct = async (req, res) => {
    try {
        let body = '';
        req.on('data', (chunk) => { body += chunk; });
        req.on('end', () => {
            const product = JSON.parse(body);
            obj.products.push(product);
            fs.writeFile("./api/data.json", JSON.stringify(obj), function (err) {
                if (err) throw err;
                console.log('The "data to append" was appended to file!');
            });
            res.writeHead(201, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(product));
        });
    } catch (error) {
        res.writeHead(400, { 'Content-Type': 'text/plain' });
        res.end('Invalid data');
    }
}

const editProduct = (req, res, productId) => {
    const product = obj.products.find((t) => t.id === productId);

    if (product) {
        product.name = "Some new fixed name to test the put";
        product.img = "";
        product.year = 2024;
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(product));
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Product Not Found');
    }
}


const deleteProduct = (req, res, productId) => {
    const productIndex = obj.products.findIndex((p) => p.id === productId);

    if (productIndex !== -1) {
        obj.products.splice(productIndex, 1);
        fs.writeFile("./api/data.json", JSON.stringify(obj), function (err) {
            if (err) throw err;
            console.log('The product was deleted from the file!');
        });
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end('Product deleted successfully');
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Product Not Found');
    }
}


const server = http.createServer(async (req, res) => {
    const parseUrl = url.parse(req.url, true);
    const path = parseUrl.pathname;
    if (path == '/products' && req.method == 'GET') {
        getAllProducts(res);
    } else if (path == '/products' && req.method == 'POST') {
        addProduct(req, res);
    } else if (path.startsWith('/products/') && req.method == 'PUT') {
        const postId = parseInt(path.split('/')[2]); // Extracting id from the URL path
        editProduct(req, res, postId);  
    } else if (path.startsWith('/products/') && req.method == 'DELETE') {
        const postId = parseInt(path.split('/')[2]); // Extracting id from the URL path
        deleteProduct(req, res, postId);
    }
});

const port = 2000;
server.listen(port, () => {
    console.log(`server start at port ${port}`);
});
