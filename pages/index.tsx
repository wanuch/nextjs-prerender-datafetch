import path from "path";

export async function getStaticProps() {
  const fs = require('fs').promises;

  const filePath = path.join(process.cwd(), 'data', 'dummy-backend.json');
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);

  return {
    props: {
      products: data.products
    },
  };
}

export default function Home(props: any) {

  const { products } = props;

  return (
    <div>
      <ul>
        {products.map((product: any) => (
          <li key={product.id}>
            {product.title}
          </li>
        ))}
      </ul>
    </div>
  );
}
