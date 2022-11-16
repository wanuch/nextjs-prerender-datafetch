import { useEffect, useState } from "react";
import useSWR from 'swr';

export default function LastSales(props: any) {
    const [sales, setSales] = useState<any>();

    // ========================= With useSWR ============================ 
    const fetcher = (url: any) => fetch(url).then((r) => r.json());
    const { data, error } = useSWR("https://react-getting-start-62baa-default-rtdb.asia-southeast1.firebasedatabase.app/sales.json", fetcher);

    useEffect(() => {
        if (data) {
            const transformedSales = [];

            for (const key in data) {
                transformedSales.push({
                    id: key,
                    username: data[key].username,
                    volume: data[key].volume
                });
            }
            setSales(transformedSales);
        }
    }, [data]);

    if (error) return <div>failed to load</div>
    if (!data || !sales) return <div>Loading...</div>
    // ========================= With useSWR ============================ 

    // ========================= Without useSWR =========================
    // const [isLoading, setIsLoading] = useState<boolean>(false);
    // useEffect(() => {
    //     setIsLoading(true);
    //     fetch("https://react-getting-start-62baa-default-rtdb.asia-southeast1.firebasedatabase.app/sales.json")
    //         .then((response: any) => response.json())
    //         .then(data => {
    //             const transformedSales = [];

    //             for (const key in data) {
    //                 transformedSales.push({
    //                     id: key,
    //                     username: data[key].username,
    //                     volume: data[key].volume
    //                 });
    //             }

    //             setSales(transformedSales);
    //             setIsLoading(false);
    //         });
    // }, []);

    // if (isLoading) {
    //     return <p>Loading...</p>
    // }

    // if (!sales) {
    //     return <p>No data yet</p>
    // }
    // ========================= Without useSWR ========================= 

    return (
        <ul>
            {sales.map((sale: any) => <li key={sale.id}>{sale.username} - ${sale.volume}</li>)}
        </ul>
    );
}