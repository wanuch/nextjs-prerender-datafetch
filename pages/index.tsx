import Link from "next/link";
import path from "path";

export async function getStaticProps(context: any) {
  console.log("(Re-)Generating...");
  const fs = require('fs').promises;

  const filePath = path.join(process.cwd(), 'data', 'dummy-backend.json');
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);

  if (!data) {
    return {
      redirect: {
        destination: "/no-data"
      }
    }
  }

  if (data.products.length === 0) {
    return { notFound: true };
  }

  return {
    props: {
      products: data.products
    },
    // recreate at least 10 sec
    revalidate: 10
  };
}

export default function Home(props: any) {

  const { products } = props;

  return (
    <div>
      <ul>
        {products.map((product: any) => (
          <li key={product.id}>
            <Link href={`/products/${product.id}`}>{product.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
