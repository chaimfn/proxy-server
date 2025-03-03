## Introduction
Run a local proxy-server, so you can access to a remote server through the local proxy-server.

### Example goal:
You must access the service in ```https```, but the remote server does not support https.
In that case, you can consume the service from the local proxy-server in ```https```, and it itself will direct the request to the remote server in ```http```.

### Pre steps:
1. Correct the fields in ```.env``` file.
2. Add the ```proxy-server```'s address (see ```LOCAL_URL``` env-var in ```.env``` file) to your ```hosts``` file.
3. Add the public-SSL-certificate (```./certs/loca;.net.crt```) to your system.

    For example:
    ```
    sudo cp ./certs/local.net.crt /usr/local/share/ca-certificates/

    sudo update-ca-certificates
    ```