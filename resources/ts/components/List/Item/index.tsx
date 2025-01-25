import { Typography } from "@material-tailwind/react";
import React, { useMemo } from "react";
import { ForecastItem } from "../../../types";
import { formatTimestamp } from "../../../helpers";

interface Props {
    data: ForecastItem;
    isLast?: boolean;
}

export default function Item(props: Props) {
    const classes = useMemo(
        () => `p-4 ${props.isLast ? "" : "border-b"} border-gray-300`,
        [props.isLast]
    );

    return (
        <tr className="hover:bg-gray-50">
            <td className={classes}>
                <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-bold"
                >
                    {formatTimestamp(props.data.timestamp_dt)}
                </Typography>
            </td>
            <td className={classes}>
                <Typography
                    variant="small"
                    className="font-normal text-gray-600"
                >
                    {props.data.min_tmp}°C
                </Typography>
            </td>
            <td className={classes}>
                <Typography
                    variant="small"
                    className="font-normal text-gray-600"
                >
                    {props.data.max_tmp}°C
                </Typography>
            </td>
            <td className={classes}>
                <Typography
                    variant="small"
                    className="font-normal text-gray-600"
                >
                    {props.data.wind_spd}km/h
                </Typography>
            </td>
        </tr>
    );
}
