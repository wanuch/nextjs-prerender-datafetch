import { useEffect, useState } from "react";

export default function LastSales(props: any) {
    const [sales, setSales] = useState<any>();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        setIsLoading(true);
        fetch("https://react-getting-start-62baa-default-rtdb.asia-southeast1.firebasedatabase.app/sales.json")
            .then((response: any) => response.json())
            .then(data => {
                const transformedSales = [];

                for (const key in data) {
                    transformedSales.push({
                        id: key,
                        username: data[key].username,
                        volume: data[key].volume
                    });
                }

                setSales(transformedSales);
                setIsLoading(false);
            });
    }, []);

    if (isLoading) {
        return <p>Loading...</p>
    }

    if (!sales) {
        return <p>No data yet</p>
    }

    return (
        <ul>
            {sales.map((sale: any) => <li key={sale.id}>{sale.username} - ${sale.volume}</li>)}
        </ul>
    );
}