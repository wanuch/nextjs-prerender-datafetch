import { Fragment } from "react";
import path from "path";

export async function getStaticProps(context: any) {
    const { params } = context;
    const productId = params.pid;
    const fs = require('fs').promises;

    const filePath = path.join(process.cwd(), 'data', 'dummy-backend.json');
    const jsonData = await fs.readFile(filePath);
    const data = JSON.parse(jsonData);

    const product = data.products.find((product: any) => product.id === productId)

    return {
        props: {
            loadedProduct: product
        },
        // recreate at least 10 sec
        revalidate: 10
    };
}

export async function getStaticPaths() {
    return {
        paths: [
            { params: { pid: 'p1' } },
            { params: { pid: 'p2' } },
            { params: { pid: 'p3' } },
        ],
        fallback: false
    };
}

export default function ProductDetail(props: any) {

    const { loadedProduct } = props;

    return (
        <Fragment>
            <h1>{loadedProduct.title}</h1>
            <p>{loadedProduct.description}</p>
        </Fragment>
    );
}


