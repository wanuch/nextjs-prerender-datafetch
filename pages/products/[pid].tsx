import { Fragment } from "react";
import path from "path";

export async function getStaticProps(context: any) {
    const { params } = context;
    const productId = params.pid;
    const data = await getData();
    const product = data.products.find((product: any) => product.id === productId)

    if (!product) {
        return { notFound: true };
    }

    return {
        props: {
            loadedProduct: product
        },
        // recreate at least 10 sec
        revalidate: 10
    };
}

export async function getStaticPaths() {
    const data = await getData();
    const ids = data.products.map((product: any) => product.id);
    const pathsWithParams = ids.map((id: any) => ({ params: { pid: id } }));

    return {
        paths: pathsWithParams,
        fallback: false
    };
}

async function getData() {
    const fs = require('fs').promises;
    const filePath = path.join(process.cwd(), 'data', 'dummy-backend.json');
    const jsonData = await fs.readFile(filePath);
    const data = JSON.parse(jsonData);

    return data;
}

export default function ProductDetail(props: any) {
    const { loadedProduct } = props;

    if (!loadedProduct) {
        return (<p>Loading...</p>);
    }

    return (
        <Fragment>
            <h1>{loadedProduct.title}</h1>
            <p>{loadedProduct.description}</p>
        </Fragment>
    );
}


