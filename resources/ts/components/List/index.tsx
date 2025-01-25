import React from "react";
import { Card, Typography } from "@material-tailwind/react";
import useForecastData from "../../hooks/useForecastData";
import Item from "./Item";

const TABLE_ROWS = [
    {
        number: "#MS-415646",
        customer: "CompanyINC",
        amount: "$14,000",
        issued: "31 Jan 2024",
        date: "31 Feb 2024",
    },
    {
        number: "#MS-415647",
        customer: "CompanyINC",
        amount: "$4,000",
        issued: "24 Jan 2024",
        date: "24 Feb 2024",
    },
    {
        number: "#MS-415648",
        customer: "CompanyINC",
        amount: "$11,000",
        issued: "12 Jan 2024",
        date: "12 Feb 2024",
    },
    {
        number: "#MS-415649",
        customer: "CompanyINC",
        amount: "$2,600",
        issued: "10 Jan 2024",
        date: "10 Feb 2024",
    },
];

export default function List() {
    const data = useForecastData((state) => state.data);
    const headers = ["Datetime", "Min temp", "Max temp", "Wind speed"];

    if (!data.length) return null;

    return (
        <Card className="my-2 w-full overflow-scroll">
            <table className="w-full min-w-max table-auto text-left">
                <thead>
                    <tr>
                        {headers.map((head) => (
                            <th
                                key={head}
                                className="border-b bg-blue-gray-50 border-blue-gray-100 p-4 pt-10"
                            >
                                <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="font-bold leading-none"
                                >
                                    {head}
                                </Typography>
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <Item
                            key={index}
                            data={item}
                            isLast={index === data.length - 1}
                        />
                    ))}
                </tbody>
            </table>
        </Card>
    );
}
