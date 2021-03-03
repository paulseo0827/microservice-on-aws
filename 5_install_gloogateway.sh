glooctl install gateway

glooctl create virtualservice --name frontend

glooctl add route \
            --name frontend \
            --path-prefix / \
            --prefix-rewrite / \
            --dest-name microservice-frontend-80

sleep 5

glooctl proxy url
