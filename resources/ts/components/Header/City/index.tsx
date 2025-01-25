import React, { useCallback, useMemo } from "react";
import {
    Button,
    Card,
    CardBody,
    CardHeader,
    Typography,
} from "@material-tailwind/react";
import useForecastData from "../../../hooks/useForecastData";
import { formatTimestamp } from "../../../helpers";
import saveCityForecast from "../../../server/save";

export default function City() {
    const { data, period, isGetFromDb } = useForecastData((state) => ({
        data: state.data?.[0],
        isGetFromDb: state.isGetFromDb,
        period: state.period,
    }));
    const info = useMemo(() => {
        if (isGetFromDb) {
            return {
                icon: data.weather_icon,
                title: data.city_name,
                description: data.weather_description,
                weatherTitle: data.weather_main,
                isInlined: false,
                texts: [`Updated at: ${formatTimestamp(data.updated_at)}`],
                isButton: false,
            };
        }
        return {
            icon: data.weather_icon,
            title: data.city_name,
            description: data.weather_description,
            weatherTitle: data.weather_main,
            isButton: true,
            isInlined: true,
            texts: [
                "Period",
                `Starts at: ${formatTimestamp(period?.start)}`,
                `Ends at: ${formatTimestamp(period?.end)}`,
            ],
        };
    }, [data, isGetFromDb]);

    const saveForecast = useCallback(async () => {
        await saveCityForecast(data);
    }, [data]);

    return (
        <Card className="max-h-32 w-full max-w-[48rem] flex-row">
            <CardHeader
                shadow={false}
                floated={false}
                className="m-0 shrink-0 rounded-r-none"
            >
                <img
                    src={info.icon}
                    alt="card-image"
                    className="h-full w-full object-cover"
                />
            </CardHeader>
            <CardBody className="w-full">
                <Inlined isInline={true}>
                    <Typography
                        variant="h5"
                        color="black"
                        className="mb-4 uppercase"
                    >
                        {info.title}
                    </Typography>
                    <Typography
                        variant="small"
                        color="gray"
                        className="mb-4 uppercase"
                    >
                        {info.weatherTitle}
                    </Typography>
                    <Typography
                        variant="small"
                        color="gray"
                        className="mb-4 uppercase"
                    >
                        {info.description}
                    </Typography>
                </Inlined>
                <Inlined isInline={info.isInlined} className="justify-between">
                    <Inlined isInline={info.isInlined}>
                        {info.texts.map((text, i) => (
                            <Typography
                                key={i}
                                variant={i === 0 ? "h6" : "small"}
                                color={i === 0 ? "blue-gray" : "gray"}
                                className={i === 0 ? "" : "font-normal"}
                            >
                                {text}
                            </Typography>
                        ))}
                    </Inlined>
                    {info.isButton && (
                        <Button
                            onClick={saveForecast}
                            variant="outlined"
                            className="flex items-center gap-2"
                        >
                            Save forecast
                        </Button>
                    )}
                </Inlined>
            </CardBody>
        </Card>
    );
}

function Inlined(props: {
    isInline?: boolean;
    className?: string;
    children: React.ReactNode;
}) {
    if (!props.isInline) return props.children;
    return (
        <div
            className={`flex flex-row gap-4 items-center ${
                props.className ?? ""
            }`}
        >
            {props.children}
        </div>
    );
}
